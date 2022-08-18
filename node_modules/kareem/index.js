'use strict';

function Kareem() {
  this._pres = new Map();
  this._posts = new Map();
}

Kareem.skipWrappedFunction = function skipWrappedFunction() {
  if (!(this instanceof Kareem.skipWrappedFunction)) {
    return new Kareem.skipWrappedFunction(...arguments);
  }

  this.args = [...arguments];
};

Kareem.overwriteResult = function overwriteResult() {
  if (!(this instanceof Kareem.overwriteResult)) {
    return new Kareem.overwriteResult(...arguments);
  }

  this.args = [...arguments];
};

Kareem.prototype.execPre = function(name, context, args, callback) {
  if (arguments.length === 3) {
    callback = args;
    args = [];
  }
  var pres = this._pres.get(name) || [];
  var numPres = pres.length;
  var numAsyncPres = pres.numAsync || 0;
  var currentPre = 0;
  var asyncPresLeft = numAsyncPres;
  var done = false;
  var $args = args;
  var shouldSkipWrappedFunction = null;

  if (!numPres) {
    return nextTick(function() {
      callback(null);
    });
  }

  var next = function() {
    if (currentPre >= numPres) {
      return;
    }
    var pre = pres[currentPre];

    if (pre.isAsync) {
      var args = [
        decorateNextFn(_next),
        decorateNextFn(function(error) {
          if (error) {
            if (done) {
              return;
            }
            if (error instanceof Kareem.skipWrappedFunction) {
              shouldSkipWrappedFunction = error;
            } else {
              done = true;
              return callback(error);
            }
          }
          if (--asyncPresLeft === 0 && currentPre >= numPres) {
            return callback(shouldSkipWrappedFunction);
          }
        })
      ];

      callMiddlewareFunction(pre.fn, context, args, args[0]);
    } else if (pre.fn.length > 0) {
      var args = [decorateNextFn(_next)];
      var _args = arguments.length >= 2 ? arguments : [null].concat($args);
      for (var i = 1; i < _args.length; ++i) {
        args.push(_args[i]);
      }

      callMiddlewareFunction(pre.fn, context, args, args[0]);
    } else {
      let maybePromiseLike = null;
      try {
        maybePromiseLike = pre.fn.call(context);
      } catch (err) {
        if (err != null) {
          return callback(err);
        }
      }

      if (isPromiseLike(maybePromiseLike)) {
        maybePromiseLike.then(() => _next(), err => _next(err));
      } else {
        if (++currentPre >= numPres) {
          if (asyncPresLeft > 0) {
            // Leave parallel hooks to run
            return;
          } else {
            return nextTick(function() {
              callback(shouldSkipWrappedFunction);
            });
          }
        }
        next();
      }
    }
  };

  next.apply(null, [null].concat(args));

  function _next(error) {
    if (error) {
      if (done) {
        return;
      }
      if (error instanceof Kareem.skipWrappedFunction) {
        shouldSkipWrappedFunction = error;
      } else {
        done = true;
        return callback(error);
      }
    }

    if (++currentPre >= numPres) {
      if (asyncPresLeft > 0) {
        // Leave parallel hooks to run
        return;
      } else {
        return callback(shouldSkipWrappedFunction);
      }
    }

    next.apply(context, arguments);
  }
};

Kareem.prototype.execPreSync = function(name, context, args) {
  var pres = this._pres.get(name) || [];
  var numPres = pres.length;

  for (var i = 0; i < numPres; ++i) {
    pres[i].fn.apply(context, args || []);
  }
};

