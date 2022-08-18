"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionPool = exports.PoolState = void 0;
const Denque = require("denque");
const timers_1 = require("timers");
const constants_1 = require("../constants");
const error_1 = require("../error");
const logger_1 = require("../logger");
const mongo_types_1 = require("../mongo_types");
const utils_1 = require("../utils");
const connect_1 = require("./connect");
const connection_1 = require("./connection");
const connection_pool_events_1 = require("./connection_pool_events");
const errors_1 = require("./errors");
const metrics_1 = require("./metrics");
/** @internal */
const kLogger = Symbol('logger');
/** @internal */
const kConnections = Symbol('connections');
/** @internal */
const kPending = Symbol('pending');
/** @internal */
const kCheckedOut = Symbol('checkedOut');
/** @internal */
const kMinPoolSizeTimer = Symbol('minPoolSizeTimer');
/** @internal */
const kGeneration = Symbol('generation');
/** @internal */
const kServiceGenerations = Symbol('serviceGenerations');
/** @internal */
const kConnectionCounter = Symbol('connectionCounter');
/** @internal */
const kCancellationToken = Symbol('cancellationToken');
/** @internal */
const kWaitQueue = Symbol('waitQueue');
/** @internal */
const kCancelled = Symbol('cancelled');
/** @internal */
const kMetrics = Symbol('metrics');
/** @internal */
const kProcessingWaitQueue = Symbol('processingWaitQueue');
/** @internal */
const kPoolState = Symbol('poolState');
/** @internal */
exports.PoolState = Object.freeze({
    paused: 'paused',
    ready: 'ready',
    closed: 'closed'
});
/**
 * A pool of connections which dynamically resizes, and emit events related to pool activity
 * @internal
 */
