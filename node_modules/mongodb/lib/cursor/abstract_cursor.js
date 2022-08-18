"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertUninitialized = exports.next = exports.AbstractCursor = exports.CURSOR_FLAGS = void 0;
const stream_1 = require("stream");
const bson_1 = require("../bson");
const error_1 = require("../error");
const mongo_types_1 = require("../mongo_types");
const execute_operation_1 = require("../operations/execute_operation");
const get_more_1 = require("../operations/get_more");
const kill_cursors_1 = require("../operations/kill_cursors");
const read_concern_1 = require("../read_concern");
const read_preference_1 = require("../read_preference");
const sessions_1 = require("../sessions");
const utils_1 = require("../utils");
/** @internal */
const kId = Symbol('id');
/** @internal */
const kDocuments = Symbol('documents');
/** @internal */
const kServer = Symbol('server');
/** @internal */
const kNamespace = Symbol('namespace');
/** @internal */
const kClient = Symbol('client');
/** @internal */
const kSession = Symbol('session');
/** @internal */
const kOptions = Symbol('options');
/** @internal */
const kTransform = Symbol('transform');
/** @internal */
const kInitialized = Symbol('initialized');
/** @internal */
const kClosed = Symbol('closed');
/** @internal */
const kKilled = Symbol('killed');
/** @internal */
const kInit = Symbol('kInit');
/** @public */
exports.CURSOR_FLAGS = [
    'tailable',
    'oplogReplay',
    'noCursorTimeout',
    'awaitData',
    'exhaust',
    'partial'
];
/** @public */
class AbstractCursor extends mongo_types_1.TypedEventEmitter {
    /** @internal */
    constructor(client, namespace, options = {}) {
        super();
        if (!client.s.isMongoClient) {
            throw new error_1.MongoRuntimeError('Cursor must be constructed with MongoClient');
        }
        this[kClient] = client;
        this[kNamespace] = namespace;
        this[kDocuments] = []; // TODO: https://github.com/microsoft/TypeScript/issues/36230
        this[kInitialized] = false;
        this[kClosed] = false;
        this[kKilled] = false;
        this[kOptions] = {
            readPreference: options.readPreference && options.readPreference instanceof read_preference_1.ReadPreference
                ? options.readPreference
                : read_preference_1.ReadPreference.primary,
            ...(0, bson_1.pluckBSONSerializeOptions)(options)
        };
        const readConcern = read_concern_1.ReadConcern.fromOptions(options);
        if (readConcern) {
            this[kOptions].readConcern = readConcern;
        }
        if (typeof options.batchSize === 'number') {
            this[kOptions].batchSize = options.batchSize;
        }
        // we check for undefined specifically here to allow falsy values
        // eslint-disable-next-line no-restricted-syntax
        if (options.comment !== undefined) {
            this[kOptions].comment = options.comment;
        }
        if (typeof options.maxTimeMS === 'number') {
            this[kOptions].maxTimeMS = options.maxTimeMS;
        }
        if (options.session instanceof sessions_1.ClientSession) {
            this[kSession] = options.session;
        }
        else {
            this[kSession] = this[kClient].startSession({ owner: this, explicit: false });
        }
    }
    get id() {
        return this[kId];
    }
    /** @internal */
    get client() {
        return this[kClient];
    }
    /** @internal */
    get server() {
        return this[kServer];
    }
    get namespace() {
        return this[kNamespace];
    }
    get readPreference() {
        return this[kOptions].readPreference;
    }
    get readConcern() {
        return this[kOptions].readConcern;
    }
    /** @internal */
    get session() {
        return this[kSession];
    }
    set session(clientSession) {
        this[kSession] = clientSession;
    }
    /** @internal */
    get cursorOptions() {
        return this[kOptions];
    }
    get closed() {
        return this[kClosed];
    }
    get killed() {
        return this[kKilled];
    }
    get loadBalanced() {
        var _a;
        return !!((_a = this[kClient].topology) === null || _a === void 0 ? void 0 : _a.loadBalanced);
    }
    /** Returns current buffered documents length */
    bufferedCount() {
        return this[kDocuments].length;
    }
    /** Returns current buffered documents */
    readBufferedDocuments(number) {
        return this[kDocuments].splice(0, number !== null && number !== void 0 ? number : this[kDocuments].length);
    }
    [Symbol.asyncIterator]() {
        return {
            next: () => this.next().then(value => value != null ? { value, done: false } : { value: undefined, done: true })
        };
    }
    stream(options) {
        if (options === null || options === void 0 ? void 0 : options.transform) {
            const transform = options.transform;
            const readable = new ReadableCursorStream(this);
            return readable.pipe(new stream_1.Transform({
                objectMode: true,
                highWaterMark: 1,
                transform(chunk, _, callback) {
                    try {
                        const transformed = transform(chunk);
                        callback(undefined, transformed);
                    }
                    catch (err) {
                        callback(err);
                    }
                }
            }));
        }
        return new ReadableCursorStream(this);
    }
    hasNext(callback) {
        return (0, utils_1.maybePromise)(callback, done => {
            if (this[kId] === bson_1.Long.ZERO) {
                return done(undefined, false);
            }
            if (this[kDocuments].length) {
                return done(undefined, true);
            }
            next(this, true, (err, doc) => {
                if (err)
                    return done(err);
                if (doc) {
                    this[kDocuments].unshift(doc);
                    done(undefined, true);
                    return;
                }
                done(undefined, false);
            });
        });
    }
    next(callback) {
        return (0, utils_1.maybePromise)(callback, done => {
            if (this[kId] === bson_1.Long.ZERO) {
                return done(new error_1.MongoCursorExhaustedError());
            }
            next(this, true, done);
        });
    }
    tryNext(callback) {
        return (0, utils_1.maybePromise)(callback, done => {
            if (this[kId] === bson_1.Long.ZERO) {
                return done(new error_1.MongoCursorExhaustedError());
            }
            next(this, false, done);
        });
    }
    forEach(iterator, callback) {
        if (typeof iterator !== 'function') {
            throw new error_1.MongoInvalidArgumentError('Argument "iterator" must be a function');
        }
        return (0, utils_1.maybePromise)(callback, done => {
            const transform = this[kTransform];
            const fetchDocs = () => {
                next(this, true, (err, doc) => {
                    if (err || doc == null)
                        return done(err);
                    let result;
                    // NOTE: no need to transform because `next` will do this automatically
                    try {
                        result = iterator(doc); // TODO(NODE-3283): Improve transform typing
                    }
                    catch (error) {
                        return done(error);
                    }
                    if (result === false)
                        return done();
                    // these do need to be transformed since they are copying the rest of the batch
                    const internalDocs = this[kDocuments].splice(0, this[kDocuments].length);
                    for (let i = 0; i < internalDocs.length; ++i) {
                        try {
                            result = iterator((transform ? transform(internalDocs[i]) : internalDocs[i]) // TODO(NODE-3283): Improve transform typing
                            );
                        }
                        catch (error) {
                            return done(error);
                        }
                        if (result === false)
                            return done();
                    }
                    fetchDocs();
                });
            };
            fetchDocs();
        });
    }
    close(options, callback) {
        if (typeof options === 'function')
            (callback = options), (options = {});
        options = options !== null && options !== void 0 ? options : {};
        const needsToEmitClosed = !this[kClosed];
        this[kClosed] = true;
        return (0, utils_1.maybePromise)(callback, done => cleanupCursor(this, { needsToEmitClosed }, done));
    }
    toArray(callback) {
        return (0, utils_1.maybePromise)(callback, done => {
            const docs = [];
            const transform = this[kTransform];
            const fetchDocs = () => {
                // NOTE: if we add a `nextBatch` then we should use it here
                next(this, true, (err, doc) => {
                    if (err)
                        return done(err);
                    if (doc == null)
                        return done(undefined, docs);
                    // NOTE: no need to transform because `next` will do this automatically
                    docs.push(doc);
                    // these do need to be transformed since they are copying the rest of the batch
                    const internalDocs = (transform
                        ? this[kDocuments].splice(0, this[kDocuments].length).map(transform)
                        : this[kDocuments].splice(0, this[kDocuments].length)); // TODO(NODE-3283): Improve transform typing
                    if (internalDocs) {
                        docs.push(...internalDocs);
                    }
                    fetchDocs();
                });
            };
            fetchDocs();
        });
    }
    /**
     * Add a cursor flag to the cursor
     *
     * @param flag - The flag to set, must be one of following ['tailable', 'oplogReplay', 'noCursorTimeout', 'awaitData', 'partial' -.
     * @param value - The flag boolean value.
     */
    addCursorFlag(flag, value) {
        assertUninitialized(this);
        if (!exports.CURSOR_FLAGS.includes(flag)) {
            throw new error_1.MongoInvalidArgumentError(`Flag ${flag} is not one of ${exports.CURSOR_FLAGS}`);
        }
        if (typeof value !== 'boolean') {
            throw new error_1.MongoInvalidArgumentError(`Flag ${flag} must be a boolean value`);
        }
        this[kOptions][flag] = value;
        return this;
    }
    /**
     * Map all documents using the provided function
     * If there is a transform set on the cursor, that will be called first and the result passed to
     * this function's transform.
     *
     * @remarks
     * **Note for Typescript Users:** adding a transform changes the return type of the iteration of this cursor,
     * it **does not** return a new instance of a cursor. This means when calling map,
     * you should always assign the result to a new variable in order to get a correctly typed cursor variable.
     * Take note of the following example:
     *
     * @example
     * ```typescript
     * const cursor: FindCursor<Document> = coll.find();
     * const mappedCursor: FindCursor<number> = cursor.map(doc => Object.keys(doc).length);
     * const keyCounts: number[] = await mappedCursor.toArray(); // cursor.toArray() still returns Document[]
     * ```
     * @param transform - The mapping transformation method.
     */
    map(transform) {
        assertUninitialized(this);
        const oldTransform = this[kTransform]; // TODO(NODE-3283): Improve transform typing
        if (oldTransform) {
            this[kTransform] = doc => {
                return transform(oldTransform(doc));
            };
        }
        else {
            this[kTransform] = transform;
        }
        return this;
    }
    /**
     * Set the ReadPreference for the cursor.
     *
     * @param readPreference - The new read preference for the cursor.
     */
    withReadPreference(readPreference) {
        assertUninitialized(this);
        if (readPreference instanceof read_preference_1.ReadPreference) {
            this[kOptions].readPreference = readPreference;
        }
        else if (typeof readPreference === 'string') {
            this[kOptions].readPreference = read_preference_1.ReadPreference.fromString(readPreference);
        }
        else {
            throw new error_1.MongoInvalidArgumentError(`Invalid read preference: ${readPreference}`);
        }
        return this;
    }
    /**
     * Set the ReadPreference for the cursor.
     *
     * @param readPreference - The new read preference for the cursor.
     */
    withReadConcern(readConcern) {
        assertUninitialized(this);
        const resolvedReadConcern = read_concern_1.ReadConcern.fromOptions({ readConcern });
        if (resolvedReadConcern) {
            this[kOptions].readConcern = resolvedReadConcern;
        }
        return this;
    }
    /**
     * Set a maxTimeMS on the cursor query, allowing for hard timeout limits on queries (Only supported on MongoDB 2.6 or higher)
     *
     * @param value - Number of milliseconds to wait before aborting the query.
     */
    maxTimeMS(value) {
        assertUninitialized(this);
        if (typeof value !== 'number') {
            throw new error_1.MongoInvalidArgumentError('Argument for maxTimeMS must be a number');
        }
        this[kOptions].maxTimeMS = value;
        return this;
    }
    /**
     * Set the batch size for the cursor.
     *
     * @param value - The number of documents to return per batch. See {@link https://docs.mongodb.com/manual/reference/command/find/|find command documentation}.
     */
    batchSize(value) {
        assertUninitialized(this);
        if (this[kOptions].tailable) {
            throw new error_1.MongoTailableCursorError('Tailable cursor does not support batchSize');
        }
        if (typeof value !== 'number') {
            throw new error_1.MongoInvalidArgumentError('Operation "batchSize" requires an integer');
        }
        this[kOptions].batchSize = value;
        return this;
    }
    /**
     * Rewind this cursor to its uninitialized state. Any options that are present on the cursor will
     * remain in effect. Iterating this cursor will cause new queries to be sent to the server, even
     * if the resultant data has already been retrieved by this cursor.
     */
    rewind() {
        if (!this[kInitialized]) {
            return;
        }
        this[kId] = undefined;
        this[kDocuments] = [];
        this[kClosed] = false;
        this[kKilled] = false;
        this[kInitialized] = false;
        const session = this[kSession];
        if (session) {
            // We only want to end this session if we created it, and it hasn't ended yet
            if (session.explicit === false) {
                if (!session.hasEnded) {
                    session.endSession().catch(() => null);
                }
                this[kSession] = this.client.startSession({ owner: this, explicit: false });
            }
        }
    }
    /** @internal */
    _getMore(batchSize, callback) {
        const cursorId = this[kId];
        const cursorNs = this[kNamespace];
        const server = this[kServer];
        if (cursorId == null) {
            callback(new error_1.MongoRuntimeError('Unable to iterate cursor with no id'));
            return;
        }
        if (server == null) {
            callback(new error_1.MongoRuntimeError('Unable to iterate cursor without selected server'));
            return;
        }
        const getMoreOperation = new get_more_1.GetMoreOperation(cursorNs, cursorId, server, {
            ...this[kOptions],
            session: this[kSession],
            batchSize
        });
        (0, execute_operation_1.executeOperation)(this[kClient], getMoreOperation, callback);
    }
    /**
     * @internal
     *
     * This function is exposed for the unified test runner's createChangeStream
     * operation.  We cannot refactor to use the abstract _initialize method without
     * a significant refactor.
     */
    [kInit](callback) {
        this._initialize(this[kSession], (err, state) => {
            if (state) {
                const response = state.response;
                this[kServer] = state.server;
                if (response.cursor) {
                    this[kId] =
                        typeof response.cursor.id === 'number'
                            ? bson_1.Long.fromNumber(response.cursor.id)
                            : response.cursor.id;
                    if (response.cursor.ns) {
                        this[kNamespace] = (0, utils_1.ns)(response.cursor.ns);
                    }
                    this[kDocuments] = response.cursor.firstBatch;
                }
                // When server responses return without a cursor document, we close this cursor
                // and return the raw server response. This is often the case for explain commands
                // for example
                if (this[kId] == null) {
                    this[kId] = bson_1.Long.ZERO;
                    // TODO(NODE-3286): ExecutionResult needs to accept a generic parameter
                    this[kDocuments] = [state.response];
                }
            }
            // the cursor is now initialized, even if an error occurred or it is dead
            this[kInitialized] = true;
            if (err || cursorIsDead(this)) {
                return cleanupCursor(this, { error: err }, () => callback(err, nextDocument(this)));
            }
            callback();
        });
    }
}
exports.AbstractCursor = AbstractCursor;
/** @event */
AbstractCursor.CLOSE = 'close';
function nextDocument(cursor) {
    if (cursor[kDocuments] == null || !cursor[kDocuments].length) {
        return null;
    }
    const doc = cursor[kDocuments].shift();
    if (doc) {
        const transform = cursor[kTransform];
        if (transform) {
            return transform(doc);
        }
        return doc;
    }
    return null;
}
/**
 * @param cursor - the cursor on which to call `next`
 * @param blocking - a boolean indicating whether or not the cursor should `block` until data
 *     is available.  Generally, this flag is set to `false` because if the getMore returns no documents,
 *     the cursor has been exhausted.  In certain scenarios (ChangeStreams, tailable await cursors and
 *     `tryNext`, for example) blocking is necessary because a getMore returning no documents does
 *     not indicate the end of the cursor.
 * @param callback - callback to return the result to the caller
 * @returns
 */