Kareem.prototype.execPost = function(name, context, args, options, callback) {
  if (arguments.length < 5) {
    callback = options;
    options = null;
  }
  var posts = this._posts.get(name) || [];
  var numPosts = posts.length;
  var currentPost = 0;

  var firstError = null;
  if (options && options.error) {
    firstError = options.error;
  }

  if (!numPosts) {
    return nextTick(function() {
      callback.apply(null, [firstError].concat(args));
    });
  }

  var next = function() {
    var post = posts[currentPost].fn;
    var numArgs = 0;
    var argLength = args.length;
    var newArgs = [];
    for (var i = 0; i < argLength; ++i) {
      numArgs += args[i] && args[i]._kareemIgnore ? 0 : 1;
      if (!args[i] || !args[i]._kareemIgnore) {
        newArgs.push(args[i]);
      }
    }

    if (firstError) {
      if (post.length === numArgs + 2) {
        const _cb = decorateNextFn(function(error) {
          if (error) {
            if (error instanceof Kareem.overwriteResult) {
              args = error.args;
              if (++currentPost >= numPosts) {
                return callback.call(null, firstError);
              }
              return next();
            }
            firstError = error;
          }
          if (++currentPost >= numPosts) {
            return callback.call(null, firstError);
          }
          next();
        });

        callMiddlewareFunction(post, context,
          [firstError].concat(newArgs).concat([_cb]), _cb);
      } else {
        if (++currentPost >= numPosts) {
          return callback.call(null, firstError);
        }
        next();
      }
    } else {
      const _cb = decorateNextFn(function(error) {
        if (error) {
          if (error instanceof Kareem.overwriteResult) {
            args = error.args;
            if (++currentPost >= numPosts) {
              return callback.apply(null, [null].concat(args));
            }
            return next();
          }
          firstError = error;
          return next();
        }

        if (++currentPost >= numPosts) {
          return callback.apply(null, [null].concat(args));
        }

        next();
      });

      if (post.length === numArgs + 2) {
        // Skip error handlers if no error
        if (++currentPost >= numPosts) {
          return callback.apply(null, [null].concat(args));
        }
        return next();
      }
      if (post.length === numArgs + 1) {
        callMiddlewareFunction(post, context, newArgs.concat([_cb]), _cb);
      } else {
        let error;
        let maybePromiseLike;
        try {
          maybePromiseLike = post.apply(context, newArgs);
        } catch (err) {
          error = err;
          firstError = err;
        }

        if (isPromiseLike(maybePromiseLike)) {
          return maybePromiseLike.then(
            (res) => {
              _cb(res instanceof Kareem.overwriteResult ? res : null);
            },
            err => _cb(err)
          );
        }

        if (maybePromiseLike instanceof Kareem.overwriteResult) {
          args = maybePromiseLike.args;
        }

        if (++currentPost >= numPosts) {
          return callback.apply(null, [error].concat(args));
        }

        next();
      }
    }
  };

  next();
};

Kareem.prototype.execPostSync = function(name, context, args) {
  const posts = this._posts.get(name) || [];
  const numPosts = posts.length;

  for (let i = 0; i < numPosts; ++i) {
    const res = posts[i].fn.apply(context, args || []);
    if (res instanceof Kareem.overwriteResult) {
      args = res.args;
    }
  }

  return args;
};

Kareem.prototype.createWrapperSync = function(name, fn) {
  var kareem = this;
  return function syncWrapper() {
    kareem.execPreSync(name, this, arguments);

    var toReturn = fn.apply(this, arguments);

    const result = kareem.execPostSync(name, this, [toReturn]);

    return result[0];
  };
};

function _handleWrapError(instance, error, name, context, args, options, callback) {
  if (options.useErrorHandlers) {
    return instance.execPost(name, context, args, { error: error }, function(error) {
      return typeof callback === 'function' && callback(error);
    });
  } else {
    return typeof callback === 'function' && callback(error);
  }
}

Kareem.prototype.wrap = function(name, fn, context, args, options) {
  const lastArg = (args.length > 0 ? args[args.length - 1] : null);
  let argsWithoutCb = Array.from(args);
  typeof lastArg === 'function' && argsWithoutCb.pop();
  const _this = this;

  options = options || {};
  const checkForPromise = options.checkForPromise;

  this.execPre(name, context, args, function(error) {
    if (error && !(error instanceof Kareem.skipWrappedFunction)) {
      const numCallbackParams = options.numCallbackParams || 0;
      const errorArgs = options.contextParameter ? [context] : [];
      for (var i = errorArgs.length; i < numCallbackParams; ++i) {
        errorArgs.push(null);
      }
      return _handleWrapError(_this, error, name, context, errorArgs,
        options, lastArg);
    }

    const numParameters = fn.length;
    let ret;

    if (error instanceof Kareem.skipWrappedFunction) {
      ret = error.args[0];
      return _cb(null, ...error.args);
    } else {
      try {
        ret = fn.apply(context, argsWithoutCb.concat(_cb));
      } catch (err) {
        return _cb(err);
      }
    }

    if (checkForPromise) {
      if (isPromiseLike(ret)) {
        // Thenable, use it
        return ret.then(
          res => _cb(null, res),
          err => _cb(err)
        );
      }

      // If `fn()` doesn't have a callback argument and doesn't return a
      // promise, assume it is sync
      if (numParameters < argsWithoutCb.length + 1) {
        return _cb(null, ret);
      }
    }

    function _cb() {
      const argsWithoutError = Array.from(arguments);
      argsWithoutError.shift();
      if (options.nullResultByDefault && argsWithoutError.length === 0) {
        argsWithoutError.push(null);
      }
      if (arguments[0]) {
        // Assume error
        return _handleWrapError(_this, arguments[0], name, context,
          argsWithoutError, options, lastArg);
      } else {
        _this.execPost(name, context, argsWithoutError, function() {
          if (lastArg === null) {
            return;
          }
          arguments[0]
            ? lastArg(arguments[0])
            : lastArg.apply(context, arguments);
        });
      }
    }
  });
};