class ConnectionPool extends mongo_types_1.TypedEventEmitter {
    /** @internal */
    constructor(options) {
        var _a, _b, _c, _d, _e;
        super();
        this.options = Object.freeze({
            ...options,
            connectionType: connection_1.Connection,
            maxPoolSize: (_a = options.maxPoolSize) !== null && _a !== void 0 ? _a : 100,
            minPoolSize: (_b = options.minPoolSize) !== null && _b !== void 0 ? _b : 0,
            maxConnecting: (_c = options.maxConnecting) !== null && _c !== void 0 ? _c : 2,
            maxIdleTimeMS: (_d = options.maxIdleTimeMS) !== null && _d !== void 0 ? _d : 0,
            waitQueueTimeoutMS: (_e = options.waitQueueTimeoutMS) !== null && _e !== void 0 ? _e : 0,
            autoEncrypter: options.autoEncrypter,
            metadata: options.metadata
        });
        if (this.options.minPoolSize > this.options.maxPoolSize) {
            throw new error_1.MongoInvalidArgumentError('Connection pool minimum size must not be greater than maximum pool size');
        }
        this[kPoolState] = exports.PoolState.paused;
        this[kLogger] = new logger_1.Logger('ConnectionPool');
        this[kConnections] = new Denque();
        this[kPending] = 0;
        this[kCheckedOut] = 0;
        this[kMinPoolSizeTimer] = undefined;
        this[kGeneration] = 0;
        this[kServiceGenerations] = new Map();
        this[kConnectionCounter] = (0, utils_1.makeCounter)(1);
        this[kCancellationToken] = new mongo_types_1.CancellationToken();
        this[kCancellationToken].setMaxListeners(Infinity);
        this[kWaitQueue] = new Denque();
        this[kMetrics] = new metrics_1.ConnectionPoolMetrics();
        this[kProcessingWaitQueue] = false;
        process.nextTick(() => {
            this.emit(ConnectionPool.CONNECTION_POOL_CREATED, new connection_pool_events_1.ConnectionPoolCreatedEvent(this));
            this.ensureMinPoolSize();
        });
    }
    /** The address of the endpoint the pool is connected to */
    get address() {
        return this.options.hostAddress.toString();
    }
    /**
     * Check if the pool has been closed
     *
     * TODO(NODE-3263): We can remove this property once shell no longer needs it
     */
    get closed() {
        return this[kPoolState] === exports.PoolState.closed;
    }
    /** An integer representing the SDAM generation of the pool */
    get generation() {
        return this[kGeneration];
    }
    /** An integer expressing how many total connections (available + pending + in use) the pool currently has */
    get totalConnectionCount() {
        return (this.availableConnectionCount + this.pendingConnectionCount + this.currentCheckedOutCount);
    }
    /** An integer expressing how many connections are currently available in the pool. */
    get availableConnectionCount() {
        return this[kConnections].length;
    }
    get pendingConnectionCount() {
        return this[kPending];
    }
    get currentCheckedOutCount() {
        return this[kCheckedOut];
    }
    get waitQueueSize() {
        return this[kWaitQueue].length;
    }
    get loadBalanced() {
        return this.options.loadBalanced;
    }
    get serviceGenerations() {
        return this[kServiceGenerations];
    }
    /**
     * Get the metrics information for the pool when a wait queue timeout occurs.
     */
    waitQueueErrorMetrics() {
        return this[kMetrics].info(this.options.maxPoolSize);
    }
    /**
     * Set the pool state to "ready"
     */
    ready() {
        this[kPoolState] = exports.PoolState.ready;
    }
    /**
     * Check a connection out of this pool. The connection will continue to be tracked, but no reference to it
     * will be held by the pool. This means that if a connection is checked out it MUST be checked back in or
     * explicitly destroyed by the new owner.
     */
    checkOut(callback) {
        this.emit(ConnectionPool.CONNECTION_CHECK_OUT_STARTED, new connection_pool_events_1.ConnectionCheckOutStartedEvent(this));
        if (this.closed) {
            this.emit(ConnectionPool.CONNECTION_CHECK_OUT_FAILED, new connection_pool_events_1.ConnectionCheckOutFailedEvent(this, 'poolClosed'));
            callback(new errors_1.PoolClosedError(this));
            return;
        }
        const waitQueueMember = { callback };
        const waitQueueTimeoutMS = this.options.waitQueueTimeoutMS;
        if (waitQueueTimeoutMS) {
            waitQueueMember.timer = (0, timers_1.setTimeout)(() => {
                waitQueueMember[kCancelled] = true;
                waitQueueMember.timer = undefined;
                this.emit(ConnectionPool.CONNECTION_CHECK_OUT_FAILED, new connection_pool_events_1.ConnectionCheckOutFailedEvent(this, 'timeout'));
                waitQueueMember.callback(new errors_1.WaitQueueTimeoutError(this.loadBalanced
                    ? this.waitQueueErrorMetrics()
                    : 'Timed out while checking out a connection from connection pool', this.address));
            }, waitQueueTimeoutMS);
        }
        this[kWaitQueue].push(waitQueueMember);
        process.nextTick(() => this.processWaitQueue());
    }
    /**
     * Check a connection into the pool.
     *
     * @param connection - The connection to check in
     */
    checkIn(connection) {
        const poolClosed = this.closed;
        const stale = this.connectionIsStale(connection);
        const willDestroy = !!(poolClosed || stale || connection.closed);
        if (!willDestroy) {
            connection.markAvailable();
            this[kConnections].unshift(connection);
        }
        this[kCheckedOut]--;
        this.emit(ConnectionPool.CONNECTION_CHECKED_IN, new connection_pool_events_1.ConnectionCheckedInEvent(this, connection));
        if (willDestroy) {
            const reason = connection.closed ? 'error' : poolClosed ? 'poolClosed' : 'stale';
            this.destroyConnection(connection, reason);
        }
        process.nextTick(() => this.processWaitQueue());
    }
    /**
     * Clear the pool
     *
     * Pool reset is handled by incrementing the pool's generation count. Any existing connection of a
     * previous generation will eventually be pruned during subsequent checkouts.
     */
    clear(serviceId) {
        if (this.loadBalanced && serviceId) {
            const sid = serviceId.toHexString();
            const generation = this.serviceGenerations.get(sid);
            // Only need to worry if the generation exists, since it should
            // always be there but typescript needs the check.
            if (generation == null) {
                // TODO(NODE-3483)
                throw new error_1.MongoRuntimeError('Service generations are required in load balancer mode.');
            }
            else {
                // Increment the generation for the service id.
                this.serviceGenerations.set(sid, generation + 1);
            }
        }
        else {
            this[kGeneration] += 1;
        }
        this.emit(ConnectionPool.CONNECTION_POOL_CLEARED, new connection_pool_events_1.ConnectionPoolClearedEvent(this, serviceId));
    }
    close(_options, _cb) {
        let options = _options;
        const callback = (_cb !== null && _cb !== void 0 ? _cb : _options);
        if (typeof options === 'function') {
            options = {};
        }
        options = Object.assign({ force: false }, options);
        if (this.closed) {
            return callback();
        }
        // immediately cancel any in-flight connections
        this[kCancellationToken].emit('cancel');
        // drain the wait queue
        while (this.waitQueueSize) {
            const waitQueueMember = this[kWaitQueue].pop();
            if (waitQueueMember) {
                if (waitQueueMember.timer) {
                    (0, timers_1.clearTimeout)(waitQueueMember.timer);
                }
                if (!waitQueueMember[kCancelled]) {
                    // TODO(NODE-3483): Replace with MongoConnectionPoolClosedError
                    waitQueueMember.callback(new error_1.MongoRuntimeError('Connection pool closed'));
                }
            }
        }
        // clear the min pool size timer
        const minPoolSizeTimer = this[kMinPoolSizeTimer];
        if (minPoolSizeTimer) {
            (0, timers_1.clearTimeout)(minPoolSizeTimer);
        }
        // end the connection counter
        if (typeof this[kConnectionCounter].return === 'function') {
            this[kConnectionCounter].return(undefined);
        }
        // mark the pool as closed immediately
        this[kPoolState] = exports.PoolState.closed;
        (0, utils_1.eachAsync)(this[kConnections].toArray(), (conn, cb) => {
            this.emit(ConnectionPool.CONNECTION_CLOSED, new connection_pool_events_1.ConnectionClosedEvent(this, conn, 'poolClosed'));
            conn.destroy(options, cb);
        }, err => {
            this[kConnections].clear();
            this.emit(ConnectionPool.CONNECTION_POOL_CLOSED, new connection_pool_events_1.ConnectionPoolClosedEvent(this));
            callback(err);
        });
    }
    /**
     * Runs a lambda with an implicitly checked out connection, checking that connection back in when the lambda
     * has completed by calling back.
     *
     * NOTE: please note the required signature of `fn`
     *
     * @remarks When in load balancer mode, connections can be pinned to cursors or transactions.
     *   In these cases we pass the connection in to this method to ensure it is used and a new
     *   connection is not checked out.
     *
     * @param conn - A pinned connection for use in load balancing mode.
     * @param fn - A function which operates on a managed connection
     * @param callback - The original callback
     */
    withConnection(conn, fn, callback) {
        if (conn) {
            // use the provided connection, and do _not_ check it in after execution
            fn(undefined, conn, (fnErr, result) => {
                if (typeof callback === 'function') {
                    if (fnErr) {
                        callback(fnErr);
                    }
                    else {
                        callback(undefined, result);
                    }
                }
            });
            return;
        }
        this.checkOut((err, conn) => {
            // don't callback with `err` here, we might want to act upon it inside `fn`
            fn(err, conn, (fnErr, result) => {
                if (typeof callback === 'function') {
                    if (fnErr) {
                        callback(fnErr);
                    }
                    else {
                        callback(undefined, result);
                    }
                }
                if (conn) {
                    this.checkIn(conn);
                }
            });
        });
    }
    destroyConnection(connection, reason) {
        this.emit(ConnectionPool.CONNECTION_CLOSED, new connection_pool_events_1.ConnectionClosedEvent(this, connection, reason));
        // destroy the connection
        process.nextTick(() => connection.destroy());
    }
    connectionIsStale(connection) {
        const serviceId = connection.serviceId;
        if (this.loadBalanced && serviceId) {
            const sid = serviceId.toHexString();
            const generation = this.serviceGenerations.get(sid);
            return connection.generation !== generation;
        }
        return connection.generation !== this[kGeneration];
    }
    connectionIsIdle(connection) {
        return !!(this.options.maxIdleTimeMS && connection.idleTime > this.options.maxIdleTimeMS);
    }
    connectionIsPerished(connection) {
        const isStale = this.connectionIsStale(connection);
        const isIdle = this.connectionIsIdle(connection);
        if (!isStale && !isIdle && !connection.closed) {
            return false;
        }
        const reason = connection.closed ? 'error' : isStale ? 'stale' : 'idle';
        this.destroyConnection(connection, reason);
        return true;
    }
    createConnection(callback) {
        const connectOptions = {
            ...this.options,
            id: this[kConnectionCounter].next().value,
            generation: this[kGeneration],
            cancellationToken: this[kCancellationToken]
        };
        this[kPending]++;
        // This is our version of a "virtual" no-I/O connection as the spec requires
        this.emit(ConnectionPool.CONNECTION_CREATED, new connection_pool_events_1.ConnectionCreatedEvent(this, { id: connectOptions.id }));
        (0, connect_1.connect)(connectOptions, (err, connection) => {
            if (err || !connection) {
                this[kLogger].debug(`connection attempt failed with error [${JSON.stringify(err)}]`);
                callback(err);
                return;
            }
            // The pool might have closed since we started trying to create a connection
            if (this.closed) {
                this[kPending]--;
                connection.destroy({ force: true });
                return;
            }
            // forward all events from the connection to the pool
            for (const event of [...constants_1.APM_EVENTS, connection_1.Connection.CLUSTER_TIME_RECEIVED]) {
                connection.on(event, (e) => this.emit(event, e));
            }
            if (this.loadBalanced) {
                connection.on(connection_1.Connection.PINNED, pinType => this[kMetrics].markPinned(pinType));
                connection.on(connection_1.Connection.UNPINNED, pinType => this[kMetrics].markUnpinned(pinType));
                const serviceId = connection.serviceId;
                if (serviceId) {
                    let generation;
                    const sid = serviceId.toHexString();
                    if ((generation = this.serviceGenerations.get(sid))) {
                        connection.generation = generation;
                    }
                    else {
                        this.serviceGenerations.set(sid, 0);
                        connection.generation = 0;
                    }
                }
            }
            connection.markAvailable();
            this.emit(ConnectionPool.CONNECTION_READY, new connection_pool_events_1.ConnectionReadyEvent(this, connection));
            callback(undefined, connection);
            return;
        });
    }
    ensureMinPoolSize() {
        const minPoolSize = this.options.minPoolSize;
        if (this.closed || minPoolSize === 0) {
            return;
        }
        if (this.totalConnectionCount < minPoolSize &&
            this.pendingConnectionCount < this.options.maxConnecting) {
            // NOTE: ensureMinPoolSize should not try to get all the pending
            // connection permits because that potentially delays the availability of
            // the connection to a checkout request
            this.createConnection((err, connection) => {
                this[kPending]--;
                if (!err && connection) {
                    this[kConnections].push(connection);
                    process.nextTick(() => this.processWaitQueue());
                }
                this[kMinPoolSizeTimer] = (0, timers_1.setTimeout)(() => this.ensureMinPoolSize(), 10);
            });
        }
        else {
            this[kMinPoolSizeTimer] = (0, timers_1.setTimeout)(() => this.ensureMinPoolSize(), 100);
        }
    }
    processWaitQueue() {
        if (this.closed || this[kProcessingWaitQueue]) {
            return;
        }
        this[kProcessingWaitQueue] = true;
        while (this.waitQueueSize) {
            const waitQueueMember = this[kWaitQueue].peekFront();
            if (!waitQueueMember) {
                this[kWaitQueue].shift();
                continue;
            }
            if (waitQueueMember[kCancelled]) {
                this[kWaitQueue].shift();
                continue;
            }
            if (!this.availableConnectionCount) {
                break;
            }
            const connection = this[kConnections].shift();
            if (!connection) {
                break;
            }
            if (!this.connectionIsPerished(connection)) {
                this[kCheckedOut]++;
                this.emit(ConnectionPool.CONNECTION_CHECKED_OUT, new connection_pool_events_1.ConnectionCheckedOutEvent(this, connection));
                if (waitQueueMember.timer) {
                    (0, timers_1.clearTimeout)(waitQueueMember.timer);
                }
                this[kWaitQueue].shift();
                waitQueueMember.callback(undefined, connection);
            }
        }
        const { maxPoolSize, maxConnecting } = this.options;
        while (this.waitQueueSize > 0 &&
            this.pendingConnectionCount < maxConnecting &&
            (maxPoolSize === 0 || this.totalConnectionCount < maxPoolSize)) {
            const waitQueueMember = this[kWaitQueue].shift();
            if (!waitQueueMember || waitQueueMember[kCancelled]) {
                continue;
            }
            this.createConnection((err, connection) => {
                this[kPending]--;
                if (waitQueueMember[kCancelled]) {
                    if (!err && connection) {
                        this[kConnections].push(connection);
                    }
                }
                else {
                    if (err) {
                        this.emit(ConnectionPool.CONNECTION_CHECK_OUT_FAILED, new connection_pool_events_1.ConnectionCheckOutFailedEvent(this, err));
                    }
                    else if (connection) {
                        this[kCheckedOut]++;
                        this.emit(ConnectionPool.CONNECTION_CHECKED_OUT, new connection_pool_events_1.ConnectionCheckedOutEvent(this, connection));
                    }
                    if (waitQueueMember.timer) {
                        (0, timers_1.clearTimeout)(waitQueueMember.timer);
                    }
                    waitQueueMember.callback(err, connection);
                }
                process.nextTick(() => this.processWaitQueue());
            });
        }
        this[kProcessingWaitQueue] = false;
    }
}
exports.ConnectionPool = ConnectionPool;
/**
 * Emitted when the connection pool is created.
 * @event
 */