function next(cursor, blocking, callback) {
    const cursorId = cursor[kId];
    if (cursor.closed) {
        return callback(undefined, null);
    }
    if (cursor[kDocuments] && cursor[kDocuments].length) {
        callback(undefined, nextDocument(cursor));
        return;
    }
    if (cursorId == null) {
        // All cursors must operate within a session, one must be made implicitly if not explicitly provided
        cursor[kInit]((err, value) => {
            if (err)
                return callback(err);
            if (value) {
                return callback(undefined, value);
            }
            return next(cursor, blocking, callback);
        });
        return;
    }
    if (cursorIsDead(cursor)) {
        return cleanupCursor(cursor, undefined, () => callback(undefined, null));
    }
    // otherwise need to call getMore
    const batchSize = cursor[kOptions].batchSize || 1000;
    cursor._getMore(batchSize, (err, response) => {
        if (response) {
            const cursorId = typeof response.cursor.id === 'number'
                ? bson_1.Long.fromNumber(response.cursor.id)
                : response.cursor.id;
            cursor[kDocuments] = response.cursor.nextBatch;
            cursor[kId] = cursorId;
        }
        if (err || cursorIsDead(cursor)) {
            return cleanupCursor(cursor, { error: err }, () => callback(err, nextDocument(cursor)));
        }
        if (cursor[kDocuments].length === 0 && blocking === false) {
            return callback(undefined, null);
        }
        next(cursor, blocking, callback);
    });
}
exports.next = next;
function cursorIsDead(cursor) {
    const cursorId = cursor[kId];
    return !!cursorId && cursorId.isZero();
}
function cleanupCursor(cursor, options, callback) {
    var _a;
    const cursorId = cursor[kId];
    const cursorNs = cursor[kNamespace];
    const server = cursor[kServer];
    const session = cursor[kSession];
    const error = options === null || options === void 0 ? void 0 : options.error;
    const needsToEmitClosed = (_a = options === null || options === void 0 ? void 0 : options.needsToEmitClosed) !== null && _a !== void 0 ? _a : cursor[kDocuments].length === 0;
    if (error) {
        if (cursor.loadBalanced && error instanceof error_1.MongoNetworkError) {
            return completeCleanup();
        }
    }
    if (cursorId == null || server == null || cursorId.isZero() || cursorNs == null) {
        if (needsToEmitClosed) {
            cursor[kClosed] = true;
            cursor[kId] = bson_1.Long.ZERO;
            cursor.emit(AbstractCursor.CLOSE);
        }
        if (session) {
            if (session.owner === cursor) {
                return session.endSession({ error }, callback);
            }
            if (!session.inTransaction()) {
                (0, sessions_1.maybeClearPinnedConnection)(session, { error });
            }
        }
        return callback();
    }
    function completeCleanup() {
        if (session) {
            if (session.owner === cursor) {
                return session.endSession({ error }, () => {
                    cursor.emit(AbstractCursor.CLOSE);
                    callback();
                });
            }
            if (!session.inTransaction()) {
                (0, sessions_1.maybeClearPinnedConnection)(session, { error });
            }
        }
        cursor.emit(AbstractCursor.CLOSE);
        return callback();
    }
    cursor[kKilled] = true;
    return (0, execute_operation_1.executeOperation)(cursor[kClient], new kill_cursors_1.KillCursorsOperation(cursorId, cursorNs, server, { session }), completeCleanup);
}
/** @internal */
function assertUninitialized(cursor) {
    if (cursor[kInitialized]) {
        throw new error_1.MongoCursorInUseError();
    }
}
exports.assertUninitialized = assertUninitialized;
class ReadableCursorStream extends stream_1.Readable {
    constructor(cursor) {
        super({
            objectMode: true,
            autoDestroy: false,
            highWaterMark: 1
        });
        this._readInProgress = false;
        this._cursor = cursor;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _read(size) {
        if (!this._readInProgress) {
            this._readInProgress = true;
            this._readNext();
        }
    }
    _destroy(error, callback) {
        this._cursor.close(err => process.nextTick(callback, err || error));
    }
    _readNext() {
        next(this._cursor, true, (err, result) => {
            if (err) {
                // NOTE: This is questionable, but we have a test backing the behavior. It seems the
                //       desired behavior is that a stream ends cleanly when a user explicitly closes
                //       a client during iteration. Alternatively, we could do the "right" thing and
                //       propagate the error message by removing this special case.
                if (err.message.match(/server is closed/)) {
                    this._cursor.close().catch(() => null);
                    return this.push(null);
                }
                // NOTE: This is also perhaps questionable. The rationale here is that these errors tend
                //       to be "operation interrupted", where a cursor has been closed but there is an
                //       active getMore in-flight. This used to check if the cursor was killed but once
                //       that changed to happen in cleanup legitimate errors would not destroy the
                //       stream. There are change streams test specifically test these cases.
                if (err.message.match(/interrupted/)) {
                    return this.push(null);
                }
                return this.destroy(err);
            }
            if (result == null) {
                this.push(null);
            }
            else if (this.destroyed) {
                this._cursor.close().catch(() => null);
            }
            else {
                if (this.push(result)) {
                    return this._readNext();
                }
                this._readInProgress = false;
            }
        });
    }
}
//# sourceMappingURL=abstract_cursor.js.map