Kareem.prototype.filter = function(fn) {
  const clone = this.clone();

  const pres = Array.from(clone._pres.keys());
  for (const name of pres) {
    const hooks = this._pres.get(name).
      map(h => Object.assign({}, h, { name: name })).
      filter(fn);

    if (hooks.length === 0) {
      clone._pres.delete(name);
      continue;
    }

    hooks.numAsync = hooks.filter(h => h.isAsync).length;

    clone._pres.set(name, hooks);
  }

  const posts = Array.from(clone._posts.keys());
  for (const name of posts) {
    const hooks = this._posts.get(name).
      map(h => Object.assign({}, h, { name: name })).
      filter(fn);

    if (hooks.length === 0) {
      clone._posts.delete(name);
      continue;
    }

    clone._posts.set(name, hooks);
  }

  return clone;
};

Kareem.prototype.hasHooks = function(name) {
  return this._pres.has(name) || this._posts.has(name);
};

Kareem.prototype.createWrapper = function(name, fn, context, options) {
  var _this = this;
  if (!this.hasHooks(name)) {
    // Fast path: if there's no hooks for this function, just return the
    // function wrapped in a nextTick()
    return function() {
      nextTick(() => fn.apply(this, arguments));
    };
  }
  return function() {
    var _context = context || this;
    _this.wrap(name, fn, _context, Array.from(arguments), options);
  };
};

Kareem.prototype.pre = function(name, isAsync, fn, error, unshift) {
  let options = {};
  if (typeof isAsync === 'object' && isAsync !== null) {
    options = isAsync;
    isAsync = options.isAsync;
  } else if (typeof arguments[1] !== 'boolean') {
    fn = isAsync;
    isAsync = false;
  }

  const pres = this._pres.get(name) || [];
  this._pres.set(name, pres);

  if (isAsync) {
    pres.numAsync = pres.numAsync || 0;
    ++pres.numAsync;
  }

  if (typeof fn !== 'function') {
    throw new Error('pre() requires a function, got "' + typeof fn + '"');
  }

  if (unshift) {
    pres.unshift(Object.assign({}, options, { fn: fn, isAsync: isAsync }));
  } else {
    pres.push(Object.assign({}, options, { fn: fn, isAsync: isAsync }));
  }

  return this;
};

Kareem.prototype.post = function(name, options, fn, unshift) {
  const hooks = this._posts.get(name) || [];

  if (typeof options === 'function') {
    unshift = !!fn;
    fn = options;
    options = {};
  }

  if (typeof fn !== 'function') {
    throw new Error('post() requires a function, got "' + typeof fn + '"');
  }

  if (unshift) {
    hooks.unshift(Object.assign({}, options, { fn: fn }));
  } else {
    hooks.push(Object.assign({}, options, { fn: fn }));
  }
  this._posts.set(name, hooks);
  return this;
};

Kareem.prototype.clone = function() {
  const n = new Kareem();

  for (let key of this._pres.keys()) {
    const clone = this._pres.get(key).slice();
    clone.numAsync = this._pres.get(key).numAsync;
    n._pres.set(key, clone);
  }
  for (let key of this._posts.keys()) {
    n._posts.set(key, this._posts.get(key).slice());
  }

  return n;
};

Kareem.prototype.merge = function(other, clone) {
  clone = arguments.length === 1 ? true : clone;
  var ret = clone ? this.clone() : this;

  for (let key of other._pres.keys()) {
    const sourcePres = ret._pres.get(key) || [];
    const deduplicated = other._pres.get(key).
      // Deduplicate based on `fn`
      filter(p => sourcePres.map(_p => _p.fn).indexOf(p.fn) === -1);
    const combined = sourcePres.concat(deduplicated);
    combined.numAsync = sourcePres.numAsync || 0;
    combined.numAsync += deduplicated.filter(p => p.isAsync).length;
    ret._pres.set(key, combined);
  }
  for (let key of other._posts.keys()) {
    const sourcePosts = ret._posts.get(key) || [];
    const deduplicated = other._posts.get(key).
      filter(p => sourcePosts.indexOf(p) === -1);
    ret._posts.set(key, sourcePosts.concat(deduplicated));
  }

  return ret;
};

function callMiddlewareFunction(fn, context, args, next) {
  let maybePromiseLike;
  try {
    maybePromiseLike = fn.apply(context, args);
  } catch (error) {
    return next(error);
  }

  if (isPromiseLike(maybePromiseLike)) {
    maybePromiseLike.then(() => next(), err => next(err));
  }
}

function isPromiseLike(v) {
  return (typeof v === 'object' && v !== null && typeof v.then === 'function');
}

function decorateNextFn(fn) {
  var called = false;
  var _this = this;
  return function() {
    // Ensure this function can only be called once
    if (called) {
      return;
    }
    called = true;
    // Make sure to clear the stack so try/catch doesn't catch errors
    // in subsequent middleware
    return nextTick(() => fn.apply(_this, arguments));
  };
}

const nextTick = typeof process === 'object' && process !== null && process.nextTick || function nextTick(cb) { 
  setTimeout(cb, 0); 
};

module.exports = Kareem;