ConnectionPool.CONNECTION_POOL_CREATED = constants_1.CONNECTION_POOL_CREATED;
/**
 * Emitted once when the connection pool is closed
 * @event
 */
ConnectionPool.CONNECTION_POOL_CLOSED = constants_1.CONNECTION_POOL_CLOSED;
/**
 * Emitted each time the connection pool is cleared and it's generation incremented
 * @event
 */
ConnectionPool.CONNECTION_POOL_CLEARED = constants_1.CONNECTION_POOL_CLEARED;
/**
 * Emitted when a connection is created.
 * @event
 */
ConnectionPool.CONNECTION_CREATED = constants_1.CONNECTION_CREATED;
/**
 * Emitted when a connection becomes established, and is ready to use
 * @event
 */
ConnectionPool.CONNECTION_READY = constants_1.CONNECTION_READY;
/**
 * Emitted when a connection is closed
 * @event
 */
ConnectionPool.CONNECTION_CLOSED = constants_1.CONNECTION_CLOSED;
/**
 * Emitted when an attempt to check out a connection begins
 * @event
 */
ConnectionPool.CONNECTION_CHECK_OUT_STARTED = constants_1.CONNECTION_CHECK_OUT_STARTED;
/**
 * Emitted when an attempt to check out a connection fails
 * @event
 */
ConnectionPool.CONNECTION_CHECK_OUT_FAILED = constants_1.CONNECTION_CHECK_OUT_FAILED;
/**
 * Emitted each time a connection is successfully checked out of the connection pool
 * @event
 */
ConnectionPool.CONNECTION_CHECKED_OUT = constants_1.CONNECTION_CHECKED_OUT;
/**
 * Emitted each time a connection is successfully checked into the connection pool
 * @event
 */
ConnectionPool.CONNECTION_CHECKED_IN = constants_1.CONNECTION_CHECKED_IN;
//# sourceMappingURL=connection_pool.js.map