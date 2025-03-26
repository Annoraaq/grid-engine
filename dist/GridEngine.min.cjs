var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/rxjs/dist/cjs/internal/util/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isFunction.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isFunction = void 0;
    function isFunction(value) {
      return typeof value === "function";
    }
    exports2.isFunction = isFunction;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/createErrorClass.js
var require_createErrorClass = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/createErrorClass.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createErrorClass = void 0;
    function createErrorClass(createImpl) {
      var _super = function(instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
      };
      var ctorFunc = createImpl(_super);
      ctorFunc.prototype = Object.create(Error.prototype);
      ctorFunc.prototype.constructor = ctorFunc;
      return ctorFunc;
    }
    exports2.createErrorClass = createErrorClass;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/UnsubscriptionError.js
var require_UnsubscriptionError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/UnsubscriptionError.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UnsubscriptionError = void 0;
    var createErrorClass_1 = require_createErrorClass();
    exports2.UnsubscriptionError = createErrorClass_1.createErrorClass(function(_super) {
      return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
          return i + 1 + ") " + err.toString();
        }).join("\n  ") : "";
        this.name = "UnsubscriptionError";
        this.errors = errors;
      };
    });
  }
});

// node_modules/rxjs/dist/cjs/internal/util/arrRemove.js
var require_arrRemove = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/arrRemove.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.arrRemove = void 0;
    function arrRemove(arr, item) {
      if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
      }
    }
    exports2.arrRemove = arrRemove;
  }
});

// node_modules/rxjs/dist/cjs/internal/Subscription.js
var require_Subscription = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/Subscription.js"(exports2) {
    "use strict";
    var __values = exports2 && exports2.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isSubscription = exports2.EMPTY_SUBSCRIPTION = exports2.Subscription = void 0;
    var isFunction_1 = require_isFunction();
    var UnsubscriptionError_1 = require_UnsubscriptionError();
    var arrRemove_1 = require_arrRemove();
    var Subscription = function() {
      function Subscription2(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._finalizers = null;
      }
      Subscription2.prototype.unsubscribe = function() {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
          this.closed = true;
          var _parentage = this._parentage;
          if (_parentage) {
            this._parentage = null;
            if (Array.isArray(_parentage)) {
              try {
                for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                  var parent_1 = _parentage_1_1.value;
                  parent_1.remove(this);
                }
              } catch (e_1_1) {
                e_1 = { error: e_1_1 };
              } finally {
                try {
                  if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                } finally {
                  if (e_1) throw e_1.error;
                }
              }
            } else {
              _parentage.remove(this);
            }
          }
          var initialFinalizer = this.initialTeardown;
          if (isFunction_1.isFunction(initialFinalizer)) {
            try {
              initialFinalizer();
            } catch (e) {
              errors = e instanceof UnsubscriptionError_1.UnsubscriptionError ? e.errors : [e];
            }
          }
          var _finalizers = this._finalizers;
          if (_finalizers) {
            this._finalizers = null;
            try {
              for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                var finalizer = _finalizers_1_1.value;
                try {
                  execFinalizer(finalizer);
                } catch (err) {
                  errors = errors !== null && errors !== void 0 ? errors : [];
                  if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                    errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                  } else {
                    errors.push(err);
                  }
                }
              }
            } catch (e_2_1) {
              e_2 = { error: e_2_1 };
            } finally {
              try {
                if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
              } finally {
                if (e_2) throw e_2.error;
              }
            }
          }
          if (errors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
          }
        }
      };
      Subscription2.prototype.add = function(teardown) {
        var _a;
        if (teardown && teardown !== this) {
          if (this.closed) {
            execFinalizer(teardown);
          } else {
            if (teardown instanceof Subscription2) {
              if (teardown.closed || teardown._hasParent(this)) {
                return;
              }
              teardown._addParent(this);
            }
            (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
          }
        }
      };
      Subscription2.prototype._hasParent = function(parent) {
        var _parentage = this._parentage;
        return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
      };
      Subscription2.prototype._addParent = function(parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
      };
      Subscription2.prototype._removeParent = function(parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
          this._parentage = null;
        } else if (Array.isArray(_parentage)) {
          arrRemove_1.arrRemove(_parentage, parent);
        }
      };
      Subscription2.prototype.remove = function(teardown) {
        var _finalizers = this._finalizers;
        _finalizers && arrRemove_1.arrRemove(_finalizers, teardown);
        if (teardown instanceof Subscription2) {
          teardown._removeParent(this);
        }
      };
      Subscription2.EMPTY = function() {
        var empty = new Subscription2();
        empty.closed = true;
        return empty;
      }();
      return Subscription2;
    }();
    exports2.Subscription = Subscription;
    exports2.EMPTY_SUBSCRIPTION = Subscription.EMPTY;
    function isSubscription(value) {
      return value instanceof Subscription || value && "closed" in value && isFunction_1.isFunction(value.remove) && isFunction_1.isFunction(value.add) && isFunction_1.isFunction(value.unsubscribe);
    }
    exports2.isSubscription = isSubscription;
    function execFinalizer(finalizer) {
      if (isFunction_1.isFunction(finalizer)) {
        finalizer();
      } else {
        finalizer.unsubscribe();
      }
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/config.js
var require_config = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/config.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.config = void 0;
    exports2.config = {
      onUnhandledError: null,
      onStoppedNotification: null,
      Promise: void 0,
      useDeprecatedSynchronousErrorHandling: false,
      useDeprecatedNextContext: false
    };
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/timeoutProvider.js
var require_timeoutProvider = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/timeoutProvider.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.timeoutProvider = void 0;
    exports2.timeoutProvider = {
      setTimeout: function(handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          args[_i - 2] = arguments[_i];
        }
        var delegate = exports2.timeoutProvider.delegate;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
          return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
        }
        return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
      },
      clearTimeout: function(handle) {
        var delegate = exports2.timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
      },
      delegate: void 0
    };
  }
});

// node_modules/rxjs/dist/cjs/internal/util/reportUnhandledError.js
var require_reportUnhandledError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/reportUnhandledError.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.reportUnhandledError = void 0;
    var config_1 = require_config();
    var timeoutProvider_1 = require_timeoutProvider();
    function reportUnhandledError(err) {
      timeoutProvider_1.timeoutProvider.setTimeout(function() {
        var onUnhandledError = config_1.config.onUnhandledError;
        if (onUnhandledError) {
          onUnhandledError(err);
        } else {
          throw err;
        }
      });
    }
    exports2.reportUnhandledError = reportUnhandledError;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/noop.js
var require_noop = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/noop.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.noop = void 0;
    function noop() {
    }
    exports2.noop = noop;
  }
});

// node_modules/rxjs/dist/cjs/internal/NotificationFactories.js
var require_NotificationFactories = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/NotificationFactories.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createNotification = exports2.nextNotification = exports2.errorNotification = exports2.COMPLETE_NOTIFICATION = void 0;
    exports2.COMPLETE_NOTIFICATION = function() {
      return createNotification("C", void 0, void 0);
    }();
    function errorNotification(error) {
      return createNotification("E", void 0, error);
    }
    exports2.errorNotification = errorNotification;
    function nextNotification(value) {
      return createNotification("N", value, void 0);
    }
    exports2.nextNotification = nextNotification;
    function createNotification(kind, value, error) {
      return {
        kind,
        value,
        error
      };
    }
    exports2.createNotification = createNotification;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/errorContext.js
var require_errorContext = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/errorContext.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.captureError = exports2.errorContext = void 0;
    var config_1 = require_config();
    var context = null;
    function errorContext(cb) {
      if (config_1.config.useDeprecatedSynchronousErrorHandling) {
        var isRoot = !context;
        if (isRoot) {
          context = { errorThrown: false, error: null };
        }
        cb();
        if (isRoot) {
          var _a = context, errorThrown = _a.errorThrown, error = _a.error;
          context = null;
          if (errorThrown) {
            throw error;
          }
        }
      } else {
        cb();
      }
    }
    exports2.errorContext = errorContext;
    function captureError(err) {
      if (config_1.config.useDeprecatedSynchronousErrorHandling && context) {
        context.errorThrown = true;
        context.error = err;
      }
    }
    exports2.captureError = captureError;
  }
});

// node_modules/rxjs/dist/cjs/internal/Subscriber.js
var require_Subscriber = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/Subscriber.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.EMPTY_OBSERVER = exports2.SafeSubscriber = exports2.Subscriber = void 0;
    var isFunction_1 = require_isFunction();
    var Subscription_1 = require_Subscription();
    var config_1 = require_config();
    var reportUnhandledError_1 = require_reportUnhandledError();
    var noop_1 = require_noop();
    var NotificationFactories_1 = require_NotificationFactories();
    var timeoutProvider_1 = require_timeoutProvider();
    var errorContext_1 = require_errorContext();
    var Subscriber = function(_super) {
      __extends(Subscriber2, _super);
      function Subscriber2(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
          _this.destination = destination;
          if (Subscription_1.isSubscription(destination)) {
            destination.add(_this);
          }
        } else {
          _this.destination = exports2.EMPTY_OBSERVER;
        }
        return _this;
      }
      Subscriber2.create = function(next, error, complete) {
        return new SafeSubscriber(next, error, complete);
      };
      Subscriber2.prototype.next = function(value) {
        if (this.isStopped) {
          handleStoppedNotification(NotificationFactories_1.nextNotification(value), this);
        } else {
          this._next(value);
        }
      };
      Subscriber2.prototype.error = function(err) {
        if (this.isStopped) {
          handleStoppedNotification(NotificationFactories_1.errorNotification(err), this);
        } else {
          this.isStopped = true;
          this._error(err);
        }
      };
      Subscriber2.prototype.complete = function() {
        if (this.isStopped) {
          handleStoppedNotification(NotificationFactories_1.COMPLETE_NOTIFICATION, this);
        } else {
          this.isStopped = true;
          this._complete();
        }
      };
      Subscriber2.prototype.unsubscribe = function() {
        if (!this.closed) {
          this.isStopped = true;
          _super.prototype.unsubscribe.call(this);
          this.destination = null;
        }
      };
      Subscriber2.prototype._next = function(value) {
        this.destination.next(value);
      };
      Subscriber2.prototype._error = function(err) {
        try {
          this.destination.error(err);
        } finally {
          this.unsubscribe();
        }
      };
      Subscriber2.prototype._complete = function() {
        try {
          this.destination.complete();
        } finally {
          this.unsubscribe();
        }
      };
      return Subscriber2;
    }(Subscription_1.Subscription);
    exports2.Subscriber = Subscriber;
    var _bind = Function.prototype.bind;
    function bind(fn, thisArg) {
      return _bind.call(fn, thisArg);
    }
    var ConsumerObserver = function() {
      function ConsumerObserver2(partialObserver) {
        this.partialObserver = partialObserver;
      }
      ConsumerObserver2.prototype.next = function(value) {
        var partialObserver = this.partialObserver;
        if (partialObserver.next) {
          try {
            partialObserver.next(value);
          } catch (error) {
            handleUnhandledError(error);
          }
        }
      };
      ConsumerObserver2.prototype.error = function(err) {
        var partialObserver = this.partialObserver;
        if (partialObserver.error) {
          try {
            partialObserver.error(err);
          } catch (error) {
            handleUnhandledError(error);
          }
        } else {
          handleUnhandledError(err);
        }
      };
      ConsumerObserver2.prototype.complete = function() {
        var partialObserver = this.partialObserver;
        if (partialObserver.complete) {
          try {
            partialObserver.complete();
          } catch (error) {
            handleUnhandledError(error);
          }
        }
      };
      return ConsumerObserver2;
    }();
    var SafeSubscriber = function(_super) {
      __extends(SafeSubscriber2, _super);
      function SafeSubscriber2(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var partialObserver;
        if (isFunction_1.isFunction(observerOrNext) || !observerOrNext) {
          partialObserver = {
            next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
            error: error !== null && error !== void 0 ? error : void 0,
            complete: complete !== null && complete !== void 0 ? complete : void 0
          };
        } else {
          var context_1;
          if (_this && config_1.config.useDeprecatedNextContext) {
            context_1 = Object.create(observerOrNext);
            context_1.unsubscribe = function() {
              return _this.unsubscribe();
            };
            partialObserver = {
              next: observerOrNext.next && bind(observerOrNext.next, context_1),
              error: observerOrNext.error && bind(observerOrNext.error, context_1),
              complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
            };
          } else {
            partialObserver = observerOrNext;
          }
        }
        _this.destination = new ConsumerObserver(partialObserver);
        return _this;
      }
      return SafeSubscriber2;
    }(Subscriber);
    exports2.SafeSubscriber = SafeSubscriber;
    function handleUnhandledError(error) {
      if (config_1.config.useDeprecatedSynchronousErrorHandling) {
        errorContext_1.captureError(error);
      } else {
        reportUnhandledError_1.reportUnhandledError(error);
      }
    }
    function defaultErrorHandler(err) {
      throw err;
    }
    function handleStoppedNotification(notification, subscriber) {
      var onStoppedNotification = config_1.config.onStoppedNotification;
      onStoppedNotification && timeoutProvider_1.timeoutProvider.setTimeout(function() {
        return onStoppedNotification(notification, subscriber);
      });
    }
    exports2.EMPTY_OBSERVER = {
      closed: true,
      next: noop_1.noop,
      error: defaultErrorHandler,
      complete: noop_1.noop
    };
  }
});

// node_modules/rxjs/dist/cjs/internal/symbol/observable.js
var require_observable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/symbol/observable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.observable = void 0;
    exports2.observable = function() {
      return typeof Symbol === "function" && Symbol.observable || "@@observable";
    }();
  }
});

// node_modules/rxjs/dist/cjs/internal/util/identity.js
var require_identity = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/identity.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.identity = void 0;
    function identity(x) {
      return x;
    }
    exports2.identity = identity;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/pipe.js
var require_pipe = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/pipe.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.pipeFromArray = exports2.pipe = void 0;
    var identity_1 = require_identity();
    function pipe2() {
      var fns = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
      }
      return pipeFromArray(fns);
    }
    exports2.pipe = pipe2;
    function pipeFromArray(fns) {
      if (fns.length === 0) {
        return identity_1.identity;
      }
      if (fns.length === 1) {
        return fns[0];
      }
      return function piped(input) {
        return fns.reduce(function(prev, fn) {
          return fn(prev);
        }, input);
      };
    }
    exports2.pipeFromArray = pipeFromArray;
  }
});

// node_modules/rxjs/dist/cjs/internal/Observable.js
var require_Observable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/Observable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Observable = void 0;
    var Subscriber_1 = require_Subscriber();
    var Subscription_1 = require_Subscription();
    var observable_1 = require_observable();
    var pipe_1 = require_pipe();
    var config_1 = require_config();
    var isFunction_1 = require_isFunction();
    var errorContext_1 = require_errorContext();
    var Observable4 = function() {
      function Observable5(subscribe) {
        if (subscribe) {
          this._subscribe = subscribe;
        }
      }
      Observable5.prototype.lift = function(operator) {
        var observable = new Observable5();
        observable.source = this;
        observable.operator = operator;
        return observable;
      };
      Observable5.prototype.subscribe = function(observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new Subscriber_1.SafeSubscriber(observerOrNext, error, complete);
        errorContext_1.errorContext(function() {
          var _a = _this, operator = _a.operator, source = _a.source;
          subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
        });
        return subscriber;
      };
      Observable5.prototype._trySubscribe = function(sink) {
        try {
          return this._subscribe(sink);
        } catch (err) {
          sink.error(err);
        }
      };
      Observable5.prototype.forEach = function(next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function(resolve, reject) {
          var subscriber = new Subscriber_1.SafeSubscriber({
            next: function(value) {
              try {
                next(value);
              } catch (err) {
                reject(err);
                subscriber.unsubscribe();
              }
            },
            error: reject,
            complete: resolve
          });
          _this.subscribe(subscriber);
        });
      };
      Observable5.prototype._subscribe = function(subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
      };
      Observable5.prototype[observable_1.observable] = function() {
        return this;
      };
      Observable5.prototype.pipe = function() {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          operations[_i] = arguments[_i];
        }
        return pipe_1.pipeFromArray(operations)(this);
      };
      Observable5.prototype.toPromise = function(promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function(resolve, reject) {
          var value;
          _this.subscribe(function(x) {
            return value = x;
          }, function(err) {
            return reject(err);
          }, function() {
            return resolve(value);
          });
        });
      };
      Observable5.create = function(subscribe) {
        return new Observable5(subscribe);
      };
      return Observable5;
    }();
    exports2.Observable = Observable4;
    function getPromiseCtor(promiseCtor) {
      var _a;
      return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config_1.config.Promise) !== null && _a !== void 0 ? _a : Promise;
    }
    function isObserver(value) {
      return value && isFunction_1.isFunction(value.next) && isFunction_1.isFunction(value.error) && isFunction_1.isFunction(value.complete);
    }
    function isSubscriber(value) {
      return value && value instanceof Subscriber_1.Subscriber || isObserver(value) && Subscription_1.isSubscription(value);
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/util/lift.js
var require_lift = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/lift.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.operate = exports2.hasLift = void 0;
    var isFunction_1 = require_isFunction();
    function hasLift(source) {
      return isFunction_1.isFunction(source === null || source === void 0 ? void 0 : source.lift);
    }
    exports2.hasLift = hasLift;
    function operate(init) {
      return function(source) {
        if (hasLift(source)) {
          return source.lift(function(liftedSource) {
            try {
              return init(liftedSource, this);
            } catch (err) {
              this.error(err);
            }
          });
        }
        throw new TypeError("Unable to lift unknown Observable type");
      };
    }
    exports2.operate = operate;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/OperatorSubscriber.js
var require_OperatorSubscriber = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/OperatorSubscriber.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OperatorSubscriber = exports2.createOperatorSubscriber = void 0;
    var Subscriber_1 = require_Subscriber();
    function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
      return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
    }
    exports2.createOperatorSubscriber = createOperatorSubscriber;
    var OperatorSubscriber = function(_super) {
      __extends(OperatorSubscriber2, _super);
      function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this.shouldUnsubscribe = shouldUnsubscribe;
        _this._next = onNext ? function(value) {
          try {
            onNext(value);
          } catch (err) {
            destination.error(err);
          }
        } : _super.prototype._next;
        _this._error = onError ? function(err) {
          try {
            onError(err);
          } catch (err2) {
            destination.error(err2);
          } finally {
            this.unsubscribe();
          }
        } : _super.prototype._error;
        _this._complete = onComplete ? function() {
          try {
            onComplete();
          } catch (err) {
            destination.error(err);
          } finally {
            this.unsubscribe();
          }
        } : _super.prototype._complete;
        return _this;
      }
      OperatorSubscriber2.prototype.unsubscribe = function() {
        var _a;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
          var closed_1 = this.closed;
          _super.prototype.unsubscribe.call(this);
          !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
        }
      };
      return OperatorSubscriber2;
    }(Subscriber_1.Subscriber);
    exports2.OperatorSubscriber = OperatorSubscriber;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/refCount.js
var require_refCount = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/refCount.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.refCount = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function refCount() {
      return lift_1.operate(function(source, subscriber) {
        var connection = null;
        source._refCount++;
        var refCounter = OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, void 0, void 0, function() {
          if (!source || source._refCount <= 0 || 0 < --source._refCount) {
            connection = null;
            return;
          }
          var sharedConnection = source._connection;
          var conn = connection;
          connection = null;
          if (sharedConnection && (!conn || sharedConnection === conn)) {
            sharedConnection.unsubscribe();
          }
          subscriber.unsubscribe();
        });
        source.subscribe(refCounter);
        if (!refCounter.closed) {
          connection = source.connect();
        }
      });
    }
    exports2.refCount = refCount;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/ConnectableObservable.js
var require_ConnectableObservable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/ConnectableObservable.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ConnectableObservable = void 0;
    var Observable_1 = require_Observable();
    var Subscription_1 = require_Subscription();
    var refCount_1 = require_refCount();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var lift_1 = require_lift();
    var ConnectableObservable = function(_super) {
      __extends(ConnectableObservable2, _super);
      function ConnectableObservable2(source, subjectFactory) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subjectFactory = subjectFactory;
        _this._subject = null;
        _this._refCount = 0;
        _this._connection = null;
        if (lift_1.hasLift(source)) {
          _this.lift = source.lift;
        }
        return _this;
      }
      ConnectableObservable2.prototype._subscribe = function(subscriber) {
        return this.getSubject().subscribe(subscriber);
      };
      ConnectableObservable2.prototype.getSubject = function() {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
          this._subject = this.subjectFactory();
        }
        return this._subject;
      };
      ConnectableObservable2.prototype._teardown = function() {
        this._refCount = 0;
        var _connection = this._connection;
        this._subject = this._connection = null;
        _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
      };
      ConnectableObservable2.prototype.connect = function() {
        var _this = this;
        var connection = this._connection;
        if (!connection) {
          connection = this._connection = new Subscription_1.Subscription();
          var subject_1 = this.getSubject();
          connection.add(this.source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subject_1, void 0, function() {
            _this._teardown();
            subject_1.complete();
          }, function(err) {
            _this._teardown();
            subject_1.error(err);
          }, function() {
            return _this._teardown();
          })));
          if (connection.closed) {
            this._connection = null;
            connection = Subscription_1.Subscription.EMPTY;
          }
        }
        return connection;
      };
      ConnectableObservable2.prototype.refCount = function() {
        return refCount_1.refCount()(this);
      };
      return ConnectableObservable2;
    }(Observable_1.Observable);
    exports2.ConnectableObservable = ConnectableObservable;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/performanceTimestampProvider.js
var require_performanceTimestampProvider = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/performanceTimestampProvider.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.performanceTimestampProvider = void 0;
    exports2.performanceTimestampProvider = {
      now: function() {
        return (exports2.performanceTimestampProvider.delegate || performance).now();
      },
      delegate: void 0
    };
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/animationFrameProvider.js
var require_animationFrameProvider = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/animationFrameProvider.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.animationFrameProvider = void 0;
    var Subscription_1 = require_Subscription();
    exports2.animationFrameProvider = {
      schedule: function(callback) {
        var request = requestAnimationFrame;
        var cancel = cancelAnimationFrame;
        var delegate = exports2.animationFrameProvider.delegate;
        if (delegate) {
          request = delegate.requestAnimationFrame;
          cancel = delegate.cancelAnimationFrame;
        }
        var handle = request(function(timestamp) {
          cancel = void 0;
          callback(timestamp);
        });
        return new Subscription_1.Subscription(function() {
          return cancel === null || cancel === void 0 ? void 0 : cancel(handle);
        });
      },
      requestAnimationFrame: function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var delegate = exports2.animationFrameProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
      },
      cancelAnimationFrame: function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var delegate = exports2.animationFrameProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
      },
      delegate: void 0
    };
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/dom/animationFrames.js
var require_animationFrames = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/dom/animationFrames.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.animationFrames = void 0;
    var Observable_1 = require_Observable();
    var performanceTimestampProvider_1 = require_performanceTimestampProvider();
    var animationFrameProvider_1 = require_animationFrameProvider();
    function animationFrames(timestampProvider) {
      return timestampProvider ? animationFramesFactory(timestampProvider) : DEFAULT_ANIMATION_FRAMES;
    }
    exports2.animationFrames = animationFrames;
    function animationFramesFactory(timestampProvider) {
      return new Observable_1.Observable(function(subscriber) {
        var provider = timestampProvider || performanceTimestampProvider_1.performanceTimestampProvider;
        var start = provider.now();
        var id = 0;
        var run = function() {
          if (!subscriber.closed) {
            id = animationFrameProvider_1.animationFrameProvider.requestAnimationFrame(function(timestamp) {
              id = 0;
              var now = provider.now();
              subscriber.next({
                timestamp: timestampProvider ? now : timestamp,
                elapsed: now - start
              });
              run();
            });
          }
        };
        run();
        return function() {
          if (id) {
            animationFrameProvider_1.animationFrameProvider.cancelAnimationFrame(id);
          }
        };
      });
    }
    var DEFAULT_ANIMATION_FRAMES = animationFramesFactory();
  }
});

// node_modules/rxjs/dist/cjs/internal/util/ObjectUnsubscribedError.js
var require_ObjectUnsubscribedError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/ObjectUnsubscribedError.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ObjectUnsubscribedError = void 0;
    var createErrorClass_1 = require_createErrorClass();
    exports2.ObjectUnsubscribedError = createErrorClass_1.createErrorClass(function(_super) {
      return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = "ObjectUnsubscribedError";
        this.message = "object unsubscribed";
      };
    });
  }
});

// node_modules/rxjs/dist/cjs/internal/Subject.js
var require_Subject = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/Subject.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __values = exports2 && exports2.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AnonymousSubject = exports2.Subject = void 0;
    var Observable_1 = require_Observable();
    var Subscription_1 = require_Subscription();
    var ObjectUnsubscribedError_1 = require_ObjectUnsubscribedError();
    var arrRemove_1 = require_arrRemove();
    var errorContext_1 = require_errorContext();
    var Subject8 = function(_super) {
      __extends(Subject9, _super);
      function Subject9() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.currentObservers = null;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
      }
      Subject9.prototype.lift = function(operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
      };
      Subject9.prototype._throwIfClosed = function() {
        if (this.closed) {
          throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
      };
      Subject9.prototype.next = function(value) {
        var _this = this;
        errorContext_1.errorContext(function() {
          var e_1, _a;
          _this._throwIfClosed();
          if (!_this.isStopped) {
            if (!_this.currentObservers) {
              _this.currentObservers = Array.from(_this.observers);
            }
            try {
              for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var observer = _c.value;
                observer.next(value);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
              } finally {
                if (e_1) throw e_1.error;
              }
            }
          }
        });
      };
      Subject9.prototype.error = function(err) {
        var _this = this;
        errorContext_1.errorContext(function() {
          _this._throwIfClosed();
          if (!_this.isStopped) {
            _this.hasError = _this.isStopped = true;
            _this.thrownError = err;
            var observers = _this.observers;
            while (observers.length) {
              observers.shift().error(err);
            }
          }
        });
      };
      Subject9.prototype.complete = function() {
        var _this = this;
        errorContext_1.errorContext(function() {
          _this._throwIfClosed();
          if (!_this.isStopped) {
            _this.isStopped = true;
            var observers = _this.observers;
            while (observers.length) {
              observers.shift().complete();
            }
          }
        });
      };
      Subject9.prototype.unsubscribe = function() {
        this.isStopped = this.closed = true;
        this.observers = this.currentObservers = null;
      };
      Object.defineProperty(Subject9.prototype, "observed", {
        get: function() {
          var _a;
          return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
      });
      Subject9.prototype._trySubscribe = function(subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
      };
      Subject9.prototype._subscribe = function(subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
      };
      Subject9.prototype._innerSubscribe = function(subscriber) {
        var _this = this;
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        if (hasError || isStopped) {
          return Subscription_1.EMPTY_SUBSCRIPTION;
        }
        this.currentObservers = null;
        observers.push(subscriber);
        return new Subscription_1.Subscription(function() {
          _this.currentObservers = null;
          arrRemove_1.arrRemove(observers, subscriber);
        });
      };
      Subject9.prototype._checkFinalizedStatuses = function(subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
          subscriber.error(thrownError);
        } else if (isStopped) {
          subscriber.complete();
        }
      };
      Subject9.prototype.asObservable = function() {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
      };
      Subject9.create = function(destination, source) {
        return new AnonymousSubject(destination, source);
      };
      return Subject9;
    }(Observable_1.Observable);
    exports2.Subject = Subject8;
    var AnonymousSubject = function(_super) {
      __extends(AnonymousSubject2, _super);
      function AnonymousSubject2(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
      }
      AnonymousSubject2.prototype.next = function(value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
      };
      AnonymousSubject2.prototype.error = function(err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
      };
      AnonymousSubject2.prototype.complete = function() {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
      };
      AnonymousSubject2.prototype._subscribe = function(subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : Subscription_1.EMPTY_SUBSCRIPTION;
      };
      return AnonymousSubject2;
    }(Subject8);
    exports2.AnonymousSubject = AnonymousSubject;
  }
});

// node_modules/rxjs/dist/cjs/internal/BehaviorSubject.js
var require_BehaviorSubject = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/BehaviorSubject.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BehaviorSubject = void 0;
    var Subject_1 = require_Subject();
    var BehaviorSubject = function(_super) {
      __extends(BehaviorSubject2, _super);
      function BehaviorSubject2(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
      }
      Object.defineProperty(BehaviorSubject2.prototype, "value", {
        get: function() {
          return this.getValue();
        },
        enumerable: false,
        configurable: true
      });
      BehaviorSubject2.prototype._subscribe = function(subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        !subscription.closed && subscriber.next(this._value);
        return subscription;
      };
      BehaviorSubject2.prototype.getValue = function() {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
        if (hasError) {
          throw thrownError;
        }
        this._throwIfClosed();
        return _value;
      };
      BehaviorSubject2.prototype.next = function(value) {
        _super.prototype.next.call(this, this._value = value);
      };
      return BehaviorSubject2;
    }(Subject_1.Subject);
    exports2.BehaviorSubject = BehaviorSubject;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/dateTimestampProvider.js
var require_dateTimestampProvider = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/dateTimestampProvider.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.dateTimestampProvider = void 0;
    exports2.dateTimestampProvider = {
      now: function() {
        return (exports2.dateTimestampProvider.delegate || Date).now();
      },
      delegate: void 0
    };
  }
});

// node_modules/rxjs/dist/cjs/internal/ReplaySubject.js
var require_ReplaySubject = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/ReplaySubject.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReplaySubject = void 0;
    var Subject_1 = require_Subject();
    var dateTimestampProvider_1 = require_dateTimestampProvider();
    var ReplaySubject = function(_super) {
      __extends(ReplaySubject2, _super);
      function ReplaySubject2(_bufferSize, _windowTime, _timestampProvider) {
        if (_bufferSize === void 0) {
          _bufferSize = Infinity;
        }
        if (_windowTime === void 0) {
          _windowTime = Infinity;
        }
        if (_timestampProvider === void 0) {
          _timestampProvider = dateTimestampProvider_1.dateTimestampProvider;
        }
        var _this = _super.call(this) || this;
        _this._bufferSize = _bufferSize;
        _this._windowTime = _windowTime;
        _this._timestampProvider = _timestampProvider;
        _this._buffer = [];
        _this._infiniteTimeWindow = true;
        _this._infiniteTimeWindow = _windowTime === Infinity;
        _this._bufferSize = Math.max(1, _bufferSize);
        _this._windowTime = Math.max(1, _windowTime);
        return _this;
      }
      ReplaySubject2.prototype.next = function(value) {
        var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
        if (!isStopped) {
          _buffer.push(value);
          !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
        }
        this._trimBuffer();
        _super.prototype.next.call(this, value);
      };
      ReplaySubject2.prototype._subscribe = function(subscriber) {
        this._throwIfClosed();
        this._trimBuffer();
        var subscription = this._innerSubscribe(subscriber);
        var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
        var copy = _buffer.slice();
        for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
          subscriber.next(copy[i]);
        }
        this._checkFinalizedStatuses(subscriber);
        return subscription;
      };
      ReplaySubject2.prototype._trimBuffer = function() {
        var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
        var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
        _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
        if (!_infiniteTimeWindow) {
          var now = _timestampProvider.now();
          var last = 0;
          for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
            last = i;
          }
          last && _buffer.splice(0, last + 1);
        }
      };
      return ReplaySubject2;
    }(Subject_1.Subject);
    exports2.ReplaySubject = ReplaySubject;
  }
});

// node_modules/rxjs/dist/cjs/internal/AsyncSubject.js
var require_AsyncSubject = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/AsyncSubject.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AsyncSubject = void 0;
    var Subject_1 = require_Subject();
    var AsyncSubject = function(_super) {
      __extends(AsyncSubject2, _super);
      function AsyncSubject2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._value = null;
        _this._hasValue = false;
        _this._isComplete = false;
        return _this;
      }
      AsyncSubject2.prototype._checkFinalizedStatuses = function(subscriber) {
        var _a = this, hasError = _a.hasError, _hasValue = _a._hasValue, _value = _a._value, thrownError = _a.thrownError, isStopped = _a.isStopped, _isComplete = _a._isComplete;
        if (hasError) {
          subscriber.error(thrownError);
        } else if (isStopped || _isComplete) {
          _hasValue && subscriber.next(_value);
          subscriber.complete();
        }
      };
      AsyncSubject2.prototype.next = function(value) {
        if (!this.isStopped) {
          this._value = value;
          this._hasValue = true;
        }
      };
      AsyncSubject2.prototype.complete = function() {
        var _a = this, _hasValue = _a._hasValue, _value = _a._value, _isComplete = _a._isComplete;
        if (!_isComplete) {
          this._isComplete = true;
          _hasValue && _super.prototype.next.call(this, _value);
          _super.prototype.complete.call(this);
        }
      };
      return AsyncSubject2;
    }(Subject_1.Subject);
    exports2.AsyncSubject = AsyncSubject;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/Action.js
var require_Action = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/Action.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Action = void 0;
    var Subscription_1 = require_Subscription();
    var Action = function(_super) {
      __extends(Action2, _super);
      function Action2(scheduler, work) {
        return _super.call(this) || this;
      }
      Action2.prototype.schedule = function(state, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        return this;
      };
      return Action2;
    }(Subscription_1.Subscription);
    exports2.Action = Action;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/intervalProvider.js
var require_intervalProvider = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/intervalProvider.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.intervalProvider = void 0;
    exports2.intervalProvider = {
      setInterval: function(handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          args[_i - 2] = arguments[_i];
        }
        var delegate = exports2.intervalProvider.delegate;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
          return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout], __read(args)));
        }
        return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
      },
      clearInterval: function(handle) {
        var delegate = exports2.intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
      },
      delegate: void 0
    };
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/AsyncAction.js
var require_AsyncAction = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/AsyncAction.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AsyncAction = void 0;
    var Action_1 = require_Action();
    var intervalProvider_1 = require_intervalProvider();
    var arrRemove_1 = require_arrRemove();
    var AsyncAction = function(_super) {
      __extends(AsyncAction2, _super);
      function AsyncAction2(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
      }
      AsyncAction2.prototype.schedule = function(state, delay) {
        var _a;
        if (delay === void 0) {
          delay = 0;
        }
        if (this.closed) {
          return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
          this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
        return this;
      };
      AsyncAction2.prototype.requestAsyncId = function(scheduler, _id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        return intervalProvider_1.intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
      };
      AsyncAction2.prototype.recycleAsyncId = function(_scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay != null && this.delay === delay && this.pending === false) {
          return id;
        }
        if (id != null) {
          intervalProvider_1.intervalProvider.clearInterval(id);
        }
        return void 0;
      };
      AsyncAction2.prototype.execute = function(state, delay) {
        if (this.closed) {
          return new Error("executing a cancelled action");
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
          return error;
        } else if (this.pending === false && this.id != null) {
          this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
      };
      AsyncAction2.prototype._execute = function(state, _delay) {
        var errored = false;
        var errorValue;
        try {
          this.work(state);
        } catch (e) {
          errored = true;
          errorValue = e ? e : new Error("Scheduled action threw falsy error");
        }
        if (errored) {
          this.unsubscribe();
          return errorValue;
        }
      };
      AsyncAction2.prototype.unsubscribe = function() {
        if (!this.closed) {
          var _a = this, id = _a.id, scheduler = _a.scheduler;
          var actions = scheduler.actions;
          this.work = this.state = this.scheduler = null;
          this.pending = false;
          arrRemove_1.arrRemove(actions, this);
          if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
          }
          this.delay = null;
          _super.prototype.unsubscribe.call(this);
        }
      };
      return AsyncAction2;
    }(Action_1.Action);
    exports2.AsyncAction = AsyncAction;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/Immediate.js
var require_Immediate = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/Immediate.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TestTools = exports2.Immediate = void 0;
    var nextHandle = 1;
    var resolved;
    var activeHandles = {};
    function findAndClearHandle(handle) {
      if (handle in activeHandles) {
        delete activeHandles[handle];
        return true;
      }
      return false;
    }
    exports2.Immediate = {
      setImmediate: function(cb) {
        var handle = nextHandle++;
        activeHandles[handle] = true;
        if (!resolved) {
          resolved = Promise.resolve();
        }
        resolved.then(function() {
          return findAndClearHandle(handle) && cb();
        });
        return handle;
      },
      clearImmediate: function(handle) {
        findAndClearHandle(handle);
      }
    };
    exports2.TestTools = {
      pending: function() {
        return Object.keys(activeHandles).length;
      }
    };
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/immediateProvider.js
var require_immediateProvider = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/immediateProvider.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.immediateProvider = void 0;
    var Immediate_1 = require_Immediate();
    var setImmediate = Immediate_1.Immediate.setImmediate;
    var clearImmediate = Immediate_1.Immediate.clearImmediate;
    exports2.immediateProvider = {
      setImmediate: function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var delegate = exports2.immediateProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setImmediate) || setImmediate).apply(void 0, __spreadArray([], __read(args)));
      },
      clearImmediate: function(handle) {
        var delegate = exports2.immediateProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearImmediate) || clearImmediate)(handle);
      },
      delegate: void 0
    };
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/AsapAction.js
var require_AsapAction = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/AsapAction.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AsapAction = void 0;
    var AsyncAction_1 = require_AsyncAction();
    var immediateProvider_1 = require_immediateProvider();
    var AsapAction = function(_super) {
      __extends(AsapAction2, _super);
      function AsapAction2(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
      }
      AsapAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay !== null && delay > 0) {
          return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler._scheduled || (scheduler._scheduled = immediateProvider_1.immediateProvider.setImmediate(scheduler.flush.bind(scheduler, void 0)));
      };
      AsapAction2.prototype.recycleAsyncId = function(scheduler, id, delay) {
        var _a;
        if (delay === void 0) {
          delay = 0;
        }
        if (delay != null ? delay > 0 : this.delay > 0) {
          return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        var actions = scheduler.actions;
        if (id != null && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
          immediateProvider_1.immediateProvider.clearImmediate(id);
          if (scheduler._scheduled === id) {
            scheduler._scheduled = void 0;
          }
        }
        return void 0;
      };
      return AsapAction2;
    }(AsyncAction_1.AsyncAction);
    exports2.AsapAction = AsapAction;
  }
});

// node_modules/rxjs/dist/cjs/internal/Scheduler.js
var require_Scheduler = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/Scheduler.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Scheduler = void 0;
    var dateTimestampProvider_1 = require_dateTimestampProvider();
    var Scheduler = function() {
      function Scheduler2(schedulerActionCtor, now) {
        if (now === void 0) {
          now = Scheduler2.now;
        }
        this.schedulerActionCtor = schedulerActionCtor;
        this.now = now;
      }
      Scheduler2.prototype.schedule = function(work, delay, state) {
        if (delay === void 0) {
          delay = 0;
        }
        return new this.schedulerActionCtor(this, work).schedule(state, delay);
      };
      Scheduler2.now = dateTimestampProvider_1.dateTimestampProvider.now;
      return Scheduler2;
    }();
    exports2.Scheduler = Scheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/AsyncScheduler.js
var require_AsyncScheduler = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/AsyncScheduler.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AsyncScheduler = void 0;
    var Scheduler_1 = require_Scheduler();
    var AsyncScheduler = function(_super) {
      __extends(AsyncScheduler2, _super);
      function AsyncScheduler2(SchedulerAction, now) {
        if (now === void 0) {
          now = Scheduler_1.Scheduler.now;
        }
        var _this = _super.call(this, SchedulerAction, now) || this;
        _this.actions = [];
        _this._active = false;
        return _this;
      }
      AsyncScheduler2.prototype.flush = function(action) {
        var actions = this.actions;
        if (this._active) {
          actions.push(action);
          return;
        }
        var error;
        this._active = true;
        do {
          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        } while (action = actions.shift());
        this._active = false;
        if (error) {
          while (action = actions.shift()) {
            action.unsubscribe();
          }
          throw error;
        }
      };
      return AsyncScheduler2;
    }(Scheduler_1.Scheduler);
    exports2.AsyncScheduler = AsyncScheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/AsapScheduler.js
var require_AsapScheduler = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/AsapScheduler.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AsapScheduler = void 0;
    var AsyncScheduler_1 = require_AsyncScheduler();
    var AsapScheduler = function(_super) {
      __extends(AsapScheduler2, _super);
      function AsapScheduler2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      AsapScheduler2.prototype.flush = function(action) {
        this._active = true;
        var flushId = this._scheduled;
        this._scheduled = void 0;
        var actions = this.actions;
        var error;
        action = action || actions.shift();
        do {
          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        } while ((action = actions[0]) && action.id === flushId && actions.shift());
        this._active = false;
        if (error) {
          while ((action = actions[0]) && action.id === flushId && actions.shift()) {
            action.unsubscribe();
          }
          throw error;
        }
      };
      return AsapScheduler2;
    }(AsyncScheduler_1.AsyncScheduler);
    exports2.AsapScheduler = AsapScheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/asap.js
var require_asap = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/asap.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.asap = exports2.asapScheduler = void 0;
    var AsapAction_1 = require_AsapAction();
    var AsapScheduler_1 = require_AsapScheduler();
    exports2.asapScheduler = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
    exports2.asap = exports2.asapScheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/async.js
var require_async = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/async.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.async = exports2.asyncScheduler = void 0;
    var AsyncAction_1 = require_AsyncAction();
    var AsyncScheduler_1 = require_AsyncScheduler();
    exports2.asyncScheduler = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
    exports2.async = exports2.asyncScheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/QueueAction.js
var require_QueueAction = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/QueueAction.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.QueueAction = void 0;
    var AsyncAction_1 = require_AsyncAction();
    var QueueAction = function(_super) {
      __extends(QueueAction2, _super);
      function QueueAction2(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
      }
      QueueAction2.prototype.schedule = function(state, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay > 0) {
          return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
      };
      QueueAction2.prototype.execute = function(state, delay) {
        return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
      };
      QueueAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay != null && delay > 0 || delay == null && this.delay > 0) {
          return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.flush(this);
        return 0;
      };
      return QueueAction2;
    }(AsyncAction_1.AsyncAction);
    exports2.QueueAction = QueueAction;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/QueueScheduler.js
var require_QueueScheduler = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/QueueScheduler.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.QueueScheduler = void 0;
    var AsyncScheduler_1 = require_AsyncScheduler();
    var QueueScheduler = function(_super) {
      __extends(QueueScheduler2, _super);
      function QueueScheduler2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      return QueueScheduler2;
    }(AsyncScheduler_1.AsyncScheduler);
    exports2.QueueScheduler = QueueScheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/queue.js
var require_queue = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/queue.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.queue = exports2.queueScheduler = void 0;
    var QueueAction_1 = require_QueueAction();
    var QueueScheduler_1 = require_QueueScheduler();
    exports2.queueScheduler = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
    exports2.queue = exports2.queueScheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/AnimationFrameAction.js
var require_AnimationFrameAction = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/AnimationFrameAction.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AnimationFrameAction = void 0;
    var AsyncAction_1 = require_AsyncAction();
    var animationFrameProvider_1 = require_animationFrameProvider();
    var AnimationFrameAction = function(_super) {
      __extends(AnimationFrameAction2, _super);
      function AnimationFrameAction2(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
      }
      AnimationFrameAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay !== null && delay > 0) {
          return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler._scheduled || (scheduler._scheduled = animationFrameProvider_1.animationFrameProvider.requestAnimationFrame(function() {
          return scheduler.flush(void 0);
        }));
      };
      AnimationFrameAction2.prototype.recycleAsyncId = function(scheduler, id, delay) {
        var _a;
        if (delay === void 0) {
          delay = 0;
        }
        if (delay != null ? delay > 0 : this.delay > 0) {
          return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        var actions = scheduler.actions;
        if (id != null && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
          animationFrameProvider_1.animationFrameProvider.cancelAnimationFrame(id);
          scheduler._scheduled = void 0;
        }
        return void 0;
      };
      return AnimationFrameAction2;
    }(AsyncAction_1.AsyncAction);
    exports2.AnimationFrameAction = AnimationFrameAction;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/AnimationFrameScheduler.js
var require_AnimationFrameScheduler = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/AnimationFrameScheduler.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AnimationFrameScheduler = void 0;
    var AsyncScheduler_1 = require_AsyncScheduler();
    var AnimationFrameScheduler = function(_super) {
      __extends(AnimationFrameScheduler2, _super);
      function AnimationFrameScheduler2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      AnimationFrameScheduler2.prototype.flush = function(action) {
        this._active = true;
        var flushId = this._scheduled;
        this._scheduled = void 0;
        var actions = this.actions;
        var error;
        action = action || actions.shift();
        do {
          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        } while ((action = actions[0]) && action.id === flushId && actions.shift());
        this._active = false;
        if (error) {
          while ((action = actions[0]) && action.id === flushId && actions.shift()) {
            action.unsubscribe();
          }
          throw error;
        }
      };
      return AnimationFrameScheduler2;
    }(AsyncScheduler_1.AsyncScheduler);
    exports2.AnimationFrameScheduler = AnimationFrameScheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/animationFrame.js
var require_animationFrame = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/animationFrame.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.animationFrame = exports2.animationFrameScheduler = void 0;
    var AnimationFrameAction_1 = require_AnimationFrameAction();
    var AnimationFrameScheduler_1 = require_AnimationFrameScheduler();
    exports2.animationFrameScheduler = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);
    exports2.animationFrame = exports2.animationFrameScheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/VirtualTimeScheduler.js
var require_VirtualTimeScheduler = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/VirtualTimeScheduler.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.VirtualAction = exports2.VirtualTimeScheduler = void 0;
    var AsyncAction_1 = require_AsyncAction();
    var Subscription_1 = require_Subscription();
    var AsyncScheduler_1 = require_AsyncScheduler();
    var VirtualTimeScheduler = function(_super) {
      __extends(VirtualTimeScheduler2, _super);
      function VirtualTimeScheduler2(schedulerActionCtor, maxFrames) {
        if (schedulerActionCtor === void 0) {
          schedulerActionCtor = VirtualAction;
        }
        if (maxFrames === void 0) {
          maxFrames = Infinity;
        }
        var _this = _super.call(this, schedulerActionCtor, function() {
          return _this.frame;
        }) || this;
        _this.maxFrames = maxFrames;
        _this.frame = 0;
        _this.index = -1;
        return _this;
      }
      VirtualTimeScheduler2.prototype.flush = function() {
        var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
        var error;
        var action;
        while ((action = actions[0]) && action.delay <= maxFrames) {
          actions.shift();
          this.frame = action.delay;
          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        }
        if (error) {
          while (action = actions.shift()) {
            action.unsubscribe();
          }
          throw error;
        }
      };
      VirtualTimeScheduler2.frameTimeFactor = 10;
      return VirtualTimeScheduler2;
    }(AsyncScheduler_1.AsyncScheduler);
    exports2.VirtualTimeScheduler = VirtualTimeScheduler;
    var VirtualAction = function(_super) {
      __extends(VirtualAction2, _super);
      function VirtualAction2(scheduler, work, index) {
        if (index === void 0) {
          index = scheduler.index += 1;
        }
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.index = index;
        _this.active = true;
        _this.index = scheduler.index = index;
        return _this;
      }
      VirtualAction2.prototype.schedule = function(state, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (Number.isFinite(delay)) {
          if (!this.id) {
            return _super.prototype.schedule.call(this, state, delay);
          }
          this.active = false;
          var action = new VirtualAction2(this.scheduler, this.work);
          this.add(action);
          return action.schedule(state, delay);
        } else {
          return Subscription_1.Subscription.EMPTY;
        }
      };
      VirtualAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        this.delay = scheduler.frame + delay;
        var actions = scheduler.actions;
        actions.push(this);
        actions.sort(VirtualAction2.sortActions);
        return 1;
      };
      VirtualAction2.prototype.recycleAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        return void 0;
      };
      VirtualAction2.prototype._execute = function(state, delay) {
        if (this.active === true) {
          return _super.prototype._execute.call(this, state, delay);
        }
      };
      VirtualAction2.sortActions = function(a, b) {
        if (a.delay === b.delay) {
          if (a.index === b.index) {
            return 0;
          } else if (a.index > b.index) {
            return 1;
          } else {
            return -1;
          }
        } else if (a.delay > b.delay) {
          return 1;
        } else {
          return -1;
        }
      };
      return VirtualAction2;
    }(AsyncAction_1.AsyncAction);
    exports2.VirtualAction = VirtualAction;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/empty.js
var require_empty = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/empty.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.empty = exports2.EMPTY = void 0;
    var Observable_1 = require_Observable();
    exports2.EMPTY = new Observable_1.Observable(function(subscriber) {
      return subscriber.complete();
    });
    function empty(scheduler) {
      return scheduler ? emptyScheduled(scheduler) : exports2.EMPTY;
    }
    exports2.empty = empty;
    function emptyScheduled(scheduler) {
      return new Observable_1.Observable(function(subscriber) {
        return scheduler.schedule(function() {
          return subscriber.complete();
        });
      });
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/util/isScheduler.js
var require_isScheduler = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isScheduler.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isScheduler = void 0;
    var isFunction_1 = require_isFunction();
    function isScheduler(value) {
      return value && isFunction_1.isFunction(value.schedule);
    }
    exports2.isScheduler = isScheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/args.js
var require_args = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/args.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.popNumber = exports2.popScheduler = exports2.popResultSelector = void 0;
    var isFunction_1 = require_isFunction();
    var isScheduler_1 = require_isScheduler();
    function last(arr) {
      return arr[arr.length - 1];
    }
    function popResultSelector(args) {
      return isFunction_1.isFunction(last(args)) ? args.pop() : void 0;
    }
    exports2.popResultSelector = popResultSelector;
    function popScheduler(args) {
      return isScheduler_1.isScheduler(last(args)) ? args.pop() : void 0;
    }
    exports2.popScheduler = popScheduler;
    function popNumber(args, defaultValue) {
      return typeof last(args) === "number" ? args.pop() : defaultValue;
    }
    exports2.popNumber = popNumber;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/isArrayLike.js
var require_isArrayLike = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isArrayLike.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isArrayLike = void 0;
    exports2.isArrayLike = function(x) {
      return x && typeof x.length === "number" && typeof x !== "function";
    };
  }
});

// node_modules/rxjs/dist/cjs/internal/util/isPromise.js
var require_isPromise = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isPromise.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isPromise = void 0;
    var isFunction_1 = require_isFunction();
    function isPromise(value) {
      return isFunction_1.isFunction(value === null || value === void 0 ? void 0 : value.then);
    }
    exports2.isPromise = isPromise;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/isInteropObservable.js
var require_isInteropObservable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isInteropObservable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isInteropObservable = void 0;
    var observable_1 = require_observable();
    var isFunction_1 = require_isFunction();
    function isInteropObservable(input) {
      return isFunction_1.isFunction(input[observable_1.observable]);
    }
    exports2.isInteropObservable = isInteropObservable;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/isAsyncIterable.js
var require_isAsyncIterable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isAsyncIterable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isAsyncIterable = void 0;
    var isFunction_1 = require_isFunction();
    function isAsyncIterable(obj) {
      return Symbol.asyncIterator && isFunction_1.isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
    }
    exports2.isAsyncIterable = isAsyncIterable;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/throwUnobservableError.js
var require_throwUnobservableError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/throwUnobservableError.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createInvalidObservableTypeError = void 0;
    function createInvalidObservableTypeError(input) {
      return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
    }
    exports2.createInvalidObservableTypeError = createInvalidObservableTypeError;
  }
});

// node_modules/rxjs/dist/cjs/internal/symbol/iterator.js
var require_iterator = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/symbol/iterator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.iterator = exports2.getSymbolIterator = void 0;
    function getSymbolIterator() {
      if (typeof Symbol !== "function" || !Symbol.iterator) {
        return "@@iterator";
      }
      return Symbol.iterator;
    }
    exports2.getSymbolIterator = getSymbolIterator;
    exports2.iterator = getSymbolIterator();
  }
});

// node_modules/rxjs/dist/cjs/internal/util/isIterable.js
var require_isIterable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isIterable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isIterable = void 0;
    var iterator_1 = require_iterator();
    var isFunction_1 = require_isFunction();
    function isIterable(input) {
      return isFunction_1.isFunction(input === null || input === void 0 ? void 0 : input[iterator_1.iterator]);
    }
    exports2.isIterable = isIterable;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/isReadableStreamLike.js
var require_isReadableStreamLike = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isReadableStreamLike.js"(exports2) {
    "use strict";
    var __generator = exports2 && exports2.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1) throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var __await = exports2 && exports2.__await || function(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
    };
    var __asyncGenerator = exports2 && exports2.__asyncGenerator || function(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var g = generator.apply(thisArg, _arguments || []), i, q = [];
      return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
      }, i;
      function verb(n) {
        if (g[n]) i[n] = function(v) {
          return new Promise(function(a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
      }
      function resume(n, v) {
        try {
          step(g[n](v));
        } catch (e) {
          settle(q[0][3], e);
        }
      }
      function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
      }
      function fulfill(value) {
        resume("next", value);
      }
      function reject(value) {
        resume("throw", value);
      }
      function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
      }
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isReadableStreamLike = exports2.readableStreamLikeToAsyncGenerator = void 0;
    var isFunction_1 = require_isFunction();
    function readableStreamLikeToAsyncGenerator(readableStream) {
      return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              reader = readableStream.getReader();
              _b.label = 1;
            case 1:
              _b.trys.push([1, , 9, 10]);
              _b.label = 2;
            case 2:
              if (false) return [3, 8];
              return [4, __await(reader.read())];
            case 3:
              _a = _b.sent(), value = _a.value, done = _a.done;
              if (!done) return [3, 5];
              return [4, __await(void 0)];
            case 4:
              return [2, _b.sent()];
            case 5:
              return [4, __await(value)];
            case 6:
              return [4, _b.sent()];
            case 7:
              _b.sent();
              return [3, 2];
            case 8:
              return [3, 10];
            case 9:
              reader.releaseLock();
              return [7];
            case 10:
              return [2];
          }
        });
      });
    }
    exports2.readableStreamLikeToAsyncGenerator = readableStreamLikeToAsyncGenerator;
    function isReadableStreamLike(obj) {
      return isFunction_1.isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
    }
    exports2.isReadableStreamLike = isReadableStreamLike;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/innerFrom.js
var require_innerFrom = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/innerFrom.js"(exports2) {
    "use strict";
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports2 && exports2.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1) throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var __asyncValues = exports2 && exports2.__asyncValues || function(o) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var m = o[Symbol.asyncIterator], i;
      return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
      }, i);
      function verb(n) {
        i[n] = o[n] && function(v) {
          return new Promise(function(resolve, reject) {
            v = o[n](v), settle(resolve, reject, v.done, v.value);
          });
        };
      }
      function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v2) {
          resolve({ value: v2, done: d });
        }, reject);
      }
    };
    var __values = exports2 && exports2.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fromReadableStreamLike = exports2.fromAsyncIterable = exports2.fromIterable = exports2.fromPromise = exports2.fromArrayLike = exports2.fromInteropObservable = exports2.innerFrom = void 0;
    var isArrayLike_1 = require_isArrayLike();
    var isPromise_1 = require_isPromise();
    var Observable_1 = require_Observable();
    var isInteropObservable_1 = require_isInteropObservable();
    var isAsyncIterable_1 = require_isAsyncIterable();
    var throwUnobservableError_1 = require_throwUnobservableError();
    var isIterable_1 = require_isIterable();
    var isReadableStreamLike_1 = require_isReadableStreamLike();
    var isFunction_1 = require_isFunction();
    var reportUnhandledError_1 = require_reportUnhandledError();
    var observable_1 = require_observable();
    function innerFrom(input) {
      if (input instanceof Observable_1.Observable) {
        return input;
      }
      if (input != null) {
        if (isInteropObservable_1.isInteropObservable(input)) {
          return fromInteropObservable(input);
        }
        if (isArrayLike_1.isArrayLike(input)) {
          return fromArrayLike(input);
        }
        if (isPromise_1.isPromise(input)) {
          return fromPromise(input);
        }
        if (isAsyncIterable_1.isAsyncIterable(input)) {
          return fromAsyncIterable(input);
        }
        if (isIterable_1.isIterable(input)) {
          return fromIterable(input);
        }
        if (isReadableStreamLike_1.isReadableStreamLike(input)) {
          return fromReadableStreamLike(input);
        }
      }
      throw throwUnobservableError_1.createInvalidObservableTypeError(input);
    }
    exports2.innerFrom = innerFrom;
    function fromInteropObservable(obj) {
      return new Observable_1.Observable(function(subscriber) {
        var obs = obj[observable_1.observable]();
        if (isFunction_1.isFunction(obs.subscribe)) {
          return obs.subscribe(subscriber);
        }
        throw new TypeError("Provided object does not correctly implement Symbol.observable");
      });
    }
    exports2.fromInteropObservable = fromInteropObservable;
    function fromArrayLike(array) {
      return new Observable_1.Observable(function(subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
          subscriber.next(array[i]);
        }
        subscriber.complete();
      });
    }
    exports2.fromArrayLike = fromArrayLike;
    function fromPromise(promise) {
      return new Observable_1.Observable(function(subscriber) {
        promise.then(function(value) {
          if (!subscriber.closed) {
            subscriber.next(value);
            subscriber.complete();
          }
        }, function(err) {
          return subscriber.error(err);
        }).then(null, reportUnhandledError_1.reportUnhandledError);
      });
    }
    exports2.fromPromise = fromPromise;
    function fromIterable(iterable) {
      return new Observable_1.Observable(function(subscriber) {
        var e_1, _a;
        try {
          for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
            var value = iterable_1_1.value;
            subscriber.next(value);
            if (subscriber.closed) {
              return;
            }
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
        subscriber.complete();
      });
    }
    exports2.fromIterable = fromIterable;
    function fromAsyncIterable(asyncIterable) {
      return new Observable_1.Observable(function(subscriber) {
        process(asyncIterable, subscriber).catch(function(err) {
          return subscriber.error(err);
        });
      });
    }
    exports2.fromAsyncIterable = fromAsyncIterable;
    function fromReadableStreamLike(readableStream) {
      return fromAsyncIterable(isReadableStreamLike_1.readableStreamLikeToAsyncGenerator(readableStream));
    }
    exports2.fromReadableStreamLike = fromReadableStreamLike;
    function process(asyncIterable, subscriber) {
      var asyncIterable_1, asyncIterable_1_1;
      var e_2, _a;
      return __awaiter(this, void 0, void 0, function() {
        var value, e_2_1;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              _b.trys.push([0, 5, 6, 11]);
              asyncIterable_1 = __asyncValues(asyncIterable);
              _b.label = 1;
            case 1:
              return [4, asyncIterable_1.next()];
            case 2:
              if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
              value = asyncIterable_1_1.value;
              subscriber.next(value);
              if (subscriber.closed) {
                return [2];
              }
              _b.label = 3;
            case 3:
              return [3, 1];
            case 4:
              return [3, 11];
            case 5:
              e_2_1 = _b.sent();
              e_2 = { error: e_2_1 };
              return [3, 11];
            case 6:
              _b.trys.push([6, , 9, 10]);
              if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
              return [4, _a.call(asyncIterable_1)];
            case 7:
              _b.sent();
              _b.label = 8;
            case 8:
              return [3, 10];
            case 9:
              if (e_2) throw e_2.error;
              return [7];
            case 10:
              return [7];
            case 11:
              subscriber.complete();
              return [2];
          }
        });
      });
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/util/executeSchedule.js
var require_executeSchedule = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/executeSchedule.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.executeSchedule = void 0;
    function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
      if (delay === void 0) {
        delay = 0;
      }
      if (repeat === void 0) {
        repeat = false;
      }
      var scheduleSubscription = scheduler.schedule(function() {
        work();
        if (repeat) {
          parentSubscription.add(this.schedule(null, delay));
        } else {
          this.unsubscribe();
        }
      }, delay);
      parentSubscription.add(scheduleSubscription);
      if (!repeat) {
        return scheduleSubscription;
      }
    }
    exports2.executeSchedule = executeSchedule;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/observeOn.js
var require_observeOn = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/observeOn.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.observeOn = void 0;
    var executeSchedule_1 = require_executeSchedule();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function observeOn(scheduler, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return lift_1.operate(function(source, subscriber) {
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          return executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
            return subscriber.next(value);
          }, delay);
        }, function() {
          return executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
            return subscriber.complete();
          }, delay);
        }, function(err) {
          return executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
            return subscriber.error(err);
          }, delay);
        }));
      });
    }
    exports2.observeOn = observeOn;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/subscribeOn.js
var require_subscribeOn = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/subscribeOn.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.subscribeOn = void 0;
    var lift_1 = require_lift();
    function subscribeOn(scheduler, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return lift_1.operate(function(source, subscriber) {
        subscriber.add(scheduler.schedule(function() {
          return source.subscribe(subscriber);
        }, delay));
      });
    }
    exports2.subscribeOn = subscribeOn;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduled/scheduleObservable.js
var require_scheduleObservable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduled/scheduleObservable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.scheduleObservable = void 0;
    var innerFrom_1 = require_innerFrom();
    var observeOn_1 = require_observeOn();
    var subscribeOn_1 = require_subscribeOn();
    function scheduleObservable(input, scheduler) {
      return innerFrom_1.innerFrom(input).pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
    }
    exports2.scheduleObservable = scheduleObservable;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduled/schedulePromise.js
var require_schedulePromise = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduled/schedulePromise.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.schedulePromise = void 0;
    var innerFrom_1 = require_innerFrom();
    var observeOn_1 = require_observeOn();
    var subscribeOn_1 = require_subscribeOn();
    function schedulePromise(input, scheduler) {
      return innerFrom_1.innerFrom(input).pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
    }
    exports2.schedulePromise = schedulePromise;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduled/scheduleArray.js
var require_scheduleArray = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduled/scheduleArray.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.scheduleArray = void 0;
    var Observable_1 = require_Observable();
    function scheduleArray(input, scheduler) {
      return new Observable_1.Observable(function(subscriber) {
        var i = 0;
        return scheduler.schedule(function() {
          if (i === input.length) {
            subscriber.complete();
          } else {
            subscriber.next(input[i++]);
            if (!subscriber.closed) {
              this.schedule();
            }
          }
        });
      });
    }
    exports2.scheduleArray = scheduleArray;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduled/scheduleIterable.js
var require_scheduleIterable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduled/scheduleIterable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.scheduleIterable = void 0;
    var Observable_1 = require_Observable();
    var iterator_1 = require_iterator();
    var isFunction_1 = require_isFunction();
    var executeSchedule_1 = require_executeSchedule();
    function scheduleIterable(input, scheduler) {
      return new Observable_1.Observable(function(subscriber) {
        var iterator;
        executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
          iterator = input[iterator_1.iterator]();
          executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
            var _a;
            var value;
            var done;
            try {
              _a = iterator.next(), value = _a.value, done = _a.done;
            } catch (err) {
              subscriber.error(err);
              return;
            }
            if (done) {
              subscriber.complete();
            } else {
              subscriber.next(value);
            }
          }, 0, true);
        });
        return function() {
          return isFunction_1.isFunction(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return();
        };
      });
    }
    exports2.scheduleIterable = scheduleIterable;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduled/scheduleAsyncIterable.js
var require_scheduleAsyncIterable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduled/scheduleAsyncIterable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.scheduleAsyncIterable = void 0;
    var Observable_1 = require_Observable();
    var executeSchedule_1 = require_executeSchedule();
    function scheduleAsyncIterable(input, scheduler) {
      if (!input) {
        throw new Error("Iterable cannot be null");
      }
      return new Observable_1.Observable(function(subscriber) {
        executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
          var iterator = input[Symbol.asyncIterator]();
          executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
            iterator.next().then(function(result) {
              if (result.done) {
                subscriber.complete();
              } else {
                subscriber.next(result.value);
              }
            });
          }, 0, true);
        });
      });
    }
    exports2.scheduleAsyncIterable = scheduleAsyncIterable;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduled/scheduleReadableStreamLike.js
var require_scheduleReadableStreamLike = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduled/scheduleReadableStreamLike.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.scheduleReadableStreamLike = void 0;
    var scheduleAsyncIterable_1 = require_scheduleAsyncIterable();
    var isReadableStreamLike_1 = require_isReadableStreamLike();
    function scheduleReadableStreamLike(input, scheduler) {
      return scheduleAsyncIterable_1.scheduleAsyncIterable(isReadableStreamLike_1.readableStreamLikeToAsyncGenerator(input), scheduler);
    }
    exports2.scheduleReadableStreamLike = scheduleReadableStreamLike;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduled/scheduled.js
var require_scheduled = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduled/scheduled.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.scheduled = void 0;
    var scheduleObservable_1 = require_scheduleObservable();
    var schedulePromise_1 = require_schedulePromise();
    var scheduleArray_1 = require_scheduleArray();
    var scheduleIterable_1 = require_scheduleIterable();
    var scheduleAsyncIterable_1 = require_scheduleAsyncIterable();
    var isInteropObservable_1 = require_isInteropObservable();
    var isPromise_1 = require_isPromise();
    var isArrayLike_1 = require_isArrayLike();
    var isIterable_1 = require_isIterable();
    var isAsyncIterable_1 = require_isAsyncIterable();
    var throwUnobservableError_1 = require_throwUnobservableError();
    var isReadableStreamLike_1 = require_isReadableStreamLike();
    var scheduleReadableStreamLike_1 = require_scheduleReadableStreamLike();
    function scheduled(input, scheduler) {
      if (input != null) {
        if (isInteropObservable_1.isInteropObservable(input)) {
          return scheduleObservable_1.scheduleObservable(input, scheduler);
        }
        if (isArrayLike_1.isArrayLike(input)) {
          return scheduleArray_1.scheduleArray(input, scheduler);
        }
        if (isPromise_1.isPromise(input)) {
          return schedulePromise_1.schedulePromise(input, scheduler);
        }
        if (isAsyncIterable_1.isAsyncIterable(input)) {
          return scheduleAsyncIterable_1.scheduleAsyncIterable(input, scheduler);
        }
        if (isIterable_1.isIterable(input)) {
          return scheduleIterable_1.scheduleIterable(input, scheduler);
        }
        if (isReadableStreamLike_1.isReadableStreamLike(input)) {
          return scheduleReadableStreamLike_1.scheduleReadableStreamLike(input, scheduler);
        }
      }
      throw throwUnobservableError_1.createInvalidObservableTypeError(input);
    }
    exports2.scheduled = scheduled;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/from.js
var require_from = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/from.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.from = void 0;
    var scheduled_1 = require_scheduled();
    var innerFrom_1 = require_innerFrom();
    function from(input, scheduler) {
      return scheduler ? scheduled_1.scheduled(input, scheduler) : innerFrom_1.innerFrom(input);
    }
    exports2.from = from;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/of.js
var require_of = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/of.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.of = void 0;
    var args_1 = require_args();
    var from_1 = require_from();
    function of() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var scheduler = args_1.popScheduler(args);
      return from_1.from(args, scheduler);
    }
    exports2.of = of;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/throwError.js
var require_throwError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/throwError.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.throwError = void 0;
    var Observable_1 = require_Observable();
    var isFunction_1 = require_isFunction();
    function throwError(errorOrErrorFactory, scheduler) {
      var errorFactory = isFunction_1.isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function() {
        return errorOrErrorFactory;
      };
      var init = function(subscriber) {
        return subscriber.error(errorFactory());
      };
      return new Observable_1.Observable(scheduler ? function(subscriber) {
        return scheduler.schedule(init, 0, subscriber);
      } : init);
    }
    exports2.throwError = throwError;
  }
});

// node_modules/rxjs/dist/cjs/internal/Notification.js
var require_Notification = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/Notification.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.observeNotification = exports2.Notification = exports2.NotificationKind = void 0;
    var empty_1 = require_empty();
    var of_1 = require_of();
    var throwError_1 = require_throwError();
    var isFunction_1 = require_isFunction();
    var NotificationKind;
    (function(NotificationKind2) {
      NotificationKind2["NEXT"] = "N";
      NotificationKind2["ERROR"] = "E";
      NotificationKind2["COMPLETE"] = "C";
    })(NotificationKind = exports2.NotificationKind || (exports2.NotificationKind = {}));
    var Notification = function() {
      function Notification2(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === "N";
      }
      Notification2.prototype.observe = function(observer) {
        return observeNotification(this, observer);
      };
      Notification2.prototype.do = function(nextHandler, errorHandler, completeHandler) {
        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
        return kind === "N" ? nextHandler === null || nextHandler === void 0 ? void 0 : nextHandler(value) : kind === "E" ? errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(error) : completeHandler === null || completeHandler === void 0 ? void 0 : completeHandler();
      };
      Notification2.prototype.accept = function(nextOrObserver, error, complete) {
        var _a;
        return isFunction_1.isFunction((_a = nextOrObserver) === null || _a === void 0 ? void 0 : _a.next) ? this.observe(nextOrObserver) : this.do(nextOrObserver, error, complete);
      };
      Notification2.prototype.toObservable = function() {
        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
        var result = kind === "N" ? of_1.of(value) : kind === "E" ? throwError_1.throwError(function() {
          return error;
        }) : kind === "C" ? empty_1.EMPTY : 0;
        if (!result) {
          throw new TypeError("Unexpected notification kind " + kind);
        }
        return result;
      };
      Notification2.createNext = function(value) {
        return new Notification2("N", value);
      };
      Notification2.createError = function(err) {
        return new Notification2("E", void 0, err);
      };
      Notification2.createComplete = function() {
        return Notification2.completeNotification;
      };
      Notification2.completeNotification = new Notification2("C");
      return Notification2;
    }();
    exports2.Notification = Notification;
    function observeNotification(notification, observer) {
      var _a, _b, _c;
      var _d = notification, kind = _d.kind, value = _d.value, error = _d.error;
      if (typeof kind !== "string") {
        throw new TypeError('Invalid notification, missing "kind"');
      }
      kind === "N" ? (_a = observer.next) === null || _a === void 0 ? void 0 : _a.call(observer, value) : kind === "E" ? (_b = observer.error) === null || _b === void 0 ? void 0 : _b.call(observer, error) : (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.call(observer);
    }
    exports2.observeNotification = observeNotification;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/isObservable.js
var require_isObservable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isObservable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isObservable = void 0;
    var Observable_1 = require_Observable();
    var isFunction_1 = require_isFunction();
    function isObservable(obj) {
      return !!obj && (obj instanceof Observable_1.Observable || isFunction_1.isFunction(obj.lift) && isFunction_1.isFunction(obj.subscribe));
    }
    exports2.isObservable = isObservable;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/EmptyError.js
var require_EmptyError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/EmptyError.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.EmptyError = void 0;
    var createErrorClass_1 = require_createErrorClass();
    exports2.EmptyError = createErrorClass_1.createErrorClass(function(_super) {
      return function EmptyErrorImpl() {
        _super(this);
        this.name = "EmptyError";
        this.message = "no elements in sequence";
      };
    });
  }
});

// node_modules/rxjs/dist/cjs/internal/lastValueFrom.js
var require_lastValueFrom = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/lastValueFrom.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.lastValueFrom = void 0;
    var EmptyError_1 = require_EmptyError();
    function lastValueFrom(source, config) {
      var hasConfig = typeof config === "object";
      return new Promise(function(resolve, reject) {
        var _hasValue = false;
        var _value;
        source.subscribe({
          next: function(value) {
            _value = value;
            _hasValue = true;
          },
          error: reject,
          complete: function() {
            if (_hasValue) {
              resolve(_value);
            } else if (hasConfig) {
              resolve(config.defaultValue);
            } else {
              reject(new EmptyError_1.EmptyError());
            }
          }
        });
      });
    }
    exports2.lastValueFrom = lastValueFrom;
  }
});

// node_modules/rxjs/dist/cjs/internal/firstValueFrom.js
var require_firstValueFrom = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/firstValueFrom.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.firstValueFrom = void 0;
    var EmptyError_1 = require_EmptyError();
    var Subscriber_1 = require_Subscriber();
    function firstValueFrom(source, config) {
      var hasConfig = typeof config === "object";
      return new Promise(function(resolve, reject) {
        var subscriber = new Subscriber_1.SafeSubscriber({
          next: function(value) {
            resolve(value);
            subscriber.unsubscribe();
          },
          error: reject,
          complete: function() {
            if (hasConfig) {
              resolve(config.defaultValue);
            } else {
              reject(new EmptyError_1.EmptyError());
            }
          }
        });
        source.subscribe(subscriber);
      });
    }
    exports2.firstValueFrom = firstValueFrom;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/ArgumentOutOfRangeError.js
var require_ArgumentOutOfRangeError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/ArgumentOutOfRangeError.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ArgumentOutOfRangeError = void 0;
    var createErrorClass_1 = require_createErrorClass();
    exports2.ArgumentOutOfRangeError = createErrorClass_1.createErrorClass(function(_super) {
      return function ArgumentOutOfRangeErrorImpl() {
        _super(this);
        this.name = "ArgumentOutOfRangeError";
        this.message = "argument out of range";
      };
    });
  }
});

// node_modules/rxjs/dist/cjs/internal/util/NotFoundError.js
var require_NotFoundError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/NotFoundError.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NotFoundError = void 0;
    var createErrorClass_1 = require_createErrorClass();
    exports2.NotFoundError = createErrorClass_1.createErrorClass(function(_super) {
      return function NotFoundErrorImpl(message) {
        _super(this);
        this.name = "NotFoundError";
        this.message = message;
      };
    });
  }
});

// node_modules/rxjs/dist/cjs/internal/util/SequenceError.js
var require_SequenceError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/SequenceError.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SequenceError = void 0;
    var createErrorClass_1 = require_createErrorClass();
    exports2.SequenceError = createErrorClass_1.createErrorClass(function(_super) {
      return function SequenceErrorImpl(message) {
        _super(this);
        this.name = "SequenceError";
        this.message = message;
      };
    });
  }
});

// node_modules/rxjs/dist/cjs/internal/util/isDate.js
var require_isDate = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isDate.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isValidDate = void 0;
    function isValidDate(value) {
      return value instanceof Date && !isNaN(value);
    }
    exports2.isValidDate = isValidDate;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/timeout.js
var require_timeout = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/timeout.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.timeout = exports2.TimeoutError = void 0;
    var async_1 = require_async();
    var isDate_1 = require_isDate();
    var lift_1 = require_lift();
    var innerFrom_1 = require_innerFrom();
    var createErrorClass_1 = require_createErrorClass();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var executeSchedule_1 = require_executeSchedule();
    exports2.TimeoutError = createErrorClass_1.createErrorClass(function(_super) {
      return function TimeoutErrorImpl(info) {
        if (info === void 0) {
          info = null;
        }
        _super(this);
        this.message = "Timeout has occurred";
        this.name = "TimeoutError";
        this.info = info;
      };
    });
    function timeout(config, schedulerArg) {
      var _a = isDate_1.isValidDate(config) ? { first: config } : typeof config === "number" ? { each: config } : config, first = _a.first, each = _a.each, _b = _a.with, _with = _b === void 0 ? timeoutErrorFactory : _b, _c = _a.scheduler, scheduler = _c === void 0 ? schedulerArg !== null && schedulerArg !== void 0 ? schedulerArg : async_1.asyncScheduler : _c, _d = _a.meta, meta = _d === void 0 ? null : _d;
      if (first == null && each == null) {
        throw new TypeError("No timeout provided.");
      }
      return lift_1.operate(function(source, subscriber) {
        var originalSourceSubscription;
        var timerSubscription;
        var lastValue = null;
        var seen = 0;
        var startTimer = function(delay) {
          timerSubscription = executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
            try {
              originalSourceSubscription.unsubscribe();
              innerFrom_1.innerFrom(_with({
                meta,
                lastValue,
                seen
              })).subscribe(subscriber);
            } catch (err) {
              subscriber.error(err);
            }
          }, delay);
        };
        originalSourceSubscription = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
          seen++;
          subscriber.next(lastValue = value);
          each > 0 && startTimer(each);
        }, void 0, void 0, function() {
          if (!(timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.closed)) {
            timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
          }
          lastValue = null;
        }));
        !seen && startTimer(first != null ? typeof first === "number" ? first : +first - scheduler.now() : each);
      });
    }
    exports2.timeout = timeout;
    function timeoutErrorFactory(info) {
      throw new exports2.TimeoutError(info);
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/map.js
var require_map = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/map.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.map = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function map3(project, thisArg) {
      return lift_1.operate(function(source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          subscriber.next(project.call(thisArg, value, index++));
        }));
      });
    }
    exports2.map = map3;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/mapOneOrManyArgs.js
var require_mapOneOrManyArgs = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/mapOneOrManyArgs.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.mapOneOrManyArgs = void 0;
    var map_1 = require_map();
    var isArray = Array.isArray;
    function callOrApply(fn, args) {
      return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
    }
    function mapOneOrManyArgs(fn) {
      return map_1.map(function(args) {
        return callOrApply(fn, args);
      });
    }
    exports2.mapOneOrManyArgs = mapOneOrManyArgs;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/bindCallbackInternals.js
var require_bindCallbackInternals = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/bindCallbackInternals.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.bindCallbackInternals = void 0;
    var isScheduler_1 = require_isScheduler();
    var Observable_1 = require_Observable();
    var subscribeOn_1 = require_subscribeOn();
    var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
    var observeOn_1 = require_observeOn();
    var AsyncSubject_1 = require_AsyncSubject();
    function bindCallbackInternals(isNodeStyle, callbackFunc, resultSelector, scheduler) {
      if (resultSelector) {
        if (isScheduler_1.isScheduler(resultSelector)) {
          scheduler = resultSelector;
        } else {
          return function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            return bindCallbackInternals(isNodeStyle, callbackFunc, scheduler).apply(this, args).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
          };
        }
      }
      if (scheduler) {
        return function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return bindCallbackInternals(isNodeStyle, callbackFunc).apply(this, args).pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
        };
      }
      return function() {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var subject = new AsyncSubject_1.AsyncSubject();
        var uninitialized = true;
        return new Observable_1.Observable(function(subscriber) {
          var subs = subject.subscribe(subscriber);
          if (uninitialized) {
            uninitialized = false;
            var isAsync_1 = false;
            var isComplete_1 = false;
            callbackFunc.apply(_this, __spreadArray(__spreadArray([], __read(args)), [
              function() {
                var results = [];
                for (var _i2 = 0; _i2 < arguments.length; _i2++) {
                  results[_i2] = arguments[_i2];
                }
                if (isNodeStyle) {
                  var err = results.shift();
                  if (err != null) {
                    subject.error(err);
                    return;
                  }
                }
                subject.next(1 < results.length ? results : results[0]);
                isComplete_1 = true;
                if (isAsync_1) {
                  subject.complete();
                }
              }
            ]));
            if (isComplete_1) {
              subject.complete();
            }
            isAsync_1 = true;
          }
          return subs;
        });
      };
    }
    exports2.bindCallbackInternals = bindCallbackInternals;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/bindCallback.js
var require_bindCallback = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/bindCallback.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.bindCallback = void 0;
    var bindCallbackInternals_1 = require_bindCallbackInternals();
    function bindCallback(callbackFunc, resultSelector, scheduler) {
      return bindCallbackInternals_1.bindCallbackInternals(false, callbackFunc, resultSelector, scheduler);
    }
    exports2.bindCallback = bindCallback;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/bindNodeCallback.js
var require_bindNodeCallback = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/bindNodeCallback.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.bindNodeCallback = void 0;
    var bindCallbackInternals_1 = require_bindCallbackInternals();
    function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
      return bindCallbackInternals_1.bindCallbackInternals(true, callbackFunc, resultSelector, scheduler);
    }
    exports2.bindNodeCallback = bindNodeCallback;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/argsArgArrayOrObject.js
var require_argsArgArrayOrObject = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/argsArgArrayOrObject.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.argsArgArrayOrObject = void 0;
    var isArray = Array.isArray;
    var getPrototypeOf = Object.getPrototypeOf;
    var objectProto = Object.prototype;
    var getKeys = Object.keys;
    function argsArgArrayOrObject(args) {
      if (args.length === 1) {
        var first_1 = args[0];
        if (isArray(first_1)) {
          return { args: first_1, keys: null };
        }
        if (isPOJO(first_1)) {
          var keys = getKeys(first_1);
          return {
            args: keys.map(function(key) {
              return first_1[key];
            }),
            keys
          };
        }
      }
      return { args, keys: null };
    }
    exports2.argsArgArrayOrObject = argsArgArrayOrObject;
    function isPOJO(obj) {
      return obj && typeof obj === "object" && getPrototypeOf(obj) === objectProto;
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/util/createObject.js
var require_createObject = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/createObject.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createObject = void 0;
    function createObject(keys, values) {
      return keys.reduce(function(result, key, i) {
        return result[key] = values[i], result;
      }, {});
    }
    exports2.createObject = createObject;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/combineLatest.js
var require_combineLatest = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/combineLatest.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.combineLatestInit = exports2.combineLatest = void 0;
    var Observable_1 = require_Observable();
    var argsArgArrayOrObject_1 = require_argsArgArrayOrObject();
    var from_1 = require_from();
    var identity_1 = require_identity();
    var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
    var args_1 = require_args();
    var createObject_1 = require_createObject();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var executeSchedule_1 = require_executeSchedule();
    function combineLatest() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var scheduler = args_1.popScheduler(args);
      var resultSelector = args_1.popResultSelector(args);
      var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args), observables = _a.args, keys = _a.keys;
      if (observables.length === 0) {
        return from_1.from([], scheduler);
      }
      var result = new Observable_1.Observable(combineLatestInit(observables, scheduler, keys ? function(values) {
        return createObject_1.createObject(keys, values);
      } : identity_1.identity));
      return resultSelector ? result.pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : result;
    }
    exports2.combineLatest = combineLatest;
    function combineLatestInit(observables, scheduler, valueTransform) {
      if (valueTransform === void 0) {
        valueTransform = identity_1.identity;
      }
      return function(subscriber) {
        maybeSchedule(scheduler, function() {
          var length = observables.length;
          var values = new Array(length);
          var active = length;
          var remainingFirstValues = length;
          var _loop_1 = function(i2) {
            maybeSchedule(scheduler, function() {
              var source = from_1.from(observables[i2], scheduler);
              var hasFirstValue = false;
              source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
                values[i2] = value;
                if (!hasFirstValue) {
                  hasFirstValue = true;
                  remainingFirstValues--;
                }
                if (!remainingFirstValues) {
                  subscriber.next(valueTransform(values.slice()));
                }
              }, function() {
                if (!--active) {
                  subscriber.complete();
                }
              }));
            }, subscriber);
          };
          for (var i = 0; i < length; i++) {
            _loop_1(i);
          }
        }, subscriber);
      };
    }
    exports2.combineLatestInit = combineLatestInit;
    function maybeSchedule(scheduler, execute, subscription) {
      if (scheduler) {
        executeSchedule_1.executeSchedule(subscription, scheduler, execute);
      } else {
        execute();
      }
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/mergeInternals.js
var require_mergeInternals = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/mergeInternals.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.mergeInternals = void 0;
    var innerFrom_1 = require_innerFrom();
    var executeSchedule_1 = require_executeSchedule();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
      var buffer = [];
      var active = 0;
      var index = 0;
      var isComplete = false;
      var checkComplete = function() {
        if (isComplete && !buffer.length && !active) {
          subscriber.complete();
        }
      };
      var outerNext = function(value) {
        return active < concurrent ? doInnerSub(value) : buffer.push(value);
      };
      var doInnerSub = function(value) {
        expand && subscriber.next(value);
        active++;
        var innerComplete = false;
        innerFrom_1.innerFrom(project(value, index++)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(innerValue) {
          onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
          if (expand) {
            outerNext(innerValue);
          } else {
            subscriber.next(innerValue);
          }
        }, function() {
          innerComplete = true;
        }, void 0, function() {
          if (innerComplete) {
            try {
              active--;
              var _loop_1 = function() {
                var bufferedValue = buffer.shift();
                if (innerSubScheduler) {
                  executeSchedule_1.executeSchedule(subscriber, innerSubScheduler, function() {
                    return doInnerSub(bufferedValue);
                  });
                } else {
                  doInnerSub(bufferedValue);
                }
              };
              while (buffer.length && active < concurrent) {
                _loop_1();
              }
              checkComplete();
            } catch (err) {
              subscriber.error(err);
            }
          }
        }));
      };
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, outerNext, function() {
        isComplete = true;
        checkComplete();
      }));
      return function() {
        additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
      };
    }
    exports2.mergeInternals = mergeInternals;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/mergeMap.js
var require_mergeMap = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/mergeMap.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.mergeMap = void 0;
    var map_1 = require_map();
    var innerFrom_1 = require_innerFrom();
    var lift_1 = require_lift();
    var mergeInternals_1 = require_mergeInternals();
    var isFunction_1 = require_isFunction();
    function mergeMap(project, resultSelector, concurrent) {
      if (concurrent === void 0) {
        concurrent = Infinity;
      }
      if (isFunction_1.isFunction(resultSelector)) {
        return mergeMap(function(a, i) {
          return map_1.map(function(b, ii) {
            return resultSelector(a, b, i, ii);
          })(innerFrom_1.innerFrom(project(a, i)));
        }, concurrent);
      } else if (typeof resultSelector === "number") {
        concurrent = resultSelector;
      }
      return lift_1.operate(function(source, subscriber) {
        return mergeInternals_1.mergeInternals(source, subscriber, project, concurrent);
      });
    }
    exports2.mergeMap = mergeMap;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/mergeAll.js
var require_mergeAll = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/mergeAll.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.mergeAll = void 0;
    var mergeMap_1 = require_mergeMap();
    var identity_1 = require_identity();
    function mergeAll(concurrent) {
      if (concurrent === void 0) {
        concurrent = Infinity;
      }
      return mergeMap_1.mergeMap(identity_1.identity, concurrent);
    }
    exports2.mergeAll = mergeAll;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/concatAll.js
var require_concatAll = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/concatAll.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.concatAll = void 0;
    var mergeAll_1 = require_mergeAll();
    function concatAll() {
      return mergeAll_1.mergeAll(1);
    }
    exports2.concatAll = concatAll;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/concat.js
var require_concat = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/concat.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.concat = void 0;
    var concatAll_1 = require_concatAll();
    var args_1 = require_args();
    var from_1 = require_from();
    function concat() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return concatAll_1.concatAll()(from_1.from(args, args_1.popScheduler(args)));
    }
    exports2.concat = concat;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/defer.js
var require_defer = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/defer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.defer = void 0;
    var Observable_1 = require_Observable();
    var innerFrom_1 = require_innerFrom();
    function defer(observableFactory) {
      return new Observable_1.Observable(function(subscriber) {
        innerFrom_1.innerFrom(observableFactory()).subscribe(subscriber);
      });
    }
    exports2.defer = defer;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/connectable.js
var require_connectable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/connectable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.connectable = void 0;
    var Subject_1 = require_Subject();
    var Observable_1 = require_Observable();
    var defer_1 = require_defer();
    var DEFAULT_CONFIG = {
      connector: function() {
        return new Subject_1.Subject();
      },
      resetOnDisconnect: true
    };
    function connectable(source, config) {
      if (config === void 0) {
        config = DEFAULT_CONFIG;
      }
      var connection = null;
      var connector = config.connector, _a = config.resetOnDisconnect, resetOnDisconnect = _a === void 0 ? true : _a;
      var subject = connector();
      var result = new Observable_1.Observable(function(subscriber) {
        return subject.subscribe(subscriber);
      });
      result.connect = function() {
        if (!connection || connection.closed) {
          connection = defer_1.defer(function() {
            return source;
          }).subscribe(subject);
          if (resetOnDisconnect) {
            connection.add(function() {
              return subject = connector();
            });
          }
        }
        return connection;
      };
      return result;
    }
    exports2.connectable = connectable;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/forkJoin.js
var require_forkJoin = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/forkJoin.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.forkJoin = void 0;
    var Observable_1 = require_Observable();
    var argsArgArrayOrObject_1 = require_argsArgArrayOrObject();
    var innerFrom_1 = require_innerFrom();
    var args_1 = require_args();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
    var createObject_1 = require_createObject();
    function forkJoin() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var resultSelector = args_1.popResultSelector(args);
      var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args), sources = _a.args, keys = _a.keys;
      var result = new Observable_1.Observable(function(subscriber) {
        var length = sources.length;
        if (!length) {
          subscriber.complete();
          return;
        }
        var values = new Array(length);
        var remainingCompletions = length;
        var remainingEmissions = length;
        var _loop_1 = function(sourceIndex2) {
          var hasValue = false;
          innerFrom_1.innerFrom(sources[sourceIndex2]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            if (!hasValue) {
              hasValue = true;
              remainingEmissions--;
            }
            values[sourceIndex2] = value;
          }, function() {
            return remainingCompletions--;
          }, void 0, function() {
            if (!remainingCompletions || !hasValue) {
              if (!remainingEmissions) {
                subscriber.next(keys ? createObject_1.createObject(keys, values) : values);
              }
              subscriber.complete();
            }
          }));
        };
        for (var sourceIndex = 0; sourceIndex < length; sourceIndex++) {
          _loop_1(sourceIndex);
        }
      });
      return resultSelector ? result.pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : result;
    }
    exports2.forkJoin = forkJoin;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/fromEvent.js
var require_fromEvent = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/fromEvent.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fromEvent = void 0;
    var innerFrom_1 = require_innerFrom();
    var Observable_1 = require_Observable();
    var mergeMap_1 = require_mergeMap();
    var isArrayLike_1 = require_isArrayLike();
    var isFunction_1 = require_isFunction();
    var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
    var nodeEventEmitterMethods = ["addListener", "removeListener"];
    var eventTargetMethods = ["addEventListener", "removeEventListener"];
    var jqueryMethods = ["on", "off"];
    function fromEvent(target, eventName, options, resultSelector) {
      if (isFunction_1.isFunction(options)) {
        resultSelector = options;
        options = void 0;
      }
      if (resultSelector) {
        return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
      }
      var _a = __read(isEventTarget(target) ? eventTargetMethods.map(function(methodName) {
        return function(handler) {
          return target[methodName](eventName, handler, options);
        };
      }) : isNodeStyleEventEmitter(target) ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName)) : isJQueryStyleEventEmitter(target) ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName)) : [], 2), add = _a[0], remove = _a[1];
      if (!add) {
        if (isArrayLike_1.isArrayLike(target)) {
          return mergeMap_1.mergeMap(function(subTarget) {
            return fromEvent(subTarget, eventName, options);
          })(innerFrom_1.innerFrom(target));
        }
      }
      if (!add) {
        throw new TypeError("Invalid event target");
      }
      return new Observable_1.Observable(function(subscriber) {
        var handler = function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return subscriber.next(1 < args.length ? args : args[0]);
        };
        add(handler);
        return function() {
          return remove(handler);
        };
      });
    }
    exports2.fromEvent = fromEvent;
    function toCommonHandlerRegistry(target, eventName) {
      return function(methodName) {
        return function(handler) {
          return target[methodName](eventName, handler);
        };
      };
    }
    function isNodeStyleEventEmitter(target) {
      return isFunction_1.isFunction(target.addListener) && isFunction_1.isFunction(target.removeListener);
    }
    function isJQueryStyleEventEmitter(target) {
      return isFunction_1.isFunction(target.on) && isFunction_1.isFunction(target.off);
    }
    function isEventTarget(target) {
      return isFunction_1.isFunction(target.addEventListener) && isFunction_1.isFunction(target.removeEventListener);
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/fromEventPattern.js
var require_fromEventPattern = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/fromEventPattern.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fromEventPattern = void 0;
    var Observable_1 = require_Observable();
    var isFunction_1 = require_isFunction();
    var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
    function fromEventPattern(addHandler, removeHandler, resultSelector) {
      if (resultSelector) {
        return fromEventPattern(addHandler, removeHandler).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
      }
      return new Observable_1.Observable(function(subscriber) {
        var handler = function() {
          var e = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            e[_i] = arguments[_i];
          }
          return subscriber.next(e.length === 1 ? e[0] : e);
        };
        var retValue = addHandler(handler);
        return isFunction_1.isFunction(removeHandler) ? function() {
          return removeHandler(handler, retValue);
        } : void 0;
      });
    }
    exports2.fromEventPattern = fromEventPattern;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/generate.js
var require_generate = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/generate.js"(exports2) {
    "use strict";
    var __generator = exports2 && exports2.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1) throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.generate = void 0;
    var identity_1 = require_identity();
    var isScheduler_1 = require_isScheduler();
    var defer_1 = require_defer();
    var scheduleIterable_1 = require_scheduleIterable();
    function generate(initialStateOrOptions, condition, iterate, resultSelectorOrScheduler, scheduler) {
      var _a, _b;
      var resultSelector;
      var initialState;
      if (arguments.length === 1) {
        _a = initialStateOrOptions, initialState = _a.initialState, condition = _a.condition, iterate = _a.iterate, _b = _a.resultSelector, resultSelector = _b === void 0 ? identity_1.identity : _b, scheduler = _a.scheduler;
      } else {
        initialState = initialStateOrOptions;
        if (!resultSelectorOrScheduler || isScheduler_1.isScheduler(resultSelectorOrScheduler)) {
          resultSelector = identity_1.identity;
          scheduler = resultSelectorOrScheduler;
        } else {
          resultSelector = resultSelectorOrScheduler;
        }
      }
      function gen() {
        var state;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              state = initialState;
              _a2.label = 1;
            case 1:
              if (!(!condition || condition(state))) return [3, 4];
              return [4, resultSelector(state)];
            case 2:
              _a2.sent();
              _a2.label = 3;
            case 3:
              state = iterate(state);
              return [3, 1];
            case 4:
              return [2];
          }
        });
      }
      return defer_1.defer(scheduler ? function() {
        return scheduleIterable_1.scheduleIterable(gen(), scheduler);
      } : gen);
    }
    exports2.generate = generate;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/iif.js
var require_iif = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/iif.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.iif = void 0;
    var defer_1 = require_defer();
    function iif(condition, trueResult, falseResult) {
      return defer_1.defer(function() {
        return condition() ? trueResult : falseResult;
      });
    }
    exports2.iif = iif;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/timer.js
var require_timer = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/timer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.timer = void 0;
    var Observable_1 = require_Observable();
    var async_1 = require_async();
    var isScheduler_1 = require_isScheduler();
    var isDate_1 = require_isDate();
    function timer(dueTime, intervalOrScheduler, scheduler) {
      if (dueTime === void 0) {
        dueTime = 0;
      }
      if (scheduler === void 0) {
        scheduler = async_1.async;
      }
      var intervalDuration = -1;
      if (intervalOrScheduler != null) {
        if (isScheduler_1.isScheduler(intervalOrScheduler)) {
          scheduler = intervalOrScheduler;
        } else {
          intervalDuration = intervalOrScheduler;
        }
      }
      return new Observable_1.Observable(function(subscriber) {
        var due = isDate_1.isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
        if (due < 0) {
          due = 0;
        }
        var n = 0;
        return scheduler.schedule(function() {
          if (!subscriber.closed) {
            subscriber.next(n++);
            if (0 <= intervalDuration) {
              this.schedule(void 0, intervalDuration);
            } else {
              subscriber.complete();
            }
          }
        }, due);
      });
    }
    exports2.timer = timer;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/interval.js
var require_interval = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/interval.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.interval = void 0;
    var async_1 = require_async();
    var timer_1 = require_timer();
    function interval(period, scheduler) {
      if (period === void 0) {
        period = 0;
      }
      if (scheduler === void 0) {
        scheduler = async_1.asyncScheduler;
      }
      if (period < 0) {
        period = 0;
      }
      return timer_1.timer(period, period, scheduler);
    }
    exports2.interval = interval;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/merge.js
var require_merge = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/merge.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.merge = void 0;
    var mergeAll_1 = require_mergeAll();
    var innerFrom_1 = require_innerFrom();
    var empty_1 = require_empty();
    var args_1 = require_args();
    var from_1 = require_from();
    function merge2() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var scheduler = args_1.popScheduler(args);
      var concurrent = args_1.popNumber(args, Infinity);
      var sources = args;
      return !sources.length ? empty_1.EMPTY : sources.length === 1 ? innerFrom_1.innerFrom(sources[0]) : mergeAll_1.mergeAll(concurrent)(from_1.from(sources, scheduler));
    }
    exports2.merge = merge2;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/never.js
var require_never = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/never.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.never = exports2.NEVER = void 0;
    var Observable_1 = require_Observable();
    var noop_1 = require_noop();
    exports2.NEVER = new Observable_1.Observable(noop_1.noop);
    function never() {
      return exports2.NEVER;
    }
    exports2.never = never;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/argsOrArgArray.js
var require_argsOrArgArray = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/argsOrArgArray.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.argsOrArgArray = void 0;
    var isArray = Array.isArray;
    function argsOrArgArray(args) {
      return args.length === 1 && isArray(args[0]) ? args[0] : args;
    }
    exports2.argsOrArgArray = argsOrArgArray;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/onErrorResumeNext.js
var require_onErrorResumeNext = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/onErrorResumeNext.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.onErrorResumeNext = void 0;
    var Observable_1 = require_Observable();
    var argsOrArgArray_1 = require_argsOrArgArray();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var noop_1 = require_noop();
    var innerFrom_1 = require_innerFrom();
    function onErrorResumeNext() {
      var sources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
      }
      var nextSources = argsOrArgArray_1.argsOrArgArray(sources);
      return new Observable_1.Observable(function(subscriber) {
        var sourceIndex = 0;
        var subscribeNext = function() {
          if (sourceIndex < nextSources.length) {
            var nextSource = void 0;
            try {
              nextSource = innerFrom_1.innerFrom(nextSources[sourceIndex++]);
            } catch (err) {
              subscribeNext();
              return;
            }
            var innerSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, void 0, noop_1.noop, noop_1.noop);
            nextSource.subscribe(innerSubscriber);
            innerSubscriber.add(subscribeNext);
          } else {
            subscriber.complete();
          }
        };
        subscribeNext();
      });
    }
    exports2.onErrorResumeNext = onErrorResumeNext;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/pairs.js
var require_pairs = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/pairs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.pairs = void 0;
    var from_1 = require_from();
    function pairs(obj, scheduler) {
      return from_1.from(Object.entries(obj), scheduler);
    }
    exports2.pairs = pairs;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/not.js
var require_not = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/not.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.not = void 0;
    function not(pred, thisArg) {
      return function(value, index) {
        return !pred.call(thisArg, value, index);
      };
    }
    exports2.not = not;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/filter.js
var require_filter = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/filter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.filter = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function filter8(predicate, thisArg) {
      return lift_1.operate(function(source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          return predicate.call(thisArg, value, index++) && subscriber.next(value);
        }));
      });
    }
    exports2.filter = filter8;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/partition.js
var require_partition = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/partition.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.partition = void 0;
    var not_1 = require_not();
    var filter_1 = require_filter();
    var innerFrom_1 = require_innerFrom();
    function partition(source, predicate, thisArg) {
      return [filter_1.filter(predicate, thisArg)(innerFrom_1.innerFrom(source)), filter_1.filter(not_1.not(predicate, thisArg))(innerFrom_1.innerFrom(source))];
    }
    exports2.partition = partition;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/race.js
var require_race = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/race.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.raceInit = exports2.race = void 0;
    var Observable_1 = require_Observable();
    var innerFrom_1 = require_innerFrom();
    var argsOrArgArray_1 = require_argsOrArgArray();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function race() {
      var sources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
      }
      sources = argsOrArgArray_1.argsOrArgArray(sources);
      return sources.length === 1 ? innerFrom_1.innerFrom(sources[0]) : new Observable_1.Observable(raceInit(sources));
    }
    exports2.race = race;
    function raceInit(sources) {
      return function(subscriber) {
        var subscriptions = [];
        var _loop_1 = function(i2) {
          subscriptions.push(innerFrom_1.innerFrom(sources[i2]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            if (subscriptions) {
              for (var s = 0; s < subscriptions.length; s++) {
                s !== i2 && subscriptions[s].unsubscribe();
              }
              subscriptions = null;
            }
            subscriber.next(value);
          })));
        };
        for (var i = 0; subscriptions && !subscriber.closed && i < sources.length; i++) {
          _loop_1(i);
        }
      };
    }
    exports2.raceInit = raceInit;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/range.js
var require_range = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/range.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.range = void 0;
    var Observable_1 = require_Observable();
    var empty_1 = require_empty();
    function range(start, count, scheduler) {
      if (count == null) {
        count = start;
        start = 0;
      }
      if (count <= 0) {
        return empty_1.EMPTY;
      }
      var end = count + start;
      return new Observable_1.Observable(scheduler ? function(subscriber) {
        var n = start;
        return scheduler.schedule(function() {
          if (n < end) {
            subscriber.next(n++);
            this.schedule();
          } else {
            subscriber.complete();
          }
        });
      } : function(subscriber) {
        var n = start;
        while (n < end && !subscriber.closed) {
          subscriber.next(n++);
        }
        subscriber.complete();
      });
    }
    exports2.range = range;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/using.js
var require_using = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/using.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.using = void 0;
    var Observable_1 = require_Observable();
    var innerFrom_1 = require_innerFrom();
    var empty_1 = require_empty();
    function using(resourceFactory, observableFactory) {
      return new Observable_1.Observable(function(subscriber) {
        var resource = resourceFactory();
        var result = observableFactory(resource);
        var source = result ? innerFrom_1.innerFrom(result) : empty_1.EMPTY;
        source.subscribe(subscriber);
        return function() {
          if (resource) {
            resource.unsubscribe();
          }
        };
      });
    }
    exports2.using = using;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/zip.js
var require_zip = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/zip.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.zip = void 0;
    var Observable_1 = require_Observable();
    var innerFrom_1 = require_innerFrom();
    var argsOrArgArray_1 = require_argsOrArgArray();
    var empty_1 = require_empty();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var args_1 = require_args();
    function zip() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var resultSelector = args_1.popResultSelector(args);
      var sources = argsOrArgArray_1.argsOrArgArray(args);
      return sources.length ? new Observable_1.Observable(function(subscriber) {
        var buffers = sources.map(function() {
          return [];
        });
        var completed = sources.map(function() {
          return false;
        });
        subscriber.add(function() {
          buffers = completed = null;
        });
        var _loop_1 = function(sourceIndex2) {
          innerFrom_1.innerFrom(sources[sourceIndex2]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            buffers[sourceIndex2].push(value);
            if (buffers.every(function(buffer) {
              return buffer.length;
            })) {
              var result = buffers.map(function(buffer) {
                return buffer.shift();
              });
              subscriber.next(resultSelector ? resultSelector.apply(void 0, __spreadArray([], __read(result))) : result);
              if (buffers.some(function(buffer, i) {
                return !buffer.length && completed[i];
              })) {
                subscriber.complete();
              }
            }
          }, function() {
            completed[sourceIndex2] = true;
            !buffers[sourceIndex2].length && subscriber.complete();
          }));
        };
        for (var sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
          _loop_1(sourceIndex);
        }
        return function() {
          buffers = completed = null;
        };
      }) : empty_1.EMPTY;
    }
    exports2.zip = zip;
  }
});

// node_modules/rxjs/dist/cjs/internal/types.js
var require_types = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/audit.js
var require_audit = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/audit.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.audit = void 0;
    var lift_1 = require_lift();
    var innerFrom_1 = require_innerFrom();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function audit(durationSelector) {
      return lift_1.operate(function(source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        var durationSubscriber = null;
        var isComplete = false;
        var endDuration = function() {
          durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
          durationSubscriber = null;
          if (hasValue) {
            hasValue = false;
            var value = lastValue;
            lastValue = null;
            subscriber.next(value);
          }
          isComplete && subscriber.complete();
        };
        var cleanupDuration = function() {
          durationSubscriber = null;
          isComplete && subscriber.complete();
        };
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          hasValue = true;
          lastValue = value;
          if (!durationSubscriber) {
            innerFrom_1.innerFrom(durationSelector(value)).subscribe(durationSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, endDuration, cleanupDuration));
          }
        }, function() {
          isComplete = true;
          (!hasValue || !durationSubscriber || durationSubscriber.closed) && subscriber.complete();
        }));
      });
    }
    exports2.audit = audit;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/auditTime.js
var require_auditTime = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/auditTime.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.auditTime = void 0;
    var async_1 = require_async();
    var audit_1 = require_audit();
    var timer_1 = require_timer();
    function auditTime(duration, scheduler) {
      if (scheduler === void 0) {
        scheduler = async_1.asyncScheduler;
      }
      return audit_1.audit(function() {
        return timer_1.timer(duration, scheduler);
      });
    }
    exports2.auditTime = auditTime;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/buffer.js
var require_buffer = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/buffer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.buffer = void 0;
    var lift_1 = require_lift();
    var noop_1 = require_noop();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    function buffer(closingNotifier) {
      return lift_1.operate(function(source, subscriber) {
        var currentBuffer = [];
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          return currentBuffer.push(value);
        }, function() {
          subscriber.next(currentBuffer);
          subscriber.complete();
        }));
        innerFrom_1.innerFrom(closingNotifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
          var b = currentBuffer;
          currentBuffer = [];
          subscriber.next(b);
        }, noop_1.noop));
        return function() {
          currentBuffer = null;
        };
      });
    }
    exports2.buffer = buffer;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/bufferCount.js
var require_bufferCount = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/bufferCount.js"(exports2) {
    "use strict";
    var __values = exports2 && exports2.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.bufferCount = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var arrRemove_1 = require_arrRemove();
    function bufferCount(bufferSize, startBufferEvery) {
      if (startBufferEvery === void 0) {
        startBufferEvery = null;
      }
      startBufferEvery = startBufferEvery !== null && startBufferEvery !== void 0 ? startBufferEvery : bufferSize;
      return lift_1.operate(function(source, subscriber) {
        var buffers = [];
        var count = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var e_1, _a, e_2, _b;
          var toEmit = null;
          if (count++ % startBufferEvery === 0) {
            buffers.push([]);
          }
          try {
            for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
              var buffer = buffers_1_1.value;
              buffer.push(value);
              if (bufferSize <= buffer.length) {
                toEmit = toEmit !== null && toEmit !== void 0 ? toEmit : [];
                toEmit.push(buffer);
              }
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
          if (toEmit) {
            try {
              for (var toEmit_1 = __values(toEmit), toEmit_1_1 = toEmit_1.next(); !toEmit_1_1.done; toEmit_1_1 = toEmit_1.next()) {
                var buffer = toEmit_1_1.value;
                arrRemove_1.arrRemove(buffers, buffer);
                subscriber.next(buffer);
              }
            } catch (e_2_1) {
              e_2 = { error: e_2_1 };
            } finally {
              try {
                if (toEmit_1_1 && !toEmit_1_1.done && (_b = toEmit_1.return)) _b.call(toEmit_1);
              } finally {
                if (e_2) throw e_2.error;
              }
            }
          }
        }, function() {
          var e_3, _a;
          try {
            for (var buffers_2 = __values(buffers), buffers_2_1 = buffers_2.next(); !buffers_2_1.done; buffers_2_1 = buffers_2.next()) {
              var buffer = buffers_2_1.value;
              subscriber.next(buffer);
            }
          } catch (e_3_1) {
            e_3 = { error: e_3_1 };
          } finally {
            try {
              if (buffers_2_1 && !buffers_2_1.done && (_a = buffers_2.return)) _a.call(buffers_2);
            } finally {
              if (e_3) throw e_3.error;
            }
          }
          subscriber.complete();
        }, void 0, function() {
          buffers = null;
        }));
      });
    }
    exports2.bufferCount = bufferCount;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/bufferTime.js
var require_bufferTime = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/bufferTime.js"(exports2) {
    "use strict";
    var __values = exports2 && exports2.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.bufferTime = void 0;
    var Subscription_1 = require_Subscription();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var arrRemove_1 = require_arrRemove();
    var async_1 = require_async();
    var args_1 = require_args();
    var executeSchedule_1 = require_executeSchedule();
    function bufferTime(bufferTimeSpan) {
      var _a, _b;
      var otherArgs = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        otherArgs[_i - 1] = arguments[_i];
      }
      var scheduler = (_a = args_1.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
      var bufferCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
      var maxBufferSize = otherArgs[1] || Infinity;
      return lift_1.operate(function(source, subscriber) {
        var bufferRecords = [];
        var restartOnEmit = false;
        var emit = function(record) {
          var buffer = record.buffer, subs = record.subs;
          subs.unsubscribe();
          arrRemove_1.arrRemove(bufferRecords, record);
          subscriber.next(buffer);
          restartOnEmit && startBuffer();
        };
        var startBuffer = function() {
          if (bufferRecords) {
            var subs = new Subscription_1.Subscription();
            subscriber.add(subs);
            var buffer = [];
            var record_1 = {
              buffer,
              subs
            };
            bufferRecords.push(record_1);
            executeSchedule_1.executeSchedule(subs, scheduler, function() {
              return emit(record_1);
            }, bufferTimeSpan);
          }
        };
        if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
          executeSchedule_1.executeSchedule(subscriber, scheduler, startBuffer, bufferCreationInterval, true);
        } else {
          restartOnEmit = true;
        }
        startBuffer();
        var bufferTimeSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var e_1, _a2;
          var recordsCopy = bufferRecords.slice();
          try {
            for (var recordsCopy_1 = __values(recordsCopy), recordsCopy_1_1 = recordsCopy_1.next(); !recordsCopy_1_1.done; recordsCopy_1_1 = recordsCopy_1.next()) {
              var record = recordsCopy_1_1.value;
              var buffer = record.buffer;
              buffer.push(value);
              maxBufferSize <= buffer.length && emit(record);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (recordsCopy_1_1 && !recordsCopy_1_1.done && (_a2 = recordsCopy_1.return)) _a2.call(recordsCopy_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }, function() {
          while (bufferRecords === null || bufferRecords === void 0 ? void 0 : bufferRecords.length) {
            subscriber.next(bufferRecords.shift().buffer);
          }
          bufferTimeSubscriber === null || bufferTimeSubscriber === void 0 ? void 0 : bufferTimeSubscriber.unsubscribe();
          subscriber.complete();
          subscriber.unsubscribe();
        }, void 0, function() {
          return bufferRecords = null;
        });
        source.subscribe(bufferTimeSubscriber);
      });
    }
    exports2.bufferTime = bufferTime;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/bufferToggle.js
var require_bufferToggle = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/bufferToggle.js"(exports2) {
    "use strict";
    var __values = exports2 && exports2.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.bufferToggle = void 0;
    var Subscription_1 = require_Subscription();
    var lift_1 = require_lift();
    var innerFrom_1 = require_innerFrom();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var noop_1 = require_noop();
    var arrRemove_1 = require_arrRemove();
    function bufferToggle(openings, closingSelector) {
      return lift_1.operate(function(source, subscriber) {
        var buffers = [];
        innerFrom_1.innerFrom(openings).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(openValue) {
          var buffer = [];
          buffers.push(buffer);
          var closingSubscription = new Subscription_1.Subscription();
          var emitBuffer = function() {
            arrRemove_1.arrRemove(buffers, buffer);
            subscriber.next(buffer);
            closingSubscription.unsubscribe();
          };
          closingSubscription.add(innerFrom_1.innerFrom(closingSelector(openValue)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, emitBuffer, noop_1.noop)));
        }, noop_1.noop));
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var e_1, _a;
          try {
            for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
              var buffer = buffers_1_1.value;
              buffer.push(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }, function() {
          while (buffers.length > 0) {
            subscriber.next(buffers.shift());
          }
          subscriber.complete();
        }));
      });
    }
    exports2.bufferToggle = bufferToggle;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/bufferWhen.js
var require_bufferWhen = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/bufferWhen.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.bufferWhen = void 0;
    var lift_1 = require_lift();
    var noop_1 = require_noop();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    function bufferWhen(closingSelector) {
      return lift_1.operate(function(source, subscriber) {
        var buffer = null;
        var closingSubscriber = null;
        var openBuffer = function() {
          closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
          var b = buffer;
          buffer = [];
          b && subscriber.next(b);
          innerFrom_1.innerFrom(closingSelector()).subscribe(closingSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, openBuffer, noop_1.noop));
        };
        openBuffer();
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          return buffer === null || buffer === void 0 ? void 0 : buffer.push(value);
        }, function() {
          buffer && subscriber.next(buffer);
          subscriber.complete();
        }, void 0, function() {
          return buffer = closingSubscriber = null;
        }));
      });
    }
    exports2.bufferWhen = bufferWhen;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/catchError.js
var require_catchError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/catchError.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.catchError = void 0;
    var innerFrom_1 = require_innerFrom();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var lift_1 = require_lift();
    function catchError(selector) {
      return lift_1.operate(function(source, subscriber) {
        var innerSub = null;
        var syncUnsub = false;
        var handledResult;
        innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
          handledResult = innerFrom_1.innerFrom(selector(err, catchError(selector)(source)));
          if (innerSub) {
            innerSub.unsubscribe();
            innerSub = null;
            handledResult.subscribe(subscriber);
          } else {
            syncUnsub = true;
          }
        }));
        if (syncUnsub) {
          innerSub.unsubscribe();
          innerSub = null;
          handledResult.subscribe(subscriber);
        }
      });
    }
    exports2.catchError = catchError;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/scanInternals.js
var require_scanInternals = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/scanInternals.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.scanInternals = void 0;
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function scanInternals(accumulator, seed, hasSeed, emitOnNext, emitBeforeComplete) {
      return function(source, subscriber) {
        var hasState = hasSeed;
        var state = seed;
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var i = index++;
          state = hasState ? accumulator(state, value, i) : (hasState = true, value);
          emitOnNext && subscriber.next(state);
        }, emitBeforeComplete && function() {
          hasState && subscriber.next(state);
          subscriber.complete();
        }));
      };
    }
    exports2.scanInternals = scanInternals;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/reduce.js
var require_reduce = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/reduce.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.reduce = void 0;
    var scanInternals_1 = require_scanInternals();
    var lift_1 = require_lift();
    function reduce(accumulator, seed) {
      return lift_1.operate(scanInternals_1.scanInternals(accumulator, seed, arguments.length >= 2, false, true));
    }
    exports2.reduce = reduce;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/toArray.js
var require_toArray = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/toArray.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toArray = void 0;
    var reduce_1 = require_reduce();
    var lift_1 = require_lift();
    var arrReducer = function(arr, value) {
      return arr.push(value), arr;
    };
    function toArray() {
      return lift_1.operate(function(source, subscriber) {
        reduce_1.reduce(arrReducer, [])(source).subscribe(subscriber);
      });
    }
    exports2.toArray = toArray;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/joinAllInternals.js
var require_joinAllInternals = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/joinAllInternals.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.joinAllInternals = void 0;
    var identity_1 = require_identity();
    var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
    var pipe_1 = require_pipe();
    var mergeMap_1 = require_mergeMap();
    var toArray_1 = require_toArray();
    function joinAllInternals(joinFn, project) {
      return pipe_1.pipe(toArray_1.toArray(), mergeMap_1.mergeMap(function(sources) {
        return joinFn(sources);
      }), project ? mapOneOrManyArgs_1.mapOneOrManyArgs(project) : identity_1.identity);
    }
    exports2.joinAllInternals = joinAllInternals;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/combineLatestAll.js
var require_combineLatestAll = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/combineLatestAll.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.combineLatestAll = void 0;
    var combineLatest_1 = require_combineLatest();
    var joinAllInternals_1 = require_joinAllInternals();
    function combineLatestAll(project) {
      return joinAllInternals_1.joinAllInternals(combineLatest_1.combineLatest, project);
    }
    exports2.combineLatestAll = combineLatestAll;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/combineAll.js
var require_combineAll = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/combineAll.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.combineAll = void 0;
    var combineLatestAll_1 = require_combineLatestAll();
    exports2.combineAll = combineLatestAll_1.combineLatestAll;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/combineLatest.js
var require_combineLatest2 = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/combineLatest.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.combineLatest = void 0;
    var combineLatest_1 = require_combineLatest();
    var lift_1 = require_lift();
    var argsOrArgArray_1 = require_argsOrArgArray();
    var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
    var pipe_1 = require_pipe();
    var args_1 = require_args();
    function combineLatest() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var resultSelector = args_1.popResultSelector(args);
      return resultSelector ? pipe_1.pipe(combineLatest.apply(void 0, __spreadArray([], __read(args))), mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : lift_1.operate(function(source, subscriber) {
        combineLatest_1.combineLatestInit(__spreadArray([source], __read(argsOrArgArray_1.argsOrArgArray(args))))(subscriber);
      });
    }
    exports2.combineLatest = combineLatest;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/combineLatestWith.js
var require_combineLatestWith = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/combineLatestWith.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.combineLatestWith = void 0;
    var combineLatest_1 = require_combineLatest2();
    function combineLatestWith() {
      var otherSources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
      }
      return combineLatest_1.combineLatest.apply(void 0, __spreadArray([], __read(otherSources)));
    }
    exports2.combineLatestWith = combineLatestWith;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/concatMap.js
var require_concatMap = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/concatMap.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.concatMap = void 0;
    var mergeMap_1 = require_mergeMap();
    var isFunction_1 = require_isFunction();
    function concatMap(project, resultSelector) {
      return isFunction_1.isFunction(resultSelector) ? mergeMap_1.mergeMap(project, resultSelector, 1) : mergeMap_1.mergeMap(project, 1);
    }
    exports2.concatMap = concatMap;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/concatMapTo.js
var require_concatMapTo = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/concatMapTo.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.concatMapTo = void 0;
    var concatMap_1 = require_concatMap();
    var isFunction_1 = require_isFunction();
    function concatMapTo(innerObservable, resultSelector) {
      return isFunction_1.isFunction(resultSelector) ? concatMap_1.concatMap(function() {
        return innerObservable;
      }, resultSelector) : concatMap_1.concatMap(function() {
        return innerObservable;
      });
    }
    exports2.concatMapTo = concatMapTo;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/concat.js
var require_concat2 = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/concat.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.concat = void 0;
    var lift_1 = require_lift();
    var concatAll_1 = require_concatAll();
    var args_1 = require_args();
    var from_1 = require_from();
    function concat() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var scheduler = args_1.popScheduler(args);
      return lift_1.operate(function(source, subscriber) {
        concatAll_1.concatAll()(from_1.from(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
      });
    }
    exports2.concat = concat;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/concatWith.js
var require_concatWith = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/concatWith.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.concatWith = void 0;
    var concat_1 = require_concat2();
    function concatWith() {
      var otherSources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
      }
      return concat_1.concat.apply(void 0, __spreadArray([], __read(otherSources)));
    }
    exports2.concatWith = concatWith;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/fromSubscribable.js
var require_fromSubscribable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/fromSubscribable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fromSubscribable = void 0;
    var Observable_1 = require_Observable();
    function fromSubscribable(subscribable) {
      return new Observable_1.Observable(function(subscriber) {
        return subscribable.subscribe(subscriber);
      });
    }
    exports2.fromSubscribable = fromSubscribable;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/connect.js
var require_connect = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/connect.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.connect = void 0;
    var Subject_1 = require_Subject();
    var innerFrom_1 = require_innerFrom();
    var lift_1 = require_lift();
    var fromSubscribable_1 = require_fromSubscribable();
    var DEFAULT_CONFIG = {
      connector: function() {
        return new Subject_1.Subject();
      }
    };
    function connect(selector, config) {
      if (config === void 0) {
        config = DEFAULT_CONFIG;
      }
      var connector = config.connector;
      return lift_1.operate(function(source, subscriber) {
        var subject = connector();
        innerFrom_1.innerFrom(selector(fromSubscribable_1.fromSubscribable(subject))).subscribe(subscriber);
        subscriber.add(source.subscribe(subject));
      });
    }
    exports2.connect = connect;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/count.js
var require_count = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/count.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.count = void 0;
    var reduce_1 = require_reduce();
    function count(predicate) {
      return reduce_1.reduce(function(total, value, i) {
        return !predicate || predicate(value, i) ? total + 1 : total;
      }, 0);
    }
    exports2.count = count;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/debounce.js
var require_debounce = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/debounce.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.debounce = void 0;
    var lift_1 = require_lift();
    var noop_1 = require_noop();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    function debounce(durationSelector) {
      return lift_1.operate(function(source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        var durationSubscriber = null;
        var emit = function() {
          durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
          durationSubscriber = null;
          if (hasValue) {
            hasValue = false;
            var value = lastValue;
            lastValue = null;
            subscriber.next(value);
          }
        };
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
          hasValue = true;
          lastValue = value;
          durationSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, emit, noop_1.noop);
          innerFrom_1.innerFrom(durationSelector(value)).subscribe(durationSubscriber);
        }, function() {
          emit();
          subscriber.complete();
        }, void 0, function() {
          lastValue = durationSubscriber = null;
        }));
      });
    }
    exports2.debounce = debounce;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/debounceTime.js
var require_debounceTime = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/debounceTime.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.debounceTime = void 0;
    var async_1 = require_async();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function debounceTime(dueTime, scheduler) {
      if (scheduler === void 0) {
        scheduler = async_1.asyncScheduler;
      }
      return lift_1.operate(function(source, subscriber) {
        var activeTask = null;
        var lastValue = null;
        var lastTime = null;
        var emit = function() {
          if (activeTask) {
            activeTask.unsubscribe();
            activeTask = null;
            var value = lastValue;
            lastValue = null;
            subscriber.next(value);
          }
        };
        function emitWhenIdle() {
          var targetTime = lastTime + dueTime;
          var now = scheduler.now();
          if (now < targetTime) {
            activeTask = this.schedule(void 0, targetTime - now);
            subscriber.add(activeTask);
            return;
          }
          emit();
        }
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          lastValue = value;
          lastTime = scheduler.now();
          if (!activeTask) {
            activeTask = scheduler.schedule(emitWhenIdle, dueTime);
            subscriber.add(activeTask);
          }
        }, function() {
          emit();
          subscriber.complete();
        }, void 0, function() {
          lastValue = activeTask = null;
        }));
      });
    }
    exports2.debounceTime = debounceTime;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/defaultIfEmpty.js
var require_defaultIfEmpty = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/defaultIfEmpty.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.defaultIfEmpty = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function defaultIfEmpty(defaultValue) {
      return lift_1.operate(function(source, subscriber) {
        var hasValue = false;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          hasValue = true;
          subscriber.next(value);
        }, function() {
          if (!hasValue) {
            subscriber.next(defaultValue);
          }
          subscriber.complete();
        }));
      });
    }
    exports2.defaultIfEmpty = defaultIfEmpty;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/take.js
var require_take = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/take.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.take = void 0;
    var empty_1 = require_empty();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function take7(count) {
      return count <= 0 ? function() {
        return empty_1.EMPTY;
      } : lift_1.operate(function(source, subscriber) {
        var seen = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          if (++seen <= count) {
            subscriber.next(value);
            if (count <= seen) {
              subscriber.complete();
            }
          }
        }));
      });
    }
    exports2.take = take7;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/ignoreElements.js
var require_ignoreElements = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/ignoreElements.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ignoreElements = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var noop_1 = require_noop();
    function ignoreElements() {
      return lift_1.operate(function(source, subscriber) {
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, noop_1.noop));
      });
    }
    exports2.ignoreElements = ignoreElements;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/mapTo.js
var require_mapTo = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/mapTo.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.mapTo = void 0;
    var map_1 = require_map();
    function mapTo(value) {
      return map_1.map(function() {
        return value;
      });
    }
    exports2.mapTo = mapTo;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/delayWhen.js
var require_delayWhen = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/delayWhen.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.delayWhen = void 0;
    var concat_1 = require_concat();
    var take_1 = require_take();
    var ignoreElements_1 = require_ignoreElements();
    var mapTo_1 = require_mapTo();
    var mergeMap_1 = require_mergeMap();
    var innerFrom_1 = require_innerFrom();
    function delayWhen(delayDurationSelector, subscriptionDelay) {
      if (subscriptionDelay) {
        return function(source) {
          return concat_1.concat(subscriptionDelay.pipe(take_1.take(1), ignoreElements_1.ignoreElements()), source.pipe(delayWhen(delayDurationSelector)));
        };
      }
      return mergeMap_1.mergeMap(function(value, index) {
        return innerFrom_1.innerFrom(delayDurationSelector(value, index)).pipe(take_1.take(1), mapTo_1.mapTo(value));
      });
    }
    exports2.delayWhen = delayWhen;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/delay.js
var require_delay = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/delay.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.delay = void 0;
    var async_1 = require_async();
    var delayWhen_1 = require_delayWhen();
    var timer_1 = require_timer();
    function delay(due, scheduler) {
      if (scheduler === void 0) {
        scheduler = async_1.asyncScheduler;
      }
      var duration = timer_1.timer(due, scheduler);
      return delayWhen_1.delayWhen(function() {
        return duration;
      });
    }
    exports2.delay = delay;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/dematerialize.js
var require_dematerialize = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/dematerialize.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.dematerialize = void 0;
    var Notification_1 = require_Notification();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function dematerialize() {
      return lift_1.operate(function(source, subscriber) {
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(notification) {
          return Notification_1.observeNotification(notification, subscriber);
        }));
      });
    }
    exports2.dematerialize = dematerialize;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/distinct.js
var require_distinct = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/distinct.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.distinct = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var noop_1 = require_noop();
    var innerFrom_1 = require_innerFrom();
    function distinct(keySelector, flushes) {
      return lift_1.operate(function(source, subscriber) {
        var distinctKeys = /* @__PURE__ */ new Set();
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var key = keySelector ? keySelector(value) : value;
          if (!distinctKeys.has(key)) {
            distinctKeys.add(key);
            subscriber.next(value);
          }
        }));
        flushes && innerFrom_1.innerFrom(flushes).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
          return distinctKeys.clear();
        }, noop_1.noop));
      });
    }
    exports2.distinct = distinct;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/distinctUntilChanged.js
var require_distinctUntilChanged = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/distinctUntilChanged.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.distinctUntilChanged = void 0;
    var identity_1 = require_identity();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function distinctUntilChanged(comparator, keySelector) {
      if (keySelector === void 0) {
        keySelector = identity_1.identity;
      }
      comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
      return lift_1.operate(function(source, subscriber) {
        var previousKey;
        var first = true;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var currentKey = keySelector(value);
          if (first || !comparator(previousKey, currentKey)) {
            first = false;
            previousKey = currentKey;
            subscriber.next(value);
          }
        }));
      });
    }
    exports2.distinctUntilChanged = distinctUntilChanged;
    function defaultCompare(a, b) {
      return a === b;
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/distinctUntilKeyChanged.js
var require_distinctUntilKeyChanged = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/distinctUntilKeyChanged.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.distinctUntilKeyChanged = void 0;
    var distinctUntilChanged_1 = require_distinctUntilChanged();
    function distinctUntilKeyChanged(key, compare) {
      return distinctUntilChanged_1.distinctUntilChanged(function(x, y) {
        return compare ? compare(x[key], y[key]) : x[key] === y[key];
      });
    }
    exports2.distinctUntilKeyChanged = distinctUntilKeyChanged;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/throwIfEmpty.js
var require_throwIfEmpty = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/throwIfEmpty.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.throwIfEmpty = void 0;
    var EmptyError_1 = require_EmptyError();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function throwIfEmpty(errorFactory) {
      if (errorFactory === void 0) {
        errorFactory = defaultErrorFactory;
      }
      return lift_1.operate(function(source, subscriber) {
        var hasValue = false;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          hasValue = true;
          subscriber.next(value);
        }, function() {
          return hasValue ? subscriber.complete() : subscriber.error(errorFactory());
        }));
      });
    }
    exports2.throwIfEmpty = throwIfEmpty;
    function defaultErrorFactory() {
      return new EmptyError_1.EmptyError();
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/elementAt.js
var require_elementAt = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/elementAt.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.elementAt = void 0;
    var ArgumentOutOfRangeError_1 = require_ArgumentOutOfRangeError();
    var filter_1 = require_filter();
    var throwIfEmpty_1 = require_throwIfEmpty();
    var defaultIfEmpty_1 = require_defaultIfEmpty();
    var take_1 = require_take();
    function elementAt(index, defaultValue) {
      if (index < 0) {
        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
      }
      var hasDefaultValue = arguments.length >= 2;
      return function(source) {
        return source.pipe(filter_1.filter(function(v, i) {
          return i === index;
        }), take_1.take(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function() {
          return new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
        }));
      };
    }
    exports2.elementAt = elementAt;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/endWith.js
var require_endWith = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/endWith.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.endWith = void 0;
    var concat_1 = require_concat();
    var of_1 = require_of();
    function endWith() {
      var values = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
      }
      return function(source) {
        return concat_1.concat(source, of_1.of.apply(void 0, __spreadArray([], __read(values))));
      };
    }
    exports2.endWith = endWith;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/every.js
var require_every = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/every.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.every = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function every(predicate, thisArg) {
      return lift_1.operate(function(source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          if (!predicate.call(thisArg, value, index++, source)) {
            subscriber.next(false);
            subscriber.complete();
          }
        }, function() {
          subscriber.next(true);
          subscriber.complete();
        }));
      });
    }
    exports2.every = every;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/exhaustMap.js
var require_exhaustMap = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/exhaustMap.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.exhaustMap = void 0;
    var map_1 = require_map();
    var innerFrom_1 = require_innerFrom();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function exhaustMap(project, resultSelector) {
      if (resultSelector) {
        return function(source) {
          return source.pipe(exhaustMap(function(a, i) {
            return innerFrom_1.innerFrom(project(a, i)).pipe(map_1.map(function(b, ii) {
              return resultSelector(a, b, i, ii);
            }));
          }));
        };
      }
      return lift_1.operate(function(source, subscriber) {
        var index = 0;
        var innerSub = null;
        var isComplete = false;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(outerValue) {
          if (!innerSub) {
            innerSub = OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, function() {
              innerSub = null;
              isComplete && subscriber.complete();
            });
            innerFrom_1.innerFrom(project(outerValue, index++)).subscribe(innerSub);
          }
        }, function() {
          isComplete = true;
          !innerSub && subscriber.complete();
        }));
      });
    }
    exports2.exhaustMap = exhaustMap;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/exhaustAll.js
var require_exhaustAll = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/exhaustAll.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.exhaustAll = void 0;
    var exhaustMap_1 = require_exhaustMap();
    var identity_1 = require_identity();
    function exhaustAll() {
      return exhaustMap_1.exhaustMap(identity_1.identity);
    }
    exports2.exhaustAll = exhaustAll;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/exhaust.js
var require_exhaust = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/exhaust.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.exhaust = void 0;
    var exhaustAll_1 = require_exhaustAll();
    exports2.exhaust = exhaustAll_1.exhaustAll;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/expand.js
var require_expand = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/expand.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.expand = void 0;
    var lift_1 = require_lift();
    var mergeInternals_1 = require_mergeInternals();
    function expand(project, concurrent, scheduler) {
      if (concurrent === void 0) {
        concurrent = Infinity;
      }
      concurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
      return lift_1.operate(function(source, subscriber) {
        return mergeInternals_1.mergeInternals(source, subscriber, project, concurrent, void 0, true, scheduler);
      });
    }
    exports2.expand = expand;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/finalize.js
var require_finalize = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/finalize.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.finalize = void 0;
    var lift_1 = require_lift();
    function finalize(callback) {
      return lift_1.operate(function(source, subscriber) {
        try {
          source.subscribe(subscriber);
        } finally {
          subscriber.add(callback);
        }
      });
    }
    exports2.finalize = finalize;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/find.js
var require_find = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/find.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createFind = exports2.find = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function find(predicate, thisArg) {
      return lift_1.operate(createFind(predicate, thisArg, "value"));
    }
    exports2.find = find;
    function createFind(predicate, thisArg, emit) {
      var findIndex = emit === "index";
      return function(source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var i = index++;
          if (predicate.call(thisArg, value, i, source)) {
            subscriber.next(findIndex ? i : value);
            subscriber.complete();
          }
        }, function() {
          subscriber.next(findIndex ? -1 : void 0);
          subscriber.complete();
        }));
      };
    }
    exports2.createFind = createFind;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/findIndex.js
var require_findIndex = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/findIndex.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.findIndex = void 0;
    var lift_1 = require_lift();
    var find_1 = require_find();
    function findIndex(predicate, thisArg) {
      return lift_1.operate(find_1.createFind(predicate, thisArg, "index"));
    }
    exports2.findIndex = findIndex;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/first.js
var require_first = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/first.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.first = void 0;
    var EmptyError_1 = require_EmptyError();
    var filter_1 = require_filter();
    var take_1 = require_take();
    var defaultIfEmpty_1 = require_defaultIfEmpty();
    var throwIfEmpty_1 = require_throwIfEmpty();
    var identity_1 = require_identity();
    function first(predicate, defaultValue) {
      var hasDefaultValue = arguments.length >= 2;
      return function(source) {
        return source.pipe(predicate ? filter_1.filter(function(v, i) {
          return predicate(v, i, source);
        }) : identity_1.identity, take_1.take(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function() {
          return new EmptyError_1.EmptyError();
        }));
      };
    }
    exports2.first = first;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/groupBy.js
var require_groupBy = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/groupBy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.groupBy = void 0;
    var Observable_1 = require_Observable();
    var innerFrom_1 = require_innerFrom();
    var Subject_1 = require_Subject();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function groupBy(keySelector, elementOrOptions, duration, connector) {
      return lift_1.operate(function(source, subscriber) {
        var element;
        if (!elementOrOptions || typeof elementOrOptions === "function") {
          element = elementOrOptions;
        } else {
          duration = elementOrOptions.duration, element = elementOrOptions.element, connector = elementOrOptions.connector;
        }
        var groups = /* @__PURE__ */ new Map();
        var notify = function(cb) {
          groups.forEach(cb);
          cb(subscriber);
        };
        var handleError = function(err) {
          return notify(function(consumer) {
            return consumer.error(err);
          });
        };
        var activeGroups = 0;
        var teardownAttempted = false;
        var groupBySourceSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, function(value) {
          try {
            var key_1 = keySelector(value);
            var group_1 = groups.get(key_1);
            if (!group_1) {
              groups.set(key_1, group_1 = connector ? connector() : new Subject_1.Subject());
              var grouped = createGroupedObservable(key_1, group_1);
              subscriber.next(grouped);
              if (duration) {
                var durationSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(group_1, function() {
                  group_1.complete();
                  durationSubscriber_1 === null || durationSubscriber_1 === void 0 ? void 0 : durationSubscriber_1.unsubscribe();
                }, void 0, void 0, function() {
                  return groups.delete(key_1);
                });
                groupBySourceSubscriber.add(innerFrom_1.innerFrom(duration(grouped)).subscribe(durationSubscriber_1));
              }
            }
            group_1.next(element ? element(value) : value);
          } catch (err) {
            handleError(err);
          }
        }, function() {
          return notify(function(consumer) {
            return consumer.complete();
          });
        }, handleError, function() {
          return groups.clear();
        }, function() {
          teardownAttempted = true;
          return activeGroups === 0;
        });
        source.subscribe(groupBySourceSubscriber);
        function createGroupedObservable(key, groupSubject) {
          var result = new Observable_1.Observable(function(groupSubscriber) {
            activeGroups++;
            var innerSub = groupSubject.subscribe(groupSubscriber);
            return function() {
              innerSub.unsubscribe();
              --activeGroups === 0 && teardownAttempted && groupBySourceSubscriber.unsubscribe();
            };
          });
          result.key = key;
          return result;
        }
      });
    }
    exports2.groupBy = groupBy;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/isEmpty.js
var require_isEmpty = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/isEmpty.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isEmpty = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function isEmpty() {
      return lift_1.operate(function(source, subscriber) {
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
          subscriber.next(false);
          subscriber.complete();
        }, function() {
          subscriber.next(true);
          subscriber.complete();
        }));
      });
    }
    exports2.isEmpty = isEmpty;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/takeLast.js
var require_takeLast = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/takeLast.js"(exports2) {
    "use strict";
    var __values = exports2 && exports2.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.takeLast = void 0;
    var empty_1 = require_empty();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function takeLast(count) {
      return count <= 0 ? function() {
        return empty_1.EMPTY;
      } : lift_1.operate(function(source, subscriber) {
        var buffer = [];
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          buffer.push(value);
          count < buffer.length && buffer.shift();
        }, function() {
          var e_1, _a;
          try {
            for (var buffer_1 = __values(buffer), buffer_1_1 = buffer_1.next(); !buffer_1_1.done; buffer_1_1 = buffer_1.next()) {
              var value = buffer_1_1.value;
              subscriber.next(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (buffer_1_1 && !buffer_1_1.done && (_a = buffer_1.return)) _a.call(buffer_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
          subscriber.complete();
        }, void 0, function() {
          buffer = null;
        }));
      });
    }
    exports2.takeLast = takeLast;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/last.js
var require_last = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/last.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.last = void 0;
    var EmptyError_1 = require_EmptyError();
    var filter_1 = require_filter();
    var takeLast_1 = require_takeLast();
    var throwIfEmpty_1 = require_throwIfEmpty();
    var defaultIfEmpty_1 = require_defaultIfEmpty();
    var identity_1 = require_identity();
    function last(predicate, defaultValue) {
      var hasDefaultValue = arguments.length >= 2;
      return function(source) {
        return source.pipe(predicate ? filter_1.filter(function(v, i) {
          return predicate(v, i, source);
        }) : identity_1.identity, takeLast_1.takeLast(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function() {
          return new EmptyError_1.EmptyError();
        }));
      };
    }
    exports2.last = last;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/materialize.js
var require_materialize = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/materialize.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.materialize = void 0;
    var Notification_1 = require_Notification();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function materialize() {
      return lift_1.operate(function(source, subscriber) {
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          subscriber.next(Notification_1.Notification.createNext(value));
        }, function() {
          subscriber.next(Notification_1.Notification.createComplete());
          subscriber.complete();
        }, function(err) {
          subscriber.next(Notification_1.Notification.createError(err));
          subscriber.complete();
        }));
      });
    }
    exports2.materialize = materialize;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/max.js
var require_max = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/max.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.max = void 0;
    var reduce_1 = require_reduce();
    var isFunction_1 = require_isFunction();
    function max(comparer) {
      return reduce_1.reduce(isFunction_1.isFunction(comparer) ? function(x, y) {
        return comparer(x, y) > 0 ? x : y;
      } : function(x, y) {
        return x > y ? x : y;
      });
    }
    exports2.max = max;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/flatMap.js
var require_flatMap = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/flatMap.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.flatMap = void 0;
    var mergeMap_1 = require_mergeMap();
    exports2.flatMap = mergeMap_1.mergeMap;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/mergeMapTo.js
var require_mergeMapTo = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/mergeMapTo.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.mergeMapTo = void 0;
    var mergeMap_1 = require_mergeMap();
    var isFunction_1 = require_isFunction();
    function mergeMapTo(innerObservable, resultSelector, concurrent) {
      if (concurrent === void 0) {
        concurrent = Infinity;
      }
      if (isFunction_1.isFunction(resultSelector)) {
        return mergeMap_1.mergeMap(function() {
          return innerObservable;
        }, resultSelector, concurrent);
      }
      if (typeof resultSelector === "number") {
        concurrent = resultSelector;
      }
      return mergeMap_1.mergeMap(function() {
        return innerObservable;
      }, concurrent);
    }
    exports2.mergeMapTo = mergeMapTo;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/mergeScan.js
var require_mergeScan = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/mergeScan.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.mergeScan = void 0;
    var lift_1 = require_lift();
    var mergeInternals_1 = require_mergeInternals();
    function mergeScan(accumulator, seed, concurrent) {
      if (concurrent === void 0) {
        concurrent = Infinity;
      }
      return lift_1.operate(function(source, subscriber) {
        var state = seed;
        return mergeInternals_1.mergeInternals(source, subscriber, function(value, index) {
          return accumulator(state, value, index);
        }, concurrent, function(value) {
          state = value;
        }, false, void 0, function() {
          return state = null;
        });
      });
    }
    exports2.mergeScan = mergeScan;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/merge.js
var require_merge2 = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/merge.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.merge = void 0;
    var lift_1 = require_lift();
    var argsOrArgArray_1 = require_argsOrArgArray();
    var mergeAll_1 = require_mergeAll();
    var args_1 = require_args();
    var from_1 = require_from();
    function merge2() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var scheduler = args_1.popScheduler(args);
      var concurrent = args_1.popNumber(args, Infinity);
      args = argsOrArgArray_1.argsOrArgArray(args);
      return lift_1.operate(function(source, subscriber) {
        mergeAll_1.mergeAll(concurrent)(from_1.from(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
      });
    }
    exports2.merge = merge2;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/mergeWith.js
var require_mergeWith = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/mergeWith.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.mergeWith = void 0;
    var merge_1 = require_merge2();
    function mergeWith2() {
      var otherSources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
      }
      return merge_1.merge.apply(void 0, __spreadArray([], __read(otherSources)));
    }
    exports2.mergeWith = mergeWith2;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/min.js
var require_min = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/min.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.min = void 0;
    var reduce_1 = require_reduce();
    var isFunction_1 = require_isFunction();
    function min(comparer) {
      return reduce_1.reduce(isFunction_1.isFunction(comparer) ? function(x, y) {
        return comparer(x, y) < 0 ? x : y;
      } : function(x, y) {
        return x < y ? x : y;
      });
    }
    exports2.min = min;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/multicast.js
var require_multicast = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/multicast.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.multicast = void 0;
    var ConnectableObservable_1 = require_ConnectableObservable();
    var isFunction_1 = require_isFunction();
    var connect_1 = require_connect();
    function multicast(subjectOrSubjectFactory, selector) {
      var subjectFactory = isFunction_1.isFunction(subjectOrSubjectFactory) ? subjectOrSubjectFactory : function() {
        return subjectOrSubjectFactory;
      };
      if (isFunction_1.isFunction(selector)) {
        return connect_1.connect(selector, {
          connector: subjectFactory
        });
      }
      return function(source) {
        return new ConnectableObservable_1.ConnectableObservable(source, subjectFactory);
      };
    }
    exports2.multicast = multicast;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/onErrorResumeNextWith.js
var require_onErrorResumeNextWith = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/onErrorResumeNextWith.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.onErrorResumeNext = exports2.onErrorResumeNextWith = void 0;
    var argsOrArgArray_1 = require_argsOrArgArray();
    var onErrorResumeNext_1 = require_onErrorResumeNext();
    function onErrorResumeNextWith() {
      var sources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
      }
      var nextSources = argsOrArgArray_1.argsOrArgArray(sources);
      return function(source) {
        return onErrorResumeNext_1.onErrorResumeNext.apply(void 0, __spreadArray([source], __read(nextSources)));
      };
    }
    exports2.onErrorResumeNextWith = onErrorResumeNextWith;
    exports2.onErrorResumeNext = onErrorResumeNextWith;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/pairwise.js
var require_pairwise = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/pairwise.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.pairwise = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function pairwise() {
      return lift_1.operate(function(source, subscriber) {
        var prev;
        var hasPrev = false;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var p = prev;
          prev = value;
          hasPrev && subscriber.next([p, value]);
          hasPrev = true;
        }));
      });
    }
    exports2.pairwise = pairwise;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/pluck.js
var require_pluck = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/pluck.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.pluck = void 0;
    var map_1 = require_map();
    function pluck() {
      var properties = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i] = arguments[_i];
      }
      var length = properties.length;
      if (length === 0) {
        throw new Error("list of properties cannot be empty.");
      }
      return map_1.map(function(x) {
        var currentProp = x;
        for (var i = 0; i < length; i++) {
          var p = currentProp === null || currentProp === void 0 ? void 0 : currentProp[properties[i]];
          if (typeof p !== "undefined") {
            currentProp = p;
          } else {
            return void 0;
          }
        }
        return currentProp;
      });
    }
    exports2.pluck = pluck;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/publish.js
var require_publish = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/publish.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.publish = void 0;
    var Subject_1 = require_Subject();
    var multicast_1 = require_multicast();
    var connect_1 = require_connect();
    function publish(selector) {
      return selector ? function(source) {
        return connect_1.connect(selector)(source);
      } : function(source) {
        return multicast_1.multicast(new Subject_1.Subject())(source);
      };
    }
    exports2.publish = publish;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/publishBehavior.js
var require_publishBehavior = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/publishBehavior.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.publishBehavior = void 0;
    var BehaviorSubject_1 = require_BehaviorSubject();
    var ConnectableObservable_1 = require_ConnectableObservable();
    function publishBehavior(initialValue) {
      return function(source) {
        var subject = new BehaviorSubject_1.BehaviorSubject(initialValue);
        return new ConnectableObservable_1.ConnectableObservable(source, function() {
          return subject;
        });
      };
    }
    exports2.publishBehavior = publishBehavior;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/publishLast.js
var require_publishLast = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/publishLast.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.publishLast = void 0;
    var AsyncSubject_1 = require_AsyncSubject();
    var ConnectableObservable_1 = require_ConnectableObservable();
    function publishLast() {
      return function(source) {
        var subject = new AsyncSubject_1.AsyncSubject();
        return new ConnectableObservable_1.ConnectableObservable(source, function() {
          return subject;
        });
      };
    }
    exports2.publishLast = publishLast;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/publishReplay.js
var require_publishReplay = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/publishReplay.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.publishReplay = void 0;
    var ReplaySubject_1 = require_ReplaySubject();
    var multicast_1 = require_multicast();
    var isFunction_1 = require_isFunction();
    function publishReplay(bufferSize, windowTime, selectorOrScheduler, timestampProvider) {
      if (selectorOrScheduler && !isFunction_1.isFunction(selectorOrScheduler)) {
        timestampProvider = selectorOrScheduler;
      }
      var selector = isFunction_1.isFunction(selectorOrScheduler) ? selectorOrScheduler : void 0;
      return function(source) {
        return multicast_1.multicast(new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, timestampProvider), selector)(source);
      };
    }
    exports2.publishReplay = publishReplay;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/raceWith.js
var require_raceWith = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/raceWith.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.raceWith = void 0;
    var race_1 = require_race();
    var lift_1 = require_lift();
    var identity_1 = require_identity();
    function raceWith() {
      var otherSources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
      }
      return !otherSources.length ? identity_1.identity : lift_1.operate(function(source, subscriber) {
        race_1.raceInit(__spreadArray([source], __read(otherSources)))(subscriber);
      });
    }
    exports2.raceWith = raceWith;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/repeat.js
var require_repeat = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/repeat.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.repeat = void 0;
    var empty_1 = require_empty();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    var timer_1 = require_timer();
    function repeat(countOrConfig) {
      var _a;
      var count = Infinity;
      var delay;
      if (countOrConfig != null) {
        if (typeof countOrConfig === "object") {
          _a = countOrConfig.count, count = _a === void 0 ? Infinity : _a, delay = countOrConfig.delay;
        } else {
          count = countOrConfig;
        }
      }
      return count <= 0 ? function() {
        return empty_1.EMPTY;
      } : lift_1.operate(function(source, subscriber) {
        var soFar = 0;
        var sourceSub;
        var resubscribe = function() {
          sourceSub === null || sourceSub === void 0 ? void 0 : sourceSub.unsubscribe();
          sourceSub = null;
          if (delay != null) {
            var notifier = typeof delay === "number" ? timer_1.timer(delay) : innerFrom_1.innerFrom(delay(soFar));
            var notifierSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
              notifierSubscriber_1.unsubscribe();
              subscribeToSource();
            });
            notifier.subscribe(notifierSubscriber_1);
          } else {
            subscribeToSource();
          }
        };
        var subscribeToSource = function() {
          var syncUnsub = false;
          sourceSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, function() {
            if (++soFar < count) {
              if (sourceSub) {
                resubscribe();
              } else {
                syncUnsub = true;
              }
            } else {
              subscriber.complete();
            }
          }));
          if (syncUnsub) {
            resubscribe();
          }
        };
        subscribeToSource();
      });
    }
    exports2.repeat = repeat;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/repeatWhen.js
var require_repeatWhen = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/repeatWhen.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.repeatWhen = void 0;
    var innerFrom_1 = require_innerFrom();
    var Subject_1 = require_Subject();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function repeatWhen(notifier) {
      return lift_1.operate(function(source, subscriber) {
        var innerSub;
        var syncResub = false;
        var completions$;
        var isNotifierComplete = false;
        var isMainComplete = false;
        var checkComplete = function() {
          return isMainComplete && isNotifierComplete && (subscriber.complete(), true);
        };
        var getCompletionSubject = function() {
          if (!completions$) {
            completions$ = new Subject_1.Subject();
            innerFrom_1.innerFrom(notifier(completions$)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
              if (innerSub) {
                subscribeForRepeatWhen();
              } else {
                syncResub = true;
              }
            }, function() {
              isNotifierComplete = true;
              checkComplete();
            }));
          }
          return completions$;
        };
        var subscribeForRepeatWhen = function() {
          isMainComplete = false;
          innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, function() {
            isMainComplete = true;
            !checkComplete() && getCompletionSubject().next();
          }));
          if (syncResub) {
            innerSub.unsubscribe();
            innerSub = null;
            syncResub = false;
            subscribeForRepeatWhen();
          }
        };
        subscribeForRepeatWhen();
      });
    }
    exports2.repeatWhen = repeatWhen;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/retry.js
var require_retry = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/retry.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.retry = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var identity_1 = require_identity();
    var timer_1 = require_timer();
    var innerFrom_1 = require_innerFrom();
    function retry(configOrCount) {
      if (configOrCount === void 0) {
        configOrCount = Infinity;
      }
      var config;
      if (configOrCount && typeof configOrCount === "object") {
        config = configOrCount;
      } else {
        config = {
          count: configOrCount
        };
      }
      var _a = config.count, count = _a === void 0 ? Infinity : _a, delay = config.delay, _b = config.resetOnSuccess, resetOnSuccess = _b === void 0 ? false : _b;
      return count <= 0 ? identity_1.identity : lift_1.operate(function(source, subscriber) {
        var soFar = 0;
        var innerSub;
        var subscribeForRetry = function() {
          var syncUnsub = false;
          innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            if (resetOnSuccess) {
              soFar = 0;
            }
            subscriber.next(value);
          }, void 0, function(err) {
            if (soFar++ < count) {
              var resub_1 = function() {
                if (innerSub) {
                  innerSub.unsubscribe();
                  innerSub = null;
                  subscribeForRetry();
                } else {
                  syncUnsub = true;
                }
              };
              if (delay != null) {
                var notifier = typeof delay === "number" ? timer_1.timer(delay) : innerFrom_1.innerFrom(delay(err, soFar));
                var notifierSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
                  notifierSubscriber_1.unsubscribe();
                  resub_1();
                }, function() {
                  subscriber.complete();
                });
                notifier.subscribe(notifierSubscriber_1);
              } else {
                resub_1();
              }
            } else {
              subscriber.error(err);
            }
          }));
          if (syncUnsub) {
            innerSub.unsubscribe();
            innerSub = null;
            subscribeForRetry();
          }
        };
        subscribeForRetry();
      });
    }
    exports2.retry = retry;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/retryWhen.js
var require_retryWhen = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/retryWhen.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.retryWhen = void 0;
    var innerFrom_1 = require_innerFrom();
    var Subject_1 = require_Subject();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function retryWhen(notifier) {
      return lift_1.operate(function(source, subscriber) {
        var innerSub;
        var syncResub = false;
        var errors$;
        var subscribeForRetryWhen = function() {
          innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
            if (!errors$) {
              errors$ = new Subject_1.Subject();
              innerFrom_1.innerFrom(notifier(errors$)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
                return innerSub ? subscribeForRetryWhen() : syncResub = true;
              }));
            }
            if (errors$) {
              errors$.next(err);
            }
          }));
          if (syncResub) {
            innerSub.unsubscribe();
            innerSub = null;
            syncResub = false;
            subscribeForRetryWhen();
          }
        };
        subscribeForRetryWhen();
      });
    }
    exports2.retryWhen = retryWhen;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/sample.js
var require_sample = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/sample.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.sample = void 0;
    var innerFrom_1 = require_innerFrom();
    var lift_1 = require_lift();
    var noop_1 = require_noop();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function sample(notifier) {
      return lift_1.operate(function(source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          hasValue = true;
          lastValue = value;
        }));
        innerFrom_1.innerFrom(notifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
          if (hasValue) {
            hasValue = false;
            var value = lastValue;
            lastValue = null;
            subscriber.next(value);
          }
        }, noop_1.noop));
      });
    }
    exports2.sample = sample;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/sampleTime.js
var require_sampleTime = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/sampleTime.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.sampleTime = void 0;
    var async_1 = require_async();
    var sample_1 = require_sample();
    var interval_1 = require_interval();
    function sampleTime(period, scheduler) {
      if (scheduler === void 0) {
        scheduler = async_1.asyncScheduler;
      }
      return sample_1.sample(interval_1.interval(period, scheduler));
    }
    exports2.sampleTime = sampleTime;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/scan.js
var require_scan = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/scan.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.scan = void 0;
    var lift_1 = require_lift();
    var scanInternals_1 = require_scanInternals();
    function scan(accumulator, seed) {
      return lift_1.operate(scanInternals_1.scanInternals(accumulator, seed, arguments.length >= 2, true));
    }
    exports2.scan = scan;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/sequenceEqual.js
var require_sequenceEqual = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/sequenceEqual.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.sequenceEqual = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    function sequenceEqual(compareTo, comparator) {
      if (comparator === void 0) {
        comparator = function(a, b) {
          return a === b;
        };
      }
      return lift_1.operate(function(source, subscriber) {
        var aState = createState();
        var bState = createState();
        var emit = function(isEqual) {
          subscriber.next(isEqual);
          subscriber.complete();
        };
        var createSubscriber = function(selfState, otherState) {
          var sequenceEqualSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(a) {
            var buffer = otherState.buffer, complete = otherState.complete;
            if (buffer.length === 0) {
              complete ? emit(false) : selfState.buffer.push(a);
            } else {
              !comparator(a, buffer.shift()) && emit(false);
            }
          }, function() {
            selfState.complete = true;
            var complete = otherState.complete, buffer = otherState.buffer;
            complete && emit(buffer.length === 0);
            sequenceEqualSubscriber === null || sequenceEqualSubscriber === void 0 ? void 0 : sequenceEqualSubscriber.unsubscribe();
          });
          return sequenceEqualSubscriber;
        };
        source.subscribe(createSubscriber(aState, bState));
        innerFrom_1.innerFrom(compareTo).subscribe(createSubscriber(bState, aState));
      });
    }
    exports2.sequenceEqual = sequenceEqual;
    function createState() {
      return {
        buffer: [],
        complete: false
      };
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/share.js
var require_share = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/share.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.share = void 0;
    var innerFrom_1 = require_innerFrom();
    var Subject_1 = require_Subject();
    var Subscriber_1 = require_Subscriber();
    var lift_1 = require_lift();
    function share(options) {
      if (options === void 0) {
        options = {};
      }
      var _a = options.connector, connector = _a === void 0 ? function() {
        return new Subject_1.Subject();
      } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
      return function(wrapperSource) {
        var connection;
        var resetConnection;
        var subject;
        var refCount = 0;
        var hasCompleted = false;
        var hasErrored = false;
        var cancelReset = function() {
          resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
          resetConnection = void 0;
        };
        var reset = function() {
          cancelReset();
          connection = subject = void 0;
          hasCompleted = hasErrored = false;
        };
        var resetAndUnsubscribe = function() {
          var conn = connection;
          reset();
          conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
        };
        return lift_1.operate(function(source, subscriber) {
          refCount++;
          if (!hasErrored && !hasCompleted) {
            cancelReset();
          }
          var dest = subject = subject !== null && subject !== void 0 ? subject : connector();
          subscriber.add(function() {
            refCount--;
            if (refCount === 0 && !hasErrored && !hasCompleted) {
              resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
            }
          });
          dest.subscribe(subscriber);
          if (!connection && refCount > 0) {
            connection = new Subscriber_1.SafeSubscriber({
              next: function(value) {
                return dest.next(value);
              },
              error: function(err) {
                hasErrored = true;
                cancelReset();
                resetConnection = handleReset(reset, resetOnError, err);
                dest.error(err);
              },
              complete: function() {
                hasCompleted = true;
                cancelReset();
                resetConnection = handleReset(reset, resetOnComplete);
                dest.complete();
              }
            });
            innerFrom_1.innerFrom(source).subscribe(connection);
          }
        })(wrapperSource);
      };
    }
    exports2.share = share;
    function handleReset(reset, on) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      if (on === true) {
        reset();
        return;
      }
      if (on === false) {
        return;
      }
      var onSubscriber = new Subscriber_1.SafeSubscriber({
        next: function() {
          onSubscriber.unsubscribe();
          reset();
        }
      });
      return innerFrom_1.innerFrom(on.apply(void 0, __spreadArray([], __read(args)))).subscribe(onSubscriber);
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/shareReplay.js
var require_shareReplay = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/shareReplay.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.shareReplay = void 0;
    var ReplaySubject_1 = require_ReplaySubject();
    var share_1 = require_share();
    function shareReplay(configOrBufferSize, windowTime, scheduler) {
      var _a, _b, _c;
      var bufferSize;
      var refCount = false;
      if (configOrBufferSize && typeof configOrBufferSize === "object") {
        _a = configOrBufferSize.bufferSize, bufferSize = _a === void 0 ? Infinity : _a, _b = configOrBufferSize.windowTime, windowTime = _b === void 0 ? Infinity : _b, _c = configOrBufferSize.refCount, refCount = _c === void 0 ? false : _c, scheduler = configOrBufferSize.scheduler;
      } else {
        bufferSize = configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity;
      }
      return share_1.share({
        connector: function() {
          return new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler);
        },
        resetOnError: true,
        resetOnComplete: false,
        resetOnRefCountZero: refCount
      });
    }
    exports2.shareReplay = shareReplay;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/single.js
var require_single = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/single.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.single = void 0;
    var EmptyError_1 = require_EmptyError();
    var SequenceError_1 = require_SequenceError();
    var NotFoundError_1 = require_NotFoundError();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function single(predicate) {
      return lift_1.operate(function(source, subscriber) {
        var hasValue = false;
        var singleValue;
        var seenValue = false;
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          seenValue = true;
          if (!predicate || predicate(value, index++, source)) {
            hasValue && subscriber.error(new SequenceError_1.SequenceError("Too many matching values"));
            hasValue = true;
            singleValue = value;
          }
        }, function() {
          if (hasValue) {
            subscriber.next(singleValue);
            subscriber.complete();
          } else {
            subscriber.error(seenValue ? new NotFoundError_1.NotFoundError("No matching values") : new EmptyError_1.EmptyError());
          }
        }));
      });
    }
    exports2.single = single;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/skip.js
var require_skip = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/skip.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.skip = void 0;
    var filter_1 = require_filter();
    function skip(count) {
      return filter_1.filter(function(_, index) {
        return count <= index;
      });
    }
    exports2.skip = skip;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/skipLast.js
var require_skipLast = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/skipLast.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.skipLast = void 0;
    var identity_1 = require_identity();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function skipLast(skipCount) {
      return skipCount <= 0 ? identity_1.identity : lift_1.operate(function(source, subscriber) {
        var ring = new Array(skipCount);
        var seen = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var valueIndex = seen++;
          if (valueIndex < skipCount) {
            ring[valueIndex] = value;
          } else {
            var index = valueIndex % skipCount;
            var oldValue = ring[index];
            ring[index] = value;
            subscriber.next(oldValue);
          }
        }));
        return function() {
          ring = null;
        };
      });
    }
    exports2.skipLast = skipLast;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/skipUntil.js
var require_skipUntil = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/skipUntil.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.skipUntil = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    var noop_1 = require_noop();
    function skipUntil(notifier) {
      return lift_1.operate(function(source, subscriber) {
        var taking = false;
        var skipSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
          skipSubscriber === null || skipSubscriber === void 0 ? void 0 : skipSubscriber.unsubscribe();
          taking = true;
        }, noop_1.noop);
        innerFrom_1.innerFrom(notifier).subscribe(skipSubscriber);
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          return taking && subscriber.next(value);
        }));
      });
    }
    exports2.skipUntil = skipUntil;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/skipWhile.js
var require_skipWhile = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/skipWhile.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.skipWhile = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function skipWhile(predicate) {
      return lift_1.operate(function(source, subscriber) {
        var taking = false;
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          return (taking || (taking = !predicate(value, index++))) && subscriber.next(value);
        }));
      });
    }
    exports2.skipWhile = skipWhile;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/startWith.js
var require_startWith = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/startWith.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.startWith = void 0;
    var concat_1 = require_concat();
    var args_1 = require_args();
    var lift_1 = require_lift();
    function startWith() {
      var values = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
      }
      var scheduler = args_1.popScheduler(values);
      return lift_1.operate(function(source, subscriber) {
        (scheduler ? concat_1.concat(values, source, scheduler) : concat_1.concat(values, source)).subscribe(subscriber);
      });
    }
    exports2.startWith = startWith;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/switchMap.js
var require_switchMap = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/switchMap.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.switchMap = void 0;
    var innerFrom_1 = require_innerFrom();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function switchMap(project, resultSelector) {
      return lift_1.operate(function(source, subscriber) {
        var innerSubscriber = null;
        var index = 0;
        var isComplete = false;
        var checkComplete = function() {
          return isComplete && !innerSubscriber && subscriber.complete();
        };
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
          var innerIndex = 0;
          var outerIndex = index++;
          innerFrom_1.innerFrom(project(value, outerIndex)).subscribe(innerSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(innerValue) {
            return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue);
          }, function() {
            innerSubscriber = null;
            checkComplete();
          }));
        }, function() {
          isComplete = true;
          checkComplete();
        }));
      });
    }
    exports2.switchMap = switchMap;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/switchAll.js
var require_switchAll = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/switchAll.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.switchAll = void 0;
    var switchMap_1 = require_switchMap();
    var identity_1 = require_identity();
    function switchAll() {
      return switchMap_1.switchMap(identity_1.identity);
    }
    exports2.switchAll = switchAll;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/switchMapTo.js
var require_switchMapTo = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/switchMapTo.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.switchMapTo = void 0;
    var switchMap_1 = require_switchMap();
    var isFunction_1 = require_isFunction();
    function switchMapTo(innerObservable, resultSelector) {
      return isFunction_1.isFunction(resultSelector) ? switchMap_1.switchMap(function() {
        return innerObservable;
      }, resultSelector) : switchMap_1.switchMap(function() {
        return innerObservable;
      });
    }
    exports2.switchMapTo = switchMapTo;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/switchScan.js
var require_switchScan = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/switchScan.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.switchScan = void 0;
    var switchMap_1 = require_switchMap();
    var lift_1 = require_lift();
    function switchScan(accumulator, seed) {
      return lift_1.operate(function(source, subscriber) {
        var state = seed;
        switchMap_1.switchMap(function(value, index) {
          return accumulator(state, value, index);
        }, function(_, innerValue) {
          return state = innerValue, innerValue;
        })(source).subscribe(subscriber);
        return function() {
          state = null;
        };
      });
    }
    exports2.switchScan = switchScan;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/takeUntil.js
var require_takeUntil = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/takeUntil.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.takeUntil = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    var noop_1 = require_noop();
    function takeUntil6(notifier) {
      return lift_1.operate(function(source, subscriber) {
        innerFrom_1.innerFrom(notifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
          return subscriber.complete();
        }, noop_1.noop));
        !subscriber.closed && source.subscribe(subscriber);
      });
    }
    exports2.takeUntil = takeUntil6;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/takeWhile.js
var require_takeWhile = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/takeWhile.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.takeWhile = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function takeWhile(predicate, inclusive) {
      if (inclusive === void 0) {
        inclusive = false;
      }
      return lift_1.operate(function(source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var result = predicate(value, index++);
          (result || inclusive) && subscriber.next(value);
          !result && subscriber.complete();
        }));
      });
    }
    exports2.takeWhile = takeWhile;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/tap.js
var require_tap = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/tap.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.tap = void 0;
    var isFunction_1 = require_isFunction();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var identity_1 = require_identity();
    function tap(observerOrNext, error, complete) {
      var tapObserver = isFunction_1.isFunction(observerOrNext) || error || complete ? { next: observerOrNext, error, complete } : observerOrNext;
      return tapObserver ? lift_1.operate(function(source, subscriber) {
        var _a;
        (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
        var isUnsub = true;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var _a2;
          (_a2 = tapObserver.next) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, value);
          subscriber.next(value);
        }, function() {
          var _a2;
          isUnsub = false;
          (_a2 = tapObserver.complete) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
          subscriber.complete();
        }, function(err) {
          var _a2;
          isUnsub = false;
          (_a2 = tapObserver.error) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, err);
          subscriber.error(err);
        }, function() {
          var _a2, _b;
          if (isUnsub) {
            (_a2 = tapObserver.unsubscribe) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
          }
          (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
        }));
      }) : identity_1.identity;
    }
    exports2.tap = tap;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/throttle.js
var require_throttle = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/throttle.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.throttle = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    function throttle(durationSelector, config) {
      return lift_1.operate(function(source, subscriber) {
        var _a = config !== null && config !== void 0 ? config : {}, _b = _a.leading, leading = _b === void 0 ? true : _b, _c = _a.trailing, trailing = _c === void 0 ? false : _c;
        var hasValue = false;
        var sendValue = null;
        var throttled = null;
        var isComplete = false;
        var endThrottling = function() {
          throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
          throttled = null;
          if (trailing) {
            send();
            isComplete && subscriber.complete();
          }
        };
        var cleanupThrottling = function() {
          throttled = null;
          isComplete && subscriber.complete();
        };
        var startThrottle = function(value) {
          return throttled = innerFrom_1.innerFrom(durationSelector(value)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, endThrottling, cleanupThrottling));
        };
        var send = function() {
          if (hasValue) {
            hasValue = false;
            var value = sendValue;
            sendValue = null;
            subscriber.next(value);
            !isComplete && startThrottle(value);
          }
        };
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          hasValue = true;
          sendValue = value;
          !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
        }, function() {
          isComplete = true;
          !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
        }));
      });
    }
    exports2.throttle = throttle;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/throttleTime.js
var require_throttleTime = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/throttleTime.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.throttleTime = void 0;
    var async_1 = require_async();
    var throttle_1 = require_throttle();
    var timer_1 = require_timer();
    function throttleTime(duration, scheduler, config) {
      if (scheduler === void 0) {
        scheduler = async_1.asyncScheduler;
      }
      var duration$ = timer_1.timer(duration, scheduler);
      return throttle_1.throttle(function() {
        return duration$;
      }, config);
    }
    exports2.throttleTime = throttleTime;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/timeInterval.js
var require_timeInterval = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/timeInterval.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TimeInterval = exports2.timeInterval = void 0;
    var async_1 = require_async();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function timeInterval(scheduler) {
      if (scheduler === void 0) {
        scheduler = async_1.asyncScheduler;
      }
      return lift_1.operate(function(source, subscriber) {
        var last = scheduler.now();
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var now = scheduler.now();
          var interval = now - last;
          last = now;
          subscriber.next(new TimeInterval(value, interval));
        }));
      });
    }
    exports2.timeInterval = timeInterval;
    var TimeInterval = /* @__PURE__ */ function() {
      function TimeInterval2(value, interval) {
        this.value = value;
        this.interval = interval;
      }
      return TimeInterval2;
    }();
    exports2.TimeInterval = TimeInterval;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/timeoutWith.js
var require_timeoutWith = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/timeoutWith.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.timeoutWith = void 0;
    var async_1 = require_async();
    var isDate_1 = require_isDate();
    var timeout_1 = require_timeout();
    function timeoutWith(due, withObservable, scheduler) {
      var first;
      var each;
      var _with;
      scheduler = scheduler !== null && scheduler !== void 0 ? scheduler : async_1.async;
      if (isDate_1.isValidDate(due)) {
        first = due;
      } else if (typeof due === "number") {
        each = due;
      }
      if (withObservable) {
        _with = function() {
          return withObservable;
        };
      } else {
        throw new TypeError("No observable provided to switch to");
      }
      if (first == null && each == null) {
        throw new TypeError("No timeout provided.");
      }
      return timeout_1.timeout({
        first,
        each,
        scheduler,
        with: _with
      });
    }
    exports2.timeoutWith = timeoutWith;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/timestamp.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.timestamp = void 0;
    var dateTimestampProvider_1 = require_dateTimestampProvider();
    var map_1 = require_map();
    function timestamp(timestampProvider) {
      if (timestampProvider === void 0) {
        timestampProvider = dateTimestampProvider_1.dateTimestampProvider;
      }
      return map_1.map(function(value) {
        return { value, timestamp: timestampProvider.now() };
      });
    }
    exports2.timestamp = timestamp;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/window.js
var require_window = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/window.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.window = void 0;
    var Subject_1 = require_Subject();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var noop_1 = require_noop();
    var innerFrom_1 = require_innerFrom();
    function window(windowBoundaries) {
      return lift_1.operate(function(source, subscriber) {
        var windowSubject = new Subject_1.Subject();
        subscriber.next(windowSubject.asObservable());
        var errorHandler = function(err) {
          windowSubject.error(err);
          subscriber.error(err);
        };
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          return windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.next(value);
        }, function() {
          windowSubject.complete();
          subscriber.complete();
        }, errorHandler));
        innerFrom_1.innerFrom(windowBoundaries).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
          windowSubject.complete();
          subscriber.next(windowSubject = new Subject_1.Subject());
        }, noop_1.noop, errorHandler));
        return function() {
          windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.unsubscribe();
          windowSubject = null;
        };
      });
    }
    exports2.window = window;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/windowCount.js
var require_windowCount = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/windowCount.js"(exports2) {
    "use strict";
    var __values = exports2 && exports2.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.windowCount = void 0;
    var Subject_1 = require_Subject();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function windowCount(windowSize, startWindowEvery) {
      if (startWindowEvery === void 0) {
        startWindowEvery = 0;
      }
      var startEvery = startWindowEvery > 0 ? startWindowEvery : windowSize;
      return lift_1.operate(function(source, subscriber) {
        var windows = [new Subject_1.Subject()];
        var starts = [];
        var count = 0;
        subscriber.next(windows[0].asObservable());
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var e_1, _a;
          try {
            for (var windows_1 = __values(windows), windows_1_1 = windows_1.next(); !windows_1_1.done; windows_1_1 = windows_1.next()) {
              var window_1 = windows_1_1.value;
              window_1.next(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (windows_1_1 && !windows_1_1.done && (_a = windows_1.return)) _a.call(windows_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
          var c = count - windowSize + 1;
          if (c >= 0 && c % startEvery === 0) {
            windows.shift().complete();
          }
          if (++count % startEvery === 0) {
            var window_2 = new Subject_1.Subject();
            windows.push(window_2);
            subscriber.next(window_2.asObservable());
          }
        }, function() {
          while (windows.length > 0) {
            windows.shift().complete();
          }
          subscriber.complete();
        }, function(err) {
          while (windows.length > 0) {
            windows.shift().error(err);
          }
          subscriber.error(err);
        }, function() {
          starts = null;
          windows = null;
        }));
      });
    }
    exports2.windowCount = windowCount;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/windowTime.js
var require_windowTime = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/windowTime.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.windowTime = void 0;
    var Subject_1 = require_Subject();
    var async_1 = require_async();
    var Subscription_1 = require_Subscription();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var arrRemove_1 = require_arrRemove();
    var args_1 = require_args();
    var executeSchedule_1 = require_executeSchedule();
    function windowTime(windowTimeSpan) {
      var _a, _b;
      var otherArgs = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        otherArgs[_i - 1] = arguments[_i];
      }
      var scheduler = (_a = args_1.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
      var windowCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
      var maxWindowSize = otherArgs[1] || Infinity;
      return lift_1.operate(function(source, subscriber) {
        var windowRecords = [];
        var restartOnClose = false;
        var closeWindow = function(record) {
          var window = record.window, subs = record.subs;
          window.complete();
          subs.unsubscribe();
          arrRemove_1.arrRemove(windowRecords, record);
          restartOnClose && startWindow();
        };
        var startWindow = function() {
          if (windowRecords) {
            var subs = new Subscription_1.Subscription();
            subscriber.add(subs);
            var window_1 = new Subject_1.Subject();
            var record_1 = {
              window: window_1,
              subs,
              seen: 0
            };
            windowRecords.push(record_1);
            subscriber.next(window_1.asObservable());
            executeSchedule_1.executeSchedule(subs, scheduler, function() {
              return closeWindow(record_1);
            }, windowTimeSpan);
          }
        };
        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
          executeSchedule_1.executeSchedule(subscriber, scheduler, startWindow, windowCreationInterval, true);
        } else {
          restartOnClose = true;
        }
        startWindow();
        var loop = function(cb) {
          return windowRecords.slice().forEach(cb);
        };
        var terminate = function(cb) {
          loop(function(_a2) {
            var window = _a2.window;
            return cb(window);
          });
          cb(subscriber);
          subscriber.unsubscribe();
        };
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          loop(function(record) {
            record.window.next(value);
            maxWindowSize <= ++record.seen && closeWindow(record);
          });
        }, function() {
          return terminate(function(consumer) {
            return consumer.complete();
          });
        }, function(err) {
          return terminate(function(consumer) {
            return consumer.error(err);
          });
        }));
        return function() {
          windowRecords = null;
        };
      });
    }
    exports2.windowTime = windowTime;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/windowToggle.js
var require_windowToggle = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/windowToggle.js"(exports2) {
    "use strict";
    var __values = exports2 && exports2.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.windowToggle = void 0;
    var Subject_1 = require_Subject();
    var Subscription_1 = require_Subscription();
    var lift_1 = require_lift();
    var innerFrom_1 = require_innerFrom();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var noop_1 = require_noop();
    var arrRemove_1 = require_arrRemove();
    function windowToggle(openings, closingSelector) {
      return lift_1.operate(function(source, subscriber) {
        var windows = [];
        var handleError = function(err) {
          while (0 < windows.length) {
            windows.shift().error(err);
          }
          subscriber.error(err);
        };
        innerFrom_1.innerFrom(openings).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(openValue) {
          var window = new Subject_1.Subject();
          windows.push(window);
          var closingSubscription = new Subscription_1.Subscription();
          var closeWindow = function() {
            arrRemove_1.arrRemove(windows, window);
            window.complete();
            closingSubscription.unsubscribe();
          };
          var closingNotifier;
          try {
            closingNotifier = innerFrom_1.innerFrom(closingSelector(openValue));
          } catch (err) {
            handleError(err);
            return;
          }
          subscriber.next(window.asObservable());
          closingSubscription.add(closingNotifier.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, closeWindow, noop_1.noop, handleError)));
        }, noop_1.noop));
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var e_1, _a;
          var windowsCopy = windows.slice();
          try {
            for (var windowsCopy_1 = __values(windowsCopy), windowsCopy_1_1 = windowsCopy_1.next(); !windowsCopy_1_1.done; windowsCopy_1_1 = windowsCopy_1.next()) {
              var window_1 = windowsCopy_1_1.value;
              window_1.next(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (windowsCopy_1_1 && !windowsCopy_1_1.done && (_a = windowsCopy_1.return)) _a.call(windowsCopy_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }, function() {
          while (0 < windows.length) {
            windows.shift().complete();
          }
          subscriber.complete();
        }, handleError, function() {
          while (0 < windows.length) {
            windows.shift().unsubscribe();
          }
        }));
      });
    }
    exports2.windowToggle = windowToggle;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/windowWhen.js
var require_windowWhen = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/windowWhen.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.windowWhen = void 0;
    var Subject_1 = require_Subject();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    function windowWhen(closingSelector) {
      return lift_1.operate(function(source, subscriber) {
        var window;
        var closingSubscriber;
        var handleError = function(err) {
          window.error(err);
          subscriber.error(err);
        };
        var openWindow = function() {
          closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
          window === null || window === void 0 ? void 0 : window.complete();
          window = new Subject_1.Subject();
          subscriber.next(window.asObservable());
          var closingNotifier;
          try {
            closingNotifier = innerFrom_1.innerFrom(closingSelector());
          } catch (err) {
            handleError(err);
            return;
          }
          closingNotifier.subscribe(closingSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, openWindow, openWindow, handleError));
        };
        openWindow();
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          return window.next(value);
        }, function() {
          window.complete();
          subscriber.complete();
        }, handleError, function() {
          closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
          window = null;
        }));
      });
    }
    exports2.windowWhen = windowWhen;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/withLatestFrom.js
var require_withLatestFrom = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/withLatestFrom.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.withLatestFrom = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    var identity_1 = require_identity();
    var noop_1 = require_noop();
    var args_1 = require_args();
    function withLatestFrom() {
      var inputs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
      }
      var project = args_1.popResultSelector(inputs);
      return lift_1.operate(function(source, subscriber) {
        var len = inputs.length;
        var otherValues = new Array(len);
        var hasValue = inputs.map(function() {
          return false;
        });
        var ready = false;
        var _loop_1 = function(i2) {
          innerFrom_1.innerFrom(inputs[i2]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            otherValues[i2] = value;
            if (!ready && !hasValue[i2]) {
              hasValue[i2] = true;
              (ready = hasValue.every(identity_1.identity)) && (hasValue = null);
            }
          }, noop_1.noop));
        };
        for (var i = 0; i < len; i++) {
          _loop_1(i);
        }
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          if (ready) {
            var values = __spreadArray([value], __read(otherValues));
            subscriber.next(project ? project.apply(void 0, __spreadArray([], __read(values))) : values);
          }
        }));
      });
    }
    exports2.withLatestFrom = withLatestFrom;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/zipAll.js
var require_zipAll = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/zipAll.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.zipAll = void 0;
    var zip_1 = require_zip();
    var joinAllInternals_1 = require_joinAllInternals();
    function zipAll(project) {
      return joinAllInternals_1.joinAllInternals(zip_1.zip, project);
    }
    exports2.zipAll = zipAll;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/zip.js
var require_zip2 = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/zip.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.zip = void 0;
    var zip_1 = require_zip();
    var lift_1 = require_lift();
    function zip() {
      var sources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
      }
      return lift_1.operate(function(source, subscriber) {
        zip_1.zip.apply(void 0, __spreadArray([source], __read(sources))).subscribe(subscriber);
      });
    }
    exports2.zip = zip;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/zipWith.js
var require_zipWith = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/zipWith.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.zipWith = void 0;
    var zip_1 = require_zip2();
    function zipWith() {
      var otherInputs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        otherInputs[_i] = arguments[_i];
      }
      return zip_1.zip.apply(void 0, __spreadArray([], __read(otherInputs)));
    }
    exports2.zipWith = zipWith;
  }
});

// node_modules/rxjs/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/rxjs/dist/cjs/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.interval = exports2.iif = exports2.generate = exports2.fromEventPattern = exports2.fromEvent = exports2.from = exports2.forkJoin = exports2.empty = exports2.defer = exports2.connectable = exports2.concat = exports2.combineLatest = exports2.bindNodeCallback = exports2.bindCallback = exports2.UnsubscriptionError = exports2.TimeoutError = exports2.SequenceError = exports2.ObjectUnsubscribedError = exports2.NotFoundError = exports2.EmptyError = exports2.ArgumentOutOfRangeError = exports2.firstValueFrom = exports2.lastValueFrom = exports2.isObservable = exports2.identity = exports2.noop = exports2.pipe = exports2.NotificationKind = exports2.Notification = exports2.Subscriber = exports2.Subscription = exports2.Scheduler = exports2.VirtualAction = exports2.VirtualTimeScheduler = exports2.animationFrameScheduler = exports2.animationFrame = exports2.queueScheduler = exports2.queue = exports2.asyncScheduler = exports2.async = exports2.asapScheduler = exports2.asap = exports2.AsyncSubject = exports2.ReplaySubject = exports2.BehaviorSubject = exports2.Subject = exports2.animationFrames = exports2.observable = exports2.ConnectableObservable = exports2.Observable = void 0;
    exports2.filter = exports2.expand = exports2.exhaustMap = exports2.exhaustAll = exports2.exhaust = exports2.every = exports2.endWith = exports2.elementAt = exports2.distinctUntilKeyChanged = exports2.distinctUntilChanged = exports2.distinct = exports2.dematerialize = exports2.delayWhen = exports2.delay = exports2.defaultIfEmpty = exports2.debounceTime = exports2.debounce = exports2.count = exports2.connect = exports2.concatWith = exports2.concatMapTo = exports2.concatMap = exports2.concatAll = exports2.combineLatestWith = exports2.combineLatestAll = exports2.combineAll = exports2.catchError = exports2.bufferWhen = exports2.bufferToggle = exports2.bufferTime = exports2.bufferCount = exports2.buffer = exports2.auditTime = exports2.audit = exports2.config = exports2.NEVER = exports2.EMPTY = exports2.scheduled = exports2.zip = exports2.using = exports2.timer = exports2.throwError = exports2.range = exports2.race = exports2.partition = exports2.pairs = exports2.onErrorResumeNext = exports2.of = exports2.never = exports2.merge = void 0;
    exports2.switchMap = exports2.switchAll = exports2.subscribeOn = exports2.startWith = exports2.skipWhile = exports2.skipUntil = exports2.skipLast = exports2.skip = exports2.single = exports2.shareReplay = exports2.share = exports2.sequenceEqual = exports2.scan = exports2.sampleTime = exports2.sample = exports2.refCount = exports2.retryWhen = exports2.retry = exports2.repeatWhen = exports2.repeat = exports2.reduce = exports2.raceWith = exports2.publishReplay = exports2.publishLast = exports2.publishBehavior = exports2.publish = exports2.pluck = exports2.pairwise = exports2.onErrorResumeNextWith = exports2.observeOn = exports2.multicast = exports2.min = exports2.mergeWith = exports2.mergeScan = exports2.mergeMapTo = exports2.mergeMap = exports2.flatMap = exports2.mergeAll = exports2.max = exports2.materialize = exports2.mapTo = exports2.map = exports2.last = exports2.isEmpty = exports2.ignoreElements = exports2.groupBy = exports2.first = exports2.findIndex = exports2.find = exports2.finalize = void 0;
    exports2.zipWith = exports2.zipAll = exports2.withLatestFrom = exports2.windowWhen = exports2.windowToggle = exports2.windowTime = exports2.windowCount = exports2.window = exports2.toArray = exports2.timestamp = exports2.timeoutWith = exports2.timeout = exports2.timeInterval = exports2.throwIfEmpty = exports2.throttleTime = exports2.throttle = exports2.tap = exports2.takeWhile = exports2.takeUntil = exports2.takeLast = exports2.take = exports2.switchScan = exports2.switchMapTo = void 0;
    var Observable_1 = require_Observable();
    Object.defineProperty(exports2, "Observable", { enumerable: true, get: function() {
      return Observable_1.Observable;
    } });
    var ConnectableObservable_1 = require_ConnectableObservable();
    Object.defineProperty(exports2, "ConnectableObservable", { enumerable: true, get: function() {
      return ConnectableObservable_1.ConnectableObservable;
    } });
    var observable_1 = require_observable();
    Object.defineProperty(exports2, "observable", { enumerable: true, get: function() {
      return observable_1.observable;
    } });
    var animationFrames_1 = require_animationFrames();
    Object.defineProperty(exports2, "animationFrames", { enumerable: true, get: function() {
      return animationFrames_1.animationFrames;
    } });
    var Subject_1 = require_Subject();
    Object.defineProperty(exports2, "Subject", { enumerable: true, get: function() {
      return Subject_1.Subject;
    } });
    var BehaviorSubject_1 = require_BehaviorSubject();
    Object.defineProperty(exports2, "BehaviorSubject", { enumerable: true, get: function() {
      return BehaviorSubject_1.BehaviorSubject;
    } });
    var ReplaySubject_1 = require_ReplaySubject();
    Object.defineProperty(exports2, "ReplaySubject", { enumerable: true, get: function() {
      return ReplaySubject_1.ReplaySubject;
    } });
    var AsyncSubject_1 = require_AsyncSubject();
    Object.defineProperty(exports2, "AsyncSubject", { enumerable: true, get: function() {
      return AsyncSubject_1.AsyncSubject;
    } });
    var asap_1 = require_asap();
    Object.defineProperty(exports2, "asap", { enumerable: true, get: function() {
      return asap_1.asap;
    } });
    Object.defineProperty(exports2, "asapScheduler", { enumerable: true, get: function() {
      return asap_1.asapScheduler;
    } });
    var async_1 = require_async();
    Object.defineProperty(exports2, "async", { enumerable: true, get: function() {
      return async_1.async;
    } });
    Object.defineProperty(exports2, "asyncScheduler", { enumerable: true, get: function() {
      return async_1.asyncScheduler;
    } });
    var queue_1 = require_queue();
    Object.defineProperty(exports2, "queue", { enumerable: true, get: function() {
      return queue_1.queue;
    } });
    Object.defineProperty(exports2, "queueScheduler", { enumerable: true, get: function() {
      return queue_1.queueScheduler;
    } });
    var animationFrame_1 = require_animationFrame();
    Object.defineProperty(exports2, "animationFrame", { enumerable: true, get: function() {
      return animationFrame_1.animationFrame;
    } });
    Object.defineProperty(exports2, "animationFrameScheduler", { enumerable: true, get: function() {
      return animationFrame_1.animationFrameScheduler;
    } });
    var VirtualTimeScheduler_1 = require_VirtualTimeScheduler();
    Object.defineProperty(exports2, "VirtualTimeScheduler", { enumerable: true, get: function() {
      return VirtualTimeScheduler_1.VirtualTimeScheduler;
    } });
    Object.defineProperty(exports2, "VirtualAction", { enumerable: true, get: function() {
      return VirtualTimeScheduler_1.VirtualAction;
    } });
    var Scheduler_1 = require_Scheduler();
    Object.defineProperty(exports2, "Scheduler", { enumerable: true, get: function() {
      return Scheduler_1.Scheduler;
    } });
    var Subscription_1 = require_Subscription();
    Object.defineProperty(exports2, "Subscription", { enumerable: true, get: function() {
      return Subscription_1.Subscription;
    } });
    var Subscriber_1 = require_Subscriber();
    Object.defineProperty(exports2, "Subscriber", { enumerable: true, get: function() {
      return Subscriber_1.Subscriber;
    } });
    var Notification_1 = require_Notification();
    Object.defineProperty(exports2, "Notification", { enumerable: true, get: function() {
      return Notification_1.Notification;
    } });
    Object.defineProperty(exports2, "NotificationKind", { enumerable: true, get: function() {
      return Notification_1.NotificationKind;
    } });
    var pipe_1 = require_pipe();
    Object.defineProperty(exports2, "pipe", { enumerable: true, get: function() {
      return pipe_1.pipe;
    } });
    var noop_1 = require_noop();
    Object.defineProperty(exports2, "noop", { enumerable: true, get: function() {
      return noop_1.noop;
    } });
    var identity_1 = require_identity();
    Object.defineProperty(exports2, "identity", { enumerable: true, get: function() {
      return identity_1.identity;
    } });
    var isObservable_1 = require_isObservable();
    Object.defineProperty(exports2, "isObservable", { enumerable: true, get: function() {
      return isObservable_1.isObservable;
    } });
    var lastValueFrom_1 = require_lastValueFrom();
    Object.defineProperty(exports2, "lastValueFrom", { enumerable: true, get: function() {
      return lastValueFrom_1.lastValueFrom;
    } });
    var firstValueFrom_1 = require_firstValueFrom();
    Object.defineProperty(exports2, "firstValueFrom", { enumerable: true, get: function() {
      return firstValueFrom_1.firstValueFrom;
    } });
    var ArgumentOutOfRangeError_1 = require_ArgumentOutOfRangeError();
    Object.defineProperty(exports2, "ArgumentOutOfRangeError", { enumerable: true, get: function() {
      return ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
    } });
    var EmptyError_1 = require_EmptyError();
    Object.defineProperty(exports2, "EmptyError", { enumerable: true, get: function() {
      return EmptyError_1.EmptyError;
    } });
    var NotFoundError_1 = require_NotFoundError();
    Object.defineProperty(exports2, "NotFoundError", { enumerable: true, get: function() {
      return NotFoundError_1.NotFoundError;
    } });
    var ObjectUnsubscribedError_1 = require_ObjectUnsubscribedError();
    Object.defineProperty(exports2, "ObjectUnsubscribedError", { enumerable: true, get: function() {
      return ObjectUnsubscribedError_1.ObjectUnsubscribedError;
    } });
    var SequenceError_1 = require_SequenceError();
    Object.defineProperty(exports2, "SequenceError", { enumerable: true, get: function() {
      return SequenceError_1.SequenceError;
    } });
    var timeout_1 = require_timeout();
    Object.defineProperty(exports2, "TimeoutError", { enumerable: true, get: function() {
      return timeout_1.TimeoutError;
    } });
    var UnsubscriptionError_1 = require_UnsubscriptionError();
    Object.defineProperty(exports2, "UnsubscriptionError", { enumerable: true, get: function() {
      return UnsubscriptionError_1.UnsubscriptionError;
    } });
    var bindCallback_1 = require_bindCallback();
    Object.defineProperty(exports2, "bindCallback", { enumerable: true, get: function() {
      return bindCallback_1.bindCallback;
    } });
    var bindNodeCallback_1 = require_bindNodeCallback();
    Object.defineProperty(exports2, "bindNodeCallback", { enumerable: true, get: function() {
      return bindNodeCallback_1.bindNodeCallback;
    } });
    var combineLatest_1 = require_combineLatest();
    Object.defineProperty(exports2, "combineLatest", { enumerable: true, get: function() {
      return combineLatest_1.combineLatest;
    } });
    var concat_1 = require_concat();
    Object.defineProperty(exports2, "concat", { enumerable: true, get: function() {
      return concat_1.concat;
    } });
    var connectable_1 = require_connectable();
    Object.defineProperty(exports2, "connectable", { enumerable: true, get: function() {
      return connectable_1.connectable;
    } });
    var defer_1 = require_defer();
    Object.defineProperty(exports2, "defer", { enumerable: true, get: function() {
      return defer_1.defer;
    } });
    var empty_1 = require_empty();
    Object.defineProperty(exports2, "empty", { enumerable: true, get: function() {
      return empty_1.empty;
    } });
    var forkJoin_1 = require_forkJoin();
    Object.defineProperty(exports2, "forkJoin", { enumerable: true, get: function() {
      return forkJoin_1.forkJoin;
    } });
    var from_1 = require_from();
    Object.defineProperty(exports2, "from", { enumerable: true, get: function() {
      return from_1.from;
    } });
    var fromEvent_1 = require_fromEvent();
    Object.defineProperty(exports2, "fromEvent", { enumerable: true, get: function() {
      return fromEvent_1.fromEvent;
    } });
    var fromEventPattern_1 = require_fromEventPattern();
    Object.defineProperty(exports2, "fromEventPattern", { enumerable: true, get: function() {
      return fromEventPattern_1.fromEventPattern;
    } });
    var generate_1 = require_generate();
    Object.defineProperty(exports2, "generate", { enumerable: true, get: function() {
      return generate_1.generate;
    } });
    var iif_1 = require_iif();
    Object.defineProperty(exports2, "iif", { enumerable: true, get: function() {
      return iif_1.iif;
    } });
    var interval_1 = require_interval();
    Object.defineProperty(exports2, "interval", { enumerable: true, get: function() {
      return interval_1.interval;
    } });
    var merge_1 = require_merge();
    Object.defineProperty(exports2, "merge", { enumerable: true, get: function() {
      return merge_1.merge;
    } });
    var never_1 = require_never();
    Object.defineProperty(exports2, "never", { enumerable: true, get: function() {
      return never_1.never;
    } });
    var of_1 = require_of();
    Object.defineProperty(exports2, "of", { enumerable: true, get: function() {
      return of_1.of;
    } });
    var onErrorResumeNext_1 = require_onErrorResumeNext();
    Object.defineProperty(exports2, "onErrorResumeNext", { enumerable: true, get: function() {
      return onErrorResumeNext_1.onErrorResumeNext;
    } });
    var pairs_1 = require_pairs();
    Object.defineProperty(exports2, "pairs", { enumerable: true, get: function() {
      return pairs_1.pairs;
    } });
    var partition_1 = require_partition();
    Object.defineProperty(exports2, "partition", { enumerable: true, get: function() {
      return partition_1.partition;
    } });
    var race_1 = require_race();
    Object.defineProperty(exports2, "race", { enumerable: true, get: function() {
      return race_1.race;
    } });
    var range_1 = require_range();
    Object.defineProperty(exports2, "range", { enumerable: true, get: function() {
      return range_1.range;
    } });
    var throwError_1 = require_throwError();
    Object.defineProperty(exports2, "throwError", { enumerable: true, get: function() {
      return throwError_1.throwError;
    } });
    var timer_1 = require_timer();
    Object.defineProperty(exports2, "timer", { enumerable: true, get: function() {
      return timer_1.timer;
    } });
    var using_1 = require_using();
    Object.defineProperty(exports2, "using", { enumerable: true, get: function() {
      return using_1.using;
    } });
    var zip_1 = require_zip();
    Object.defineProperty(exports2, "zip", { enumerable: true, get: function() {
      return zip_1.zip;
    } });
    var scheduled_1 = require_scheduled();
    Object.defineProperty(exports2, "scheduled", { enumerable: true, get: function() {
      return scheduled_1.scheduled;
    } });
    var empty_2 = require_empty();
    Object.defineProperty(exports2, "EMPTY", { enumerable: true, get: function() {
      return empty_2.EMPTY;
    } });
    var never_2 = require_never();
    Object.defineProperty(exports2, "NEVER", { enumerable: true, get: function() {
      return never_2.NEVER;
    } });
    __exportStar(require_types(), exports2);
    var config_1 = require_config();
    Object.defineProperty(exports2, "config", { enumerable: true, get: function() {
      return config_1.config;
    } });
    var audit_1 = require_audit();
    Object.defineProperty(exports2, "audit", { enumerable: true, get: function() {
      return audit_1.audit;
    } });
    var auditTime_1 = require_auditTime();
    Object.defineProperty(exports2, "auditTime", { enumerable: true, get: function() {
      return auditTime_1.auditTime;
    } });
    var buffer_1 = require_buffer();
    Object.defineProperty(exports2, "buffer", { enumerable: true, get: function() {
      return buffer_1.buffer;
    } });
    var bufferCount_1 = require_bufferCount();
    Object.defineProperty(exports2, "bufferCount", { enumerable: true, get: function() {
      return bufferCount_1.bufferCount;
    } });
    var bufferTime_1 = require_bufferTime();
    Object.defineProperty(exports2, "bufferTime", { enumerable: true, get: function() {
      return bufferTime_1.bufferTime;
    } });
    var bufferToggle_1 = require_bufferToggle();
    Object.defineProperty(exports2, "bufferToggle", { enumerable: true, get: function() {
      return bufferToggle_1.bufferToggle;
    } });
    var bufferWhen_1 = require_bufferWhen();
    Object.defineProperty(exports2, "bufferWhen", { enumerable: true, get: function() {
      return bufferWhen_1.bufferWhen;
    } });
    var catchError_1 = require_catchError();
    Object.defineProperty(exports2, "catchError", { enumerable: true, get: function() {
      return catchError_1.catchError;
    } });
    var combineAll_1 = require_combineAll();
    Object.defineProperty(exports2, "combineAll", { enumerable: true, get: function() {
      return combineAll_1.combineAll;
    } });
    var combineLatestAll_1 = require_combineLatestAll();
    Object.defineProperty(exports2, "combineLatestAll", { enumerable: true, get: function() {
      return combineLatestAll_1.combineLatestAll;
    } });
    var combineLatestWith_1 = require_combineLatestWith();
    Object.defineProperty(exports2, "combineLatestWith", { enumerable: true, get: function() {
      return combineLatestWith_1.combineLatestWith;
    } });
    var concatAll_1 = require_concatAll();
    Object.defineProperty(exports2, "concatAll", { enumerable: true, get: function() {
      return concatAll_1.concatAll;
    } });
    var concatMap_1 = require_concatMap();
    Object.defineProperty(exports2, "concatMap", { enumerable: true, get: function() {
      return concatMap_1.concatMap;
    } });
    var concatMapTo_1 = require_concatMapTo();
    Object.defineProperty(exports2, "concatMapTo", { enumerable: true, get: function() {
      return concatMapTo_1.concatMapTo;
    } });
    var concatWith_1 = require_concatWith();
    Object.defineProperty(exports2, "concatWith", { enumerable: true, get: function() {
      return concatWith_1.concatWith;
    } });
    var connect_1 = require_connect();
    Object.defineProperty(exports2, "connect", { enumerable: true, get: function() {
      return connect_1.connect;
    } });
    var count_1 = require_count();
    Object.defineProperty(exports2, "count", { enumerable: true, get: function() {
      return count_1.count;
    } });
    var debounce_1 = require_debounce();
    Object.defineProperty(exports2, "debounce", { enumerable: true, get: function() {
      return debounce_1.debounce;
    } });
    var debounceTime_1 = require_debounceTime();
    Object.defineProperty(exports2, "debounceTime", { enumerable: true, get: function() {
      return debounceTime_1.debounceTime;
    } });
    var defaultIfEmpty_1 = require_defaultIfEmpty();
    Object.defineProperty(exports2, "defaultIfEmpty", { enumerable: true, get: function() {
      return defaultIfEmpty_1.defaultIfEmpty;
    } });
    var delay_1 = require_delay();
    Object.defineProperty(exports2, "delay", { enumerable: true, get: function() {
      return delay_1.delay;
    } });
    var delayWhen_1 = require_delayWhen();
    Object.defineProperty(exports2, "delayWhen", { enumerable: true, get: function() {
      return delayWhen_1.delayWhen;
    } });
    var dematerialize_1 = require_dematerialize();
    Object.defineProperty(exports2, "dematerialize", { enumerable: true, get: function() {
      return dematerialize_1.dematerialize;
    } });
    var distinct_1 = require_distinct();
    Object.defineProperty(exports2, "distinct", { enumerable: true, get: function() {
      return distinct_1.distinct;
    } });
    var distinctUntilChanged_1 = require_distinctUntilChanged();
    Object.defineProperty(exports2, "distinctUntilChanged", { enumerable: true, get: function() {
      return distinctUntilChanged_1.distinctUntilChanged;
    } });
    var distinctUntilKeyChanged_1 = require_distinctUntilKeyChanged();
    Object.defineProperty(exports2, "distinctUntilKeyChanged", { enumerable: true, get: function() {
      return distinctUntilKeyChanged_1.distinctUntilKeyChanged;
    } });
    var elementAt_1 = require_elementAt();
    Object.defineProperty(exports2, "elementAt", { enumerable: true, get: function() {
      return elementAt_1.elementAt;
    } });
    var endWith_1 = require_endWith();
    Object.defineProperty(exports2, "endWith", { enumerable: true, get: function() {
      return endWith_1.endWith;
    } });
    var every_1 = require_every();
    Object.defineProperty(exports2, "every", { enumerable: true, get: function() {
      return every_1.every;
    } });
    var exhaust_1 = require_exhaust();
    Object.defineProperty(exports2, "exhaust", { enumerable: true, get: function() {
      return exhaust_1.exhaust;
    } });
    var exhaustAll_1 = require_exhaustAll();
    Object.defineProperty(exports2, "exhaustAll", { enumerable: true, get: function() {
      return exhaustAll_1.exhaustAll;
    } });
    var exhaustMap_1 = require_exhaustMap();
    Object.defineProperty(exports2, "exhaustMap", { enumerable: true, get: function() {
      return exhaustMap_1.exhaustMap;
    } });
    var expand_1 = require_expand();
    Object.defineProperty(exports2, "expand", { enumerable: true, get: function() {
      return expand_1.expand;
    } });
    var filter_1 = require_filter();
    Object.defineProperty(exports2, "filter", { enumerable: true, get: function() {
      return filter_1.filter;
    } });
    var finalize_1 = require_finalize();
    Object.defineProperty(exports2, "finalize", { enumerable: true, get: function() {
      return finalize_1.finalize;
    } });
    var find_1 = require_find();
    Object.defineProperty(exports2, "find", { enumerable: true, get: function() {
      return find_1.find;
    } });
    var findIndex_1 = require_findIndex();
    Object.defineProperty(exports2, "findIndex", { enumerable: true, get: function() {
      return findIndex_1.findIndex;
    } });
    var first_1 = require_first();
    Object.defineProperty(exports2, "first", { enumerable: true, get: function() {
      return first_1.first;
    } });
    var groupBy_1 = require_groupBy();
    Object.defineProperty(exports2, "groupBy", { enumerable: true, get: function() {
      return groupBy_1.groupBy;
    } });
    var ignoreElements_1 = require_ignoreElements();
    Object.defineProperty(exports2, "ignoreElements", { enumerable: true, get: function() {
      return ignoreElements_1.ignoreElements;
    } });
    var isEmpty_1 = require_isEmpty();
    Object.defineProperty(exports2, "isEmpty", { enumerable: true, get: function() {
      return isEmpty_1.isEmpty;
    } });
    var last_1 = require_last();
    Object.defineProperty(exports2, "last", { enumerable: true, get: function() {
      return last_1.last;
    } });
    var map_1 = require_map();
    Object.defineProperty(exports2, "map", { enumerable: true, get: function() {
      return map_1.map;
    } });
    var mapTo_1 = require_mapTo();
    Object.defineProperty(exports2, "mapTo", { enumerable: true, get: function() {
      return mapTo_1.mapTo;
    } });
    var materialize_1 = require_materialize();
    Object.defineProperty(exports2, "materialize", { enumerable: true, get: function() {
      return materialize_1.materialize;
    } });
    var max_1 = require_max();
    Object.defineProperty(exports2, "max", { enumerable: true, get: function() {
      return max_1.max;
    } });
    var mergeAll_1 = require_mergeAll();
    Object.defineProperty(exports2, "mergeAll", { enumerable: true, get: function() {
      return mergeAll_1.mergeAll;
    } });
    var flatMap_1 = require_flatMap();
    Object.defineProperty(exports2, "flatMap", { enumerable: true, get: function() {
      return flatMap_1.flatMap;
    } });
    var mergeMap_1 = require_mergeMap();
    Object.defineProperty(exports2, "mergeMap", { enumerable: true, get: function() {
      return mergeMap_1.mergeMap;
    } });
    var mergeMapTo_1 = require_mergeMapTo();
    Object.defineProperty(exports2, "mergeMapTo", { enumerable: true, get: function() {
      return mergeMapTo_1.mergeMapTo;
    } });
    var mergeScan_1 = require_mergeScan();
    Object.defineProperty(exports2, "mergeScan", { enumerable: true, get: function() {
      return mergeScan_1.mergeScan;
    } });
    var mergeWith_1 = require_mergeWith();
    Object.defineProperty(exports2, "mergeWith", { enumerable: true, get: function() {
      return mergeWith_1.mergeWith;
    } });
    var min_1 = require_min();
    Object.defineProperty(exports2, "min", { enumerable: true, get: function() {
      return min_1.min;
    } });
    var multicast_1 = require_multicast();
    Object.defineProperty(exports2, "multicast", { enumerable: true, get: function() {
      return multicast_1.multicast;
    } });
    var observeOn_1 = require_observeOn();
    Object.defineProperty(exports2, "observeOn", { enumerable: true, get: function() {
      return observeOn_1.observeOn;
    } });
    var onErrorResumeNextWith_1 = require_onErrorResumeNextWith();
    Object.defineProperty(exports2, "onErrorResumeNextWith", { enumerable: true, get: function() {
      return onErrorResumeNextWith_1.onErrorResumeNextWith;
    } });
    var pairwise_1 = require_pairwise();
    Object.defineProperty(exports2, "pairwise", { enumerable: true, get: function() {
      return pairwise_1.pairwise;
    } });
    var pluck_1 = require_pluck();
    Object.defineProperty(exports2, "pluck", { enumerable: true, get: function() {
      return pluck_1.pluck;
    } });
    var publish_1 = require_publish();
    Object.defineProperty(exports2, "publish", { enumerable: true, get: function() {
      return publish_1.publish;
    } });
    var publishBehavior_1 = require_publishBehavior();
    Object.defineProperty(exports2, "publishBehavior", { enumerable: true, get: function() {
      return publishBehavior_1.publishBehavior;
    } });
    var publishLast_1 = require_publishLast();
    Object.defineProperty(exports2, "publishLast", { enumerable: true, get: function() {
      return publishLast_1.publishLast;
    } });
    var publishReplay_1 = require_publishReplay();
    Object.defineProperty(exports2, "publishReplay", { enumerable: true, get: function() {
      return publishReplay_1.publishReplay;
    } });
    var raceWith_1 = require_raceWith();
    Object.defineProperty(exports2, "raceWith", { enumerable: true, get: function() {
      return raceWith_1.raceWith;
    } });
    var reduce_1 = require_reduce();
    Object.defineProperty(exports2, "reduce", { enumerable: true, get: function() {
      return reduce_1.reduce;
    } });
    var repeat_1 = require_repeat();
    Object.defineProperty(exports2, "repeat", { enumerable: true, get: function() {
      return repeat_1.repeat;
    } });
    var repeatWhen_1 = require_repeatWhen();
    Object.defineProperty(exports2, "repeatWhen", { enumerable: true, get: function() {
      return repeatWhen_1.repeatWhen;
    } });
    var retry_1 = require_retry();
    Object.defineProperty(exports2, "retry", { enumerable: true, get: function() {
      return retry_1.retry;
    } });
    var retryWhen_1 = require_retryWhen();
    Object.defineProperty(exports2, "retryWhen", { enumerable: true, get: function() {
      return retryWhen_1.retryWhen;
    } });
    var refCount_1 = require_refCount();
    Object.defineProperty(exports2, "refCount", { enumerable: true, get: function() {
      return refCount_1.refCount;
    } });
    var sample_1 = require_sample();
    Object.defineProperty(exports2, "sample", { enumerable: true, get: function() {
      return sample_1.sample;
    } });
    var sampleTime_1 = require_sampleTime();
    Object.defineProperty(exports2, "sampleTime", { enumerable: true, get: function() {
      return sampleTime_1.sampleTime;
    } });
    var scan_1 = require_scan();
    Object.defineProperty(exports2, "scan", { enumerable: true, get: function() {
      return scan_1.scan;
    } });
    var sequenceEqual_1 = require_sequenceEqual();
    Object.defineProperty(exports2, "sequenceEqual", { enumerable: true, get: function() {
      return sequenceEqual_1.sequenceEqual;
    } });
    var share_1 = require_share();
    Object.defineProperty(exports2, "share", { enumerable: true, get: function() {
      return share_1.share;
    } });
    var shareReplay_1 = require_shareReplay();
    Object.defineProperty(exports2, "shareReplay", { enumerable: true, get: function() {
      return shareReplay_1.shareReplay;
    } });
    var single_1 = require_single();
    Object.defineProperty(exports2, "single", { enumerable: true, get: function() {
      return single_1.single;
    } });
    var skip_1 = require_skip();
    Object.defineProperty(exports2, "skip", { enumerable: true, get: function() {
      return skip_1.skip;
    } });
    var skipLast_1 = require_skipLast();
    Object.defineProperty(exports2, "skipLast", { enumerable: true, get: function() {
      return skipLast_1.skipLast;
    } });
    var skipUntil_1 = require_skipUntil();
    Object.defineProperty(exports2, "skipUntil", { enumerable: true, get: function() {
      return skipUntil_1.skipUntil;
    } });
    var skipWhile_1 = require_skipWhile();
    Object.defineProperty(exports2, "skipWhile", { enumerable: true, get: function() {
      return skipWhile_1.skipWhile;
    } });
    var startWith_1 = require_startWith();
    Object.defineProperty(exports2, "startWith", { enumerable: true, get: function() {
      return startWith_1.startWith;
    } });
    var subscribeOn_1 = require_subscribeOn();
    Object.defineProperty(exports2, "subscribeOn", { enumerable: true, get: function() {
      return subscribeOn_1.subscribeOn;
    } });
    var switchAll_1 = require_switchAll();
    Object.defineProperty(exports2, "switchAll", { enumerable: true, get: function() {
      return switchAll_1.switchAll;
    } });
    var switchMap_1 = require_switchMap();
    Object.defineProperty(exports2, "switchMap", { enumerable: true, get: function() {
      return switchMap_1.switchMap;
    } });
    var switchMapTo_1 = require_switchMapTo();
    Object.defineProperty(exports2, "switchMapTo", { enumerable: true, get: function() {
      return switchMapTo_1.switchMapTo;
    } });
    var switchScan_1 = require_switchScan();
    Object.defineProperty(exports2, "switchScan", { enumerable: true, get: function() {
      return switchScan_1.switchScan;
    } });
    var take_1 = require_take();
    Object.defineProperty(exports2, "take", { enumerable: true, get: function() {
      return take_1.take;
    } });
    var takeLast_1 = require_takeLast();
    Object.defineProperty(exports2, "takeLast", { enumerable: true, get: function() {
      return takeLast_1.takeLast;
    } });
    var takeUntil_1 = require_takeUntil();
    Object.defineProperty(exports2, "takeUntil", { enumerable: true, get: function() {
      return takeUntil_1.takeUntil;
    } });
    var takeWhile_1 = require_takeWhile();
    Object.defineProperty(exports2, "takeWhile", { enumerable: true, get: function() {
      return takeWhile_1.takeWhile;
    } });
    var tap_1 = require_tap();
    Object.defineProperty(exports2, "tap", { enumerable: true, get: function() {
      return tap_1.tap;
    } });
    var throttle_1 = require_throttle();
    Object.defineProperty(exports2, "throttle", { enumerable: true, get: function() {
      return throttle_1.throttle;
    } });
    var throttleTime_1 = require_throttleTime();
    Object.defineProperty(exports2, "throttleTime", { enumerable: true, get: function() {
      return throttleTime_1.throttleTime;
    } });
    var throwIfEmpty_1 = require_throwIfEmpty();
    Object.defineProperty(exports2, "throwIfEmpty", { enumerable: true, get: function() {
      return throwIfEmpty_1.throwIfEmpty;
    } });
    var timeInterval_1 = require_timeInterval();
    Object.defineProperty(exports2, "timeInterval", { enumerable: true, get: function() {
      return timeInterval_1.timeInterval;
    } });
    var timeout_2 = require_timeout();
    Object.defineProperty(exports2, "timeout", { enumerable: true, get: function() {
      return timeout_2.timeout;
    } });
    var timeoutWith_1 = require_timeoutWith();
    Object.defineProperty(exports2, "timeoutWith", { enumerable: true, get: function() {
      return timeoutWith_1.timeoutWith;
    } });
    var timestamp_1 = require_timestamp();
    Object.defineProperty(exports2, "timestamp", { enumerable: true, get: function() {
      return timestamp_1.timestamp;
    } });
    var toArray_1 = require_toArray();
    Object.defineProperty(exports2, "toArray", { enumerable: true, get: function() {
      return toArray_1.toArray;
    } });
    var window_1 = require_window();
    Object.defineProperty(exports2, "window", { enumerable: true, get: function() {
      return window_1.window;
    } });
    var windowCount_1 = require_windowCount();
    Object.defineProperty(exports2, "windowCount", { enumerable: true, get: function() {
      return windowCount_1.windowCount;
    } });
    var windowTime_1 = require_windowTime();
    Object.defineProperty(exports2, "windowTime", { enumerable: true, get: function() {
      return windowTime_1.windowTime;
    } });
    var windowToggle_1 = require_windowToggle();
    Object.defineProperty(exports2, "windowToggle", { enumerable: true, get: function() {
      return windowToggle_1.windowToggle;
    } });
    var windowWhen_1 = require_windowWhen();
    Object.defineProperty(exports2, "windowWhen", { enumerable: true, get: function() {
      return windowWhen_1.windowWhen;
    } });
    var withLatestFrom_1 = require_withLatestFrom();
    Object.defineProperty(exports2, "withLatestFrom", { enumerable: true, get: function() {
      return withLatestFrom_1.withLatestFrom;
    } });
    var zipAll_1 = require_zipAll();
    Object.defineProperty(exports2, "zipAll", { enumerable: true, get: function() {
      return zipAll_1.zipAll;
    } });
    var zipWith_1 = require_zipWith();
    Object.defineProperty(exports2, "zipWith", { enumerable: true, get: function() {
      return zipWith_1.zipWith;
    } });
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/partition.js
var require_partition2 = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/partition.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.partition = void 0;
    var not_1 = require_not();
    var filter_1 = require_filter();
    function partition(predicate, thisArg) {
      return function(source) {
        return [filter_1.filter(predicate, thisArg)(source), filter_1.filter(not_1.not(predicate, thisArg))(source)];
      };
    }
    exports2.partition = partition;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/race.js
var require_race2 = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/race.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar2 = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar2.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar2;
    };
    var __spreadArray = exports2 && exports2.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.race = void 0;
    var argsOrArgArray_1 = require_argsOrArgArray();
    var raceWith_1 = require_raceWith();
    function race() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return raceWith_1.raceWith.apply(void 0, __spreadArray([], __read(argsOrArgArray_1.argsOrArgArray(args))));
    }
    exports2.race = race;
  }
});

// node_modules/rxjs/dist/cjs/operators/index.js
var require_operators = __commonJS({
  "node_modules/rxjs/dist/cjs/operators/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.mergeAll = exports2.merge = exports2.max = exports2.materialize = exports2.mapTo = exports2.map = exports2.last = exports2.isEmpty = exports2.ignoreElements = exports2.groupBy = exports2.first = exports2.findIndex = exports2.find = exports2.finalize = exports2.filter = exports2.expand = exports2.exhaustMap = exports2.exhaustAll = exports2.exhaust = exports2.every = exports2.endWith = exports2.elementAt = exports2.distinctUntilKeyChanged = exports2.distinctUntilChanged = exports2.distinct = exports2.dematerialize = exports2.delayWhen = exports2.delay = exports2.defaultIfEmpty = exports2.debounceTime = exports2.debounce = exports2.count = exports2.connect = exports2.concatWith = exports2.concatMapTo = exports2.concatMap = exports2.concatAll = exports2.concat = exports2.combineLatestWith = exports2.combineLatest = exports2.combineLatestAll = exports2.combineAll = exports2.catchError = exports2.bufferWhen = exports2.bufferToggle = exports2.bufferTime = exports2.bufferCount = exports2.buffer = exports2.auditTime = exports2.audit = void 0;
    exports2.timeInterval = exports2.throwIfEmpty = exports2.throttleTime = exports2.throttle = exports2.tap = exports2.takeWhile = exports2.takeUntil = exports2.takeLast = exports2.take = exports2.switchScan = exports2.switchMapTo = exports2.switchMap = exports2.switchAll = exports2.subscribeOn = exports2.startWith = exports2.skipWhile = exports2.skipUntil = exports2.skipLast = exports2.skip = exports2.single = exports2.shareReplay = exports2.share = exports2.sequenceEqual = exports2.scan = exports2.sampleTime = exports2.sample = exports2.refCount = exports2.retryWhen = exports2.retry = exports2.repeatWhen = exports2.repeat = exports2.reduce = exports2.raceWith = exports2.race = exports2.publishReplay = exports2.publishLast = exports2.publishBehavior = exports2.publish = exports2.pluck = exports2.partition = exports2.pairwise = exports2.onErrorResumeNext = exports2.observeOn = exports2.multicast = exports2.min = exports2.mergeWith = exports2.mergeScan = exports2.mergeMapTo = exports2.mergeMap = exports2.flatMap = void 0;
    exports2.zipWith = exports2.zipAll = exports2.zip = exports2.withLatestFrom = exports2.windowWhen = exports2.windowToggle = exports2.windowTime = exports2.windowCount = exports2.window = exports2.toArray = exports2.timestamp = exports2.timeoutWith = exports2.timeout = void 0;
    var audit_1 = require_audit();
    Object.defineProperty(exports2, "audit", { enumerable: true, get: function() {
      return audit_1.audit;
    } });
    var auditTime_1 = require_auditTime();
    Object.defineProperty(exports2, "auditTime", { enumerable: true, get: function() {
      return auditTime_1.auditTime;
    } });
    var buffer_1 = require_buffer();
    Object.defineProperty(exports2, "buffer", { enumerable: true, get: function() {
      return buffer_1.buffer;
    } });
    var bufferCount_1 = require_bufferCount();
    Object.defineProperty(exports2, "bufferCount", { enumerable: true, get: function() {
      return bufferCount_1.bufferCount;
    } });
    var bufferTime_1 = require_bufferTime();
    Object.defineProperty(exports2, "bufferTime", { enumerable: true, get: function() {
      return bufferTime_1.bufferTime;
    } });
    var bufferToggle_1 = require_bufferToggle();
    Object.defineProperty(exports2, "bufferToggle", { enumerable: true, get: function() {
      return bufferToggle_1.bufferToggle;
    } });
    var bufferWhen_1 = require_bufferWhen();
    Object.defineProperty(exports2, "bufferWhen", { enumerable: true, get: function() {
      return bufferWhen_1.bufferWhen;
    } });
    var catchError_1 = require_catchError();
    Object.defineProperty(exports2, "catchError", { enumerable: true, get: function() {
      return catchError_1.catchError;
    } });
    var combineAll_1 = require_combineAll();
    Object.defineProperty(exports2, "combineAll", { enumerable: true, get: function() {
      return combineAll_1.combineAll;
    } });
    var combineLatestAll_1 = require_combineLatestAll();
    Object.defineProperty(exports2, "combineLatestAll", { enumerable: true, get: function() {
      return combineLatestAll_1.combineLatestAll;
    } });
    var combineLatest_1 = require_combineLatest2();
    Object.defineProperty(exports2, "combineLatest", { enumerable: true, get: function() {
      return combineLatest_1.combineLatest;
    } });
    var combineLatestWith_1 = require_combineLatestWith();
    Object.defineProperty(exports2, "combineLatestWith", { enumerable: true, get: function() {
      return combineLatestWith_1.combineLatestWith;
    } });
    var concat_1 = require_concat2();
    Object.defineProperty(exports2, "concat", { enumerable: true, get: function() {
      return concat_1.concat;
    } });
    var concatAll_1 = require_concatAll();
    Object.defineProperty(exports2, "concatAll", { enumerable: true, get: function() {
      return concatAll_1.concatAll;
    } });
    var concatMap_1 = require_concatMap();
    Object.defineProperty(exports2, "concatMap", { enumerable: true, get: function() {
      return concatMap_1.concatMap;
    } });
    var concatMapTo_1 = require_concatMapTo();
    Object.defineProperty(exports2, "concatMapTo", { enumerable: true, get: function() {
      return concatMapTo_1.concatMapTo;
    } });
    var concatWith_1 = require_concatWith();
    Object.defineProperty(exports2, "concatWith", { enumerable: true, get: function() {
      return concatWith_1.concatWith;
    } });
    var connect_1 = require_connect();
    Object.defineProperty(exports2, "connect", { enumerable: true, get: function() {
      return connect_1.connect;
    } });
    var count_1 = require_count();
    Object.defineProperty(exports2, "count", { enumerable: true, get: function() {
      return count_1.count;
    } });
    var debounce_1 = require_debounce();
    Object.defineProperty(exports2, "debounce", { enumerable: true, get: function() {
      return debounce_1.debounce;
    } });
    var debounceTime_1 = require_debounceTime();
    Object.defineProperty(exports2, "debounceTime", { enumerable: true, get: function() {
      return debounceTime_1.debounceTime;
    } });
    var defaultIfEmpty_1 = require_defaultIfEmpty();
    Object.defineProperty(exports2, "defaultIfEmpty", { enumerable: true, get: function() {
      return defaultIfEmpty_1.defaultIfEmpty;
    } });
    var delay_1 = require_delay();
    Object.defineProperty(exports2, "delay", { enumerable: true, get: function() {
      return delay_1.delay;
    } });
    var delayWhen_1 = require_delayWhen();
    Object.defineProperty(exports2, "delayWhen", { enumerable: true, get: function() {
      return delayWhen_1.delayWhen;
    } });
    var dematerialize_1 = require_dematerialize();
    Object.defineProperty(exports2, "dematerialize", { enumerable: true, get: function() {
      return dematerialize_1.dematerialize;
    } });
    var distinct_1 = require_distinct();
    Object.defineProperty(exports2, "distinct", { enumerable: true, get: function() {
      return distinct_1.distinct;
    } });
    var distinctUntilChanged_1 = require_distinctUntilChanged();
    Object.defineProperty(exports2, "distinctUntilChanged", { enumerable: true, get: function() {
      return distinctUntilChanged_1.distinctUntilChanged;
    } });
    var distinctUntilKeyChanged_1 = require_distinctUntilKeyChanged();
    Object.defineProperty(exports2, "distinctUntilKeyChanged", { enumerable: true, get: function() {
      return distinctUntilKeyChanged_1.distinctUntilKeyChanged;
    } });
    var elementAt_1 = require_elementAt();
    Object.defineProperty(exports2, "elementAt", { enumerable: true, get: function() {
      return elementAt_1.elementAt;
    } });
    var endWith_1 = require_endWith();
    Object.defineProperty(exports2, "endWith", { enumerable: true, get: function() {
      return endWith_1.endWith;
    } });
    var every_1 = require_every();
    Object.defineProperty(exports2, "every", { enumerable: true, get: function() {
      return every_1.every;
    } });
    var exhaust_1 = require_exhaust();
    Object.defineProperty(exports2, "exhaust", { enumerable: true, get: function() {
      return exhaust_1.exhaust;
    } });
    var exhaustAll_1 = require_exhaustAll();
    Object.defineProperty(exports2, "exhaustAll", { enumerable: true, get: function() {
      return exhaustAll_1.exhaustAll;
    } });
    var exhaustMap_1 = require_exhaustMap();
    Object.defineProperty(exports2, "exhaustMap", { enumerable: true, get: function() {
      return exhaustMap_1.exhaustMap;
    } });
    var expand_1 = require_expand();
    Object.defineProperty(exports2, "expand", { enumerable: true, get: function() {
      return expand_1.expand;
    } });
    var filter_1 = require_filter();
    Object.defineProperty(exports2, "filter", { enumerable: true, get: function() {
      return filter_1.filter;
    } });
    var finalize_1 = require_finalize();
    Object.defineProperty(exports2, "finalize", { enumerable: true, get: function() {
      return finalize_1.finalize;
    } });
    var find_1 = require_find();
    Object.defineProperty(exports2, "find", { enumerable: true, get: function() {
      return find_1.find;
    } });
    var findIndex_1 = require_findIndex();
    Object.defineProperty(exports2, "findIndex", { enumerable: true, get: function() {
      return findIndex_1.findIndex;
    } });
    var first_1 = require_first();
    Object.defineProperty(exports2, "first", { enumerable: true, get: function() {
      return first_1.first;
    } });
    var groupBy_1 = require_groupBy();
    Object.defineProperty(exports2, "groupBy", { enumerable: true, get: function() {
      return groupBy_1.groupBy;
    } });
    var ignoreElements_1 = require_ignoreElements();
    Object.defineProperty(exports2, "ignoreElements", { enumerable: true, get: function() {
      return ignoreElements_1.ignoreElements;
    } });
    var isEmpty_1 = require_isEmpty();
    Object.defineProperty(exports2, "isEmpty", { enumerable: true, get: function() {
      return isEmpty_1.isEmpty;
    } });
    var last_1 = require_last();
    Object.defineProperty(exports2, "last", { enumerable: true, get: function() {
      return last_1.last;
    } });
    var map_1 = require_map();
    Object.defineProperty(exports2, "map", { enumerable: true, get: function() {
      return map_1.map;
    } });
    var mapTo_1 = require_mapTo();
    Object.defineProperty(exports2, "mapTo", { enumerable: true, get: function() {
      return mapTo_1.mapTo;
    } });
    var materialize_1 = require_materialize();
    Object.defineProperty(exports2, "materialize", { enumerable: true, get: function() {
      return materialize_1.materialize;
    } });
    var max_1 = require_max();
    Object.defineProperty(exports2, "max", { enumerable: true, get: function() {
      return max_1.max;
    } });
    var merge_1 = require_merge2();
    Object.defineProperty(exports2, "merge", { enumerable: true, get: function() {
      return merge_1.merge;
    } });
    var mergeAll_1 = require_mergeAll();
    Object.defineProperty(exports2, "mergeAll", { enumerable: true, get: function() {
      return mergeAll_1.mergeAll;
    } });
    var flatMap_1 = require_flatMap();
    Object.defineProperty(exports2, "flatMap", { enumerable: true, get: function() {
      return flatMap_1.flatMap;
    } });
    var mergeMap_1 = require_mergeMap();
    Object.defineProperty(exports2, "mergeMap", { enumerable: true, get: function() {
      return mergeMap_1.mergeMap;
    } });
    var mergeMapTo_1 = require_mergeMapTo();
    Object.defineProperty(exports2, "mergeMapTo", { enumerable: true, get: function() {
      return mergeMapTo_1.mergeMapTo;
    } });
    var mergeScan_1 = require_mergeScan();
    Object.defineProperty(exports2, "mergeScan", { enumerable: true, get: function() {
      return mergeScan_1.mergeScan;
    } });
    var mergeWith_1 = require_mergeWith();
    Object.defineProperty(exports2, "mergeWith", { enumerable: true, get: function() {
      return mergeWith_1.mergeWith;
    } });
    var min_1 = require_min();
    Object.defineProperty(exports2, "min", { enumerable: true, get: function() {
      return min_1.min;
    } });
    var multicast_1 = require_multicast();
    Object.defineProperty(exports2, "multicast", { enumerable: true, get: function() {
      return multicast_1.multicast;
    } });
    var observeOn_1 = require_observeOn();
    Object.defineProperty(exports2, "observeOn", { enumerable: true, get: function() {
      return observeOn_1.observeOn;
    } });
    var onErrorResumeNextWith_1 = require_onErrorResumeNextWith();
    Object.defineProperty(exports2, "onErrorResumeNext", { enumerable: true, get: function() {
      return onErrorResumeNextWith_1.onErrorResumeNext;
    } });
    var pairwise_1 = require_pairwise();
    Object.defineProperty(exports2, "pairwise", { enumerable: true, get: function() {
      return pairwise_1.pairwise;
    } });
    var partition_1 = require_partition2();
    Object.defineProperty(exports2, "partition", { enumerable: true, get: function() {
      return partition_1.partition;
    } });
    var pluck_1 = require_pluck();
    Object.defineProperty(exports2, "pluck", { enumerable: true, get: function() {
      return pluck_1.pluck;
    } });
    var publish_1 = require_publish();
    Object.defineProperty(exports2, "publish", { enumerable: true, get: function() {
      return publish_1.publish;
    } });
    var publishBehavior_1 = require_publishBehavior();
    Object.defineProperty(exports2, "publishBehavior", { enumerable: true, get: function() {
      return publishBehavior_1.publishBehavior;
    } });
    var publishLast_1 = require_publishLast();
    Object.defineProperty(exports2, "publishLast", { enumerable: true, get: function() {
      return publishLast_1.publishLast;
    } });
    var publishReplay_1 = require_publishReplay();
    Object.defineProperty(exports2, "publishReplay", { enumerable: true, get: function() {
      return publishReplay_1.publishReplay;
    } });
    var race_1 = require_race2();
    Object.defineProperty(exports2, "race", { enumerable: true, get: function() {
      return race_1.race;
    } });
    var raceWith_1 = require_raceWith();
    Object.defineProperty(exports2, "raceWith", { enumerable: true, get: function() {
      return raceWith_1.raceWith;
    } });
    var reduce_1 = require_reduce();
    Object.defineProperty(exports2, "reduce", { enumerable: true, get: function() {
      return reduce_1.reduce;
    } });
    var repeat_1 = require_repeat();
    Object.defineProperty(exports2, "repeat", { enumerable: true, get: function() {
      return repeat_1.repeat;
    } });
    var repeatWhen_1 = require_repeatWhen();
    Object.defineProperty(exports2, "repeatWhen", { enumerable: true, get: function() {
      return repeatWhen_1.repeatWhen;
    } });
    var retry_1 = require_retry();
    Object.defineProperty(exports2, "retry", { enumerable: true, get: function() {
      return retry_1.retry;
    } });
    var retryWhen_1 = require_retryWhen();
    Object.defineProperty(exports2, "retryWhen", { enumerable: true, get: function() {
      return retryWhen_1.retryWhen;
    } });
    var refCount_1 = require_refCount();
    Object.defineProperty(exports2, "refCount", { enumerable: true, get: function() {
      return refCount_1.refCount;
    } });
    var sample_1 = require_sample();
    Object.defineProperty(exports2, "sample", { enumerable: true, get: function() {
      return sample_1.sample;
    } });
    var sampleTime_1 = require_sampleTime();
    Object.defineProperty(exports2, "sampleTime", { enumerable: true, get: function() {
      return sampleTime_1.sampleTime;
    } });
    var scan_1 = require_scan();
    Object.defineProperty(exports2, "scan", { enumerable: true, get: function() {
      return scan_1.scan;
    } });
    var sequenceEqual_1 = require_sequenceEqual();
    Object.defineProperty(exports2, "sequenceEqual", { enumerable: true, get: function() {
      return sequenceEqual_1.sequenceEqual;
    } });
    var share_1 = require_share();
    Object.defineProperty(exports2, "share", { enumerable: true, get: function() {
      return share_1.share;
    } });
    var shareReplay_1 = require_shareReplay();
    Object.defineProperty(exports2, "shareReplay", { enumerable: true, get: function() {
      return shareReplay_1.shareReplay;
    } });
    var single_1 = require_single();
    Object.defineProperty(exports2, "single", { enumerable: true, get: function() {
      return single_1.single;
    } });
    var skip_1 = require_skip();
    Object.defineProperty(exports2, "skip", { enumerable: true, get: function() {
      return skip_1.skip;
    } });
    var skipLast_1 = require_skipLast();
    Object.defineProperty(exports2, "skipLast", { enumerable: true, get: function() {
      return skipLast_1.skipLast;
    } });
    var skipUntil_1 = require_skipUntil();
    Object.defineProperty(exports2, "skipUntil", { enumerable: true, get: function() {
      return skipUntil_1.skipUntil;
    } });
    var skipWhile_1 = require_skipWhile();
    Object.defineProperty(exports2, "skipWhile", { enumerable: true, get: function() {
      return skipWhile_1.skipWhile;
    } });
    var startWith_1 = require_startWith();
    Object.defineProperty(exports2, "startWith", { enumerable: true, get: function() {
      return startWith_1.startWith;
    } });
    var subscribeOn_1 = require_subscribeOn();
    Object.defineProperty(exports2, "subscribeOn", { enumerable: true, get: function() {
      return subscribeOn_1.subscribeOn;
    } });
    var switchAll_1 = require_switchAll();
    Object.defineProperty(exports2, "switchAll", { enumerable: true, get: function() {
      return switchAll_1.switchAll;
    } });
    var switchMap_1 = require_switchMap();
    Object.defineProperty(exports2, "switchMap", { enumerable: true, get: function() {
      return switchMap_1.switchMap;
    } });
    var switchMapTo_1 = require_switchMapTo();
    Object.defineProperty(exports2, "switchMapTo", { enumerable: true, get: function() {
      return switchMapTo_1.switchMapTo;
    } });
    var switchScan_1 = require_switchScan();
    Object.defineProperty(exports2, "switchScan", { enumerable: true, get: function() {
      return switchScan_1.switchScan;
    } });
    var take_1 = require_take();
    Object.defineProperty(exports2, "take", { enumerable: true, get: function() {
      return take_1.take;
    } });
    var takeLast_1 = require_takeLast();
    Object.defineProperty(exports2, "takeLast", { enumerable: true, get: function() {
      return takeLast_1.takeLast;
    } });
    var takeUntil_1 = require_takeUntil();
    Object.defineProperty(exports2, "takeUntil", { enumerable: true, get: function() {
      return takeUntil_1.takeUntil;
    } });
    var takeWhile_1 = require_takeWhile();
    Object.defineProperty(exports2, "takeWhile", { enumerable: true, get: function() {
      return takeWhile_1.takeWhile;
    } });
    var tap_1 = require_tap();
    Object.defineProperty(exports2, "tap", { enumerable: true, get: function() {
      return tap_1.tap;
    } });
    var throttle_1 = require_throttle();
    Object.defineProperty(exports2, "throttle", { enumerable: true, get: function() {
      return throttle_1.throttle;
    } });
    var throttleTime_1 = require_throttleTime();
    Object.defineProperty(exports2, "throttleTime", { enumerable: true, get: function() {
      return throttleTime_1.throttleTime;
    } });
    var throwIfEmpty_1 = require_throwIfEmpty();
    Object.defineProperty(exports2, "throwIfEmpty", { enumerable: true, get: function() {
      return throwIfEmpty_1.throwIfEmpty;
    } });
    var timeInterval_1 = require_timeInterval();
    Object.defineProperty(exports2, "timeInterval", { enumerable: true, get: function() {
      return timeInterval_1.timeInterval;
    } });
    var timeout_1 = require_timeout();
    Object.defineProperty(exports2, "timeout", { enumerable: true, get: function() {
      return timeout_1.timeout;
    } });
    var timeoutWith_1 = require_timeoutWith();
    Object.defineProperty(exports2, "timeoutWith", { enumerable: true, get: function() {
      return timeoutWith_1.timeoutWith;
    } });
    var timestamp_1 = require_timestamp();
    Object.defineProperty(exports2, "timestamp", { enumerable: true, get: function() {
      return timestamp_1.timestamp;
    } });
    var toArray_1 = require_toArray();
    Object.defineProperty(exports2, "toArray", { enumerable: true, get: function() {
      return toArray_1.toArray;
    } });
    var window_1 = require_window();
    Object.defineProperty(exports2, "window", { enumerable: true, get: function() {
      return window_1.window;
    } });
    var windowCount_1 = require_windowCount();
    Object.defineProperty(exports2, "windowCount", { enumerable: true, get: function() {
      return windowCount_1.windowCount;
    } });
    var windowTime_1 = require_windowTime();
    Object.defineProperty(exports2, "windowTime", { enumerable: true, get: function() {
      return windowTime_1.windowTime;
    } });
    var windowToggle_1 = require_windowToggle();
    Object.defineProperty(exports2, "windowToggle", { enumerable: true, get: function() {
      return windowToggle_1.windowToggle;
    } });
    var windowWhen_1 = require_windowWhen();
    Object.defineProperty(exports2, "windowWhen", { enumerable: true, get: function() {
      return windowWhen_1.windowWhen;
    } });
    var withLatestFrom_1 = require_withLatestFrom();
    Object.defineProperty(exports2, "withLatestFrom", { enumerable: true, get: function() {
      return withLatestFrom_1.withLatestFrom;
    } });
    var zip_1 = require_zip2();
    Object.defineProperty(exports2, "zip", { enumerable: true, get: function() {
      return zip_1.zip;
    } });
    var zipAll_1 = require_zipAll();
    Object.defineProperty(exports2, "zipAll", { enumerable: true, get: function() {
      return zipAll_1.zipAll;
    } });
    var zipWith_1 = require_zipWith();
    Object.defineProperty(exports2, "zipWith", { enumerable: true, get: function() {
      return zipWith_1.zipWith;
    } });
  }
});

// node_modules/mnemonist/utils/comparators.js
var require_comparators = __commonJS({
  "node_modules/mnemonist/utils/comparators.js"(exports2) {
    var DEFAULT_COMPARATOR = function(a, b) {
      if (a < b)
        return -1;
      if (a > b)
        return 1;
      return 0;
    };
    var DEFAULT_REVERSE_COMPARATOR = function(a, b) {
      if (a < b)
        return 1;
      if (a > b)
        return -1;
      return 0;
    };
    function reverseComparator(comparator) {
      return function(a, b) {
        return comparator(b, a);
      };
    }
    function createTupleComparator(size) {
      if (size === 2) {
        return function(a, b) {
          if (a[0] < b[0])
            return -1;
          if (a[0] > b[0])
            return 1;
          if (a[1] < b[1])
            return -1;
          if (a[1] > b[1])
            return 1;
          return 0;
        };
      }
      return function(a, b) {
        var i = 0;
        while (i < size) {
          if (a[i] < b[i])
            return -1;
          if (a[i] > b[i])
            return 1;
          i++;
        }
        return 0;
      };
    }
    exports2.DEFAULT_COMPARATOR = DEFAULT_COMPARATOR;
    exports2.DEFAULT_REVERSE_COMPARATOR = DEFAULT_REVERSE_COMPARATOR;
    exports2.reverseComparator = reverseComparator;
    exports2.createTupleComparator = createTupleComparator;
  }
});

// node_modules/obliterator/support.js
var require_support = __commonJS({
  "node_modules/obliterator/support.js"(exports2) {
    exports2.ARRAY_BUFFER_SUPPORT = typeof ArrayBuffer !== "undefined";
    exports2.SYMBOL_SUPPORT = typeof Symbol !== "undefined";
  }
});

// node_modules/obliterator/foreach.js
var require_foreach = __commonJS({
  "node_modules/obliterator/foreach.js"(exports2, module2) {
    var support = require_support();
    var ARRAY_BUFFER_SUPPORT = support.ARRAY_BUFFER_SUPPORT;
    var SYMBOL_SUPPORT = support.SYMBOL_SUPPORT;
    module2.exports = function forEach(iterable, callback) {
      var iterator, k, i, l, s;
      if (!iterable) throw new Error("obliterator/forEach: invalid iterable.");
      if (typeof callback !== "function")
        throw new Error("obliterator/forEach: expecting a callback.");
      if (Array.isArray(iterable) || ARRAY_BUFFER_SUPPORT && ArrayBuffer.isView(iterable) || typeof iterable === "string" || iterable.toString() === "[object Arguments]") {
        for (i = 0, l = iterable.length; i < l; i++) callback(iterable[i], i);
        return;
      }
      if (typeof iterable.forEach === "function") {
        iterable.forEach(callback);
        return;
      }
      if (SYMBOL_SUPPORT && Symbol.iterator in iterable && typeof iterable.next !== "function") {
        iterable = iterable[Symbol.iterator]();
      }
      if (typeof iterable.next === "function") {
        iterator = iterable;
        i = 0;
        while (s = iterator.next(), s.done !== true) {
          callback(s.value, i);
          i++;
        }
        return;
      }
      for (k in iterable) {
        if (iterable.hasOwnProperty(k)) {
          callback(iterable[k], k);
        }
      }
      return;
    };
  }
});

// node_modules/mnemonist/fibonacci-heap.js
var require_fibonacci_heap = __commonJS({
  "node_modules/mnemonist/fibonacci-heap.js"(exports2, module2) {
    var comparators = require_comparators();
    var forEach = require_foreach();
    var DEFAULT_COMPARATOR = comparators.DEFAULT_COMPARATOR;
    var reverseComparator = comparators.reverseComparator;
    function FibonacciHeap(comparator) {
      this.clear();
      this.comparator = comparator || DEFAULT_COMPARATOR;
      if (typeof this.comparator !== "function")
        throw new Error("mnemonist/FibonacciHeap.constructor: given comparator should be a function.");
    }
    FibonacciHeap.prototype.clear = function() {
      this.root = null;
      this.min = null;
      this.size = 0;
    };
    function createNode(item) {
      return {
        item,
        degree: 0
      };
    }
    function mergeWithRoot(heap, node) {
      if (!heap.root) {
        heap.root = node;
      } else {
        node.right = heap.root.right;
        node.left = heap.root;
        heap.root.right.left = node;
        heap.root.right = node;
      }
    }
    FibonacciHeap.prototype.push = function(item) {
      var node = createNode(item);
      node.left = node;
      node.right = node;
      mergeWithRoot(this, node);
      if (!this.min || this.comparator(node.item, this.min.item) <= 0)
        this.min = node;
      return ++this.size;
    };
    FibonacciHeap.prototype.peek = function() {
      return this.min ? this.min.item : void 0;
    };
    function consumeLinkedList(head) {
      var nodes = [], node = head, flag = false;
      while (true) {
        if (node === head && flag)
          break;
        else if (node === head)
          flag = true;
        nodes.push(node);
        node = node.right;
      }
      return nodes;
    }
    function removeFromRoot(heap, node) {
      if (heap.root === node)
        heap.root = node.right;
      node.left.right = node.right;
      node.right.left = node.left;
    }
    function mergeWithChild(parent, node) {
      if (!parent.child) {
        parent.child = node;
      } else {
        node.right = parent.child.right;
        node.left = parent.child;
        parent.child.right.left = node;
        parent.child.right = node;
      }
    }
    function link(heap, y, x) {
      removeFromRoot(heap, y);
      y.left = y;
      y.right = y;
      mergeWithChild(x, y);
      x.degree++;
      y.parent = x;
    }
    function consolidate(heap) {
      var A = new Array(heap.size), nodes = consumeLinkedList(heap.root), i, l, x, y, d, t;
      for (i = 0, l = nodes.length; i < l; i++) {
        x = nodes[i];
        d = x.degree;
        while (A[d]) {
          y = A[d];
          if (heap.comparator(x.item, y.item) > 0) {
            t = x;
            x = y;
            y = t;
          }
          link(heap, y, x);
          A[d] = null;
          d++;
        }
        A[d] = x;
      }
      for (i = 0; i < heap.size; i++) {
        if (A[i] && heap.comparator(A[i].item, heap.min.item) <= 0)
          heap.min = A[i];
      }
    }
    FibonacciHeap.prototype.pop = function() {
      if (!this.size)
        return void 0;
      var z = this.min;
      if (z.child) {
        var nodes = consumeLinkedList(z.child), node, i, l;
        for (i = 0, l = nodes.length; i < l; i++) {
          node = nodes[i];
          mergeWithRoot(this, node);
          delete node.parent;
        }
      }
      removeFromRoot(this, z);
      if (z === z.right) {
        this.min = null;
        this.root = null;
      } else {
        this.min = z.right;
        consolidate(this);
      }
      this.size--;
      return z.item;
    };
    FibonacciHeap.prototype.inspect = function() {
      var proxy = {
        size: this.size
      };
      if (this.min && "item" in this.min)
        proxy.top = this.min.item;
      Object.defineProperty(proxy, "constructor", {
        value: FibonacciHeap,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      FibonacciHeap.prototype[Symbol.for("nodejs.util.inspect.custom")] = FibonacciHeap.prototype.inspect;
    function MaxFibonacciHeap(comparator) {
      this.clear();
      this.comparator = comparator || DEFAULT_COMPARATOR;
      if (typeof this.comparator !== "function")
        throw new Error("mnemonist/FibonacciHeap.constructor: given comparator should be a function.");
      this.comparator = reverseComparator(this.comparator);
    }
    MaxFibonacciHeap.prototype = FibonacciHeap.prototype;
    FibonacciHeap.from = function(iterable, comparator) {
      var heap = new FibonacciHeap(comparator);
      forEach(iterable, function(value) {
        heap.push(value);
      });
      return heap;
    };
    MaxFibonacciHeap.from = function(iterable, comparator) {
      var heap = new MaxFibonacciHeap(comparator);
      forEach(iterable, function(value) {
        heap.push(value);
      });
      return heap;
    };
    FibonacciHeap.MinFibonacciHeap = FibonacciHeap;
    FibonacciHeap.MaxFibonacciHeap = MaxFibonacciHeap;
    module2.exports = FibonacciHeap;
  }
});

// node_modules/mnemonist/utils/typed-arrays.js
var require_typed_arrays = __commonJS({
  "node_modules/mnemonist/utils/typed-arrays.js"(exports2) {
    var MAX_8BIT_INTEGER = Math.pow(2, 8) - 1;
    var MAX_16BIT_INTEGER = Math.pow(2, 16) - 1;
    var MAX_32BIT_INTEGER = Math.pow(2, 32) - 1;
    var MAX_SIGNED_8BIT_INTEGER = Math.pow(2, 7) - 1;
    var MAX_SIGNED_16BIT_INTEGER = Math.pow(2, 15) - 1;
    var MAX_SIGNED_32BIT_INTEGER = Math.pow(2, 31) - 1;
    exports2.getPointerArray = function(size) {
      var maxIndex = size - 1;
      if (maxIndex <= MAX_8BIT_INTEGER)
        return Uint8Array;
      if (maxIndex <= MAX_16BIT_INTEGER)
        return Uint16Array;
      if (maxIndex <= MAX_32BIT_INTEGER)
        return Uint32Array;
      throw new Error("mnemonist: Pointer Array of size > 4294967295 is not supported.");
    };
    exports2.getSignedPointerArray = function(size) {
      var maxIndex = size - 1;
      if (maxIndex <= MAX_SIGNED_8BIT_INTEGER)
        return Int8Array;
      if (maxIndex <= MAX_SIGNED_16BIT_INTEGER)
        return Int16Array;
      if (maxIndex <= MAX_SIGNED_32BIT_INTEGER)
        return Int32Array;
      return Float64Array;
    };
    exports2.getNumberType = function(value) {
      if (value === (value | 0)) {
        if (Math.sign(value) === -1) {
          if (value <= 127 && value >= -128)
            return Int8Array;
          if (value <= 32767 && value >= -32768)
            return Int16Array;
          return Int32Array;
        } else {
          if (value <= 255)
            return Uint8Array;
          if (value <= 65535)
            return Uint16Array;
          return Uint32Array;
        }
      }
      return Float64Array;
    };
    var TYPE_PRIORITY = {
      Uint8Array: 1,
      Int8Array: 2,
      Uint16Array: 3,
      Int16Array: 4,
      Uint32Array: 5,
      Int32Array: 6,
      Float32Array: 7,
      Float64Array: 8
    };
    exports2.getMinimalRepresentation = function(array, getter) {
      var maxType = null, maxPriority = 0, p, t, v, i, l;
      for (i = 0, l = array.length; i < l; i++) {
        v = getter ? getter(array[i]) : array[i];
        t = exports2.getNumberType(v);
        p = TYPE_PRIORITY[t.name];
        if (p > maxPriority) {
          maxPriority = p;
          maxType = t;
        }
      }
      return maxType;
    };
    exports2.isTypedArray = function(value) {
      return typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView(value);
    };
    exports2.concat = function() {
      var length = 0, i, o, l;
      for (i = 0, l = arguments.length; i < l; i++)
        length += arguments[i].length;
      var array = new arguments[0].constructor(length);
      for (i = 0, o = 0; i < l; i++) {
        array.set(arguments[i], o);
        o += arguments[i].length;
      }
      return array;
    };
    exports2.indices = function(length) {
      var PointerArray = exports2.getPointerArray(length);
      var array = new PointerArray(length);
      for (var i = 0; i < length; i++)
        array[i] = i;
      return array;
    };
  }
});

// node_modules/mnemonist/utils/iterables.js
var require_iterables = __commonJS({
  "node_modules/mnemonist/utils/iterables.js"(exports2) {
    var forEach = require_foreach();
    var typed = require_typed_arrays();
    function isArrayLike(target) {
      return Array.isArray(target) || typed.isTypedArray(target);
    }
    function guessLength(target) {
      if (typeof target.length === "number")
        return target.length;
      if (typeof target.size === "number")
        return target.size;
      return;
    }
    function toArray(target) {
      var l = guessLength(target);
      var array = typeof l === "number" ? new Array(l) : [];
      var i = 0;
      forEach(target, function(value) {
        array[i++] = value;
      });
      return array;
    }
    function toArrayWithIndices(target) {
      var l = guessLength(target);
      var IndexArray = typeof l === "number" ? typed.getPointerArray(l) : Array;
      var array = typeof l === "number" ? new Array(l) : [];
      var indices = typeof l === "number" ? new IndexArray(l) : [];
      var i = 0;
      forEach(target, function(value) {
        array[i] = value;
        indices[i] = i++;
      });
      return [array, indices];
    }
    exports2.isArrayLike = isArrayLike;
    exports2.guessLength = guessLength;
    exports2.toArray = toArray;
    exports2.toArrayWithIndices = toArrayWithIndices;
  }
});

// node_modules/mnemonist/heap.js
var require_heap = __commonJS({
  "node_modules/mnemonist/heap.js"(exports2, module2) {
    var forEach = require_foreach();
    var comparators = require_comparators();
    var iterables = require_iterables();
    var DEFAULT_COMPARATOR = comparators.DEFAULT_COMPARATOR;
    var reverseComparator = comparators.reverseComparator;
    function siftDown(compare, heap, startIndex, i) {
      var item = heap[i], parentIndex, parent;
      while (i > startIndex) {
        parentIndex = i - 1 >> 1;
        parent = heap[parentIndex];
        if (compare(item, parent) < 0) {
          heap[i] = parent;
          i = parentIndex;
          continue;
        }
        break;
      }
      heap[i] = item;
    }
    function siftUp(compare, heap, i) {
      var endIndex = heap.length, startIndex = i, item = heap[i], childIndex = 2 * i + 1, rightIndex;
      while (childIndex < endIndex) {
        rightIndex = childIndex + 1;
        if (rightIndex < endIndex && compare(heap[childIndex], heap[rightIndex]) >= 0) {
          childIndex = rightIndex;
        }
        heap[i] = heap[childIndex];
        i = childIndex;
        childIndex = 2 * i + 1;
      }
      heap[i] = item;
      siftDown(compare, heap, startIndex, i);
    }
    function push(compare, heap, item) {
      heap.push(item);
      siftDown(compare, heap, 0, heap.length - 1);
    }
    function pop(compare, heap) {
      var lastItem = heap.pop();
      if (heap.length !== 0) {
        var item = heap[0];
        heap[0] = lastItem;
        siftUp(compare, heap, 0);
        return item;
      }
      return lastItem;
    }
    function replace(compare, heap, item) {
      if (heap.length === 0)
        throw new Error("mnemonist/heap.replace: cannot pop an empty heap.");
      var popped = heap[0];
      heap[0] = item;
      siftUp(compare, heap, 0);
      return popped;
    }
    function pushpop(compare, heap, item) {
      var tmp;
      if (heap.length !== 0 && compare(heap[0], item) < 0) {
        tmp = heap[0];
        heap[0] = item;
        item = tmp;
        siftUp(compare, heap, 0);
      }
      return item;
    }
    function heapify(compare, array) {
      var n = array.length, l = n >> 1, i = l;
      while (--i >= 0)
        siftUp(compare, array, i);
    }
    function consume(compare, heap) {
      var l = heap.length, i = 0;
      var array = new Array(l);
      while (i < l)
        array[i++] = pop(compare, heap);
      return array;
    }
    function nsmallest(compare, n, iterable) {
      if (arguments.length === 2) {
        iterable = n;
        n = compare;
        compare = DEFAULT_COMPARATOR;
      }
      var reverseCompare = reverseComparator(compare);
      var i, l, v;
      var min = Infinity;
      var result;
      if (n === 1) {
        if (iterables.isArrayLike(iterable)) {
          for (i = 0, l = iterable.length; i < l; i++) {
            v = iterable[i];
            if (min === Infinity || compare(v, min) < 0)
              min = v;
          }
          result = new iterable.constructor(1);
          result[0] = min;
          return result;
        }
        forEach(iterable, function(value) {
          if (min === Infinity || compare(value, min) < 0)
            min = value;
        });
        return [min];
      }
      if (iterables.isArrayLike(iterable)) {
        if (n >= iterable.length)
          return iterable.slice().sort(compare);
        result = iterable.slice(0, n);
        heapify(reverseCompare, result);
        for (i = n, l = iterable.length; i < l; i++)
          if (reverseCompare(iterable[i], result[0]) > 0)
            replace(reverseCompare, result, iterable[i]);
        return result.sort(compare);
      }
      var size = iterables.guessLength(iterable);
      if (size !== null && size < n)
        n = size;
      result = new Array(n);
      i = 0;
      forEach(iterable, function(value) {
        if (i < n) {
          result[i] = value;
        } else {
          if (i === n)
            heapify(reverseCompare, result);
          if (reverseCompare(value, result[0]) > 0)
            replace(reverseCompare, result, value);
        }
        i++;
      });
      if (result.length > i)
        result.length = i;
      return result.sort(compare);
    }
    function nlargest(compare, n, iterable) {
      if (arguments.length === 2) {
        iterable = n;
        n = compare;
        compare = DEFAULT_COMPARATOR;
      }
      var reverseCompare = reverseComparator(compare);
      var i, l, v;
      var max = -Infinity;
      var result;
      if (n === 1) {
        if (iterables.isArrayLike(iterable)) {
          for (i = 0, l = iterable.length; i < l; i++) {
            v = iterable[i];
            if (max === -Infinity || compare(v, max) > 0)
              max = v;
          }
          result = new iterable.constructor(1);
          result[0] = max;
          return result;
        }
        forEach(iterable, function(value) {
          if (max === -Infinity || compare(value, max) > 0)
            max = value;
        });
        return [max];
      }
      if (iterables.isArrayLike(iterable)) {
        if (n >= iterable.length)
          return iterable.slice().sort(reverseCompare);
        result = iterable.slice(0, n);
        heapify(compare, result);
        for (i = n, l = iterable.length; i < l; i++)
          if (compare(iterable[i], result[0]) > 0)
            replace(compare, result, iterable[i]);
        return result.sort(reverseCompare);
      }
      var size = iterables.guessLength(iterable);
      if (size !== null && size < n)
        n = size;
      result = new Array(n);
      i = 0;
      forEach(iterable, function(value) {
        if (i < n) {
          result[i] = value;
        } else {
          if (i === n)
            heapify(compare, result);
          if (compare(value, result[0]) > 0)
            replace(compare, result, value);
        }
        i++;
      });
      if (result.length > i)
        result.length = i;
      return result.sort(reverseCompare);
    }
    function Heap(comparator) {
      this.clear();
      this.comparator = comparator || DEFAULT_COMPARATOR;
      if (typeof this.comparator !== "function")
        throw new Error("mnemonist/Heap.constructor: given comparator should be a function.");
    }
    Heap.prototype.clear = function() {
      this.items = [];
      this.size = 0;
    };
    Heap.prototype.push = function(item) {
      push(this.comparator, this.items, item);
      return ++this.size;
    };
    Heap.prototype.peek = function() {
      return this.items[0];
    };
    Heap.prototype.pop = function() {
      if (this.size !== 0)
        this.size--;
      return pop(this.comparator, this.items);
    };
    Heap.prototype.replace = function(item) {
      return replace(this.comparator, this.items, item);
    };
    Heap.prototype.pushpop = function(item) {
      return pushpop(this.comparator, this.items, item);
    };
    Heap.prototype.consume = function() {
      this.size = 0;
      return consume(this.comparator, this.items);
    };
    Heap.prototype.toArray = function() {
      return consume(this.comparator, this.items.slice());
    };
    Heap.prototype.inspect = function() {
      var proxy = this.toArray();
      Object.defineProperty(proxy, "constructor", {
        value: Heap,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      Heap.prototype[Symbol.for("nodejs.util.inspect.custom")] = Heap.prototype.inspect;
    function MaxHeap(comparator) {
      this.clear();
      this.comparator = comparator || DEFAULT_COMPARATOR;
      if (typeof this.comparator !== "function")
        throw new Error("mnemonist/MaxHeap.constructor: given comparator should be a function.");
      this.comparator = reverseComparator(this.comparator);
    }
    MaxHeap.prototype = Heap.prototype;
    Heap.from = function(iterable, comparator) {
      var heap = new Heap(comparator);
      var items;
      if (iterables.isArrayLike(iterable))
        items = iterable.slice();
      else
        items = iterables.toArray(iterable);
      heapify(heap.comparator, items);
      heap.items = items;
      heap.size = items.length;
      return heap;
    };
    MaxHeap.from = function(iterable, comparator) {
      var heap = new MaxHeap(comparator);
      var items;
      if (iterables.isArrayLike(iterable))
        items = iterable.slice();
      else
        items = iterables.toArray(iterable);
      heapify(heap.comparator, items);
      heap.items = items;
      heap.size = items.length;
      return heap;
    };
    Heap.siftUp = siftUp;
    Heap.siftDown = siftDown;
    Heap.push = push;
    Heap.pop = pop;
    Heap.replace = replace;
    Heap.pushpop = pushpop;
    Heap.heapify = heapify;
    Heap.consume = consume;
    Heap.nsmallest = nsmallest;
    Heap.nlargest = nlargest;
    Heap.MinHeap = Heap;
    Heap.MaxHeap = MaxHeap;
    module2.exports = Heap;
  }
});

// node_modules/mnemonist/suffix-array.js
var require_suffix_array = __commonJS({
  "node_modules/mnemonist/suffix-array.js"(exports2, module2) {
    var SEPARATOR = "";
    function sort(string, array, offset) {
      var l = array.length, buckets = [], i = l, j = -1, b, d = 0, bits;
      while (i--)
        j = Math.max(string[array[i] + offset], j);
      bits = j >> 24 && 32 || j >> 16 && 24 || j >> 8 && 16 || 8;
      for (; d < bits; d += 4) {
        for (i = 16; i--; )
          buckets[i] = [];
        for (i = l; i--; )
          buckets[string[array[i] + offset] >> d & 15].push(array[i]);
        for (b = 0; b < 16; b++) {
          for (j = buckets[b].length; j--; )
            array[++i] = buckets[b][j];
        }
      }
    }
    function compare(string, lookup, m, n) {
      return string[m] - string[n] || (m % 3 === 2 ? string[m + 1] - string[n + 1] || lookup[m + 2] - lookup[n + 2] : lookup[m + 1] - lookup[n + 1]);
    }
    function build(string, l) {
      var a = [], b = [], al = 2 * l / 3 | 0, bl = l - al, r = al + 1 >> 1, i = al, j = 0, k, lookup = [], result = [];
      if (l === 1)
        return [0];
      while (i--)
        a[i] = (i * 3 >> 1) + 1;
      for (i = 3; i--; )
        sort(string, a, i);
      j = b[(a[0] / 3 | 0) + (a[0] % 3 === 1 ? 0 : r)] = 1;
      for (i = 1; i < al; i++) {
        if (string[a[i]] !== string[a[i - 1]] || string[a[i] + 1] !== string[a[i - 1] + 1] || string[a[i] + 2] !== string[a[i - 1] + 2])
          j++;
        b[(a[i] / 3 | 0) + (a[i] % 3 === 1 ? 0 : r)] = j;
      }
      if (j < al) {
        b = build(b, al);
        for (i = al; i--; )
          a[i] = b[i] < r ? b[i] * 3 + 1 : (b[i] - r) * 3 + 2;
      }
      for (i = al; i--; )
        lookup[a[i]] = i;
      lookup[l] = -1;
      lookup[l + 1] = -2;
      b = l % 3 === 1 ? [l - 1] : [];
      for (i = 0; i < al; i++) {
        if (a[i] % 3 === 1)
          b.push(a[i] - 1);
      }
      sort(string, b, 0);
      for (i = 0, j = 0, k = 0; i < al && j < bl; )
        result[k++] = compare(string, lookup, a[i], b[j]) < 0 ? a[i++] : b[j++];
      while (i < al)
        result[k++] = a[i++];
      while (j < bl)
        result[k++] = b[j++];
      return result;
    }
    function convert(target) {
      var length = target.length, paddingOffset = length % 3, array = new Array(length + paddingOffset), l, i;
      if (typeof target !== "string") {
        var uniqueTokens = /* @__PURE__ */ Object.create(null);
        for (i = 0; i < length; i++) {
          if (!uniqueTokens[target[i]])
            uniqueTokens[target[i]] = true;
        }
        var alphabet = /* @__PURE__ */ Object.create(null), sortedUniqueTokens = Object.keys(uniqueTokens).sort();
        for (i = 0, l = sortedUniqueTokens.length; i < l; i++)
          alphabet[sortedUniqueTokens[i]] = i + 1;
        for (i = 0; i < length; i++) {
          array[i] = alphabet[target[i]];
        }
      } else {
        for (i = 0; i < length; i++)
          array[i] = target.charCodeAt(i);
      }
      for (i = length; i < length + paddingOffset; i++)
        array[i] = 0;
      return array;
    }
    function SuffixArray(string) {
      this.hasArbitrarySequence = typeof string !== "string";
      this.string = string;
      this.length = string.length;
      this.array = build(convert(string), this.length);
    }
    SuffixArray.prototype.toString = function() {
      return this.array.join(",");
    };
    SuffixArray.prototype.toJSON = function() {
      return this.array;
    };
    SuffixArray.prototype.inspect = function() {
      var array = new Array(this.length);
      for (var i = 0; i < this.length; i++)
        array[i] = this.string.slice(this.array[i]);
      Object.defineProperty(array, "constructor", {
        value: SuffixArray,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      SuffixArray.prototype[Symbol.for("nodejs.util.inspect.custom")] = SuffixArray.prototype.inspect;
    function GeneralizedSuffixArray(strings) {
      this.hasArbitrarySequence = typeof strings[0] !== "string";
      this.size = strings.length;
      if (this.hasArbitrarySequence) {
        this.text = [];
        for (var i = 0, l = this.size; i < l; i++) {
          this.text.push.apply(this.text, strings[i]);
          if (i < l - 1)
            this.text.push(SEPARATOR);
        }
      } else {
        this.text = strings.join(SEPARATOR);
      }
      this.firstLength = strings[0].length;
      this.length = this.text.length;
      this.array = build(convert(this.text), this.length);
    }
    GeneralizedSuffixArray.prototype.longestCommonSubsequence = function() {
      var lcs = this.hasArbitrarySequence ? [] : "", lcp, i, j, s, t;
      for (i = 1; i < this.length; i++) {
        s = this.array[i];
        t = this.array[i - 1];
        if (s < this.firstLength && t < this.firstLength)
          continue;
        if (s > this.firstLength && t > this.firstLength)
          continue;
        lcp = Math.min(this.length - s, this.length - t);
        for (j = 0; j < lcp; j++) {
          if (this.text[s + j] !== this.text[t + j]) {
            lcp = j;
            break;
          }
        }
        if (lcp > lcs.length)
          lcs = this.text.slice(s, s + lcp);
      }
      return lcs;
    };
    GeneralizedSuffixArray.prototype.toString = function() {
      return this.array.join(",");
    };
    GeneralizedSuffixArray.prototype.toJSON = function() {
      return this.array;
    };
    GeneralizedSuffixArray.prototype.inspect = function() {
      var array = new Array(this.length);
      for (var i = 0; i < this.length; i++)
        array[i] = this.text.slice(this.array[i]);
      Object.defineProperty(array, "constructor", {
        value: GeneralizedSuffixArray,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      GeneralizedSuffixArray.prototype[Symbol.for("nodejs.util.inspect.custom")] = GeneralizedSuffixArray.prototype.inspect;
    SuffixArray.GeneralizedSuffixArray = GeneralizedSuffixArray;
    module2.exports = SuffixArray;
  }
});

// node_modules/mnemonist/bi-map.js
var require_bi_map = __commonJS({
  "node_modules/mnemonist/bi-map.js"(exports2, module2) {
    var forEach = require_foreach();
    function InverseMap(original) {
      this.size = 0;
      this.items = /* @__PURE__ */ new Map();
      this.inverse = original;
    }
    function BiMap() {
      this.size = 0;
      this.items = /* @__PURE__ */ new Map();
      this.inverse = new InverseMap(this);
    }
    function clear() {
      this.size = 0;
      this.items.clear();
      this.inverse.items.clear();
    }
    BiMap.prototype.clear = clear;
    InverseMap.prototype.clear = clear;
    function set(key, value) {
      if (this.items.has(key)) {
        var currentValue = this.items.get(key);
        if (currentValue === value)
          return this;
        else
          this.inverse.items.delete(currentValue);
      }
      if (this.inverse.items.has(value)) {
        var currentKey = this.inverse.items.get(value);
        if (currentKey === key)
          return this;
        else
          this.items.delete(currentKey);
      }
      this.items.set(key, value);
      this.inverse.items.set(value, key);
      this.size = this.items.size;
      this.inverse.size = this.inverse.items.size;
      return this;
    }
    BiMap.prototype.set = set;
    InverseMap.prototype.set = set;
    function del(key) {
      if (this.items.has(key)) {
        var currentValue = this.items.get(key);
        this.items.delete(key);
        this.inverse.items.delete(currentValue);
        this.size = this.items.size;
        this.inverse.size = this.inverse.items.size;
        return true;
      }
      return false;
    }
    BiMap.prototype.delete = del;
    InverseMap.prototype.delete = del;
    var METHODS = ["has", "get", "forEach", "keys", "values", "entries"];
    METHODS.forEach(function(name) {
      BiMap.prototype[name] = InverseMap.prototype[name] = function() {
        return Map.prototype[name].apply(this.items, arguments);
      };
    });
    if (typeof Symbol !== "undefined") {
      BiMap.prototype[Symbol.iterator] = BiMap.prototype.entries;
      InverseMap.prototype[Symbol.iterator] = InverseMap.prototype.entries;
    }
    BiMap.prototype.inspect = function() {
      var dummy = {
        left: this.items,
        right: this.inverse.items
      };
      Object.defineProperty(dummy, "constructor", {
        value: BiMap,
        enumerable: false
      });
      return dummy;
    };
    if (typeof Symbol !== "undefined")
      BiMap.prototype[Symbol.for("nodejs.util.inspect.custom")] = BiMap.prototype.inspect;
    InverseMap.prototype.inspect = function() {
      var dummy = {
        left: this.inverse.items,
        right: this.items
      };
      Object.defineProperty(dummy, "constructor", {
        value: InverseMap,
        enumerable: false
      });
      return dummy;
    };
    if (typeof Symbol !== "undefined")
      InverseMap.prototype[Symbol.for("nodejs.util.inspect.custom")] = InverseMap.prototype.inspect;
    BiMap.from = function(iterable) {
      var bimap = new BiMap();
      forEach(iterable, function(value, key) {
        bimap.set(key, value);
      });
      return bimap;
    };
    module2.exports = BiMap;
  }
});

// node_modules/obliterator/iterator.js
var require_iterator2 = __commonJS({
  "node_modules/obliterator/iterator.js"(exports2, module2) {
    function Iterator(next) {
      if (typeof next !== "function")
        throw new Error("obliterator/iterator: expecting a function!");
      this.next = next;
    }
    if (typeof Symbol !== "undefined")
      Iterator.prototype[Symbol.iterator] = function() {
        return this;
      };
    Iterator.of = function() {
      var args = arguments, l = args.length, i = 0;
      return new Iterator(function() {
        if (i >= l) return { done: true };
        return { done: false, value: args[i++] };
      });
    };
    Iterator.empty = function() {
      var iterator = new Iterator(function() {
        return { done: true };
      });
      return iterator;
    };
    Iterator.fromSequence = function(sequence) {
      var i = 0, l = sequence.length;
      return new Iterator(function() {
        if (i >= l) return { done: true };
        return { done: false, value: sequence[i++] };
      });
    };
    Iterator.is = function(value) {
      if (value instanceof Iterator) return true;
      return typeof value === "object" && value !== null && typeof value.next === "function";
    };
    module2.exports = Iterator;
  }
});

// node_modules/mnemonist/utils/bitwise.js
var require_bitwise = __commonJS({
  "node_modules/mnemonist/utils/bitwise.js"(exports2) {
    function msb32(x) {
      x |= x >> 1;
      x |= x >> 2;
      x |= x >> 4;
      x |= x >> 8;
      x |= x >> 16;
      return x & ~(x >> 1);
    }
    exports2.msb32 = msb32;
    function msb8(x) {
      x |= x >> 1;
      x |= x >> 2;
      x |= x >> 4;
      return x & ~(x >> 1);
    }
    exports2.msb8 = msb8;
    exports2.test = function(x, pos) {
      return x >> pos & 1;
    };
    exports2.criticalBit8 = function(a, b) {
      return msb8(a ^ b);
    };
    exports2.criticalBit8Mask = function(a, b) {
      return ~msb8(a ^ b) >>> 0 & 255;
    };
    exports2.testCriticalBit8 = function(x, mask) {
      return 1 + (x | mask) >> 8;
    };
    exports2.criticalBit32Mask = function(a, b) {
      return ~msb32(a ^ b) >>> 0 & 4294967295;
    };
    exports2.popcount = function(x) {
      x -= x >> 1 & 1431655765;
      x = (x & 858993459) + (x >> 2 & 858993459);
      x = x + (x >> 4) & 252645135;
      x += x >> 8;
      x += x >> 16;
      return x & 127;
    };
    var TABLE8 = new Uint8Array(Math.pow(2, 8));
    for (i = 0, l = TABLE8.length; i < l; i++)
      TABLE8[i] = exports2.popcount(i);
    var i;
    var l;
    exports2.table8Popcount = function(x) {
      return TABLE8[x & 255] + TABLE8[x >> 8 & 255] + TABLE8[x >> 16 & 255] + TABLE8[x >> 24 & 255];
    };
  }
});

// node_modules/mnemonist/bit-set.js
var require_bit_set = __commonJS({
  "node_modules/mnemonist/bit-set.js"(exports2, module2) {
    var Iterator = require_iterator2();
    var bitwise = require_bitwise();
    function BitSet(length) {
      this.length = length;
      this.clear();
    }
    BitSet.prototype.clear = function() {
      this.size = 0;
      this.array = new Uint32Array(Math.ceil(this.length / 32));
    };
    BitSet.prototype.set = function(index, value) {
      var byteIndex = index >> 5, pos = index & 31, oldBytes = this.array[byteIndex], newBytes;
      if (value === 0 || value === false)
        newBytes = this.array[byteIndex] &= ~(1 << pos);
      else
        newBytes = this.array[byteIndex] |= 1 << pos;
      newBytes = newBytes >>> 0;
      if (newBytes > oldBytes)
        this.size++;
      else if (newBytes < oldBytes)
        this.size--;
      return this;
    };
    BitSet.prototype.reset = function(index) {
      var byteIndex = index >> 5, pos = index & 31, oldBytes = this.array[byteIndex], newBytes;
      newBytes = this.array[byteIndex] &= ~(1 << pos);
      if (newBytes < oldBytes)
        this.size--;
      return this;
    };
    BitSet.prototype.flip = function(index) {
      var byteIndex = index >> 5, pos = index & 31, oldBytes = this.array[byteIndex];
      var newBytes = this.array[byteIndex] ^= 1 << pos;
      newBytes = newBytes >>> 0;
      if (newBytes > oldBytes)
        this.size++;
      else if (newBytes < oldBytes)
        this.size--;
      return this;
    };
    BitSet.prototype.get = function(index) {
      var byteIndex = index >> 5, pos = index & 31;
      return this.array[byteIndex] >> pos & 1;
    };
    BitSet.prototype.test = function(index) {
      return Boolean(this.get(index));
    };
    BitSet.prototype.rank = function(i) {
      if (this.size === 0)
        return 0;
      var byteIndex = i >> 5, pos = i & 31, r = 0;
      for (var j = 0; j < byteIndex; j++)
        r += bitwise.table8Popcount(this.array[j]);
      var maskedByte = this.array[byteIndex] & (1 << pos) - 1;
      r += bitwise.table8Popcount(maskedByte);
      return r;
    };
    BitSet.prototype.select = function(r) {
      if (this.size === 0)
        return -1;
      if (r >= this.length)
        return -1;
      var byte, b = 32, p = 0, c = 0;
      for (var i = 0, l = this.array.length; i < l; i++) {
        byte = this.array[i];
        if (byte === 0)
          continue;
        if (i === l - 1)
          b = this.length % 32 || 32;
        for (var j = 0; j < b; j++, p++) {
          c += byte >> j & 1;
          if (c === r)
            return p;
        }
      }
    };
    BitSet.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      var length = this.length, byte, bit, b = 32;
      for (var i = 0, l = this.array.length; i < l; i++) {
        byte = this.array[i];
        if (i === l - 1)
          b = length % 32 || 32;
        for (var j = 0; j < b; j++) {
          bit = byte >> j & 1;
          callback.call(scope, bit, i * 32 + j);
        }
      }
    };
    BitSet.prototype.values = function() {
      var length = this.length, inner = false, byte, bit, array = this.array, l = array.length, i = 0, j = -1, b = 32;
      return new Iterator(function next() {
        if (!inner) {
          if (i >= l)
            return {
              done: true
            };
          if (i === l - 1)
            b = length % 32 || 32;
          byte = array[i++];
          inner = true;
          j = -1;
        }
        j++;
        if (j >= b) {
          inner = false;
          return next();
        }
        bit = byte >> j & 1;
        return {
          value: bit
        };
      });
    };
    BitSet.prototype.entries = function() {
      var length = this.length, inner = false, byte, bit, array = this.array, index, l = array.length, i = 0, j = -1, b = 32;
      return new Iterator(function next() {
        if (!inner) {
          if (i >= l)
            return {
              done: true
            };
          if (i === l - 1)
            b = length % 32 || 32;
          byte = array[i++];
          inner = true;
          j = -1;
        }
        j++;
        index = ~-i * 32 + j;
        if (j >= b) {
          inner = false;
          return next();
        }
        bit = byte >> j & 1;
        return {
          value: [index, bit]
        };
      });
    };
    if (typeof Symbol !== "undefined")
      BitSet.prototype[Symbol.iterator] = BitSet.prototype.values;
    BitSet.prototype.inspect = function() {
      var proxy = new Uint8Array(this.length);
      this.forEach(function(bit, i) {
        proxy[i] = bit;
      });
      Object.defineProperty(proxy, "constructor", {
        value: BitSet,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      BitSet.prototype[Symbol.for("nodejs.util.inspect.custom")] = BitSet.prototype.inspect;
    BitSet.prototype.toJSON = function() {
      return Array.from(this.array);
    };
    module2.exports = BitSet;
  }
});

// node_modules/mnemonist/bit-vector.js
var require_bit_vector = __commonJS({
  "node_modules/mnemonist/bit-vector.js"(exports2, module2) {
    var Iterator = require_iterator2();
    var bitwise = require_bitwise();
    var DEFAULT_GROWING_POLICY = function(capacity) {
      return Math.max(1, Math.ceil(capacity * 1.5));
    };
    function createByteArray(capacity) {
      return new Uint32Array(Math.ceil(capacity / 32));
    }
    function BitVector(initialLengthOrOptions) {
      var initialLength = initialLengthOrOptions || 0, policy = DEFAULT_GROWING_POLICY;
      if (typeof initialLengthOrOptions === "object") {
        initialLength = initialLengthOrOptions.initialLength || initialLengthOrOptions.initialCapacity || 0;
        policy = initialLengthOrOptions.policy || policy;
      }
      this.size = 0;
      this.length = initialLength;
      this.capacity = Math.ceil(this.length / 32) * 32;
      this.policy = policy;
      this.array = createByteArray(this.capacity);
    }
    BitVector.prototype.set = function(index, value) {
      if (this.length < index)
        throw new Error("BitVector.set: index out of bounds.");
      var byteIndex = index >> 5, pos = index & 31, oldBytes = this.array[byteIndex], newBytes;
      if (value === 0 || value === false)
        newBytes = this.array[byteIndex] &= ~(1 << pos);
      else
        newBytes = this.array[byteIndex] |= 1 << pos;
      newBytes = newBytes >>> 0;
      if (newBytes > oldBytes)
        this.size++;
      else if (newBytes < oldBytes)
        this.size--;
      return this;
    };
    BitVector.prototype.reset = function(index) {
      var byteIndex = index >> 5, pos = index & 31, oldBytes = this.array[byteIndex], newBytes;
      newBytes = this.array[byteIndex] &= ~(1 << pos);
      if (newBytes < oldBytes)
        this.size--;
      return this;
    };
    BitVector.prototype.flip = function(index) {
      var byteIndex = index >> 5, pos = index & 31, oldBytes = this.array[byteIndex];
      var newBytes = this.array[byteIndex] ^= 1 << pos;
      newBytes = newBytes >>> 0;
      if (newBytes > oldBytes)
        this.size++;
      else if (newBytes < oldBytes)
        this.size--;
      return this;
    };
    BitVector.prototype.applyPolicy = function(override) {
      var newCapacity = this.policy(override || this.capacity);
      if (typeof newCapacity !== "number" || newCapacity < 0)
        throw new Error("mnemonist/bit-vector.applyPolicy: policy returned an invalid value (expecting a positive integer).");
      if (newCapacity <= this.capacity)
        throw new Error("mnemonist/bit-vector.applyPolicy: policy returned a less or equal capacity to allocate.");
      return Math.ceil(newCapacity / 32) * 32;
    };
    BitVector.prototype.reallocate = function(capacity) {
      var virtualCapacity = capacity;
      capacity = Math.ceil(capacity / 32) * 32;
      if (virtualCapacity < this.length)
        this.length = virtualCapacity;
      if (capacity === this.capacity)
        return this;
      var oldArray = this.array;
      var storageLength = capacity / 32;
      if (storageLength === this.array.length)
        return this;
      if (storageLength > this.array.length) {
        this.array = new Uint32Array(storageLength);
        this.array.set(oldArray, 0);
      } else {
        this.array = oldArray.slice(0, storageLength);
      }
      this.capacity = capacity;
      return this;
    };
    BitVector.prototype.grow = function(capacity) {
      var newCapacity;
      if (typeof capacity === "number") {
        if (this.capacity >= capacity)
          return this;
        newCapacity = this.capacity;
        while (newCapacity < capacity)
          newCapacity = this.applyPolicy(newCapacity);
        this.reallocate(newCapacity);
        return this;
      }
      newCapacity = this.applyPolicy();
      this.reallocate(newCapacity);
      return this;
    };
    BitVector.prototype.resize = function(length) {
      if (length === this.length)
        return this;
      if (length < this.length) {
        this.length = length;
        return this;
      }
      this.length = length;
      this.reallocate(length);
      return this;
    };
    BitVector.prototype.push = function(value) {
      if (this.capacity === this.length)
        this.grow();
      if (value === 0 || value === false)
        return ++this.length;
      this.size++;
      var index = this.length++, byteIndex = index >> 5, pos = index & 31;
      this.array[byteIndex] |= 1 << pos;
      return this.length;
    };
    BitVector.prototype.pop = function() {
      if (this.length === 0)
        return;
      var index = --this.length;
      var byteIndex = index >> 5, pos = index & 31;
      return this.array[byteIndex] >> pos & 1;
    };
    BitVector.prototype.get = function(index) {
      if (this.length < index)
        return void 0;
      var byteIndex = index >> 5, pos = index & 31;
      return this.array[byteIndex] >> pos & 1;
    };
    BitVector.prototype.test = function(index) {
      if (this.length < index)
        return false;
      return Boolean(this.get(index));
    };
    BitVector.prototype.rank = function(i) {
      if (this.size === 0)
        return 0;
      var byteIndex = i >> 5, pos = i & 31, r = 0;
      for (var j = 0; j < byteIndex; j++)
        r += bitwise.table8Popcount(this.array[j]);
      var maskedByte = this.array[byteIndex] & (1 << pos) - 1;
      r += bitwise.table8Popcount(maskedByte);
      return r;
    };
    BitVector.prototype.select = function(r) {
      if (this.size === 0)
        return -1;
      if (r >= this.length)
        return -1;
      var byte, b = 32, p = 0, c = 0;
      for (var i = 0, l = this.array.length; i < l; i++) {
        byte = this.array[i];
        if (byte === 0)
          continue;
        if (i === l - 1)
          b = this.length % 32 || 32;
        for (var j = 0; j < b; j++, p++) {
          c += byte >> j & 1;
          if (c === r)
            return p;
        }
      }
    };
    BitVector.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      var length = this.length, byte, bit, b = 32;
      for (var i = 0, l = this.array.length; i < l; i++) {
        byte = this.array[i];
        if (i === l - 1)
          b = length % 32 || 32;
        for (var j = 0; j < b; j++) {
          bit = byte >> j & 1;
          callback.call(scope, bit, i * 32 + j);
        }
      }
    };
    BitVector.prototype.values = function() {
      var length = this.length, inner = false, byte, bit, array = this.array, l = array.length, i = 0, j = -1, b = 32;
      return new Iterator(function next() {
        if (!inner) {
          if (i >= l)
            return {
              done: true
            };
          if (i === l - 1)
            b = length % 32 || 32;
          byte = array[i++];
          inner = true;
          j = -1;
        }
        j++;
        if (j >= b) {
          inner = false;
          return next();
        }
        bit = byte >> j & 1;
        return {
          value: bit
        };
      });
    };
    BitVector.prototype.entries = function() {
      var length = this.length, inner = false, byte, bit, array = this.array, index, l = array.length, i = 0, j = -1, b = 32;
      return new Iterator(function next() {
        if (!inner) {
          if (i >= l)
            return {
              done: true
            };
          if (i === l - 1)
            b = length % 32 || 32;
          byte = array[i++];
          inner = true;
          j = -1;
        }
        j++;
        index = ~-i * 32 + j;
        if (j >= b) {
          inner = false;
          return next();
        }
        bit = byte >> j & 1;
        return {
          value: [index, bit]
        };
      });
    };
    if (typeof Symbol !== "undefined")
      BitVector.prototype[Symbol.iterator] = BitVector.prototype.values;
    BitVector.prototype.inspect = function() {
      var proxy = new Uint8Array(this.length);
      this.forEach(function(bit, i) {
        proxy[i] = bit;
      });
      Object.defineProperty(proxy, "constructor", {
        value: BitVector,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      BitVector.prototype[Symbol.for("nodejs.util.inspect.custom")] = BitVector.prototype.inspect;
    BitVector.prototype.toJSON = function() {
      return Array.from(this.array.slice(0, (this.length >> 5) + 1));
    };
    module2.exports = BitVector;
  }
});

// node_modules/mnemonist/utils/murmurhash3.js
var require_murmurhash3 = __commonJS({
  "node_modules/mnemonist/utils/murmurhash3.js"(exports2, module2) {
    function mul32(a, b) {
      return (a & 65535) * b + (((a >>> 16) * b & 65535) << 16) & 4294967295;
    }
    function sum32(a, b) {
      return (a & 65535) + (b >>> 16) + (((a >>> 16) + b & 65535) << 16) & 4294967295;
    }
    function rotl32(a, b) {
      return a << b | a >>> 32 - b;
    }
    module2.exports = function murmurhash3(seed, data) {
      var c1 = 3432918353, c2 = 461845907, r1 = 15, r2 = 13, m = 5, n = 1801774676;
      var hash = seed, k1, i, l;
      for (i = 0, l = data.length - 4; i <= l; i += 4) {
        k1 = data[i] | data[i + 1] << 8 | data[i + 2] << 16 | data[i + 3] << 24;
        k1 = mul32(k1, c1);
        k1 = rotl32(k1, r1);
        k1 = mul32(k1, c2);
        hash ^= k1;
        hash = rotl32(hash, r2);
        hash = mul32(hash, m);
        hash = sum32(hash, n);
      }
      k1 = 0;
      switch (data.length & 3) {
        case 3:
          k1 ^= data[i + 2] << 16;
        case 2:
          k1 ^= data[i + 1] << 8;
        case 1:
          k1 ^= data[i];
          k1 = mul32(k1, c1);
          k1 = rotl32(k1, r1);
          k1 = mul32(k1, c2);
          hash ^= k1;
        default:
      }
      hash ^= data.length;
      hash ^= hash >>> 16;
      hash = mul32(hash, 2246822507);
      hash ^= hash >>> 13;
      hash = mul32(hash, 3266489909);
      hash ^= hash >>> 16;
      return hash >>> 0;
    };
  }
});

// node_modules/mnemonist/bloom-filter.js
var require_bloom_filter = __commonJS({
  "node_modules/mnemonist/bloom-filter.js"(exports2, module2) {
    var murmurhash3 = require_murmurhash3();
    var forEach = require_foreach();
    var LN2_SQUARED = Math.LN2 * Math.LN2;
    var DEFAULTS = {
      errorRate: 5e-3
    };
    function stringToByteArray(string) {
      var array = new Uint16Array(string.length), i, l;
      for (i = 0, l = string.length; i < l; i++)
        array[i] = string.charCodeAt(i);
      return array;
    }
    function hashArray(length, seed, array) {
      var hash = murmurhash3(seed * 4221880213 & 4294967295, array);
      return hash % (length * 8);
    }
    function BloomFilter(capacityOrOptions) {
      var options = {};
      if (!capacityOrOptions)
        throw new Error("mnemonist/BloomFilter.constructor: a BloomFilter must be created with a capacity.");
      if (typeof capacityOrOptions === "object")
        options = capacityOrOptions;
      else
        options.capacity = capacityOrOptions;
      if (typeof options.capacity !== "number" || options.capacity <= 0)
        throw new Error("mnemonist/BloomFilter.constructor: `capacity` option should be a positive integer.");
      this.capacity = options.capacity;
      this.errorRate = options.errorRate || DEFAULTS.errorRate;
      if (typeof this.errorRate !== "number" || options.errorRate <= 0)
        throw new Error("mnemonist/BloomFilter.constructor: `errorRate` option should be a positive float.");
      this.clear();
    }
    BloomFilter.prototype.clear = function() {
      var bits = -1 / LN2_SQUARED * this.capacity * Math.log(this.errorRate), length = bits / 8 | 0;
      this.hashFunctions = length * 8 / this.capacity * Math.LN2 | 0;
      this.data = new Uint8Array(length);
      return;
    };
    BloomFilter.prototype.add = function(string) {
      var array = stringToByteArray(string);
      for (var i = 0, l = this.hashFunctions; i < l; i++) {
        var index = hashArray(this.data.length, i, array), position = 1 << (7 & index);
        this.data[index >> 3] |= position;
      }
      return this;
    };
    BloomFilter.prototype.test = function(string) {
      var array = stringToByteArray(string);
      for (var i = 0, l = this.hashFunctions; i < l; i++) {
        var index = hashArray(this.data.length, i, array);
        if (!(this.data[index >> 3] & 1 << (7 & index)))
          return false;
      }
      return true;
    };
    BloomFilter.prototype.toJSON = function() {
      return this.data;
    };
    BloomFilter.from = function(iterable, options) {
      if (!options) {
        options = iterable.length || iterable.size;
        if (typeof options !== "number")
          throw new Error("BloomFilter.from: could not infer the filter's capacity. Try passing it as second argument.");
      }
      var filter8 = new BloomFilter(options);
      forEach(iterable, function(value) {
        filter8.add(value);
      });
      return filter8;
    };
    module2.exports = BloomFilter;
  }
});

// node_modules/mnemonist/bk-tree.js
var require_bk_tree = __commonJS({
  "node_modules/mnemonist/bk-tree.js"(exports2, module2) {
    var forEach = require_foreach();
    function BKTree(distance) {
      if (typeof distance !== "function")
        throw new Error("mnemonist/BKTree.constructor: given `distance` should be a function.");
      this.distance = distance;
      this.clear();
    }
    BKTree.prototype.add = function(item) {
      if (!this.root) {
        this.root = {
          item,
          children: {}
        };
        this.size++;
        return this;
      }
      var node = this.root, d;
      while (true) {
        d = this.distance(item, node.item);
        if (!node.children[d])
          break;
        node = node.children[d];
      }
      node.children[d] = {
        item,
        children: {}
      };
      this.size++;
      return this;
    };
    BKTree.prototype.search = function(n, query) {
      if (!this.root)
        return [];
      var found = [], stack = [this.root], node, child, d, i, l;
      while (stack.length) {
        node = stack.pop();
        d = this.distance(query, node.item);
        if (d <= n)
          found.push({ item: node.item, distance: d });
        for (i = d - n, l = d + n + 1; i < l; i++) {
          child = node.children[i];
          if (child)
            stack.push(child);
        }
      }
      return found;
    };
    BKTree.prototype.clear = function() {
      this.size = 0;
      this.root = null;
    };
    BKTree.prototype.toJSON = function() {
      return this.root;
    };
    BKTree.prototype.inspect = function() {
      var array = [], stack = [this.root], node, d;
      while (stack.length) {
        node = stack.pop();
        if (!node)
          continue;
        array.push(node.item);
        for (d in node.children)
          stack.push(node.children[d]);
      }
      Object.defineProperty(array, "constructor", {
        value: BKTree,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      BKTree.prototype[Symbol.for("nodejs.util.inspect.custom")] = BKTree.prototype.inspect;
    BKTree.from = function(iterable, distance) {
      var tree = new BKTree(distance);
      forEach(iterable, function(value) {
        tree.add(value);
      });
      return tree;
    };
    module2.exports = BKTree;
  }
});

// node_modules/mnemonist/fixed-deque.js
var require_fixed_deque = __commonJS({
  "node_modules/mnemonist/fixed-deque.js"(exports2, module2) {
    var iterables = require_iterables();
    var Iterator = require_iterator2();
    function FixedDeque(ArrayClass, capacity) {
      if (arguments.length < 2)
        throw new Error("mnemonist/fixed-deque: expecting an Array class and a capacity.");
      if (typeof capacity !== "number" || capacity <= 0)
        throw new Error("mnemonist/fixed-deque: `capacity` should be a positive number.");
      this.ArrayClass = ArrayClass;
      this.capacity = capacity;
      this.items = new ArrayClass(this.capacity);
      this.clear();
    }
    FixedDeque.prototype.clear = function() {
      this.start = 0;
      this.size = 0;
    };
    FixedDeque.prototype.push = function(item) {
      if (this.size === this.capacity)
        throw new Error("mnemonist/fixed-deque.push: deque capacity (" + this.capacity + ") exceeded!");
      var index = this.start + this.size;
      if (index >= this.capacity)
        index -= this.capacity;
      this.items[index] = item;
      return ++this.size;
    };
    FixedDeque.prototype.unshift = function(item) {
      if (this.size === this.capacity)
        throw new Error("mnemonist/fixed-deque.unshift: deque capacity (" + this.capacity + ") exceeded!");
      var index = this.start - 1;
      if (this.start === 0)
        index = this.capacity - 1;
      this.items[index] = item;
      this.start = index;
      return ++this.size;
    };
    FixedDeque.prototype.pop = function() {
      if (this.size === 0)
        return;
      this.size--;
      var index = this.start + this.size;
      if (index >= this.capacity)
        index -= this.capacity;
      return this.items[index];
    };
    FixedDeque.prototype.shift = function() {
      if (this.size === 0)
        return;
      var index = this.start;
      this.size--;
      this.start++;
      if (this.start === this.capacity)
        this.start = 0;
      return this.items[index];
    };
    FixedDeque.prototype.peekFirst = function() {
      if (this.size === 0)
        return;
      return this.items[this.start];
    };
    FixedDeque.prototype.peekLast = function() {
      if (this.size === 0)
        return;
      var index = this.start + this.size - 1;
      if (index >= this.capacity)
        index -= this.capacity;
      return this.items[index];
    };
    FixedDeque.prototype.get = function(index) {
      if (this.size === 0 || index >= this.capacity)
        return;
      index = this.start + index;
      if (index >= this.capacity)
        index -= this.capacity;
      return this.items[index];
    };
    FixedDeque.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      var c = this.capacity, l = this.size, i = this.start, j = 0;
      while (j < l) {
        callback.call(scope, this.items[i], j, this);
        i++;
        j++;
        if (i === c)
          i = 0;
      }
    };
    FixedDeque.prototype.toArray = function() {
      var offset = this.start + this.size;
      if (offset < this.capacity)
        return this.items.slice(this.start, offset);
      var array = new this.ArrayClass(this.size), c = this.capacity, l = this.size, i = this.start, j = 0;
      while (j < l) {
        array[j] = this.items[i];
        i++;
        j++;
        if (i === c)
          i = 0;
      }
      return array;
    };
    FixedDeque.prototype.values = function() {
      var items = this.items, c = this.capacity, l = this.size, i = this.start, j = 0;
      return new Iterator(function() {
        if (j >= l)
          return {
            done: true
          };
        var value = items[i];
        i++;
        j++;
        if (i === c)
          i = 0;
        return {
          value,
          done: false
        };
      });
    };
    FixedDeque.prototype.entries = function() {
      var items = this.items, c = this.capacity, l = this.size, i = this.start, j = 0;
      return new Iterator(function() {
        if (j >= l)
          return {
            done: true
          };
        var value = items[i];
        i++;
        if (i === c)
          i = 0;
        return {
          value: [j++, value],
          done: false
        };
      });
    };
    if (typeof Symbol !== "undefined")
      FixedDeque.prototype[Symbol.iterator] = FixedDeque.prototype.values;
    FixedDeque.prototype.inspect = function() {
      var array = this.toArray();
      array.type = this.ArrayClass.name;
      array.capacity = this.capacity;
      Object.defineProperty(array, "constructor", {
        value: FixedDeque,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      FixedDeque.prototype[Symbol.for("nodejs.util.inspect.custom")] = FixedDeque.prototype.inspect;
    FixedDeque.from = function(iterable, ArrayClass, capacity) {
      if (arguments.length < 3) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/fixed-deque.from: could not guess iterable length. Please provide desired capacity as last argument.");
      }
      var deque = new FixedDeque(ArrayClass, capacity);
      if (iterables.isArrayLike(iterable)) {
        var i, l;
        for (i = 0, l = iterable.length; i < l; i++)
          deque.items[i] = iterable[i];
        deque.size = l;
        return deque;
      }
      iterables.forEach(iterable, function(value) {
        deque.push(value);
      });
      return deque;
    };
    module2.exports = FixedDeque;
  }
});

// node_modules/mnemonist/circular-buffer.js
var require_circular_buffer = __commonJS({
  "node_modules/mnemonist/circular-buffer.js"(exports2, module2) {
    var iterables = require_iterables();
    var FixedDeque = require_fixed_deque();
    function CircularBuffer(ArrayClass, capacity) {
      if (arguments.length < 2)
        throw new Error("mnemonist/circular-buffer: expecting an Array class and a capacity.");
      if (typeof capacity !== "number" || capacity <= 0)
        throw new Error("mnemonist/circular-buffer: `capacity` should be a positive number.");
      this.ArrayClass = ArrayClass;
      this.capacity = capacity;
      this.items = new ArrayClass(this.capacity);
      this.clear();
    }
    function paste(name) {
      CircularBuffer.prototype[name] = FixedDeque.prototype[name];
    }
    Object.keys(FixedDeque.prototype).forEach(paste);
    if (typeof Symbol !== "undefined")
      Object.getOwnPropertySymbols(FixedDeque.prototype).forEach(paste);
    CircularBuffer.prototype.push = function(item) {
      var index = this.start + this.size;
      if (index >= this.capacity)
        index -= this.capacity;
      this.items[index] = item;
      if (this.size === this.capacity) {
        index++;
        if (index >= this.capacity) {
          this.start = 0;
        } else {
          this.start = index;
        }
        return this.size;
      }
      return ++this.size;
    };
    CircularBuffer.prototype.unshift = function(item) {
      var index = this.start - 1;
      if (this.start === 0)
        index = this.capacity - 1;
      this.items[index] = item;
      if (this.size === this.capacity) {
        this.start = index;
        return this.size;
      }
      this.start = index;
      return ++this.size;
    };
    CircularBuffer.from = function(iterable, ArrayClass, capacity) {
      if (arguments.length < 3) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/circular-buffer.from: could not guess iterable length. Please provide desired capacity as last argument.");
      }
      var buffer = new CircularBuffer(ArrayClass, capacity);
      if (iterables.isArrayLike(iterable)) {
        var i, l;
        for (i = 0, l = iterable.length; i < l; i++)
          buffer.items[i] = iterable[i];
        buffer.size = l;
        return buffer;
      }
      iterables.forEach(iterable, function(value) {
        buffer.push(value);
      });
      return buffer;
    };
    module2.exports = CircularBuffer;
  }
});

// node_modules/mnemonist/default-map.js
var require_default_map = __commonJS({
  "node_modules/mnemonist/default-map.js"(exports2, module2) {
    function DefaultMap(factory) {
      if (typeof factory !== "function")
        throw new Error("mnemonist/DefaultMap.constructor: expecting a function.");
      this.items = /* @__PURE__ */ new Map();
      this.factory = factory;
      this.size = 0;
    }
    DefaultMap.prototype.clear = function() {
      this.items.clear();
      this.size = 0;
    };
    DefaultMap.prototype.get = function(key) {
      var value = this.items.get(key);
      if (typeof value === "undefined") {
        value = this.factory(key, this.size);
        this.items.set(key, value);
        this.size++;
      }
      return value;
    };
    DefaultMap.prototype.peek = function(key) {
      return this.items.get(key);
    };
    DefaultMap.prototype.set = function(key, value) {
      this.items.set(key, value);
      this.size = this.items.size;
      return this;
    };
    DefaultMap.prototype.has = function(key) {
      return this.items.has(key);
    };
    DefaultMap.prototype.delete = function(key) {
      var deleted = this.items.delete(key);
      this.size = this.items.size;
      return deleted;
    };
    DefaultMap.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      this.items.forEach(callback, scope);
    };
    DefaultMap.prototype.entries = function() {
      return this.items.entries();
    };
    DefaultMap.prototype.keys = function() {
      return this.items.keys();
    };
    DefaultMap.prototype.values = function() {
      return this.items.values();
    };
    if (typeof Symbol !== "undefined")
      DefaultMap.prototype[Symbol.iterator] = DefaultMap.prototype.entries;
    DefaultMap.prototype.inspect = function() {
      return this.items;
    };
    if (typeof Symbol !== "undefined")
      DefaultMap.prototype[Symbol.for("nodejs.util.inspect.custom")] = DefaultMap.prototype.inspect;
    DefaultMap.autoIncrement = function() {
      var i = 0;
      return function() {
        return i++;
      };
    };
    module2.exports = DefaultMap;
  }
});

// node_modules/mnemonist/default-weak-map.js
var require_default_weak_map = __commonJS({
  "node_modules/mnemonist/default-weak-map.js"(exports2, module2) {
    function DefaultWeakMap(factory) {
      if (typeof factory !== "function")
        throw new Error("mnemonist/DefaultWeakMap.constructor: expecting a function.");
      this.items = /* @__PURE__ */ new WeakMap();
      this.factory = factory;
    }
    DefaultWeakMap.prototype.clear = function() {
      this.items = /* @__PURE__ */ new WeakMap();
    };
    DefaultWeakMap.prototype.get = function(key) {
      var value = this.items.get(key);
      if (typeof value === "undefined") {
        value = this.factory(key);
        this.items.set(key, value);
      }
      return value;
    };
    DefaultWeakMap.prototype.peek = function(key) {
      return this.items.get(key);
    };
    DefaultWeakMap.prototype.set = function(key, value) {
      this.items.set(key, value);
      return this;
    };
    DefaultWeakMap.prototype.has = function(key) {
      return this.items.has(key);
    };
    DefaultWeakMap.prototype.delete = function(key) {
      return this.items.delete(key);
    };
    DefaultWeakMap.prototype.inspect = function() {
      return this.items;
    };
    if (typeof Symbol !== "undefined")
      DefaultWeakMap.prototype[Symbol.for("nodejs.util.inspect.custom")] = DefaultWeakMap.prototype.inspect;
    module2.exports = DefaultWeakMap;
  }
});

// node_modules/mnemonist/static-disjoint-set.js
var require_static_disjoint_set = __commonJS({
  "node_modules/mnemonist/static-disjoint-set.js"(exports2, module2) {
    var helpers = require_typed_arrays();
    function StaticDisjointSet(size) {
      var ParentsTypedArray = helpers.getPointerArray(size), RanksTypedArray = helpers.getPointerArray(Math.log2(size));
      this.size = size;
      this.dimension = size;
      this.parents = new ParentsTypedArray(size);
      this.ranks = new RanksTypedArray(size);
      for (var i = 0; i < size; i++)
        this.parents[i] = i;
    }
    StaticDisjointSet.prototype.find = function(x) {
      var y = x;
      var c, p;
      while (true) {
        c = this.parents[y];
        if (y === c)
          break;
        y = c;
      }
      while (true) {
        p = this.parents[x];
        if (p === y)
          break;
        this.parents[x] = y;
        x = p;
      }
      return y;
    };
    StaticDisjointSet.prototype.union = function(x, y) {
      var xRoot = this.find(x), yRoot = this.find(y);
      if (xRoot === yRoot)
        return this;
      this.dimension--;
      var xRank = this.ranks[x], yRank = this.ranks[y];
      if (xRank < yRank) {
        this.parents[xRoot] = yRoot;
      } else if (xRank > yRank) {
        this.parents[yRoot] = xRoot;
      } else {
        this.parents[yRoot] = xRoot;
        this.ranks[xRoot]++;
      }
      return this;
    };
    StaticDisjointSet.prototype.connected = function(x, y) {
      var xRoot = this.find(x);
      return xRoot === this.find(y);
    };
    StaticDisjointSet.prototype.mapping = function() {
      var MappingClass = helpers.getPointerArray(this.dimension);
      var ids = {}, mapping = new MappingClass(this.size), c = 0;
      var r;
      for (var i = 0, l = this.parents.length; i < l; i++) {
        r = this.find(i);
        if (typeof ids[r] === "undefined") {
          mapping[i] = c;
          ids[r] = c++;
        } else {
          mapping[i] = ids[r];
        }
      }
      return mapping;
    };
    StaticDisjointSet.prototype.compile = function() {
      var ids = {}, result = new Array(this.dimension), c = 0;
      var r;
      for (var i = 0, l = this.parents.length; i < l; i++) {
        r = this.find(i);
        if (typeof ids[r] === "undefined") {
          result[c] = [i];
          ids[r] = c++;
        } else {
          result[ids[r]].push(i);
        }
      }
      return result;
    };
    StaticDisjointSet.prototype.inspect = function() {
      var array = this.compile();
      Object.defineProperty(array, "constructor", {
        value: StaticDisjointSet,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      StaticDisjointSet.prototype[Symbol.for("nodejs.util.inspect.custom")] = StaticDisjointSet.prototype.inspect;
    module2.exports = StaticDisjointSet;
  }
});

// node_modules/mnemonist/fixed-reverse-heap.js
var require_fixed_reverse_heap = __commonJS({
  "node_modules/mnemonist/fixed-reverse-heap.js"(exports2, module2) {
    var comparators = require_comparators();
    var Heap = require_heap();
    var DEFAULT_COMPARATOR = comparators.DEFAULT_COMPARATOR;
    var reverseComparator = comparators.reverseComparator;
    function siftUp(compare, heap, size, i) {
      var endIndex = size, startIndex = i, item = heap[i], childIndex = 2 * i + 1, rightIndex;
      while (childIndex < endIndex) {
        rightIndex = childIndex + 1;
        if (rightIndex < endIndex && compare(heap[childIndex], heap[rightIndex]) >= 0) {
          childIndex = rightIndex;
        }
        heap[i] = heap[childIndex];
        i = childIndex;
        childIndex = 2 * i + 1;
      }
      heap[i] = item;
      Heap.siftDown(compare, heap, startIndex, i);
    }
    function consume(ArrayClass, compare, heap, size) {
      var l = size, i = l;
      var array = new ArrayClass(size), lastItem, item;
      while (i > 0) {
        lastItem = heap[--i];
        if (i !== 0) {
          item = heap[0];
          heap[0] = lastItem;
          siftUp(compare, heap, --size, 0);
          lastItem = item;
        }
        array[i] = lastItem;
      }
      return array;
    }
    function FixedReverseHeap(ArrayClass, comparator, capacity) {
      if (arguments.length === 2) {
        capacity = comparator;
        comparator = null;
      }
      this.ArrayClass = ArrayClass;
      this.capacity = capacity;
      this.items = new ArrayClass(capacity);
      this.clear();
      this.comparator = comparator || DEFAULT_COMPARATOR;
      if (typeof capacity !== "number" && capacity <= 0)
        throw new Error("mnemonist/FixedReverseHeap.constructor: capacity should be a number > 0.");
      if (typeof this.comparator !== "function")
        throw new Error("mnemonist/FixedReverseHeap.constructor: given comparator should be a function.");
      this.comparator = reverseComparator(this.comparator);
    }
    FixedReverseHeap.prototype.clear = function() {
      this.size = 0;
    };
    FixedReverseHeap.prototype.push = function(item) {
      if (this.size < this.capacity) {
        this.items[this.size] = item;
        Heap.siftDown(this.comparator, this.items, 0, this.size);
        this.size++;
      } else {
        if (this.comparator(item, this.items[0]) > 0)
          Heap.replace(this.comparator, this.items, item);
      }
      return this.size;
    };
    FixedReverseHeap.prototype.peek = function() {
      return this.items[0];
    };
    FixedReverseHeap.prototype.consume = function() {
      var items = consume(this.ArrayClass, this.comparator, this.items, this.size);
      this.size = 0;
      return items;
    };
    FixedReverseHeap.prototype.toArray = function() {
      return consume(this.ArrayClass, this.comparator, this.items.slice(0, this.size), this.size);
    };
    FixedReverseHeap.prototype.inspect = function() {
      var proxy = this.toArray();
      Object.defineProperty(proxy, "constructor", {
        value: FixedReverseHeap,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      FixedReverseHeap.prototype[Symbol.for("nodejs.util.inspect.custom")] = FixedReverseHeap.prototype.inspect;
    module2.exports = FixedReverseHeap;
  }
});

// node_modules/mnemonist/fuzzy-map.js
var require_fuzzy_map = __commonJS({
  "node_modules/mnemonist/fuzzy-map.js"(exports2, module2) {
    var forEach = require_foreach();
    var identity = function(x) {
      return x;
    };
    function FuzzyMap(descriptor) {
      this.items = /* @__PURE__ */ new Map();
      this.clear();
      if (Array.isArray(descriptor)) {
        this.writeHashFunction = descriptor[0];
        this.readHashFunction = descriptor[1];
      } else {
        this.writeHashFunction = descriptor;
        this.readHashFunction = descriptor;
      }
      if (!this.writeHashFunction)
        this.writeHashFunction = identity;
      if (!this.readHashFunction)
        this.readHashFunction = identity;
      if (typeof this.writeHashFunction !== "function")
        throw new Error("mnemonist/FuzzyMap.constructor: invalid hash function given.");
      if (typeof this.readHashFunction !== "function")
        throw new Error("mnemonist/FuzzyMap.constructor: invalid hash function given.");
    }
    FuzzyMap.prototype.clear = function() {
      this.items.clear();
      this.size = 0;
    };
    FuzzyMap.prototype.add = function(item) {
      var key = this.writeHashFunction(item);
      this.items.set(key, item);
      this.size = this.items.size;
      return this;
    };
    FuzzyMap.prototype.set = function(key, item) {
      key = this.writeHashFunction(key);
      this.items.set(key, item);
      this.size = this.items.size;
      return this;
    };
    FuzzyMap.prototype.get = function(key) {
      key = this.readHashFunction(key);
      return this.items.get(key);
    };
    FuzzyMap.prototype.has = function(key) {
      key = this.readHashFunction(key);
      return this.items.has(key);
    };
    FuzzyMap.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      this.items.forEach(function(value) {
        callback.call(scope, value, value);
      });
    };
    FuzzyMap.prototype.values = function() {
      return this.items.values();
    };
    if (typeof Symbol !== "undefined")
      FuzzyMap.prototype[Symbol.iterator] = FuzzyMap.prototype.values;
    FuzzyMap.prototype.inspect = function() {
      var array = Array.from(this.items.values());
      Object.defineProperty(array, "constructor", {
        value: FuzzyMap,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      FuzzyMap.prototype[Symbol.for("nodejs.util.inspect.custom")] = FuzzyMap.prototype.inspect;
    FuzzyMap.from = function(iterable, descriptor, useSet) {
      var map3 = new FuzzyMap(descriptor);
      forEach(iterable, function(value, key) {
        if (useSet)
          map3.set(key, value);
        else
          map3.add(value);
      });
      return map3;
    };
    module2.exports = FuzzyMap;
  }
});

// node_modules/mnemonist/multi-map.js
var require_multi_map = __commonJS({
  "node_modules/mnemonist/multi-map.js"(exports2, module2) {
    var Iterator = require_iterator2();
    var forEach = require_foreach();
    function MultiMap(Container) {
      this.Container = Container || Array;
      this.items = /* @__PURE__ */ new Map();
      this.clear();
      Object.defineProperty(this.items, "constructor", {
        value: MultiMap,
        enumerable: false
      });
    }
    MultiMap.prototype.clear = function() {
      this.size = 0;
      this.dimension = 0;
      this.items.clear();
    };
    MultiMap.prototype.set = function(key, value) {
      var container = this.items.get(key), sizeBefore;
      if (!container) {
        this.dimension++;
        container = new this.Container();
        this.items.set(key, container);
      }
      if (this.Container === Set) {
        sizeBefore = container.size;
        container.add(value);
        if (sizeBefore < container.size)
          this.size++;
      } else {
        container.push(value);
        this.size++;
      }
      return this;
    };
    MultiMap.prototype.delete = function(key) {
      var container = this.items.get(key);
      if (!container)
        return false;
      this.size -= this.Container === Set ? container.size : container.length;
      this.dimension--;
      this.items.delete(key);
      return true;
    };
    MultiMap.prototype.remove = function(key, value) {
      var container = this.items.get(key), wasDeleted, index;
      if (!container)
        return false;
      if (this.Container === Set) {
        wasDeleted = container.delete(value);
        if (wasDeleted)
          this.size--;
        if (container.size === 0) {
          this.items.delete(key);
          this.dimension--;
        }
        return wasDeleted;
      } else {
        index = container.indexOf(value);
        if (index === -1)
          return false;
        this.size--;
        if (container.length === 1) {
          this.items.delete(key);
          this.dimension--;
          return true;
        }
        container.splice(index, 1);
        return true;
      }
    };
    MultiMap.prototype.has = function(key) {
      return this.items.has(key);
    };
    MultiMap.prototype.get = function(key) {
      return this.items.get(key);
    };
    MultiMap.prototype.multiplicity = function(key) {
      var container = this.items.get(key);
      if (typeof container === "undefined")
        return 0;
      return this.Container === Set ? container.size : container.length;
    };
    MultiMap.prototype.count = MultiMap.prototype.multiplicity;
    MultiMap.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      var key;
      function inner(value) {
        callback.call(scope, value, key);
      }
      this.items.forEach(function(container, k) {
        key = k;
        container.forEach(inner);
      });
    };
    MultiMap.prototype.forEachAssociation = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      this.items.forEach(callback, scope);
    };
    MultiMap.prototype.keys = function() {
      return this.items.keys();
    };
    MultiMap.prototype.values = function() {
      var iterator = this.items.values(), inContainer = false, countainer, step, i, l;
      if (this.Container === Set)
        return new Iterator(function next() {
          if (!inContainer) {
            step = iterator.next();
            if (step.done)
              return { done: true };
            inContainer = true;
            countainer = step.value.values();
          }
          step = countainer.next();
          if (step.done) {
            inContainer = false;
            return next();
          }
          return {
            done: false,
            value: step.value
          };
        });
      return new Iterator(function next() {
        if (!inContainer) {
          step = iterator.next();
          if (step.done)
            return { done: true };
          inContainer = true;
          countainer = step.value;
          i = 0;
          l = countainer.length;
        }
        if (i >= l) {
          inContainer = false;
          return next();
        }
        return {
          done: false,
          value: countainer[i++]
        };
      });
    };
    MultiMap.prototype.entries = function() {
      var iterator = this.items.entries(), inContainer = false, countainer, step, key, i, l;
      if (this.Container === Set)
        return new Iterator(function next() {
          if (!inContainer) {
            step = iterator.next();
            if (step.done)
              return { done: true };
            inContainer = true;
            key = step.value[0];
            countainer = step.value[1].values();
          }
          step = countainer.next();
          if (step.done) {
            inContainer = false;
            return next();
          }
          return {
            done: false,
            value: [key, step.value]
          };
        });
      return new Iterator(function next() {
        if (!inContainer) {
          step = iterator.next();
          if (step.done)
            return { done: true };
          inContainer = true;
          key = step.value[0];
          countainer = step.value[1];
          i = 0;
          l = countainer.length;
        }
        if (i >= l) {
          inContainer = false;
          return next();
        }
        return {
          done: false,
          value: [key, countainer[i++]]
        };
      });
    };
    MultiMap.prototype.containers = function() {
      return this.items.values();
    };
    MultiMap.prototype.associations = function() {
      return this.items.entries();
    };
    if (typeof Symbol !== "undefined")
      MultiMap.prototype[Symbol.iterator] = MultiMap.prototype.entries;
    MultiMap.prototype.inspect = function() {
      return this.items;
    };
    if (typeof Symbol !== "undefined")
      MultiMap.prototype[Symbol.for("nodejs.util.inspect.custom")] = MultiMap.prototype.inspect;
    MultiMap.prototype.toJSON = function() {
      return this.items;
    };
    MultiMap.from = function(iterable, Container) {
      var map3 = new MultiMap(Container);
      forEach(iterable, function(value, key) {
        map3.set(key, value);
      });
      return map3;
    };
    module2.exports = MultiMap;
  }
});

// node_modules/mnemonist/fuzzy-multi-map.js
var require_fuzzy_multi_map = __commonJS({
  "node_modules/mnemonist/fuzzy-multi-map.js"(exports2, module2) {
    var MultiMap = require_multi_map();
    var forEach = require_foreach();
    var identity = function(x) {
      return x;
    };
    function FuzzyMultiMap(descriptor, Container) {
      this.items = new MultiMap(Container);
      this.clear();
      if (Array.isArray(descriptor)) {
        this.writeHashFunction = descriptor[0];
        this.readHashFunction = descriptor[1];
      } else {
        this.writeHashFunction = descriptor;
        this.readHashFunction = descriptor;
      }
      if (!this.writeHashFunction)
        this.writeHashFunction = identity;
      if (!this.readHashFunction)
        this.readHashFunction = identity;
      if (typeof this.writeHashFunction !== "function")
        throw new Error("mnemonist/FuzzyMultiMap.constructor: invalid hash function given.");
      if (typeof this.readHashFunction !== "function")
        throw new Error("mnemonist/FuzzyMultiMap.constructor: invalid hash function given.");
    }
    FuzzyMultiMap.prototype.clear = function() {
      this.items.clear();
      this.size = 0;
      this.dimension = 0;
    };
    FuzzyMultiMap.prototype.add = function(item) {
      var key = this.writeHashFunction(item);
      this.items.set(key, item);
      this.size = this.items.size;
      this.dimension = this.items.dimension;
      return this;
    };
    FuzzyMultiMap.prototype.set = function(key, item) {
      key = this.writeHashFunction(key);
      this.items.set(key, item);
      this.size = this.items.size;
      this.dimension = this.items.dimension;
      return this;
    };
    FuzzyMultiMap.prototype.get = function(key) {
      key = this.readHashFunction(key);
      return this.items.get(key);
    };
    FuzzyMultiMap.prototype.has = function(key) {
      key = this.readHashFunction(key);
      return this.items.has(key);
    };
    FuzzyMultiMap.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      this.items.forEach(function(value) {
        callback.call(scope, value, value);
      });
    };
    FuzzyMultiMap.prototype.values = function() {
      return this.items.values();
    };
    if (typeof Symbol !== "undefined")
      FuzzyMultiMap.prototype[Symbol.iterator] = FuzzyMultiMap.prototype.values;
    FuzzyMultiMap.prototype.inspect = function() {
      var array = Array.from(this);
      Object.defineProperty(array, "constructor", {
        value: FuzzyMultiMap,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      FuzzyMultiMap.prototype[Symbol.for("nodejs.util.inspect.custom")] = FuzzyMultiMap.prototype.inspect;
    FuzzyMultiMap.from = function(iterable, descriptor, Container, useSet) {
      if (arguments.length === 3) {
        if (typeof Container === "boolean") {
          useSet = Container;
          Container = Array;
        }
      }
      var map3 = new FuzzyMultiMap(descriptor, Container);
      forEach(iterable, function(value, key) {
        if (useSet)
          map3.set(key, value);
        else
          map3.add(value);
      });
      return map3;
    };
    module2.exports = FuzzyMultiMap;
  }
});

// node_modules/mnemonist/hashed-array-tree.js
var require_hashed_array_tree = __commonJS({
  "node_modules/mnemonist/hashed-array-tree.js"(exports2, module2) {
    var DEFAULT_BLOCK_SIZE = 1024;
    function powerOfTwo(x) {
      return (x & x - 1) === 0;
    }
    function HashedArrayTree(ArrayClass, initialCapacityOrOptions) {
      if (arguments.length < 1)
        throw new Error("mnemonist/hashed-array-tree: expecting at least a byte array constructor.");
      var initialCapacity = initialCapacityOrOptions || 0, blockSize = DEFAULT_BLOCK_SIZE, initialLength = 0;
      if (typeof initialCapacityOrOptions === "object") {
        initialCapacity = initialCapacityOrOptions.initialCapacity || 0;
        initialLength = initialCapacityOrOptions.initialLength || 0;
        blockSize = initialCapacityOrOptions.blockSize || DEFAULT_BLOCK_SIZE;
      }
      if (!blockSize || !powerOfTwo(blockSize))
        throw new Error("mnemonist/hashed-array-tree: block size should be a power of two.");
      var capacity = Math.max(initialLength, initialCapacity), initialBlocks = Math.ceil(capacity / blockSize);
      this.ArrayClass = ArrayClass;
      this.length = initialLength;
      this.capacity = initialBlocks * blockSize;
      this.blockSize = blockSize;
      this.offsetMask = blockSize - 1;
      this.blockMask = Math.log2(blockSize);
      this.blocks = new Array(initialBlocks);
      for (var i = 0; i < initialBlocks; i++)
        this.blocks[i] = new this.ArrayClass(this.blockSize);
    }
    HashedArrayTree.prototype.set = function(index, value) {
      if (this.length < index)
        throw new Error("HashedArrayTree(" + this.ArrayClass.name + ").set: index out of bounds.");
      var block = index >> this.blockMask, i = index & this.offsetMask;
      this.blocks[block][i] = value;
      return this;
    };
    HashedArrayTree.prototype.get = function(index) {
      if (this.length < index)
        return;
      var block = index >> this.blockMask, i = index & this.offsetMask;
      return this.blocks[block][i];
    };
    HashedArrayTree.prototype.grow = function(capacity) {
      if (typeof capacity !== "number")
        capacity = this.capacity + this.blockSize;
      if (this.capacity >= capacity)
        return this;
      while (this.capacity < capacity) {
        this.blocks.push(new this.ArrayClass(this.blockSize));
        this.capacity += this.blockSize;
      }
      return this;
    };
    HashedArrayTree.prototype.resize = function(length) {
      if (length === this.length)
        return this;
      if (length < this.length) {
        this.length = length;
        return this;
      }
      this.length = length;
      this.grow(length);
      return this;
    };
    HashedArrayTree.prototype.push = function(value) {
      if (this.capacity === this.length)
        this.grow();
      var index = this.length;
      var block = index >> this.blockMask, i = index & this.offsetMask;
      this.blocks[block][i] = value;
      return ++this.length;
    };
    HashedArrayTree.prototype.pop = function() {
      if (this.length === 0)
        return;
      var lastBlock = this.blocks[this.blocks.length - 1];
      var i = --this.length & this.offsetMask;
      return lastBlock[i];
    };
    HashedArrayTree.prototype.inspect = function() {
      var proxy = new this.ArrayClass(this.length), block;
      for (var i = 0, l = this.length; i < l; i++) {
        block = i >> this.blockMask;
        proxy[i] = this.blocks[block][i & this.offsetMask];
      }
      proxy.type = this.ArrayClass.name;
      proxy.items = this.length;
      proxy.capacity = this.capacity;
      proxy.blockSize = this.blockSize;
      Object.defineProperty(proxy, "constructor", {
        value: HashedArrayTree,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      HashedArrayTree.prototype[Symbol.for("nodejs.util.inspect.custom")] = HashedArrayTree.prototype.inspect;
    module2.exports = HashedArrayTree;
  }
});

// node_modules/mnemonist/fixed-stack.js
var require_fixed_stack = __commonJS({
  "node_modules/mnemonist/fixed-stack.js"(exports2, module2) {
    var Iterator = require_iterator2();
    var iterables = require_iterables();
    function FixedStack(ArrayClass, capacity) {
      if (arguments.length < 2)
        throw new Error("mnemonist/fixed-stack: expecting an Array class and a capacity.");
      if (typeof capacity !== "number" || capacity <= 0)
        throw new Error("mnemonist/fixed-stack: `capacity` should be a positive number.");
      this.capacity = capacity;
      this.ArrayClass = ArrayClass;
      this.items = new this.ArrayClass(this.capacity);
      this.clear();
    }
    FixedStack.prototype.clear = function() {
      this.size = 0;
    };
    FixedStack.prototype.push = function(item) {
      if (this.size === this.capacity)
        throw new Error("mnemonist/fixed-stack.push: stack capacity (" + this.capacity + ") exceeded!");
      this.items[this.size++] = item;
      return this.size;
    };
    FixedStack.prototype.pop = function() {
      if (this.size === 0)
        return;
      return this.items[--this.size];
    };
    FixedStack.prototype.peek = function() {
      return this.items[this.size - 1];
    };
    FixedStack.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      for (var i = 0, l = this.items.length; i < l; i++)
        callback.call(scope, this.items[l - i - 1], i, this);
    };
    FixedStack.prototype.toArray = function() {
      var array = new this.ArrayClass(this.size), l = this.size - 1, i = this.size;
      while (i--)
        array[i] = this.items[l - i];
      return array;
    };
    FixedStack.prototype.values = function() {
      var items = this.items, l = this.size, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return {
            done: true
          };
        var value = items[l - i - 1];
        i++;
        return {
          value,
          done: false
        };
      });
    };
    FixedStack.prototype.entries = function() {
      var items = this.items, l = this.size, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return {
            done: true
          };
        var value = items[l - i - 1];
        return {
          value: [i++, value],
          done: false
        };
      });
    };
    if (typeof Symbol !== "undefined")
      FixedStack.prototype[Symbol.iterator] = FixedStack.prototype.values;
    FixedStack.prototype.toString = function() {
      return this.toArray().join(",");
    };
    FixedStack.prototype.toJSON = function() {
      return this.toArray();
    };
    FixedStack.prototype.inspect = function() {
      var array = this.toArray();
      array.type = this.ArrayClass.name;
      array.capacity = this.capacity;
      Object.defineProperty(array, "constructor", {
        value: FixedStack,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      FixedStack.prototype[Symbol.for("nodejs.util.inspect.custom")] = FixedStack.prototype.inspect;
    FixedStack.from = function(iterable, ArrayClass, capacity) {
      if (arguments.length < 3) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/fixed-stack.from: could not guess iterable length. Please provide desired capacity as last argument.");
      }
      var stack = new FixedStack(ArrayClass, capacity);
      if (iterables.isArrayLike(iterable)) {
        var i, l;
        for (i = 0, l = iterable.length; i < l; i++)
          stack.items[i] = iterable[i];
        stack.size = l;
        return stack;
      }
      iterables.forEach(iterable, function(value) {
        stack.push(value);
      });
      return stack;
    };
    module2.exports = FixedStack;
  }
});

// node_modules/mnemonist/static-interval-tree.js
var require_static_interval_tree = __commonJS({
  "node_modules/mnemonist/static-interval-tree.js"(exports2, module2) {
    var iterables = require_iterables();
    var typed = require_typed_arrays();
    var FixedStack = require_fixed_stack();
    function buildBST(intervals, endGetter, sortedIndices, tree, augmentations, i, low, high) {
      var mid = low + (high - low) / 2 | 0, midMinusOne = ~-mid, midPlusOne = -~mid;
      var current = sortedIndices[mid];
      tree[i] = current + 1;
      var end = endGetter ? endGetter(intervals[current]) : intervals[current][1];
      var left = i * 2 + 1, right = i * 2 + 2;
      var leftEnd = -Infinity, rightEnd = -Infinity;
      if (low <= midMinusOne) {
        leftEnd = buildBST(
          intervals,
          endGetter,
          sortedIndices,
          tree,
          augmentations,
          left,
          low,
          midMinusOne
        );
      }
      if (midPlusOne <= high) {
        rightEnd = buildBST(
          intervals,
          endGetter,
          sortedIndices,
          tree,
          augmentations,
          right,
          midPlusOne,
          high
        );
      }
      var augmentation = Math.max(end, leftEnd, rightEnd);
      var augmentationPointer = current;
      if (augmentation === leftEnd)
        augmentationPointer = augmentations[tree[left] - 1];
      else if (augmentation === rightEnd)
        augmentationPointer = augmentations[tree[right] - 1];
      augmentations[current] = augmentationPointer;
      return augmentation;
    }
    function StaticIntervalTree(intervals, getters) {
      this.size = intervals.length;
      this.intervals = intervals;
      var startGetter = null, endGetter = null;
      if (Array.isArray(getters)) {
        startGetter = getters[0];
        endGetter = getters[1];
      }
      var length = intervals.length;
      var IndicesArray = typed.getPointerArray(length + 1);
      var indices = new IndicesArray(length);
      var i;
      for (i = 1; i < length; i++)
        indices[i] = i;
      indices.sort(function(a, b) {
        a = intervals[a];
        b = intervals[b];
        if (startGetter) {
          a = startGetter(a);
          b = startGetter(b);
        } else {
          a = a[0];
          b = b[0];
        }
        if (a < b)
          return -1;
        if (a > b)
          return 1;
        return 0;
      });
      var height = Math.ceil(Math.log2(length + 1)), treeSize = Math.pow(2, height) - 1;
      var tree = new IndicesArray(treeSize);
      var augmentations = new IndicesArray(length);
      buildBST(
        intervals,
        endGetter,
        indices,
        tree,
        augmentations,
        0,
        0,
        length - 1
      );
      indices = null;
      this.height = height;
      this.tree = tree;
      this.augmentations = augmentations;
      this.startGetter = startGetter;
      this.endGetter = endGetter;
      this.stack = new FixedStack(IndicesArray, this.height);
    }
    StaticIntervalTree.prototype.intervalsContainingPoint = function(point) {
      var matches = [];
      var stack = this.stack;
      stack.clear();
      stack.push(0);
      var l = this.tree.length;
      var bstIndex, intervalIndex, interval, maxInterval, start, end, max, left, right;
      while (stack.size) {
        bstIndex = stack.pop();
        intervalIndex = this.tree[bstIndex] - 1;
        interval = this.intervals[intervalIndex];
        maxInterval = this.intervals[this.augmentations[intervalIndex]];
        max = this.endGetter ? this.endGetter(maxInterval) : maxInterval[1];
        if (point > max)
          continue;
        left = bstIndex * 2 + 1;
        if (left < l && this.tree[left] !== 0)
          stack.push(left);
        start = this.startGetter ? this.startGetter(interval) : interval[0];
        end = this.endGetter ? this.endGetter(interval) : interval[1];
        if (point >= start && point <= end)
          matches.push(interval);
        if (point < start)
          continue;
        right = bstIndex * 2 + 2;
        if (right < l && this.tree[right] !== 0)
          stack.push(right);
      }
      return matches;
    };
    StaticIntervalTree.prototype.intervalsOverlappingInterval = function(interval) {
      var intervalStart = this.startGetter ? this.startGetter(interval) : interval[0], intervalEnd = this.endGetter ? this.endGetter(interval) : interval[1];
      var matches = [];
      var stack = this.stack;
      stack.clear();
      stack.push(0);
      var l = this.tree.length;
      var bstIndex, intervalIndex, currentInterval, maxInterval, start, end, max, left, right;
      while (stack.size) {
        bstIndex = stack.pop();
        intervalIndex = this.tree[bstIndex] - 1;
        currentInterval = this.intervals[intervalIndex];
        maxInterval = this.intervals[this.augmentations[intervalIndex]];
        max = this.endGetter ? this.endGetter(maxInterval) : maxInterval[1];
        if (intervalStart > max)
          continue;
        left = bstIndex * 2 + 1;
        if (left < l && this.tree[left] !== 0)
          stack.push(left);
        start = this.startGetter ? this.startGetter(currentInterval) : currentInterval[0];
        end = this.endGetter ? this.endGetter(currentInterval) : currentInterval[1];
        if (intervalEnd >= start && intervalStart <= end)
          matches.push(currentInterval);
        if (intervalEnd < start)
          continue;
        right = bstIndex * 2 + 2;
        if (right < l && this.tree[right] !== 0)
          stack.push(right);
      }
      return matches;
    };
    StaticIntervalTree.prototype.inspect = function() {
      var proxy = this.intervals.slice();
      Object.defineProperty(proxy, "constructor", {
        value: StaticIntervalTree,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      StaticIntervalTree.prototype[Symbol.for("nodejs.util.inspect.custom")] = StaticIntervalTree.prototype.inspect;
    StaticIntervalTree.from = function(iterable, getters) {
      if (iterables.isArrayLike(iterable))
        return new StaticIntervalTree(iterable, getters);
      return new StaticIntervalTree(Array.from(iterable), getters);
    };
    module2.exports = StaticIntervalTree;
  }
});

// node_modules/mnemonist/utils/binary-search.js
var require_binary_search = __commonJS({
  "node_modules/mnemonist/utils/binary-search.js"(exports2) {
    exports2.search = function(array, value, lo, hi) {
      var mid = 0;
      lo = typeof lo !== "undefined" ? lo : 0;
      hi = typeof hi !== "undefined" ? hi : array.length;
      hi--;
      var current;
      while (lo <= hi) {
        mid = lo + hi >>> 1;
        current = array[mid];
        if (current > value) {
          hi = ~-mid;
        } else if (current < value) {
          lo = -~mid;
        } else {
          return mid;
        }
      }
      return -1;
    };
    exports2.searchWithComparator = function(comparator, array, value) {
      var mid = 0, lo = 0, hi = ~-array.length, comparison;
      while (lo <= hi) {
        mid = lo + hi >>> 1;
        comparison = comparator(array[mid], value);
        if (comparison > 0) {
          hi = ~-mid;
        } else if (comparison < 0) {
          lo = -~mid;
        } else {
          return mid;
        }
      }
      return -1;
    };
    exports2.lowerBound = function(array, value, lo, hi) {
      var mid = 0;
      lo = typeof lo !== "undefined" ? lo : 0;
      hi = typeof hi !== "undefined" ? hi : array.length;
      while (lo < hi) {
        mid = lo + hi >>> 1;
        if (value <= array[mid]) {
          hi = mid;
        } else {
          lo = -~mid;
        }
      }
      return lo;
    };
    exports2.lowerBoundWithComparator = function(comparator, array, value) {
      var mid = 0, lo = 0, hi = array.length;
      while (lo < hi) {
        mid = lo + hi >>> 1;
        if (comparator(value, array[mid]) <= 0) {
          hi = mid;
        } else {
          lo = -~mid;
        }
      }
      return lo;
    };
    exports2.lowerBoundIndices = function(array, indices, value, lo, hi) {
      var mid = 0;
      lo = typeof lo !== "undefined" ? lo : 0;
      hi = typeof hi !== "undefined" ? hi : array.length;
      while (lo < hi) {
        mid = lo + hi >>> 1;
        if (value <= array[indices[mid]]) {
          hi = mid;
        } else {
          lo = -~mid;
        }
      }
      return lo;
    };
    exports2.upperBound = function(array, value, lo, hi) {
      var mid = 0;
      lo = typeof lo !== "undefined" ? lo : 0;
      hi = typeof hi !== "undefined" ? hi : array.length;
      while (lo < hi) {
        mid = lo + hi >>> 1;
        if (value >= array[mid]) {
          lo = -~mid;
        } else {
          hi = mid;
        }
      }
      return lo;
    };
    exports2.upperBoundWithComparator = function(comparator, array, value) {
      var mid = 0, lo = 0, hi = array.length;
      while (lo < hi) {
        mid = lo + hi >>> 1;
        if (comparator(value, array[mid]) >= 0) {
          lo = -~mid;
        } else {
          hi = mid;
        }
      }
      return lo;
    };
  }
});

// node_modules/mnemonist/utils/merge.js
var require_merge3 = __commonJS({
  "node_modules/mnemonist/utils/merge.js"(exports2) {
    var typed = require_typed_arrays();
    var isArrayLike = require_iterables().isArrayLike;
    var binarySearch = require_binary_search();
    var FibonacciHeap = require_fibonacci_heap();
    function mergeArrays(a, b) {
      if (a.length === 0)
        return b.slice();
      if (b.length === 0)
        return a.slice();
      var tmp;
      if (a[0] > b[0]) {
        tmp = a;
        a = b;
        b = tmp;
      }
      var aEnd = a[a.length - 1], bStart = b[0];
      if (aEnd <= bStart) {
        if (typed.isTypedArray(a))
          return typed.concat(a, b);
        return a.concat(b);
      }
      var array = new a.constructor(a.length + b.length);
      var i, l, v;
      for (i = 0, l = a.length; i < l; i++) {
        v = a[i];
        if (v <= bStart)
          array[i] = v;
        else
          break;
      }
      var aPointer = i, aLength = a.length, bPointer = 0, bLength = b.length, aHead, bHead;
      while (aPointer < aLength && bPointer < bLength) {
        aHead = a[aPointer];
        bHead = b[bPointer];
        if (aHead <= bHead) {
          array[i++] = aHead;
          aPointer++;
        } else {
          array[i++] = bHead;
          bPointer++;
        }
      }
      while (aPointer < aLength)
        array[i++] = a[aPointer++];
      while (bPointer < bLength)
        array[i++] = b[bPointer++];
      return array;
    }
    function unionUniqueArrays(a, b) {
      if (a.length === 0)
        return b.slice();
      if (b.length === 0)
        return a.slice();
      var tmp;
      if (a[0] > b[0]) {
        tmp = a;
        a = b;
        b = tmp;
      }
      var aEnd = a[a.length - 1], bStart = b[0];
      if (aEnd < bStart) {
        if (typed.isTypedArray(a))
          return typed.concat(a, b);
        return a.concat(b);
      }
      var array = new a.constructor();
      var i, l, v;
      for (i = 0, l = a.length; i < l; i++) {
        v = a[i];
        if (v < bStart)
          array.push(v);
        else
          break;
      }
      var aPointer = i, aLength = a.length, bPointer = 0, bLength = b.length, aHead, bHead;
      while (aPointer < aLength && bPointer < bLength) {
        aHead = a[aPointer];
        bHead = b[bPointer];
        if (aHead <= bHead) {
          if (array.length === 0 || array[array.length - 1] !== aHead)
            array.push(aHead);
          aPointer++;
        } else {
          if (array.length === 0 || array[array.length - 1] !== bHead)
            array.push(bHead);
          bPointer++;
        }
      }
      while (aPointer < aLength) {
        aHead = a[aPointer++];
        if (array.length === 0 || array[array.length - 1] !== aHead)
          array.push(aHead);
      }
      while (bPointer < bLength) {
        bHead = b[bPointer++];
        if (array.length === 0 || array[array.length - 1] !== bHead)
          array.push(bHead);
      }
      return array;
    }
    exports2.intersectionUniqueArrays = function(a, b) {
      if (a.length === 0 || b.length === 0)
        return new a.constructor(0);
      var tmp;
      if (a[0] > b[0]) {
        tmp = a;
        a = b;
        b = tmp;
      }
      var aEnd = a[a.length - 1], bStart = b[0];
      if (aEnd < bStart)
        return new a.constructor(0);
      var array = new a.constructor();
      var aPointer = binarySearch.lowerBound(a, bStart), aLength = a.length, bPointer = 0, bLength = binarySearch.upperBound(b, aEnd), aHead, bHead;
      while (aPointer < aLength && bPointer < bLength) {
        aHead = a[aPointer];
        bHead = b[bPointer];
        if (aHead < bHead) {
          aPointer = binarySearch.lowerBound(a, bHead, aPointer + 1);
        } else if (aHead > bHead) {
          bPointer = binarySearch.lowerBound(b, aHead, bPointer + 1);
        } else {
          array.push(aHead);
          aPointer++;
          bPointer++;
        }
      }
      return array;
    };
    function kWayMergeArrays(arrays) {
      var length = 0, max = -Infinity, al, i, l;
      var filtered = [];
      for (i = 0, l = arrays.length; i < l; i++) {
        al = arrays[i].length;
        if (al === 0)
          continue;
        filtered.push(arrays[i]);
        length += al;
        if (al > max)
          max = al;
      }
      if (filtered.length === 0)
        return new arrays[0].constructor(0);
      if (filtered.length === 1)
        return filtered[0].slice();
      if (filtered.length === 2)
        return mergeArrays(filtered[0], filtered[1]);
      arrays = filtered;
      var array = new arrays[0].constructor(length);
      var PointerArray = typed.getPointerArray(max);
      var pointers = new PointerArray(arrays.length);
      var heap = new FibonacciHeap(function(a, b) {
        a = arrays[a][pointers[a]];
        b = arrays[b][pointers[b]];
        if (a < b)
          return -1;
        if (a > b)
          return 1;
        return 0;
      });
      for (i = 0; i < l; i++)
        heap.push(i);
      i = 0;
      var p, v;
      while (heap.size) {
        p = heap.pop();
        v = arrays[p][pointers[p]++];
        array[i++] = v;
        if (pointers[p] < arrays[p].length)
          heap.push(p);
      }
      return array;
    }
    function kWayUnionUniqueArrays(arrays) {
      var max = -Infinity, al, i, l;
      var filtered = [];
      for (i = 0, l = arrays.length; i < l; i++) {
        al = arrays[i].length;
        if (al === 0)
          continue;
        filtered.push(arrays[i]);
        if (al > max)
          max = al;
      }
      if (filtered.length === 0)
        return new arrays[0].constructor(0);
      if (filtered.length === 1)
        return filtered[0].slice();
      if (filtered.length === 2)
        return unionUniqueArrays(filtered[0], filtered[1]);
      arrays = filtered;
      var array = new arrays[0].constructor();
      var PointerArray = typed.getPointerArray(max);
      var pointers = new PointerArray(arrays.length);
      var heap = new FibonacciHeap(function(a, b) {
        a = arrays[a][pointers[a]];
        b = arrays[b][pointers[b]];
        if (a < b)
          return -1;
        if (a > b)
          return 1;
        return 0;
      });
      for (i = 0; i < l; i++)
        heap.push(i);
      var p, v;
      while (heap.size) {
        p = heap.pop();
        v = arrays[p][pointers[p]++];
        if (array.length === 0 || array[array.length - 1] !== v)
          array.push(v);
        if (pointers[p] < arrays[p].length)
          heap.push(p);
      }
      return array;
    }
    exports2.kWayIntersectionUniqueArrays = function(arrays) {
      var max = -Infinity, maxStart = -Infinity, minEnd = Infinity, first, last, al, i, l;
      for (i = 0, l = arrays.length; i < l; i++) {
        al = arrays[i].length;
        if (al === 0)
          return [];
        if (al > max)
          max = al;
        first = arrays[i][0];
        last = arrays[i][al - 1];
        if (first > maxStart)
          maxStart = first;
        if (last < minEnd)
          minEnd = last;
      }
      if (maxStart > minEnd)
        return [];
      if (maxStart === minEnd)
        return [maxStart];
      var a, b, array = arrays[0], aPointer, bPointer, aLimit, bLimit, aHead, bHead, start = maxStart;
      for (i = 1; i < l; i++) {
        a = array;
        b = arrays[i];
        array = new Array();
        aPointer = 0;
        bPointer = binarySearch.lowerBound(b, start);
        aLimit = a.length;
        bLimit = b.length;
        while (aPointer < aLimit && bPointer < bLimit) {
          aHead = a[aPointer];
          bHead = b[bPointer];
          if (aHead < bHead) {
            aPointer = binarySearch.lowerBound(a, bHead, aPointer + 1);
          } else if (aHead > bHead) {
            bPointer = binarySearch.lowerBound(b, aHead, bPointer + 1);
          } else {
            array.push(aHead);
            aPointer++;
            bPointer++;
          }
        }
        if (array.length === 0)
          return array;
        start = array[0];
      }
      return array;
    };
    exports2.merge = function() {
      if (arguments.length === 2) {
        if (isArrayLike(arguments[0]))
          return mergeArrays(arguments[0], arguments[1]);
      } else {
        if (isArrayLike(arguments[0]))
          return kWayMergeArrays(arguments);
      }
      return null;
    };
    exports2.unionUnique = function() {
      if (arguments.length === 2) {
        if (isArrayLike(arguments[0]))
          return unionUniqueArrays(arguments[0], arguments[1]);
      } else {
        if (isArrayLike(arguments[0]))
          return kWayUnionUniqueArrays(arguments);
      }
      return null;
    };
    exports2.intersectionUnique = function() {
      if (arguments.length === 2) {
        if (isArrayLike(arguments[0]))
          return exports2.intersectionUniqueArrays(arguments[0], arguments[1]);
      } else {
        if (isArrayLike(arguments[0]))
          return exports2.kWayIntersectionUniqueArrays(arguments);
      }
      return null;
    };
  }
});

// node_modules/mnemonist/inverted-index.js
var require_inverted_index = __commonJS({
  "node_modules/mnemonist/inverted-index.js"(exports2, module2) {
    var Iterator = require_iterator2();
    var forEach = require_foreach();
    var helpers = require_merge3();
    function identity(x) {
      return x;
    }
    function InvertedIndex(descriptor) {
      this.clear();
      if (Array.isArray(descriptor)) {
        this.documentTokenizer = descriptor[0];
        this.queryTokenizer = descriptor[1];
      } else {
        this.documentTokenizer = descriptor;
        this.queryTokenizer = descriptor;
      }
      if (!this.documentTokenizer)
        this.documentTokenizer = identity;
      if (!this.queryTokenizer)
        this.queryTokenizer = identity;
      if (typeof this.documentTokenizer !== "function")
        throw new Error("mnemonist/InvertedIndex.constructor: document tokenizer is not a function.");
      if (typeof this.queryTokenizer !== "function")
        throw new Error("mnemonist/InvertedIndex.constructor: query tokenizer is not a function.");
    }
    InvertedIndex.prototype.clear = function() {
      this.items = [];
      this.mapping = /* @__PURE__ */ new Map();
      this.size = 0;
      this.dimension = 0;
    };
    InvertedIndex.prototype.add = function(doc) {
      this.size++;
      var key = this.items.length;
      this.items.push(doc);
      var tokens = this.documentTokenizer(doc);
      if (!Array.isArray(tokens))
        throw new Error("mnemonist/InvertedIndex.add: tokenizer function should return an array of tokens.");
      var done = /* @__PURE__ */ new Set(), token, container;
      for (var i = 0, l = tokens.length; i < l; i++) {
        token = tokens[i];
        if (done.has(token))
          continue;
        done.add(token);
        container = this.mapping.get(token);
        if (!container) {
          container = [];
          this.mapping.set(token, container);
        }
        container.push(key);
      }
      this.dimension = this.mapping.size;
      return this;
    };
    InvertedIndex.prototype.get = function(query) {
      if (!this.size)
        return [];
      var tokens = this.queryTokenizer(query);
      if (!Array.isArray(tokens))
        throw new Error("mnemonist/InvertedIndex.query: tokenizer function should return an array of tokens.");
      if (!tokens.length)
        return [];
      var results = this.mapping.get(tokens[0]), c, i, l;
      if (typeof results === "undefined" || results.length === 0)
        return [];
      if (tokens.length > 1) {
        for (i = 1, l = tokens.length; i < l; i++) {
          c = this.mapping.get(tokens[i]);
          if (typeof c === "undefined" || c.length === 0)
            return [];
          results = helpers.intersectionUniqueArrays(results, c);
        }
      }
      var docs = new Array(results.length);
      for (i = 0, l = docs.length; i < l; i++)
        docs[i] = this.items[results[i]];
      return docs;
    };
    InvertedIndex.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      for (var i = 0, l = this.documents.length; i < l; i++)
        callback.call(scope, this.documents[i], i, this);
    };
    InvertedIndex.prototype.documents = function() {
      var documents = this.items, l = documents.length, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return {
            done: true
          };
        var value = documents[i++];
        return {
          value,
          done: false
        };
      });
    };
    InvertedIndex.prototype.tokens = function() {
      return this.mapping.keys();
    };
    if (typeof Symbol !== "undefined")
      InvertedIndex.prototype[Symbol.iterator] = InvertedIndex.prototype.documents;
    InvertedIndex.prototype.inspect = function() {
      var array = this.items.slice();
      Object.defineProperty(array, "constructor", {
        value: InvertedIndex,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      InvertedIndex.prototype[Symbol.for("nodejs.util.inspect.custom")] = InvertedIndex.prototype.inspect;
    InvertedIndex.from = function(iterable, descriptor) {
      var index = new InvertedIndex(descriptor);
      forEach(iterable, function(doc) {
        index.add(doc);
      });
      return index;
    };
    module2.exports = InvertedIndex;
  }
});

// node_modules/mnemonist/sort/quick.js
var require_quick = __commonJS({
  "node_modules/mnemonist/sort/quick.js"(exports2) {
    var LOS = new Float64Array(64);
    var HIS = new Float64Array(64);
    function inplaceQuickSort(array, lo, hi) {
      var p, i, l, r, swap;
      LOS[0] = lo;
      HIS[0] = hi;
      i = 0;
      while (i >= 0) {
        l = LOS[i];
        r = HIS[i] - 1;
        if (l < r) {
          p = array[l];
          while (l < r) {
            while (array[r] >= p && l < r)
              r--;
            if (l < r)
              array[l++] = array[r];
            while (array[l] <= p && l < r)
              l++;
            if (l < r)
              array[r--] = array[l];
          }
          array[l] = p;
          LOS[i + 1] = l + 1;
          HIS[i + 1] = HIS[i];
          HIS[i++] = l;
          if (HIS[i] - LOS[i] > HIS[i - 1] - LOS[i - 1]) {
            swap = LOS[i];
            LOS[i] = LOS[i - 1];
            LOS[i - 1] = swap;
            swap = HIS[i];
            HIS[i] = HIS[i - 1];
            HIS[i - 1] = swap;
          }
        } else {
          i--;
        }
      }
      return array;
    }
    exports2.inplaceQuickSort = inplaceQuickSort;
    function inplaceQuickSortIndices(array, indices, lo, hi) {
      var p, i, l, r, t, swap;
      LOS[0] = lo;
      HIS[0] = hi;
      i = 0;
      while (i >= 0) {
        l = LOS[i];
        r = HIS[i] - 1;
        if (l < r) {
          t = indices[l];
          p = array[t];
          while (l < r) {
            while (array[indices[r]] >= p && l < r)
              r--;
            if (l < r)
              indices[l++] = indices[r];
            while (array[indices[l]] <= p && l < r)
              l++;
            if (l < r)
              indices[r--] = indices[l];
          }
          indices[l] = t;
          LOS[i + 1] = l + 1;
          HIS[i + 1] = HIS[i];
          HIS[i++] = l;
          if (HIS[i] - LOS[i] > HIS[i - 1] - LOS[i - 1]) {
            swap = LOS[i];
            LOS[i] = LOS[i - 1];
            LOS[i - 1] = swap;
            swap = HIS[i];
            HIS[i] = HIS[i - 1];
            HIS[i - 1] = swap;
          }
        } else {
          i--;
        }
      }
      return indices;
    }
    exports2.inplaceQuickSortIndices = inplaceQuickSortIndices;
  }
});

// node_modules/mnemonist/kd-tree.js
var require_kd_tree = __commonJS({
  "node_modules/mnemonist/kd-tree.js"(exports2, module2) {
    var iterables = require_iterables();
    var typed = require_typed_arrays();
    var createTupleComparator = require_comparators().createTupleComparator;
    var FixedReverseHeap = require_fixed_reverse_heap();
    var inplaceQuickSortIndices = require_quick().inplaceQuickSortIndices;
    function squaredDistanceAxes(dimensions, axes, pivot, b) {
      var d;
      var dist = 0, step;
      for (d = 0; d < dimensions; d++) {
        step = axes[d][pivot] - b[d];
        dist += step * step;
      }
      return dist;
    }
    function reshapeIntoAxes(dimensions, data) {
      var l = data.length;
      var axes = new Array(dimensions), labels = new Array(l), axis;
      var PointerArray = typed.getPointerArray(l);
      var ids = new PointerArray(l);
      var d, i, row;
      var f = true;
      for (d = 0; d < dimensions; d++) {
        axis = new Float64Array(l);
        for (i = 0; i < l; i++) {
          row = data[i];
          axis[i] = row[1][d];
          if (f) {
            labels[i] = row[0];
            ids[i] = i;
          }
        }
        f = false;
        axes[d] = axis;
      }
      return { axes, ids, labels };
    }
    function buildTree(dimensions, axes, ids, labels) {
      var l = labels.length;
      var PointerArray = typed.getPointerArray(l + 1);
      var pivots = new PointerArray(l), lefts = new PointerArray(l), rights = new PointerArray(l);
      var stack = [[0, 0, ids.length, -1, 0]], step, parent, direction, median, pivot, lo, hi;
      var d, i = 0;
      while (stack.length !== 0) {
        step = stack.pop();
        d = step[0];
        lo = step[1];
        hi = step[2];
        parent = step[3];
        direction = step[4];
        inplaceQuickSortIndices(axes[d], ids, lo, hi);
        l = hi - lo;
        median = lo + (l >>> 1);
        pivot = ids[median];
        pivots[i] = pivot;
        if (parent > -1) {
          if (direction === 0)
            lefts[parent] = i + 1;
          else
            rights[parent] = i + 1;
        }
        d = (d + 1) % dimensions;
        if (median !== lo && median !== hi - 1) {
          stack.push([d, median + 1, hi, i, 1]);
        }
        if (median !== lo) {
          stack.push([d, lo, median, i, 0]);
        }
        i++;
      }
      return {
        axes,
        labels,
        pivots,
        lefts,
        rights
      };
    }
    function KDTree(dimensions, build) {
      this.dimensions = dimensions;
      this.visited = 0;
      this.axes = build.axes;
      this.labels = build.labels;
      this.pivots = build.pivots;
      this.lefts = build.lefts;
      this.rights = build.rights;
      this.size = this.labels.length;
    }
    KDTree.prototype.nearestNeighbor = function(query) {
      var bestDistance = Infinity, best = null;
      var dimensions = this.dimensions, axes = this.axes, pivots = this.pivots, lefts = this.lefts, rights = this.rights;
      var visited = 0;
      function recurse(d, node) {
        visited++;
        var left = lefts[node], right = rights[node], pivot = pivots[node];
        var dist = squaredDistanceAxes(
          dimensions,
          axes,
          pivot,
          query
        );
        if (dist < bestDistance) {
          best = pivot;
          bestDistance = dist;
          if (dist === 0)
            return;
        }
        var dx = axes[d][pivot] - query[d];
        d = (d + 1) % dimensions;
        if (dx > 0) {
          if (left !== 0)
            recurse(d, left - 1);
        } else {
          if (right !== 0)
            recurse(d, right - 1);
        }
        if (dx * dx < bestDistance) {
          if (dx > 0) {
            if (right !== 0)
              recurse(d, right - 1);
          } else {
            if (left !== 0)
              recurse(d, left - 1);
          }
        }
      }
      recurse(0, 0);
      this.visited = visited;
      return this.labels[best];
    };
    var KNN_HEAP_COMPARATOR_3 = createTupleComparator(3);
    var KNN_HEAP_COMPARATOR_2 = createTupleComparator(2);
    KDTree.prototype.kNearestNeighbors = function(k, query) {
      if (k <= 0)
        throw new Error("mnemonist/kd-tree.kNearestNeighbors: k should be a positive number.");
      k = Math.min(k, this.size);
      if (k === 1)
        return [this.nearestNeighbor(query)];
      var heap = new FixedReverseHeap(Array, KNN_HEAP_COMPARATOR_3, k);
      var dimensions = this.dimensions, axes = this.axes, pivots = this.pivots, lefts = this.lefts, rights = this.rights;
      var visited = 0;
      function recurse(d, node) {
        var left = lefts[node], right = rights[node], pivot = pivots[node];
        var dist = squaredDistanceAxes(
          dimensions,
          axes,
          pivot,
          query
        );
        heap.push([dist, visited++, pivot]);
        var point = query[d], split = axes[d][pivot], dx = point - split;
        d = (d + 1) % dimensions;
        if (point < split) {
          if (left !== 0) {
            recurse(d, left - 1);
          }
        } else {
          if (right !== 0) {
            recurse(d, right - 1);
          }
        }
        if (dx * dx < heap.peek()[0] || heap.size < k) {
          if (point < split) {
            if (right !== 0) {
              recurse(d, right - 1);
            }
          } else {
            if (left !== 0) {
              recurse(d, left - 1);
            }
          }
        }
      }
      recurse(0, 0);
      this.visited = visited;
      var best = heap.consume();
      for (var i = 0; i < best.length; i++)
        best[i] = this.labels[best[i][2]];
      return best;
    };
    KDTree.prototype.linearKNearestNeighbors = function(k, query) {
      if (k <= 0)
        throw new Error("mnemonist/kd-tree.kNearestNeighbors: k should be a positive number.");
      k = Math.min(k, this.size);
      var heap = new FixedReverseHeap(Array, KNN_HEAP_COMPARATOR_2, k);
      var i, l, dist;
      for (i = 0, l = this.size; i < l; i++) {
        dist = squaredDistanceAxes(
          this.dimensions,
          this.axes,
          this.pivots[i],
          query
        );
        heap.push([dist, i]);
      }
      var best = heap.consume();
      for (i = 0; i < best.length; i++)
        best[i] = this.labels[this.pivots[best[i][1]]];
      return best;
    };
    KDTree.prototype.inspect = function() {
      var dummy = /* @__PURE__ */ new Map();
      dummy.dimensions = this.dimensions;
      Object.defineProperty(dummy, "constructor", {
        value: KDTree,
        enumerable: false
      });
      var i, j, point;
      for (i = 0; i < this.size; i++) {
        point = new Array(this.dimensions);
        for (j = 0; j < this.dimensions; j++)
          point[j] = this.axes[j][i];
        dummy.set(this.labels[i], point);
      }
      return dummy;
    };
    if (typeof Symbol !== "undefined")
      KDTree.prototype[Symbol.for("nodejs.util.inspect.custom")] = KDTree.prototype.inspect;
    KDTree.from = function(iterable, dimensions) {
      var data = iterables.toArray(iterable);
      var reshaped = reshapeIntoAxes(dimensions, data);
      var result = buildTree(dimensions, reshaped.axes, reshaped.ids, reshaped.labels);
      return new KDTree(dimensions, result);
    };
    KDTree.fromAxes = function(axes, labels) {
      if (!labels)
        labels = typed.indices(axes[0].length);
      var dimensions = axes.length;
      var result = buildTree(axes.length, axes, typed.indices(labels.length), labels);
      return new KDTree(dimensions, result);
    };
    module2.exports = KDTree;
  }
});

// node_modules/mnemonist/linked-list.js
var require_linked_list = __commonJS({
  "node_modules/mnemonist/linked-list.js"(exports2, module2) {
    var Iterator = require_iterator2();
    var forEach = require_foreach();
    function LinkedList() {
      this.clear();
    }
    LinkedList.prototype.clear = function() {
      this.head = null;
      this.tail = null;
      this.size = 0;
    };
    LinkedList.prototype.first = function() {
      return this.head ? this.head.item : void 0;
    };
    LinkedList.prototype.peek = LinkedList.prototype.first;
    LinkedList.prototype.last = function() {
      return this.tail ? this.tail.item : void 0;
    };
    LinkedList.prototype.push = function(item) {
      var node = { item, next: null };
      if (!this.head) {
        this.head = node;
        this.tail = node;
      } else {
        this.tail.next = node;
        this.tail = node;
      }
      this.size++;
      return this.size;
    };
    LinkedList.prototype.unshift = function(item) {
      var node = { item, next: null };
      if (!this.head) {
        this.head = node;
        this.tail = node;
      } else {
        if (!this.head.next)
          this.tail = this.head;
        node.next = this.head;
        this.head = node;
      }
      this.size++;
      return this.size;
    };
    LinkedList.prototype.shift = function() {
      if (!this.size)
        return void 0;
      var node = this.head;
      this.head = node.next;
      this.size--;
      return node.item;
    };
    LinkedList.prototype.forEach = function(callback, scope) {
      if (!this.size)
        return;
      scope = arguments.length > 1 ? scope : this;
      var n = this.head, i = 0;
      while (n) {
        callback.call(scope, n.item, i, this);
        n = n.next;
        i++;
      }
    };
    LinkedList.prototype.toArray = function() {
      if (!this.size)
        return [];
      var array = new Array(this.size);
      for (var i = 0, l = this.size, n = this.head; i < l; i++) {
        array[i] = n.item;
        n = n.next;
      }
      return array;
    };
    LinkedList.prototype.values = function() {
      var n = this.head;
      return new Iterator(function() {
        if (!n)
          return {
            done: true
          };
        var value = n.item;
        n = n.next;
        return {
          value,
          done: false
        };
      });
    };
    LinkedList.prototype.entries = function() {
      var n = this.head, i = 0;
      return new Iterator(function() {
        if (!n)
          return {
            done: true
          };
        var value = n.item;
        n = n.next;
        i++;
        return {
          value: [i - 1, value],
          done: false
        };
      });
    };
    if (typeof Symbol !== "undefined")
      LinkedList.prototype[Symbol.iterator] = LinkedList.prototype.values;
    LinkedList.prototype.toString = function() {
      return this.toArray().join(",");
    };
    LinkedList.prototype.toJSON = function() {
      return this.toArray();
    };
    LinkedList.prototype.inspect = function() {
      var array = this.toArray();
      Object.defineProperty(array, "constructor", {
        value: LinkedList,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      LinkedList.prototype[Symbol.for("nodejs.util.inspect.custom")] = LinkedList.prototype.inspect;
    LinkedList.from = function(iterable) {
      var list = new LinkedList();
      forEach(iterable, function(value) {
        list.push(value);
      });
      return list;
    };
    module2.exports = LinkedList;
  }
});

// node_modules/mnemonist/lru-cache.js
var require_lru_cache = __commonJS({
  "node_modules/mnemonist/lru-cache.js"(exports2, module2) {
    var Iterator = require_iterator2();
    var forEach = require_foreach();
    var typed = require_typed_arrays();
    var iterables = require_iterables();
    function LRUCache(Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      this.capacity = capacity;
      if (typeof this.capacity !== "number" || this.capacity <= 0)
        throw new Error("mnemonist/lru-cache: capacity should be positive number.");
      else if (!isFinite(this.capacity) || Math.floor(this.capacity) !== this.capacity)
        throw new Error("mnemonist/lru-cache: capacity should be a finite positive integer.");
      var PointerArray = typed.getPointerArray(capacity);
      this.forward = new PointerArray(capacity);
      this.backward = new PointerArray(capacity);
      this.K = typeof Keys === "function" ? new Keys(capacity) : new Array(capacity);
      this.V = typeof Values === "function" ? new Values(capacity) : new Array(capacity);
      this.size = 0;
      this.head = 0;
      this.tail = 0;
      this.items = {};
    }
    LRUCache.prototype.clear = function() {
      this.size = 0;
      this.head = 0;
      this.tail = 0;
      this.items = {};
    };
    LRUCache.prototype.splayOnTop = function(pointer) {
      var oldHead = this.head;
      if (this.head === pointer)
        return this;
      var previous = this.backward[pointer], next = this.forward[pointer];
      if (this.tail === pointer) {
        this.tail = previous;
      } else {
        this.backward[next] = previous;
      }
      this.forward[previous] = next;
      this.backward[oldHead] = pointer;
      this.head = pointer;
      this.forward[pointer] = oldHead;
      return this;
    };
    LRUCache.prototype.set = function(key, value) {
      var pointer = this.items[key];
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        this.V[pointer] = value;
        return;
      }
      if (this.size < this.capacity) {
        pointer = this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        delete this.items[this.K[pointer]];
      }
      this.items[key] = pointer;
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
    };
    LRUCache.prototype.setpop = function(key, value) {
      var oldValue = null;
      var oldKey = null;
      var pointer = this.items[key];
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        oldValue = this.V[pointer];
        this.V[pointer] = value;
        return { evicted: false, key, value: oldValue };
      }
      if (this.size < this.capacity) {
        pointer = this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        oldValue = this.V[pointer];
        oldKey = this.K[pointer];
        delete this.items[oldKey];
      }
      this.items[key] = pointer;
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
      if (oldKey) {
        return { evicted: true, key: oldKey, value: oldValue };
      } else {
        return null;
      }
    };
    LRUCache.prototype.has = function(key) {
      return key in this.items;
    };
    LRUCache.prototype.get = function(key) {
      var pointer = this.items[key];
      if (typeof pointer === "undefined")
        return;
      this.splayOnTop(pointer);
      return this.V[pointer];
    };
    LRUCache.prototype.peek = function(key) {
      var pointer = this.items[key];
      if (typeof pointer === "undefined")
        return;
      return this.V[pointer];
    };
    LRUCache.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      var i = 0, l = this.size;
      var pointer = this.head, keys = this.K, values = this.V, forward = this.forward;
      while (i < l) {
        callback.call(scope, values[pointer], keys[pointer], this);
        pointer = forward[pointer];
        i++;
      }
    };
    LRUCache.prototype.keys = function() {
      var i = 0, l = this.size;
      var pointer = this.head, keys = this.K, forward = this.forward;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        var key = keys[pointer];
        i++;
        if (i < l)
          pointer = forward[pointer];
        return {
          done: false,
          value: key
        };
      });
    };
    LRUCache.prototype.values = function() {
      var i = 0, l = this.size;
      var pointer = this.head, values = this.V, forward = this.forward;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        var value = values[pointer];
        i++;
        if (i < l)
          pointer = forward[pointer];
        return {
          done: false,
          value
        };
      });
    };
    LRUCache.prototype.entries = function() {
      var i = 0, l = this.size;
      var pointer = this.head, keys = this.K, values = this.V, forward = this.forward;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        var key = keys[pointer], value = values[pointer];
        i++;
        if (i < l)
          pointer = forward[pointer];
        return {
          done: false,
          value: [key, value]
        };
      });
    };
    if (typeof Symbol !== "undefined")
      LRUCache.prototype[Symbol.iterator] = LRUCache.prototype.entries;
    LRUCache.prototype.inspect = function() {
      var proxy = /* @__PURE__ */ new Map();
      var iterator = this.entries(), step;
      while (step = iterator.next(), !step.done)
        proxy.set(step.value[0], step.value[1]);
      Object.defineProperty(proxy, "constructor", {
        value: LRUCache,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      LRUCache.prototype[Symbol.for("nodejs.util.inspect.custom")] = LRUCache.prototype.inspect;
    LRUCache.from = function(iterable, Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument.");
      } else if (arguments.length === 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      var cache = new LRUCache(Keys, Values, capacity);
      forEach(iterable, function(value, key) {
        cache.set(key, value);
      });
      return cache;
    };
    module2.exports = LRUCache;
  }
});

// node_modules/mnemonist/lru-cache-with-delete.js
var require_lru_cache_with_delete = __commonJS({
  "node_modules/mnemonist/lru-cache-with-delete.js"(exports2, module2) {
    var LRUCache = require_lru_cache();
    var forEach = require_foreach();
    var typed = require_typed_arrays();
    var iterables = require_iterables();
    function LRUCacheWithDelete(Keys, Values, capacity) {
      if (arguments.length < 2) {
        LRUCache.call(this, Keys);
      } else {
        LRUCache.call(this, Keys, Values, capacity);
      }
      var PointerArray = typed.getPointerArray(this.capacity);
      this.deleted = new PointerArray(this.capacity);
      this.deletedSize = 0;
    }
    for (k in LRUCache.prototype)
      LRUCacheWithDelete.prototype[k] = LRUCache.prototype[k];
    var k;
    if (typeof Symbol !== "undefined")
      LRUCacheWithDelete.prototype[Symbol.iterator] = LRUCache.prototype[Symbol.iterator];
    LRUCacheWithDelete.prototype.clear = function() {
      LRUCache.prototype.clear.call(this);
      this.deletedSize = 0;
    };
    LRUCacheWithDelete.prototype.set = function(key, value) {
      var pointer = this.items[key];
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        this.V[pointer] = value;
        return;
      }
      if (this.size < this.capacity) {
        if (this.deletedSize > 0) {
          pointer = this.deleted[--this.deletedSize];
        } else {
          pointer = this.size;
        }
        this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        delete this.items[this.K[pointer]];
      }
      this.items[key] = pointer;
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
    };
    LRUCacheWithDelete.prototype.setpop = function(key, value) {
      var oldValue = null;
      var oldKey = null;
      var pointer = this.items[key];
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        oldValue = this.V[pointer];
        this.V[pointer] = value;
        return { evicted: false, key, value: oldValue };
      }
      if (this.size < this.capacity) {
        if (this.deletedSize > 0) {
          pointer = this.deleted[--this.deletedSize];
        } else {
          pointer = this.size;
        }
        this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        oldValue = this.V[pointer];
        oldKey = this.K[pointer];
        delete this.items[oldKey];
      }
      this.items[key] = pointer;
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
      if (oldKey) {
        return { evicted: true, key: oldKey, value: oldValue };
      } else {
        return null;
      }
    };
    LRUCacheWithDelete.prototype.delete = function(key) {
      var pointer = this.items[key];
      if (typeof pointer === "undefined") {
        return false;
      }
      delete this.items[key];
      if (this.size === 1) {
        this.size = 0;
        this.head = 0;
        this.tail = 0;
        this.deletedSize = 0;
        return true;
      }
      var previous = this.backward[pointer], next = this.forward[pointer];
      if (this.head === pointer) {
        this.head = next;
      }
      if (this.tail === pointer) {
        this.tail = previous;
      }
      this.forward[previous] = next;
      this.backward[next] = previous;
      this.size--;
      this.deleted[this.deletedSize++] = pointer;
      return true;
    };
    LRUCacheWithDelete.prototype.remove = function(key, missing = void 0) {
      var pointer = this.items[key];
      if (typeof pointer === "undefined") {
        return missing;
      }
      var dead = this.V[pointer];
      delete this.items[key];
      if (this.size === 1) {
        this.size = 0;
        this.head = 0;
        this.tail = 0;
        this.deletedSize = 0;
        return dead;
      }
      var previous = this.backward[pointer], next = this.forward[pointer];
      if (this.head === pointer) {
        this.head = next;
      }
      if (this.tail === pointer) {
        this.tail = previous;
      }
      this.forward[previous] = next;
      this.backward[next] = previous;
      this.size--;
      this.deleted[this.deletedSize++] = pointer;
      return dead;
    };
    LRUCacheWithDelete.from = function(iterable, Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument.");
      } else if (arguments.length === 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      var cache = new LRUCacheWithDelete(Keys, Values, capacity);
      forEach(iterable, function(value, key) {
        cache.set(key, value);
      });
      return cache;
    };
    module2.exports = LRUCacheWithDelete;
  }
});

// node_modules/mnemonist/lru-map.js
var require_lru_map = __commonJS({
  "node_modules/mnemonist/lru-map.js"(exports2, module2) {
    var LRUCache = require_lru_cache();
    var forEach = require_foreach();
    var typed = require_typed_arrays();
    var iterables = require_iterables();
    function LRUMap(Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      this.capacity = capacity;
      if (typeof this.capacity !== "number" || this.capacity <= 0)
        throw new Error("mnemonist/lru-map: capacity should be positive number.");
      else if (!isFinite(this.capacity) || Math.floor(this.capacity) !== this.capacity)
        throw new Error("mnemonist/lru-map: capacity should be a finite positive integer.");
      var PointerArray = typed.getPointerArray(capacity);
      this.forward = new PointerArray(capacity);
      this.backward = new PointerArray(capacity);
      this.K = typeof Keys === "function" ? new Keys(capacity) : new Array(capacity);
      this.V = typeof Values === "function" ? new Values(capacity) : new Array(capacity);
      this.size = 0;
      this.head = 0;
      this.tail = 0;
      this.items = /* @__PURE__ */ new Map();
    }
    LRUMap.prototype.clear = function() {
      this.size = 0;
      this.head = 0;
      this.tail = 0;
      this.items.clear();
    };
    LRUMap.prototype.set = function(key, value) {
      var pointer = this.items.get(key);
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        this.V[pointer] = value;
        return;
      }
      if (this.size < this.capacity) {
        pointer = this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        this.items.delete(this.K[pointer]);
      }
      this.items.set(key, pointer);
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
    };
    LRUMap.prototype.setpop = function(key, value) {
      var oldValue = null;
      var oldKey = null;
      var pointer = this.items.get(key);
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        oldValue = this.V[pointer];
        this.V[pointer] = value;
        return { evicted: false, key, value: oldValue };
      }
      if (this.size < this.capacity) {
        pointer = this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        oldValue = this.V[pointer];
        oldKey = this.K[pointer];
        this.items.delete(oldKey);
      }
      this.items.set(key, pointer);
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
      if (oldKey) {
        return { evicted: true, key: oldKey, value: oldValue };
      } else {
        return null;
      }
    };
    LRUMap.prototype.has = function(key) {
      return this.items.has(key);
    };
    LRUMap.prototype.get = function(key) {
      var pointer = this.items.get(key);
      if (typeof pointer === "undefined")
        return;
      this.splayOnTop(pointer);
      return this.V[pointer];
    };
    LRUMap.prototype.peek = function(key) {
      var pointer = this.items.get(key);
      if (typeof pointer === "undefined")
        return;
      return this.V[pointer];
    };
    LRUMap.prototype.splayOnTop = LRUCache.prototype.splayOnTop;
    LRUMap.prototype.forEach = LRUCache.prototype.forEach;
    LRUMap.prototype.keys = LRUCache.prototype.keys;
    LRUMap.prototype.values = LRUCache.prototype.values;
    LRUMap.prototype.entries = LRUCache.prototype.entries;
    if (typeof Symbol !== "undefined")
      LRUMap.prototype[Symbol.iterator] = LRUMap.prototype.entries;
    LRUMap.prototype.inspect = LRUCache.prototype.inspect;
    LRUMap.from = function(iterable, Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument.");
      } else if (arguments.length === 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      var cache = new LRUMap(Keys, Values, capacity);
      forEach(iterable, function(value, key) {
        cache.set(key, value);
      });
      return cache;
    };
    module2.exports = LRUMap;
  }
});

// node_modules/mnemonist/lru-map-with-delete.js
var require_lru_map_with_delete = __commonJS({
  "node_modules/mnemonist/lru-map-with-delete.js"(exports2, module2) {
    var LRUMap = require_lru_map();
    var forEach = require_foreach();
    var typed = require_typed_arrays();
    var iterables = require_iterables();
    function LRUMapWithDelete(Keys, Values, capacity) {
      if (arguments.length < 2) {
        LRUMap.call(this, Keys);
      } else {
        LRUMap.call(this, Keys, Values, capacity);
      }
      var PointerArray = typed.getPointerArray(this.capacity);
      this.deleted = new PointerArray(this.capacity);
      this.deletedSize = 0;
    }
    for (k in LRUMap.prototype)
      LRUMapWithDelete.prototype[k] = LRUMap.prototype[k];
    var k;
    if (typeof Symbol !== "undefined")
      LRUMapWithDelete.prototype[Symbol.iterator] = LRUMap.prototype[Symbol.iterator];
    LRUMapWithDelete.prototype.clear = function() {
      LRUMap.prototype.clear.call(this);
      this.deletedSize = 0;
    };
    LRUMapWithDelete.prototype.set = function(key, value) {
      var pointer = this.items.get(key);
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        this.V[pointer] = value;
        return;
      }
      if (this.size < this.capacity) {
        if (this.deletedSize > 0) {
          pointer = this.deleted[--this.deletedSize];
        } else {
          pointer = this.size;
        }
        this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        this.items.delete(this.K[pointer]);
      }
      this.items.set(key, pointer);
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
    };
    LRUMapWithDelete.prototype.setpop = function(key, value) {
      var oldValue = null;
      var oldKey = null;
      var pointer = this.items.get(key);
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        oldValue = this.V[pointer];
        this.V[pointer] = value;
        return { evicted: false, key, value: oldValue };
      }
      if (this.size < this.capacity) {
        if (this.deletedSize > 0) {
          pointer = this.deleted[--this.deletedSize];
        } else {
          pointer = this.size;
        }
        this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        oldValue = this.V[pointer];
        oldKey = this.K[pointer];
        this.items.delete(oldKey);
      }
      this.items.set(key, pointer);
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
      if (oldKey) {
        return { evicted: true, key: oldKey, value: oldValue };
      } else {
        return null;
      }
    };
    LRUMapWithDelete.prototype.delete = function(key) {
      var pointer = this.items.get(key);
      if (typeof pointer === "undefined") {
        return false;
      }
      this.items.delete(key);
      if (this.size === 1) {
        this.size = 0;
        this.head = 0;
        this.tail = 0;
        this.deletedSize = 0;
        return true;
      }
      var previous = this.backward[pointer], next = this.forward[pointer];
      if (this.head === pointer) {
        this.head = next;
      }
      if (this.tail === pointer) {
        this.tail = previous;
      }
      this.forward[previous] = next;
      this.backward[next] = previous;
      this.size--;
      this.deleted[this.deletedSize++] = pointer;
      return true;
    };
    LRUMapWithDelete.prototype.remove = function(key, missing = void 0) {
      var pointer = this.items.get(key);
      if (typeof pointer === "undefined") {
        return missing;
      }
      var dead = this.V[pointer];
      this.items.delete(key);
      if (this.size === 1) {
        this.size = 0;
        this.head = 0;
        this.tail = 0;
        this.deletedSize = 0;
        return dead;
      }
      var previous = this.backward[pointer], next = this.forward[pointer];
      if (this.head === pointer) {
        this.head = next;
      }
      if (this.tail === pointer) {
        this.tail = previous;
      }
      this.forward[previous] = next;
      this.backward[next] = previous;
      this.size--;
      this.deleted[this.deletedSize++] = pointer;
      return dead;
    };
    LRUMapWithDelete.from = function(iterable, Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/lru-map.from: could not guess iterable length. Please provide desired capacity as last argument.");
      } else if (arguments.length === 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      var cache = new LRUMapWithDelete(Keys, Values, capacity);
      forEach(iterable, function(value, key) {
        cache.set(key, value);
      });
      return cache;
    };
    module2.exports = LRUMapWithDelete;
  }
});

// node_modules/mnemonist/multi-set.js
var require_multi_set = __commonJS({
  "node_modules/mnemonist/multi-set.js"(exports2, module2) {
    var Iterator = require_iterator2();
    var forEach = require_foreach();
    var FixedReverseHeap = require_fixed_reverse_heap();
    var MULTISET_ITEM_COMPARATOR = function(a, b) {
      if (a[1] > b[1])
        return -1;
      if (a[1] < b[1])
        return 1;
      return 0;
    };
    function MultiSet() {
      this.items = /* @__PURE__ */ new Map();
      Object.defineProperty(this.items, "constructor", {
        value: MultiSet,
        enumerable: false
      });
      this.clear();
    }
    MultiSet.prototype.clear = function() {
      this.size = 0;
      this.dimension = 0;
      this.items.clear();
    };
    MultiSet.prototype.add = function(item, count) {
      if (count === 0)
        return this;
      if (count < 0)
        return this.remove(item, -count);
      count = count || 1;
      if (typeof count !== "number")
        throw new Error("mnemonist/multi-set.add: given count should be a number.");
      this.size += count;
      const currentCount = this.items.get(item);
      if (currentCount === void 0)
        this.dimension++;
      else
        count += currentCount;
      this.items.set(item, count);
      return this;
    };
    MultiSet.prototype.set = function(item, count) {
      var currentCount;
      if (typeof count !== "number")
        throw new Error("mnemonist/multi-set.set: given count should be a number.");
      if (count <= 0) {
        currentCount = this.items.get(item);
        if (typeof currentCount !== "undefined") {
          this.size -= currentCount;
          this.dimension--;
        }
        this.items.delete(item);
        return this;
      }
      count = count || 1;
      currentCount = this.items.get(item);
      if (typeof currentCount === "number") {
        this.items.set(item, currentCount + count);
      } else {
        this.dimension++;
        this.items.set(item, count);
      }
      this.size += count;
      return this;
    };
    MultiSet.prototype.has = function(item) {
      return this.items.has(item);
    };
    MultiSet.prototype.delete = function(item) {
      var count = this.items.get(item);
      if (count === 0)
        return false;
      this.size -= count;
      this.dimension--;
      this.items.delete(item);
      return true;
    };
    MultiSet.prototype.remove = function(item, count) {
      if (count === 0)
        return;
      if (count < 0)
        return this.add(item, -count);
      count = count || 1;
      if (typeof count !== "number")
        throw new Error("mnemonist/multi-set.remove: given count should be a number.");
      var currentCount = this.items.get(item);
      if (typeof currentCount === "undefined") return;
      var newCount = Math.max(0, currentCount - count);
      if (newCount === 0) {
        this.items.delete(item);
        this.size -= currentCount;
        this.dimension--;
      } else {
        this.items.set(item, newCount);
        this.size -= count;
      }
      return;
    };
    MultiSet.prototype.edit = function(a, b) {
      var am = this.multiplicity(a);
      if (am === 0)
        return;
      var bm = this.multiplicity(b);
      this.items.set(b, am + bm);
      this.items.delete(a);
      return this;
    };
    MultiSet.prototype.multiplicity = function(item) {
      var count = this.items.get(item);
      if (typeof count === "undefined")
        return 0;
      return count;
    };
    MultiSet.prototype.get = MultiSet.prototype.multiplicity;
    MultiSet.prototype.count = MultiSet.prototype.multiplicity;
    MultiSet.prototype.frequency = function(item) {
      if (this.size === 0)
        return 0;
      var count = this.multiplicity(item);
      return count / this.size;
    };
    MultiSet.prototype.top = function(n) {
      if (typeof n !== "number" || n <= 0)
        throw new Error("mnemonist/multi-set.top: n must be a number > 0.");
      var heap = new FixedReverseHeap(Array, MULTISET_ITEM_COMPARATOR, n);
      var iterator = this.items.entries(), step;
      while (step = iterator.next(), !step.done)
        heap.push(step.value);
      return heap.consume();
    };
    MultiSet.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      var i;
      this.items.forEach(function(multiplicity, value) {
        for (i = 0; i < multiplicity; i++)
          callback.call(scope, value, value);
      });
    };
    MultiSet.prototype.forEachMultiplicity = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      this.items.forEach(callback, scope);
    };
    MultiSet.prototype.keys = function() {
      return this.items.keys();
    };
    MultiSet.prototype.values = function() {
      var iterator = this.items.entries(), inContainer = false, step, value, multiplicity, i;
      return new Iterator(function next() {
        if (!inContainer) {
          step = iterator.next();
          if (step.done)
            return { done: true };
          inContainer = true;
          value = step.value[0];
          multiplicity = step.value[1];
          i = 0;
        }
        if (i >= multiplicity) {
          inContainer = false;
          return next();
        }
        i++;
        return {
          done: false,
          value
        };
      });
    };
    MultiSet.prototype.multiplicities = function() {
      return this.items.entries();
    };
    if (typeof Symbol !== "undefined")
      MultiSet.prototype[Symbol.iterator] = MultiSet.prototype.values;
    MultiSet.prototype.inspect = function() {
      return this.items;
    };
    if (typeof Symbol !== "undefined")
      MultiSet.prototype[Symbol.for("nodejs.util.inspect.custom")] = MultiSet.prototype.inspect;
    MultiSet.prototype.toJSON = function() {
      return this.items;
    };
    MultiSet.from = function(iterable) {
      var set = new MultiSet();
      forEach(iterable, function(value) {
        set.add(value);
      });
      return set;
    };
    MultiSet.isSubset = function(A, B) {
      var iterator = A.multiplicities(), step, key, mA;
      if (A === B)
        return true;
      if (A.dimension > B.dimension)
        return false;
      while (step = iterator.next(), !step.done) {
        key = step.value[0];
        mA = step.value[1];
        if (B.multiplicity(key) < mA)
          return false;
      }
      return true;
    };
    MultiSet.isSuperset = function(A, B) {
      return MultiSet.isSubset(B, A);
    };
    module2.exports = MultiSet;
  }
});

// node_modules/mnemonist/passjoin-index.js
var require_passjoin_index = __commonJS({
  "node_modules/mnemonist/passjoin-index.js"(exports2, module2) {
    var Iterator = require_iterator2();
    var forEach = require_foreach();
    function countSubstringsL(k, s, l) {
      return ((Math.pow(k, 2) - Math.pow(Math.abs(s - l), 2)) / 2 | 0) + k + 1;
    }
    function countKeys(k, s) {
      var c = 0;
      for (var l = 0, m = s + 1; l < m; l++)
        c += countSubstringsL(k, s, l);
      return c;
    }
    function comparator(a, b) {
      if (a.length > b.length)
        return -1;
      if (a.length < b.length)
        return 1;
      if (a < b)
        return -1;
      if (a > b)
        return 1;
      return 0;
    }
    function partition(k, l) {
      var m = k + 1, a = l / m | 0, b = a + 1, i, j;
      var largeSegments = l - a * m, smallSegments = m - largeSegments;
      var tuples = new Array(k + 1);
      for (i = 0; i < smallSegments; i++)
        tuples[i] = [i * a, a];
      var offset = (i - 1) * a + a;
      for (j = 0; j < largeSegments; j++)
        tuples[i + j] = [offset + j * b, b];
      return tuples;
    }
    function segments(k, string) {
      var l = string.length, m = k + 1, a = l / m | 0, b = a + 1, o, i, j;
      var largeSegments = l - a * m, smallSegments = m - largeSegments;
      var S = new Array(k + 1);
      for (i = 0; i < smallSegments; i++) {
        o = i * a;
        S[i] = string.slice(o, o + a);
      }
      var offset = (i - 1) * a + a;
      for (j = 0; j < largeSegments; j++) {
        o = offset + j * b;
        S[i + j] = string.slice(o, o + b);
      }
      return S;
    }
    function segmentPos(k, i, string) {
      if (i === 0)
        return 0;
      var l = string.length;
      var m = k + 1, a = l / m | 0, b = a + 1;
      var largeSegments = l - a * m, smallSegments = m - largeSegments;
      if (i <= smallSegments - 1)
        return i * a;
      var offset = i - smallSegments;
      return smallSegments * a + offset * b;
    }
    function multiMatchAwareInterval(k, delta, i, s, pi, li) {
      var start1 = pi - i, end1 = pi + i;
      var o = k - i;
      var start2 = pi + delta - o, end2 = pi + delta + o;
      var end3 = s - li;
      return [Math.max(0, start1, start2), Math.min(end1, end2, end3)];
    }
    function multiMatchAwareSubstrings(k, string, l, i, pi, li) {
      var s = string.length;
      var delta = s - l;
      var interval = multiMatchAwareInterval(k, delta, i, s, pi, li);
      var start = interval[0], stop = interval[1];
      var currentSubstring = "";
      var substrings = [];
      var substring, j, m;
      for (j = start, m = stop + 1; j < m; j++) {
        substring = string.slice(j, j + li);
        if (substring === currentSubstring)
          continue;
        substrings.push(substring);
        currentSubstring = substring;
      }
      return substrings;
    }
    function PassjoinIndex(levenshtein, k) {
      if (typeof levenshtein !== "function")
        throw new Error("mnemonist/passjoin-index: `levenshtein` should be a function returning edit distance between two strings.");
      if (typeof k !== "number" || k < 1)
        throw new Error("mnemonist/passjoin-index: `k` should be a number > 0");
      this.levenshtein = levenshtein;
      this.k = k;
      this.clear();
    }
    PassjoinIndex.prototype.clear = function() {
      this.size = 0;
      this.strings = [];
      this.invertedIndices = {};
    };
    PassjoinIndex.prototype.add = function(value) {
      var l = value.length;
      var stringIndex = this.size;
      this.strings.push(value);
      this.size++;
      var S = segments(this.k, value);
      var Ll = this.invertedIndices[l];
      if (typeof Ll === "undefined") {
        Ll = {};
        this.invertedIndices[l] = Ll;
      }
      var segment, matches, key, i, m;
      for (i = 0, m = S.length; i < m; i++) {
        segment = S[i];
        key = segment + i;
        matches = Ll[key];
        if (typeof matches === "undefined") {
          matches = [stringIndex];
          Ll[key] = matches;
        } else {
          matches.push(stringIndex);
        }
      }
      return this;
    };
    PassjoinIndex.prototype.search = function(query) {
      var s = query.length, k = this.k;
      var M = /* @__PURE__ */ new Set();
      var candidates, candidate, queryPos, querySegmentLength, key, S, P, l, m, i, n1, j, n2, y, n3;
      for (l = Math.max(0, s - k), m = s + k + 1; l < m; l++) {
        var Ll = this.invertedIndices[l];
        if (typeof Ll === "undefined")
          continue;
        P = partition(k, l);
        for (i = 0, n1 = P.length; i < n1; i++) {
          queryPos = P[i][0];
          querySegmentLength = P[i][1];
          S = multiMatchAwareSubstrings(
            k,
            query,
            l,
            i,
            queryPos,
            querySegmentLength
          );
          if (!S.length)
            S = [""];
          for (j = 0, n2 = S.length; j < n2; j++) {
            key = S[j] + i;
            candidates = Ll[key];
            if (typeof candidates === "undefined")
              continue;
            for (y = 0, n3 = candidates.length; y < n3; y++) {
              candidate = this.strings[candidates[y]];
              if (s <= k && l <= k || !M.has(candidate) && this.levenshtein(query, candidate) <= k)
                M.add(candidate);
            }
          }
        }
      }
      return M;
    };
    PassjoinIndex.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      for (var i = 0, l = this.strings.length; i < l; i++)
        callback.call(scope, this.strings[i], i, this);
    };
    PassjoinIndex.prototype.values = function() {
      var strings = this.strings, l = strings.length, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return {
            done: true
          };
        var value = strings[i];
        i++;
        return {
          value,
          done: false
        };
      });
    };
    if (typeof Symbol !== "undefined")
      PassjoinIndex.prototype[Symbol.iterator] = PassjoinIndex.prototype.values;
    PassjoinIndex.prototype.inspect = function() {
      var array = this.strings.slice();
      Object.defineProperty(array, "constructor", {
        value: PassjoinIndex,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      PassjoinIndex.prototype[Symbol.for("nodejs.util.inspect.custom")] = PassjoinIndex.prototype.inspect;
    PassjoinIndex.from = function(iterable, levenshtein, k) {
      var index = new PassjoinIndex(levenshtein, k);
      forEach(iterable, function(string) {
        index.add(string);
      });
      return index;
    };
    PassjoinIndex.countKeys = countKeys;
    PassjoinIndex.comparator = comparator;
    PassjoinIndex.partition = partition;
    PassjoinIndex.segments = segments;
    PassjoinIndex.segmentPos = segmentPos;
    PassjoinIndex.multiMatchAwareInterval = multiMatchAwareInterval;
    PassjoinIndex.multiMatchAwareSubstrings = multiMatchAwareSubstrings;
    module2.exports = PassjoinIndex;
  }
});

// node_modules/mnemonist/queue.js
var require_queue2 = __commonJS({
  "node_modules/mnemonist/queue.js"(exports2, module2) {
    var Iterator = require_iterator2();
    var forEach = require_foreach();
    function Queue2() {
      this.clear();
    }
    Queue2.prototype.clear = function() {
      this.items = [];
      this.offset = 0;
      this.size = 0;
    };
    Queue2.prototype.enqueue = function(item) {
      this.items.push(item);
      return ++this.size;
    };
    Queue2.prototype.dequeue = function() {
      if (!this.size)
        return;
      var item = this.items[this.offset];
      if (++this.offset * 2 >= this.items.length) {
        this.items = this.items.slice(this.offset);
        this.offset = 0;
      }
      this.size--;
      return item;
    };
    Queue2.prototype.peek = function() {
      if (!this.size)
        return;
      return this.items[this.offset];
    };
    Queue2.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      for (var i = this.offset, j = 0, l = this.items.length; i < l; i++, j++)
        callback.call(scope, this.items[i], j, this);
    };
    Queue2.prototype.toArray = function() {
      return this.items.slice(this.offset);
    };
    Queue2.prototype.values = function() {
      var items = this.items, i = this.offset;
      return new Iterator(function() {
        if (i >= items.length)
          return {
            done: true
          };
        var value = items[i];
        i++;
        return {
          value,
          done: false
        };
      });
    };
    Queue2.prototype.entries = function() {
      var items = this.items, i = this.offset, j = 0;
      return new Iterator(function() {
        if (i >= items.length)
          return {
            done: true
          };
        var value = items[i];
        i++;
        return {
          value: [j++, value],
          done: false
        };
      });
    };
    if (typeof Symbol !== "undefined")
      Queue2.prototype[Symbol.iterator] = Queue2.prototype.values;
    Queue2.prototype.toString = function() {
      return this.toArray().join(",");
    };
    Queue2.prototype.toJSON = function() {
      return this.toArray();
    };
    Queue2.prototype.inspect = function() {
      var array = this.toArray();
      Object.defineProperty(array, "constructor", {
        value: Queue2,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      Queue2.prototype[Symbol.for("nodejs.util.inspect.custom")] = Queue2.prototype.inspect;
    Queue2.from = function(iterable) {
      var queue = new Queue2();
      forEach(iterable, function(value) {
        queue.enqueue(value);
      });
      return queue;
    };
    Queue2.of = function() {
      return Queue2.from(arguments);
    };
    module2.exports = Queue2;
  }
});

// node_modules/mnemonist/stack.js
var require_stack = __commonJS({
  "node_modules/mnemonist/stack.js"(exports2, module2) {
    var Iterator = require_iterator2();
    var forEach = require_foreach();
    function Stack() {
      this.clear();
    }
    Stack.prototype.clear = function() {
      this.items = [];
      this.size = 0;
    };
    Stack.prototype.push = function(item) {
      this.items.push(item);
      return ++this.size;
    };
    Stack.prototype.pop = function() {
      if (this.size === 0)
        return;
      this.size--;
      return this.items.pop();
    };
    Stack.prototype.peek = function() {
      return this.items[this.size - 1];
    };
    Stack.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      for (var i = 0, l = this.items.length; i < l; i++)
        callback.call(scope, this.items[l - i - 1], i, this);
    };
    Stack.prototype.toArray = function() {
      var array = new Array(this.size), l = this.size - 1, i = this.size;
      while (i--)
        array[i] = this.items[l - i];
      return array;
    };
    Stack.prototype.values = function() {
      var items = this.items, l = items.length, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return {
            done: true
          };
        var value = items[l - i - 1];
        i++;
        return {
          value,
          done: false
        };
      });
    };
    Stack.prototype.entries = function() {
      var items = this.items, l = items.length, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return {
            done: true
          };
        var value = items[l - i - 1];
        return {
          value: [i++, value],
          done: false
        };
      });
    };
    if (typeof Symbol !== "undefined")
      Stack.prototype[Symbol.iterator] = Stack.prototype.values;
    Stack.prototype.toString = function() {
      return this.toArray().join(",");
    };
    Stack.prototype.toJSON = function() {
      return this.toArray();
    };
    Stack.prototype.inspect = function() {
      var array = this.toArray();
      Object.defineProperty(array, "constructor", {
        value: Stack,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      Stack.prototype[Symbol.for("nodejs.util.inspect.custom")] = Stack.prototype.inspect;
    Stack.from = function(iterable) {
      var stack = new Stack();
      forEach(iterable, function(value) {
        stack.push(value);
      });
      return stack;
    };
    Stack.of = function() {
      return Stack.from(arguments);
    };
    module2.exports = Stack;
  }
});

// node_modules/mnemonist/set.js
var require_set = __commonJS({
  "node_modules/mnemonist/set.js"(exports2) {
    exports2.intersection = function() {
      if (arguments.length < 2)
        throw new Error("mnemonist/Set.intersection: needs at least two arguments.");
      var I = /* @__PURE__ */ new Set();
      var smallestSize = Infinity, smallestSet = null;
      var s, i, l = arguments.length;
      for (i = 0; i < l; i++) {
        s = arguments[i];
        if (s.size === 0)
          return I;
        if (s.size < smallestSize) {
          smallestSize = s.size;
          smallestSet = s;
        }
      }
      var iterator = smallestSet.values(), step, item, add, set;
      while (step = iterator.next(), !step.done) {
        item = step.value;
        add = true;
        for (i = 0; i < l; i++) {
          set = arguments[i];
          if (set === smallestSet)
            continue;
          if (!set.has(item)) {
            add = false;
            break;
          }
        }
        if (add)
          I.add(item);
      }
      return I;
    };
    exports2.union = function() {
      if (arguments.length < 2)
        throw new Error("mnemonist/Set.union: needs at least two arguments.");
      var U = /* @__PURE__ */ new Set();
      var i, l = arguments.length;
      var iterator, step;
      for (i = 0; i < l; i++) {
        iterator = arguments[i].values();
        while (step = iterator.next(), !step.done)
          U.add(step.value);
      }
      return U;
    };
    exports2.difference = function(A, B) {
      if (!A.size)
        return /* @__PURE__ */ new Set();
      if (!B.size)
        return new Set(A);
      var D = /* @__PURE__ */ new Set();
      var iterator = A.values(), step;
      while (step = iterator.next(), !step.done) {
        if (!B.has(step.value))
          D.add(step.value);
      }
      return D;
    };
    exports2.symmetricDifference = function(A, B) {
      var S = /* @__PURE__ */ new Set();
      var iterator = A.values(), step;
      while (step = iterator.next(), !step.done) {
        if (!B.has(step.value))
          S.add(step.value);
      }
      iterator = B.values();
      while (step = iterator.next(), !step.done) {
        if (!A.has(step.value))
          S.add(step.value);
      }
      return S;
    };
    exports2.isSubset = function(A, B) {
      var iterator = A.values(), step;
      if (A === B)
        return true;
      if (A.size > B.size)
        return false;
      while (step = iterator.next(), !step.done) {
        if (!B.has(step.value))
          return false;
      }
      return true;
    };
    exports2.isSuperset = function(A, B) {
      return exports2.isSubset(B, A);
    };
    exports2.add = function(A, B) {
      var iterator = B.values(), step;
      while (step = iterator.next(), !step.done)
        A.add(step.value);
      return;
    };
    exports2.subtract = function(A, B) {
      var iterator = B.values(), step;
      while (step = iterator.next(), !step.done)
        A.delete(step.value);
      return;
    };
    exports2.intersect = function(A, B) {
      var iterator = A.values(), step;
      while (step = iterator.next(), !step.done) {
        if (!B.has(step.value))
          A.delete(step.value);
      }
      return;
    };
    exports2.disjunct = function(A, B) {
      var iterator = A.values(), step;
      var toRemove = [];
      while (step = iterator.next(), !step.done) {
        if (B.has(step.value))
          toRemove.push(step.value);
      }
      iterator = B.values();
      while (step = iterator.next(), !step.done) {
        if (!A.has(step.value))
          A.add(step.value);
      }
      for (var i = 0, l = toRemove.length; i < l; i++)
        A.delete(toRemove[i]);
      return;
    };
    exports2.intersectionSize = function(A, B) {
      var tmp;
      if (A.size > B.size) {
        tmp = A;
        A = B;
        B = tmp;
      }
      if (A.size === 0)
        return 0;
      if (A === B)
        return A.size;
      var iterator = A.values(), step;
      var I = 0;
      while (step = iterator.next(), !step.done) {
        if (B.has(step.value))
          I++;
      }
      return I;
    };
    exports2.unionSize = function(A, B) {
      var I = exports2.intersectionSize(A, B);
      return A.size + B.size - I;
    };
    exports2.jaccard = function(A, B) {
      var I = exports2.intersectionSize(A, B);
      if (I === 0)
        return 0;
      var U = A.size + B.size - I;
      return I / U;
    };
    exports2.overlap = function(A, B) {
      var I = exports2.intersectionSize(A, B);
      if (I === 0)
        return 0;
      return I / Math.min(A.size, B.size);
    };
  }
});

// node_modules/mnemonist/sparse-queue-set.js
var require_sparse_queue_set = __commonJS({
  "node_modules/mnemonist/sparse-queue-set.js"(exports2, module2) {
    var Iterator = require_iterator2();
    var getPointerArray = require_typed_arrays().getPointerArray;
    function SparseQueueSet(capacity) {
      var ByteArray = getPointerArray(capacity);
      this.start = 0;
      this.size = 0;
      this.capacity = capacity;
      this.dense = new ByteArray(capacity);
      this.sparse = new ByteArray(capacity);
    }
    SparseQueueSet.prototype.clear = function() {
      this.start = 0;
      this.size = 0;
    };
    SparseQueueSet.prototype.has = function(member) {
      if (this.size === 0)
        return false;
      var index = this.sparse[member];
      var inBounds = index < this.capacity && (index >= this.start && index < this.start + this.size) || index < (this.start + this.size) % this.capacity;
      return inBounds && this.dense[index] === member;
    };
    SparseQueueSet.prototype.enqueue = function(member) {
      var index = this.sparse[member];
      if (this.size !== 0) {
        var inBounds = index < this.capacity && (index >= this.start && index < this.start + this.size) || index < (this.start + this.size) % this.capacity;
        if (inBounds && this.dense[index] === member)
          return this;
      }
      index = (this.start + this.size) % this.capacity;
      this.dense[index] = member;
      this.sparse[member] = index;
      this.size++;
      return this;
    };
    SparseQueueSet.prototype.dequeue = function() {
      if (this.size === 0)
        return;
      var index = this.start;
      this.size--;
      this.start++;
      if (this.start === this.capacity)
        this.start = 0;
      var member = this.dense[index];
      this.sparse[member] = this.capacity;
      return member;
    };
    SparseQueueSet.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      var c = this.capacity, l = this.size, i = this.start, j = 0;
      while (j < l) {
        callback.call(scope, this.dense[i], j, this);
        i++;
        j++;
        if (i === c)
          i = 0;
      }
    };
    SparseQueueSet.prototype.values = function() {
      var dense = this.dense, c = this.capacity, l = this.size, i = this.start, j = 0;
      return new Iterator(function() {
        if (j >= l)
          return {
            done: true
          };
        var value = dense[i];
        i++;
        j++;
        if (i === c)
          i = 0;
        return {
          value,
          done: false
        };
      });
    };
    if (typeof Symbol !== "undefined")
      SparseQueueSet.prototype[Symbol.iterator] = SparseQueueSet.prototype.values;
    SparseQueueSet.prototype.inspect = function() {
      var proxy = [];
      this.forEach(function(member) {
        proxy.push(member);
      });
      Object.defineProperty(proxy, "constructor", {
        value: SparseQueueSet,
        enumerable: false
      });
      proxy.capacity = this.capacity;
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      SparseQueueSet.prototype[Symbol.for("nodejs.util.inspect.custom")] = SparseQueueSet.prototype.inspect;
    module2.exports = SparseQueueSet;
  }
});

// node_modules/mnemonist/sparse-map.js
var require_sparse_map = __commonJS({
  "node_modules/mnemonist/sparse-map.js"(exports2, module2) {
    var Iterator = require_iterator2();
    var getPointerArray = require_typed_arrays().getPointerArray;
    function SparseMap(Values, length) {
      if (arguments.length < 2) {
        length = Values;
        Values = Array;
      }
      var ByteArray = getPointerArray(length);
      this.size = 0;
      this.length = length;
      this.dense = new ByteArray(length);
      this.sparse = new ByteArray(length);
      this.vals = new Values(length);
    }
    SparseMap.prototype.clear = function() {
      this.size = 0;
    };
    SparseMap.prototype.has = function(member) {
      var index = this.sparse[member];
      return index < this.size && this.dense[index] === member;
    };
    SparseMap.prototype.get = function(member) {
      var index = this.sparse[member];
      if (index < this.size && this.dense[index] === member)
        return this.vals[index];
      return;
    };
    SparseMap.prototype.set = function(member, value) {
      var index = this.sparse[member];
      if (index < this.size && this.dense[index] === member) {
        this.vals[index] = value;
        return this;
      }
      this.dense[this.size] = member;
      this.sparse[member] = this.size;
      this.vals[this.size] = value;
      this.size++;
      return this;
    };
    SparseMap.prototype.delete = function(member) {
      var index = this.sparse[member];
      if (index >= this.size || this.dense[index] !== member)
        return false;
      index = this.dense[this.size - 1];
      this.dense[this.sparse[member]] = index;
      this.sparse[index] = this.sparse[member];
      this.size--;
      return true;
    };
    SparseMap.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      for (var i = 0; i < this.size; i++)
        callback.call(scope, this.vals[i], this.dense[i]);
    };
    SparseMap.prototype.keys = function() {
      var size = this.size, dense = this.dense, i = 0;
      return new Iterator(function() {
        if (i < size) {
          var item = dense[i];
          i++;
          return {
            value: item
          };
        }
        return {
          done: true
        };
      });
    };
    SparseMap.prototype.values = function() {
      var size = this.size, values = this.vals, i = 0;
      return new Iterator(function() {
        if (i < size) {
          var item = values[i];
          i++;
          return {
            value: item
          };
        }
        return {
          done: true
        };
      });
    };
    SparseMap.prototype.entries = function() {
      var size = this.size, dense = this.dense, values = this.vals, i = 0;
      return new Iterator(function() {
        if (i < size) {
          var item = [dense[i], values[i]];
          i++;
          return {
            value: item
          };
        }
        return {
          done: true
        };
      });
    };
    if (typeof Symbol !== "undefined")
      SparseMap.prototype[Symbol.iterator] = SparseMap.prototype.entries;
    SparseMap.prototype.inspect = function() {
      var proxy = /* @__PURE__ */ new Map();
      for (var i = 0; i < this.size; i++)
        proxy.set(this.dense[i], this.vals[i]);
      Object.defineProperty(proxy, "constructor", {
        value: SparseMap,
        enumerable: false
      });
      proxy.length = this.length;
      if (this.vals.constructor !== Array)
        proxy.type = this.vals.constructor.name;
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      SparseMap.prototype[Symbol.for("nodejs.util.inspect.custom")] = SparseMap.prototype.inspect;
    module2.exports = SparseMap;
  }
});

// node_modules/mnemonist/sparse-set.js
var require_sparse_set = __commonJS({
  "node_modules/mnemonist/sparse-set.js"(exports2, module2) {
    var Iterator = require_iterator2();
    var getPointerArray = require_typed_arrays().getPointerArray;
    function SparseSet(length) {
      var ByteArray = getPointerArray(length);
      this.size = 0;
      this.length = length;
      this.dense = new ByteArray(length);
      this.sparse = new ByteArray(length);
    }
    SparseSet.prototype.clear = function() {
      this.size = 0;
    };
    SparseSet.prototype.has = function(member) {
      var index = this.sparse[member];
      return index < this.size && this.dense[index] === member;
    };
    SparseSet.prototype.add = function(member) {
      var index = this.sparse[member];
      if (index < this.size && this.dense[index] === member)
        return this;
      this.dense[this.size] = member;
      this.sparse[member] = this.size;
      this.size++;
      return this;
    };
    SparseSet.prototype.delete = function(member) {
      var index = this.sparse[member];
      if (index >= this.size || this.dense[index] !== member)
        return false;
      index = this.dense[this.size - 1];
      this.dense[this.sparse[member]] = index;
      this.sparse[index] = this.sparse[member];
      this.size--;
      return true;
    };
    SparseSet.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      var item;
      for (var i = 0; i < this.size; i++) {
        item = this.dense[i];
        callback.call(scope, item, item);
      }
    };
    SparseSet.prototype.values = function() {
      var size = this.size, dense = this.dense, i = 0;
      return new Iterator(function() {
        if (i < size) {
          var item = dense[i];
          i++;
          return {
            value: item
          };
        }
        return {
          done: true
        };
      });
    };
    if (typeof Symbol !== "undefined")
      SparseSet.prototype[Symbol.iterator] = SparseSet.prototype.values;
    SparseSet.prototype.inspect = function() {
      var proxy = /* @__PURE__ */ new Set();
      for (var i = 0; i < this.size; i++)
        proxy.add(this.dense[i]);
      Object.defineProperty(proxy, "constructor", {
        value: SparseSet,
        enumerable: false
      });
      proxy.length = this.length;
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      SparseSet.prototype[Symbol.for("nodejs.util.inspect.custom")] = SparseSet.prototype.inspect;
    module2.exports = SparseSet;
  }
});

// node_modules/mnemonist/symspell.js
var require_symspell = __commonJS({
  "node_modules/mnemonist/symspell.js"(exports2, module2) {
    var forEach = require_foreach();
    var DEFAULT_MAX_DISTANCE = 2;
    var DEFAULT_VERBOSITY = 2;
    var VERBOSITY = /* @__PURE__ */ new Set([
      // Returns only the top suggestion
      0,
      // Returns suggestions with the smallest edit distance
      1,
      // Returns every suggestion (no early termination)
      2
    ]);
    var VERBOSITY_EXPLANATIONS = {
      0: "Returns only the top suggestion",
      1: "Returns suggestions with the smallest edit distance",
      2: "Returns every suggestion (no early termination)"
    };
    function createDictionaryItem(value) {
      var suggestions = /* @__PURE__ */ new Set();
      if (typeof value === "number")
        suggestions.add(value);
      return {
        suggestions,
        count: 0
      };
    }
    function createSuggestionItem(term, distance, count) {
      return {
        term: term || "",
        distance: distance || 0,
        count: count || 0
      };
    }
    function edits(word, distance, max, deletes) {
      deletes = deletes || /* @__PURE__ */ new Set();
      distance++;
      var deletedItem, l = word.length, i;
      if (l > 1) {
        for (i = 0; i < l; i++) {
          deletedItem = word.substring(0, i) + word.substring(i + 1);
          if (!deletes.has(deletedItem)) {
            deletes.add(deletedItem);
            if (distance < max)
              edits(deletedItem, distance, max, deletes);
          }
        }
      }
      return deletes;
    }
    function addLowestDistance(words, verbosity, item, suggestion, int, deletedItem) {
      var first = item.suggestions.values().next().value;
      if (verbosity < 2 && item.suggestions.size > 0 && words[first].length - deletedItem.length > suggestion.length - deletedItem.length) {
        item.suggestions = /* @__PURE__ */ new Set();
        item.count = 0;
      }
      if (verbosity === 2 || !item.suggestions.size || words[first].length - deletedItem.length >= suggestion.length - deletedItem.length) {
        item.suggestions.add(int);
      }
    }
    function damerauLevenshtein(source, target) {
      var m = source.length, n = target.length, H = [[]], INF = m + n, sd = /* @__PURE__ */ new Map(), i, l, j;
      H[0][0] = INF;
      for (i = 0; i <= m; i++) {
        if (!H[i + 1])
          H[i + 1] = [];
        H[i + 1][1] = i;
        H[i + 1][0] = INF;
      }
      for (j = 0; j <= n; j++) {
        H[1][j + 1] = j;
        H[0][j + 1] = INF;
      }
      var st = source + target, letter;
      for (i = 0, l = st.length; i < l; i++) {
        letter = st[i];
        if (!sd.has(letter))
          sd.set(letter, 0);
      }
      for (i = 1; i <= m; i++) {
        var DB = 0;
        for (j = 1; j <= n; j++) {
          var i1 = sd.get(target[j - 1]), j1 = DB;
          if (source[i - 1] === target[j - 1]) {
            H[i + 1][j + 1] = H[i][j];
            DB = j;
          } else {
            H[i + 1][j + 1] = Math.min(
              H[i][j],
              H[i + 1][j],
              H[i][j + 1]
            ) + 1;
          }
          H[i + 1][j + 1] = Math.min(
            H[i + 1][j + 1],
            H[i1][j1] + (i - i1 - 1) + 1 + (j - j1 - 1)
          );
        }
        sd.set(source[i - 1], i);
      }
      return H[m + 1][n + 1];
    }
    function lookup(dictionary, words, verbosity, maxDistance, maxLength, input) {
      var length = input.length;
      if (length - maxDistance > maxLength)
        return [];
      var candidates = [input], candidateSet = /* @__PURE__ */ new Set(), suggestionSet = /* @__PURE__ */ new Set();
      var suggestions = [], candidate, item;
      while (candidates.length > 0) {
        candidate = candidates.shift();
        if (verbosity < 2 && suggestions.length > 0 && length - candidate.length > suggestions[0].distance)
          break;
        item = dictionary[candidate];
        if (item !== void 0) {
          if (typeof item === "number")
            item = createDictionaryItem(item);
          if (item.count > 0 && !suggestionSet.has(candidate)) {
            suggestionSet.add(candidate);
            var suggestItem = createSuggestionItem(
              candidate,
              length - candidate.length,
              item.count
            );
            suggestions.push(suggestItem);
            if (verbosity < 2 && length - candidate.length === 0)
              break;
          }
          item.suggestions.forEach((index) => {
            var suggestion = words[index];
            if (suggestionSet.has(suggestion))
              return;
            suggestionSet.add(suggestion);
            var distance = 0;
            if (input !== suggestion) {
              if (suggestion.length === candidate.length) {
                distance = length - candidate.length;
              } else if (length === candidate.length) {
                distance = suggestion.length - candidate.length;
              } else {
                var ii = 0, jj = 0;
                var l2 = suggestion.length;
                while (ii < l2 && ii < length && suggestion[ii] === input[ii]) {
                  ii++;
                }
                while (jj < l2 - ii && jj < length && suggestion[l2 - jj - 1] === input[length - jj - 1]) {
                  jj++;
                }
                if (ii > 0 || jj > 0) {
                  distance = damerauLevenshtein(
                    suggestion.substr(ii, l2 - ii - jj),
                    input.substr(ii, length - ii - jj)
                  );
                } else {
                  distance = damerauLevenshtein(suggestion, input);
                }
              }
            }
            if (verbosity < 2 && suggestions.length > 0 && suggestions[0].distance > distance) {
              suggestions = [];
            }
            if (verbosity < 2 && suggestions.length > 0 && distance > suggestions[0].distance) {
              return;
            }
            if (distance <= maxDistance) {
              var target = dictionary[suggestion];
              if (target !== void 0) {
                suggestions.push(createSuggestionItem(
                  suggestion,
                  distance,
                  target.count
                ));
              }
            }
          });
        }
        if (length - candidate.length < maxDistance) {
          if (verbosity < 2 && suggestions.length > 0 && length - candidate.length >= suggestions[0].distance)
            continue;
          for (var i = 0, l = candidate.length; i < l; i++) {
            var deletedItem = candidate.substring(0, i) + candidate.substring(i + 1);
            if (!candidateSet.has(deletedItem)) {
              candidateSet.add(deletedItem);
              candidates.push(deletedItem);
            }
          }
        }
      }
      if (verbosity === 0)
        return suggestions.slice(0, 1);
      return suggestions;
    }
    function SymSpell(options) {
      options = options || {};
      this.clear();
      this.maxDistance = typeof options.maxDistance === "number" ? options.maxDistance : DEFAULT_MAX_DISTANCE;
      this.verbosity = typeof options.verbosity === "number" ? options.verbosity : DEFAULT_VERBOSITY;
      if (typeof this.maxDistance !== "number" || this.maxDistance <= 0)
        throw Error("mnemonist/SymSpell.constructor: invalid `maxDistance` option. Should be a integer greater than 0.");
      if (!VERBOSITY.has(this.verbosity))
        throw Error("mnemonist/SymSpell.constructor: invalid `verbosity` option. Should be either 0, 1 or 2.");
    }
    SymSpell.prototype.clear = function() {
      this.size = 0;
      this.dictionary = /* @__PURE__ */ Object.create(null);
      this.maxLength = 0;
      this.words = [];
    };
    SymSpell.prototype.add = function(word) {
      var item = this.dictionary[word];
      if (item !== void 0) {
        if (typeof item === "number") {
          item = createDictionaryItem(item);
          this.dictionary[word] = item;
        }
        item.count++;
      } else {
        item = createDictionaryItem();
        item.count++;
        this.dictionary[word] = item;
        if (word.length > this.maxLength)
          this.maxLength = word.length;
      }
      if (item.count === 1) {
        var number = this.words.length;
        this.words.push(word);
        var deletes = edits(word, 0, this.maxDistance);
        deletes.forEach((deletedItem) => {
          var target = this.dictionary[deletedItem];
          if (target !== void 0) {
            if (typeof target === "number") {
              target = createDictionaryItem(target);
              this.dictionary[deletedItem] = target;
            }
            if (!target.suggestions.has(number)) {
              addLowestDistance(
                this.words,
                this.verbosity,
                target,
                word,
                number,
                deletedItem
              );
            }
          } else {
            this.dictionary[deletedItem] = number;
          }
        });
      }
      this.size++;
      return this;
    };
    SymSpell.prototype.search = function(input) {
      return lookup(
        this.dictionary,
        this.words,
        this.verbosity,
        this.maxDistance,
        this.maxLength,
        input
      );
    };
    SymSpell.prototype.inspect = function() {
      var array = [];
      array.size = this.size;
      array.maxDistance = this.maxDistance;
      array.verbosity = this.verbosity;
      array.behavior = VERBOSITY_EXPLANATIONS[this.verbosity];
      for (var k in this.dictionary) {
        if (typeof this.dictionary[k] === "object" && this.dictionary[k].count)
          array.push([k, this.dictionary[k].count]);
      }
      Object.defineProperty(array, "constructor", {
        value: SymSpell,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      SymSpell.prototype[Symbol.for("nodejs.util.inspect.custom")] = SymSpell.prototype.inspect;
    SymSpell.from = function(iterable, options) {
      var index = new SymSpell(options);
      forEach(iterable, function(value) {
        index.add(value);
      });
      return index;
    };
    module2.exports = SymSpell;
  }
});

// node_modules/mnemonist/trie-map.js
var require_trie_map = __commonJS({
  "node_modules/mnemonist/trie-map.js"(exports2, module2) {
    var forEach = require_foreach();
    var Iterator = require_iterator2();
    var SENTINEL = String.fromCharCode(0);
    function TrieMap(Token) {
      this.mode = Token === Array ? "array" : "string";
      this.clear();
    }
    TrieMap.prototype.clear = function() {
      this.root = {};
      this.size = 0;
    };
    TrieMap.prototype.set = function(prefix, value) {
      var node = this.root, token;
      for (var i = 0, l = prefix.length; i < l; i++) {
        token = prefix[i];
        node = node[token] || (node[token] = {});
      }
      if (!(SENTINEL in node))
        this.size++;
      node[SENTINEL] = value;
      return this;
    };
    TrieMap.prototype.update = function(prefix, updateFunction) {
      var node = this.root, token;
      for (var i = 0, l = prefix.length; i < l; i++) {
        token = prefix[i];
        node = node[token] || (node[token] = {});
      }
      if (!(SENTINEL in node))
        this.size++;
      node[SENTINEL] = updateFunction(node[SENTINEL]);
      return this;
    };
    TrieMap.prototype.get = function(prefix) {
      var node = this.root, token, i, l;
      for (i = 0, l = prefix.length; i < l; i++) {
        token = prefix[i];
        node = node[token];
        if (typeof node === "undefined")
          return;
      }
      if (!(SENTINEL in node))
        return;
      return node[SENTINEL];
    };
    TrieMap.prototype.delete = function(prefix) {
      var node = this.root, toPrune = null, tokenToPrune = null, parent, token, i, l;
      for (i = 0, l = prefix.length; i < l; i++) {
        token = prefix[i];
        parent = node;
        node = node[token];
        if (typeof node === "undefined")
          return false;
        if (toPrune !== null) {
          if (Object.keys(node).length > 1) {
            toPrune = null;
            tokenToPrune = null;
          }
        } else {
          if (Object.keys(node).length < 2) {
            toPrune = parent;
            tokenToPrune = token;
          }
        }
      }
      if (!(SENTINEL in node))
        return false;
      this.size--;
      if (toPrune)
        delete toPrune[tokenToPrune];
      else
        delete node[SENTINEL];
      return true;
    };
    TrieMap.prototype.has = function(prefix) {
      var node = this.root, token;
      for (var i = 0, l = prefix.length; i < l; i++) {
        token = prefix[i];
        node = node[token];
        if (typeof node === "undefined")
          return false;
      }
      return SENTINEL in node;
    };
    TrieMap.prototype.find = function(prefix) {
      var isString = typeof prefix === "string";
      var node = this.root, matches = [], token, i, l;
      for (i = 0, l = prefix.length; i < l; i++) {
        token = prefix[i];
        node = node[token];
        if (typeof node === "undefined")
          return matches;
      }
      var nodeStack = [node], prefixStack = [prefix], k;
      while (nodeStack.length) {
        prefix = prefixStack.pop();
        node = nodeStack.pop();
        for (k in node) {
          if (k === SENTINEL) {
            matches.push([prefix, node[SENTINEL]]);
            continue;
          }
          nodeStack.push(node[k]);
          prefixStack.push(isString ? prefix + k : prefix.concat(k));
        }
      }
      return matches;
    };
    TrieMap.prototype.values = function(prefix) {
      var node = this.root, nodeStack = [], token, i, l;
      if (prefix) {
        for (i = 0, l = prefix.length; i < l; i++) {
          token = prefix[i];
          node = node[token];
          if (typeof node === "undefined")
            return Iterator.empty();
        }
      }
      nodeStack.push(node);
      return new Iterator(function() {
        var currentNode, hasValue = false, k;
        while (nodeStack.length) {
          currentNode = nodeStack.pop();
          for (k in currentNode) {
            if (k === SENTINEL) {
              hasValue = true;
              continue;
            }
            nodeStack.push(currentNode[k]);
          }
          if (hasValue)
            return { done: false, value: currentNode[SENTINEL] };
        }
        return { done: true };
      });
    };
    TrieMap.prototype.prefixes = function(prefix) {
      var node = this.root, nodeStack = [], prefixStack = [], token, i, l;
      var isString = this.mode === "string";
      if (prefix) {
        for (i = 0, l = prefix.length; i < l; i++) {
          token = prefix[i];
          node = node[token];
          if (typeof node === "undefined")
            return Iterator.empty();
        }
      } else {
        prefix = isString ? "" : [];
      }
      nodeStack.push(node);
      prefixStack.push(prefix);
      return new Iterator(function() {
        var currentNode, currentPrefix, hasValue = false, k;
        while (nodeStack.length) {
          currentNode = nodeStack.pop();
          currentPrefix = prefixStack.pop();
          for (k in currentNode) {
            if (k === SENTINEL) {
              hasValue = true;
              continue;
            }
            nodeStack.push(currentNode[k]);
            prefixStack.push(isString ? currentPrefix + k : currentPrefix.concat(k));
          }
          if (hasValue)
            return { done: false, value: currentPrefix };
        }
        return { done: true };
      });
    };
    TrieMap.prototype.keys = TrieMap.prototype.prefixes;
    TrieMap.prototype.entries = function(prefix) {
      var node = this.root, nodeStack = [], prefixStack = [], token, i, l;
      var isString = this.mode === "string";
      if (prefix) {
        for (i = 0, l = prefix.length; i < l; i++) {
          token = prefix[i];
          node = node[token];
          if (typeof node === "undefined")
            return Iterator.empty();
        }
      } else {
        prefix = isString ? "" : [];
      }
      nodeStack.push(node);
      prefixStack.push(prefix);
      return new Iterator(function() {
        var currentNode, currentPrefix, hasValue = false, k;
        while (nodeStack.length) {
          currentNode = nodeStack.pop();
          currentPrefix = prefixStack.pop();
          for (k in currentNode) {
            if (k === SENTINEL) {
              hasValue = true;
              continue;
            }
            nodeStack.push(currentNode[k]);
            prefixStack.push(isString ? currentPrefix + k : currentPrefix.concat(k));
          }
          if (hasValue)
            return { done: false, value: [currentPrefix, currentNode[SENTINEL]] };
        }
        return { done: true };
      });
    };
    if (typeof Symbol !== "undefined")
      TrieMap.prototype[Symbol.iterator] = TrieMap.prototype.entries;
    TrieMap.prototype.inspect = function() {
      var proxy = new Array(this.size);
      var iterator = this.entries(), step, i = 0;
      while (step = iterator.next(), !step.done)
        proxy[i++] = step.value;
      Object.defineProperty(proxy, "constructor", {
        value: TrieMap,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      TrieMap.prototype[Symbol.for("nodejs.util.inspect.custom")] = TrieMap.prototype.inspect;
    TrieMap.prototype.toJSON = function() {
      return this.root;
    };
    TrieMap.from = function(iterable) {
      var trie = new TrieMap();
      forEach(iterable, function(value, key) {
        trie.set(key, value);
      });
      return trie;
    };
    TrieMap.SENTINEL = SENTINEL;
    module2.exports = TrieMap;
  }
});

// node_modules/mnemonist/trie.js
var require_trie = __commonJS({
  "node_modules/mnemonist/trie.js"(exports2, module2) {
    var forEach = require_foreach();
    var TrieMap = require_trie_map();
    var SENTINEL = String.fromCharCode(0);
    function Trie(Token) {
      this.mode = Token === Array ? "array" : "string";
      this.clear();
    }
    for (methodName in TrieMap.prototype)
      Trie.prototype[methodName] = TrieMap.prototype[methodName];
    var methodName;
    delete Trie.prototype.set;
    delete Trie.prototype.get;
    delete Trie.prototype.values;
    delete Trie.prototype.entries;
    Trie.prototype.add = function(prefix) {
      var node = this.root, token;
      for (var i = 0, l = prefix.length; i < l; i++) {
        token = prefix[i];
        node = node[token] || (node[token] = {});
      }
      if (!(SENTINEL in node))
        this.size++;
      node[SENTINEL] = true;
      return this;
    };
    Trie.prototype.find = function(prefix) {
      var isString = typeof prefix === "string";
      var node = this.root, matches = [], token, i, l;
      for (i = 0, l = prefix.length; i < l; i++) {
        token = prefix[i];
        node = node[token];
        if (typeof node === "undefined")
          return matches;
      }
      var nodeStack = [node], prefixStack = [prefix], k;
      while (nodeStack.length) {
        prefix = prefixStack.pop();
        node = nodeStack.pop();
        for (k in node) {
          if (k === SENTINEL) {
            matches.push(prefix);
            continue;
          }
          nodeStack.push(node[k]);
          prefixStack.push(isString ? prefix + k : prefix.concat(k));
        }
      }
      return matches;
    };
    if (typeof Symbol !== "undefined")
      Trie.prototype[Symbol.iterator] = Trie.prototype.keys;
    Trie.prototype.inspect = function() {
      var proxy = /* @__PURE__ */ new Set();
      var iterator = this.keys(), step;
      while (step = iterator.next(), !step.done)
        proxy.add(step.value);
      Object.defineProperty(proxy, "constructor", {
        value: Trie,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      Trie.prototype[Symbol.for("nodejs.util.inspect.custom")] = Trie.prototype.inspect;
    Trie.prototype.toJSON = function() {
      return this.root;
    };
    Trie.from = function(iterable) {
      var trie = new Trie();
      forEach(iterable, function(value) {
        trie.add(value);
      });
      return trie;
    };
    Trie.SENTINEL = SENTINEL;
    module2.exports = Trie;
  }
});

// node_modules/mnemonist/vector.js
var require_vector = __commonJS({
  "node_modules/mnemonist/vector.js"(exports2, module2) {
    var Iterator = require_iterator2();
    var forEach = require_foreach();
    var iterables = require_iterables();
    var typed = require_typed_arrays();
    var DEFAULT_GROWING_POLICY = function(currentCapacity) {
      return Math.max(1, Math.ceil(currentCapacity * 1.5));
    };
    var pointerArrayFactory = function(capacity) {
      var PointerArray = typed.getPointerArray(capacity);
      return new PointerArray(capacity);
    };
    function Vector(ArrayClass, initialCapacityOrOptions) {
      if (arguments.length < 1)
        throw new Error("mnemonist/vector: expecting at least a byte array constructor.");
      var initialCapacity = initialCapacityOrOptions || 0, policy = DEFAULT_GROWING_POLICY, initialLength = 0, factory = false;
      if (typeof initialCapacityOrOptions === "object") {
        initialCapacity = initialCapacityOrOptions.initialCapacity || 0;
        initialLength = initialCapacityOrOptions.initialLength || 0;
        policy = initialCapacityOrOptions.policy || policy;
        factory = initialCapacityOrOptions.factory === true;
      }
      this.factory = factory ? ArrayClass : null;
      this.ArrayClass = ArrayClass;
      this.length = initialLength;
      this.capacity = Math.max(initialLength, initialCapacity);
      this.policy = policy;
      this.array = new ArrayClass(this.capacity);
    }
    Vector.prototype.set = function(index, value) {
      if (this.length < index)
        throw new Error("Vector(" + this.ArrayClass.name + ").set: index out of bounds.");
      this.array[index] = value;
      return this;
    };
    Vector.prototype.get = function(index) {
      if (this.length < index)
        return void 0;
      return this.array[index];
    };
    Vector.prototype.applyPolicy = function(override) {
      var newCapacity = this.policy(override || this.capacity);
      if (typeof newCapacity !== "number" || newCapacity < 0)
        throw new Error("mnemonist/vector.applyPolicy: policy returned an invalid value (expecting a positive integer).");
      if (newCapacity <= this.capacity)
        throw new Error("mnemonist/vector.applyPolicy: policy returned a less or equal capacity to allocate.");
      return newCapacity;
    };
    Vector.prototype.reallocate = function(capacity) {
      if (capacity === this.capacity)
        return this;
      var oldArray = this.array;
      if (capacity < this.length)
        this.length = capacity;
      if (capacity > this.capacity) {
        if (this.factory === null)
          this.array = new this.ArrayClass(capacity);
        else
          this.array = this.factory(capacity);
        if (typed.isTypedArray(this.array)) {
          this.array.set(oldArray, 0);
        } else {
          for (var i = 0, l = this.length; i < l; i++)
            this.array[i] = oldArray[i];
        }
      } else {
        this.array = oldArray.slice(0, capacity);
      }
      this.capacity = capacity;
      return this;
    };
    Vector.prototype.grow = function(capacity) {
      var newCapacity;
      if (typeof capacity === "number") {
        if (this.capacity >= capacity)
          return this;
        newCapacity = this.capacity;
        while (newCapacity < capacity)
          newCapacity = this.applyPolicy(newCapacity);
        this.reallocate(newCapacity);
        return this;
      }
      newCapacity = this.applyPolicy();
      this.reallocate(newCapacity);
      return this;
    };
    Vector.prototype.resize = function(length) {
      if (length === this.length)
        return this;
      if (length < this.length) {
        this.length = length;
        return this;
      }
      this.length = length;
      this.reallocate(length);
      return this;
    };
    Vector.prototype.push = function(value) {
      if (this.capacity === this.length)
        this.grow();
      this.array[this.length++] = value;
      return this.length;
    };
    Vector.prototype.pop = function() {
      if (this.length === 0)
        return;
      return this.array[--this.length];
    };
    Vector.prototype.values = function() {
      var items = this.array, l = this.length, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return {
            done: true
          };
        var value = items[i];
        i++;
        return {
          value,
          done: false
        };
      });
    };
    Vector.prototype.entries = function() {
      var items = this.array, l = this.length, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return {
            done: true
          };
        var value = items[i];
        return {
          value: [i++, value],
          done: false
        };
      });
    };
    if (typeof Symbol !== "undefined")
      Vector.prototype[Symbol.iterator] = Vector.prototype.values;
    Vector.prototype.inspect = function() {
      var proxy = this.array.slice(0, this.length);
      proxy.type = this.array.constructor.name;
      proxy.items = this.length;
      proxy.capacity = this.capacity;
      Object.defineProperty(proxy, "constructor", {
        value: Vector,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      Vector.prototype[Symbol.for("nodejs.util.inspect.custom")] = Vector.prototype.inspect;
    Vector.from = function(iterable, ArrayClass, capacity) {
      if (arguments.length < 3) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/vector.from: could not guess iterable length. Please provide desired capacity as last argument.");
      }
      var vector = new Vector(ArrayClass, capacity);
      forEach(iterable, function(value) {
        vector.push(value);
      });
      return vector;
    };
    function subClass(ArrayClass) {
      var SubClass = function(initialCapacityOrOptions) {
        Vector.call(this, ArrayClass, initialCapacityOrOptions);
      };
      for (var k in Vector.prototype) {
        if (Vector.prototype.hasOwnProperty(k))
          SubClass.prototype[k] = Vector.prototype[k];
      }
      SubClass.from = function(iterable, capacity) {
        return Vector.from(iterable, ArrayClass, capacity);
      };
      if (typeof Symbol !== "undefined")
        SubClass.prototype[Symbol.iterator] = SubClass.prototype.values;
      return SubClass;
    }
    Vector.Int8Vector = subClass(Int8Array);
    Vector.Uint8Vector = subClass(Uint8Array);
    Vector.Uint8ClampedVector = subClass(Uint8ClampedArray);
    Vector.Int16Vector = subClass(Int16Array);
    Vector.Uint16Vector = subClass(Uint16Array);
    Vector.Int32Vector = subClass(Int32Array);
    Vector.Uint32Vector = subClass(Uint32Array);
    Vector.Float32Vector = subClass(Float32Array);
    Vector.Float64Vector = subClass(Float64Array);
    Vector.PointerVector = subClass(pointerArrayFactory);
    module2.exports = Vector;
  }
});

// node_modules/mnemonist/vp-tree.js
var require_vp_tree = __commonJS({
  "node_modules/mnemonist/vp-tree.js"(exports2, module2) {
    var iterables = require_iterables();
    var typed = require_typed_arrays();
    var inplaceQuickSortIndices = require_quick().inplaceQuickSortIndices;
    var lowerBoundIndices = require_binary_search().lowerBoundIndices;
    var Heap = require_heap();
    var getPointerArray = typed.getPointerArray;
    function comparator(a, b) {
      if (a.distance < b.distance)
        return 1;
      if (a.distance > b.distance)
        return -1;
      return 0;
    }
    function createBinaryTree(distance, items, indices) {
      var N = indices.length;
      var PointerArray = getPointerArray(N);
      var C = 0, nodes = new PointerArray(N), lefts = new PointerArray(N), rights = new PointerArray(N), mus = new Float64Array(N), stack = [0, 0, N], distances = new Float64Array(N), nodeIndex, vantagePoint, medianIndex, lo, hi, mid, mu, i, l;
      while (stack.length) {
        hi = stack.pop();
        lo = stack.pop();
        nodeIndex = stack.pop();
        vantagePoint = indices[hi - 1];
        hi--;
        l = hi - lo;
        nodes[nodeIndex] = vantagePoint;
        if (l === 0)
          continue;
        if (l === 1) {
          mu = distance(items[vantagePoint], items[indices[lo]]);
          mus[nodeIndex] = mu;
          C++;
          rights[nodeIndex] = C;
          nodes[C] = indices[lo];
          continue;
        }
        for (i = lo; i < hi; i++)
          distances[indices[i]] = distance(items[vantagePoint], items[indices[i]]);
        inplaceQuickSortIndices(distances, indices, lo, hi);
        medianIndex = lo + l / 2 - 1;
        if (medianIndex === (medianIndex | 0)) {
          mu = (distances[indices[medianIndex]] + distances[indices[medianIndex + 1]]) / 2;
        } else {
          mu = distances[indices[Math.ceil(medianIndex)]];
        }
        mus[nodeIndex] = mu;
        mid = lowerBoundIndices(distances, indices, mu, lo, hi);
        if (hi - mid > 0) {
          C++;
          rights[nodeIndex] = C;
          stack.push(C, mid, hi);
        }
        if (mid - lo > 0) {
          C++;
          lefts[nodeIndex] = C;
          stack.push(C, lo, mid);
        }
      }
      return {
        nodes,
        lefts,
        rights,
        mus
      };
    }
    function VPTree(distance, items) {
      if (typeof distance !== "function")
        throw new Error("mnemonist/VPTree.constructor: given `distance` must be a function.");
      if (!items)
        throw new Error("mnemonist/VPTree.constructor: you must provide items to the tree. A VPTree cannot be updated after its creation.");
      this.distance = distance;
      this.heap = new Heap(comparator);
      this.D = 0;
      var arrays = iterables.toArrayWithIndices(items);
      this.items = arrays[0];
      var indices = arrays[1];
      this.size = indices.length;
      var result = createBinaryTree(distance, this.items, indices);
      this.nodes = result.nodes;
      this.lefts = result.lefts;
      this.rights = result.rights;
      this.mus = result.mus;
    }
    VPTree.prototype.nearestNeighbors = function(k, query) {
      var neighbors = this.heap, stack = [0], tau = Infinity, nodeIndex, itemIndex, vantagePoint, leftIndex, rightIndex, mu, d;
      this.D = 0;
      while (stack.length) {
        nodeIndex = stack.pop();
        itemIndex = this.nodes[nodeIndex];
        vantagePoint = this.items[itemIndex];
        d = this.distance(vantagePoint, query);
        this.D++;
        if (d < tau) {
          neighbors.push({ distance: d, item: vantagePoint });
          if (neighbors.size > k)
            neighbors.pop();
          if (neighbors.size >= k)
            tau = neighbors.peek().distance;
        }
        leftIndex = this.lefts[nodeIndex];
        rightIndex = this.rights[nodeIndex];
        if (!leftIndex && !rightIndex)
          continue;
        mu = this.mus[nodeIndex];
        if (d < mu) {
          if (leftIndex && d < mu + tau)
            stack.push(leftIndex);
          if (rightIndex && d >= mu - tau)
            stack.push(rightIndex);
        } else {
          if (rightIndex && d >= mu - tau)
            stack.push(rightIndex);
          if (leftIndex && d < mu + tau)
            stack.push(leftIndex);
        }
      }
      var array = new Array(neighbors.size);
      for (var i = neighbors.size - 1; i >= 0; i--)
        array[i] = neighbors.pop();
      return array;
    };
    VPTree.prototype.neighbors = function(radius, query) {
      var neighbors = [], stack = [0], nodeIndex, itemIndex, vantagePoint, leftIndex, rightIndex, mu, d;
      this.D = 0;
      while (stack.length) {
        nodeIndex = stack.pop();
        itemIndex = this.nodes[nodeIndex];
        vantagePoint = this.items[itemIndex];
        d = this.distance(vantagePoint, query);
        this.D++;
        if (d <= radius)
          neighbors.push({ distance: d, item: vantagePoint });
        leftIndex = this.lefts[nodeIndex];
        rightIndex = this.rights[nodeIndex];
        if (!leftIndex && !rightIndex)
          continue;
        mu = this.mus[nodeIndex];
        if (d < mu) {
          if (leftIndex && d < mu + radius)
            stack.push(leftIndex);
          if (rightIndex && d >= mu - radius)
            stack.push(rightIndex);
        } else {
          if (rightIndex && d >= mu - radius)
            stack.push(rightIndex);
          if (leftIndex && d < mu + radius)
            stack.push(leftIndex);
        }
      }
      return neighbors;
    };
    VPTree.prototype.inspect = function() {
      var array = this.items.slice();
      Object.defineProperty(array, "constructor", {
        value: VPTree,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      VPTree.prototype[Symbol.for("nodejs.util.inspect.custom")] = VPTree.prototype.inspect;
    VPTree.from = function(iterable, distance) {
      return new VPTree(distance, iterable);
    };
    module2.exports = VPTree;
  }
});

// node_modules/mnemonist/index.js
var require_mnemonist = __commonJS({
  "node_modules/mnemonist/index.js"(exports2, module2) {
    var Heap = require_heap();
    var FibonacciHeap = require_fibonacci_heap();
    var SuffixArray = require_suffix_array();
    module2.exports = {
      BiMap: require_bi_map(),
      BitSet: require_bit_set(),
      BitVector: require_bit_vector(),
      BloomFilter: require_bloom_filter(),
      BKTree: require_bk_tree(),
      CircularBuffer: require_circular_buffer(),
      DefaultMap: require_default_map(),
      DefaultWeakMap: require_default_weak_map(),
      FixedDeque: require_fixed_deque(),
      StaticDisjointSet: require_static_disjoint_set(),
      FibonacciHeap,
      MinFibonacciHeap: FibonacciHeap.MinFibonacciHeap,
      MaxFibonacciHeap: FibonacciHeap.MaxFibonacciHeap,
      FixedReverseHeap: require_fixed_reverse_heap(),
      FuzzyMap: require_fuzzy_map(),
      FuzzyMultiMap: require_fuzzy_multi_map(),
      HashedArrayTree: require_hashed_array_tree(),
      Heap,
      MinHeap: Heap.MinHeap,
      MaxHeap: Heap.MaxHeap,
      StaticIntervalTree: require_static_interval_tree(),
      InvertedIndex: require_inverted_index(),
      KDTree: require_kd_tree(),
      LinkedList: require_linked_list(),
      LRUCache: require_lru_cache(),
      LRUCacheWithDelete: require_lru_cache_with_delete(),
      LRUMap: require_lru_map(),
      LRUMapWithDelete: require_lru_map_with_delete(),
      MultiMap: require_multi_map(),
      MultiSet: require_multi_set(),
      PassjoinIndex: require_passjoin_index(),
      Queue: require_queue2(),
      FixedStack: require_fixed_stack(),
      Stack: require_stack(),
      SuffixArray,
      GeneralizedSuffixArray: SuffixArray.GeneralizedSuffixArray,
      Set: require_set(),
      SparseQueueSet: require_sparse_queue_set(),
      SparseMap: require_sparse_map(),
      SparseSet: require_sparse_set(),
      SymSpell: require_symspell(),
      Trie: require_trie(),
      TrieMap: require_trie_map(),
      Vector: require_vector(),
      VPTree: require_vp_tree()
    };
  }
});

// src/main-esm.ts
var main_esm_exports = {};
__export(main_esm_exports, {
  ArrayTilemap: () => ArrayTilemap,
  CharacterShiftAction: () => CharacterShiftAction,
  CollisionStrategy: () => CollisionStrategy,
  Direction: () => Direction,
  GridEngine: () => GridEngine,
  GridEngineHeadless: () => GridEngineHeadless,
  MoveToResult: () => MoveToResult,
  NoPathFoundStrategy: () => NoPathFoundStrategy,
  NumberOfDirections: () => NumberOfDirections,
  PathBlockedStrategy: () => PathBlockedStrategy,
  PhaserTile: () => PhaserTile,
  PhaserTileLayer: () => PhaserTileLayer,
  PhaserTilemap: () => PhaserTilemap,
  QueuedPathBlockedStrategy: () => QueuedPathBlockedStrategy,
  TiledLayer: () => TiledLayer,
  TiledTile: () => TiledTile,
  TiledTilemap: () => TiledTilemap,
  default: () => main_esm_default,
  directionFromPos: () => directionFromPos
});
module.exports = __toCommonJS(main_esm_exports);

// src/Utils/Vector2/Vector2.ts
var Vector2 = class _Vector2 {
  static get ZERO() {
    return new _Vector2(0, 0);
  }
  static get ONE() {
    return new _Vector2(1, 1);
  }
  static get UP() {
    return new _Vector2(0, -1);
  }
  static get DOWN() {
    return new _Vector2(0, 1);
  }
  static get LEFT() {
    return new _Vector2(-1, 0);
  }
  static get RIGHT() {
    return new _Vector2(1, 0);
  }
  static get UP_LEFT() {
    return new _Vector2(-1, -1);
  }
  static get UP_RIGHT() {
    return new _Vector2(1, -1);
  }
  static get DOWN_RIGHT() {
    return new _Vector2(1, 1);
  }
  static get DOWN_LEFT() {
    return new _Vector2(-1, 1);
  }
  constructor(x, y) {
    if (typeof x === "number") {
      this.x = x;
      this.y = y || 0;
    } else {
      this.x = x.x;
      this.y = x.y;
    }
  }
  clone() {
    return new _Vector2(this.x, this.y);
  }
  add(vector) {
    return new _Vector2(this.x + vector.x, this.y + vector.y);
  }
  multiply(vector) {
    return new _Vector2(this.x * vector.x, this.y * vector.y);
  }
  divide(vector) {
    return new _Vector2(this.x / vector.x, this.y / vector.y);
  }
  subtract(vector) {
    return new _Vector2(this.x - vector.x, this.y - vector.y);
  }
  equals(vector) {
    return this.x === vector.x && this.y === vector.y;
  }
  abs() {
    return new _Vector2(Math.abs(this.x), Math.abs(this.y));
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  modulo(vector) {
    return new _Vector2(this.x % vector.x, this.y % vector.y);
  }
  scalarModulo(scalar) {
    return new _Vector2(this.x % scalar, this.y % scalar);
  }
  scalarMult(scalar) {
    return new _Vector2(this.x * scalar, this.y * scalar);
  }
  toPosition() {
    return { x: this.x, y: this.y };
  }
  toString() {
    return `${this.x}#${this.y}`;
  }
};

// src/Utils/LayerPositionUtils/LayerPositionUtils.ts
var LayerPositionUtils = class {
  static equal(position, otherPosition) {
    return position.position.x === otherPosition.position.x && position.position.y === otherPosition.position.y && position.layer === otherPosition.layer;
  }
  static copyOver(source, target) {
    target.position.x = source.position.x;
    target.position.y = source.position.y;
    target.layer = source.layer;
  }
  static clone(layerPosition) {
    return {
      position: layerPosition.position.clone(),
      layer: layerPosition.layer
    };
  }
  static toString(layerPosition) {
    return `${layerPosition.position.toString()}#${layerPosition.layer}`;
  }
  static toInternal(layerPosition) {
    return {
      position: new Vector2(layerPosition.position.x, layerPosition.position.y),
      layer: layerPosition.charLayer
    };
  }
  static fromInternal(layerPosition) {
    return {
      position: layerPosition.position.toPosition(),
      charLayer: layerPosition.layer
    };
  }
};

// src/Direction/Direction.ts
var Direction = /* @__PURE__ */ ((Direction5) => {
  Direction5["NONE"] = "none";
  Direction5["LEFT"] = "left";
  Direction5["UP_LEFT"] = "up-left";
  Direction5["UP"] = "up";
  Direction5["UP_RIGHT"] = "up-right";
  Direction5["RIGHT"] = "right";
  Direction5["DOWN_RIGHT"] = "down-right";
  Direction5["DOWN"] = "down";
  Direction5["DOWN_LEFT"] = "down-left";
  return Direction5;
})(Direction || {});
var oppositeDirections = {
  ["up" /* UP */]: "down" /* DOWN */,
  ["down" /* DOWN */]: "up" /* UP */,
  ["left" /* LEFT */]: "right" /* RIGHT */,
  ["right" /* RIGHT */]: "left" /* LEFT */,
  ["none" /* NONE */]: "none" /* NONE */,
  ["up-left" /* UP_LEFT */]: "down-right" /* DOWN_RIGHT */,
  ["up-right" /* UP_RIGHT */]: "down-left" /* DOWN_LEFT */,
  ["down-right" /* DOWN_RIGHT */]: "up-left" /* UP_LEFT */,
  ["down-left" /* DOWN_LEFT */]: "up-right" /* UP_RIGHT */
};
var directionVectors = {
  ["up" /* UP */]: Vector2.UP,
  ["down" /* DOWN */]: Vector2.DOWN,
  ["left" /* LEFT */]: Vector2.LEFT,
  ["right" /* RIGHT */]: Vector2.RIGHT,
  ["none" /* NONE */]: Vector2.ZERO,
  ["up-left" /* UP_LEFT */]: Vector2.UP_LEFT,
  ["up-right" /* UP_RIGHT */]: Vector2.UP_RIGHT,
  ["down-right" /* DOWN_RIGHT */]: Vector2.DOWN_RIGHT,
  ["down-left" /* DOWN_LEFT */]: Vector2.DOWN_LEFT
};
var dirToNumber = {
  ["up" /* UP */]: 0,
  ["up-right" /* UP_RIGHT */]: 1,
  ["right" /* RIGHT */]: 2,
  ["down-right" /* DOWN_RIGHT */]: 3,
  ["down" /* DOWN */]: 4,
  ["down-left" /* DOWN_LEFT */]: 5,
  ["left" /* LEFT */]: 6,
  ["up-left" /* UP_LEFT */]: 7,
  ["none" /* NONE */]: NaN
};
var numberToDir = [
  "up" /* UP */,
  "up-right" /* UP_RIGHT */,
  "right" /* RIGHT */,
  "down-right" /* DOWN_RIGHT */,
  "down" /* DOWN */,
  "down-left" /* DOWN_LEFT */,
  "left" /* LEFT */,
  "up-left" /* UP_LEFT */
];
var diagonals = [
  "down-left" /* DOWN_LEFT */,
  "down-right" /* DOWN_RIGHT */,
  "up-right" /* UP_RIGHT */,
  "up-left" /* UP_LEFT */
];
function directions() {
  return [
    "up" /* UP */,
    "down" /* DOWN */,
    "left" /* LEFT */,
    "right" /* RIGHT */,
    "none" /* NONE */,
    "up-left" /* UP_LEFT */,
    "up-right" /* UP_RIGHT */,
    "down-right" /* DOWN_RIGHT */,
    "down-left" /* DOWN_LEFT */
  ];
}
function isDiagonal(direction) {
  return diagonals.includes(direction);
}
function turnCounterClockwise(direction, times = 1) {
  if (direction === "none" /* NONE */) {
    return "none" /* NONE */;
  }
  return numberToDir[(dirToNumber[direction] + 8 - Math.abs(times) % 8) % 8];
}
function turnClockwise(direction, times = 1) {
  if (direction === "none" /* NONE */) {
    return "none" /* NONE */;
  }
  return numberToDir[(dirToNumber[direction] + times) % 8];
}
function directionVector(direction) {
  return directionVectors[direction];
}
function oppositeDirection(direction) {
  return oppositeDirections[direction];
}
function directionFromPos(src, dest) {
  if (src.x === dest.x) {
    if (src.y > dest.y) return "up" /* UP */;
    if (src.y < dest.y) return "down" /* DOWN */;
  } else if (src.y === dest.y) {
    if (src.x > dest.x) return "left" /* LEFT */;
    if (src.x < dest.x) return "right" /* RIGHT */;
  } else if (src.x > dest.x) {
    if (src.y < dest.y) return "down-left" /* DOWN_LEFT */;
    if (src.y > dest.y) return "up-left" /* UP_LEFT */;
  } else if (src.x < dest.x) {
    if (src.y < dest.y) return "down-right" /* DOWN_RIGHT */;
    if (src.y > dest.y) return "up-right" /* UP_RIGHT */;
  }
  return "none" /* NONE */;
}
var NumberOfDirections = /* @__PURE__ */ ((NumberOfDirections3) => {
  NumberOfDirections3[NumberOfDirections3["FOUR"] = 4] = "FOUR";
  NumberOfDirections3[NumberOfDirections3["EIGHT"] = 8] = "EIGHT";
  return NumberOfDirections3;
})(NumberOfDirections || {});
function isDirection(val) {
  return typeof val === "string" && directions().includes(val);
}

// src/GridCharacter/GridCharacter.ts
var import_rxjs = __toESM(require_cjs(), 1);
var MAX_MOVEMENT_PROGRESS = 1e3;
var GridCharacter = class {
  constructor(id, config) {
    this.id = id;
    this.movementDirection = "none" /* NONE */;
    this._tilePos = {
      position: new Vector2(0, 0),
      layer: void 0
    };
    this.movementStarted$ = new import_rxjs.Subject();
    this.movementStopped$ = new import_rxjs.Subject();
    this.directionChanged$ = new import_rxjs.Subject();
    this.positionChangeStarted$ = new import_rxjs.Subject();
    this.positionChangeFinished$ = new import_rxjs.Subject();
    this.tilePositionSet$ = new import_rxjs.Subject();
    this.autoMovementSet$ = new import_rxjs.Subject();
    this.lastMovementImpulse = "none" /* NONE */;
    this.facingDirection = "down" /* DOWN */;
    this.depthChanged$ = new import_rxjs.Subject();
    this.movementProgress = 0;
    this.currentMovementReverted = false;
    this.tilemap = config.tilemap;
    this.speed = config.speed;
    this.collidesWithTilesInternal = config.collidesWithTiles;
    this._tilePos.layer = config.charLayer;
    this.ignoreMissingTiles = config.ignoreMissingTiles ?? false;
    this.collisionGroups = new Set(config.collisionGroups || []);
    this.ignoreCollisionGroups = new Set(
      config.ignoreCollisionGroups || []
    );
    this.labels = new Set(config.labels || []);
    this.numberOfDirections = config.numberOfDirections;
    if (config.facingDirection) {
      this.turnTowards(config.facingDirection);
    }
    this.tileWidth = config.tileWidth ?? 1;
    this.tileHeight = config.tileHeight ?? 1;
  }
  getId() {
    return this.id;
  }
  getSpeed() {
    return this.speed;
  }
  setSpeed(speed) {
    this.speed = speed;
  }
  setMovement(movement) {
    this.autoMovementSet$.next(movement);
    this.movement = movement;
  }
  getMovement() {
    return this.movement;
  }
  collidesWithTiles() {
    return this.collidesWithTilesInternal;
  }
  setCollidesWithTiles(collidesWithTiles) {
    this.collidesWithTilesInternal = collidesWithTiles;
  }
  getIgnoreMissingTiles() {
    return this.ignoreMissingTiles;
  }
  setIgnoreMissingTiles(ignoreMissingTiles) {
    this.ignoreMissingTiles = ignoreMissingTiles;
  }
  setTilePosition(tilePosition) {
    this.currentMovementReverted = false;
    if (this.isMoving()) {
      this.movementStopped$.next(this.movementDirection);
    }
    this.tilePositionSet$.next({
      ...tilePosition
    });
    this.fire(this.positionChangeStarted$, this.tilePos, tilePosition);
    this.fire(this.positionChangeFinished$, this.tilePos, tilePosition);
    this.movementDirection = "none" /* NONE */;
    this.lastMovementImpulse = "none" /* NONE */;
    this.tilePos = tilePosition;
    this.movementProgress = 0;
  }
  getTilePos() {
    return this.tilePos;
  }
  getNextTilePos() {
    if (!this.isMoving()) return this.tilePos;
    if (this.currentMovementReverted) return this.tilePos;
    let layer = this.tilePos.layer;
    const nextPos = this.tilePosInDirection(
      this.tilePos.position,
      this.movementDirection
    );
    const transitionLayer = this.tilemap.getTransition(
      nextPos,
      this.tilePos.layer
    );
    if (transitionLayer) {
      layer = transitionLayer;
    }
    return {
      position: this.tilePosInDirection(
        this.tilePos.position,
        this.movementDirection
      ),
      layer
    };
  }
  getTileWidth() {
    return this.tileWidth;
  }
  getTileHeight() {
    return this.tileHeight;
  }
  move(direction) {
    this.lastMovementImpulse = direction;
    if (direction == "none" /* NONE */) return;
    if (this.isMoving()) return;
    if (this.isBlockingDirection(direction)) {
      this.changeFacingDirection(direction);
    } else {
      this.startMoving(direction);
    }
  }
  update(delta) {
    this.movement?.update(delta);
    if (this.isMoving()) {
      this.updateCharacterPosition(delta);
    }
    this.lastMovementImpulse = "none" /* NONE */;
  }
  getMovementDirection() {
    return this.movementDirection;
  }
  isBlockingDirection(direction) {
    if (direction == "none" /* NONE */) return false;
    const tilePosInDir = this.tilePosInDirection(
      this.getNextTilePos().position,
      direction
    );
    const layerInDirection = this.tilemap.getTransition(tilePosInDir, this.getNextTilePos().layer) || this.getNextTilePos().layer;
    if (this.collidesWithTilesInternal) {
      const isTileBlocking = this.isTileBlocking(direction, layerInDirection);
      if (isTileBlocking) return true;
    }
    return this.isCharBlocking(direction, layerInDirection);
  }
  isTileBlocking(direction, layerInDirection) {
    return this.someCharTile((x, y) => {
      const tilePosInDir = this.tilePosInDirection(
        new Vector2(x, y),
        direction
      );
      return this.tilemap.hasBlockingTile(
        tilePosInDir,
        layerInDirection,
        oppositeDirection(direction),
        this.ignoreMissingTiles
      );
    });
  }
  revertCurrentMovement() {
    if (this.isMoving()) {
      this.currentMovementReverted = true;
      this.movementDirection = oppositeDirection(this.movementDirection);
      this.facingDirection = this.movementDirection;
      this.movementProgress = MAX_MOVEMENT_PROGRESS - this.movementProgress;
      this.movementStarted$.next(this.facingDirection);
    }
  }
  isCurrentMovementReverted() {
    return this.currentMovementReverted;
  }
  isCharBlocking(direction, layerInDirection) {
    return this.someCharTile((x, y) => {
      const tilePosInDir = this.tilePosInDirection(
        new Vector2(x, y),
        direction
      );
      return this.tilemap.hasBlockingChar(
        tilePosInDir,
        layerInDirection,
        this.getCollisionGroups(),
        /* @__PURE__ */ new Set([this.getId()]),
        this.ignoreCollisionGroups
      );
    });
  }
  isMoving() {
    return this.movementDirection != "none" /* NONE */;
  }
  turnTowards(direction) {
    if (this.isMoving()) return;
    if (direction == "none" /* NONE */) return;
    this.changeFacingDirection(direction);
  }
  changeFacingDirection(newDirection) {
    if (this.facingDirection === newDirection) return;
    this.facingDirection = newDirection;
    this.directionChanged$.next(newDirection);
  }
  getFacingDirection() {
    return this.facingDirection;
  }
  getFacingPosition() {
    return this._tilePos.position.add(directionVector(this.facingDirection));
  }
  addCollisionGroup(collisionGroup) {
    this.collisionGroups.add(collisionGroup);
  }
  setCollisionGroups(collisionGroups) {
    this.collisionGroups = new Set(collisionGroups);
  }
  setIgnoreCollisionGroups(ignoreCollisionGroups) {
    this.ignoreCollisionGroups = new Set(ignoreCollisionGroups);
  }
  getCollisionGroups() {
    return Array.from(this.collisionGroups);
  }
  getIgnoreCollisionGroups() {
    return Array.from(this.ignoreCollisionGroups);
  }
  hasCollisionGroup(collisionGroup) {
    return this.collisionGroups.has(collisionGroup);
  }
  removeCollisionGroup(collisionGroup) {
    this.collisionGroups.delete(collisionGroup);
  }
  removeAllCollisionGroups() {
    this.collisionGroups.clear();
  }
  addLabels(labels) {
    for (const label of labels) {
      this.labels.add(label);
    }
  }
  getLabels() {
    return [...this.labels.values()];
  }
  hasLabel(label) {
    return this.labels.has(label);
  }
  clearLabels() {
    this.labels.clear();
  }
  removeLabels(labels) {
    for (const label of labels) {
      this.labels.delete(label);
    }
  }
  getNumberOfDirections() {
    return this.numberOfDirections;
  }
  movementStarted() {
    return this.movementStarted$;
  }
  movementStopped() {
    return this.movementStopped$;
  }
  directionChanged() {
    return this.directionChanged$;
  }
  tilePositionSet() {
    return this.tilePositionSet$;
  }
  positionChangeStarted() {
    return this.positionChangeStarted$;
  }
  positionChangeFinished() {
    return this.positionChangeFinished$;
  }
  autoMovementSet() {
    return this.autoMovementSet$;
  }
  depthChanged() {
    return this.depthChanged$;
  }
  getMovementProgress() {
    return this.movementProgress;
  }
  setMovementProgress(progress) {
    const newProgress = Math.max(0, Math.min(MAX_MOVEMENT_PROGRESS, progress));
    this.movementProgress = newProgress;
  }
  hasWalkedHalfATile() {
    return this.movementProgress > MAX_MOVEMENT_PROGRESS / 2;
  }
  willCrossTileBorderThisUpdate(delta) {
    return this.movementProgress + this.maxProgressForDelta(delta) >= MAX_MOVEMENT_PROGRESS;
  }
  updateCharacterPosition(delta) {
    const willCrossTileBorderThisUpdate = this.willCrossTileBorderThisUpdate(delta);
    const progressThisUpdate = willCrossTileBorderThisUpdate ? MAX_MOVEMENT_PROGRESS - this.movementProgress : this.maxProgressForDelta(delta);
    const proportionToWalk = 1 - progressThisUpdate / this.maxProgressForDelta(delta);
    this.movementProgress = Math.min(
      this.movementProgress + this.maxProgressForDelta(delta),
      MAX_MOVEMENT_PROGRESS
    );
    if (willCrossTileBorderThisUpdate) {
      this.movementProgress = 0;
      if (this.shouldContinueMoving()) {
        this.fire(
          this.positionChangeFinished$,
          this.tilePos,
          this.getNextTilePos()
        );
        this.tilePos = this.getNextTilePos();
        this.startMoving(this.lastMovementImpulse);
        if (proportionToWalk > 0) {
          this.updateCharacterPosition(delta * proportionToWalk);
        }
      } else {
        this.stopMoving();
      }
    }
  }
  maxProgressForDelta(delta) {
    const millisecondsPerSecond = 1e3;
    const deltaInSeconds = delta / millisecondsPerSecond;
    return Math.floor(deltaInSeconds * this.speed * MAX_MOVEMENT_PROGRESS);
  }
  get tilePos() {
    return LayerPositionUtils.clone(this._tilePos);
  }
  set tilePos(newTilePos) {
    LayerPositionUtils.copyOver(newTilePos, this._tilePos);
  }
  startMoving(direction) {
    if (direction === "none" /* NONE */) return;
    this.currentMovementReverted = false;
    if (direction != this.movementDirection) {
      this.movementStarted$.next(direction);
    }
    this.movementDirection = direction;
    this.facingDirection = direction;
    this.fire(this.positionChangeStarted$, this.tilePos, this.getNextTilePos());
  }
  tilePosInDirection(pos, direction) {
    return pos.add(directionVector(this.tilemap.toMapDirection(direction)));
  }
  shouldContinueMoving() {
    return this.lastMovementImpulse !== "none" /* NONE */ && !this.isBlockingDirection(this.lastMovementImpulse);
  }
  stopMoving() {
    if (this.movementDirection === "none" /* NONE */) return;
    const exitTile = this.tilePos;
    const enterTile = this.getNextTilePos();
    const lastMovementDir = this.movementDirection;
    this.tilePos = this.getNextTilePos();
    this.movementDirection = "none" /* NONE */;
    this.movementStopped$.next(lastMovementDir);
    this.currentMovementReverted = false;
    this.fire(this.positionChangeFinished$, exitTile, enterTile);
  }
  fire(subject, { position: exitTile, layer: exitLayer }, { position: enterTile, layer: enterLayer }) {
    subject.next({ exitTile, enterTile, exitLayer, enterLayer });
  }
  someCharTile(predicate) {
    const tilePos = this.getNextTilePos().position;
    for (let x = tilePos.x; x < tilePos.x + this.getTileWidth(); x++) {
      for (let y = tilePos.y; y < tilePos.y + this.getTileHeight(); y++) {
        if (predicate(x, y)) return true;
      }
    }
    return false;
  }
};

// src/GridCharacter/CharacterAnimation/CharacterAnimation.ts
var import_rxjs2 = __toESM(require_cjs(), 1);
var CharacterAnimation = class _CharacterAnimation {
  constructor(walkingAnimationMapping, charsInRow) {
    this.walkingAnimationMapping = walkingAnimationMapping;
    this.charsInRow = charsInRow;
    this.lastFootLeft = false;
    this.directionToFrameRow = {
      ["down" /* DOWN */]: 0,
      ["down-left" /* DOWN_LEFT */]: 1,
      ["down-right" /* DOWN_RIGHT */]: 2,
      ["left" /* LEFT */]: 1,
      ["right" /* RIGHT */]: 2,
      ["up" /* UP */]: 3,
      ["up-left" /* UP_LEFT */]: 1,
      ["up-right" /* UP_RIGHT */]: 2
    };
    this._isEnabled = true;
    this.frameChange$ = new import_rxjs2.Subject();
    this.setWalkingAnimationMapping(walkingAnimationMapping);
  }
  static {
    this.FRAMES_CHAR_ROW = 3;
  }
  static {
    this.FRAMES_CHAR_COL = 4;
  }
  frameChange() {
    return this.frameChange$;
  }
  setIsEnabled(isEnabled) {
    this._isEnabled = isEnabled;
  }
  isEnabled() {
    return this._isEnabled;
  }
  updateCharacterFrame(movementDirection, hasWalkedHalfATile, currentFrame) {
    if (this._isEnabled) {
      if (hasWalkedHalfATile) {
        this.setStandingFrameDuringWalk(movementDirection, currentFrame);
      } else {
        this.setWalkingFrame(movementDirection);
      }
    }
  }
  setStandingFrame(direction) {
    if (this._isEnabled) {
      this._setStandingFrame(direction);
    }
  }
  setWalkingAnimationMapping(walkingAnimationMapping) {
    this.walkingAnimationMapping = walkingAnimationMapping;
    this._isEnabled = this.walkingAnimationMapping !== void 0;
  }
  getWalkingAnimationMapping() {
    return this.walkingAnimationMapping;
  }
  getCharsInRow() {
    return this.charsInRow;
  }
  setStandingFrameDuringWalk(direction, currentFrame) {
    if (!this.isCurrentFrameStanding(direction, currentFrame)) {
      this.lastFootLeft = !this.lastFootLeft;
    }
    this._setStandingFrame(direction);
  }
  setWalkingFrame(direction) {
    const frameRow = this.framesOfDirection(direction);
    if (frameRow)
      this.frameChange$.next(
        this.lastFootLeft ? frameRow.rightFoot : frameRow.leftFoot
      );
  }
  _setStandingFrame(direction) {
    const framesOfDirection = this.framesOfDirection(direction);
    if (framesOfDirection) {
      this.frameChange$.next(framesOfDirection.standing);
    }
  }
  isCurrentFrameStanding(direction, currentFrame) {
    return currentFrame === this.framesOfDirection(direction)?.standing;
  }
  framesOfDirection(direction) {
    if (typeof this.walkingAnimationMapping === "number") {
      return this.getFramesForCharIndex(
        direction,
        this.walkingAnimationMapping
      );
    }
    return this.getFramesForAnimationMapping(direction);
  }
  getFramesForAnimationMapping(direction) {
    if (!this.walkingAnimationMapping) return;
    return this.walkingAnimationMapping[direction] || this.walkingAnimationMapping[this.fallbackDirection(direction)];
  }
  fallbackDirection(direction) {
    switch (direction) {
      case "down-left" /* DOWN_LEFT */:
        return "left" /* LEFT */;
      case "down-right" /* DOWN_RIGHT */:
        return "right" /* RIGHT */;
      case "up-left" /* UP_LEFT */:
        return "left" /* LEFT */;
      case "up-right" /* UP_RIGHT */:
        return "right" /* RIGHT */;
    }
    return direction;
  }
  getFramesForCharIndex(direction, characterIndex) {
    const playerCharRow = Math.floor(characterIndex / this.charsInRow);
    const playerCharCol = characterIndex % this.charsInRow;
    const framesInRow = this.charsInRow * _CharacterAnimation.FRAMES_CHAR_ROW;
    const framesInSameRowBefore = _CharacterAnimation.FRAMES_CHAR_ROW * playerCharCol;
    const rows = (this.directionToFrameRow[direction] ?? 0) + playerCharRow * _CharacterAnimation.FRAMES_CHAR_COL;
    const startFrame = framesInSameRowBefore + rows * framesInRow;
    return {
      rightFoot: startFrame,
      standing: startFrame + 1,
      leftFoot: startFrame + 2
    };
  }
};

// src/Utils/Utils/Utils.ts
var Utils = class {
  static shiftPad(num, places) {
    const floor = Math.floor(num);
    const str = `${floor}`.padStart(places, "0");
    const strPlaces = str.length;
    return floor / Math.pow(10, strPlaces);
  }
};

// src/GridEnginePhaser/GridCharacterPhaser/GridCharacterPhaser.ts
var import_rxjs3 = __toESM(require_cjs(), 1);
var import_operators = __toESM(require_operators(), 1);

// src/Utils/VectorUtils.ts
var VectorUtils = class _VectorUtils {
  static vec2str(vec) {
    return `${vec.x}#${vec.y}`;
  }
  static equal(vec1, vec2) {
    return _VectorUtils.vec2str(vec1) == _VectorUtils.vec2str(vec2);
  }
  static manhattanDistance(pos1, pos2) {
    const xDist = Math.abs(pos1.x - pos2.x);
    const yDist = Math.abs(pos1.y - pos2.y);
    return xDist + yDist;
  }
  static chebyshevDistance(pos1, pos2) {
    const xDist = Math.abs(pos1.x - pos2.x);
    const yDist = Math.abs(pos1.y - pos2.y);
    return Math.max(xDist, yDist);
  }
  static scalarMult(vec, scalar) {
    return vec.clone().multiply(new Vector2(scalar, scalar));
  }
};

// src/GridEnginePhaser/GridTilemapPhaser/GridTilemapPhaser.ts
var GridTilemapPhaser = class _GridTilemapPhaser {
  constructor(tilemap) {
    this.tilemap = tilemap;
    this.charLayerDepths = /* @__PURE__ */ new Map();
    this.setLayerDepths();
  }
  static {
    this.ALWAYS_TOP_PROP_NAME = "ge_alwaysTop";
  }
  static {
    this.CHAR_LAYER_PROP_NAME = "ge_charLayer";
  }
  static {
    this.HEIGHT_SHIFT_PROP_NAME = "ge_heightShift";
  }
  static {
    this.Z_INDEX_PADDING = 7;
  }
  getTileWidth() {
    const tilemapScale = this.tilemap.layers[0]?.tilemapLayer.scale ?? 1;
    return this.tilemap.tileWidth * tilemapScale;
  }
  getTileHeight() {
    const tilemapScale = this.tilemap.layers[0]?.tilemapLayer.scale ?? 1;
    return this.tilemap.tileHeight * tilemapScale;
  }
  getDepthOfCharLayer(layerName) {
    return this.charLayerDepths.get(layerName) ?? 0;
  }
  tilePosToPixelPos(tilePosition) {
    if (this.isIsometric()) {
      return VectorUtils.scalarMult(this.getTileSize(), 0.5).multiply(
        new Vector2(
          tilePosition.x - tilePosition.y,
          tilePosition.x + tilePosition.y
        )
      );
    }
    return tilePosition.clone().multiply(this.getTileSize());
  }
  getTileDistance(direction) {
    if (this.isIsometric()) {
      switch (direction) {
        case "down-left" /* DOWN_LEFT */:
        case "down-right" /* DOWN_RIGHT */:
        case "up-left" /* UP_LEFT */:
        case "up-right" /* UP_RIGHT */:
          return VectorUtils.scalarMult(this.getTileSize(), 0.5);
        default:
          return this.getTileSize();
      }
    }
    return this.getTileSize();
  }
  getTileSize() {
    return new Vector2(this.getTileWidth(), this.getTileHeight());
  }
  isIsometric() {
    return this.tilemap.orientation == Phaser.Tilemaps.Orientation.ISOMETRIC.toString();
  }
  isLayerAlwaysOnTop(layerData) {
    return this.hasLayerProp(layerData, _GridTilemapPhaser.ALWAYS_TOP_PROP_NAME);
  }
  isCharLayer(layerData) {
    return this.hasLayerProp(layerData, _GridTilemapPhaser.CHAR_LAYER_PROP_NAME);
  }
  setLayerDepths() {
    const layersToDelete = [];
    let offset = -1;
    const alwaysOnTopLayers = this.tilemap.layers.filter(
      (l) => this.isLayerAlwaysOnTop(l)
    );
    const otherLayers = this.tilemap.layers.filter(
      (l) => !this.isLayerAlwaysOnTop(l)
    );
    otherLayers.forEach((layerData) => {
      if (this.hasLayerProp(layerData, _GridTilemapPhaser.HEIGHT_SHIFT_PROP_NAME)) {
        this.createHeightShiftLayers(layerData, offset);
        layersToDelete.push(layerData.tilemapLayer);
      } else {
        this.setDepth(layerData, ++offset);
      }
    });
    this.charLayerDepths.set(void 0, offset);
    alwaysOnTopLayers.forEach((layer, layerIndex) => {
      layer.tilemapLayer.setDepth(layerIndex + 1 + offset);
    });
    layersToDelete.forEach((layer) => layer.destroy());
  }
  setDepth(layerData, depth) {
    layerData.tilemapLayer.setDepth(depth);
    if (this.isCharLayer(layerData)) {
      this.charLayerDepths.set(
        this.getLayerProp(layerData, _GridTilemapPhaser.CHAR_LAYER_PROP_NAME),
        depth
      );
    }
  }
  createHeightShiftLayers(layer, offset) {
    let heightShift = this.getLayerProp(
      layer,
      _GridTilemapPhaser.HEIGHT_SHIFT_PROP_NAME
    );
    if (isNaN(heightShift)) heightShift = 0;
    const makeHigherThanCharWhenOnSameLevel = 1;
    for (let row = 0; row < layer.height; row++) {
      const newLayer = this.copyLayer(layer, row);
      if (newLayer) {
        newLayer.scale = layer.tilemapLayer.scale;
        const tileHeight = this.isIsometric() ? this.getTileHeight() / 2 : this.getTileHeight();
        newLayer.setDepth(
          offset + Utils.shiftPad(
            (row + heightShift) * tileHeight + makeHigherThanCharWhenOnSameLevel,
            _GridTilemapPhaser.Z_INDEX_PADDING
          )
        );
      }
    }
  }
  getLayerProp(layer, name) {
    const layerProps = layer.properties;
    const prop = layerProps.find((el) => el.name == name);
    return prop?.value;
  }
  hasLayerProp(layer, name) {
    return this.getLayerProp(layer, name) != void 0;
  }
  copyLayer(layerData, row) {
    const name = `${layerData.name}#${row}`;
    const newLayer = this.tilemap.createBlankLayer(
      name,
      layerData.tilemapLayer.tileset
    );
    if (!newLayer) return void 0;
    newLayer.name = name;
    if (this.isIsometric()) {
      for (let r = row; r >= 0; r--) {
        const col = row - r;
        newLayer.putTileAt(layerData.data[r][col], col, r);
      }
    } else {
      for (let col = 0; col < layerData.width; col++) {
        newLayer.putTileAt(layerData.data[row][col], col, row);
      }
    }
    return newLayer;
  }
};

// src/GridEnginePhaser/GridCharacterPhaser/GridCharacterPhaser.ts
var GridCharacterPhaser = class {
  constructor(charData, scene, tilemap, layerOverlay, geHeadless) {
    this.charData = charData;
    this.scene = scene;
    this.tilemap = tilemap;
    this.geHeadless = geHeadless;
    this.customOffset = new Vector2(0, 0);
    this.depthOffset = 0;
    this.cachedContainerHeight = 0;
    this.newSpriteSet$ = new import_rxjs3.Subject();
    this.destroy$ = new import_rxjs3.Subject();
    this.layerOverlaySprite = layerOverlay && charData.sprite ? this.scene.add.sprite(0, 0, charData.sprite.texture) : void 0;
    this.walkingAnimationMapping = charData.walkingAnimationMapping;
    this.customOffset = new Vector2(
      charData.offsetX || 0,
      charData.offsetY || 0
    );
    this.depthOffset = charData.depthOffset ?? 0;
    this.sprite = charData.sprite;
    this.container = charData.container;
    this.cachedContainerHeight = charData.container?.getBounds().height ?? 0;
    this.geHeadless.directionChanged().pipe((0, import_operators.filter)(({ charId }) => charId === this.charData.id)).subscribe(({ direction }) => {
      this.animation?.setStandingFrame(direction);
    });
    if (this.sprite) {
      this.sprite.setOrigin(0, 0);
      this.resetAnimation(this.sprite);
      this.updateOverlaySprite();
      this.updateGridChar();
    }
  }
  destroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.newSpriteSet$.complete();
  }
  setSprite(sprite) {
    if (sprite) {
      if (this.sprite) {
        sprite.x = this.sprite.x;
        sprite.y = this.sprite.y;
      }
      this.sprite = sprite;
      this.newSpriteSet$.next();
      this.layerOverlaySprite = this.layerOverlaySprite ? this.scene.add.sprite(0, 0, this.sprite.texture) : void 0;
      this.updateOverlaySprite();
      this.resetAnimation(this.sprite);
      this.updateDepth();
    } else {
      this.layerOverlaySprite = void 0;
      this.sprite = void 0;
    }
  }
  getSprite() {
    return this.sprite;
  }
  getLayerOverlaySprite() {
    return this.layerOverlaySprite;
  }
  setContainer(container) {
    this.container = container;
    this.cachedContainerHeight = container?.getBounds().height ?? 0;
  }
  getContainer() {
    return this.container;
  }
  getOffsetX() {
    return this.customOffset.x;
  }
  setOffsetX(offsetX) {
    this.customOffset.x = offsetX;
  }
  getOffsetY() {
    return this.customOffset.y;
  }
  setOffsetY(offsetY) {
    this.customOffset.y = offsetY;
  }
  getWalkingAnimationMapping() {
    return this.walkingAnimationMapping;
  }
  turnTowards(direction) {
    if (this.geHeadless.isMoving(this.charData.id)) return;
    if (direction == "none" /* NONE */) return;
    this.geHeadless.turnTowards(this.charData.id, direction);
    this.animation?.setStandingFrame(direction);
  }
  getAnimation() {
    return this.animation;
  }
  setAnimation(animation) {
    this.animation = animation;
  }
  update(_delta) {
    this.updateGridChar();
  }
  getDepthOffset() {
    return this.depthOffset;
  }
  getEngineOffset() {
    if (!this.sprite) {
      return Vector2.ZERO;
    }
    const offsetX = this.tilemap.getTileWidth() / 2 - Math.floor((this.sprite?.displayWidth ?? 0) / 2);
    const offsetY = -(this.sprite?.displayHeight ?? 0) + this.tilemap.getTileHeight();
    return new Vector2(offsetX, offsetY);
  }
  updatePixelPos() {
    let tp = new Vector2(this.geHeadless.getPosition(this.charData.id));
    if (this.geHeadless.isCurrentMovementReverted(this.charData.id)) {
      tp = new Vector2(
        this.geHeadless.getTilePosInDirection(
          this.geHeadless.getPosition(this.charData.id),
          this.geHeadless.getCharLayer(this.charData.id),
          oppositeDirection(
            this.geHeadless.getFacingDirection(this.charData.id)
          )
        ).position
      );
    }
    const movementProgressProportional = this.geHeadless.getMovementProgress(this.charData.id) / 1e3;
    const basePixelPos = this.tilemap.tilePosToPixelPos(tp).add(this.getEngineOffset()).add(this.customOffset);
    const newPixelPos = basePixelPos.add(
      directionVector(
        this.geHeadless.getFacingDirection(this.charData.id)
      ).multiply(
        this.tilemap.getTileDistance(this.geHeadless.getFacingDirection(this.charData.id)).scalarMult(movementProgressProportional)
      )
    );
    const gameObj = this.getGameObj();
    if (gameObj) {
      gameObj.x = Math.floor(newPixelPos.x);
      gameObj.y = Math.floor(newPixelPos.y);
    }
  }
  getGameObj() {
    return this.container || this.sprite;
  }
  updateGridChar() {
    this.updatePixelPos();
    if (this.sprite && this.geHeadless.isMoving(this.charData.id)) {
      const hasWalkedHalfATile = this.geHeadless.getMovementProgress(this.charData.id) > MAX_MOVEMENT_PROGRESS / 2;
      this.getAnimation()?.updateCharacterFrame(
        this.geHeadless.getFacingDirection(this.charData.id),
        hasWalkedHalfATile,
        Number(this.sprite.frame.name)
      );
    }
    this.updateDepth();
  }
  resetAnimation(sprite) {
    const animation = new CharacterAnimation(
      this.walkingAnimationMapping,
      sprite.texture.source[0].width / sprite.width / CharacterAnimation.FRAMES_CHAR_ROW
    );
    this.setAnimation(animation);
    animation.frameChange().pipe((0, import_operators.takeUntil)(this.newSpriteSet$)).subscribe((frameNo) => {
      sprite?.setFrame(frameNo);
    });
    animation.setIsEnabled(this.walkingAnimationMapping !== void 0);
    animation.setStandingFrame(
      this.geHeadless.getFacingDirection(this.charData.id)
    );
  }
  updateOverlaySprite() {
    if (!this.layerOverlaySprite || !this.sprite) return;
    this.layerOverlaySprite.scale = this.sprite.scale;
    const scaledTileHeight = this.tilemap.getTileHeight() / this.layerOverlaySprite.scale;
    this.layerOverlaySprite.setCrop(
      0,
      0,
      this.layerOverlaySprite.displayWidth,
      this.sprite.height - scaledTileHeight
    );
    this.layerOverlaySprite.setOrigin(0, 0);
  }
  updateDepth() {
    const gameObj = this.getGameObj();
    if (!gameObj) return;
    const position = new Vector2(this.geHeadless.getPosition(this.charData.id));
    const layer = this.geHeadless.getCharLayer(this.charData.id);
    if (this.container) {
      this.setContainerDepth(this.container, { position, layer });
    } else if (this.sprite) {
      this.setSpriteDepth(this.sprite, { position, layer });
    }
    const layerOverlaySprite = this.getLayerOverlaySprite();
    if (layerOverlaySprite) {
      const posAbove = new Vector2({
        ...position,
        y: position.y - 1
      });
      this.setSpriteDepth(layerOverlaySprite, {
        position: posAbove,
        layer
      });
    }
  }
  setSpriteDepth(sprite, position) {
    sprite.setDepth(
      this.tilemap.getDepthOfCharLayer(this.getTransitionLayer(position)) + this.getPaddedPixelDepthSprite(sprite)
    );
  }
  setContainerDepth(container, position) {
    container.setDepth(
      this.tilemap.getDepthOfCharLayer(this.getTransitionLayer(position)) + this.getPaddedPixelDepthContainer(container)
    );
  }
  getPaddedPixelDepthContainer(container) {
    return Utils.shiftPad(
      container.y + this.cachedContainerHeight,
      GridTilemapPhaser.Z_INDEX_PADDING
    );
  }
  getPaddedPixelDepthSprite(sprite) {
    return Utils.shiftPad(
      sprite.y + sprite.displayHeight + this.depthOffset,
      GridTilemapPhaser.Z_INDEX_PADDING
    );
  }
  getTransitionLayer(position) {
    if (!position.layer) return void 0;
    return this.geHeadless.getTransition(position.position, position.layer) || position.layer;
  }
};

// src/Collisions/CollisionStrategy.ts
var CollisionStrategy = /* @__PURE__ */ ((CollisionStrategy2) => {
  CollisionStrategy2["DONT_BLOCK"] = "DONT_BLOCK";
  CollisionStrategy2["BLOCK_TWO_TILES"] = "BLOCK_TWO_TILES";
  CollisionStrategy2["BLOCK_ONE_TILE_AHEAD"] = "BLOCK_ONE_TILE_AHEAD";
  CollisionStrategy2["BLOCK_ONE_TILE_BEHIND"] = "BLOCK_ONE_TILE_BEHIND";
  return CollisionStrategy2;
})(CollisionStrategy || {});

// src/Pathfinding/NoPathFoundStrategy.ts
var NoPathFoundStrategy = /* @__PURE__ */ ((NoPathFoundStrategy2) => {
  NoPathFoundStrategy2["STOP"] = "STOP";
  NoPathFoundStrategy2["CLOSEST_REACHABLE"] = "CLOSEST_REACHABLE";
  NoPathFoundStrategy2["RETRY"] = "RETRY";
  NoPathFoundStrategy2["ALTERNATIVE_TARGETS"] = "ALTERNATIVE_TARGETS";
  return NoPathFoundStrategy2;
})(NoPathFoundStrategy || {});

// src/Utils/DistanceUtils4/DistanceUtils4.ts
var DistanceUtils4 = class {
  distance(pos1, pos2) {
    return VectorUtils.manhattanDistance(pos1, pos2);
  }
  direction(from, to) {
    if (VectorUtils.equal(from, to)) return "none" /* NONE */;
    const diff = from.clone().subtract(to);
    if (Math.abs(diff.x) > Math.abs(diff.y)) {
      if (diff.x > 0) {
        return "left" /* LEFT */;
      } else {
        return "right" /* RIGHT */;
      }
    } else {
      if (diff.y > 0) {
        return "up" /* UP */;
      } else {
        return "down" /* DOWN */;
      }
    }
  }
  neighbors(pos) {
    return [
      new Vector2(pos.x, pos.y + 1),
      new Vector2(pos.x + 1, pos.y),
      new Vector2(pos.x - 1, pos.y),
      new Vector2(pos.x, pos.y - 1)
    ];
  }
  getDirections() {
    return ["up" /* UP */, "right" /* RIGHT */, "down" /* DOWN */, "left" /* LEFT */];
  }
};

// src/Utils/DistanceUtils8/DistanceUtils8.ts
var DistanceUtils8 = class {
  distance(pos1, pos2) {
    return VectorUtils.chebyshevDistance(pos1, pos2);
  }
  neighbors(pos) {
    const orthogonalNeighbors = [
      new Vector2(pos.x, pos.y + 1),
      new Vector2(pos.x + 1, pos.y),
      new Vector2(pos.x - 1, pos.y),
      new Vector2(pos.x, pos.y - 1)
    ];
    const diagonalNeighbors = [
      new Vector2(pos.x + 1, pos.y + 1),
      new Vector2(pos.x + 1, pos.y - 1),
      new Vector2(pos.x - 1, pos.y + 1),
      new Vector2(pos.x - 1, pos.y - 1)
    ];
    return [...orthogonalNeighbors, ...diagonalNeighbors];
  }
  direction(from, to) {
    if (to.x > from.x) {
      if (to.y > from.y) {
        return "down-right" /* DOWN_RIGHT */;
      } else if (to.y < from.y) {
        return "up-right" /* UP_RIGHT */;
      } else {
        return "right" /* RIGHT */;
      }
    } else if (to.x < from.x) {
      if (to.y > from.y) {
        return "down-left" /* DOWN_LEFT */;
      } else if (to.y < from.y) {
        return "up-left" /* UP_LEFT */;
      } else {
        return "left" /* LEFT */;
      }
    } else if (to.y < from.y) {
      return "up" /* UP */;
    } else if (to.y > from.y) {
      return "down" /* DOWN */;
    }
    return "none" /* NONE */;
  }
  getDirections() {
    return [
      "up" /* UP */,
      "right" /* RIGHT */,
      "down" /* DOWN */,
      "left" /* LEFT */,
      "down-left" /* DOWN_LEFT */,
      "down-right" /* DOWN_RIGHT */,
      "up-right" /* UP_RIGHT */,
      "up-left" /* UP_LEFT */
    ];
  }
};

// src/Utils/DistanceUtilsFactory/DistanceUtilsFactory.ts
var DistanceUtilsFactory = class {
  static create(numberOfDirections) {
    switch (numberOfDirections) {
      case 4 /* FOUR */:
        return new DistanceUtils4();
      case 8 /* EIGHT */:
        return new DistanceUtils8();
    }
  }
};

// src/Movement/TargetMovement/Retryable/Retryable.ts
var Retryable = class {
  constructor(backoffMs, maxRetries, onFinished) {
    this.backoffMs = backoffMs;
    this.maxRetries = maxRetries;
    this.onFinished = onFinished;
    this.retries = 0;
    this.elapsed = 0;
  }
  retry(elapsed, fn) {
    if (this.shouldRetry()) {
      this.elapsed += elapsed;
      if (this.elapsed >= this.backoffMs) {
        this.elapsed = 0;
        this.retries++;
        fn();
      }
    } else {
      this.onFinished();
    }
  }
  reset() {
    this.retries = 0;
    this.elapsed = 0;
  }
  getMaxRetries() {
    return this.maxRetries;
  }
  getBackoffMs() {
    return this.backoffMs;
  }
  shouldRetry() {
    return this.maxRetries === -1 || this.retries < this.maxRetries;
  }
};

// src/Pathfinding/PathBlockedStrategy.ts
var PathBlockedStrategy = /* @__PURE__ */ ((PathBlockedStrategy2) => {
  PathBlockedStrategy2["WAIT"] = "WAIT";
  PathBlockedStrategy2["RETRY"] = "RETRY";
  PathBlockedStrategy2["STOP"] = "STOP";
  return PathBlockedStrategy2;
})(PathBlockedStrategy || {});

// src/Movement/TargetMovement/TargetMovement.ts
var import_rxjs7 = __toESM(require_cjs(), 1);

// src/Pathfinding/ShortestPathAlgorithm.ts
var ShortestPathAlgorithm = class {
  constructor(gridTilemap, {
    shortestPathAlgorithm = "BFS",
    pathWidth = 1,
    pathHeight = 1,
    numberOfDirections = 4 /* FOUR */,
    isPositionAllowed = (_pos, _charLayer) => true,
    collisionGroups = [],
    ignoredChars = [],
    ignoreTiles = false,
    ignoreMapBounds = false,
    ignoreBlockedTarget = false,
    maxPathLength = Infinity,
    ignoreLayers = false,
    considerCosts = false,
    calculateClosestToTarget = true
  } = {}) {
    this.gridTilemap = gridTilemap;
    this.options = {
      shortestPathAlgorithm,
      pathWidth,
      pathHeight,
      numberOfDirections,
      isPositionAllowed,
      collisionGroups,
      ignoredChars,
      ignoreTiles,
      ignoreMapBounds,
      ignoreBlockedTarget,
      maxPathLength,
      ignoreLayers,
      considerCosts,
      calculateClosestToTarget
    };
    this.ignoredCharsSet = new Set(ignoredChars);
  }
  findShortestPath(startPos, targetPos) {
    if (this.options.ignoreLayers) {
      this.gridTilemap.fixCacheLayer(startPos.layer);
      targetPos.layer = startPos.layer;
    }
    const res = this.findShortestPathImpl(startPos, targetPos);
    this.gridTilemap.unfixCacheLayers();
    return res;
  }
  getNeighbors(pos, dest) {
    const distanceUtils = DistanceUtilsFactory.create(
      this.options.numberOfDirections ?? 4 /* FOUR */
    );
    const neighbours = distanceUtils.neighbors(pos.position);
    const transitionMappedNeighbors = neighbours.map((unblockedNeighbor) => {
      let transition = pos.layer;
      if (!this.options.ignoreLayers) {
        transition = this.gridTilemap.getTransition(
          unblockedNeighbor,
          pos.layer
        );
      }
      return {
        position: unblockedNeighbor,
        layer: transition || pos.layer
      };
    });
    return transitionMappedNeighbors.filter((neighborPos) => {
      return !this.isBlocking(pos, neighborPos) || this.options.ignoreBlockedTarget && LayerPositionUtils.equal(neighborPos, dest);
    });
  }
  getTransition(pos, fromLayer) {
    if (this.options.ignoreLayers) return void 0;
    return this.gridTilemap.getTransition(pos, fromLayer);
  }
  getCosts(src, dest) {
    if (!this.options.considerCosts) return 1;
    const dir = directionFromPos(dest.position, src);
    return this.gridTilemap.getTileCosts(dest, dir);
  }
  isBlocking(src, dest) {
    const inRange = this.options.ignoreMapBounds || this.gridTilemap.isInRange(dest.position);
    if (!inRange) return true;
    const positionAllowed = this.options.isPositionAllowed(
      dest.position,
      dest.layer
    );
    if (!positionAllowed) return true;
    const tileBlocking = !this.options.ignoreTiles && this.hasBlockingTileFrom(
      src,
      dest,
      this.options.pathWidth,
      this.options.pathHeight,
      this.options.ignoreMapBounds,
      this.gridTilemap
    );
    if (tileBlocking) return true;
    const charBlocking = this.hasBlockingCharFrom(
      src,
      dest,
      this.options.pathWidth,
      this.options.pathHeight,
      this.options.collisionGroups,
      this.ignoredCharsSet,
      this.gridTilemap
    );
    return charBlocking;
  }
  distance(fromNode, toNode) {
    const distance = this.options.numberOfDirections === 4 /* FOUR */ ? VectorUtils.manhattanDistance : VectorUtils.chebyshevDistance;
    return distance(fromNode, toNode);
  }
  getTilePosInDir(pos, dir) {
    if (this.options.ignoreLayers) {
      return {
        position: pos.position.add(
          directionVector(this.gridTilemap.toMapDirection(dir))
        ),
        layer: pos.layer
      };
    }
    return this.gridTilemap.getTilePosInDirection(pos, dir);
  }
  getReverseNeighbors(pos, dest) {
    const distanceUtils = DistanceUtilsFactory.create(
      this.options.numberOfDirections ?? 4 /* FOUR */
    );
    const neighbors = distanceUtils.neighbors(pos.position);
    let toCurrentLayerArr = void 0;
    if (!this.options.ignoreLayers) {
      const toCurrentLayer = this.gridTilemap.getReverseTransitions(
        pos.position,
        pos.layer
      );
      toCurrentLayerArr = toCurrentLayer ? [...toCurrentLayer] : void 0;
    }
    const transitionMappedNeighbors = neighbors.map((neighbor) => {
      if (!toCurrentLayerArr) {
        return [
          {
            position: neighbor,
            layer: pos.layer
          }
        ];
      }
      return toCurrentLayerArr.map((lay) => {
        return {
          position: neighbor,
          layer: lay || pos.layer
        };
      });
    }).flat();
    return transitionMappedNeighbors.filter((neighborPos) => {
      return !this.isBlocking(neighborPos, pos) || this.options.ignoreBlockedTarget && LayerPositionUtils.equal(pos, dest);
    });
  }
  hasBlockingCharFrom(src, dest, pathWidth, pathHeight, collisionGroups, ignoredChars, gridTilemap) {
    if (pathWidth === 1 && pathHeight === 1) {
      return gridTilemap.hasBlockingChar(
        dest.position,
        dest.layer,
        collisionGroups,
        ignoredChars
      );
    }
    const isBlocking = (pos) => {
      return gridTilemap.hasBlockingChar(
        pos,
        dest.layer,
        collisionGroups,
        ignoredChars
      );
    };
    const dir = directionFromPos(src.position, dest.position);
    return this.isBlockingMultiTile(
      src,
      dir,
      pathWidth,
      pathHeight,
      isBlocking
    );
  }
  hasBlockingTileFrom(src, dest, pathWidth, pathHeight, ignoreMapBounds, gridTilemap) {
    if (pathWidth === 1 && pathHeight === 1) {
      return gridTilemap.hasBlockingTile(
        dest.position,
        dest.layer,
        directionFromPos(dest.position, src.position),
        ignoreMapBounds
      );
    }
    const dir = directionFromPos(src.position, dest.position);
    const isBlocking = (pos) => {
      return gridTilemap.hasBlockingTile(pos, dest.layer, dir, ignoreMapBounds);
    };
    return this.isBlockingMultiTile(
      src,
      dir,
      pathWidth,
      pathHeight,
      isBlocking
    );
  }
  /**
   * This method is not the prettiest, but it minimizes the positions that have
   * to be checked in order to determine if a position is blocked for a
   * multi-tile character.
   */
  isBlockingMultiTile(src, dir, pathWidth, pathHeight, isBlocking) {
    const right = {
      src: new Vector2(src.position.x + pathWidth, src.position.y),
      dest: new Vector2(
        src.position.x + pathWidth,
        src.position.y + pathHeight - 1
      )
    };
    const left = {
      src: new Vector2(src.position.x - 1, src.position.y),
      dest: new Vector2(src.position.x - 1, src.position.y + pathHeight - 1)
    };
    const up = {
      src: new Vector2(src.position.x, src.position.y - 1),
      dest: new Vector2(src.position.x + pathWidth - 1, src.position.y - 1)
    };
    const down = {
      src: new Vector2(src.position.x, src.position.y + pathHeight),
      dest: new Vector2(
        src.position.x + pathWidth - 1,
        src.position.y + pathHeight
      )
    };
    switch (dir) {
      case "right" /* RIGHT */: {
        return this.checkLine(right, isBlocking);
      }
      case "left" /* LEFT */: {
        return this.checkLine(left, isBlocking);
      }
      case "up" /* UP */: {
        return this.checkLine(up, isBlocking);
      }
      case "down" /* DOWN */: {
        return this.checkLine(down, isBlocking);
      }
      case "up-left" /* UP_LEFT */: {
        return (
          // up
          this.checkLine(
            { src: up.src, dest: new Vector2(up.dest.x - 1, up.dest.y) },
            isBlocking
          ) || // left
          this.checkLine(
            {
              src: new Vector2(left.src.x, left.src.y - 1),
              dest: new Vector2(left.dest.x, left.dest.y - 1)
            },
            isBlocking
          )
        );
      }
      case "up-right" /* UP_RIGHT */: {
        return (
          // up
          this.checkLine(
            {
              src: new Vector2(up.src.x + 1, up.src.y),
              dest: up.dest
            },
            isBlocking
          ) || // right
          this.checkLine(
            {
              src: new Vector2(right.src.x, right.src.y - 1),
              dest: new Vector2(right.dest.x, right.dest.y - 1)
            },
            isBlocking
          )
        );
      }
      case "down-left" /* DOWN_LEFT */: {
        return (
          // left
          this.checkLine(
            {
              src: new Vector2(left.src.x, left.src.y + 1),
              dest: new Vector2(left.dest.x, left.dest.y + 1)
            },
            isBlocking
          ) || // down
          this.checkLine(
            { src: down.src, dest: new Vector2(down.dest.x - 1, down.dest.y) },
            isBlocking
          )
        );
      }
      case "down-right" /* DOWN_RIGHT */: {
        return (
          // down
          this.checkLine(
            { src: new Vector2(down.src.x + 1, down.src.y), dest: down.dest },
            isBlocking
          ) || // right
          this.checkLine(
            {
              src: new Vector2(right.src.x, right.src.y + 1),
              dest: new Vector2(right.dest.x, right.dest.y + 1)
            },
            isBlocking
          )
        );
      }
    }
    return false;
  }
  checkLine(line, isBlocking) {
    for (let x = line.src.x; x <= line.dest.x; x++) {
      for (let y = line.src.y; y <= line.dest.y; y++) {
        const res = isBlocking(new Vector2(x, y));
        if (res) return true;
      }
    }
    return false;
  }
};

// src/Pathfinding/AStar/AStar.ts
var import_fibonacci_heap = __toESM(require_fibonacci_heap(), 1);
var AStar = class extends ShortestPathAlgorithm {
  findShortestPathImpl(startPos, targetPos) {
    const shortestPath = this.shortestPathBfs(startPos, targetPos);
    return {
      path: this.returnPath(shortestPath.previous, startPos, targetPos),
      closestToTarget: shortestPath.closestToTarget,
      steps: shortestPath.steps,
      maxPathLengthReached: shortestPath.maxPathLengthReached,
      algorithmUsed: "A_STAR"
    };
  }
  shortestPathBfs(startNode, stopNode) {
    const previous = /* @__PURE__ */ new Map();
    const g = /* @__PURE__ */ new Map();
    const f = /* @__PURE__ */ new Map();
    const openSet = new import_fibonacci_heap.MinFibonacciHeap(
      (a, b) => safeGet(f, a) - safeGet(f, b)
    );
    let closestToTarget = startNode;
    let smallestDistToTarget = this.distance(
      startNode.position,
      stopNode.position
    );
    let steps = 0;
    openSet.push(startNode);
    g.set(LayerPositionUtils.toString(startNode), 0);
    f.set(
      LayerPositionUtils.toString(startNode),
      this.distance(startNode.position, stopNode.position)
    );
    while (openSet.size > 0) {
      const current = openSet.pop();
      if (!current) break;
      steps++;
      const distToTarget = this.distance(current.position, stopNode.position);
      if (distToTarget < smallestDistToTarget) {
        smallestDistToTarget = distToTarget;
        closestToTarget = current;
      }
      if (equal(current, stopNode)) {
        return {
          previous,
          closestToTarget,
          steps,
          maxPathLengthReached: false
        };
      }
      if (safeGet(g, current) + 1 > this.options.maxPathLength) {
        return {
          previous: /* @__PURE__ */ new Map(),
          closestToTarget,
          steps,
          maxPathLengthReached: true
        };
      }
      for (const neighbor of this.getNeighbors(current, stopNode)) {
        const tentativeG = safeGet(g, current) + this.getCosts(current.position, neighbor);
        const neighborStr = LayerPositionUtils.toString(neighbor);
        if (!g.has(neighborStr) || tentativeG < safeGet(g, neighbor)) {
          previous.set(neighborStr, current);
          g.set(neighborStr, tentativeG);
          f.set(
            neighborStr,
            tentativeG + this.distance(neighbor.position, stopNode.position)
          );
          openSet.push(neighbor);
        }
      }
    }
    return { previous, closestToTarget, steps, maxPathLengthReached: false };
  }
  returnPath(previous, startNode, stopNode) {
    const ret = [];
    let currentNode = stopNode;
    ret.push(currentNode);
    while (!equal(currentNode, startNode)) {
      currentNode = previous.get(LayerPositionUtils.toString(currentNode));
      if (!currentNode) return [];
      ret.push(currentNode);
    }
    return ret.reverse();
  }
};
function safeGet(map3, position) {
  return map3.get(LayerPositionUtils.toString(position)) ?? Number.MAX_VALUE;
}
function equal(layerPos1, layerPos2) {
  if (!VectorUtils.equal(layerPos1.position, layerPos2.position)) return false;
  return layerPos1.layer === layerPos2.layer;
}

// src/Datastructures/Queue/Queue.ts
var Node = class {
  constructor(data) {
    this.data = data;
  }
};
var Queue = class {
  constructor() {
    this.sizeInternal = 0;
  }
  dequeue() {
    if (this.tail === void 0) return void 0;
    this.sizeInternal--;
    const tailData = this.tail.data;
    if (this.tail.prev === void 0) {
      this.tail = void 0;
      this.head = void 0;
      return tailData;
    }
    this.tail.prev.next = void 0;
    this.tail = this.tail.prev;
    return tailData;
  }
  enqueue(data) {
    this.sizeInternal++;
    if (this.head === void 0) {
      this.head = new Node(data);
      this.tail = this.head;
      return;
    }
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
  }
  peek() {
    return this.tail ? this.tail.data : void 0;
  }
  peekAll() {
    const arr = [];
    let current = this.tail;
    while (current) {
      arr.push(current.data);
      current = current.prev;
    }
    return arr;
  }
  clear() {
    this.head = void 0;
    this.tail = void 0;
    this.sizeInternal = 0;
  }
  peekEnd() {
    return this.head?.data;
  }
  size() {
    return this.sizeInternal;
  }
};

// src/Pathfinding/Bfs/Bfs.ts
var Bfs = class extends ShortestPathAlgorithm {
  findShortestPathImpl(startPos, targetPos) {
    const shortestPath = this.shortestPathBfs(startPos, targetPos);
    return {
      path: this.returnPath(shortestPath.previous, startPos, targetPos),
      closestToTarget: shortestPath.closestToTarget,
      steps: shortestPath.steps,
      maxPathLengthReached: shortestPath.maxPathLengthReached,
      algorithmUsed: "BFS"
    };
  }
  equal(layerPos1, layerPos2) {
    if (!VectorUtils.equal(layerPos1.position, layerPos2.position))
      return false;
    return layerPos1.layer === layerPos2.layer;
  }
  shortestPathBfs(startNode, stopNode) {
    const previous = /* @__PURE__ */ new Map();
    const visited = /* @__PURE__ */ new Set();
    const queue = new Queue();
    let closestToTarget = startNode;
    let smallestDistToTarget = this.distance(
      startNode.position,
      stopNode.position
    );
    let steps = 0;
    queue.enqueue({ node: startNode, dist: 0 });
    visited.add(LayerPositionUtils.toString(startNode));
    while (queue.size() > 0) {
      const dequeued = queue.dequeue();
      steps++;
      if (!dequeued) break;
      const { node, dist } = dequeued;
      if (dist > this.options.maxPathLength) {
        return {
          previous: /* @__PURE__ */ new Map(),
          closestToTarget,
          steps,
          maxPathLengthReached: true
        };
      }
      const distToTarget = this.distance(node.position, stopNode.position);
      if (distToTarget < smallestDistToTarget) {
        smallestDistToTarget = distToTarget;
        closestToTarget = node;
      }
      if (this.equal(node, stopNode)) {
        return {
          previous,
          closestToTarget,
          steps,
          maxPathLengthReached: false
        };
      }
      for (const neighbor of this.getNeighbors(node, stopNode)) {
        if (!visited.has(LayerPositionUtils.toString(neighbor))) {
          previous.set(LayerPositionUtils.toString(neighbor), node);
          queue.enqueue({ node: neighbor, dist: dist + 1 });
          visited.add(LayerPositionUtils.toString(neighbor));
        }
      }
    }
    return { previous, closestToTarget, steps, maxPathLengthReached: false };
  }
  returnPath(previous, startNode, stopNode) {
    const ret = [];
    let currentNode = stopNode;
    ret.push(currentNode);
    while (!this.equal(currentNode, startNode)) {
      currentNode = previous.get(LayerPositionUtils.toString(currentNode));
      if (!currentNode) return [];
      ret.push(currentNode);
    }
    return ret.reverse();
  }
};

// src/Pathfinding/BidirectionalSearch/BidirectionalSearch.ts
var Bfs2 = class {
  constructor() {
    this.previous = /* @__PURE__ */ new Map();
    this.visited = /* @__PURE__ */ new Map();
    this.queue = new Queue();
    this.minMatching = Infinity;
    this.lastDist = 0;
  }
  isNewFrontier() {
    const el = this.queue.peek();
    return !!(el && el.dist > this.lastDist);
  }
  step(neighbors, node, dist) {
    this.lastDist = dist;
    for (const neighbor of neighbors) {
      const nStr = LayerPositionUtils.toString(neighbor);
      if (!this.visited.has(nStr)) {
        this.previous.set(nStr, node);
        this.queue.enqueue({ node: neighbor, dist: dist + 1 });
        this.visited.set(nStr, dist + 1);
        const n = this.otherBfs?.visited.get(nStr);
        if (n !== void 0) {
          if (n < this.minMatching) {
            this.minMatching = n;
            this.minMatchingNode = neighbor;
          }
        }
      }
    }
  }
};
var BidirectionalSearch = class extends ShortestPathAlgorithm {
  findShortestPathImpl(startPos, targetPos) {
    const shortestPath = this.shortestPathBfs(startPos, targetPos);
    return {
      path: this.returnPath(
        shortestPath.previous,
        shortestPath.previous2,
        shortestPath.matchingPos,
        startPos,
        targetPos
      ),
      closestToTarget: shortestPath.closestToTarget,
      steps: shortestPath.steps,
      maxPathLengthReached: shortestPath.maxPathLengthReached,
      algorithmUsed: "BIDIRECTIONAL_SEARCH"
    };
  }
  equal(layerPos1, layerPos2) {
    if (!VectorUtils.equal(layerPos1.position, layerPos2.position))
      return false;
    return layerPos1.layer === layerPos2.layer;
  }
  shortestPathBfs(startNode, stopNode) {
    if (LayerPositionUtils.equal(startNode, stopNode)) {
      return {
        previous: /* @__PURE__ */ new Map(),
        previous2: /* @__PURE__ */ new Map(),
        closestToTarget: startNode,
        steps: 0,
        maxPathLengthReached: false
      };
    }
    const startBfs = new Bfs2();
    const stopBfs = new Bfs2();
    let steps = 0;
    startBfs.otherBfs = stopBfs;
    stopBfs.otherBfs = startBfs;
    let closestToTarget = startNode;
    let smallestDistToTarget = this.distance(
      startNode.position,
      stopNode.position
    );
    startBfs.queue.enqueue({ node: startNode, dist: 0 });
    stopBfs.queue.enqueue({ node: stopNode, dist: 0 });
    startBfs.visited.set(LayerPositionUtils.toString(startNode), 0);
    stopBfs.visited.set(LayerPositionUtils.toString(stopNode), 0);
    while (this.shouldStop(startBfs.queue.size() > 0, stopBfs.queue.size() > 0)) {
      const startDequeued = startBfs.queue.dequeue();
      if (!startDequeued) break;
      const { node, dist } = startDequeued;
      if (dist + 1 + (stopBfs.queue.peek()?.dist || 0) > this.options.maxPathLength) {
        return {
          previous: startBfs.previous,
          previous2: stopBfs.previous,
          closestToTarget: this.maybeClosestToTarget(closestToTarget),
          steps,
          maxPathLengthReached: true
        };
      }
      const distToTarget = this.distance(node.position, stopNode.position);
      if (distToTarget < smallestDistToTarget) {
        smallestDistToTarget = distToTarget;
        closestToTarget = node;
      }
      steps++;
      startBfs.step(this.getNeighbors(node, stopNode), node, dist);
      if (startBfs.isNewFrontier() && startBfs.minMatchingNode) {
        return {
          previous: startBfs.previous,
          previous2: stopBfs.previous,
          closestToTarget: this.maybeClosestToTarget(stopNode),
          matchingPos: startBfs.minMatchingNode,
          steps,
          maxPathLengthReached: false
        };
      }
      const stopDequeued = stopBfs.queue.dequeue();
      if (!stopDequeued) continue;
      const { node: stopBfsNode, dist: stopBfsDist } = stopDequeued;
      steps++;
      stopBfs.step(
        this.getReverseNeighbors(stopBfsNode, stopNode),
        stopBfsNode,
        stopBfsDist
      );
      if (stopBfs.isNewFrontier() && stopBfs.minMatchingNode) {
        return {
          previous: startBfs.previous,
          previous2: stopBfs.previous,
          closestToTarget: this.maybeClosestToTarget(stopNode),
          matchingPos: stopBfs.minMatchingNode,
          steps,
          maxPathLengthReached: false
        };
      }
    }
    return {
      previous: startBfs.previous,
      previous2: stopBfs.previous,
      closestToTarget: this.maybeClosestToTarget(closestToTarget),
      steps,
      maxPathLengthReached: false
    };
  }
  shouldStop(isStartBfsQueueSizeEmpty, isStopBfsQueueSizeEmpty) {
    if (this.options.calculateClosestToTarget) {
      return isStartBfsQueueSizeEmpty || isStopBfsQueueSizeEmpty;
    }
    return isStartBfsQueueSizeEmpty && isStopBfsQueueSizeEmpty;
  }
  /**
   * Returns closestToTarget if it is enabled in the options and undefined
   * otherwise.
   */
  maybeClosestToTarget(pos) {
    return this.options.calculateClosestToTarget ? pos : void 0;
  }
  returnPath(startPathPrev, stopPathPrev, matchingPos, startNode, stopNode) {
    if (matchingPos) {
      const startPath = this.getPathFromPrev(
        startPathPrev,
        startNode,
        matchingPos
      ).reverse();
      const stopPath = this.getPathFromPrev(
        stopPathPrev,
        stopNode,
        matchingPos
      );
      startPath.pop();
      return [...startPath, ...stopPath];
    } else {
      return this.getPathFromPrev(startPathPrev, startNode, stopNode).reverse();
    }
  }
  getPathFromPrev(previous, startNode, stopNode) {
    const ret = [];
    let currentNode = stopNode;
    ret.push(currentNode);
    while (!this.equal(currentNode, startNode)) {
      currentNode = previous.get(LayerPositionUtils.toString(currentNode));
      if (!currentNode) return [];
      ret.push(currentNode);
    }
    return ret;
  }
};

// src/Pathfinding/Jps4/Jps4.ts
var import_mnemonist = __toESM(require_mnemonist(), 1);
var Jps4 = class extends ShortestPathAlgorithm {
  constructor(gridTilemap, po = {}) {
    super(gridTilemap, po);
    this.openSet = new import_mnemonist.MinFibonacciHeap();
    this.g = /* @__PURE__ */ new Map();
    this.f = /* @__PURE__ */ new Map();
    this.closestToTarget = {
      position: new Vector2(0, 0),
      layer: void 0
    };
    this.smallestDistToTarget = 0;
    this.steps = 0;
    this.visits = [];
    this.maxFrontierSize = 0;
    this.maxJumpSize = 0;
  }
  findShortestPathImpl(startPos, targetPos) {
    this.maxJumpSize = this.distance(startPos.position, targetPos.position);
    const shortestPath = this.shortestPath(startPos, targetPos);
    return {
      path: this.returnPath(shortestPath.previous, startPos, targetPos),
      closestToTarget: shortestPath.closestToTarget,
      steps: shortestPath.steps,
      maxPathLengthReached: shortestPath.maxPathLengthReached,
      algorithmUsed: "JPS"
    };
  }
  shortestPath(startNode, stopNode) {
    this.steps = 0;
    const previous = /* @__PURE__ */ new Map();
    this.g = /* @__PURE__ */ new Map();
    this.f = /* @__PURE__ */ new Map();
    this.closestToTarget = startNode;
    this.smallestDistToTarget = this.distance(
      startNode.position,
      stopNode.position
    );
    this.openSet = new import_mnemonist.MinFibonacciHeap(
      (a, b) => safeGet2(this.f, a) - safeGet2(this.f, b)
    );
    this.openSet.push(startNode);
    const sourceStr = LayerPositionUtils.toString(startNode);
    this.g.set(sourceStr, 0);
    this.f.set(sourceStr, this.distance(startNode.position, stopNode.position));
    this.maxFrontierSize = Math.max(this.maxFrontierSize, this.openSet.size);
    while (this.openSet.size > 0) {
      const current = this.openSet.pop();
      if (!current) break;
      this.steps++;
      if (LayerPositionUtils.equal(current, stopNode)) {
        return {
          previous,
          closestToTarget: stopNode,
          steps: this.steps,
          maxPathLengthReached: false
        };
      }
      if (safeGet2(this.g, current) + 1 > this.options.maxPathLength) {
        return {
          previous: /* @__PURE__ */ new Map(),
          closestToTarget: this.closestToTarget,
          steps: this.steps,
          maxPathLengthReached: true
        };
      }
      this.updateClosestToTarget(current, stopNode);
      for (const neighbor of this.getNeighborsInternal(
        current,
        previous.get(LayerPositionUtils.toString(current)),
        stopNode
      )) {
        const pStr = LayerPositionUtils.toString(neighbor.p);
        const tentativeG = safeGet2(this.g, current) + neighbor.dist;
        if (!this.g.has(pStr) || tentativeG < safeGet2(this.g, neighbor.p)) {
          previous.set(pStr, current);
          this.g.set(pStr, tentativeG);
          this.f.set(
            pStr,
            tentativeG + this.distance(neighbor.p.position, stopNode.position)
          );
          this.openSet.push(neighbor.p);
        }
      }
    }
    return {
      previous,
      closestToTarget: this.closestToTarget,
      steps: this.steps,
      maxPathLengthReached: false
    };
  }
  updateClosestToTarget(node, stopNode) {
    const distToTarget = this.distance(node.position, stopNode.position);
    if (distToTarget < this.smallestDistToTarget) {
      this.smallestDistToTarget = distToTarget;
      this.closestToTarget = node;
    }
  }
  addIfNotBlocked(arr, src, target) {
    if (!this.blockOrTrans(src, target)) {
      arr.push(target);
    }
  }
  blockOrTrans(src, dest) {
    return this.isBlocking(src, dest) || this.getTransition(dest.position, dest.layer) !== void 0;
  }
  getNeighborsInternal(node, parent, stopNode) {
    if (!parent || node.layer !== parent.layer) {
      return this.getNeighbors(node, stopNode).map((n) => ({
        p: n,
        dist: 1
      }));
    }
    const pruned = this.prune(parent, node).filter(
      (neighbor) => !this.isBlockingIgnoreTarget(node, neighbor, stopNode)
    ).map((unblockedNeighbor) => {
      const transition = this.getTransition(
        unblockedNeighbor.position,
        node.layer
      );
      return {
        position: unblockedNeighbor.position,
        layer: transition || node.layer
      };
    });
    const successors = [];
    for (const p of pruned) {
      if (this.isHorizontal(node.position, p.position)) {
        successors.push({ p, dist: 1 });
      } else {
        const j = this.jump(
          node,
          p,
          stopNode,
          1,
          directionFromPos(node.position, p.position)
        );
        if (j) {
          successors.push(j);
        }
      }
    }
    return successors;
  }
  isBlockingIgnoreTarget(src, target, stopNode) {
    return this.isBlocking(src, target) && !(this.options.ignoreBlockedTarget && LayerPositionUtils.equal(target, stopNode));
  }
  jump(parent, node, stopNode, dist, dir) {
    if (this.isBlockingIgnoreTarget(parent, node, stopNode)) {
      return void 0;
    }
    if (LayerPositionUtils.equal(node, stopNode)) {
      return { p: node, dist };
    }
    if (dist >= this.maxJumpSize) {
      return { p: node, dist };
    }
    if (this.getTransition(node.position, parent.layer) !== void 0) {
      return { p: node, dist };
    }
    if (this.hasForced(parent, node)) {
      return { p: node, dist };
    }
    this.updateClosestToTarget(node, stopNode);
    return this.jump(
      node,
      this.getTilePosInDir(node, dir),
      stopNode,
      dist + 1,
      dir
    );
  }
  isHorizontal(p1, p2) {
    return p1.y === p2.y;
  }
  getForced(parent, node, downLeft, bottom, topLeft, top) {
    const res = [];
    const newParent = parent;
    if (this.blockOrTrans(newParent, downLeft) || this.blockOrTrans(downLeft, bottom)) {
      this.addIfNotBlocked(res, node, bottom);
    }
    if (this.blockOrTrans(newParent, topLeft) || this.blockOrTrans(topLeft, top)) {
      this.addIfNotBlocked(res, node, top);
    }
    return res;
  }
  hasForced(parent, node) {
    const { topLeft, downLeft, top, bottom } = this.normalizedPositions(
      parent,
      node
    );
    if (this.blockOrTrans(parent, downLeft) || this.blockOrTrans(downLeft, bottom)) {
      if (!this.blockOrTrans(node, bottom)) {
        return true;
      }
    }
    if (this.blockOrTrans(parent, topLeft) || this.blockOrTrans(topLeft, top)) {
      if (!this.blockOrTrans(node, top)) {
        return true;
      }
    }
    return false;
  }
  prune(parent, node) {
    const { right, top, bottom, downLeft, topLeft } = this.normalizedPositions(
      parent,
      node
    );
    if (this.isHorizontal(parent.position, node.position)) {
      return [right, top, bottom];
    }
    return [
      right,
      ...this.getForced(parent, node, downLeft, bottom, topLeft, top)
    ];
  }
  normalizedPositions(parent, node) {
    if (parent.position.x < node.position.x) {
      return {
        topLeft: {
          position: new Vector2(node.position.x - 1, node.position.y - 1),
          layer: node.layer
        },
        downLeft: {
          position: new Vector2(node.position.x - 1, node.position.y + 1),
          layer: node.layer
        },
        top: {
          position: new Vector2(node.position.x, node.position.y - 1),
          layer: node.layer
        },
        bottom: {
          position: new Vector2(node.position.x, node.position.y + 1),
          layer: node.layer
        },
        right: {
          position: new Vector2(node.position.x + 1, node.position.y),
          layer: node.layer
        }
      };
    } else if (parent.position.x > node.position.x) {
      return {
        topLeft: {
          position: new Vector2(node.position.x + 1, node.position.y + 1),
          layer: node.layer
        },
        downLeft: {
          position: new Vector2(node.position.x + 1, node.position.y - 1),
          layer: node.layer
        },
        top: {
          position: new Vector2(node.position.x, node.position.y + 1),
          layer: node.layer
        },
        bottom: {
          position: new Vector2(node.position.x, node.position.y - 1),
          layer: node.layer
        },
        right: {
          position: new Vector2(node.position.x - 1, node.position.y),
          layer: node.layer
        }
      };
    } else if (parent.position.y < node.position.y) {
      return {
        topLeft: {
          position: new Vector2(node.position.x + 1, node.position.y - 1),
          layer: node.layer
        },
        downLeft: {
          position: new Vector2(node.position.x - 1, node.position.y - 1),
          layer: node.layer
        },
        top: {
          position: new Vector2(node.position.x + 1, node.position.y),
          layer: node.layer
        },
        bottom: {
          position: new Vector2(node.position.x - 1, node.position.y),
          layer: node.layer
        },
        right: {
          position: new Vector2(node.position.x, node.position.y + 1),
          layer: node.layer
        }
      };
    } else {
      return {
        topLeft: {
          position: new Vector2(node.position.x - 1, node.position.y + 1),
          layer: node.layer
        },
        downLeft: {
          position: new Vector2(node.position.x + 1, node.position.y + 1),
          layer: node.layer
        },
        top: {
          position: new Vector2(node.position.x - 1, node.position.y),
          layer: node.layer
        },
        bottom: {
          position: new Vector2(node.position.x + 1, node.position.y),
          layer: node.layer
        },
        right: {
          position: new Vector2(node.position.x, node.position.y - 1),
          layer: node.layer
        }
      };
    }
  }
  posInDir(pos, dir) {
    return {
      position: pos.position.add(directionVector(dir)),
      layer: pos.layer
    };
  }
  returnPath(previous, startNode, stopNode) {
    const ret = [];
    let currentNode = stopNode;
    ret.push(currentNode);
    while (!LayerPositionUtils.equal(currentNode, startNode)) {
      const prevNode = previous.get(LayerPositionUtils.toString(currentNode));
      if (!prevNode) {
        return [];
      }
      if (this.distance(prevNode.position, currentNode.position) > 1) {
        this.fillPath(currentNode, prevNode, ret);
      } else {
        ret.push(prevNode);
      }
      currentNode = prevNode;
    }
    return ret.reverse();
  }
  fillPath(src, target, ret) {
    let current = src;
    do {
      const dir = directionFromPos(current.position, target.position);
      current = this.getTilePosInDir(current, dir);
      ret.push(current);
    } while (!VectorUtils.equal(current.position, target.position));
  }
};
function safeGet2(map3, position) {
  return map3.get(LayerPositionUtils.toString(position)) ?? Number.MAX_VALUE;
}

// src/Movement/FollowMovement/FollowMovement.ts
var import_operators2 = __toESM(require_operators(), 1);
var FollowMovement = class {
  constructor(character, gridTilemap, charToFollow, options = {}) {
    this.character = character;
    this.gridTilemap = gridTilemap;
    this.charToFollow = charToFollow;
    const defaultOptions = {
      distance: 0,
      noPathFoundStrategy: "STOP" /* STOP */,
      maxPathLength: Infinity,
      shortestPathAlgorithm: "BIDIRECTIONAL_SEARCH",
      ignoreLayers: false,
      considerCosts: options.considerCosts || false,
      facingDirection: "none" /* NONE */,
      isPositionAllowedFn: () => true,
      ignoredChars: []
    };
    this.options = { ...defaultOptions, ...options };
    if (this.options.considerCosts && this.options.shortestPathAlgorithm !== "A_STAR") {
      console.warn(
        `GridEngine: Pathfinding option 'considerCosts' cannot be used with algorithm '${this.options.shortestPathAlgorithm}'. It can only be used with A* algorithm.`
      );
    }
    if (this.options.shortestPathAlgorithm === "JPS" && (this.character.getTileWidth() > 1 || this.character.getTileHeight() > 1)) {
      console.warn(
        `GridEngine: Pathfinding algorithm 'JPS' can only be used for characters with 'tileWidth' and 'tileHeight' of 1`
      );
    }
    this.character = character;
    this.updateTarget(
      this.charToFollow.getTilePos().position,
      this.charToFollow.getTilePos().layer
    );
    this.charToFollow.positionChangeStarted().pipe(
      (0, import_operators2.takeUntil)(
        this.character.autoMovementSet().pipe(
          (0, import_operators2.filter)((movement) => movement !== this),
          (0, import_operators2.take)(1)
        )
      )
    ).subscribe(({ enterTile, enterLayer }) => {
      this.updateTarget(enterTile, enterLayer);
    });
  }
  update(delta) {
    this.targetMovement?.update(delta);
  }
  getInfo() {
    return {
      type: "Follow",
      config: {
        charToFollow: this.charToFollow.getId(),
        distance: this.options.distance,
        noPathFoundStrategy: this.options.noPathFoundStrategy,
        maxPathLength: this.options.maxPathLength,
        ignoreLayers: this.options.ignoreLayers,
        facingDirection: this.options.facingDirection,
        shortestPathAlgorithm: this.options.shortestPathAlgorithm,
        considerCosts: this.options.considerCosts,
        isPositionAllowedFn: this.options.isPositionAllowedFn,
        ignoredChars: this.options.ignoredChars
      }
    };
  }
  getFacingPos() {
    const turnCount = dirToNumber[this.options.facingDirection] + dirToNumber[this.charToFollow.getFacingDirection()];
    const newDir = turnClockwise("up" /* UP */, turnCount);
    const refPos = {
      x: this.charToFollow.getTilePos().position.x,
      y: this.charToFollow.getTilePos().position.y
    };
    if (newDir === "right" /* RIGHT */) {
      refPos.x += this.charToFollow.getTileWidth() - 1;
    } else if (newDir === "down" /* DOWN */) {
      refPos.y += this.charToFollow.getTileWidth() - 1;
    } else if (newDir === "down-left" /* DOWN_LEFT */) {
      refPos.y += this.charToFollow.getTileWidth() - 1;
    } else if (newDir === "down-right" /* DOWN_RIGHT */) {
      refPos.y += this.charToFollow.getTileWidth() - 1;
      refPos.x += this.charToFollow.getTileWidth() - 1;
    } else if (newDir === "up-right" /* UP_RIGHT */) {
      refPos.x += this.charToFollow.getTileWidth() - 1;
    }
    return this.gridTilemap.getTilePosInDirection(
      {
        position: new Vector2(refPos),
        layer: this.charToFollow.getTilePos().layer
      },
      newDir
    ).position;
  }
  updateTarget(targetPos, targetLayer) {
    const useFacingDir = this.options.facingDirection !== "none" /* NONE */ && this.options.distance === 0;
    if (useFacingDir) {
      targetPos = this.getFacingPos();
    }
    this.targetMovement = new TargetMovement(
      this.character,
      this.gridTilemap,
      {
        position: new Vector2(targetPos),
        layer: targetLayer
      },
      {
        distance: useFacingDir ? 0 : this.options.distance + 1,
        config: {
          algorithm: this.options.shortestPathAlgorithm,
          noPathFoundStrategy: this.options.noPathFoundStrategy,
          maxPathLength: this.options.maxPathLength,
          ignoreLayers: this.options.ignoreLayers,
          considerCosts: this.options.considerCosts,
          ignoredChars: [
            this.charToFollow.getId(),
            ...this.options.ignoredChars
          ],
          isPositionAllowedFn: this.options.isPositionAllowedFn
        }
      }
    );
  }
};

// src/Utils/RandomUtils/RandomUtils.ts
var RandomUtils = class {
  static getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
};

// src/Movement/RandomMovement/RandomMovement.ts
var import_operators3 = __toESM(require_operators(), 1);
var RandomMovement = class {
  constructor(character, delay = 0, radius = -1) {
    this.character = character;
    this.delay = delay;
    this.radius = radius;
    this.stepSize = 0;
    this.delayLeft = this.delay;
    this.initialRow = character.getNextTilePos().position.y;
    this.initialCol = character.getNextTilePos().position.x;
    this.randomizeStepSize();
    this.stepsWalked = 0;
    this.currentMovementDirection = "none" /* NONE */;
    this.character.positionChangeStarted().pipe(
      (0, import_operators3.takeUntil)(
        this.character.autoMovementSet().pipe(
          (0, import_operators3.filter)((movement) => movement !== this),
          (0, import_operators3.take)(1)
        )
      )
    ).subscribe(() => {
      this.stepsWalked++;
    });
    this.distanceUtils = DistanceUtilsFactory.create(
      character.getNumberOfDirections()
    );
  }
  update(delta) {
    if (this.shouldContinueWalkingCurrentDirection()) {
      this.character.move(this.currentMovementDirection);
    } else {
      this.delayLeft -= delta;
      if (this.delayLeft <= 0) {
        this.delayLeft = this.delay;
        const dir = this.getFreeRandomDirection();
        this.stepsWalked = 0;
        this.character.move(dir);
        this.currentMovementDirection = dir;
        this.randomizeStepSize();
      }
    }
  }
  getInfo() {
    return {
      type: "Random",
      config: {
        delay: this.delay,
        radius: this.radius
      }
    };
  }
  shouldContinueWalkingCurrentDirection() {
    return this.stepsWalked < this.stepSize && this.currentMovementDirection !== "none" /* NONE */ && !this.character.isBlockingDirection(this.currentMovementDirection) && this.isWithinRadius(this.currentMovementDirection);
  }
  getFreeDirections() {
    const unblocked = this.distanceUtils.getDirections().filter((dir) => !this.character.isBlockingDirection(dir));
    return unblocked.filter((dir) => this.isWithinRadius(dir));
  }
  isWithinRadius(dir) {
    if (this.radius == -1) return true;
    return this.getDist(dir) <= this.radius;
  }
  getDist(dir) {
    return this.distanceUtils.distance(
      this.character.getNextTilePos().position.add(directionVector(dir)),
      new Vector2(this.initialCol, this.initialRow)
    );
  }
  getFreeRandomDirection() {
    const freeDirections = this.getFreeDirections();
    if (freeDirections.length == 0) return "none" /* NONE */;
    return freeDirections[RandomUtils.getRandomInt(freeDirections.length)];
  }
  randomizeStepSize() {
    this.stepSize = RandomUtils.getRandomInt(this.radius) + 1;
  }
};

// src/GridEngineHeadless.ts
var import_rxjs6 = __toESM(require_cjs(), 1);
var import_operators5 = __toESM(require_operators(), 1);

// src/GridCharacter/CharacterFilter/CharacterFilter.ts
function filterCharacters(characters, options) {
  return characters.filter((gridChar) => {
    if (options.labels?.withAllLabels) {
      return options.labels?.withAllLabels.every((label) => {
        return gridChar.hasLabel(label);
      });
    } else if (options.labels?.withOneOfLabels) {
      return options.labels?.withOneOfLabels.some((label) => {
        return gridChar.hasLabel(label);
      });
    } else if (options.labels?.withNoneLabels) {
      return !options.labels?.withNoneLabels.some((label) => {
        return gridChar.hasLabel(label);
      });
    }
    return true;
  });
}

// package.json
var version = "2.46.2";

// src/GridTilemap/CharBlockCache/CharBlockCache.ts
var import_rxjs4 = __toESM(require_cjs(), 1);
var CharBlockCache = class {
  constructor(collistionStrategy, collisionGroupRelation) {
    this.collistionStrategy = collistionStrategy;
    this.collisionGroupRelation = collisionGroupRelation;
    this.tilePosToCharacters = new Cache();
    this.charRemoved$ = new import_rxjs4.Subject();
  }
  isCharBlockingAt(pos, layer, collisionGroups, exclude = /* @__PURE__ */ new Set(), ignoredCollisionGroups = /* @__PURE__ */ new Set()) {
    if (collisionGroups.length === 0) return false;
    const charSet = this.tilePosToCharacters.get(pos, layer);
    return !!(charSet && charSet.size > 0 && [...charSet].filter((char) => !exclude.has(char.getId())).filter(
      (char) => !this.doIntersect(
        char.getCollisionGroups(),
        ignoredCollisionGroups
      )
    ).some(
      (char) => collisionGroups.some(
        (group) => char.getCollisionGroups().some((charCGroup) => this.collidesWith(group, charCGroup))
      )
    ));
  }
  doIntersect(arrSet, set) {
    for (const val of arrSet) {
      if (set.has(val)) return true;
    }
    return false;
  }
  collidesWith(group1, group2) {
    if (!this.collisionGroupRelation) return group1 === group2;
    return (this.collisionGroupRelation.get(group1) || /* @__PURE__ */ new Set()).has(group2);
  }
  getCharactersAt(pos, layer) {
    const characters = this.tilePosToCharacters.get(pos, layer);
    return characters || /* @__PURE__ */ new Set();
  }
  addCharacter(character) {
    this.addTilePositions(character.getTilePos(), character);
    this.addTilePositions(character.getNextTilePos(), character);
    this.addPositionChangeSub(character);
    this.addPositionChangeFinishedSub(character);
    this.addTilePosSetSub(character);
  }
  removeCharacter(character) {
    const charId = character.getId();
    this.charRemoved$.next(charId);
    this.deleteTilePositions(character.getTilePos(), character);
    this.deleteTilePositions(character.getNextTilePos(), character);
  }
  add(pos, layer, character) {
    const set = this.tilePosToCharacters.get(pos, layer);
    if (!set) {
      this.tilePosToCharacters.set(pos, layer, /* @__PURE__ */ new Set([character]));
    }
    set?.add(character);
  }
  addTilePosSetSub(character) {
    character.tilePositionSet().pipe((0, import_rxjs4.takeUntil)(this.charRemoved(character.getId()))).subscribe((layerPosition) => {
      this.deleteTilePositions(character.getNextTilePos(), character);
      this.addTilePositions(layerPosition, character);
    });
  }
  charRemoved(charId) {
    return this.charRemoved$?.pipe(
      (0, import_rxjs4.take)(1),
      (0, import_rxjs4.filter)((cId) => cId == charId)
    );
  }
  addPositionChangeSub(character) {
    character.positionChangeStarted().pipe(
      (0, import_rxjs4.takeUntil)(this.charRemoved(character.getId())),
      this.posChangeToLayerPos()
    ).subscribe((posChange) => {
      if (this.collistionStrategy === "BLOCK_ONE_TILE_AHEAD" /* BLOCK_ONE_TILE_AHEAD */) {
        this.deleteTilePositions(posChange.exit, character);
      }
      this.addTilePositions(posChange.enter, character);
    });
  }
  addPositionChangeFinishedSub(character) {
    character.positionChangeFinished().pipe(
      (0, import_rxjs4.takeUntil)(this.charRemoved(character.getId())),
      this.posChangeToLayerPos()
    ).subscribe((posChange) => {
      this.deleteTilePositions(posChange.exit, character);
      this.addTilePositions(posChange.enter, character);
    });
  }
  addTilePositions(pos, character) {
    this.forEachCharTile(pos, character, (x, y) => {
      this.add(new Vector2(x, y), pos.layer, character);
    });
  }
  deleteTilePositions(pos, character) {
    this.forEachCharTile(pos, character, (x, y) => {
      this.tilePosToCharacters.get(new Vector2(x, y), pos.layer)?.delete(character);
    });
  }
  forEachCharTile(pos, character, fn) {
    const tilePos = pos.position;
    for (let x = tilePos.x; x < tilePos.x + character.getTileWidth(); x++) {
      for (let y = tilePos.y; y < tilePos.y + character.getTileHeight(); y++) {
        fn(x, y);
      }
    }
  }
  posChangeToLayerPos() {
    return (0, import_rxjs4.pipe)(
      (0, import_rxjs4.map)((posChange) => {
        return {
          enter: {
            position: new Vector2(posChange.enterTile),
            layer: posChange.enterLayer
          },
          exit: {
            position: new Vector2(posChange.exitTile),
            layer: posChange.exitLayer
          }
        };
      })
    );
  }
  posToString(pos, layer) {
    return `${pos.x}#${pos.y}#${layer}`;
  }
};
var Cache = class {
  constructor() {
    this.memo = /* @__PURE__ */ new Map();
  }
  set(pos, layer, val) {
    let pX = this.memo.get(pos.x);
    if (!pX) {
      pX = /* @__PURE__ */ new Map();
      this.memo.set(pos.x, pX);
    }
    let pY = pX.get(pos.y);
    if (!pY) {
      pY = /* @__PURE__ */ new Map();
      pX.set(pos.y, pY);
    }
    pY.set(layer, val);
  }
  /**
   * Returns null if no entry was found. undefined is a valid cached result.
   */
  get(pos, layer) {
    const pX = this.memo.get(pos.x);
    if (!pX) return void 0;
    const pY = pX.get(pos.y);
    if (!pY) return void 0;
    return pY.get(layer);
  }
};

// src/Utils/Rect/Rect.ts
var Rect = class {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  isInRange(pos) {
    return pos.x >= this.x && pos.x < this.x + this.width && pos.y >= this.y && pos.y < this.y + this.height;
  }
};

// src/GridTilemap/Tilemap.ts
var CHAR_LAYER_PROP_NAME = "ge_charLayer";

// src/GridTilemap/TileCollisionCache/TileCollisionCache.ts
var BITMAP_POS_HAS_TILE = 0;
var BITMAP_POS_NO_DIRECTION = 1;
var dirToBitmapNo = {
  ["none" /* NONE */]: 1,
  ["left" /* LEFT */]: 2,
  ["up-left" /* UP_LEFT */]: 3,
  ["up" /* UP */]: 4,
  ["up-right" /* UP_RIGHT */]: 5,
  ["right" /* RIGHT */]: 6,
  ["down-right" /* DOWN_RIGHT */]: 7,
  ["down" /* DOWN */]: 8,
  ["down-left" /* DOWN_LEFT */]: 9
};
var TileCollisionCache = class {
  constructor(tilemap, gridTilemap) {
    this.tilemap = tilemap;
    this.gridTilemap = gridTilemap;
    this.tileCollisionCache = /* @__PURE__ */ new Map();
  }
  fixLayer(layer) {
    this.fixedLayer = this.tileCollisionCache.get(layer);
  }
  unfixLayers() {
    this.fixedLayer = void 0;
  }
  rebuild(rect) {
    if (!rect) {
      rect = new Rect(0, 0, this.tilemap.getWidth(), this.tilemap.getHeight());
    }
    const charLayers = this.tilemap.getLayers().filter((layer) => layer.isCharLayer());
    for (const cl of [...charLayers, void 0]) {
      let layerArr = this.tileCollisionCache.get(cl?.getName());
      if (layerArr === void 0) {
        layerArr = new Array(this.tilemap.getWidth());
        for (let i = 0; i < this.tilemap.getWidth(); i++) {
          layerArr[i] = new Array(this.tilemap.getHeight());
        }
        this.tileCollisionCache.set(cl?.getName(), layerArr);
      }
      for (let r = rect.getY(); r < rect.getY() + rect.getHeight(); r++) {
        for (let c = rect.getX(); c < rect.getX() + rect.getWidth(); c++) {
          let bitmap = 0;
          const hasTile = !this.gridTilemap.hasNoTileUncached(
            new Vector2(c, r),
            cl?.getName()
          );
          if (hasTile) {
            bitmap = setBitAt(bitmap, 0);
          }
          for (const dir of directions()) {
            const blocked = this.gridTilemap.hasBlockingTileUncached(
              new Vector2(c, r),
              cl?.getName(),
              dir,
              true
            );
            if (blocked) {
              bitmap = setBitAt(bitmap, dirToBitmapNo[dir]);
            }
          }
          const blockedUndefined = this.gridTilemap.hasBlockingTileUncached(
            new Vector2(c, r),
            cl?.getName(),
            void 0,
            true
          );
          if (blockedUndefined) {
            bitmap = setBitAt(bitmap, dirToBitmapNo[1]);
          }
          layerArr[c][r] = bitmap;
        }
      }
    }
  }
  hasTileAt(x, y, layer) {
    const arr = this.fixedLayer || this.tileCollisionCache.get(layer);
    const cached = arr?.[x]?.[y];
    if (cached === void 0) return void 0;
    return getBitAt(cached, BITMAP_POS_HAS_TILE);
  }
  isBlockingFrom(x, y, layer, direction, ignoreHasTile) {
    const arr = this.fixedLayer || this.tileCollisionCache.get(layer);
    const cached = arr?.[x]?.[y];
    if (cached === void 0) return void 0;
    if (!ignoreHasTile && !getBitAt(cached, BITMAP_POS_HAS_TILE)) return true;
    if (direction === void 0) {
      return getBitAt(cached, BITMAP_POS_NO_DIRECTION);
    }
    return getBitAt(cached, dirToBitmapNo[direction]);
  }
};
function setBitAt(bitmap, pos) {
  return bitmap | 1 << pos;
}
function getBitAt(bitmap, pos) {
  return (bitmap >> pos & 1) == 1;
}

// src/GridTilemap/GridTilemap.ts
var TILE_COST_PROPERTY_NAME = "ge_cost";
var GridTilemap = class _GridTilemap {
  constructor(tilemap, collisionTilePropertyName, collisionStrategy, collisionGroupRelation = void 0, useTileCollisionCache = false) {
    this.tilemap = tilemap;
    this.collisionTilePropertyName = collisionTilePropertyName;
    this.useTileCollisionCache = useTileCollisionCache;
    this.characters = /* @__PURE__ */ new Map();
    this.transitions = /* @__PURE__ */ new Map();
    this.reverseTransitions = /* @__PURE__ */ new Map();
    this.collidesPropNames = /* @__PURE__ */ new Map();
    this.tileCostPropNames = /* @__PURE__ */ new Map();
    // Cache collision relevant layers for each frame so they don't have to be
    // computed for each tile check.
    this.collisionRelevantLayersFrameCache = /* @__PURE__ */ new Map();
    this.charBlockCache = new CharBlockCache(
      collisionStrategy,
      collisionGroupRelation
    );
    for (const dir of directions()) {
      this.collidesPropNames.set(
        dir,
        _GridTilemap.ONE_WAY_COLLIDE_PROP_PREFIX + dir
      );
      this.tileCostPropNames.set(dir, `${TILE_COST_PROPERTY_NAME}_${dir}`);
    }
    if (this.useTileCollisionCache) {
      this.tileCollisionCache = new TileCollisionCache(tilemap, this);
      this.tileCollisionCache.rebuild();
    }
  }
  static {
    this.ONE_WAY_COLLIDE_PROP_PREFIX = "ge_collide_";
  }
  fixCacheLayer(layer) {
    this.tileCollisionCache?.fixLayer(layer);
  }
  unfixCacheLayers() {
    this.tileCollisionCache?.unfixLayers();
  }
  addCharacter(character) {
    this.characters.set(character.getId(), character);
    const layer = character.getNextTilePos().layer;
    if (layer === void 0) {
      character.setTilePosition({
        ...character.getNextTilePos(),
        layer: this.getLowestCharLayer()
      });
    } else if (!this.getCharLayerNames().includes(layer)) {
      console.warn(
        `Char layer '${layer}' of character '${character.getId()}' is unknown.`
      );
    }
    this.charBlockCache.addCharacter(character);
  }
  removeCharacter(charId) {
    const gridChar = this.characters.get(charId);
    if (!gridChar) return;
    this.charBlockCache.removeCharacter(gridChar);
    this.characters.delete(charId);
  }
  getCharacters() {
    return [...this.characters.values()];
  }
  getCharactersAt(position, layer) {
    return this.charBlockCache.getCharactersAt(position, layer);
  }
  rebuildTileCollisionCache(rect) {
    this.tileCollisionCache?.rebuild(rect);
  }
  // Performance critical method.
  hasBlockingTileUncached(pos, charLayer, direction, ignoreHasTile) {
    if (!ignoreHasTile && this.hasNoTileUncached(pos, charLayer)) return true;
    const crl = this.getCollisionRelevantLayers(charLayer);
    for (const layer of crl) {
      if (this.isLayerBlockingAt(layer.getName(), pos, direction)) {
        return true;
      }
    }
    return false;
  }
  hasBlockingTile(pos, charLayer, direction, ignoreHasTile) {
    const cached = this.tileCollisionCache?.isBlockingFrom(
      pos.x,
      pos.y,
      charLayer,
      direction,
      ignoreHasTile
    );
    if (cached !== void 0) return cached;
    return this.hasBlockingTileUncached(
      pos,
      charLayer,
      direction,
      ignoreHasTile
    );
  }
  getTransition(pos, fromLayer) {
    const transitions = this.transitions.get(pos.toString());
    if (transitions) {
      return transitions.get(fromLayer);
    }
  }
  getReverseTransitions(pos, targetLayer) {
    const reverseTransitions = this.reverseTransitions.get(pos.toString());
    if (reverseTransitions) {
      return reverseTransitions.get(targetLayer);
    }
  }
  setTransition(pos, fromLayer, toLayer) {
    if (!this.transitions.has(pos.toString())) {
      this.transitions.set(pos.toString(), /* @__PURE__ */ new Map());
    }
    if (!this.reverseTransitions.has(pos.toString())) {
      this.reverseTransitions.set(pos.toString(), /* @__PURE__ */ new Map());
    }
    this.transitions.get(pos.toString())?.set(fromLayer, toLayer);
    if (!this.reverseTransitions.get(pos.toString())?.has(toLayer)) {
      this.reverseTransitions.get(pos.toString())?.set(toLayer, /* @__PURE__ */ new Set());
    }
    this.reverseTransitions.get(pos.toString())?.get(toLayer)?.add(fromLayer);
  }
  getTransitions() {
    return new Map(
      [...this.transitions].map(([pos, map3]) => [pos, new Map(map3)])
    );
  }
  getTileCosts(pos, srcDir) {
    const crl = this.getCollisionRelevantLayers(pos.layer);
    let maxCost = 1;
    for (const layer of crl) {
      maxCost = Math.max(
        maxCost,
        this.getTileCostsForLayer({ ...pos, layer: layer.getName() }, srcDir)
      );
    }
    return maxCost;
  }
  getTileCostsForLayer(dest, dir) {
    const tile = this.tilemap.getTileAt(
      dest.position.x,
      dest.position.y,
      dest.layer
    );
    return dir && tile?.getProperty(this.tileCostPropNames.get(dir) || "") || tile?.getProperty(TILE_COST_PROPERTY_NAME) || 1;
  }
  hasNoTileUncached(pos, charLayer) {
    const crl = this.getCollisionRelevantLayers(charLayer);
    return !crl.some(
      (layer) => this.tilemap.hasTileAt(pos.x, pos.y, layer.getName())
    );
  }
  hasNoTile(pos, charLayer) {
    const cached = this.tileCollisionCache?.hasTileAt(pos.x, pos.y, charLayer);
    if (cached !== void 0) {
      return cached;
    }
    return this.hasNoTileUncached(pos, charLayer);
  }
  hasBlockingChar(pos, layer, collisionGroups, exclude = /* @__PURE__ */ new Set(), ignoreCollisionGroups = /* @__PURE__ */ new Set()) {
    return this.charBlockCache.isCharBlockingAt(
      pos,
      layer,
      collisionGroups,
      exclude,
      ignoreCollisionGroups
    );
  }
  isInRange(pos) {
    const rect = new Rect(
      0,
      0,
      this.tilemap.getWidth(),
      this.tilemap.getHeight()
    );
    return rect.isInRange(pos);
  }
  toMapDirection(direction) {
    if (this.isIsometric()) {
      return turnCounterClockwise(direction);
    }
    return direction;
  }
  fromMapDirection(direction) {
    if (this.isIsometric()) {
      return turnClockwise(direction);
    }
    return direction;
  }
  isIsometric() {
    return this.tilemap.getOrientation() === "isometric";
  }
  getTilePosInDirection(position, direction) {
    const posInDir = position.position.add(
      directionVector(this.toMapDirection(direction))
    );
    const transition = this.getTransition(posInDir, position.layer) || position.layer;
    return {
      position: posInDir,
      layer: transition
    };
  }
  invalidateFrameCache() {
    this.collisionRelevantLayersFrameCache.clear();
  }
  // This method is performance critical for pathfinding.
  isLayerBlockingAt(layerName, pos, direction) {
    const tile = this.tilemap.getTileAt(pos.x, pos.y, layerName);
    if (!tile) return false;
    return !!(tile.getProperty(this.collisionTilePropertyName) || direction && tile.getProperty(this.collidesPropNames.get(direction) || ""));
  }
  getCharLayerIndexes() {
    return this.tilemap.getLayers().map((layer, index) => ({ layer, index })).filter(({ layer }) => layer.isCharLayer()).map(({ index }) => index);
  }
  findPrevAndCharLayer(charLayer) {
    const indexes = this.getCharLayerIndexes();
    const layers = this.tilemap.getLayers();
    const charLayerIndex = indexes.findIndex((index) => {
      return layers[index].getProperty(CHAR_LAYER_PROP_NAME) == charLayer;
    });
    if (charLayerIndex == 0) {
      return { prevIndex: -1, charLayerIndex: indexes[charLayerIndex] };
    }
    return {
      prevIndex: indexes[charLayerIndex - 1],
      charLayerIndex: indexes[charLayerIndex]
    };
  }
  getCollisionRelevantLayers(charLayer) {
    if (!charLayer) return this.tilemap.getLayers();
    const cached = this.collisionRelevantLayersFrameCache.get(charLayer);
    if (cached) return cached;
    const { prevIndex, charLayerIndex } = this.findPrevAndCharLayer(charLayer);
    const computed = this.tilemap.getLayers().slice(prevIndex + 1, charLayerIndex + 1);
    this.collisionRelevantLayersFrameCache.set(charLayer, computed);
    return computed;
  }
  getLowestCharLayer() {
    for (const layer of this.tilemap.getLayers()) {
      if (layer.isCharLayer()) return layer.getProperty(CHAR_LAYER_PROP_NAME);
    }
    return void 0;
  }
  getCharLayerNames() {
    return this.tilemap.getLayers().filter((l) => l.isCharLayer()).map((l) => l.getProperty(CHAR_LAYER_PROP_NAME)).filter(isDefined);
  }
};
function isDefined(value) {
  return value !== null && value !== void 0;
}

// src/IGridEngine.ts
var CharacterShiftAction = /* @__PURE__ */ ((CharacterShiftAction2) => {
  CharacterShiftAction2["REMOVED"] = "REMOVED";
  CharacterShiftAction2["ADDED"] = "ADDED";
  return CharacterShiftAction2;
})(CharacterShiftAction || {});

// src/Movement/QueueMovement/QueueMovement.ts
var import_rxjs5 = __toESM(require_cjs(), 1);
var import_operators4 = __toESM(require_operators(), 1);
var QueuedPathBlockedStrategy = /* @__PURE__ */ ((QueuedPathBlockedStrategy2) => {
  QueuedPathBlockedStrategy2["WAIT"] = "WAIT";
  QueuedPathBlockedStrategy2["SKIP"] = "SKIP";
  QueuedPathBlockedStrategy2["STOP"] = "STOP";
  return QueuedPathBlockedStrategy2;
})(QueuedPathBlockedStrategy || {});
var QueueMovement = class {
  constructor(character, tilemap) {
    this.character = character;
    this.tilemap = tilemap;
    this.queue = new Queue();
    this.finished$ = new import_rxjs5.Subject();
    this.pathBlockedWaitElapsed = 0;
    this.distanceUtils = DistanceUtilsFactory.create(
      character.getNumberOfDirections()
    );
    this.character.autoMovementSet().pipe(
      (0, import_operators4.filter)((movement) => movement !== this),
      (0, import_operators4.take)(1)
    ).subscribe(() => {
      if (this.queue.size() > 0) {
        this.finishMovementTerminated();
      }
      this.finished$.complete();
    });
  }
  update(delta) {
    if ((!this.character.isMoving() || this.character.willCrossTileBorderThisUpdate(delta)) && this.queue.size() > 0) {
      this.moveCharOnPath(delta);
    }
  }
  getInfo() {
    return {
      type: "Queue"
    };
  }
  enqueue(positions, config = {}) {
    const concreteConfig = {
      pathBlockedStrategy: config.pathBlockedStrategy ?? "STOP" /* STOP */,
      pathBlockedWaitTimeoutMs: config?.pathBlockedWaitTimeoutMs || -1,
      ignoreInvalidPositions: config.ignoreInvalidPositions ?? false,
      skipInvalidPositions: config.skipInvalidPositions ?? false
    };
    for (const pos of positions) {
      const newEntry = { command: pos, config: concreteConfig };
      if (isDirection(pos)) {
        this.queue.enqueue(newEntry);
        continue;
      }
      const endEntry = this.queue.peekEnd();
      let endCommand = endEntry?.command;
      if (!endCommand) {
        endCommand = this.character.getNextTilePos();
      }
      if (isDirection(endCommand)) {
        this.queue.enqueue(newEntry);
        continue;
      }
      const isNeighborPos = this.distanceUtils.distance(endCommand.position, pos.position) === 1;
      if (!config.ignoreInvalidPositions || isNeighborPos) {
        this.queue.enqueue(newEntry);
      }
    }
  }
  peekAll() {
    return this.queue.peekAll();
  }
  size() {
    return this.queue.size();
  }
  finished() {
    return this.finished$;
  }
  clear() {
    this.queue.clear();
  }
  moveCharOnPath(delta) {
    const nextEntry = this.queue.peek();
    if (!nextEntry) return;
    let nextPos = nextEntry.command;
    const nextConfig = nextEntry.config;
    if (isDirection(nextPos)) {
      nextPos = this.tilemap.getTilePosInDirection(
        this.character.getNextTilePos(),
        nextPos
      );
    }
    if (!nextConfig.skipInvalidPositions) {
      if (!this.isNeighborPos(nextPos)) {
        this.finishInvalidNextPos(nextPos);
        return;
      }
    } else {
      nextPos = this.getNextValidPosition();
      if (!nextPos) {
        this.finishInvalidNextPos(nextPos);
        return;
      }
    }
    if (this.character.isBlockingDirection(
      directionFromPos(
        this.character.getNextTilePos().position,
        nextPos.position
      )
    )) {
      if (nextConfig.pathBlockedStrategy === "STOP" /* STOP */) {
        this.finishPathBlocked(nextPos);
      } else if (nextConfig.pathBlockedStrategy === "SKIP" /* SKIP */) {
        this.queue.dequeue();
        this.moveCharOnPath(delta);
        return;
      } else if (nextConfig.pathBlockedStrategy === "WAIT" /* WAIT */ && nextConfig.pathBlockedWaitTimeoutMs > -1) {
        this.pathBlockedWaitElapsed += delta;
        if (this.pathBlockedWaitElapsed >= nextConfig.pathBlockedWaitTimeoutMs) {
          this.finishBlockedWaitTimeout(
            nextPos,
            nextConfig.pathBlockedWaitTimeoutMs
          );
        }
      }
      return;
    }
    this.pathBlockedWaitElapsed = 0;
    this.queue.dequeue();
    this.character.move(
      this.getDir(this.character.getNextTilePos().position, nextPos.position)
    );
    if (this.isLastMovement()) {
      this.finish("SUCCESS", "", nextPos);
    }
  }
  getNextValidPosition() {
    while (this.queue.size() > 0) {
      let nextPos = this.queue.peek()?.command;
      if (isDirection(nextPos)) {
        nextPos = this.tilemap.getTilePosInDirection(
          this.character.getNextTilePos(),
          nextPos
        );
      }
      if (nextPos && this.isNeighborPos(nextPos)) {
        return nextPos;
      }
      this.queue.dequeue();
    }
    return void 0;
  }
  isLastMovement() {
    return this.queue.size() === 0;
  }
  isNeighborPos(position) {
    const isNeighborPos = this.distanceUtils.distance(
      this.character.getNextTilePos().position,
      position.position
    ) === 1;
    const trans = this.tilemap.getTransition(
      position.position,
      this.character.getNextTilePos().layer
    );
    if (this.character.getNextTilePos().layer !== position.layer) {
      return isNeighborPos && trans === position.layer;
    }
    const hasTransition = trans !== void 0 && trans !== position.layer;
    return isNeighborPos && !hasTransition;
  }
  finishMovementTerminated() {
    this.finish(
      "MOVEMENT_TERMINATED",
      "New automatic movement has been set to character."
    );
  }
  finishInvalidNextPos(nextPos) {
    if (nextPos) {
      this.finish(
        "INVALID_NEXT_POS",
        `Position ${this.posToStr(
          nextPos
        )} is not reachable from ${this.posToStr(
          this.character.getNextTilePos()
        )}.`
      );
    } else {
      this.finish(
        "INVALID_NEXT_POS",
        `No enqueued position is reachable from ${this.posToStr(
          this.character.getNextTilePos()
        )}.`
      );
    }
  }
  finishPathBlocked(nextPos) {
    this.finish(
      "PATH_BLOCKED",
      `Position ${this.posToStr(nextPos)} is blocked.`
    );
  }
  finishBlockedWaitTimeout(nextPos, pathBlockedWaitTimeoutMs) {
    this.finish(
      "PATH_BLOCKED_WAIT_TIMEOUT",
      `Position ${this.posToStr(
        nextPos
      )} is blocked and the wait timeout of ${pathBlockedWaitTimeoutMs} ms has been exceeded.`
    );
  }
  finish(result, description = "", nextPos = this.character.getNextTilePos()) {
    this.queue = new Queue();
    this.finished$.next({
      position: nextPos.position,
      result,
      description,
      layer: nextPos.layer
    });
  }
  getDir(from, to) {
    return this.tilemap.fromMapDirection(directionFromPos(from, to));
  }
  posToStr(pos) {
    return `(${pos.position.x}, ${pos.position.y}, ${pos.layer})`;
  }
};

// src/GridEngineHeadless.ts
var GridEngineHeadless = class {
  constructor(printWelcomeMessage = true) {
    this.isCreatedInternal = false;
    if (printWelcomeMessage) {
      console.log(`Using GridEngine v${version}`);
    }
  }
  /**
   * {@inheritDoc IGridEngine.getCharLayer}
   *
   * @category Character
   */
  getCharLayer(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getTilePos().layer;
  }
  /**
   * {@inheritDoc IGridEngine.getTransition}
   *
   * @category Tilemap
   */
  getTransition(position, fromLayer) {
    this.initGuard();
    return this.gridTilemap?.getTransition(new Vector2(position), fromLayer);
  }
  /**
   * {@inheritDoc IGridEngine.setTransition}
   *
   * @category Tilemap
   */
  setTransition(position, fromLayer, toLayer) {
    this.initGuard();
    return this.gridTilemap?.setTransition(
      new Vector2(position),
      fromLayer,
      toLayer
    );
  }
  /**
   * Initializes GridEngine. Must be called before any other methods of
   * GridEngine are called.
   *
   * @category Grid Engine
   */
  create(tilemap, config) {
    this.isCreatedInternal = true;
    this.gridCharacters = /* @__PURE__ */ new Map();
    const concreteConfig = this.setConfigDefaults(config);
    this.config = concreteConfig;
    this.movementStopped$ = new import_rxjs6.Subject();
    this.movementStarted$ = new import_rxjs6.Subject();
    this.directionChanged$ = new import_rxjs6.Subject();
    this.positionChangeStarted$ = new import_rxjs6.Subject();
    this.positionChangeFinished$ = new import_rxjs6.Subject();
    this.queueMovementFinished$ = new import_rxjs6.Subject();
    this.charRemoved$ = new import_rxjs6.Subject();
    this.charAdded$ = new import_rxjs6.Subject();
    this.gridTilemap = new GridTilemap(
      tilemap,
      this.config.collisionTilePropertyName,
      this.config.characterCollisionStrategy,
      this.recordToMap(this.config.collisionGroupRelation),
      this.config.cacheTileCollisions
    );
    this.addCharacters();
  }
  recordToMap(rec) {
    if (!rec) return void 0;
    const map3 = new Map(
      Object.entries(rec).map(([k, v]) => [k, new Set(v)])
    );
    return map3;
  }
  /**
   * {@inheritDoc IGridEngine.getPosition}
   *
   * @category Character
   */
  getPosition(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getTilePos().position;
  }
  /**
   * {@inheritDoc IGridEngine.move}
   *
   * @category Basic Movement
   */
  move(charId, direction) {
    this.moveChar(charId, direction);
  }
  /**
   * {@inheritDoc IGridEngine.moveRandomly}
   *
   * @category Random Movement
   */
  moveRandomly(charId, delay = 0, radius = -1) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    const randomMovement = new RandomMovement(gridChar, delay, radius);
    gridChar.setMovement(randomMovement);
  }
  /**
   * {@inheritDoc IGridEngine.getMovement}
   *
   * @category Character
   */
  getMovement(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    const movement = gridChar.getMovement();
    if (!movement) {
      return {
        type: "None"
      };
    }
    return movement.getInfo();
  }
  /**
   * {@inheritDoc IGridEngine.moveTo}
   *
   * @category Pathfinding
   */
  moveTo(charId, targetPos, config) {
    const moveToConfig = this.assembleMoveToConfig(config);
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    if (!this.gridTilemap) throw this.createUninitializedErr();
    const targetMovement = new TargetMovement(
      gridChar,
      this.gridTilemap,
      {
        position: new Vector2(targetPos),
        layer: config?.targetLayer || gridChar.getNextTilePos().layer
      },
      {
        distance: 0,
        config: moveToConfig
      }
    );
    gridChar.setMovement(targetMovement);
    return targetMovement.finishedObs().pipe(
      (0, import_operators5.map)((finished) => ({
        charId,
        position: finished.position,
        result: finished.result,
        description: finished.description,
        layer: finished.layer
      }))
    );
  }
  /**
   * {@inheritDoc IGridEngine.stopMovement}
   *
   * @category Character
   */
  stopMovement(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.setMovement(void 0);
  }
  /**
   * {@inheritDoc IGridEngine.setSpeed}
   *
   * @category Character
   */
  setSpeed(charId, speed) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.setSpeed(speed);
  }
  /**
   * {@inheritDoc IGridEngine.getSpeed}
   *
   * @category Character
   *
   */
  getSpeed(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getSpeed();
  }
  /**
   * {@inheritDoc IGridEngine.collidesWithTiles}
   *
   * @category Character
   */
  collidesWithTiles(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.collidesWithTiles();
  }
  /**
   * @category Grid Engine
   */
  update(_time, delta) {
    if (this.isCreatedInternal && this.gridCharacters) {
      for (const [_key, gridChar] of this.gridCharacters) {
        gridChar.update(delta);
      }
    }
    this.gridTilemap?.invalidateFrameCache();
  }
  /**
   * Adds a character after calling {@link create}.
   *
   * @category Grid Engine
   */
  addCharacter(charData) {
    if (!this.gridTilemap) throw this.createUninitializedErr();
    if (!this.config) throw this.createUninitializedErr();
    const charConfig = {
      speed: charData.speed || 4,
      tilemap: this.gridTilemap,
      collidesWithTiles: true,
      collisionGroups: ["geDefault"],
      ignoreCollisionGroups: [],
      charLayer: charData.charLayer,
      facingDirection: charData.facingDirection,
      labels: charData.labels,
      numberOfDirections: charData.numberOfDirections ?? this.config.numberOfDirections,
      tileWidth: charData.tileWidth,
      tileHeight: charData.tileHeight
    };
    if (typeof charData.collides === "boolean") {
      if (charData.collides === false) {
        charConfig.collidesWithTiles = false;
        charConfig.collisionGroups = [];
      }
    } else if (charData.collides !== void 0) {
      if (charData.collides.collidesWithTiles === false) {
        charConfig.collidesWithTiles = false;
      }
      if (charData.collides.collisionGroups) {
        charConfig.collisionGroups = charData.collides.collisionGroups;
      }
      if (charData.collides.ignoreCollisionGroups) {
        charConfig.ignoreCollisionGroups = charData.collides.ignoreCollisionGroups;
      }
      charConfig.ignoreMissingTiles = charData.collides?.ignoreMissingTiles ?? false;
    }
    const gridChar = new GridCharacter(charData.id, charConfig);
    if (charData.startPosition) {
      gridChar.setTilePosition({
        position: new Vector2(charData.startPosition),
        layer: gridChar.getTilePos().layer
      });
    }
    this.gridCharacters?.set(charData.id, gridChar);
    this.gridTilemap.addCharacter(gridChar);
    const id = gridChar.getId();
    gridChar.movementStopped().pipe((0, import_operators5.takeUntil)(this.charRemoved(id))).subscribe((direction) => {
      this.movementStopped$?.next({ charId: id, direction });
    });
    gridChar.movementStarted().pipe((0, import_operators5.takeUntil)(this.charRemoved(id))).subscribe((direction) => {
      this.movementStarted$?.next({ charId: id, direction });
    });
    gridChar.directionChanged().pipe((0, import_operators5.takeUntil)(this.charRemoved(id))).subscribe((direction) => {
      this.directionChanged$?.next({ charId: id, direction });
    });
    gridChar.positionChangeStarted().pipe((0, import_operators5.takeUntil)(this.charRemoved(id))).subscribe((positionChange) => {
      this.positionChangeStarted$?.next({
        charId: id,
        ...positionChange
      });
    });
    gridChar.positionChangeFinished().pipe((0, import_operators5.takeUntil)(this.charRemoved(id))).subscribe((positionChange) => {
      this.positionChangeFinished$?.next({
        charId: id,
        ...positionChange
      });
    });
    this.charAdded$?.next(id);
  }
  /**
   * {@inheritDoc IGridEngine.hasCharacter}
   *
   * @category Grid Engine
   */
  hasCharacter(charId) {
    this.initGuard();
    return !!this.gridCharacters?.has(charId);
  }
  /**
   * {@inheritDoc IGridEngine.removeCharacter}
   *
   * @category Grid Engine
   */
  removeCharacter(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    this.gridTilemap?.removeCharacter(charId);
    this.gridCharacters?.delete(charId);
    this.charRemoved$?.next(charId);
  }
  /**
   * {@inheritDoc IGridEngine.removeAllCharacters}
   *
   * @category Grid Engine
   */
  removeAllCharacters() {
    this.initGuard();
    if (!this.gridCharacters) return;
    for (const charId of this.gridCharacters.keys()) {
      this.removeCharacter(charId);
    }
  }
  /**
   * {@inheritDoc IGridEngine.getAllCharacters}
   *
   * @category Grid Engine
   */
  getAllCharacters(options) {
    this.initGuard();
    if (!this.gridCharacters) return [];
    const allChars = [...this.gridCharacters.values()];
    const filteredChars = options ? filterCharacters(allChars, options) : allChars;
    return filteredChars.map((char) => char.getId());
  }
  /**
   * {@inheritDoc IGridEngine.getLabels}
   *
   * @category Character
   */
  getLabels(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getLabels();
  }
  /**
   * {@inheritDoc IGridEngine.addLabels}
   *
   * @category Character
   */
  addLabels(charId, labels) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.addLabels(labels);
  }
  /**
   * {@inheritDoc IGridEngine.removeLabels}
   *
   * @category Character
   */
  removeLabels(charId, labels) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.removeLabels(labels);
  }
  /**
   * {@inheritDoc IGridEngine.clearLabels}
   *
   * @category Character
   */
  clearLabels(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.clearLabels();
  }
  follow(charId, charIdToFollow, distance, closestPointIfBlocked) {
    let options;
    if (distance === void 0) {
      options = {
        distance: 0,
        closestPointIfBlocked: false
      };
    } else if (typeof distance === "number") {
      options = {
        distance,
        closestPointIfBlocked: false
      };
      if (closestPointIfBlocked) {
        options.closestPointIfBlocked = true;
      }
    } else {
      options = distance;
    }
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    const gridCharToFollow = this.gridCharacters?.get(charIdToFollow);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    if (!gridCharToFollow) throw this.createCharUnknownErr(charIdToFollow);
    if (!this.gridTilemap) throw this.createUninitializedErr();
    const followMovement = new FollowMovement(
      gridChar,
      this.gridTilemap,
      gridCharToFollow,
      {
        distance: options.distance ?? 0,
        noPathFoundStrategy: options.closestPointIfBlocked ? "CLOSEST_REACHABLE" /* CLOSEST_REACHABLE */ : "STOP" /* STOP */,
        maxPathLength: options.maxPathLength ?? Infinity,
        shortestPathAlgorithm: options.algorithm ?? "BIDIRECTIONAL_SEARCH",
        ignoreLayers: !!options.ignoreLayers,
        facingDirection: options.facingDirection ?? "none" /* NONE */,
        considerCosts: options.considerCosts ?? false,
        isPositionAllowedFn: options.isPositionAllowedFn ?? (() => true),
        ignoredChars: options.ignoredChars ?? []
      }
    );
    gridChar.setMovement(followMovement);
  }
  /**
   * {@inheritDoc IGridEngine.isMoving}
   *
   * @category Character
   */
  isMoving(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.isMoving();
  }
  /**
   * {@inheritDoc IGridEngine.getFacingDirection}
   *
   * @category Character
   */
  getFacingDirection(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getFacingDirection();
  }
  /**
   * {@inheritDoc IGridEngine.getFacingPosition}
   *
   * @category Character
   */
  getFacingPosition(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    const vectorPos = gridChar.getFacingPosition();
    return { x: vectorPos.x, y: vectorPos.y };
  }
  /**
   * {@inheritDoc IGridEngine.turnTowards}
   *
   * @category Basic Movement
   */
  turnTowards(charId, direction) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.turnTowards(direction);
  }
  /**
   * {@inheritDoc IGridEngine.getCharactersAt}
   *
   * @category Tilemap
   */
  getCharactersAt(position, layer) {
    this.initGuard();
    if (!this.gridTilemap) return [];
    const characters = this.gridTilemap.getCharactersAt(
      new Vector2(position),
      layer
    );
    return Array.from(characters).map((char) => char.getId());
  }
  /**
   * {@inheritDoc IGridEngine.setPosition}
   *
   * @category Character
   */
  setPosition(charId, pos, layer) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    if (!layer) {
      gridChar.setTilePosition({
        position: new Vector2(pos),
        layer: gridChar.getTilePos().layer
      });
    }
    gridChar.setTilePosition({ position: new Vector2(pos), layer });
  }
  /**
   * {@inheritDoc IGridEngine.isBlocked}
   *
   * @category Tilemap
   */
  isBlocked(position, layer, collisionGroups = ["geDefault"]) {
    this.initGuard();
    const positionVec = new Vector2(position);
    return !!(this.gridTilemap?.hasBlockingTile(positionVec, layer) || this.gridTilemap?.hasBlockingChar(positionVec, layer, collisionGroups));
  }
  /**
   * {@inheritDoc IGridEngine.isTileBlocked}
   *
   * @category Tilemap
   */
  isTileBlocked(position, layer) {
    this.initGuard();
    return !!this.gridTilemap?.hasBlockingTile(new Vector2(position), layer);
  }
  /**
   * {@inheritDoc IGridEngine.getCollisionGroups}
   *
   * @category Character
   */
  getCollisionGroups(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getCollisionGroups() || [];
  }
  /**
   * {@inheritDoc IGridEngine.setCollisionGroups}
   *
   * @category Character
   */
  setCollisionGroups(charId, collisionGroups) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.setCollisionGroups(collisionGroups);
  }
  /**
   * {@inheritDoc IGridEngine.getIgnoreCollisionGroups}
   *
   * @category Character
   */
  getIgnoreCollisionGroups(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getIgnoreCollisionGroups() || [];
  }
  /**
   * {@inheritDoc IGridEngine.setIgnoreCollisionGroups}
   *
   * @category Character
   */
  setIgnoreCollisionGroups(charId, ignoreCollisionGroups) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.setIgnoreCollisionGroups(ignoreCollisionGroups);
  }
  /**
   * {@inheritDoc IGridEngine.getTilePosInDirection}
   *
   * @category Tilemap
   */
  getTilePosInDirection(position, charLayer, direction) {
    if (!this.gridTilemap) throw this.createUninitializedErr();
    const posInDirection = this.gridTilemap.getTilePosInDirection(
      {
        position: new Vector2(position),
        layer: charLayer
      },
      direction
    );
    return {
      position: posInDirection.position.toPosition(),
      charLayer: posInDirection.layer
    };
  }
  /**
   * {@inheritDoc IGridEngine.findShortestPath}
   * @alpha
   *
   * @category Pathfinding
   */
  findShortestPath(source, dest, options = {}) {
    if (!this.gridTilemap) throw this.createUninitializedErr();
    const algo = options.shortestPathAlgorithm || "BFS";
    if (options.considerCosts && algo !== "A_STAR") {
      console.warn(
        `GridEngine: Pathfinding option 'considerCosts' cannot be used with algorithm '${algo}'. It can only be used with A* algorithm.`
      );
    }
    const nonDefaultPathWidth = options.pathWidth !== void 0 && options.pathWidth !== 1;
    const nonDefaultPathHeight = options.pathHeight !== void 0 && options.pathHeight !== 1;
    if ((nonDefaultPathWidth || nonDefaultPathHeight) && algo === "JPS") {
      console.warn(
        `GridEngine: Pathfinding options 'pathWidth' and 'pathHeight' > 1 cannot be used with algorithm 'JPS'.`
      );
    }
    const pathfinding = new Pathfinding(this.gridTilemap);
    const res = pathfinding.findShortestPath(
      LayerPositionUtils.toInternal(source),
      LayerPositionUtils.toInternal(dest),
      {
        ...options,
        shortestPathAlgorithm: algo
      }
    );
    return {
      path: res.path.map(LayerPositionUtils.fromInternal),
      closestToTarget: res.closestToTarget ? LayerPositionUtils.fromInternal(res.closestToTarget) : void 0,
      reachedMaxPathLength: false,
      steps: res.steps
    };
  }
  /**
   * {@inheritDoc IGridEngine.steppedOn}
   *
   * @category Basic Movement
   */
  steppedOn(charIds, tiles, layer) {
    return this.positionChangeFinished().pipe(
      (0, import_operators5.filter)(
        (t) => charIds.includes(t.charId) && tiles.some(
          (target) => target.x === t.enterTile.x && target.y === t.enterTile.y
        ) && (layer === void 0 || layer.includes(t.enterLayer))
      )
    );
  }
  /**
   * {@inheritDoc IGridEngine.characterShifted}
   *
   * @category GridEngine
   */
  characterShifted() {
    if (!this.charAdded$ || !this.charRemoved$) {
      throw this.createUninitializedErr();
    }
    return this.charAdded$.pipe(
      (0, import_operators5.map)((c) => ({
        charId: c,
        action: "ADDED" /* ADDED */
      })),
      (0, import_operators5.mergeWith)(
        this.charRemoved$.pipe(
          (0, import_operators5.map)((c) => ({
            charId: c,
            action: "REMOVED" /* REMOVED */
          }))
        )
      )
    );
  }
  /**
   * {@inheritDoc IGridEngine.movementStarted}
   *
   * @category Character
   */
  movementStarted() {
    if (!this.movementStarted$) throw this.createUninitializedErr();
    return this.movementStarted$;
  }
  /**
   * {@inheritDoc IGridEngine.movementStopped}
   *
   * @category Character
   */
  movementStopped() {
    if (!this.movementStopped$) throw this.createUninitializedErr();
    return this.movementStopped$;
  }
  /**
   * {@inheritDoc IGridEngine.directionChanged}
   *
   * @category Character
   */
  directionChanged() {
    if (!this.directionChanged$) throw this.createUninitializedErr();
    return this.directionChanged$;
  }
  /**
   * {@inheritDoc IGridEngine.positionChangeStarted}
   *
   * @category Character
   */
  positionChangeStarted() {
    if (!this.positionChangeStarted$) throw this.createUninitializedErr();
    return this.positionChangeStarted$;
  }
  /**
   * {@inheritDoc IGridEngine.positionChangeFinished}
   *
   * @category Character
   */
  positionChangeFinished() {
    if (!this.positionChangeFinished$) throw this.createUninitializedErr();
    return this.positionChangeFinished$;
  }
  /**
   * {@inheritDoc IGridEngine.getMovementProgress}
   *
   * @category Character
   */
  getMovementProgress(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getMovementProgress();
  }
  /**
   * {@inheritDoc IGridEngine.rebuildTileCollisionCache}
   *
   * @category Character
   */
  rebuildTileCollisionCache(x, y, width, height) {
    this.gridTilemap?.rebuildTileCollisionCache(new Rect(x, y, width, height));
  }
  /**
   * {@inheritDoc IGridEngine.addQueueMovements}
   *
   * @category Queue Movement
   */
  addQueueMovements(charId, positions, options) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    if (!this.gridTilemap) throw this.createUninitializedErr();
    let queueMovement;
    if (gridChar?.getMovement()?.getInfo().type === "Queue") {
      queueMovement = gridChar.getMovement();
    } else {
      queueMovement = new QueueMovement(gridChar, this.gridTilemap);
      gridChar.setMovement(queueMovement);
      queueMovement.finished().pipe(
        (0, import_operators5.takeUntil)(
          (0, import_rxjs6.merge)(this.charRemoved(charId), gridChar.autoMovementSet())
        )
      ).subscribe((finished) => {
        this.queueMovementFinished$?.next({ charId, ...finished });
      });
    }
    queueMovement.enqueue(
      positions.map((p) => {
        if (isDirection(p)) {
          return p;
        }
        return {
          position: new Vector2(p.position),
          layer: p.charLayer
        };
      }),
      options
    );
  }
  /**
   * {@inheritDoc IGridEngine.queueMovementFinished}
   *
   * @category Queue Movement
   */
  queueMovementFinished() {
    if (!this.queueMovementFinished$) throw this.createUninitializedErr();
    return this.queueMovementFinished$;
  }
  /**
   * {@inheritDoc IGridEngine.getEnqueuedMovements}
   *
   * @category Queue Movement
   */
  getEnqueuedMovements(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    if (gridChar.getMovement()?.getInfo().type === "Queue") {
      const queueMovement = gridChar.getMovement();
      return queueMovement.peekAll().map((entry) => {
        return {
          command: isDirection(entry.command) ? entry.command : LayerPositionUtils.fromInternal(entry.command),
          config: entry.config
        };
      });
    }
    return [];
  }
  /**
   * {@inheritDoc IGridEngine.clearEnqueuedMovements}
   *
   * @category Queue Movement
   */
  clearEnqueuedMovements(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    if (gridChar.getMovement()?.getInfo().type === "Queue") {
      const queueMovement = gridChar.getMovement();
      queueMovement.clear();
    }
  }
  /**
   * {@inheritDoc IGridEngine.getTileCost}
   *
   * @category Pathfinding
   */
  getTileCost(position, charLayer, srcDirection) {
    this.initGuard();
    return this.gridTilemap?.getTileCosts(
      { position: new Vector2(position), layer: charLayer },
      srcDirection
    ) ?? 1;
  }
  /**
   * Returns the current state of Grid Engine. This is useful for persiting or
   * sharing the state.
   *
   * @category GridEngine
   *
   * @beta
   */
  getState() {
    const chars = [];
    if (this.gridCharacters) {
      for (const [id, char] of this.gridCharacters.entries()) {
        chars.push({
          id,
          position: LayerPositionUtils.fromInternal(char.getTilePos()),
          facingDirection: char.getFacingDirection(),
          speed: char.getSpeed(),
          labels: char.getLabels(),
          movementProgress: char.getMovementProgress(),
          collisionConfig: {
            collisionGroups: char.getCollisionGroups(),
            ignoreCollisionGroups: char.getIgnoreCollisionGroups(),
            collidesWithTiles: char.collidesWithTiles(),
            ignoreMissingTiles: char.getIgnoreMissingTiles()
          }
        });
      }
    }
    return {
      characters: chars
    };
  }
  /**
   * Sets the given state for Grid Engine. Be aware that it will **not** remove
   * any characters from Grid Engine. If you want to completely reset the state,
   * you should call {@link GridEngineHeadless.create}
   * or remove all characters via
   * {@link GridEngineHeadless.removeAllCharacters}.
   *
   * @category GridEngine
   *
   * @beta
   */
  setState(state) {
    if (this.gridCharacters) {
      for (const charState of state.characters) {
        const char = this.gridCharacters.get(charState.id);
        if (char) {
          const currentTilePos = char.getTilePos();
          if (!LayerPositionUtils.equal(
            currentTilePos,
            LayerPositionUtils.toInternal(charState.position)
          )) {
            char.setTilePosition(
              LayerPositionUtils.toInternal(charState.position)
            );
          }
          char.setSpeed(charState.speed);
          char.turnTowards(charState.facingDirection);
          if (charState.collisionConfig.collisionGroups) {
            char.setCollisionGroups(charState.collisionConfig.collisionGroups);
          }
          if (charState.collisionConfig.collidesWithTiles !== void 0) {
            char.setCollidesWithTiles(
              charState.collisionConfig.collidesWithTiles
            );
          }
          if (charState.collisionConfig.ignoreMissingTiles !== void 0) {
            char.setIgnoreMissingTiles(
              charState.collisionConfig.ignoreMissingTiles
            );
          }
          char.setMovementProgress(charState.movementProgress);
          char.clearLabels();
          char.addLabels(charState.labels);
        }
      }
    }
  }
  /**
   * {@inheritDoc IGridEngine.revertCurrentMovement}
   *
   * @category Basic Movement
   */
  revertCurrentMovement(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.revertCurrentMovement();
  }
  /**
   * {@inheritDoc IGridEngine.isCurrentMovementReverted}
   *
   * @category Basic Movement
   */
  isCurrentMovementReverted(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.isCurrentMovementReverted();
  }
  charRemoved(charId) {
    if (!this.charRemoved$) throw this.createUninitializedErr();
    return this.charRemoved$?.pipe(
      (0, import_operators5.take)(1),
      (0, import_operators5.filter)((cId) => cId == charId)
    );
  }
  initGuard() {
    if (!this.isCreatedInternal) {
      throw this.createUninitializedErr();
    }
  }
  createUninitializedErr() {
    throw new Error(
      "GridEngine not initialized. You need to call create() first."
    );
  }
  addCharacters() {
    this.config?.characters.forEach((charData) => this.addCharacter(charData));
  }
  moveChar(charId, direction) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    if (gridChar.getNumberOfDirections() === 4 /* FOUR */) {
      if (!this.gridTilemap?.isIsometric() && isDiagonal(direction)) {
        console.warn(
          `GridEngine: Character '${charId}' can't be moved '${direction}' in 4 direction mode.`
        );
        return;
      } else if (this.gridTilemap?.isIsometric() && !isDiagonal(direction)) {
        console.warn(
          `GridEngine: Character '${charId}' can't be moved '${direction}' in 4 direction isometric mode.`
        );
        return;
      }
    }
    gridChar.move(direction);
  }
  createCharUnknownErr(charId) {
    return new Error(`Character unknown: ${charId}`);
  }
  assembleMoveToConfig(config = {}) {
    const moveToConfig = {
      ...config,
      noPathFoundStrategy: "STOP" /* STOP */,
      pathBlockedStrategy: "WAIT" /* WAIT */
    };
    if (config?.noPathFoundStrategy) {
      if (Object.values(NoPathFoundStrategy).includes(config.noPathFoundStrategy)) {
        moveToConfig.noPathFoundStrategy = config.noPathFoundStrategy;
      } else {
        console.warn(
          `GridEngine: Unknown NoPathFoundStrategy '${config.noPathFoundStrategy}'. Falling back to '${"STOP" /* STOP */}'`
        );
      }
    }
    if (config?.pathBlockedStrategy) {
      if (Object.values(PathBlockedStrategy).includes(config.pathBlockedStrategy)) {
        moveToConfig.pathBlockedStrategy = config.pathBlockedStrategy;
      } else {
        console.warn(
          `GridEngine: Unknown PathBlockedStrategy '${config.pathBlockedStrategy}'. Falling back to '${"WAIT" /* WAIT */}'`
        );
      }
    }
    return moveToConfig;
  }
  setConfigDefaults(config) {
    return {
      collisionTilePropertyName: "ge_collide",
      numberOfDirections: 4 /* FOUR */,
      characterCollisionStrategy: "BLOCK_TWO_TILES" /* BLOCK_TWO_TILES */,
      cacheTileCollisions: false,
      ...config
    };
  }
};

// src/Pathfinding/Jps8/Jps8.ts
var Jps8 = class extends Jps4 {
  constructor(gridTilemap, po = {}) {
    super(gridTilemap, po);
    this.jumpCache = new JumpCache();
  }
  findShortestPathImpl(startPos, targetPos) {
    this.jumpCache = new JumpCache();
    return super.findShortestPathImpl(startPos, targetPos);
  }
  getNeighborsInternal(node, parent, stopNode) {
    if (!parent || node.layer !== parent.layer) {
      return this.getNeighbors(node, stopNode).map((n) => ({
        p: n,
        dist: 1
      }));
    }
    const pruned = this.prune(parent, node).map((unblockedNeighbor) => {
      const transition = this.getTransition(
        unblockedNeighbor.position,
        node.layer
      );
      return {
        position: unblockedNeighbor.position,
        layer: transition || node.layer
      };
    });
    const successors = [];
    for (const p of pruned) {
      const j = this.jump(
        node,
        p,
        stopNode,
        1,
        directionFromPos(node.position, p.position)
      );
      if (j) {
        j.dist = this.distance(node.position, j.p.position);
        successors.push(j);
      }
    }
    return successors;
  }
  getForced(parent, node) {
    const res = [];
    const { topLeft, downLeft, top, bottom, topRight, downRight } = this.normalizedPositions(parent, node);
    const dir = directionFromPos(parent.position, node.position);
    if (isDiagonal(dir)) {
      if (this.blockOrTrans(parent, topLeft)) {
        this.addIfNotBlocked(res, node, top);
        this.addIfNotBlocked(res, node, topRight);
        if (this.blockOrTrans(downLeft, topLeft)) {
          this.addIfNotBlocked(res, node, topLeft);
        }
      }
      if (this.blockOrTrans(parent, downLeft)) {
        this.addIfNotBlocked(res, node, bottom);
        this.addIfNotBlocked(res, node, downRight);
        if (this.blockOrTrans(topLeft, downLeft)) {
          this.addIfNotBlocked(res, node, downLeft);
        }
      }
      if (this.blockOrTrans(topLeft, top)) {
        this.addIfNotBlocked(res, node, top);
      }
      if (this.blockOrTrans(downLeft, bottom)) {
        this.addIfNotBlocked(res, node, bottom);
      }
      if (this.blockOrTrans(topLeft, topRight)) {
        this.addIfNotBlocked(res, node, topRight);
      }
      if (this.blockOrTrans(downLeft, downRight)) {
        this.addIfNotBlocked(res, node, downRight);
      }
    } else {
      if (this.blockOrTrans(parent, top) || this.blockOrTrans(top, topRight)) {
        this.addIfNotBlocked(res, node, topRight);
      }
      if (this.blockOrTrans(parent, bottom) || this.blockOrTrans(bottom, downRight)) {
        this.addIfNotBlocked(res, node, downRight);
      }
      if (this.blockOrTrans(parent, topLeft) && this.blockOrTrans(parent, top)) {
        this.addIfNotBlocked(res, node, top);
        this.addIfNotBlocked(res, node, topLeft);
      }
      if (this.blockOrTrans(parent, downLeft) && this.blockOrTrans(parent, bottom)) {
        this.addIfNotBlocked(res, node, bottom);
        this.addIfNotBlocked(res, node, downLeft);
      }
      if (this.blockOrTrans(topLeft, top) && this.blockOrTrans(parent, top)) {
        this.addIfNotBlocked(res, node, top);
      }
      if (this.blockOrTrans(downLeft, bottom) && this.blockOrTrans(parent, bottom)) {
        this.addIfNotBlocked(res, node, bottom);
      }
    }
    return res;
  }
  hasForced(parent, node) {
    const { topLeft, downLeft, top, bottom, topRight, downRight } = this.normalizedPositions(parent, node);
    const dir = directionFromPos(parent.position, node.position);
    if (isDiagonal(dir)) {
      if (this.blockOrTrans(parent, topLeft)) {
        if (!this.blockOrTrans(node, top) || !this.blockOrTrans(node, topRight)) {
          return true;
        }
        if (this.blockOrTrans(downLeft, topLeft)) {
          if (!this.blockOrTrans(node, topLeft)) {
            return true;
          }
        }
      }
      if (this.blockOrTrans(parent, downLeft)) {
        if (!this.blockOrTrans(node, bottom) || !this.blockOrTrans(node, downRight)) {
          return true;
        }
        if (this.blockOrTrans(topLeft, downLeft)) {
          if (!this.blockOrTrans(node, downLeft)) {
            return true;
          }
        }
      }
      if (this.blockOrTrans(topLeft, top)) {
        if (!this.blockOrTrans(node, top)) {
          return true;
        }
      }
      if (this.blockOrTrans(downLeft, bottom)) {
        if (!this.blockOrTrans(node, bottom)) {
          return true;
        }
      }
      if (this.blockOrTrans(topLeft, topRight)) {
        if (!this.blockOrTrans(node, topRight)) {
          return true;
        }
      }
      if (this.blockOrTrans(downLeft, downRight)) {
        if (!this.blockOrTrans(node, downRight)) {
          return true;
        }
      }
    } else {
      if (this.blockOrTrans(parent, top) || this.blockOrTrans(top, topRight)) {
        if (!this.blockOrTrans(node, topRight)) {
          return true;
        }
      }
      if (this.blockOrTrans(parent, bottom) || this.blockOrTrans(bottom, downRight)) {
        if (!this.blockOrTrans(node, downRight)) {
          return true;
        }
      }
      if (this.blockOrTrans(parent, topLeft) && this.blockOrTrans(parent, top)) {
        if (!this.blockOrTrans(node, top) || !this.blockOrTrans(node, topLeft)) {
          return true;
        }
      }
      if (this.blockOrTrans(parent, downLeft) && this.blockOrTrans(parent, bottom)) {
        if (!this.blockOrTrans(node, bottom) || !this.blockOrTrans(node, downLeft)) {
          return true;
        }
      }
      if (this.blockOrTrans(topLeft, top) && this.blockOrTrans(parent, top)) {
        if (!this.blockOrTrans(node, top)) {
          return true;
        }
      }
      if (this.blockOrTrans(downLeft, bottom) && this.blockOrTrans(parent, bottom)) {
        if (!this.blockOrTrans(node, bottom)) {
          return true;
        }
      }
    }
    return false;
  }
  prune(parent, node) {
    const { top, right, topRight, downRight, bottom } = this.normalizedPositions(parent, node);
    const forced = this.getForced(parent, node);
    const dir = directionFromPos(parent.position, node.position);
    if (isDiagonal(dir)) {
      return [top, right, topRight, downRight, bottom, ...forced];
    }
    return [right, ...forced];
  }
  jump(parent, node, stopNode, dist, dir) {
    const memo = this.jumpCache.get(parent, node);
    if (memo !== null) return memo;
    if (this.isBlocking(parent, node) && !(LayerPositionUtils.equal(node, stopNode) && this.options.ignoreBlockedTarget)) {
      this.jumpCache.set(parent, node, void 0);
      return void 0;
    }
    if (LayerPositionUtils.equal(node, stopNode)) {
      this.jumpCache.set(parent, node, { p: node, dist: 0 });
      return { p: node, dist: 0 };
    }
    if (dist >= this.maxJumpSize) {
      this.jumpCache.set(parent, node, { p: node, dist: 0 });
      return { p: node, dist: 0 };
    }
    if (this.getTransition(node.position, parent.layer) !== void 0) {
      this.jumpCache.set(parent, node, { p: node, dist: 0 });
      return { p: node, dist: 0 };
    }
    if (this.hasForced(parent, node)) {
      this.jumpCache.set(parent, node, { p: node, dist: 0 });
      return { p: node, dist: 0 };
    }
    this.updateClosestToTarget(node, stopNode);
    if (dir === "up-left" /* UP_LEFT */) {
      if (this.jump(
        node,
        this.getTilePosInDir(node, "up" /* UP */),
        stopNode,
        dist + 1,
        "up" /* UP */
      ) !== void 0) {
        this.jumpCache.set(parent, node, { p: node, dist: 0 });
        return { p: node, dist: 0 };
      }
      if (this.jump(
        node,
        this.getTilePosInDir(node, "left" /* LEFT */),
        stopNode,
        dist + 1,
        "left" /* LEFT */
      ) !== void 0) {
        this.jumpCache.set(parent, node, { p: node, dist: 0 });
        return { p: node, dist: 0 };
      }
    } else if (dir === "down-left" /* DOWN_LEFT */) {
      if (this.jump(
        node,
        this.getTilePosInDir(node, "down" /* DOWN */),
        stopNode,
        dist + 1,
        "down" /* DOWN */
      ) !== void 0) {
        this.jumpCache.set(parent, node, { p: node, dist: 0 });
        return { p: node, dist: 0 };
      }
      if (this.jump(
        node,
        this.getTilePosInDir(node, "left" /* LEFT */),
        stopNode,
        dist + 1,
        "left" /* LEFT */
      ) !== void 0) {
        this.jumpCache.set(parent, node, { p: node, dist: 0 });
        return { p: node, dist: 0 };
      }
    } else if (dir === "up-right" /* UP_RIGHT */) {
      if (this.jump(
        node,
        this.getTilePosInDir(node, "up" /* UP */),
        stopNode,
        dist + 1,
        "up" /* UP */
      ) !== void 0) {
        this.jumpCache.set(parent, node, { p: node, dist: 0 });
        return { p: node, dist: 0 };
      }
      if (this.jump(
        node,
        this.getTilePosInDir(node, "right" /* RIGHT */),
        stopNode,
        dist + 1,
        "right" /* RIGHT */
      ) !== void 0) {
        this.jumpCache.set(parent, node, { p: node, dist: 0 });
        return { p: node, dist: 0 };
      }
    } else if (dir === "down-right" /* DOWN_RIGHT */) {
      if (this.jump(
        node,
        this.getTilePosInDir(node, "down" /* DOWN */),
        stopNode,
        dist + 1,
        "down" /* DOWN */
      ) !== void 0) {
        this.jumpCache.set(parent, node, { p: node, dist: 0 });
        return { p: node, dist: 0 };
      }
      if (this.jump(
        node,
        this.getTilePosInDir(node, "right" /* RIGHT */),
        stopNode,
        dist + 1,
        "right" /* RIGHT */
      ) !== void 0) {
        this.jumpCache.set(parent, node, { p: node, dist: 0 });
        return { p: node, dist: 0 };
      }
    }
    const res = this.jump(
      node,
      this.getTilePosInDir(node, dir),
      stopNode,
      dist + 1,
      dir
    );
    this.jumpCache.set(parent, node, res);
    return res;
  }
  normalizedPositions(parent, node) {
    if (parent.position.x < node.position.x && parent.position.y === node.position.y) {
      return {
        topLeft: {
          position: new Vector2(node.position.x - 1, node.position.y - 1),
          layer: node.layer
        },
        downLeft: {
          position: new Vector2(node.position.x - 1, node.position.y + 1),
          layer: node.layer
        },
        top: {
          position: new Vector2(node.position.x, node.position.y - 1),
          layer: node.layer
        },
        bottom: {
          position: new Vector2(node.position.x, node.position.y + 1),
          layer: node.layer
        },
        right: {
          position: new Vector2(node.position.x + 1, node.position.y),
          layer: node.layer
        },
        topRight: {
          position: new Vector2(node.position.x + 1, node.position.y - 1),
          layer: node.layer
        },
        downRight: {
          position: new Vector2(node.position.x + 1, node.position.y + 1),
          layer: node.layer
        }
      };
    } else if (parent.position.x > node.position.x && parent.position.y === node.position.y) {
      return {
        topLeft: {
          position: new Vector2(node.position.x + 1, node.position.y + 1),
          layer: node.layer
        },
        downLeft: {
          position: new Vector2(node.position.x + 1, node.position.y - 1),
          layer: node.layer
        },
        top: {
          position: new Vector2(node.position.x, node.position.y + 1),
          layer: node.layer
        },
        bottom: {
          position: new Vector2(node.position.x, node.position.y - 1),
          layer: node.layer
        },
        right: {
          position: new Vector2(node.position.x - 1, node.position.y),
          layer: node.layer
        },
        topRight: {
          position: new Vector2(node.position.x - 1, node.position.y + 1),
          layer: node.layer
        },
        downRight: {
          position: new Vector2(node.position.x - 1, node.position.y - 1),
          layer: node.layer
        }
      };
    } else if (parent.position.y < node.position.y && parent.position.x === node.position.x) {
      return {
        topLeft: {
          position: new Vector2(node.position.x + 1, node.position.y - 1),
          layer: node.layer
        },
        downLeft: {
          position: new Vector2(node.position.x - 1, node.position.y - 1),
          layer: node.layer
        },
        top: {
          position: new Vector2(node.position.x + 1, node.position.y),
          layer: node.layer
        },
        bottom: {
          position: new Vector2(node.position.x - 1, node.position.y),
          layer: node.layer
        },
        right: {
          position: new Vector2(node.position.x, node.position.y + 1),
          layer: node.layer
        },
        topRight: {
          position: new Vector2(node.position.x + 1, node.position.y + 1),
          layer: node.layer
        },
        downRight: {
          position: new Vector2(node.position.x - 1, node.position.y + 1),
          layer: node.layer
        }
      };
    } else if (parent.position.y > node.position.y && parent.position.x === node.position.x) {
      return {
        topLeft: {
          position: new Vector2(node.position.x - 1, node.position.y + 1),
          layer: node.layer
        },
        downLeft: {
          position: new Vector2(node.position.x + 1, node.position.y + 1),
          layer: node.layer
        },
        top: {
          position: new Vector2(node.position.x - 1, node.position.y),
          layer: node.layer
        },
        bottom: {
          position: new Vector2(node.position.x + 1, node.position.y),
          layer: node.layer
        },
        right: {
          position: new Vector2(node.position.x, node.position.y - 1),
          layer: node.layer
        },
        topRight: {
          position: new Vector2(node.position.x - 1, node.position.y - 1),
          layer: node.layer
        },
        downRight: {
          position: new Vector2(node.position.x + 1, node.position.y - 1),
          layer: node.layer
        }
      };
    } else if (parent.position.y < node.position.y && parent.position.x < node.position.x) {
      return {
        topLeft: {
          position: new Vector2(node.position.x, node.position.y - 1),
          layer: node.layer
        },
        downLeft: {
          position: new Vector2(node.position.x - 1, node.position.y),
          layer: node.layer
        },
        top: {
          position: new Vector2(node.position.x + 1, node.position.y - 1),
          layer: node.layer
        },
        bottom: {
          position: new Vector2(node.position.x - 1, node.position.y + 1),
          layer: node.layer
        },
        right: {
          position: new Vector2(node.position.x + 1, node.position.y + 1),
          layer: node.layer
        },
        topRight: {
          position: new Vector2(node.position.x + 1, node.position.y),
          layer: node.layer
        },
        downRight: {
          position: new Vector2(node.position.x, node.position.y + 1),
          layer: node.layer
        }
      };
    } else if (parent.position.y < node.position.y && parent.position.x > node.position.x) {
      return {
        topLeft: {
          position: new Vector2(node.position.x + 1, node.position.y),
          layer: node.layer
        },
        downLeft: {
          position: new Vector2(node.position.x, node.position.y - 1),
          layer: node.layer
        },
        top: {
          position: new Vector2(node.position.x + 1, node.position.y + 1),
          layer: node.layer
        },
        bottom: {
          position: new Vector2(node.position.x - 1, node.position.y - 1),
          layer: node.layer
        },
        right: {
          position: new Vector2(node.position.x - 1, node.position.y + 1),
          layer: node.layer
        },
        topRight: {
          position: new Vector2(node.position.x, node.position.y + 1),
          layer: node.layer
        },
        downRight: {
          position: new Vector2(node.position.x - 1, node.position.y),
          layer: node.layer
        }
      };
    } else if (parent.position.y > node.position.y && parent.position.x < node.position.x) {
      return {
        topLeft: {
          position: new Vector2(node.position.x - 1, node.position.y),
          layer: node.layer
        },
        downLeft: {
          position: new Vector2(node.position.x, node.position.y + 1),
          layer: node.layer
        },
        top: {
          position: new Vector2(node.position.x - 1, node.position.y - 1),
          layer: node.layer
        },
        bottom: {
          position: new Vector2(node.position.x + 1, node.position.y + 1),
          layer: node.layer
        },
        right: {
          position: new Vector2(node.position.x + 1, node.position.y - 1),
          layer: node.layer
        },
        topRight: {
          position: new Vector2(node.position.x, node.position.y - 1),
          layer: node.layer
        },
        downRight: {
          position: new Vector2(node.position.x + 1, node.position.y),
          layer: node.layer
        }
      };
    } else {
      return {
        topLeft: {
          position: new Vector2(node.position.x, node.position.y + 1),
          layer: node.layer
        },
        downLeft: {
          position: new Vector2(node.position.x + 1, node.position.y),
          layer: node.layer
        },
        top: {
          position: new Vector2(node.position.x - 1, node.position.y + 1),
          layer: node.layer
        },
        bottom: {
          position: new Vector2(node.position.x + 1, node.position.y - 1),
          layer: node.layer
        },
        right: {
          position: new Vector2(node.position.x - 1, node.position.y - 1),
          layer: node.layer
        },
        topRight: {
          position: new Vector2(node.position.x - 1, node.position.y),
          layer: node.layer
        },
        downRight: {
          position: new Vector2(node.position.x, node.position.y - 1),
          layer: node.layer
        }
      };
    }
  }
};
var JumpCache = class {
  constructor() {
    this.memo = /* @__PURE__ */ new Map();
  }
  set(parent, node, val) {
    let pX = this.memo.get(parent.position.x);
    if (!pX) {
      pX = /* @__PURE__ */ new Map();
      this.memo.set(parent.position.x, pX);
    }
    let pY = pX.get(parent.position.y);
    if (!pY) {
      pY = /* @__PURE__ */ new Map();
      pX.set(parent.position.y, pY);
    }
    let pL = pY.get(parent.layer);
    if (!pL) {
      pL = /* @__PURE__ */ new Map();
      pY.set(parent.layer, pL);
    }
    let nX = pL.get(node.position.x);
    if (!nX) {
      nX = /* @__PURE__ */ new Map();
      pL.set(node.position.x, nX);
    }
    let nY = nX.get(node.position.y);
    if (!nY) {
      nY = /* @__PURE__ */ new Map();
      nX.set(node.position.y, nY);
    }
    const nL = nY.get(node.layer);
    if (!nL) {
      if (val === void 0) {
        nY.set(node.layer, null);
      } else {
        nY.set(node.layer, val);
      }
    }
  }
  /**
   * Returns null if no entry was found. undefined is a valid cached result.
   */
  get(parent, node) {
    const pX = this.memo.get(parent.position.x);
    if (!pX) return null;
    const pY = pX.get(parent.position.y);
    if (!pY) return null;
    const pL = pY.get(parent.layer);
    if (!pL) return null;
    const nX = pL.get(node.position.x);
    if (!nX) return null;
    const nY = nX.get(node.position.y);
    if (!nY) return null;
    const nL = nY.get(node.layer);
    if (nL === void 0) {
      return null;
    } else if (nL === null) {
      return void 0;
    }
    return nL;
  }
};

// src/Pathfinding/Pathfinding.ts
var Pathfinding = class {
  constructor(gridTilemap) {
    this.gridTilemap = gridTilemap;
  }
  findShortestPath(source, dest, pathfindingOptions = {}) {
    const shortestPathAlgo = shortestPathAlgorithmFactory(
      pathfindingOptions.shortestPathAlgorithm || "BIDIRECTIONAL_SEARCH",
      this.gridTilemap,
      pathfindingOptions
    );
    return shortestPathAlgo.findShortestPath(source, dest);
  }
};
function shortestPathAlgorithmFactory(type, gridTilemap, options) {
  switch (type) {
    case "BIDIRECTIONAL_SEARCH":
      return new BidirectionalSearch(gridTilemap, options);
    case "A_STAR":
      return new AStar(gridTilemap, options);
    case "JPS":
      if (options.numberOfDirections === 8 /* EIGHT */) {
        return new Jps8(gridTilemap, options);
      }
      return new Jps4(gridTilemap, options);
  }
  return new Bfs(gridTilemap, options);
}

// src/Movement/TargetMovement/TargetMovement.ts
var MoveToResult = /* @__PURE__ */ ((MoveToResult2) => {
  MoveToResult2["SUCCESS"] = "SUCCESS";
  MoveToResult2["NO_PATH_FOUND_MAX_RETRIES_EXCEEDED"] = "NO_PATH_FOUND_MAX_RETRIES_EXCEEDED";
  MoveToResult2["PATH_BLOCKED_MAX_RETRIES_EXCEEDED"] = "PATH_BLOCKED_MAX_RETRIES_EXCEEDED";
  MoveToResult2["PATH_BLOCKED"] = "PATH_BLOCKED";
  MoveToResult2["NO_PATH_FOUND"] = "NO_PATH_FOUND";
  MoveToResult2["PATH_BLOCKED_WAIT_TIMEOUT"] = "PATH_BLOCKED_WAIT_TIMEOUT";
  MoveToResult2["MOVEMENT_TERMINATED"] = "MOVEMENT_TERMINATED";
  MoveToResult2["MAX_PATH_LENGTH_REACHED"] = "MAX_PATH_LENGTH_REACHED";
  return MoveToResult2;
})(MoveToResult || {});
var TargetMovement = class {
  constructor(character, tilemap, targetPos, { config, ignoreBlockedTarget = false, distance = 0 } = {}) {
    this.character = character;
    this.tilemap = tilemap;
    this.targetPos = targetPos;
    this.shortestPath = [];
    this.distOffset = 0;
    this.posOnPath = 0;
    this.stopped = false;
    this.pathBlockedWaitElapsed = 0;
    this.isPositionAllowed = () => true;
    this.shortestPathAlgorithm = "BIDIRECTIONAL_SEARCH";
    this.maxPathLength = Infinity;
    this.considerCosts = false;
    this.ignoredChars = [];
    this.isBlocking = (pos, charLayer) => {
      if (!pos) return true;
      const bfs = new Bfs(this.tilemap, this.getPathfindingOptions());
      return bfs.isBlocking(this.character.getTilePos(), {
        position: pos,
        layer: charLayer
      });
    };
    this.shortestPathAlgorithm = config?.algorithm ?? this.shortestPathAlgorithm;
    this.ignoreBlockedTarget = ignoreBlockedTarget;
    this.distance = distance;
    this.noPathFoundStrategy = config?.noPathFoundStrategy || "STOP" /* STOP */;
    this.pathBlockedStrategy = config?.pathBlockedStrategy || "WAIT" /* WAIT */;
    this.noPathFoundRetryable = new Retryable(
      config?.noPathFoundRetryBackoffMs || 200,
      config?.noPathFoundMaxRetries || -1,
      () => {
        this.stop("NO_PATH_FOUND_MAX_RETRIES_EXCEEDED" /* NO_PATH_FOUND_MAX_RETRIES_EXCEEDED */);
      }
    );
    this.pathBlockedRetryable = new Retryable(
      config?.pathBlockedRetryBackoffMs || 200,
      config?.pathBlockedMaxRetries || -1,
      () => {
        this.stop("PATH_BLOCKED_MAX_RETRIES_EXCEEDED" /* PATH_BLOCKED_MAX_RETRIES_EXCEEDED */);
      }
    );
    if (config?.isPositionAllowedFn) {
      this.isPositionAllowed = config.isPositionAllowedFn;
    }
    if (config?.maxPathLength) {
      this.maxPathLength = config.maxPathLength;
    }
    this.alternativeTargets = config?.alternativeTargets;
    this.noPathFoundAlternativeTargetsFallbackStrategy = config?.noPathFoundAlternativeTargetsFallbackStrategy;
    if (config?.considerCosts && this.shortestPathAlgorithm !== "A_STAR") {
      console.warn(
        `GridEngine: Pathfinding option 'considerCosts' cannot be used with algorithm '${this.shortestPathAlgorithm}'. It can only be used with A* algorithm.`
      );
    }
    if (this.shortestPathAlgorithm === "JPS" && (this.character.getTileWidth() > 1 || this.character.getTileHeight() > 1)) {
      console.warn(
        `GridEngine: Pathfinding algorithm 'JPS' can only be used for characters with 'tileWidth' and 'tileHeight' of 1`
      );
    }
    this.considerCosts = config?.considerCosts || false;
    this.ignoreLayers = !!config?.ignoreLayers;
    this.distanceUtils = DistanceUtilsFactory.create(
      character.getNumberOfDirections()
    );
    this.pathBlockedWaitTimeoutMs = config?.pathBlockedWaitTimeoutMs || -1;
    this.ignoredChars = config?.ignoredChars ?? [];
    this.finished$ = new import_rxjs7.Subject();
    this.setCharacter(character);
  }
  setPathBlockedStrategy(pathBlockedStrategy) {
    this.pathBlockedStrategy = pathBlockedStrategy;
  }
  getPathBlockedStrategy() {
    return this.pathBlockedStrategy;
  }
  setCharacter(character) {
    this.character = character;
    this.noPathFoundRetryable.reset();
    this.pathBlockedRetryable.reset();
    this.pathBlockedWaitElapsed = 0;
    this.calcShortestPath();
    this.character.autoMovementSet().pipe(
      (0, import_rxjs7.filter)((movement) => movement !== this),
      (0, import_rxjs7.take)(1)
    ).subscribe(() => {
      this.stop("MOVEMENT_TERMINATED" /* MOVEMENT_TERMINATED */);
    });
  }
  getPathfindingOptions() {
    return {
      shortestPathAlgorithm: this.shortestPathAlgorithm,
      pathWidth: this.character.getTileWidth(),
      pathHeight: this.character.getTileHeight(),
      numberOfDirections: this.character.getNumberOfDirections(),
      isPositionAllowed: this.isPositionAllowed,
      collisionGroups: this.character.getCollisionGroups(),
      ignoredChars: [this.character.getId(), ...this.ignoredChars],
      ignoreTiles: !this.character.collidesWithTiles(),
      ignoreMapBounds: this.character.getIgnoreMissingTiles(),
      ignoreBlockedTarget: this.ignoreBlockedTarget,
      maxPathLength: this.maxPathLength,
      ignoreLayers: this.ignoreLayers,
      considerCosts: this.considerCosts,
      calculateClosestToTarget: true
    };
  }
  update(delta) {
    if (this.stopped) return;
    if (this.noPathFound()) {
      if (this.noPathFoundStrategy === "RETRY" /* RETRY */) {
        this.noPathFoundRetryable.retry(delta, () => this.calcShortestPath());
      } else if (this.noPathFoundStrategy === "STOP" /* STOP */) {
        this.stop("NO_PATH_FOUND" /* NO_PATH_FOUND */);
      }
    }
    this.updatePosOnPath();
    if (this.isBlocking(
      this.nextTileOnPath()?.position,
      this.character?.getNextTilePos().layer
    )) {
      this.applyPathBlockedStrategy(delta);
    } else {
      this.pathBlockedWaitElapsed = 0;
    }
    if (this.hasArrived()) {
      this.stop("SUCCESS" /* SUCCESS */);
      if (this.existsDistToTarget()) {
        this.turnTowardsTarget();
      }
    } else if (!this.isBlocking(
      this.nextTileOnPath()?.position,
      this.character?.getNextTilePos().layer
    )) {
      this.moveCharOnPath();
    }
  }
  finishedObs() {
    return this.finished$;
  }
  getInfo() {
    return {
      type: "Target",
      state: {
        pathAhead: this.shortestPath.slice(this.posOnPath).map((pos) => LayerPositionUtils.fromInternal(pos))
      },
      config: {
        algorithm: this.shortestPathAlgorithm,
        ignoreBlockedTarget: this.ignoreBlockedTarget,
        distance: this.distance,
        targetPos: LayerPositionUtils.fromInternal(this.targetPos),
        noPathFoundStrategy: this.noPathFoundStrategy,
        pathBlockedStrategy: this.pathBlockedStrategy,
        noPathFoundRetryBackoffMs: this.noPathFoundRetryable.getBackoffMs(),
        noPathFoundMaxRetries: this.noPathFoundRetryable.getMaxRetries()
      }
    };
  }
  resultToReason(result) {
    switch (result) {
      case "SUCCESS" /* SUCCESS */:
        return "Successfully arrived.";
      case "MOVEMENT_TERMINATED" /* MOVEMENT_TERMINATED */:
        return "Movement of character has been replaced before destination was reached.";
      case "PATH_BLOCKED" /* PATH_BLOCKED */:
        return "PathBlockedStrategy STOP: Path blocked.";
      case "NO_PATH_FOUND_MAX_RETRIES_EXCEEDED" /* NO_PATH_FOUND_MAX_RETRIES_EXCEEDED */:
        return `NoPathFoundStrategy RETRY: Maximum retries of ${this.noPathFoundRetryable.getMaxRetries()} exceeded.`;
      case "NO_PATH_FOUND" /* NO_PATH_FOUND */:
        return "NoPathFoundStrategy STOP: No path found.";
      case "PATH_BLOCKED_MAX_RETRIES_EXCEEDED" /* PATH_BLOCKED_MAX_RETRIES_EXCEEDED */:
        return `PathBlockedStrategy RETRY: Maximum retries of ${this.pathBlockedRetryable.getMaxRetries()} exceeded.`;
      case "PATH_BLOCKED_WAIT_TIMEOUT" /* PATH_BLOCKED_WAIT_TIMEOUT */:
        return `PathBlockedStrategy WAIT: Wait timeout of ${this.pathBlockedWaitTimeoutMs}ms exceeded.`;
    }
  }
  applyPathBlockedStrategy(delta) {
    if (this.pathBlockedStrategy === "RETRY" /* RETRY */) {
      this.pathBlockedRetryable.retry(delta, () => {
        const shortestPath = this.getShortestPath();
        if (shortestPath.path.length > 0) {
          this.calcShortestPath(shortestPath);
        }
      });
    } else if (this.pathBlockedStrategy === "STOP" /* STOP */) {
      this.stop("PATH_BLOCKED" /* PATH_BLOCKED */);
    } else if (this.pathBlockedStrategy === "WAIT" /* WAIT */) {
      if (this.pathBlockedWaitTimeoutMs > -1) {
        this.pathBlockedWaitElapsed += delta;
        if (this.pathBlockedWaitElapsed >= this.pathBlockedWaitTimeoutMs) {
          this.stop("PATH_BLOCKED_WAIT_TIMEOUT" /* PATH_BLOCKED_WAIT_TIMEOUT */);
        }
      }
    }
  }
  moveCharOnPath() {
    const nextTilePosOnPath = this.nextTileOnPath();
    if (!nextTilePosOnPath) return;
    const dir = this.getDir(
      this.character.getNextTilePos().position,
      nextTilePosOnPath.position
    );
    this.character.move(dir);
  }
  nextTileOnPath() {
    return this.shortestPath[this.posOnPath + 1];
  }
  stop(result) {
    this.finished$.next({
      position: this.character.getTilePos().position,
      result,
      description: this.resultToReason(result),
      layer: this.character.getTilePos().layer
    });
    this.finished$.complete();
    this.stopped = true;
  }
  turnTowardsTarget() {
    const nextTile = this.shortestPath[this.posOnPath + 1];
    const dir = this.getDir(
      this.character.getNextTilePos().position,
      nextTile.position
    );
    this.character.turnTowards(dir);
  }
  existsDistToTarget() {
    return this.posOnPath < this.shortestPath.length - 1;
  }
  hasArrived() {
    return !this.noPathFound() && this.posOnPath + Math.max(0, this.distance - this.distOffset) >= this.shortestPath.length - 1;
  }
  updatePosOnPath() {
    let currentTile = this.shortestPath[this.posOnPath];
    while (this.posOnPath < this.shortestPath.length - 1 && (this.character.getNextTilePos().position.x != currentTile.position.x || this.character.getNextTilePos().position.y != currentTile.position.y)) {
      this.posOnPath++;
      currentTile = this.shortestPath[this.posOnPath];
    }
  }
  noPathFound() {
    return this.shortestPath.length === 0;
  }
  calcShortestPath(shortestPath) {
    shortestPath = shortestPath ?? this.getShortestPath();
    this.posOnPath = 0;
    this.shortestPath = shortestPath.path;
    this.distOffset = shortestPath.distOffset;
  }
  getShortestPath() {
    const pathfinding = new Pathfinding(this.tilemap);
    const { path, closestToTarget } = pathfinding.findShortestPath(
      this.character.getNextTilePos(),
      this.targetPos,
      this.getPathfindingOptions()
    );
    const noPathFound = path.length == 0;
    if (noPathFound) {
      if (this.noPathFoundStrategy === "CLOSEST_REACHABLE" /* CLOSEST_REACHABLE */) {
        if (!closestToTarget) {
          throw Error(
            "ClosestToTarget should never be undefined in TargetMovement."
          );
        }
        return this.pathToAlternativeTarget(closestToTarget, pathfinding);
      } else if (this.noPathFoundStrategy === "ALTERNATIVE_TARGETS" /* ALTERNATIVE_TARGETS */) {
        for (const altTarget of this.alternativeTargets ?? []) {
          const { path: path2, distOffset } = this.pathToAlternativeTarget(
            LayerPositionUtils.toInternal(altTarget),
            pathfinding
          );
          if (path2.length > 0) return { path: path2, distOffset };
        }
        this.noPathFoundStrategy = this.noPathFoundAlternativeTargetsFallbackStrategy || "STOP" /* STOP */;
        return this.getShortestPath();
      }
    }
    return { path, distOffset: 0 };
  }
  pathToAlternativeTarget(target, pathfinding) {
    const path = pathfinding.findShortestPath(
      this.character.getNextTilePos(),
      target,
      this.getPathfindingOptions()
    ).path;
    const distOffset = this.distanceUtils.distance(
      target.position,
      this.targetPos.position
    );
    return { path, distOffset };
  }
  getDir(from, to) {
    return this.tilemap.fromMapDirection(
      this.distanceUtils.direction(from, to)
    );
  }
};

// node_modules/tiled-property-flattener/dist/tiled_property_flattener.min.js
var y_ = Object.create;
var yo = Object.defineProperty;
var m_ = Object.getOwnPropertyDescriptor;
var w_ = Object.getOwnPropertyNames;
var x_ = Object.getPrototypeOf;
var A_ = Object.prototype.hasOwnProperty;
var T_ = (o, v) => () => (v || o((v = { exports: {} }).exports, v), v.exports);
var R_ = (o, v, w, I) => {
  if (v && typeof v == "object" || typeof v == "function") for (let E of w_(v)) !A_.call(o, E) && E !== w && yo(o, E, { get: () => v[E], enumerable: !(I = m_(v, E)) || I.enumerable });
  return o;
};
var Li = (o, v, w) => (w = o != null ? y_(x_(o)) : {}, R_(v || !o || !o.__esModule ? yo(w, "default", { value: o, enumerable: true }) : w, o));
var or = T_((Ne, ct) => {
  (function() {
    var o, v = "4.17.21", w = 200, I = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", E = "Expected a function", W = "Invalid `variable` option passed into `_.template`", Y = "__lodash_hash_undefined__", Dn = 500, ht = "__lodash_placeholder__", Xn = 1, Wi = 2, we = 4, xe = 1, pt = 2, _n = 1, ae = 2, Di = 4, Mn = 8, Ae = 16, Cn = 32, Te = 64, Un = 128, qe = 256, cr = 512, To = 30, Ro = "...", Io = 800, Po = 16, Ui = 1, Eo = 2, Oo = 3, le = 1 / 0, Qn = 9007199254740991, So = 17976931348623157e292, gt = 0 / 0, bn = 4294967295, Mo = bn - 1, Co = bn >>> 1, bo = [["ary", Un], ["bind", _n], ["bindKey", ae], ["curry", Mn], ["curryRight", Ae], ["flip", cr], ["partial", Cn], ["partialRight", Te], ["rearg", qe]], Re = "[object Arguments]", _t = "[object Array]", Lo = "[object AsyncFunction]", $e = "[object Boolean]", Ke = "[object Date]", Bo = "[object DOMException]", dt = "[object Error]", vt = "[object Function]", Ni = "[object GeneratorFunction]", Rn = "[object Map]", ze = "[object Number]", Fo = "[object Null]", Nn = "[object Object]", Gi = "[object Promise]", Wo = "[object Proxy]", Ze = "[object RegExp]", In = "[object Set]", Ye = "[object String]", yt = "[object Symbol]", Do = "[object Undefined]", Je = "[object WeakMap]", Uo = "[object WeakSet]", Xe = "[object ArrayBuffer]", Ie = "[object DataView]", hr = "[object Float32Array]", pr = "[object Float64Array]", gr = "[object Int8Array]", _r = "[object Int16Array]", dr = "[object Int32Array]", vr = "[object Uint8Array]", yr = "[object Uint8ClampedArray]", mr = "[object Uint16Array]", wr = "[object Uint32Array]", No = /\b__p \+= '';/g, Go = /\b(__p \+=) '' \+/g, Ho = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Hi = /&(?:amp|lt|gt|quot|#39);/g, qi = /[&<>"']/g, qo = RegExp(Hi.source), $o = RegExp(qi.source), Ko = /<%-([\s\S]+?)%>/g, zo = /<%([\s\S]+?)%>/g, $i = /<%=([\s\S]+?)%>/g, Zo = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Yo = /^\w*$/, Jo = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, xr = /[\\^$.*+?()[\]{}|]/g, Xo = RegExp(xr.source), Ar = /^\s+/, Qo = /\s/, Vo = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, ko = /\{\n\/\* \[wrapped with (.+)\] \*/, jo = /,? & /, ns = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, es = /[()=,{}\[\]\/\s]/, ts = /\\(\\)?/g, rs = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Ki = /\w*$/, is = /^[-+]0x[0-9a-f]+$/i, us = /^0b[01]+$/i, fs = /^\[object .+?Constructor\]$/, os = /^0o[0-7]+$/i, ss = /^(?:0|[1-9]\d*)$/, as = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, mt = /($^)/, ls = /['\n\r\u2028\u2029\\]/g, wt = "\\ud800-\\udfff", cs = "\\u0300-\\u036f", hs = "\\ufe20-\\ufe2f", ps = "\\u20d0-\\u20ff", zi = cs + hs + ps, Zi = "\\u2700-\\u27bf", Yi = "a-z\\xdf-\\xf6\\xf8-\\xff", gs = "\\xac\\xb1\\xd7\\xf7", _s = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", ds = "\\u2000-\\u206f", vs = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Ji = "A-Z\\xc0-\\xd6\\xd8-\\xde", Xi = "\\ufe0e\\ufe0f", Qi = gs + _s + ds + vs, Tr = "['\u2019]", ys = "[" + wt + "]", Vi = "[" + Qi + "]", xt = "[" + zi + "]", ki = "\\d+", ms = "[" + Zi + "]", ji = "[" + Yi + "]", nu = "[^" + wt + Qi + ki + Zi + Yi + Ji + "]", Rr = "\\ud83c[\\udffb-\\udfff]", ws = "(?:" + xt + "|" + Rr + ")", eu = "[^" + wt + "]", Ir = "(?:\\ud83c[\\udde6-\\uddff]){2}", Pr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Pe = "[" + Ji + "]", tu = "\\u200d", ru = "(?:" + ji + "|" + nu + ")", xs = "(?:" + Pe + "|" + nu + ")", iu = "(?:" + Tr + "(?:d|ll|m|re|s|t|ve))?", uu = "(?:" + Tr + "(?:D|LL|M|RE|S|T|VE))?", fu = ws + "?", ou = "[" + Xi + "]?", As = "(?:" + tu + "(?:" + [eu, Ir, Pr].join("|") + ")" + ou + fu + ")*", Ts = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Rs = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", su = ou + fu + As, Is = "(?:" + [ms, Ir, Pr].join("|") + ")" + su, Ps = "(?:" + [eu + xt + "?", xt, Ir, Pr, ys].join("|") + ")", Es = RegExp(Tr, "g"), Os = RegExp(xt, "g"), Er = RegExp(Rr + "(?=" + Rr + ")|" + Ps + su, "g"), Ss = RegExp([Pe + "?" + ji + "+" + iu + "(?=" + [Vi, Pe, "$"].join("|") + ")", xs + "+" + uu + "(?=" + [Vi, Pe + ru, "$"].join("|") + ")", Pe + "?" + ru + "+" + iu, Pe + "+" + uu, Rs, Ts, ki, Is].join("|"), "g"), Ms = RegExp("[" + tu + wt + zi + Xi + "]"), Cs = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, bs = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], Ls = -1, H = {};
    H[hr] = H[pr] = H[gr] = H[_r] = H[dr] = H[vr] = H[yr] = H[mr] = H[wr] = true, H[Re] = H[_t] = H[Xe] = H[$e] = H[Ie] = H[Ke] = H[dt] = H[vt] = H[Rn] = H[ze] = H[Nn] = H[Ze] = H[In] = H[Ye] = H[Je] = false;
    var G = {};
    G[Re] = G[_t] = G[Xe] = G[Ie] = G[$e] = G[Ke] = G[hr] = G[pr] = G[gr] = G[_r] = G[dr] = G[Rn] = G[ze] = G[Nn] = G[Ze] = G[In] = G[Ye] = G[yt] = G[vr] = G[yr] = G[mr] = G[wr] = true, G[dt] = G[vt] = G[Je] = false;
    var Bs = { \u00C0: "A", \u00C1: "A", \u00C2: "A", \u00C3: "A", \u00C4: "A", \u00C5: "A", \u00E0: "a", \u00E1: "a", \u00E2: "a", \u00E3: "a", \u00E4: "a", \u00E5: "a", \u00C7: "C", \u00E7: "c", \u00D0: "D", \u00F0: "d", \u00C8: "E", \u00C9: "E", \u00CA: "E", \u00CB: "E", \u00E8: "e", \u00E9: "e", \u00EA: "e", \u00EB: "e", \u00CC: "I", \u00CD: "I", \u00CE: "I", \u00CF: "I", \u00EC: "i", \u00ED: "i", \u00EE: "i", \u00EF: "i", \u00D1: "N", \u00F1: "n", \u00D2: "O", \u00D3: "O", \u00D4: "O", \u00D5: "O", \u00D6: "O", \u00D8: "O", \u00F2: "o", \u00F3: "o", \u00F4: "o", \u00F5: "o", \u00F6: "o", \u00F8: "o", \u00D9: "U", \u00DA: "U", \u00DB: "U", \u00DC: "U", \u00F9: "u", \u00FA: "u", \u00FB: "u", \u00FC: "u", \u00DD: "Y", \u00FD: "y", \u00FF: "y", \u00C6: "Ae", \u00E6: "ae", \u00DE: "Th", \u00FE: "th", \u00DF: "ss", \u0100: "A", \u0102: "A", \u0104: "A", \u0101: "a", \u0103: "a", \u0105: "a", \u0106: "C", \u0108: "C", \u010A: "C", \u010C: "C", \u0107: "c", \u0109: "c", \u010B: "c", \u010D: "c", \u010E: "D", \u0110: "D", \u010F: "d", \u0111: "d", \u0112: "E", \u0114: "E", \u0116: "E", \u0118: "E", \u011A: "E", \u0113: "e", \u0115: "e", \u0117: "e", \u0119: "e", \u011B: "e", \u011C: "G", \u011E: "G", \u0120: "G", \u0122: "G", \u011D: "g", \u011F: "g", \u0121: "g", \u0123: "g", \u0124: "H", \u0126: "H", \u0125: "h", \u0127: "h", \u0128: "I", \u012A: "I", \u012C: "I", \u012E: "I", \u0130: "I", \u0129: "i", \u012B: "i", \u012D: "i", \u012F: "i", \u0131: "i", \u0134: "J", \u0135: "j", \u0136: "K", \u0137: "k", \u0138: "k", \u0139: "L", \u013B: "L", \u013D: "L", \u013F: "L", \u0141: "L", \u013A: "l", \u013C: "l", \u013E: "l", \u0140: "l", \u0142: "l", \u0143: "N", \u0145: "N", \u0147: "N", \u014A: "N", \u0144: "n", \u0146: "n", \u0148: "n", \u014B: "n", \u014C: "O", \u014E: "O", \u0150: "O", \u014D: "o", \u014F: "o", \u0151: "o", \u0154: "R", \u0156: "R", \u0158: "R", \u0155: "r", \u0157: "r", \u0159: "r", \u015A: "S", \u015C: "S", \u015E: "S", \u0160: "S", \u015B: "s", \u015D: "s", \u015F: "s", \u0161: "s", \u0162: "T", \u0164: "T", \u0166: "T", \u0163: "t", \u0165: "t", \u0167: "t", \u0168: "U", \u016A: "U", \u016C: "U", \u016E: "U", \u0170: "U", \u0172: "U", \u0169: "u", \u016B: "u", \u016D: "u", \u016F: "u", \u0171: "u", \u0173: "u", \u0174: "W", \u0175: "w", \u0176: "Y", \u0177: "y", \u0178: "Y", \u0179: "Z", \u017B: "Z", \u017D: "Z", \u017A: "z", \u017C: "z", \u017E: "z", \u0132: "IJ", \u0133: "ij", \u0152: "Oe", \u0153: "oe", \u0149: "'n", \u017F: "s" }, Fs = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Ws = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }, Ds = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" }, Us = parseFloat, Ns = parseInt, au = typeof global == "object" && global && global.Object === Object && global, Gs = typeof self == "object" && self && self.Object === Object && self, Q = au || Gs || Function("return this")(), Or = typeof Ne == "object" && Ne && !Ne.nodeType && Ne, ce = Or && typeof ct == "object" && ct && !ct.nodeType && ct, lu = ce && ce.exports === Or, Sr = lu && au.process, dn = function() {
      try {
        var l = ce && ce.require && ce.require("util").types;
        return l || Sr && Sr.binding && Sr.binding("util");
      } catch {
      }
    }(), cu = dn && dn.isArrayBuffer, hu = dn && dn.isDate, pu = dn && dn.isMap, gu = dn && dn.isRegExp, _u = dn && dn.isSet, du = dn && dn.isTypedArray;
    function an(l, p, h) {
      switch (h.length) {
        case 0:
          return l.call(p);
        case 1:
          return l.call(p, h[0]);
        case 2:
          return l.call(p, h[0], h[1]);
        case 3:
          return l.call(p, h[0], h[1], h[2]);
      }
      return l.apply(p, h);
    }
    function Hs(l, p, h, m) {
      for (var P = -1, F = l == null ? 0 : l.length; ++P < F; ) {
        var J = l[P];
        p(m, J, h(J), l);
      }
      return m;
    }
    function vn(l, p) {
      for (var h = -1, m = l == null ? 0 : l.length; ++h < m && p(l[h], h, l) !== false; ) ;
      return l;
    }
    function qs(l, p) {
      for (var h = l == null ? 0 : l.length; h-- && p(l[h], h, l) !== false; ) ;
      return l;
    }
    function vu(l, p) {
      for (var h = -1, m = l == null ? 0 : l.length; ++h < m; ) if (!p(l[h], h, l)) return false;
      return true;
    }
    function Vn(l, p) {
      for (var h = -1, m = l == null ? 0 : l.length, P = 0, F = []; ++h < m; ) {
        var J = l[h];
        p(J, h, l) && (F[P++] = J);
      }
      return F;
    }
    function At(l, p) {
      var h = l == null ? 0 : l.length;
      return !!h && Ee(l, p, 0) > -1;
    }
    function Mr(l, p, h) {
      for (var m = -1, P = l == null ? 0 : l.length; ++m < P; ) if (h(p, l[m])) return true;
      return false;
    }
    function q(l, p) {
      for (var h = -1, m = l == null ? 0 : l.length, P = Array(m); ++h < m; ) P[h] = p(l[h], h, l);
      return P;
    }
    function kn(l, p) {
      for (var h = -1, m = p.length, P = l.length; ++h < m; ) l[P + h] = p[h];
      return l;
    }
    function Cr(l, p, h, m) {
      var P = -1, F = l == null ? 0 : l.length;
      for (m && F && (h = l[++P]); ++P < F; ) h = p(h, l[P], P, l);
      return h;
    }
    function $s(l, p, h, m) {
      var P = l == null ? 0 : l.length;
      for (m && P && (h = l[--P]); P--; ) h = p(h, l[P], P, l);
      return h;
    }
    function br(l, p) {
      for (var h = -1, m = l == null ? 0 : l.length; ++h < m; ) if (p(l[h], h, l)) return true;
      return false;
    }
    var Ks = Lr("length");
    function zs(l) {
      return l.split("");
    }
    function Zs(l) {
      return l.match(ns) || [];
    }
    function yu(l, p, h) {
      var m;
      return h(l, function(P, F, J) {
        if (p(P, F, J)) return m = F, false;
      }), m;
    }
    function Tt(l, p, h, m) {
      for (var P = l.length, F = h + (m ? 1 : -1); m ? F-- : ++F < P; ) if (p(l[F], F, l)) return F;
      return -1;
    }
    function Ee(l, p, h) {
      return p === p ? ia(l, p, h) : Tt(l, mu, h);
    }
    function Ys(l, p, h, m) {
      for (var P = h - 1, F = l.length; ++P < F; ) if (m(l[P], p)) return P;
      return -1;
    }
    function mu(l) {
      return l !== l;
    }
    function wu(l, p) {
      var h = l == null ? 0 : l.length;
      return h ? Fr(l, p) / h : gt;
    }
    function Lr(l) {
      return function(p) {
        return p == null ? o : p[l];
      };
    }
    function Br(l) {
      return function(p) {
        return l == null ? o : l[p];
      };
    }
    function xu(l, p, h, m, P) {
      return P(l, function(F, J, N) {
        h = m ? (m = false, F) : p(h, F, J, N);
      }), h;
    }
    function Js(l, p) {
      var h = l.length;
      for (l.sort(p); h--; ) l[h] = l[h].value;
      return l;
    }
    function Fr(l, p) {
      for (var h, m = -1, P = l.length; ++m < P; ) {
        var F = p(l[m]);
        F !== o && (h = h === o ? F : h + F);
      }
      return h;
    }
    function Wr(l, p) {
      for (var h = -1, m = Array(l); ++h < l; ) m[h] = p(h);
      return m;
    }
    function Xs(l, p) {
      return q(p, function(h) {
        return [h, l[h]];
      });
    }
    function Au(l) {
      return l && l.slice(0, Pu(l) + 1).replace(Ar, "");
    }
    function ln(l) {
      return function(p) {
        return l(p);
      };
    }
    function Dr(l, p) {
      return q(p, function(h) {
        return l[h];
      });
    }
    function Qe(l, p) {
      return l.has(p);
    }
    function Tu(l, p) {
      for (var h = -1, m = l.length; ++h < m && Ee(p, l[h], 0) > -1; ) ;
      return h;
    }
    function Ru(l, p) {
      for (var h = l.length; h-- && Ee(p, l[h], 0) > -1; ) ;
      return h;
    }
    function Qs(l, p) {
      for (var h = l.length, m = 0; h--; ) l[h] === p && ++m;
      return m;
    }
    var Vs = Br(Bs), ks = Br(Fs);
    function js(l) {
      return "\\" + Ds[l];
    }
    function na(l, p) {
      return l == null ? o : l[p];
    }
    function Oe(l) {
      return Ms.test(l);
    }
    function ea(l) {
      return Cs.test(l);
    }
    function ta(l) {
      for (var p, h = []; !(p = l.next()).done; ) h.push(p.value);
      return h;
    }
    function Ur(l) {
      var p = -1, h = Array(l.size);
      return l.forEach(function(m, P) {
        h[++p] = [P, m];
      }), h;
    }
    function Iu(l, p) {
      return function(h) {
        return l(p(h));
      };
    }
    function jn(l, p) {
      for (var h = -1, m = l.length, P = 0, F = []; ++h < m; ) {
        var J = l[h];
        (J === p || J === ht) && (l[h] = ht, F[P++] = h);
      }
      return F;
    }
    function Rt(l) {
      var p = -1, h = Array(l.size);
      return l.forEach(function(m) {
        h[++p] = m;
      }), h;
    }
    function ra(l) {
      var p = -1, h = Array(l.size);
      return l.forEach(function(m) {
        h[++p] = [m, m];
      }), h;
    }
    function ia(l, p, h) {
      for (var m = h - 1, P = l.length; ++m < P; ) if (l[m] === p) return m;
      return -1;
    }
    function ua(l, p, h) {
      for (var m = h + 1; m--; ) if (l[m] === p) return m;
      return m;
    }
    function Se(l) {
      return Oe(l) ? oa(l) : Ks(l);
    }
    function Pn(l) {
      return Oe(l) ? sa(l) : zs(l);
    }
    function Pu(l) {
      for (var p = l.length; p-- && Qo.test(l.charAt(p)); ) ;
      return p;
    }
    var fa = Br(Ws);
    function oa(l) {
      for (var p = Er.lastIndex = 0; Er.test(l); ) ++p;
      return p;
    }
    function sa(l) {
      return l.match(Er) || [];
    }
    function aa(l) {
      return l.match(Ss) || [];
    }
    var la = function l(p) {
      p = p == null ? Q : ne.defaults(Q.Object(), p, ne.pick(Q, bs));
      var h = p.Array, m = p.Date, P = p.Error, F = p.Function, J = p.Math, N = p.Object, Nr = p.RegExp, ca = p.String, yn = p.TypeError, It = h.prototype, ha = F.prototype, Me = N.prototype, Pt = p["__core-js_shared__"], Et = ha.toString, U = Me.hasOwnProperty, pa = 0, Eu = function() {
        var n = /[^.]+$/.exec(Pt && Pt.keys && Pt.keys.IE_PROTO || "");
        return n ? "Symbol(src)_1." + n : "";
      }(), Ot = Me.toString, ga = Et.call(N), _a = Q._, da = Nr("^" + Et.call(U).replace(xr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), St = lu ? p.Buffer : o, ee = p.Symbol, Mt = p.Uint8Array, Ou = St ? St.allocUnsafe : o, Ct = Iu(N.getPrototypeOf, N), Su = N.create, Mu = Me.propertyIsEnumerable, bt = It.splice, Cu = ee ? ee.isConcatSpreadable : o, Ve = ee ? ee.iterator : o, he = ee ? ee.toStringTag : o, Lt = function() {
        try {
          var n = ve(N, "defineProperty");
          return n({}, "", {}), n;
        } catch {
        }
      }(), va = p.clearTimeout !== Q.clearTimeout && p.clearTimeout, ya = m && m.now !== Q.Date.now && m.now, ma = p.setTimeout !== Q.setTimeout && p.setTimeout, Bt = J.ceil, Ft = J.floor, Gr = N.getOwnPropertySymbols, wa = St ? St.isBuffer : o, bu = p.isFinite, xa = It.join, Aa = Iu(N.keys, N), X = J.max, j = J.min, Ta = m.now, Ra = p.parseInt, Lu = J.random, Ia = It.reverse, Hr = ve(p, "DataView"), ke = ve(p, "Map"), qr = ve(p, "Promise"), Ce = ve(p, "Set"), je = ve(p, "WeakMap"), nt = ve(N, "create"), Wt = je && new je(), be = {}, Pa = ye(Hr), Ea = ye(ke), Oa = ye(qr), Sa = ye(Ce), Ma = ye(je), Dt = ee ? ee.prototype : o, et = Dt ? Dt.valueOf : o, Bu = Dt ? Dt.toString : o;
      function u(n) {
        if (K(n) && !O(n) && !(n instanceof L)) {
          if (n instanceof mn) return n;
          if (U.call(n, "__wrapped__")) return Wf(n);
        }
        return new mn(n);
      }
      var Le = /* @__PURE__ */ function() {
        function n() {
        }
        return function(e) {
          if (!$(e)) return {};
          if (Su) return Su(e);
          n.prototype = e;
          var t = new n();
          return n.prototype = o, t;
        };
      }();
      function Ut() {
      }
      function mn(n, e) {
        this.__wrapped__ = n, this.__actions__ = [], this.__chain__ = !!e, this.__index__ = 0, this.__values__ = o;
      }
      u.templateSettings = { escape: Ko, evaluate: zo, interpolate: $i, variable: "", imports: { _: u } }, u.prototype = Ut.prototype, u.prototype.constructor = u, mn.prototype = Le(Ut.prototype), mn.prototype.constructor = mn;
      function L(n) {
        this.__wrapped__ = n, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = bn, this.__views__ = [];
      }
      function Ca() {
        var n = new L(this.__wrapped__);
        return n.__actions__ = un(this.__actions__), n.__dir__ = this.__dir__, n.__filtered__ = this.__filtered__, n.__iteratees__ = un(this.__iteratees__), n.__takeCount__ = this.__takeCount__, n.__views__ = un(this.__views__), n;
      }
      function ba() {
        if (this.__filtered__) {
          var n = new L(this);
          n.__dir__ = -1, n.__filtered__ = true;
        } else n = this.clone(), n.__dir__ *= -1;
        return n;
      }
      function La() {
        var n = this.__wrapped__.value(), e = this.__dir__, t = O(n), r = e < 0, i = t ? n.length : 0, f = zl(0, i, this.__views__), s = f.start, a = f.end, c = a - s, g = r ? a : s - 1, _ = this.__iteratees__, d = _.length, y = 0, x = j(c, this.__takeCount__);
        if (!t || !r && i == c && x == c) return uf(n, this.__actions__);
        var T = [];
        n: for (; c-- && y < x; ) {
          g += e;
          for (var M = -1, R = n[g]; ++M < d; ) {
            var b = _[M], B = b.iteratee, pn = b.type, rn = B(R);
            if (pn == Eo) R = rn;
            else if (!rn) {
              if (pn == Ui) continue n;
              break n;
            }
          }
          T[y++] = R;
        }
        return T;
      }
      L.prototype = Le(Ut.prototype), L.prototype.constructor = L;
      function pe(n) {
        var e = -1, t = n == null ? 0 : n.length;
        for (this.clear(); ++e < t; ) {
          var r = n[e];
          this.set(r[0], r[1]);
        }
      }
      function Ba() {
        this.__data__ = nt ? nt(null) : {}, this.size = 0;
      }
      function Fa(n) {
        var e = this.has(n) && delete this.__data__[n];
        return this.size -= e ? 1 : 0, e;
      }
      function Wa(n) {
        var e = this.__data__;
        if (nt) {
          var t = e[n];
          return t === Y ? o : t;
        }
        return U.call(e, n) ? e[n] : o;
      }
      function Da(n) {
        var e = this.__data__;
        return nt ? e[n] !== o : U.call(e, n);
      }
      function Ua(n, e) {
        var t = this.__data__;
        return this.size += this.has(n) ? 0 : 1, t[n] = nt && e === o ? Y : e, this;
      }
      pe.prototype.clear = Ba, pe.prototype.delete = Fa, pe.prototype.get = Wa, pe.prototype.has = Da, pe.prototype.set = Ua;
      function Gn(n) {
        var e = -1, t = n == null ? 0 : n.length;
        for (this.clear(); ++e < t; ) {
          var r = n[e];
          this.set(r[0], r[1]);
        }
      }
      function Na() {
        this.__data__ = [], this.size = 0;
      }
      function Ga(n) {
        var e = this.__data__, t = Nt(e, n);
        if (t < 0) return false;
        var r = e.length - 1;
        return t == r ? e.pop() : bt.call(e, t, 1), --this.size, true;
      }
      function Ha(n) {
        var e = this.__data__, t = Nt(e, n);
        return t < 0 ? o : e[t][1];
      }
      function qa(n) {
        return Nt(this.__data__, n) > -1;
      }
      function $a(n, e) {
        var t = this.__data__, r = Nt(t, n);
        return r < 0 ? (++this.size, t.push([n, e])) : t[r][1] = e, this;
      }
      Gn.prototype.clear = Na, Gn.prototype.delete = Ga, Gn.prototype.get = Ha, Gn.prototype.has = qa, Gn.prototype.set = $a;
      function Hn(n) {
        var e = -1, t = n == null ? 0 : n.length;
        for (this.clear(); ++e < t; ) {
          var r = n[e];
          this.set(r[0], r[1]);
        }
      }
      function Ka() {
        this.size = 0, this.__data__ = { hash: new pe(), map: new (ke || Gn)(), string: new pe() };
      }
      function za(n) {
        var e = Vt(this, n).delete(n);
        return this.size -= e ? 1 : 0, e;
      }
      function Za(n) {
        return Vt(this, n).get(n);
      }
      function Ya(n) {
        return Vt(this, n).has(n);
      }
      function Ja(n, e) {
        var t = Vt(this, n), r = t.size;
        return t.set(n, e), this.size += t.size == r ? 0 : 1, this;
      }
      Hn.prototype.clear = Ka, Hn.prototype.delete = za, Hn.prototype.get = Za, Hn.prototype.has = Ya, Hn.prototype.set = Ja;
      function ge(n) {
        var e = -1, t = n == null ? 0 : n.length;
        for (this.__data__ = new Hn(); ++e < t; ) this.add(n[e]);
      }
      function Xa(n) {
        return this.__data__.set(n, Y), this;
      }
      function Qa(n) {
        return this.__data__.has(n);
      }
      ge.prototype.add = ge.prototype.push = Xa, ge.prototype.has = Qa;
      function En(n) {
        var e = this.__data__ = new Gn(n);
        this.size = e.size;
      }
      function Va() {
        this.__data__ = new Gn(), this.size = 0;
      }
      function ka(n) {
        var e = this.__data__, t = e.delete(n);
        return this.size = e.size, t;
      }
      function ja(n) {
        return this.__data__.get(n);
      }
      function nl(n) {
        return this.__data__.has(n);
      }
      function el(n, e) {
        var t = this.__data__;
        if (t instanceof Gn) {
          var r = t.__data__;
          if (!ke || r.length < w - 1) return r.push([n, e]), this.size = ++t.size, this;
          t = this.__data__ = new Hn(r);
        }
        return t.set(n, e), this.size = t.size, this;
      }
      En.prototype.clear = Va, En.prototype.delete = ka, En.prototype.get = ja, En.prototype.has = nl, En.prototype.set = el;
      function Fu(n, e) {
        var t = O(n), r = !t && me(n), i = !t && !r && fe(n), f = !t && !r && !i && De(n), s = t || r || i || f, a = s ? Wr(n.length, ca) : [], c = a.length;
        for (var g in n) (e || U.call(n, g)) && !(s && (g == "length" || i && (g == "offset" || g == "parent") || f && (g == "buffer" || g == "byteLength" || g == "byteOffset") || zn(g, c))) && a.push(g);
        return a;
      }
      function Wu(n) {
        var e = n.length;
        return e ? n[jr(0, e - 1)] : o;
      }
      function tl(n, e) {
        return kt(un(n), _e(e, 0, n.length));
      }
      function rl(n) {
        return kt(un(n));
      }
      function $r(n, e, t) {
        (t !== o && !On(n[e], t) || t === o && !(e in n)) && qn(n, e, t);
      }
      function tt(n, e, t) {
        var r = n[e];
        (!(U.call(n, e) && On(r, t)) || t === o && !(e in n)) && qn(n, e, t);
      }
      function Nt(n, e) {
        for (var t = n.length; t--; ) if (On(n[t][0], e)) return t;
        return -1;
      }
      function il(n, e, t, r) {
        return te(n, function(i, f, s) {
          e(r, i, t(i), s);
        }), r;
      }
      function Du(n, e) {
        return n && Bn(e, V(e), n);
      }
      function ul(n, e) {
        return n && Bn(e, on(e), n);
      }
      function qn(n, e, t) {
        e == "__proto__" && Lt ? Lt(n, e, { configurable: true, enumerable: true, value: t, writable: true }) : n[e] = t;
      }
      function Kr(n, e) {
        for (var t = -1, r = e.length, i = h(r), f = n == null; ++t < r; ) i[t] = f ? o : Ri(n, e[t]);
        return i;
      }
      function _e(n, e, t) {
        return n === n && (t !== o && (n = n <= t ? n : t), e !== o && (n = n >= e ? n : e)), n;
      }
      function wn(n, e, t, r, i, f) {
        var s, a = e & Xn, c = e & Wi, g = e & we;
        if (t && (s = i ? t(n, r, i, f) : t(n)), s !== o) return s;
        if (!$(n)) return n;
        var _ = O(n);
        if (_) {
          if (s = Yl(n), !a) return un(n, s);
        } else {
          var d = nn(n), y = d == vt || d == Ni;
          if (fe(n)) return sf(n, a);
          if (d == Nn || d == Re || y && !i) {
            if (s = c || y ? {} : Ef(n), !a) return c ? Wl(n, ul(s, n)) : Fl(n, Du(s, n));
          } else {
            if (!G[d]) return i ? n : {};
            s = Jl(n, d, a);
          }
        }
        f || (f = new En());
        var x = f.get(n);
        if (x) return x;
        f.set(n, s), to(n) ? n.forEach(function(R) {
          s.add(wn(R, e, t, R, n, f));
        }) : no(n) && n.forEach(function(R, b) {
          s.set(b, wn(R, e, t, b, n, f));
        });
        var T = g ? c ? li : ai : c ? on : V, M = _ ? o : T(n);
        return vn(M || n, function(R, b) {
          M && (b = R, R = n[b]), tt(s, b, wn(R, e, t, b, n, f));
        }), s;
      }
      function fl(n) {
        var e = V(n);
        return function(t) {
          return Uu(t, n, e);
        };
      }
      function Uu(n, e, t) {
        var r = t.length;
        if (n == null) return !r;
        for (n = N(n); r--; ) {
          var i = t[r], f = e[i], s = n[i];
          if (s === o && !(i in n) || !f(s)) return false;
        }
        return true;
      }
      function Nu(n, e, t) {
        if (typeof n != "function") throw new yn(E);
        return at(function() {
          n.apply(o, t);
        }, e);
      }
      function rt(n, e, t, r) {
        var i = -1, f = At, s = true, a = n.length, c = [], g = e.length;
        if (!a) return c;
        t && (e = q(e, ln(t))), r ? (f = Mr, s = false) : e.length >= w && (f = Qe, s = false, e = new ge(e));
        n: for (; ++i < a; ) {
          var _ = n[i], d = t == null ? _ : t(_);
          if (_ = r || _ !== 0 ? _ : 0, s && d === d) {
            for (var y = g; y--; ) if (e[y] === d) continue n;
            c.push(_);
          } else f(e, d, r) || c.push(_);
        }
        return c;
      }
      var te = pf(Ln), Gu = pf(Zr, true);
      function ol(n, e) {
        var t = true;
        return te(n, function(r, i, f) {
          return t = !!e(r, i, f), t;
        }), t;
      }
      function Gt(n, e, t) {
        for (var r = -1, i = n.length; ++r < i; ) {
          var f = n[r], s = e(f);
          if (s != null && (a === o ? s === s && !hn(s) : t(s, a))) var a = s, c = f;
        }
        return c;
      }
      function sl(n, e, t, r) {
        var i = n.length;
        for (t = S(t), t < 0 && (t = -t > i ? 0 : i + t), r = r === o || r > i ? i : S(r), r < 0 && (r += i), r = t > r ? 0 : io(r); t < r; ) n[t++] = e;
        return n;
      }
      function Hu(n, e) {
        var t = [];
        return te(n, function(r, i, f) {
          e(r, i, f) && t.push(r);
        }), t;
      }
      function k(n, e, t, r, i) {
        var f = -1, s = n.length;
        for (t || (t = Ql), i || (i = []); ++f < s; ) {
          var a = n[f];
          e > 0 && t(a) ? e > 1 ? k(a, e - 1, t, r, i) : kn(i, a) : r || (i[i.length] = a);
        }
        return i;
      }
      var zr = gf(), qu = gf(true);
      function Ln(n, e) {
        return n && zr(n, e, V);
      }
      function Zr(n, e) {
        return n && qu(n, e, V);
      }
      function Ht(n, e) {
        return Vn(e, function(t) {
          return Zn(n[t]);
        });
      }
      function de(n, e) {
        e = ie(e, n);
        for (var t = 0, r = e.length; n != null && t < r; ) n = n[Fn(e[t++])];
        return t && t == r ? n : o;
      }
      function $u(n, e, t) {
        var r = e(n);
        return O(n) ? r : kn(r, t(n));
      }
      function en(n) {
        return n == null ? n === o ? Do : Fo : he && he in N(n) ? Kl(n) : rc(n);
      }
      function Yr(n, e) {
        return n > e;
      }
      function al(n, e) {
        return n != null && U.call(n, e);
      }
      function ll(n, e) {
        return n != null && e in N(n);
      }
      function cl(n, e, t) {
        return n >= j(e, t) && n < X(e, t);
      }
      function Jr(n, e, t) {
        for (var r = t ? Mr : At, i = n[0].length, f = n.length, s = f, a = h(f), c = 1 / 0, g = []; s--; ) {
          var _ = n[s];
          s && e && (_ = q(_, ln(e))), c = j(_.length, c), a[s] = !t && (e || i >= 120 && _.length >= 120) ? new ge(s && _) : o;
        }
        _ = n[0];
        var d = -1, y = a[0];
        n: for (; ++d < i && g.length < c; ) {
          var x = _[d], T = e ? e(x) : x;
          if (x = t || x !== 0 ? x : 0, !(y ? Qe(y, T) : r(g, T, t))) {
            for (s = f; --s; ) {
              var M = a[s];
              if (!(M ? Qe(M, T) : r(n[s], T, t))) continue n;
            }
            y && y.push(T), g.push(x);
          }
        }
        return g;
      }
      function hl(n, e, t, r) {
        return Ln(n, function(i, f, s) {
          e(r, t(i), f, s);
        }), r;
      }
      function it(n, e, t) {
        e = ie(e, n), n = Cf(n, e);
        var r = n == null ? n : n[Fn(An(e))];
        return r == null ? o : an(r, n, t);
      }
      function Ku(n) {
        return K(n) && en(n) == Re;
      }
      function pl(n) {
        return K(n) && en(n) == Xe;
      }
      function gl(n) {
        return K(n) && en(n) == Ke;
      }
      function ut(n, e, t, r, i) {
        return n === e ? true : n == null || e == null || !K(n) && !K(e) ? n !== n && e !== e : _l(n, e, t, r, ut, i);
      }
      function _l(n, e, t, r, i, f) {
        var s = O(n), a = O(e), c = s ? _t : nn(n), g = a ? _t : nn(e);
        c = c == Re ? Nn : c, g = g == Re ? Nn : g;
        var _ = c == Nn, d = g == Nn, y = c == g;
        if (y && fe(n)) {
          if (!fe(e)) return false;
          s = true, _ = false;
        }
        if (y && !_) return f || (f = new En()), s || De(n) ? Rf(n, e, t, r, i, f) : ql(n, e, c, t, r, i, f);
        if (!(t & xe)) {
          var x = _ && U.call(n, "__wrapped__"), T = d && U.call(e, "__wrapped__");
          if (x || T) {
            var M = x ? n.value() : n, R = T ? e.value() : e;
            return f || (f = new En()), i(M, R, t, r, f);
          }
        }
        return y ? (f || (f = new En()), $l(n, e, t, r, i, f)) : false;
      }
      function dl(n) {
        return K(n) && nn(n) == Rn;
      }
      function Xr(n, e, t, r) {
        var i = t.length, f = i, s = !r;
        if (n == null) return !f;
        for (n = N(n); i--; ) {
          var a = t[i];
          if (s && a[2] ? a[1] !== n[a[0]] : !(a[0] in n)) return false;
        }
        for (; ++i < f; ) {
          a = t[i];
          var c = a[0], g = n[c], _ = a[1];
          if (s && a[2]) {
            if (g === o && !(c in n)) return false;
          } else {
            var d = new En();
            if (r) var y = r(g, _, c, n, e, d);
            if (!(y === o ? ut(_, g, xe | pt, r, d) : y)) return false;
          }
        }
        return true;
      }
      function zu(n) {
        if (!$(n) || kl(n)) return false;
        var e = Zn(n) ? da : fs;
        return e.test(ye(n));
      }
      function vl(n) {
        return K(n) && en(n) == Ze;
      }
      function yl(n) {
        return K(n) && nn(n) == In;
      }
      function ml(n) {
        return K(n) && ir(n.length) && !!H[en(n)];
      }
      function Zu(n) {
        return typeof n == "function" ? n : n == null ? sn : typeof n == "object" ? O(n) ? Xu(n[0], n[1]) : Ju(n) : _o(n);
      }
      function Qr(n) {
        if (!st(n)) return Aa(n);
        var e = [];
        for (var t in N(n)) U.call(n, t) && t != "constructor" && e.push(t);
        return e;
      }
      function wl(n) {
        if (!$(n)) return tc(n);
        var e = st(n), t = [];
        for (var r in n) r == "constructor" && (e || !U.call(n, r)) || t.push(r);
        return t;
      }
      function Vr(n, e) {
        return n < e;
      }
      function Yu(n, e) {
        var t = -1, r = fn(n) ? h(n.length) : [];
        return te(n, function(i, f, s) {
          r[++t] = e(i, f, s);
        }), r;
      }
      function Ju(n) {
        var e = hi(n);
        return e.length == 1 && e[0][2] ? Sf(e[0][0], e[0][1]) : function(t) {
          return t === n || Xr(t, n, e);
        };
      }
      function Xu(n, e) {
        return gi(n) && Of(e) ? Sf(Fn(n), e) : function(t) {
          var r = Ri(t, n);
          return r === o && r === e ? Ii(t, n) : ut(e, r, xe | pt);
        };
      }
      function qt(n, e, t, r, i) {
        n !== e && zr(e, function(f, s) {
          if (i || (i = new En()), $(f)) xl(n, e, s, t, qt, r, i);
          else {
            var a = r ? r(di(n, s), f, s + "", n, e, i) : o;
            a === o && (a = f), $r(n, s, a);
          }
        }, on);
      }
      function xl(n, e, t, r, i, f, s) {
        var a = di(n, t), c = di(e, t), g = s.get(c);
        if (g) {
          $r(n, t, g);
          return;
        }
        var _ = f ? f(a, c, t + "", n, e, s) : o, d = _ === o;
        if (d) {
          var y = O(c), x = !y && fe(c), T = !y && !x && De(c);
          _ = c, y || x || T ? O(a) ? _ = a : z(a) ? _ = un(a) : x ? (d = false, _ = sf(c, true)) : T ? (d = false, _ = af(c, true)) : _ = [] : lt(c) || me(c) ? (_ = a, me(a) ? _ = uo(a) : (!$(a) || Zn(a)) && (_ = Ef(c))) : d = false;
        }
        d && (s.set(c, _), i(_, c, r, f, s), s.delete(c)), $r(n, t, _);
      }
      function Qu(n, e) {
        var t = n.length;
        if (t) return e += e < 0 ? t : 0, zn(e, t) ? n[e] : o;
      }
      function Vu(n, e, t) {
        e.length ? e = q(e, function(f) {
          return O(f) ? function(s) {
            return de(s, f.length === 1 ? f[0] : f);
          } : f;
        }) : e = [sn];
        var r = -1;
        e = q(e, ln(A()));
        var i = Yu(n, function(f, s, a) {
          var c = q(e, function(g) {
            return g(f);
          });
          return { criteria: c, index: ++r, value: f };
        });
        return Js(i, function(f, s) {
          return Bl(f, s, t);
        });
      }
      function Al(n, e) {
        return ku(n, e, function(t, r) {
          return Ii(n, r);
        });
      }
      function ku(n, e, t) {
        for (var r = -1, i = e.length, f = {}; ++r < i; ) {
          var s = e[r], a = de(n, s);
          t(a, s) && ft(f, ie(s, n), a);
        }
        return f;
      }
      function Tl(n) {
        return function(e) {
          return de(e, n);
        };
      }
      function kr(n, e, t, r) {
        var i = r ? Ys : Ee, f = -1, s = e.length, a = n;
        for (n === e && (e = un(e)), t && (a = q(n, ln(t))); ++f < s; ) for (var c = 0, g = e[f], _ = t ? t(g) : g; (c = i(a, _, c, r)) > -1; ) a !== n && bt.call(a, c, 1), bt.call(n, c, 1);
        return n;
      }
      function ju(n, e) {
        for (var t = n ? e.length : 0, r = t - 1; t--; ) {
          var i = e[t];
          if (t == r || i !== f) {
            var f = i;
            zn(i) ? bt.call(n, i, 1) : ti(n, i);
          }
        }
        return n;
      }
      function jr(n, e) {
        return n + Ft(Lu() * (e - n + 1));
      }
      function Rl(n, e, t, r) {
        for (var i = -1, f = X(Bt((e - n) / (t || 1)), 0), s = h(f); f--; ) s[r ? f : ++i] = n, n += t;
        return s;
      }
      function ni(n, e) {
        var t = "";
        if (!n || e < 1 || e > Qn) return t;
        do
          e % 2 && (t += n), e = Ft(e / 2), e && (n += n);
        while (e);
        return t;
      }
      function C(n, e) {
        return vi(Mf(n, e, sn), n + "");
      }
      function Il(n) {
        return Wu(Ue(n));
      }
      function Pl(n, e) {
        var t = Ue(n);
        return kt(t, _e(e, 0, t.length));
      }
      function ft(n, e, t, r) {
        if (!$(n)) return n;
        e = ie(e, n);
        for (var i = -1, f = e.length, s = f - 1, a = n; a != null && ++i < f; ) {
          var c = Fn(e[i]), g = t;
          if (c === "__proto__" || c === "constructor" || c === "prototype") return n;
          if (i != s) {
            var _ = a[c];
            g = r ? r(_, c, a) : o, g === o && (g = $(_) ? _ : zn(e[i + 1]) ? [] : {});
          }
          tt(a, c, g), a = a[c];
        }
        return n;
      }
      var nf = Wt ? function(n, e) {
        return Wt.set(n, e), n;
      } : sn, El = Lt ? function(n, e) {
        return Lt(n, "toString", { configurable: true, enumerable: false, value: Ei(e), writable: true });
      } : sn;
      function Ol(n) {
        return kt(Ue(n));
      }
      function xn(n, e, t) {
        var r = -1, i = n.length;
        e < 0 && (e = -e > i ? 0 : i + e), t = t > i ? i : t, t < 0 && (t += i), i = e > t ? 0 : t - e >>> 0, e >>>= 0;
        for (var f = h(i); ++r < i; ) f[r] = n[r + e];
        return f;
      }
      function Sl(n, e) {
        var t;
        return te(n, function(r, i, f) {
          return t = e(r, i, f), !t;
        }), !!t;
      }
      function $t(n, e, t) {
        var r = 0, i = n == null ? r : n.length;
        if (typeof e == "number" && e === e && i <= Co) {
          for (; r < i; ) {
            var f = r + i >>> 1, s = n[f];
            s !== null && !hn(s) && (t ? s <= e : s < e) ? r = f + 1 : i = f;
          }
          return i;
        }
        return ei(n, e, sn, t);
      }
      function ei(n, e, t, r) {
        var i = 0, f = n == null ? 0 : n.length;
        if (f === 0) return 0;
        e = t(e);
        for (var s = e !== e, a = e === null, c = hn(e), g = e === o; i < f; ) {
          var _ = Ft((i + f) / 2), d = t(n[_]), y = d !== o, x = d === null, T = d === d, M = hn(d);
          if (s) var R = r || T;
          else g ? R = T && (r || y) : a ? R = T && y && (r || !x) : c ? R = T && y && !x && (r || !M) : x || M ? R = false : R = r ? d <= e : d < e;
          R ? i = _ + 1 : f = _;
        }
        return j(f, Mo);
      }
      function ef(n, e) {
        for (var t = -1, r = n.length, i = 0, f = []; ++t < r; ) {
          var s = n[t], a = e ? e(s) : s;
          if (!t || !On(a, c)) {
            var c = a;
            f[i++] = s === 0 ? 0 : s;
          }
        }
        return f;
      }
      function tf(n) {
        return typeof n == "number" ? n : hn(n) ? gt : +n;
      }
      function cn(n) {
        if (typeof n == "string") return n;
        if (O(n)) return q(n, cn) + "";
        if (hn(n)) return Bu ? Bu.call(n) : "";
        var e = n + "";
        return e == "0" && 1 / n == -le ? "-0" : e;
      }
      function re(n, e, t) {
        var r = -1, i = At, f = n.length, s = true, a = [], c = a;
        if (t) s = false, i = Mr;
        else if (f >= w) {
          var g = e ? null : Gl(n);
          if (g) return Rt(g);
          s = false, i = Qe, c = new ge();
        } else c = e ? [] : a;
        n: for (; ++r < f; ) {
          var _ = n[r], d = e ? e(_) : _;
          if (_ = t || _ !== 0 ? _ : 0, s && d === d) {
            for (var y = c.length; y--; ) if (c[y] === d) continue n;
            e && c.push(d), a.push(_);
          } else i(c, d, t) || (c !== a && c.push(d), a.push(_));
        }
        return a;
      }
      function ti(n, e) {
        return e = ie(e, n), n = Cf(n, e), n == null || delete n[Fn(An(e))];
      }
      function rf(n, e, t, r) {
        return ft(n, e, t(de(n, e)), r);
      }
      function Kt(n, e, t, r) {
        for (var i = n.length, f = r ? i : -1; (r ? f-- : ++f < i) && e(n[f], f, n); ) ;
        return t ? xn(n, r ? 0 : f, r ? f + 1 : i) : xn(n, r ? f + 1 : 0, r ? i : f);
      }
      function uf(n, e) {
        var t = n;
        return t instanceof L && (t = t.value()), Cr(e, function(r, i) {
          return i.func.apply(i.thisArg, kn([r], i.args));
        }, t);
      }
      function ri(n, e, t) {
        var r = n.length;
        if (r < 2) return r ? re(n[0]) : [];
        for (var i = -1, f = h(r); ++i < r; ) for (var s = n[i], a = -1; ++a < r; ) a != i && (f[i] = rt(f[i] || s, n[a], e, t));
        return re(k(f, 1), e, t);
      }
      function ff(n, e, t) {
        for (var r = -1, i = n.length, f = e.length, s = {}; ++r < i; ) {
          var a = r < f ? e[r] : o;
          t(s, n[r], a);
        }
        return s;
      }
      function ii(n) {
        return z(n) ? n : [];
      }
      function ui(n) {
        return typeof n == "function" ? n : sn;
      }
      function ie(n, e) {
        return O(n) ? n : gi(n, e) ? [n] : Ff(D(n));
      }
      var Ml = C;
      function ue(n, e, t) {
        var r = n.length;
        return t = t === o ? r : t, !e && t >= r ? n : xn(n, e, t);
      }
      var of = va || function(n) {
        return Q.clearTimeout(n);
      };
      function sf(n, e) {
        if (e) return n.slice();
        var t = n.length, r = Ou ? Ou(t) : new n.constructor(t);
        return n.copy(r), r;
      }
      function fi(n) {
        var e = new n.constructor(n.byteLength);
        return new Mt(e).set(new Mt(n)), e;
      }
      function Cl(n, e) {
        var t = e ? fi(n.buffer) : n.buffer;
        return new n.constructor(t, n.byteOffset, n.byteLength);
      }
      function bl(n) {
        var e = new n.constructor(n.source, Ki.exec(n));
        return e.lastIndex = n.lastIndex, e;
      }
      function Ll(n) {
        return et ? N(et.call(n)) : {};
      }
      function af(n, e) {
        var t = e ? fi(n.buffer) : n.buffer;
        return new n.constructor(t, n.byteOffset, n.length);
      }
      function lf(n, e) {
        if (n !== e) {
          var t = n !== o, r = n === null, i = n === n, f = hn(n), s = e !== o, a = e === null, c = e === e, g = hn(e);
          if (!a && !g && !f && n > e || f && s && c && !a && !g || r && s && c || !t && c || !i) return 1;
          if (!r && !f && !g && n < e || g && t && i && !r && !f || a && t && i || !s && i || !c) return -1;
        }
        return 0;
      }
      function Bl(n, e, t) {
        for (var r = -1, i = n.criteria, f = e.criteria, s = i.length, a = t.length; ++r < s; ) {
          var c = lf(i[r], f[r]);
          if (c) {
            if (r >= a) return c;
            var g = t[r];
            return c * (g == "desc" ? -1 : 1);
          }
        }
        return n.index - e.index;
      }
      function cf(n, e, t, r) {
        for (var i = -1, f = n.length, s = t.length, a = -1, c = e.length, g = X(f - s, 0), _ = h(c + g), d = !r; ++a < c; ) _[a] = e[a];
        for (; ++i < s; ) (d || i < f) && (_[t[i]] = n[i]);
        for (; g--; ) _[a++] = n[i++];
        return _;
      }
      function hf(n, e, t, r) {
        for (var i = -1, f = n.length, s = -1, a = t.length, c = -1, g = e.length, _ = X(f - a, 0), d = h(_ + g), y = !r; ++i < _; ) d[i] = n[i];
        for (var x = i; ++c < g; ) d[x + c] = e[c];
        for (; ++s < a; ) (y || i < f) && (d[x + t[s]] = n[i++]);
        return d;
      }
      function un(n, e) {
        var t = -1, r = n.length;
        for (e || (e = h(r)); ++t < r; ) e[t] = n[t];
        return e;
      }
      function Bn(n, e, t, r) {
        var i = !t;
        t || (t = {});
        for (var f = -1, s = e.length; ++f < s; ) {
          var a = e[f], c = r ? r(t[a], n[a], a, t, n) : o;
          c === o && (c = n[a]), i ? qn(t, a, c) : tt(t, a, c);
        }
        return t;
      }
      function Fl(n, e) {
        return Bn(n, pi(n), e);
      }
      function Wl(n, e) {
        return Bn(n, If(n), e);
      }
      function zt(n, e) {
        return function(t, r) {
          var i = O(t) ? Hs : il, f = e ? e() : {};
          return i(t, n, A(r, 2), f);
        };
      }
      function Be(n) {
        return C(function(e, t) {
          var r = -1, i = t.length, f = i > 1 ? t[i - 1] : o, s = i > 2 ? t[2] : o;
          for (f = n.length > 3 && typeof f == "function" ? (i--, f) : o, s && tn(t[0], t[1], s) && (f = i < 3 ? o : f, i = 1), e = N(e); ++r < i; ) {
            var a = t[r];
            a && n(e, a, r, f);
          }
          return e;
        });
      }
      function pf(n, e) {
        return function(t, r) {
          if (t == null) return t;
          if (!fn(t)) return n(t, r);
          for (var i = t.length, f = e ? i : -1, s = N(t); (e ? f-- : ++f < i) && r(s[f], f, s) !== false; ) ;
          return t;
        };
      }
      function gf(n) {
        return function(e, t, r) {
          for (var i = -1, f = N(e), s = r(e), a = s.length; a--; ) {
            var c = s[n ? a : ++i];
            if (t(f[c], c, f) === false) break;
          }
          return e;
        };
      }
      function Dl(n, e, t) {
        var r = e & _n, i = ot(n);
        function f() {
          var s = this && this !== Q && this instanceof f ? i : n;
          return s.apply(r ? t : this, arguments);
        }
        return f;
      }
      function _f(n) {
        return function(e) {
          e = D(e);
          var t = Oe(e) ? Pn(e) : o, r = t ? t[0] : e.charAt(0), i = t ? ue(t, 1).join("") : e.slice(1);
          return r[n]() + i;
        };
      }
      function Fe(n) {
        return function(e) {
          return Cr(po(ho(e).replace(Es, "")), n, "");
        };
      }
      function ot(n) {
        return function() {
          var e = arguments;
          switch (e.length) {
            case 0:
              return new n();
            case 1:
              return new n(e[0]);
            case 2:
              return new n(e[0], e[1]);
            case 3:
              return new n(e[0], e[1], e[2]);
            case 4:
              return new n(e[0], e[1], e[2], e[3]);
            case 5:
              return new n(e[0], e[1], e[2], e[3], e[4]);
            case 6:
              return new n(e[0], e[1], e[2], e[3], e[4], e[5]);
            case 7:
              return new n(e[0], e[1], e[2], e[3], e[4], e[5], e[6]);
          }
          var t = Le(n.prototype), r = n.apply(t, e);
          return $(r) ? r : t;
        };
      }
      function Ul(n, e, t) {
        var r = ot(n);
        function i() {
          for (var f = arguments.length, s = h(f), a = f, c = We(i); a--; ) s[a] = arguments[a];
          var g = f < 3 && s[0] !== c && s[f - 1] !== c ? [] : jn(s, c);
          if (f -= g.length, f < t) return wf(n, e, Zt, i.placeholder, o, s, g, o, o, t - f);
          var _ = this && this !== Q && this instanceof i ? r : n;
          return an(_, this, s);
        }
        return i;
      }
      function df(n) {
        return function(e, t, r) {
          var i = N(e);
          if (!fn(e)) {
            var f = A(t, 3);
            e = V(e), t = function(a) {
              return f(i[a], a, i);
            };
          }
          var s = n(e, t, r);
          return s > -1 ? i[f ? e[s] : s] : o;
        };
      }
      function vf(n) {
        return Kn(function(e) {
          var t = e.length, r = t, i = mn.prototype.thru;
          for (n && e.reverse(); r--; ) {
            var f = e[r];
            if (typeof f != "function") throw new yn(E);
            if (i && !s && Qt(f) == "wrapper") var s = new mn([], true);
          }
          for (r = s ? r : t; ++r < t; ) {
            f = e[r];
            var a = Qt(f), c = a == "wrapper" ? ci(f) : o;
            c && _i(c[0]) && c[1] == (Un | Mn | Cn | qe) && !c[4].length && c[9] == 1 ? s = s[Qt(c[0])].apply(s, c[3]) : s = f.length == 1 && _i(f) ? s[a]() : s.thru(f);
          }
          return function() {
            var g = arguments, _ = g[0];
            if (s && g.length == 1 && O(_)) return s.plant(_).value();
            for (var d = 0, y = t ? e[d].apply(this, g) : _; ++d < t; ) y = e[d].call(this, y);
            return y;
          };
        });
      }
      function Zt(n, e, t, r, i, f, s, a, c, g) {
        var _ = e & Un, d = e & _n, y = e & ae, x = e & (Mn | Ae), T = e & cr, M = y ? o : ot(n);
        function R() {
          for (var b = arguments.length, B = h(b), pn = b; pn--; ) B[pn] = arguments[pn];
          if (x) var rn = We(R), gn = Qs(B, rn);
          if (r && (B = cf(B, r, i, x)), f && (B = hf(B, f, s, x)), b -= gn, x && b < g) {
            var Z = jn(B, rn);
            return wf(n, e, Zt, R.placeholder, t, B, Z, a, c, g - b);
          }
          var Sn = d ? t : this, Jn = y ? Sn[n] : n;
          return b = B.length, a ? B = ic(B, a) : T && b > 1 && B.reverse(), _ && c < b && (B.length = c), this && this !== Q && this instanceof R && (Jn = M || ot(Jn)), Jn.apply(Sn, B);
        }
        return R;
      }
      function yf(n, e) {
        return function(t, r) {
          return hl(t, n, e(r), {});
        };
      }
      function Yt(n, e) {
        return function(t, r) {
          var i;
          if (t === o && r === o) return e;
          if (t !== o && (i = t), r !== o) {
            if (i === o) return r;
            typeof t == "string" || typeof r == "string" ? (t = cn(t), r = cn(r)) : (t = tf(t), r = tf(r)), i = n(t, r);
          }
          return i;
        };
      }
      function oi(n) {
        return Kn(function(e) {
          return e = q(e, ln(A())), C(function(t) {
            var r = this;
            return n(e, function(i) {
              return an(i, r, t);
            });
          });
        });
      }
      function Jt(n, e) {
        e = e === o ? " " : cn(e);
        var t = e.length;
        if (t < 2) return t ? ni(e, n) : e;
        var r = ni(e, Bt(n / Se(e)));
        return Oe(e) ? ue(Pn(r), 0, n).join("") : r.slice(0, n);
      }
      function Nl(n, e, t, r) {
        var i = e & _n, f = ot(n);
        function s() {
          for (var a = -1, c = arguments.length, g = -1, _ = r.length, d = h(_ + c), y = this && this !== Q && this instanceof s ? f : n; ++g < _; ) d[g] = r[g];
          for (; c--; ) d[g++] = arguments[++a];
          return an(y, i ? t : this, d);
        }
        return s;
      }
      function mf(n) {
        return function(e, t, r) {
          return r && typeof r != "number" && tn(e, t, r) && (t = r = o), e = Yn(e), t === o ? (t = e, e = 0) : t = Yn(t), r = r === o ? e < t ? 1 : -1 : Yn(r), Rl(e, t, r, n);
        };
      }
      function Xt(n) {
        return function(e, t) {
          return typeof e == "string" && typeof t == "string" || (e = Tn(e), t = Tn(t)), n(e, t);
        };
      }
      function wf(n, e, t, r, i, f, s, a, c, g) {
        var _ = e & Mn, d = _ ? s : o, y = _ ? o : s, x = _ ? f : o, T = _ ? o : f;
        e |= _ ? Cn : Te, e &= ~(_ ? Te : Cn), e & Di || (e &= ~(_n | ae));
        var M = [n, e, i, x, d, T, y, a, c, g], R = t.apply(o, M);
        return _i(n) && bf(R, M), R.placeholder = r, Lf(R, n, e);
      }
      function si(n) {
        var e = J[n];
        return function(t, r) {
          if (t = Tn(t), r = r == null ? 0 : j(S(r), 292), r && bu(t)) {
            var i = (D(t) + "e").split("e"), f = e(i[0] + "e" + (+i[1] + r));
            return i = (D(f) + "e").split("e"), +(i[0] + "e" + (+i[1] - r));
          }
          return e(t);
        };
      }
      var Gl = Ce && 1 / Rt(new Ce([, -0]))[1] == le ? function(n) {
        return new Ce(n);
      } : Mi;
      function xf(n) {
        return function(e) {
          var t = nn(e);
          return t == Rn ? Ur(e) : t == In ? ra(e) : Xs(e, n(e));
        };
      }
      function $n(n, e, t, r, i, f, s, a) {
        var c = e & ae;
        if (!c && typeof n != "function") throw new yn(E);
        var g = r ? r.length : 0;
        if (g || (e &= ~(Cn | Te), r = i = o), s = s === o ? s : X(S(s), 0), a = a === o ? a : S(a), g -= i ? i.length : 0, e & Te) {
          var _ = r, d = i;
          r = i = o;
        }
        var y = c ? o : ci(n), x = [n, e, t, r, i, _, d, f, s, a];
        if (y && ec(x, y), n = x[0], e = x[1], t = x[2], r = x[3], i = x[4], a = x[9] = x[9] === o ? c ? 0 : n.length : X(x[9] - g, 0), !a && e & (Mn | Ae) && (e &= ~(Mn | Ae)), !e || e == _n) var T = Dl(n, e, t);
        else e == Mn || e == Ae ? T = Ul(n, e, a) : (e == Cn || e == (_n | Cn)) && !i.length ? T = Nl(n, e, t, r) : T = Zt.apply(o, x);
        var M = y ? nf : bf;
        return Lf(M(T, x), n, e);
      }
      function Af(n, e, t, r) {
        return n === o || On(n, Me[t]) && !U.call(r, t) ? e : n;
      }
      function Tf(n, e, t, r, i, f) {
        return $(n) && $(e) && (f.set(e, n), qt(n, e, o, Tf, f), f.delete(e)), n;
      }
      function Hl(n) {
        return lt(n) ? o : n;
      }
      function Rf(n, e, t, r, i, f) {
        var s = t & xe, a = n.length, c = e.length;
        if (a != c && !(s && c > a)) return false;
        var g = f.get(n), _ = f.get(e);
        if (g && _) return g == e && _ == n;
        var d = -1, y = true, x = t & pt ? new ge() : o;
        for (f.set(n, e), f.set(e, n); ++d < a; ) {
          var T = n[d], M = e[d];
          if (r) var R = s ? r(M, T, d, e, n, f) : r(T, M, d, n, e, f);
          if (R !== o) {
            if (R) continue;
            y = false;
            break;
          }
          if (x) {
            if (!br(e, function(b, B) {
              if (!Qe(x, B) && (T === b || i(T, b, t, r, f))) return x.push(B);
            })) {
              y = false;
              break;
            }
          } else if (!(T === M || i(T, M, t, r, f))) {
            y = false;
            break;
          }
        }
        return f.delete(n), f.delete(e), y;
      }
      function ql(n, e, t, r, i, f, s) {
        switch (t) {
          case Ie:
            if (n.byteLength != e.byteLength || n.byteOffset != e.byteOffset) return false;
            n = n.buffer, e = e.buffer;
          case Xe:
            return !(n.byteLength != e.byteLength || !f(new Mt(n), new Mt(e)));
          case $e:
          case Ke:
          case ze:
            return On(+n, +e);
          case dt:
            return n.name == e.name && n.message == e.message;
          case Ze:
          case Ye:
            return n == e + "";
          case Rn:
            var a = Ur;
          case In:
            var c = r & xe;
            if (a || (a = Rt), n.size != e.size && !c) return false;
            var g = s.get(n);
            if (g) return g == e;
            r |= pt, s.set(n, e);
            var _ = Rf(a(n), a(e), r, i, f, s);
            return s.delete(n), _;
          case yt:
            if (et) return et.call(n) == et.call(e);
        }
        return false;
      }
      function $l(n, e, t, r, i, f) {
        var s = t & xe, a = ai(n), c = a.length, g = ai(e), _ = g.length;
        if (c != _ && !s) return false;
        for (var d = c; d--; ) {
          var y = a[d];
          if (!(s ? y in e : U.call(e, y))) return false;
        }
        var x = f.get(n), T = f.get(e);
        if (x && T) return x == e && T == n;
        var M = true;
        f.set(n, e), f.set(e, n);
        for (var R = s; ++d < c; ) {
          y = a[d];
          var b = n[y], B = e[y];
          if (r) var pn = s ? r(B, b, y, e, n, f) : r(b, B, y, n, e, f);
          if (!(pn === o ? b === B || i(b, B, t, r, f) : pn)) {
            M = false;
            break;
          }
          R || (R = y == "constructor");
        }
        if (M && !R) {
          var rn = n.constructor, gn = e.constructor;
          rn != gn && "constructor" in n && "constructor" in e && !(typeof rn == "function" && rn instanceof rn && typeof gn == "function" && gn instanceof gn) && (M = false);
        }
        return f.delete(n), f.delete(e), M;
      }
      function Kn(n) {
        return vi(Mf(n, o, Nf), n + "");
      }
      function ai(n) {
        return $u(n, V, pi);
      }
      function li(n) {
        return $u(n, on, If);
      }
      var ci = Wt ? function(n) {
        return Wt.get(n);
      } : Mi;
      function Qt(n) {
        for (var e = n.name + "", t = be[e], r = U.call(be, e) ? t.length : 0; r--; ) {
          var i = t[r], f = i.func;
          if (f == null || f == n) return i.name;
        }
        return e;
      }
      function We(n) {
        var e = U.call(u, "placeholder") ? u : n;
        return e.placeholder;
      }
      function A() {
        var n = u.iteratee || Oi;
        return n = n === Oi ? Zu : n, arguments.length ? n(arguments[0], arguments[1]) : n;
      }
      function Vt(n, e) {
        var t = n.__data__;
        return Vl(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
      }
      function hi(n) {
        for (var e = V(n), t = e.length; t--; ) {
          var r = e[t], i = n[r];
          e[t] = [r, i, Of(i)];
        }
        return e;
      }
      function ve(n, e) {
        var t = na(n, e);
        return zu(t) ? t : o;
      }
      function Kl(n) {
        var e = U.call(n, he), t = n[he];
        try {
          n[he] = o;
          var r = true;
        } catch {
        }
        var i = Ot.call(n);
        return r && (e ? n[he] = t : delete n[he]), i;
      }
      var pi = Gr ? function(n) {
        return n == null ? [] : (n = N(n), Vn(Gr(n), function(e) {
          return Mu.call(n, e);
        }));
      } : Ci, If = Gr ? function(n) {
        for (var e = []; n; ) kn(e, pi(n)), n = Ct(n);
        return e;
      } : Ci, nn = en;
      (Hr && nn(new Hr(new ArrayBuffer(1))) != Ie || ke && nn(new ke()) != Rn || qr && nn(qr.resolve()) != Gi || Ce && nn(new Ce()) != In || je && nn(new je()) != Je) && (nn = function(n) {
        var e = en(n), t = e == Nn ? n.constructor : o, r = t ? ye(t) : "";
        if (r) switch (r) {
          case Pa:
            return Ie;
          case Ea:
            return Rn;
          case Oa:
            return Gi;
          case Sa:
            return In;
          case Ma:
            return Je;
        }
        return e;
      });
      function zl(n, e, t) {
        for (var r = -1, i = t.length; ++r < i; ) {
          var f = t[r], s = f.size;
          switch (f.type) {
            case "drop":
              n += s;
              break;
            case "dropRight":
              e -= s;
              break;
            case "take":
              e = j(e, n + s);
              break;
            case "takeRight":
              n = X(n, e - s);
              break;
          }
        }
        return { start: n, end: e };
      }
      function Zl(n) {
        var e = n.match(ko);
        return e ? e[1].split(jo) : [];
      }
      function Pf(n, e, t) {
        e = ie(e, n);
        for (var r = -1, i = e.length, f = false; ++r < i; ) {
          var s = Fn(e[r]);
          if (!(f = n != null && t(n, s))) break;
          n = n[s];
        }
        return f || ++r != i ? f : (i = n == null ? 0 : n.length, !!i && ir(i) && zn(s, i) && (O(n) || me(n)));
      }
      function Yl(n) {
        var e = n.length, t = new n.constructor(e);
        return e && typeof n[0] == "string" && U.call(n, "index") && (t.index = n.index, t.input = n.input), t;
      }
      function Ef(n) {
        return typeof n.constructor == "function" && !st(n) ? Le(Ct(n)) : {};
      }
      function Jl(n, e, t) {
        var r = n.constructor;
        switch (e) {
          case Xe:
            return fi(n);
          case $e:
          case Ke:
            return new r(+n);
          case Ie:
            return Cl(n, t);
          case hr:
          case pr:
          case gr:
          case _r:
          case dr:
          case vr:
          case yr:
          case mr:
          case wr:
            return af(n, t);
          case Rn:
            return new r();
          case ze:
          case Ye:
            return new r(n);
          case Ze:
            return bl(n);
          case In:
            return new r();
          case yt:
            return Ll(n);
        }
      }
      function Xl(n, e) {
        var t = e.length;
        if (!t) return n;
        var r = t - 1;
        return e[r] = (t > 1 ? "& " : "") + e[r], e = e.join(t > 2 ? ", " : " "), n.replace(Vo, `{
/* [wrapped with ` + e + `] */
`);
      }
      function Ql(n) {
        return O(n) || me(n) || !!(Cu && n && n[Cu]);
      }
      function zn(n, e) {
        var t = typeof n;
        return e = e ?? Qn, !!e && (t == "number" || t != "symbol" && ss.test(n)) && n > -1 && n % 1 == 0 && n < e;
      }
      function tn(n, e, t) {
        if (!$(t)) return false;
        var r = typeof e;
        return (r == "number" ? fn(t) && zn(e, t.length) : r == "string" && e in t) ? On(t[e], n) : false;
      }
      function gi(n, e) {
        if (O(n)) return false;
        var t = typeof n;
        return t == "number" || t == "symbol" || t == "boolean" || n == null || hn(n) ? true : Yo.test(n) || !Zo.test(n) || e != null && n in N(e);
      }
      function Vl(n) {
        var e = typeof n;
        return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? n !== "__proto__" : n === null;
      }
      function _i(n) {
        var e = Qt(n), t = u[e];
        if (typeof t != "function" || !(e in L.prototype)) return false;
        if (n === t) return true;
        var r = ci(t);
        return !!r && n === r[0];
      }
      function kl(n) {
        return !!Eu && Eu in n;
      }
      var jl = Pt ? Zn : bi;
      function st(n) {
        var e = n && n.constructor, t = typeof e == "function" && e.prototype || Me;
        return n === t;
      }
      function Of(n) {
        return n === n && !$(n);
      }
      function Sf(n, e) {
        return function(t) {
          return t == null ? false : t[n] === e && (e !== o || n in N(t));
        };
      }
      function nc(n) {
        var e = tr(n, function(r) {
          return t.size === Dn && t.clear(), r;
        }), t = e.cache;
        return e;
      }
      function ec(n, e) {
        var t = n[1], r = e[1], i = t | r, f = i < (_n | ae | Un), s = r == Un && t == Mn || r == Un && t == qe && n[7].length <= e[8] || r == (Un | qe) && e[7].length <= e[8] && t == Mn;
        if (!(f || s)) return n;
        r & _n && (n[2] = e[2], i |= t & _n ? 0 : Di);
        var a = e[3];
        if (a) {
          var c = n[3];
          n[3] = c ? cf(c, a, e[4]) : a, n[4] = c ? jn(n[3], ht) : e[4];
        }
        return a = e[5], a && (c = n[5], n[5] = c ? hf(c, a, e[6]) : a, n[6] = c ? jn(n[5], ht) : e[6]), a = e[7], a && (n[7] = a), r & Un && (n[8] = n[8] == null ? e[8] : j(n[8], e[8])), n[9] == null && (n[9] = e[9]), n[0] = e[0], n[1] = i, n;
      }
      function tc(n) {
        var e = [];
        if (n != null) for (var t in N(n)) e.push(t);
        return e;
      }
      function rc(n) {
        return Ot.call(n);
      }
      function Mf(n, e, t) {
        return e = X(e === o ? n.length - 1 : e, 0), function() {
          for (var r = arguments, i = -1, f = X(r.length - e, 0), s = h(f); ++i < f; ) s[i] = r[e + i];
          i = -1;
          for (var a = h(e + 1); ++i < e; ) a[i] = r[i];
          return a[e] = t(s), an(n, this, a);
        };
      }
      function Cf(n, e) {
        return e.length < 2 ? n : de(n, xn(e, 0, -1));
      }
      function ic(n, e) {
        for (var t = n.length, r = j(e.length, t), i = un(n); r--; ) {
          var f = e[r];
          n[r] = zn(f, t) ? i[f] : o;
        }
        return n;
      }
      function di(n, e) {
        if (!(e === "constructor" && typeof n[e] == "function") && e != "__proto__") return n[e];
      }
      var bf = Bf(nf), at = ma || function(n, e) {
        return Q.setTimeout(n, e);
      }, vi = Bf(El);
      function Lf(n, e, t) {
        var r = e + "";
        return vi(n, Xl(r, uc(Zl(r), t)));
      }
      function Bf(n) {
        var e = 0, t = 0;
        return function() {
          var r = Ta(), i = Po - (r - t);
          if (t = r, i > 0) {
            if (++e >= Io) return arguments[0];
          } else e = 0;
          return n.apply(o, arguments);
        };
      }
      function kt(n, e) {
        var t = -1, r = n.length, i = r - 1;
        for (e = e === o ? r : e; ++t < e; ) {
          var f = jr(t, i), s = n[f];
          n[f] = n[t], n[t] = s;
        }
        return n.length = e, n;
      }
      var Ff = nc(function(n) {
        var e = [];
        return n.charCodeAt(0) === 46 && e.push(""), n.replace(Jo, function(t, r, i, f) {
          e.push(i ? f.replace(ts, "$1") : r || t);
        }), e;
      });
      function Fn(n) {
        if (typeof n == "string" || hn(n)) return n;
        var e = n + "";
        return e == "0" && 1 / n == -le ? "-0" : e;
      }
      function ye(n) {
        if (n != null) {
          try {
            return Et.call(n);
          } catch {
          }
          try {
            return n + "";
          } catch {
          }
        }
        return "";
      }
      function uc(n, e) {
        return vn(bo, function(t) {
          var r = "_." + t[0];
          e & t[1] && !At(n, r) && n.push(r);
        }), n.sort();
      }
      function Wf(n) {
        if (n instanceof L) return n.clone();
        var e = new mn(n.__wrapped__, n.__chain__);
        return e.__actions__ = un(n.__actions__), e.__index__ = n.__index__, e.__values__ = n.__values__, e;
      }
      function fc(n, e, t) {
        (t ? tn(n, e, t) : e === o) ? e = 1 : e = X(S(e), 0);
        var r = n == null ? 0 : n.length;
        if (!r || e < 1) return [];
        for (var i = 0, f = 0, s = h(Bt(r / e)); i < r; ) s[f++] = xn(n, i, i += e);
        return s;
      }
      function oc(n) {
        for (var e = -1, t = n == null ? 0 : n.length, r = 0, i = []; ++e < t; ) {
          var f = n[e];
          f && (i[r++] = f);
        }
        return i;
      }
      function sc() {
        var n = arguments.length;
        if (!n) return [];
        for (var e = h(n - 1), t = arguments[0], r = n; r--; ) e[r - 1] = arguments[r];
        return kn(O(t) ? un(t) : [t], k(e, 1));
      }
      var ac = C(function(n, e) {
        return z(n) ? rt(n, k(e, 1, z, true)) : [];
      }), lc = C(function(n, e) {
        var t = An(e);
        return z(t) && (t = o), z(n) ? rt(n, k(e, 1, z, true), A(t, 2)) : [];
      }), cc = C(function(n, e) {
        var t = An(e);
        return z(t) && (t = o), z(n) ? rt(n, k(e, 1, z, true), o, t) : [];
      });
      function hc(n, e, t) {
        var r = n == null ? 0 : n.length;
        return r ? (e = t || e === o ? 1 : S(e), xn(n, e < 0 ? 0 : e, r)) : [];
      }
      function pc(n, e, t) {
        var r = n == null ? 0 : n.length;
        return r ? (e = t || e === o ? 1 : S(e), e = r - e, xn(n, 0, e < 0 ? 0 : e)) : [];
      }
      function gc(n, e) {
        return n && n.length ? Kt(n, A(e, 3), true, true) : [];
      }
      function _c(n, e) {
        return n && n.length ? Kt(n, A(e, 3), true) : [];
      }
      function dc(n, e, t, r) {
        var i = n == null ? 0 : n.length;
        return i ? (t && typeof t != "number" && tn(n, e, t) && (t = 0, r = i), sl(n, e, t, r)) : [];
      }
      function Df(n, e, t) {
        var r = n == null ? 0 : n.length;
        if (!r) return -1;
        var i = t == null ? 0 : S(t);
        return i < 0 && (i = X(r + i, 0)), Tt(n, A(e, 3), i);
      }
      function Uf(n, e, t) {
        var r = n == null ? 0 : n.length;
        if (!r) return -1;
        var i = r - 1;
        return t !== o && (i = S(t), i = t < 0 ? X(r + i, 0) : j(i, r - 1)), Tt(n, A(e, 3), i, true);
      }
      function Nf(n) {
        var e = n == null ? 0 : n.length;
        return e ? k(n, 1) : [];
      }
      function vc(n) {
        var e = n == null ? 0 : n.length;
        return e ? k(n, le) : [];
      }
      function yc(n, e) {
        var t = n == null ? 0 : n.length;
        return t ? (e = e === o ? 1 : S(e), k(n, e)) : [];
      }
      function mc(n) {
        for (var e = -1, t = n == null ? 0 : n.length, r = {}; ++e < t; ) {
          var i = n[e];
          r[i[0]] = i[1];
        }
        return r;
      }
      function Gf(n) {
        return n && n.length ? n[0] : o;
      }
      function wc(n, e, t) {
        var r = n == null ? 0 : n.length;
        if (!r) return -1;
        var i = t == null ? 0 : S(t);
        return i < 0 && (i = X(r + i, 0)), Ee(n, e, i);
      }
      function xc(n) {
        var e = n == null ? 0 : n.length;
        return e ? xn(n, 0, -1) : [];
      }
      var Ac = C(function(n) {
        var e = q(n, ii);
        return e.length && e[0] === n[0] ? Jr(e) : [];
      }), Tc = C(function(n) {
        var e = An(n), t = q(n, ii);
        return e === An(t) ? e = o : t.pop(), t.length && t[0] === n[0] ? Jr(t, A(e, 2)) : [];
      }), Rc = C(function(n) {
        var e = An(n), t = q(n, ii);
        return e = typeof e == "function" ? e : o, e && t.pop(), t.length && t[0] === n[0] ? Jr(t, o, e) : [];
      });
      function Ic(n, e) {
        return n == null ? "" : xa.call(n, e);
      }
      function An(n) {
        var e = n == null ? 0 : n.length;
        return e ? n[e - 1] : o;
      }
      function Pc(n, e, t) {
        var r = n == null ? 0 : n.length;
        if (!r) return -1;
        var i = r;
        return t !== o && (i = S(t), i = i < 0 ? X(r + i, 0) : j(i, r - 1)), e === e ? ua(n, e, i) : Tt(n, mu, i, true);
      }
      function Ec(n, e) {
        return n && n.length ? Qu(n, S(e)) : o;
      }
      var Oc = C(Hf);
      function Hf(n, e) {
        return n && n.length && e && e.length ? kr(n, e) : n;
      }
      function Sc(n, e, t) {
        return n && n.length && e && e.length ? kr(n, e, A(t, 2)) : n;
      }
      function Mc(n, e, t) {
        return n && n.length && e && e.length ? kr(n, e, o, t) : n;
      }
      var Cc = Kn(function(n, e) {
        var t = n == null ? 0 : n.length, r = Kr(n, e);
        return ju(n, q(e, function(i) {
          return zn(i, t) ? +i : i;
        }).sort(lf)), r;
      });
      function bc(n, e) {
        var t = [];
        if (!(n && n.length)) return t;
        var r = -1, i = [], f = n.length;
        for (e = A(e, 3); ++r < f; ) {
          var s = n[r];
          e(s, r, n) && (t.push(s), i.push(r));
        }
        return ju(n, i), t;
      }
      function yi(n) {
        return n == null ? n : Ia.call(n);
      }
      function Lc(n, e, t) {
        var r = n == null ? 0 : n.length;
        return r ? (t && typeof t != "number" && tn(n, e, t) ? (e = 0, t = r) : (e = e == null ? 0 : S(e), t = t === o ? r : S(t)), xn(n, e, t)) : [];
      }
      function Bc(n, e) {
        return $t(n, e);
      }
      function Fc(n, e, t) {
        return ei(n, e, A(t, 2));
      }
      function Wc(n, e) {
        var t = n == null ? 0 : n.length;
        if (t) {
          var r = $t(n, e);
          if (r < t && On(n[r], e)) return r;
        }
        return -1;
      }
      function Dc(n, e) {
        return $t(n, e, true);
      }
      function Uc(n, e, t) {
        return ei(n, e, A(t, 2), true);
      }
      function Nc(n, e) {
        var t = n == null ? 0 : n.length;
        if (t) {
          var r = $t(n, e, true) - 1;
          if (On(n[r], e)) return r;
        }
        return -1;
      }
      function Gc(n) {
        return n && n.length ? ef(n) : [];
      }
      function Hc(n, e) {
        return n && n.length ? ef(n, A(e, 2)) : [];
      }
      function qc(n) {
        var e = n == null ? 0 : n.length;
        return e ? xn(n, 1, e) : [];
      }
      function $c(n, e, t) {
        return n && n.length ? (e = t || e === o ? 1 : S(e), xn(n, 0, e < 0 ? 0 : e)) : [];
      }
      function Kc(n, e, t) {
        var r = n == null ? 0 : n.length;
        return r ? (e = t || e === o ? 1 : S(e), e = r - e, xn(n, e < 0 ? 0 : e, r)) : [];
      }
      function zc(n, e) {
        return n && n.length ? Kt(n, A(e, 3), false, true) : [];
      }
      function Zc(n, e) {
        return n && n.length ? Kt(n, A(e, 3)) : [];
      }
      var Yc = C(function(n) {
        return re(k(n, 1, z, true));
      }), Jc = C(function(n) {
        var e = An(n);
        return z(e) && (e = o), re(k(n, 1, z, true), A(e, 2));
      }), Xc = C(function(n) {
        var e = An(n);
        return e = typeof e == "function" ? e : o, re(k(n, 1, z, true), o, e);
      });
      function Qc(n) {
        return n && n.length ? re(n) : [];
      }
      function Vc(n, e) {
        return n && n.length ? re(n, A(e, 2)) : [];
      }
      function kc(n, e) {
        return e = typeof e == "function" ? e : o, n && n.length ? re(n, o, e) : [];
      }
      function mi(n) {
        if (!(n && n.length)) return [];
        var e = 0;
        return n = Vn(n, function(t) {
          if (z(t)) return e = X(t.length, e), true;
        }), Wr(e, function(t) {
          return q(n, Lr(t));
        });
      }
      function qf(n, e) {
        if (!(n && n.length)) return [];
        var t = mi(n);
        return e == null ? t : q(t, function(r) {
          return an(e, o, r);
        });
      }
      var jc = C(function(n, e) {
        return z(n) ? rt(n, e) : [];
      }), nh = C(function(n) {
        return ri(Vn(n, z));
      }), eh = C(function(n) {
        var e = An(n);
        return z(e) && (e = o), ri(Vn(n, z), A(e, 2));
      }), th = C(function(n) {
        var e = An(n);
        return e = typeof e == "function" ? e : o, ri(Vn(n, z), o, e);
      }), rh = C(mi);
      function ih(n, e) {
        return ff(n || [], e || [], tt);
      }
      function uh(n, e) {
        return ff(n || [], e || [], ft);
      }
      var fh = C(function(n) {
        var e = n.length, t = e > 1 ? n[e - 1] : o;
        return t = typeof t == "function" ? (n.pop(), t) : o, qf(n, t);
      });
      function $f(n) {
        var e = u(n);
        return e.__chain__ = true, e;
      }
      function oh(n, e) {
        return e(n), n;
      }
      function jt(n, e) {
        return e(n);
      }
      var sh = Kn(function(n) {
        var e = n.length, t = e ? n[0] : 0, r = this.__wrapped__, i = function(f) {
          return Kr(f, n);
        };
        return e > 1 || this.__actions__.length || !(r instanceof L) || !zn(t) ? this.thru(i) : (r = r.slice(t, +t + (e ? 1 : 0)), r.__actions__.push({ func: jt, args: [i], thisArg: o }), new mn(r, this.__chain__).thru(function(f) {
          return e && !f.length && f.push(o), f;
        }));
      });
      function ah() {
        return $f(this);
      }
      function lh() {
        return new mn(this.value(), this.__chain__);
      }
      function ch() {
        this.__values__ === o && (this.__values__ = ro(this.value()));
        var n = this.__index__ >= this.__values__.length, e = n ? o : this.__values__[this.__index__++];
        return { done: n, value: e };
      }
      function hh() {
        return this;
      }
      function ph(n) {
        for (var e, t = this; t instanceof Ut; ) {
          var r = Wf(t);
          r.__index__ = 0, r.__values__ = o, e ? i.__wrapped__ = r : e = r;
          var i = r;
          t = t.__wrapped__;
        }
        return i.__wrapped__ = n, e;
      }
      function gh() {
        var n = this.__wrapped__;
        if (n instanceof L) {
          var e = n;
          return this.__actions__.length && (e = new L(this)), e = e.reverse(), e.__actions__.push({ func: jt, args: [yi], thisArg: o }), new mn(e, this.__chain__);
        }
        return this.thru(yi);
      }
      function _h() {
        return uf(this.__wrapped__, this.__actions__);
      }
      var dh = zt(function(n, e, t) {
        U.call(n, t) ? ++n[t] : qn(n, t, 1);
      });
      function vh(n, e, t) {
        var r = O(n) ? vu : ol;
        return t && tn(n, e, t) && (e = o), r(n, A(e, 3));
      }
      function yh(n, e) {
        var t = O(n) ? Vn : Hu;
        return t(n, A(e, 3));
      }
      var mh = df(Df), wh = df(Uf);
      function xh(n, e) {
        return k(nr(n, e), 1);
      }
      function Ah(n, e) {
        return k(nr(n, e), le);
      }
      function Th(n, e, t) {
        return t = t === o ? 1 : S(t), k(nr(n, e), t);
      }
      function Kf(n, e) {
        var t = O(n) ? vn : te;
        return t(n, A(e, 3));
      }
      function zf(n, e) {
        var t = O(n) ? qs : Gu;
        return t(n, A(e, 3));
      }
      var Rh = zt(function(n, e, t) {
        U.call(n, t) ? n[t].push(e) : qn(n, t, [e]);
      });
      function Ih(n, e, t, r) {
        n = fn(n) ? n : Ue(n), t = t && !r ? S(t) : 0;
        var i = n.length;
        return t < 0 && (t = X(i + t, 0)), ur(n) ? t <= i && n.indexOf(e, t) > -1 : !!i && Ee(n, e, t) > -1;
      }
      var Ph = C(function(n, e, t) {
        var r = -1, i = typeof e == "function", f = fn(n) ? h(n.length) : [];
        return te(n, function(s) {
          f[++r] = i ? an(e, s, t) : it(s, e, t);
        }), f;
      }), Eh = zt(function(n, e, t) {
        qn(n, t, e);
      });
      function nr(n, e) {
        var t = O(n) ? q : Yu;
        return t(n, A(e, 3));
      }
      function Oh(n, e, t, r) {
        return n == null ? [] : (O(e) || (e = e == null ? [] : [e]), t = r ? o : t, O(t) || (t = t == null ? [] : [t]), Vu(n, e, t));
      }
      var Sh = zt(function(n, e, t) {
        n[t ? 0 : 1].push(e);
      }, function() {
        return [[], []];
      });
      function Mh(n, e, t) {
        var r = O(n) ? Cr : xu, i = arguments.length < 3;
        return r(n, A(e, 4), t, i, te);
      }
      function Ch(n, e, t) {
        var r = O(n) ? $s : xu, i = arguments.length < 3;
        return r(n, A(e, 4), t, i, Gu);
      }
      function bh(n, e) {
        var t = O(n) ? Vn : Hu;
        return t(n, rr(A(e, 3)));
      }
      function Lh(n) {
        var e = O(n) ? Wu : Il;
        return e(n);
      }
      function Bh(n, e, t) {
        (t ? tn(n, e, t) : e === o) ? e = 1 : e = S(e);
        var r = O(n) ? tl : Pl;
        return r(n, e);
      }
      function Fh(n) {
        var e = O(n) ? rl : Ol;
        return e(n);
      }
      function Wh(n) {
        if (n == null) return 0;
        if (fn(n)) return ur(n) ? Se(n) : n.length;
        var e = nn(n);
        return e == Rn || e == In ? n.size : Qr(n).length;
      }
      function Dh(n, e, t) {
        var r = O(n) ? br : Sl;
        return t && tn(n, e, t) && (e = o), r(n, A(e, 3));
      }
      var Uh = C(function(n, e) {
        if (n == null) return [];
        var t = e.length;
        return t > 1 && tn(n, e[0], e[1]) ? e = [] : t > 2 && tn(e[0], e[1], e[2]) && (e = [e[0]]), Vu(n, k(e, 1), []);
      }), er = ya || function() {
        return Q.Date.now();
      };
      function Nh(n, e) {
        if (typeof e != "function") throw new yn(E);
        return n = S(n), function() {
          if (--n < 1) return e.apply(this, arguments);
        };
      }
      function Zf(n, e, t) {
        return e = t ? o : e, e = n && e == null ? n.length : e, $n(n, Un, o, o, o, o, e);
      }
      function Yf(n, e) {
        var t;
        if (typeof e != "function") throw new yn(E);
        return n = S(n), function() {
          return --n > 0 && (t = e.apply(this, arguments)), n <= 1 && (e = o), t;
        };
      }
      var wi = C(function(n, e, t) {
        var r = _n;
        if (t.length) {
          var i = jn(t, We(wi));
          r |= Cn;
        }
        return $n(n, r, e, t, i);
      }), Jf = C(function(n, e, t) {
        var r = _n | ae;
        if (t.length) {
          var i = jn(t, We(Jf));
          r |= Cn;
        }
        return $n(e, r, n, t, i);
      });
      function Xf(n, e, t) {
        e = t ? o : e;
        var r = $n(n, Mn, o, o, o, o, o, e);
        return r.placeholder = Xf.placeholder, r;
      }
      function Qf(n, e, t) {
        e = t ? o : e;
        var r = $n(n, Ae, o, o, o, o, o, e);
        return r.placeholder = Qf.placeholder, r;
      }
      function Vf(n, e, t) {
        var r, i, f, s, a, c, g = 0, _ = false, d = false, y = true;
        if (typeof n != "function") throw new yn(E);
        e = Tn(e) || 0, $(t) && (_ = !!t.leading, d = "maxWait" in t, f = d ? X(Tn(t.maxWait) || 0, e) : f, y = "trailing" in t ? !!t.trailing : y);
        function x(Z) {
          var Sn = r, Jn = i;
          return r = i = o, g = Z, s = n.apply(Jn, Sn), s;
        }
        function T(Z) {
          return g = Z, a = at(b, e), _ ? x(Z) : s;
        }
        function M(Z) {
          var Sn = Z - c, Jn = Z - g, vo = e - Sn;
          return d ? j(vo, f - Jn) : vo;
        }
        function R(Z) {
          var Sn = Z - c, Jn = Z - g;
          return c === o || Sn >= e || Sn < 0 || d && Jn >= f;
        }
        function b() {
          var Z = er();
          if (R(Z)) return B(Z);
          a = at(b, M(Z));
        }
        function B(Z) {
          return a = o, y && r ? x(Z) : (r = i = o, s);
        }
        function pn() {
          a !== o && of(a), g = 0, r = c = i = a = o;
        }
        function rn() {
          return a === o ? s : B(er());
        }
        function gn() {
          var Z = er(), Sn = R(Z);
          if (r = arguments, i = this, c = Z, Sn) {
            if (a === o) return T(c);
            if (d) return of(a), a = at(b, e), x(c);
          }
          return a === o && (a = at(b, e)), s;
        }
        return gn.cancel = pn, gn.flush = rn, gn;
      }
      var Gh = C(function(n, e) {
        return Nu(n, 1, e);
      }), Hh = C(function(n, e, t) {
        return Nu(n, Tn(e) || 0, t);
      });
      function qh(n) {
        return $n(n, cr);
      }
      function tr(n, e) {
        if (typeof n != "function" || e != null && typeof e != "function") throw new yn(E);
        var t = function() {
          var r = arguments, i = e ? e.apply(this, r) : r[0], f = t.cache;
          if (f.has(i)) return f.get(i);
          var s = n.apply(this, r);
          return t.cache = f.set(i, s) || f, s;
        };
        return t.cache = new (tr.Cache || Hn)(), t;
      }
      tr.Cache = Hn;
      function rr(n) {
        if (typeof n != "function") throw new yn(E);
        return function() {
          var e = arguments;
          switch (e.length) {
            case 0:
              return !n.call(this);
            case 1:
              return !n.call(this, e[0]);
            case 2:
              return !n.call(this, e[0], e[1]);
            case 3:
              return !n.call(this, e[0], e[1], e[2]);
          }
          return !n.apply(this, e);
        };
      }
      function $h(n) {
        return Yf(2, n);
      }
      var Kh = Ml(function(n, e) {
        e = e.length == 1 && O(e[0]) ? q(e[0], ln(A())) : q(k(e, 1), ln(A()));
        var t = e.length;
        return C(function(r) {
          for (var i = -1, f = j(r.length, t); ++i < f; ) r[i] = e[i].call(this, r[i]);
          return an(n, this, r);
        });
      }), xi = C(function(n, e) {
        var t = jn(e, We(xi));
        return $n(n, Cn, o, e, t);
      }), kf = C(function(n, e) {
        var t = jn(e, We(kf));
        return $n(n, Te, o, e, t);
      }), zh = Kn(function(n, e) {
        return $n(n, qe, o, o, o, e);
      });
      function Zh(n, e) {
        if (typeof n != "function") throw new yn(E);
        return e = e === o ? e : S(e), C(n, e);
      }
      function Yh(n, e) {
        if (typeof n != "function") throw new yn(E);
        return e = e == null ? 0 : X(S(e), 0), C(function(t) {
          var r = t[e], i = ue(t, 0, e);
          return r && kn(i, r), an(n, this, i);
        });
      }
      function Jh(n, e, t) {
        var r = true, i = true;
        if (typeof n != "function") throw new yn(E);
        return $(t) && (r = "leading" in t ? !!t.leading : r, i = "trailing" in t ? !!t.trailing : i), Vf(n, e, { leading: r, maxWait: e, trailing: i });
      }
      function Xh(n) {
        return Zf(n, 1);
      }
      function Qh(n, e) {
        return xi(ui(e), n);
      }
      function Vh() {
        if (!arguments.length) return [];
        var n = arguments[0];
        return O(n) ? n : [n];
      }
      function kh(n) {
        return wn(n, we);
      }
      function jh(n, e) {
        return e = typeof e == "function" ? e : o, wn(n, we, e);
      }
      function np(n) {
        return wn(n, Xn | we);
      }
      function ep(n, e) {
        return e = typeof e == "function" ? e : o, wn(n, Xn | we, e);
      }
      function tp(n, e) {
        return e == null || Uu(n, e, V(e));
      }
      function On(n, e) {
        return n === e || n !== n && e !== e;
      }
      var rp = Xt(Yr), ip = Xt(function(n, e) {
        return n >= e;
      }), me = Ku(/* @__PURE__ */ function() {
        return arguments;
      }()) ? Ku : function(n) {
        return K(n) && U.call(n, "callee") && !Mu.call(n, "callee");
      }, O = h.isArray, up = cu ? ln(cu) : pl;
      function fn(n) {
        return n != null && ir(n.length) && !Zn(n);
      }
      function z(n) {
        return K(n) && fn(n);
      }
      function fp(n) {
        return n === true || n === false || K(n) && en(n) == $e;
      }
      var fe = wa || bi, op = hu ? ln(hu) : gl;
      function sp(n) {
        return K(n) && n.nodeType === 1 && !lt(n);
      }
      function ap(n) {
        if (n == null) return true;
        if (fn(n) && (O(n) || typeof n == "string" || typeof n.splice == "function" || fe(n) || De(n) || me(n))) return !n.length;
        var e = nn(n);
        if (e == Rn || e == In) return !n.size;
        if (st(n)) return !Qr(n).length;
        for (var t in n) if (U.call(n, t)) return false;
        return true;
      }
      function lp(n, e) {
        return ut(n, e);
      }
      function cp(n, e, t) {
        t = typeof t == "function" ? t : o;
        var r = t ? t(n, e) : o;
        return r === o ? ut(n, e, o, t) : !!r;
      }
      function Ai(n) {
        if (!K(n)) return false;
        var e = en(n);
        return e == dt || e == Bo || typeof n.message == "string" && typeof n.name == "string" && !lt(n);
      }
      function hp(n) {
        return typeof n == "number" && bu(n);
      }
      function Zn(n) {
        if (!$(n)) return false;
        var e = en(n);
        return e == vt || e == Ni || e == Lo || e == Wo;
      }
      function jf(n) {
        return typeof n == "number" && n == S(n);
      }
      function ir(n) {
        return typeof n == "number" && n > -1 && n % 1 == 0 && n <= Qn;
      }
      function $(n) {
        var e = typeof n;
        return n != null && (e == "object" || e == "function");
      }
      function K(n) {
        return n != null && typeof n == "object";
      }
      var no = pu ? ln(pu) : dl;
      function pp(n, e) {
        return n === e || Xr(n, e, hi(e));
      }
      function gp(n, e, t) {
        return t = typeof t == "function" ? t : o, Xr(n, e, hi(e), t);
      }
      function _p(n) {
        return eo(n) && n != +n;
      }
      function dp(n) {
        if (jl(n)) throw new P(I);
        return zu(n);
      }
      function vp(n) {
        return n === null;
      }
      function yp(n) {
        return n == null;
      }
      function eo(n) {
        return typeof n == "number" || K(n) && en(n) == ze;
      }
      function lt(n) {
        if (!K(n) || en(n) != Nn) return false;
        var e = Ct(n);
        if (e === null) return true;
        var t = U.call(e, "constructor") && e.constructor;
        return typeof t == "function" && t instanceof t && Et.call(t) == ga;
      }
      var Ti = gu ? ln(gu) : vl;
      function mp(n) {
        return jf(n) && n >= -Qn && n <= Qn;
      }
      var to = _u ? ln(_u) : yl;
      function ur(n) {
        return typeof n == "string" || !O(n) && K(n) && en(n) == Ye;
      }
      function hn(n) {
        return typeof n == "symbol" || K(n) && en(n) == yt;
      }
      var De = du ? ln(du) : ml;
      function wp(n) {
        return n === o;
      }
      function xp(n) {
        return K(n) && nn(n) == Je;
      }
      function Ap(n) {
        return K(n) && en(n) == Uo;
      }
      var Tp = Xt(Vr), Rp = Xt(function(n, e) {
        return n <= e;
      });
      function ro(n) {
        if (!n) return [];
        if (fn(n)) return ur(n) ? Pn(n) : un(n);
        if (Ve && n[Ve]) return ta(n[Ve]());
        var e = nn(n), t = e == Rn ? Ur : e == In ? Rt : Ue;
        return t(n);
      }
      function Yn(n) {
        if (!n) return n === 0 ? n : 0;
        if (n = Tn(n), n === le || n === -le) {
          var e = n < 0 ? -1 : 1;
          return e * So;
        }
        return n === n ? n : 0;
      }
      function S(n) {
        var e = Yn(n), t = e % 1;
        return e === e ? t ? e - t : e : 0;
      }
      function io(n) {
        return n ? _e(S(n), 0, bn) : 0;
      }
      function Tn(n) {
        if (typeof n == "number") return n;
        if (hn(n)) return gt;
        if ($(n)) {
          var e = typeof n.valueOf == "function" ? n.valueOf() : n;
          n = $(e) ? e + "" : e;
        }
        if (typeof n != "string") return n === 0 ? n : +n;
        n = Au(n);
        var t = us.test(n);
        return t || os.test(n) ? Ns(n.slice(2), t ? 2 : 8) : is.test(n) ? gt : +n;
      }
      function uo(n) {
        return Bn(n, on(n));
      }
      function Ip(n) {
        return n ? _e(S(n), -Qn, Qn) : n === 0 ? n : 0;
      }
      function D(n) {
        return n == null ? "" : cn(n);
      }
      var Pp = Be(function(n, e) {
        if (st(e) || fn(e)) {
          Bn(e, V(e), n);
          return;
        }
        for (var t in e) U.call(e, t) && tt(n, t, e[t]);
      }), fo = Be(function(n, e) {
        Bn(e, on(e), n);
      }), fr = Be(function(n, e, t, r) {
        Bn(e, on(e), n, r);
      }), Ep = Be(function(n, e, t, r) {
        Bn(e, V(e), n, r);
      }), Op = Kn(Kr);
      function Sp(n, e) {
        var t = Le(n);
        return e == null ? t : Du(t, e);
      }
      var Mp = C(function(n, e) {
        n = N(n);
        var t = -1, r = e.length, i = r > 2 ? e[2] : o;
        for (i && tn(e[0], e[1], i) && (r = 1); ++t < r; ) for (var f = e[t], s = on(f), a = -1, c = s.length; ++a < c; ) {
          var g = s[a], _ = n[g];
          (_ === o || On(_, Me[g]) && !U.call(n, g)) && (n[g] = f[g]);
        }
        return n;
      }), Cp = C(function(n) {
        return n.push(o, Tf), an(oo, o, n);
      });
      function bp(n, e) {
        return yu(n, A(e, 3), Ln);
      }
      function Lp(n, e) {
        return yu(n, A(e, 3), Zr);
      }
      function Bp(n, e) {
        return n == null ? n : zr(n, A(e, 3), on);
      }
      function Fp(n, e) {
        return n == null ? n : qu(n, A(e, 3), on);
      }
      function Wp(n, e) {
        return n && Ln(n, A(e, 3));
      }
      function Dp(n, e) {
        return n && Zr(n, A(e, 3));
      }
      function Up(n) {
        return n == null ? [] : Ht(n, V(n));
      }
      function Np(n) {
        return n == null ? [] : Ht(n, on(n));
      }
      function Ri(n, e, t) {
        var r = n == null ? o : de(n, e);
        return r === o ? t : r;
      }
      function Gp(n, e) {
        return n != null && Pf(n, e, al);
      }
      function Ii(n, e) {
        return n != null && Pf(n, e, ll);
      }
      var Hp = yf(function(n, e, t) {
        e != null && typeof e.toString != "function" && (e = Ot.call(e)), n[e] = t;
      }, Ei(sn)), qp = yf(function(n, e, t) {
        e != null && typeof e.toString != "function" && (e = Ot.call(e)), U.call(n, e) ? n[e].push(t) : n[e] = [t];
      }, A), $p = C(it);
      function V(n) {
        return fn(n) ? Fu(n) : Qr(n);
      }
      function on(n) {
        return fn(n) ? Fu(n, true) : wl(n);
      }
      function Kp(n, e) {
        var t = {};
        return e = A(e, 3), Ln(n, function(r, i, f) {
          qn(t, e(r, i, f), r);
        }), t;
      }
      function zp(n, e) {
        var t = {};
        return e = A(e, 3), Ln(n, function(r, i, f) {
          qn(t, i, e(r, i, f));
        }), t;
      }
      var Zp = Be(function(n, e, t) {
        qt(n, e, t);
      }), oo = Be(function(n, e, t, r) {
        qt(n, e, t, r);
      }), Yp = Kn(function(n, e) {
        var t = {};
        if (n == null) return t;
        var r = false;
        e = q(e, function(f) {
          return f = ie(f, n), r || (r = f.length > 1), f;
        }), Bn(n, li(n), t), r && (t = wn(t, Xn | Wi | we, Hl));
        for (var i = e.length; i--; ) ti(t, e[i]);
        return t;
      });
      function Jp(n, e) {
        return so(n, rr(A(e)));
      }
      var Xp = Kn(function(n, e) {
        return n == null ? {} : Al(n, e);
      });
      function so(n, e) {
        if (n == null) return {};
        var t = q(li(n), function(r) {
          return [r];
        });
        return e = A(e), ku(n, t, function(r, i) {
          return e(r, i[0]);
        });
      }
      function Qp(n, e, t) {
        e = ie(e, n);
        var r = -1, i = e.length;
        for (i || (i = 1, n = o); ++r < i; ) {
          var f = n == null ? o : n[Fn(e[r])];
          f === o && (r = i, f = t), n = Zn(f) ? f.call(n) : f;
        }
        return n;
      }
      function Vp(n, e, t) {
        return n == null ? n : ft(n, e, t);
      }
      function kp(n, e, t, r) {
        return r = typeof r == "function" ? r : o, n == null ? n : ft(n, e, t, r);
      }
      var ao = xf(V), lo = xf(on);
      function jp(n, e, t) {
        var r = O(n), i = r || fe(n) || De(n);
        if (e = A(e, 4), t == null) {
          var f = n && n.constructor;
          i ? t = r ? new f() : [] : $(n) ? t = Zn(f) ? Le(Ct(n)) : {} : t = {};
        }
        return (i ? vn : Ln)(n, function(s, a, c) {
          return e(t, s, a, c);
        }), t;
      }
      function ng(n, e) {
        return n == null ? true : ti(n, e);
      }
      function eg(n, e, t) {
        return n == null ? n : rf(n, e, ui(t));
      }
      function tg(n, e, t, r) {
        return r = typeof r == "function" ? r : o, n == null ? n : rf(n, e, ui(t), r);
      }
      function Ue(n) {
        return n == null ? [] : Dr(n, V(n));
      }
      function rg(n) {
        return n == null ? [] : Dr(n, on(n));
      }
      function ig(n, e, t) {
        return t === o && (t = e, e = o), t !== o && (t = Tn(t), t = t === t ? t : 0), e !== o && (e = Tn(e), e = e === e ? e : 0), _e(Tn(n), e, t);
      }
      function ug(n, e, t) {
        return e = Yn(e), t === o ? (t = e, e = 0) : t = Yn(t), n = Tn(n), cl(n, e, t);
      }
      function fg(n, e, t) {
        if (t && typeof t != "boolean" && tn(n, e, t) && (e = t = o), t === o && (typeof e == "boolean" ? (t = e, e = o) : typeof n == "boolean" && (t = n, n = o)), n === o && e === o ? (n = 0, e = 1) : (n = Yn(n), e === o ? (e = n, n = 0) : e = Yn(e)), n > e) {
          var r = n;
          n = e, e = r;
        }
        if (t || n % 1 || e % 1) {
          var i = Lu();
          return j(n + i * (e - n + Us("1e-" + ((i + "").length - 1))), e);
        }
        return jr(n, e);
      }
      var og = Fe(function(n, e, t) {
        return e = e.toLowerCase(), n + (t ? co(e) : e);
      });
      function co(n) {
        return Pi(D(n).toLowerCase());
      }
      function ho(n) {
        return n = D(n), n && n.replace(as, Vs).replace(Os, "");
      }
      function sg(n, e, t) {
        n = D(n), e = cn(e);
        var r = n.length;
        t = t === o ? r : _e(S(t), 0, r);
        var i = t;
        return t -= e.length, t >= 0 && n.slice(t, i) == e;
      }
      function ag(n) {
        return n = D(n), n && $o.test(n) ? n.replace(qi, ks) : n;
      }
      function lg(n) {
        return n = D(n), n && Xo.test(n) ? n.replace(xr, "\\$&") : n;
      }
      var cg = Fe(function(n, e, t) {
        return n + (t ? "-" : "") + e.toLowerCase();
      }), hg = Fe(function(n, e, t) {
        return n + (t ? " " : "") + e.toLowerCase();
      }), pg = _f("toLowerCase");
      function gg(n, e, t) {
        n = D(n), e = S(e);
        var r = e ? Se(n) : 0;
        if (!e || r >= e) return n;
        var i = (e - r) / 2;
        return Jt(Ft(i), t) + n + Jt(Bt(i), t);
      }
      function _g(n, e, t) {
        n = D(n), e = S(e);
        var r = e ? Se(n) : 0;
        return e && r < e ? n + Jt(e - r, t) : n;
      }
      function dg(n, e, t) {
        n = D(n), e = S(e);
        var r = e ? Se(n) : 0;
        return e && r < e ? Jt(e - r, t) + n : n;
      }
      function vg(n, e, t) {
        return t || e == null ? e = 0 : e && (e = +e), Ra(D(n).replace(Ar, ""), e || 0);
      }
      function yg(n, e, t) {
        return (t ? tn(n, e, t) : e === o) ? e = 1 : e = S(e), ni(D(n), e);
      }
      function mg() {
        var n = arguments, e = D(n[0]);
        return n.length < 3 ? e : e.replace(n[1], n[2]);
      }
      var wg = Fe(function(n, e, t) {
        return n + (t ? "_" : "") + e.toLowerCase();
      });
      function xg(n, e, t) {
        return t && typeof t != "number" && tn(n, e, t) && (e = t = o), t = t === o ? bn : t >>> 0, t ? (n = D(n), n && (typeof e == "string" || e != null && !Ti(e)) && (e = cn(e), !e && Oe(n)) ? ue(Pn(n), 0, t) : n.split(e, t)) : [];
      }
      var Ag = Fe(function(n, e, t) {
        return n + (t ? " " : "") + Pi(e);
      });
      function Tg(n, e, t) {
        return n = D(n), t = t == null ? 0 : _e(S(t), 0, n.length), e = cn(e), n.slice(t, t + e.length) == e;
      }
      function Rg(n, e, t) {
        var r = u.templateSettings;
        t && tn(n, e, t) && (e = o), n = D(n), e = fr({}, e, r, Af);
        var i = fr({}, e.imports, r.imports, Af), f = V(i), s = Dr(i, f), a, c, g = 0, _ = e.interpolate || mt, d = "__p += '", y = Nr((e.escape || mt).source + "|" + _.source + "|" + (_ === $i ? rs : mt).source + "|" + (e.evaluate || mt).source + "|$", "g"), x = "//# sourceURL=" + (U.call(e, "sourceURL") ? (e.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Ls + "]") + `
`;
        n.replace(y, function(R, b, B, pn, rn, gn) {
          return B || (B = pn), d += n.slice(g, gn).replace(ls, js), b && (a = true, d += `' +
__e(` + b + `) +
'`), rn && (c = true, d += `';
` + rn + `;
__p += '`), B && (d += `' +
((__t = (` + B + `)) == null ? '' : __t) +
'`), g = gn + R.length, R;
        }), d += `';
`;
        var T = U.call(e, "variable") && e.variable;
        if (!T) d = `with (obj) {
` + d + `
}
`;
        else if (es.test(T)) throw new P(W);
        d = (c ? d.replace(No, "") : d).replace(Go, "$1").replace(Ho, "$1;"), d = "function(" + (T || "obj") + `) {
` + (T ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (a ? ", __e = _.escape" : "") + (c ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + d + `return __p
}`;
        var M = go(function() {
          return F(f, x + "return " + d).apply(o, s);
        });
        if (M.source = d, Ai(M)) throw M;
        return M;
      }
      function Ig(n) {
        return D(n).toLowerCase();
      }
      function Pg(n) {
        return D(n).toUpperCase();
      }
      function Eg(n, e, t) {
        if (n = D(n), n && (t || e === o)) return Au(n);
        if (!n || !(e = cn(e))) return n;
        var r = Pn(n), i = Pn(e), f = Tu(r, i), s = Ru(r, i) + 1;
        return ue(r, f, s).join("");
      }
      function Og(n, e, t) {
        if (n = D(n), n && (t || e === o)) return n.slice(0, Pu(n) + 1);
        if (!n || !(e = cn(e))) return n;
        var r = Pn(n), i = Ru(r, Pn(e)) + 1;
        return ue(r, 0, i).join("");
      }
      function Sg(n, e, t) {
        if (n = D(n), n && (t || e === o)) return n.replace(Ar, "");
        if (!n || !(e = cn(e))) return n;
        var r = Pn(n), i = Tu(r, Pn(e));
        return ue(r, i).join("");
      }
      function Mg(n, e) {
        var t = To, r = Ro;
        if ($(e)) {
          var i = "separator" in e ? e.separator : i;
          t = "length" in e ? S(e.length) : t, r = "omission" in e ? cn(e.omission) : r;
        }
        n = D(n);
        var f = n.length;
        if (Oe(n)) {
          var s = Pn(n);
          f = s.length;
        }
        if (t >= f) return n;
        var a = t - Se(r);
        if (a < 1) return r;
        var c = s ? ue(s, 0, a).join("") : n.slice(0, a);
        if (i === o) return c + r;
        if (s && (a += c.length - a), Ti(i)) {
          if (n.slice(a).search(i)) {
            var g, _ = c;
            for (i.global || (i = Nr(i.source, D(Ki.exec(i)) + "g")), i.lastIndex = 0; g = i.exec(_); ) var d = g.index;
            c = c.slice(0, d === o ? a : d);
          }
        } else if (n.indexOf(cn(i), a) != a) {
          var y = c.lastIndexOf(i);
          y > -1 && (c = c.slice(0, y));
        }
        return c + r;
      }
      function Cg(n) {
        return n = D(n), n && qo.test(n) ? n.replace(Hi, fa) : n;
      }
      var bg = Fe(function(n, e, t) {
        return n + (t ? " " : "") + e.toUpperCase();
      }), Pi = _f("toUpperCase");
      function po(n, e, t) {
        return n = D(n), e = t ? o : e, e === o ? ea(n) ? aa(n) : Zs(n) : n.match(e) || [];
      }
      var go = C(function(n, e) {
        try {
          return an(n, o, e);
        } catch (t) {
          return Ai(t) ? t : new P(t);
        }
      }), Lg = Kn(function(n, e) {
        return vn(e, function(t) {
          t = Fn(t), qn(n, t, wi(n[t], n));
        }), n;
      });
      function Bg(n) {
        var e = n == null ? 0 : n.length, t = A();
        return n = e ? q(n, function(r) {
          if (typeof r[1] != "function") throw new yn(E);
          return [t(r[0]), r[1]];
        }) : [], C(function(r) {
          for (var i = -1; ++i < e; ) {
            var f = n[i];
            if (an(f[0], this, r)) return an(f[1], this, r);
          }
        });
      }
      function Fg(n) {
        return fl(wn(n, Xn));
      }
      function Ei(n) {
        return function() {
          return n;
        };
      }
      function Wg(n, e) {
        return n == null || n !== n ? e : n;
      }
      var Dg = vf(), Ug = vf(true);
      function sn(n) {
        return n;
      }
      function Oi(n) {
        return Zu(typeof n == "function" ? n : wn(n, Xn));
      }
      function Ng(n) {
        return Ju(wn(n, Xn));
      }
      function Gg(n, e) {
        return Xu(n, wn(e, Xn));
      }
      var Hg = C(function(n, e) {
        return function(t) {
          return it(t, n, e);
        };
      }), qg = C(function(n, e) {
        return function(t) {
          return it(n, t, e);
        };
      });
      function Si(n, e, t) {
        var r = V(e), i = Ht(e, r);
        t == null && !($(e) && (i.length || !r.length)) && (t = e, e = n, n = this, i = Ht(e, V(e)));
        var f = !($(t) && "chain" in t) || !!t.chain, s = Zn(n);
        return vn(i, function(a) {
          var c = e[a];
          n[a] = c, s && (n.prototype[a] = function() {
            var g = this.__chain__;
            if (f || g) {
              var _ = n(this.__wrapped__), d = _.__actions__ = un(this.__actions__);
              return d.push({ func: c, args: arguments, thisArg: n }), _.__chain__ = g, _;
            }
            return c.apply(n, kn([this.value()], arguments));
          });
        }), n;
      }
      function $g() {
        return Q._ === this && (Q._ = _a), this;
      }
      function Mi() {
      }
      function Kg(n) {
        return n = S(n), C(function(e) {
          return Qu(e, n);
        });
      }
      var zg = oi(q), Zg = oi(vu), Yg = oi(br);
      function _o(n) {
        return gi(n) ? Lr(Fn(n)) : Tl(n);
      }
      function Jg(n) {
        return function(e) {
          return n == null ? o : de(n, e);
        };
      }
      var Xg = mf(), Qg = mf(true);
      function Ci() {
        return [];
      }
      function bi() {
        return false;
      }
      function Vg() {
        return {};
      }
      function kg() {
        return "";
      }
      function jg() {
        return true;
      }
      function n_(n, e) {
        if (n = S(n), n < 1 || n > Qn) return [];
        var t = bn, r = j(n, bn);
        e = A(e), n -= bn;
        for (var i = Wr(r, e); ++t < n; ) e(t);
        return i;
      }
      function e_(n) {
        return O(n) ? q(n, Fn) : hn(n) ? [n] : un(Ff(D(n)));
      }
      function t_(n) {
        var e = ++pa;
        return D(n) + e;
      }
      var r_ = Yt(function(n, e) {
        return n + e;
      }, 0), i_ = si("ceil"), u_ = Yt(function(n, e) {
        return n / e;
      }, 1), f_ = si("floor");
      function o_(n) {
        return n && n.length ? Gt(n, sn, Yr) : o;
      }
      function s_(n, e) {
        return n && n.length ? Gt(n, A(e, 2), Yr) : o;
      }
      function a_(n) {
        return wu(n, sn);
      }
      function l_(n, e) {
        return wu(n, A(e, 2));
      }
      function c_(n) {
        return n && n.length ? Gt(n, sn, Vr) : o;
      }
      function h_(n, e) {
        return n && n.length ? Gt(n, A(e, 2), Vr) : o;
      }
      var p_ = Yt(function(n, e) {
        return n * e;
      }, 1), g_ = si("round"), __ = Yt(function(n, e) {
        return n - e;
      }, 0);
      function d_(n) {
        return n && n.length ? Fr(n, sn) : 0;
      }
      function v_(n, e) {
        return n && n.length ? Fr(n, A(e, 2)) : 0;
      }
      return u.after = Nh, u.ary = Zf, u.assign = Pp, u.assignIn = fo, u.assignInWith = fr, u.assignWith = Ep, u.at = Op, u.before = Yf, u.bind = wi, u.bindAll = Lg, u.bindKey = Jf, u.castArray = Vh, u.chain = $f, u.chunk = fc, u.compact = oc, u.concat = sc, u.cond = Bg, u.conforms = Fg, u.constant = Ei, u.countBy = dh, u.create = Sp, u.curry = Xf, u.curryRight = Qf, u.debounce = Vf, u.defaults = Mp, u.defaultsDeep = Cp, u.defer = Gh, u.delay = Hh, u.difference = ac, u.differenceBy = lc, u.differenceWith = cc, u.drop = hc, u.dropRight = pc, u.dropRightWhile = gc, u.dropWhile = _c, u.fill = dc, u.filter = yh, u.flatMap = xh, u.flatMapDeep = Ah, u.flatMapDepth = Th, u.flatten = Nf, u.flattenDeep = vc, u.flattenDepth = yc, u.flip = qh, u.flow = Dg, u.flowRight = Ug, u.fromPairs = mc, u.functions = Up, u.functionsIn = Np, u.groupBy = Rh, u.initial = xc, u.intersection = Ac, u.intersectionBy = Tc, u.intersectionWith = Rc, u.invert = Hp, u.invertBy = qp, u.invokeMap = Ph, u.iteratee = Oi, u.keyBy = Eh, u.keys = V, u.keysIn = on, u.map = nr, u.mapKeys = Kp, u.mapValues = zp, u.matches = Ng, u.matchesProperty = Gg, u.memoize = tr, u.merge = Zp, u.mergeWith = oo, u.method = Hg, u.methodOf = qg, u.mixin = Si, u.negate = rr, u.nthArg = Kg, u.omit = Yp, u.omitBy = Jp, u.once = $h, u.orderBy = Oh, u.over = zg, u.overArgs = Kh, u.overEvery = Zg, u.overSome = Yg, u.partial = xi, u.partialRight = kf, u.partition = Sh, u.pick = Xp, u.pickBy = so, u.property = _o, u.propertyOf = Jg, u.pull = Oc, u.pullAll = Hf, u.pullAllBy = Sc, u.pullAllWith = Mc, u.pullAt = Cc, u.range = Xg, u.rangeRight = Qg, u.rearg = zh, u.reject = bh, u.remove = bc, u.rest = Zh, u.reverse = yi, u.sampleSize = Bh, u.set = Vp, u.setWith = kp, u.shuffle = Fh, u.slice = Lc, u.sortBy = Uh, u.sortedUniq = Gc, u.sortedUniqBy = Hc, u.split = xg, u.spread = Yh, u.tail = qc, u.take = $c, u.takeRight = Kc, u.takeRightWhile = zc, u.takeWhile = Zc, u.tap = oh, u.throttle = Jh, u.thru = jt, u.toArray = ro, u.toPairs = ao, u.toPairsIn = lo, u.toPath = e_, u.toPlainObject = uo, u.transform = jp, u.unary = Xh, u.union = Yc, u.unionBy = Jc, u.unionWith = Xc, u.uniq = Qc, u.uniqBy = Vc, u.uniqWith = kc, u.unset = ng, u.unzip = mi, u.unzipWith = qf, u.update = eg, u.updateWith = tg, u.values = Ue, u.valuesIn = rg, u.without = jc, u.words = po, u.wrap = Qh, u.xor = nh, u.xorBy = eh, u.xorWith = th, u.zip = rh, u.zipObject = ih, u.zipObjectDeep = uh, u.zipWith = fh, u.entries = ao, u.entriesIn = lo, u.extend = fo, u.extendWith = fr, Si(u, u), u.add = r_, u.attempt = go, u.camelCase = og, u.capitalize = co, u.ceil = i_, u.clamp = ig, u.clone = kh, u.cloneDeep = np, u.cloneDeepWith = ep, u.cloneWith = jh, u.conformsTo = tp, u.deburr = ho, u.defaultTo = Wg, u.divide = u_, u.endsWith = sg, u.eq = On, u.escape = ag, u.escapeRegExp = lg, u.every = vh, u.find = mh, u.findIndex = Df, u.findKey = bp, u.findLast = wh, u.findLastIndex = Uf, u.findLastKey = Lp, u.floor = f_, u.forEach = Kf, u.forEachRight = zf, u.forIn = Bp, u.forInRight = Fp, u.forOwn = Wp, u.forOwnRight = Dp, u.get = Ri, u.gt = rp, u.gte = ip, u.has = Gp, u.hasIn = Ii, u.head = Gf, u.identity = sn, u.includes = Ih, u.indexOf = wc, u.inRange = ug, u.invoke = $p, u.isArguments = me, u.isArray = O, u.isArrayBuffer = up, u.isArrayLike = fn, u.isArrayLikeObject = z, u.isBoolean = fp, u.isBuffer = fe, u.isDate = op, u.isElement = sp, u.isEmpty = ap, u.isEqual = lp, u.isEqualWith = cp, u.isError = Ai, u.isFinite = hp, u.isFunction = Zn, u.isInteger = jf, u.isLength = ir, u.isMap = no, u.isMatch = pp, u.isMatchWith = gp, u.isNaN = _p, u.isNative = dp, u.isNil = yp, u.isNull = vp, u.isNumber = eo, u.isObject = $, u.isObjectLike = K, u.isPlainObject = lt, u.isRegExp = Ti, u.isSafeInteger = mp, u.isSet = to, u.isString = ur, u.isSymbol = hn, u.isTypedArray = De, u.isUndefined = wp, u.isWeakMap = xp, u.isWeakSet = Ap, u.join = Ic, u.kebabCase = cg, u.last = An, u.lastIndexOf = Pc, u.lowerCase = hg, u.lowerFirst = pg, u.lt = Tp, u.lte = Rp, u.max = o_, u.maxBy = s_, u.mean = a_, u.meanBy = l_, u.min = c_, u.minBy = h_, u.stubArray = Ci, u.stubFalse = bi, u.stubObject = Vg, u.stubString = kg, u.stubTrue = jg, u.multiply = p_, u.nth = Ec, u.noConflict = $g, u.noop = Mi, u.now = er, u.pad = gg, u.padEnd = _g, u.padStart = dg, u.parseInt = vg, u.random = fg, u.reduce = Mh, u.reduceRight = Ch, u.repeat = yg, u.replace = mg, u.result = Qp, u.round = g_, u.runInContext = l, u.sample = Lh, u.size = Wh, u.snakeCase = wg, u.some = Dh, u.sortedIndex = Bc, u.sortedIndexBy = Fc, u.sortedIndexOf = Wc, u.sortedLastIndex = Dc, u.sortedLastIndexBy = Uc, u.sortedLastIndexOf = Nc, u.startCase = Ag, u.startsWith = Tg, u.subtract = __, u.sum = d_, u.sumBy = v_, u.template = Rg, u.times = n_, u.toFinite = Yn, u.toInteger = S, u.toLength = io, u.toLower = Ig, u.toNumber = Tn, u.toSafeInteger = Ip, u.toString = D, u.toUpper = Pg, u.trim = Eg, u.trimEnd = Og, u.trimStart = Sg, u.truncate = Mg, u.unescape = Cg, u.uniqueId = t_, u.upperCase = bg, u.upperFirst = Pi, u.each = Kf, u.eachRight = zf, u.first = Gf, Si(u, function() {
        var n = {};
        return Ln(u, function(e, t) {
          U.call(u.prototype, t) || (n[t] = e);
        }), n;
      }(), { chain: false }), u.VERSION = v, vn(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(n) {
        u[n].placeholder = u;
      }), vn(["drop", "take"], function(n, e) {
        L.prototype[n] = function(t) {
          t = t === o ? 1 : X(S(t), 0);
          var r = this.__filtered__ && !e ? new L(this) : this.clone();
          return r.__filtered__ ? r.__takeCount__ = j(t, r.__takeCount__) : r.__views__.push({ size: j(t, bn), type: n + (r.__dir__ < 0 ? "Right" : "") }), r;
        }, L.prototype[n + "Right"] = function(t) {
          return this.reverse()[n](t).reverse();
        };
      }), vn(["filter", "map", "takeWhile"], function(n, e) {
        var t = e + 1, r = t == Ui || t == Oo;
        L.prototype[n] = function(i) {
          var f = this.clone();
          return f.__iteratees__.push({ iteratee: A(i, 3), type: t }), f.__filtered__ = f.__filtered__ || r, f;
        };
      }), vn(["head", "last"], function(n, e) {
        var t = "take" + (e ? "Right" : "");
        L.prototype[n] = function() {
          return this[t](1).value()[0];
        };
      }), vn(["initial", "tail"], function(n, e) {
        var t = "drop" + (e ? "" : "Right");
        L.prototype[n] = function() {
          return this.__filtered__ ? new L(this) : this[t](1);
        };
      }), L.prototype.compact = function() {
        return this.filter(sn);
      }, L.prototype.find = function(n) {
        return this.filter(n).head();
      }, L.prototype.findLast = function(n) {
        return this.reverse().find(n);
      }, L.prototype.invokeMap = C(function(n, e) {
        return typeof n == "function" ? new L(this) : this.map(function(t) {
          return it(t, n, e);
        });
      }), L.prototype.reject = function(n) {
        return this.filter(rr(A(n)));
      }, L.prototype.slice = function(n, e) {
        n = S(n);
        var t = this;
        return t.__filtered__ && (n > 0 || e < 0) ? new L(t) : (n < 0 ? t = t.takeRight(-n) : n && (t = t.drop(n)), e !== o && (e = S(e), t = e < 0 ? t.dropRight(-e) : t.take(e - n)), t);
      }, L.prototype.takeRightWhile = function(n) {
        return this.reverse().takeWhile(n).reverse();
      }, L.prototype.toArray = function() {
        return this.take(bn);
      }, Ln(L.prototype, function(n, e) {
        var t = /^(?:filter|find|map|reject)|While$/.test(e), r = /^(?:head|last)$/.test(e), i = u[r ? "take" + (e == "last" ? "Right" : "") : e], f = r || /^find/.test(e);
        i && (u.prototype[e] = function() {
          var s = this.__wrapped__, a = r ? [1] : arguments, c = s instanceof L, g = a[0], _ = c || O(s), d = function(b) {
            var B = i.apply(u, kn([b], a));
            return r && y ? B[0] : B;
          };
          _ && t && typeof g == "function" && g.length != 1 && (c = _ = false);
          var y = this.__chain__, x = !!this.__actions__.length, T = f && !y, M = c && !x;
          if (!f && _) {
            s = M ? s : new L(this);
            var R = n.apply(s, a);
            return R.__actions__.push({ func: jt, args: [d], thisArg: o }), new mn(R, y);
          }
          return T && M ? n.apply(this, a) : (R = this.thru(d), T ? r ? R.value()[0] : R.value() : R);
        });
      }), vn(["pop", "push", "shift", "sort", "splice", "unshift"], function(n) {
        var e = It[n], t = /^(?:push|sort|unshift)$/.test(n) ? "tap" : "thru", r = /^(?:pop|shift)$/.test(n);
        u.prototype[n] = function() {
          var i = arguments;
          if (r && !this.__chain__) {
            var f = this.value();
            return e.apply(O(f) ? f : [], i);
          }
          return this[t](function(s) {
            return e.apply(O(s) ? s : [], i);
          });
        };
      }), Ln(L.prototype, function(n, e) {
        var t = u[e];
        if (t) {
          var r = t.name + "";
          U.call(be, r) || (be[r] = []), be[r].push({ name: e, func: t });
        }
      }), be[Zt(o, ae).name] = [{ name: "wrapper", func: o }], L.prototype.clone = Ca, L.prototype.reverse = ba, L.prototype.value = La, u.prototype.at = sh, u.prototype.chain = ah, u.prototype.commit = lh, u.prototype.next = ch, u.prototype.plant = ph, u.prototype.reverse = gh, u.prototype.toJSON = u.prototype.valueOf = u.prototype.value = _h, u.prototype.first = u.prototype.head, Ve && (u.prototype[Ve] = hh), u;
    }, ne = la();
    typeof define == "function" && typeof define.amd == "object" && define.amd ? (Q._ = ne, define(function() {
      return ne;
    })) : ce ? ((ce.exports = ne)._ = ne, Or._ = ne) : Q._ = ne;
  }).call(Ne);
});
var oe = class extends Set {
  constructor(w, I = false) {
    super(w);
    this.valuesAsFlags = I;
  }
};
function Wn(o) {
  if (o instanceof Map) return Object.fromEntries([...o.entries()].map(([v, w]) => [v, Wn(w)]));
  if (o instanceof Set) return Array.from(o.values()).map(Wn);
  if (o instanceof oe) return { values: [...o.values()], valuesAsFlags: o.valuesAsFlags };
  if (typeof o == "object") {
    let v = {};
    return Object.entries(o).forEach(([w, I]) => {
      v[w] = Wn(I);
    }), v;
  } else return o;
}
var sr = Li(or(), 1);
var wo = Li(or(), 1);
function se(o, v) {
  if (typeof o != "object") throw new Error(`Cannot merge into non-object objectToMergeWith. Received: ${JSON.stringify(o)}`);
  if (typeof v != "object") throw new Error(`Cannot merge using non-object objectToMergeWith. Received: ${JSON.stringify(v)}`);
  let w = (0, wo.cloneDeep)(o);
  for (let [I, E] of Object.entries(v)) typeof E != "object" || E instanceof Set || w[I] === void 0 ? w[I] = E : w[I] = se(w[I], E);
  return w;
}
function Bi(o, v) {
  if (!(o === void 0 || typeof o != "object")) for (let w of Object.keys(o)) {
    if (w === v) return o[w];
    let I = o[w];
    if (typeof I == "object") {
      let E = Bi(I, v);
      if (E !== void 0) return E;
    }
  }
}
var ar = "@composite:";
var xo = "@inherit:";
var lr = class {
  constructor(v, w, I) {
    this.tiledClassToMembersMap = v;
    this.enumNameToValuesMap = w;
    this.parserOptions = I;
    this.memoiser = /* @__PURE__ */ new Map();
  }
  flattenMembers(v, w) {
    return this.memoiser.has(v) ? { [v]: this.memoiser.get(v) } : (this.memoiser.set(v, w.reduce((I, E) => ({ ...I, ...this.flattenMemberProperty(E) }), {})), { [v]: this.memoiser.get(v) });
  }
  flattenMemberProperty(v) {
    let w = v.propertyType ?? v.propertytype;
    if (v.type === "class") {
      if (!this.memoiser.has(w)) {
        let W = this.tiledClassToMembersMap.get(w).reduce((Y, Dn) => se(this.flattenMemberProperty(Dn), Y), {});
        this.memoiser.set(w, W);
      }
      let I = this.memoiser.get(w), E = se(I, this.flattenValue(v.value, I));
      return this.checkIfShouldFlatten(v.name) ? E : { [v.name.replace(ar, "")]: E };
    } else return this.enumNameToValuesMap.has(w) ? this.enumNameToValuesMap.get(w).valuesAsFlags ? { [v.name]: new Set(v.value.split(",").filter((I) => I !== "")) } : { [v.name]: v.value } : { [v.name]: v.value };
  }
  get memoisedFlattenedProperties() {
    return this.memoiser;
  }
  flattenValue(v, w) {
    return Object.entries(v).reduce((I, [E, W]) => {
      if (typeof W != "object") return Bi(w, E) instanceof Set ? se({ [E]: new Set(W.split(",").filter((Dn) => Dn !== "")) }, I) : se({ [E]: W }, I);
      if (this.checkIfShouldFlatten(E)) return se(this.flattenValue(W, w), I);
      {
        let Y = E.replace(ar, "");
        return se({ [Y]: this.flattenValue(W, w) }, I);
      }
    }, {});
  }
  checkIfShouldFlatten(v) {
    return this.parserOptions?.defaultComposite === true ? v.startsWith(xo) : !v.startsWith(ar);
  }
};
var Fi = Li(or(), 1);
var He = class {
  constructor(v) {
    this.flattener = v;
  }
  flattenPropertiesOnObject(v) {
    return { ...this.flattener.memoisedFlattenedProperties.get(v.class ?? v.type), ...v.properties?.reduce((w, I) => ({ ...w, ...this.flattener.flattenMemberProperty(I) }), {}), name: v.name, id: v.id, class: v.class ?? v.type ?? null, x: v.x, y: v.y };
  }
  flattenPropertiesOnTile(v) {
    return { ...this.flattener.memoisedFlattenedProperties.get(v.class ?? v.type), ...v.properties?.reduce((w, I) => ({ ...w, ...this.flattener.flattenMemberProperty(I) }), {}), id: v.id, class: v.class ?? v.type ?? null };
  }
  getCustomTypesMap() {
    return new Map([...this.flattener.memoisedFlattenedProperties.entries()].map(([v, w]) => [v, (0, Fi.cloneDeep)(w)]));
  }
  getEnumsMap() {
    return new Map([...this.flattener.enumNameToValuesMap.entries()].map(([v, w]) => [v, (0, Fi.cloneDeep)(w)]));
  }
  toJSON() {
    return JSON.stringify({ customTypes: Wn(this.getCustomTypesMap()), enums: Wn(this.getEnumsMap()) }, null, 4);
  }
};
function Ao(o, v) {
  let w = new Map(o.propertyTypes.filter((W) => W.type === "enum").map((W) => [W.name, new oe(W.values, W.valuesAsFlags)])), I = new Map(o.propertyTypes.filter((W) => W.type === "class").map((W) => [W.name, W.members])), E = new lr(I, w, v);
  return I.forEach((W, Y) => {
    E.flattenMembers(Y, W);
  }), new He(E);
}
var Q_ = { parse: Ao };

// src/GridTilemap/Phaser/PhaserTile.ts
var PhaserTile = class {
  constructor(phaserTile, tiledProject) {
    this.phaserTile = phaserTile;
    this.tiledProject = tiledProject;
  }
  getProperty(name) {
    const inheritedTileProps = {};
    if (this.tiledProject) {
      const parsedProject = Q_.parse(this.tiledProject);
      const type = this.getType();
      if (type) {
        const inheritedProps = parsedProject.getCustomTypesMap()?.get(type);
        if (inheritedProps) {
          for (const [key, val] of Object.entries(inheritedProps)) {
            inheritedTileProps[key] = val;
          }
        }
      }
    }
    const tileProps = this.phaserTile.properties;
    return tileProps[name] ?? inheritedTileProps[name];
  }
  hasProperty(name) {
    return this.getProperty(name) != void 0;
  }
  getType() {
    return this.phaserTile.tileset?.tileData[this.phaserTile.index - 1]?.type;
  }
};

// src/GridTilemap/Phaser/PhaserTileLayer.ts
var PhaserTileLayer = class {
  constructor(phaserTilemapLayer, tiledProject) {
    this.phaserTilemapLayer = phaserTilemapLayer;
    this.tiledProject = tiledProject;
  }
  getName() {
    return this.phaserTilemapLayer.layer.name;
  }
  getProperty(name) {
    const layerProps = this.phaserTilemapLayer.layer.properties;
    const prop = layerProps?.find((el) => el.name == name);
    return prop?.value;
  }
  hasProperty(name) {
    return this.getProperty(name) != void 0;
  }
  isCharLayer() {
    return this.hasProperty(CHAR_LAYER_PROP_NAME);
  }
  getData() {
    return this.phaserTilemapLayer.layer.data.map(
      (d) => d.map((dc) => new PhaserTile(dc, this.tiledProject))
    );
  }
};

// src/GridTilemap/Phaser/PhaserTilemap.ts
var PhaserTilemap = class {
  constructor(phaserTilemap, tiledProject) {
    this.phaserTilemap = phaserTilemap;
    this.tiledProject = tiledProject;
    for (const l of this.phaserTilemap.layers) {
      if (l.tilemapLayer == null) {
        throw new Error(
          `Error initializing tilemap. Layer '${l.name}' has no 'tilemapLayer'. This can happen if you call 'createLayer' with the wrong layer ID.`
        );
      }
    }
  }
  getTileWidth() {
    return this.phaserTilemap.tileWidth;
  }
  getTileHeight() {
    return this.phaserTilemap.tileHeight;
  }
  getWidth() {
    return this.phaserTilemap.width;
  }
  getHeight() {
    return this.phaserTilemap.height;
  }
  getOrientation() {
    if (this.phaserTilemap.orientation == Phaser.Tilemaps.Orientation.ISOMETRIC.toString()) {
      return "isometric";
    }
    return "orthogonal";
  }
  getLayers() {
    return this.phaserTilemap.layers.map(
      (l) => new PhaserTileLayer(l.tilemapLayer, this.tiledProject)
    );
  }
  hasTileAt(x, y, layer) {
    return !!this.phaserTilemap.hasTileAt(x, y, layer);
  }
  getTileAt(x, y, layer) {
    const phaserTile = this.phaserTilemap.getTileAt(x, y, false, layer);
    if (!phaserTile) return void 0;
    return new PhaserTile(phaserTile, this.tiledProject);
  }
};

// src/GridTilemap/ArrayTilemap/ArrayTilemap.ts
var ArrayTilemap = class {
  constructor(map3, orientation = "orthogonal", collisionPropertyName = "ge_collide") {
    this.map = map3;
    this.orientation = orientation;
    this.layerMap = /* @__PURE__ */ new Map();
    this.layers = [];
    let width = -1;
    let height = -1;
    Object.entries(map3).map(([name, layer]) => {
      const newWidth = layer.data[0]?.length;
      const newHeight = layer.data.length;
      if (width !== -1 && width !== newWidth || height !== -1 && height !== newHeight) {
        throw new Error("All tilemap layers must have the same dimensions.");
      }
      width = newWidth;
      height = newHeight;
      const tiles = [];
      for (let r = 0; r < layer.data.length; r++) {
        const row = [];
        for (let c = 0; c < layer.data[r].length; c++) {
          const tile = new ArrayTile(
            layer.data[r][c] === 1,
            collisionPropertyName
          );
          row.push(tile);
        }
        tiles.push(row);
      }
      const arrayLayer = new ArrayTileLayer(name, tiles, layer.isCharLayer);
      this.layers.push(arrayLayer);
      this.layerMap.set(name, arrayLayer);
    });
  }
  getWidth() {
    return Object.values(this.map)[0]?.data[0]?.length || 0;
  }
  getHeight() {
    return Object.values(this.map)[0]?.data.length || 0;
  }
  getOrientation() {
    return this.orientation;
  }
  getLayers() {
    return this.layers;
  }
  hasTileAt(x, y, layer) {
    if (!layer) return false;
    const l = this.layerMap.get(layer);
    if (!l) return false;
    return x >= 0 && x < this.getWidth() && y >= 0 && y < this.getHeight();
  }
  getTileAt(x, y, layer) {
    if (!layer) return void 0;
    const l = this.layerMap.get(layer);
    if (!l) return void 0;
    return l.getData()[y][x];
  }
};
var ArrayTileLayer = class {
  constructor(name, tiles, isCharLayer = false) {
    this.name = name;
    this.tiles = tiles;
    this.isCharLayerInternal = isCharLayer;
  }
  getName() {
    return this.name;
  }
  getProperty(name) {
    if (name === "ge_charLayer" && this.isCharLayerInternal) {
      return this.name;
    }
  }
  hasProperty(name) {
    return name === "ge_charLayer" && this.isCharLayerInternal;
  }
  getData() {
    return this.tiles;
  }
  isCharLayer() {
    return this.isCharLayerInternal;
  }
};
var ArrayTile = class {
  constructor(isBlocking, collisionPropertyName) {
    this.isBlocking = isBlocking;
    this.collisionPropertyName = collisionPropertyName;
  }
  getProperty(name) {
    if (name === this.collisionPropertyName) {
      return this.isBlocking;
    }
    return false;
  }
  hasProperty(name) {
    return name === this.collisionPropertyName;
  }
};

// src/GridTilemap/TiledTilemap/TiledTile.ts
var TiledTile = class {
  constructor(tilesets, tileId) {
    this.props = {};
    const correctTileset = tilesets.find((ts) => {
      if (!ts.tiles) return false;
      const offset = ts.firstgid ?? 0;
      const tid = ts.tiles.find((t) => t.id + offset === tileId);
      if (tid) return true;
      return false;
    });
    if (!correctTileset) {
      return;
    }
    const tilesetTile = correctTileset.tiles?.find((t) => {
      return t.id + (correctTileset.firstgid ?? 0) === tileId;
    });
    if (tilesetTile?.properties) {
      for (const prop of tilesetTile.properties) {
        if (prop.name) {
          this.props[prop.name] = prop.value;
        }
      }
    }
  }
  getProperty(name) {
    return this.props[name];
  }
  hasProperty(name) {
    return this.props[name] !== void 0;
  }
};

// src/GridTilemap/TiledTilemap/TiledLayer.ts
var TiledLayer = class {
  constructor(tilesets, layer) {
    this.layer = layer;
    this.data = [];
    this.data = [];
    if (this.layer.data) {
      for (let r = 0; r < (this.layer.height || 0); r++) {
        const row = [];
        for (let c = 0; c < (this.layer.width || 0); c++) {
          const t = this.layer.data[r * (this.layer.width || 0) + c];
          if (t !== void 0) {
            row.push(new TiledTile(tilesets, t));
          } else {
            row.push(void 0);
          }
        }
        this.data.push(row);
      }
    }
  }
  getName() {
    return this.layer.name;
  }
  getProperty(name) {
    return this.layer.properties?.find((p) => p.name === name)?.value;
  }
  hasProperty(name) {
    return this.getProperty(name) !== void 0;
  }
  getData() {
    return this.data;
  }
  isCharLayer() {
    return this.hasProperty("ge_charLayer");
  }
};

// src/GridTilemap/TiledTilemap/TiledTilemap.ts
var TiledTilemap = class {
  constructor(rawTilemap) {
    this.rawTilemap = rawTilemap;
    this.layers = [];
    this.layers = this.rawTilemap.layers?.map(
      (l) => new TiledLayer(this.rawTilemap.tilesets, l)
    );
  }
  hasTileAt(x, y, layer) {
    if (x < 0 || x >= this.rawTilemap.width) return false;
    if (y < 0 || y >= this.rawTilemap.height) return false;
    if (!this.rawTilemap.layers) return false;
    const tilemapLayer = this.rawTilemap.layers.find((l) => l.name === layer);
    if (!tilemapLayer) return false;
    const linearPos = y * this.rawTilemap.width + x;
    return tilemapLayer.data[linearPos] > 0;
  }
  getTileAt(x, y, layer) {
    if (x < 0 || x >= this.rawTilemap.width) return void 0;
    if (y < 0 || y >= this.rawTilemap.height) return void 0;
    if (!this.rawTilemap.layers) return void 0;
    const tilemapLayer = this.layers.find(
      (l) => l.getName() === layer
    );
    if (!tilemapLayer) return void 0;
    return tilemapLayer.getData()[y][x];
  }
  getOrientation() {
    return this.rawTilemap.orientation;
  }
  getLayers() {
    return this.layers;
  }
  getWidth() {
    return this.rawTilemap.width;
  }
  getHeight() {
    return this.rawTilemap.height;
  }
};

// src/GridEngine.ts
var GridEngine = class _GridEngine {
  /**
   * Should only be called by Phaser and never directly.
   * @internal
   */
  constructor(scene) {
    this.scene = scene;
    this.geHeadless = new GridEngineHeadless(false);
    this.isCreatedInternal = false;
    if (!_GridEngine.welcomeMessagePrinted) {
      console.log(`Using GridEngine Phaser Plugin v${version}`);
      _GridEngine.welcomeMessagePrinted = true;
    }
    this.scene.sys.events.once("boot", this.boot, this);
  }
  static {
    this.welcomeMessagePrinted = false;
  }
  /** @internal */
  boot() {
    this.scene.sys.events.on("update", this.update, this);
  }
  /**
   * {@inheritDoc IGridEngine.getCharLayer}
   *
   * @category Character
   */
  getCharLayer(charId) {
    return this.geHeadless.getCharLayer(charId);
  }
  /**
   * {@inheritDoc IGridEngine.getTransition}
   *
   * @category Tilemap
   */
  getTransition(position, fromLayer) {
    return this.geHeadless.getTransition(position, fromLayer);
  }
  /**
   * {@inheritDoc IGridEngine.setTransition}
   *
   * @category Tilemap
   */
  setTransition(position, fromLayer, toLayer) {
    this.geHeadless.setTransition(position, fromLayer, toLayer);
  }
  /**
   * Initializes GridEngine. Must be called before any other methods of
   * GridEngine are called.
   *
   * @category Grid Engine
   */
  create(tilemap, config) {
    this.geHeadless.create(
      new PhaserTilemap(tilemap, config.tiledProject),
      config
    );
    this.isCreatedInternal = true;
    this.gridCharacters = /* @__PURE__ */ new Map();
    const concreteConfig = this.setConfigDefaults(config);
    this.config = concreteConfig;
    this.gridTilemap = new GridTilemapPhaser(tilemap);
    this.addCharacters();
  }
  /**
   * {@inheritDoc IGridEngine.getPosition}
   *
   * @category Character
   */
  getPosition(charId) {
    return this.geHeadless.getPosition(charId);
  }
  /**
   * {@inheritDoc IGridEngine.move}
   *
   * @category Basic Movement
   */
  move(charId, direction) {
    this.geHeadless.move(charId, direction);
  }
  /**
   * {@inheritDoc IGridEngine.moveRandomly}
   *
   * @category Random Movement
   */
  moveRandomly(charId, delay = 0, radius = -1) {
    this.geHeadless.moveRandomly(charId, delay, radius);
  }
  /**
   * {@inheritDoc IGridEngine.getMovement}
   *
   * @category Character
   */
  getMovement(charId) {
    return this.geHeadless.getMovement(charId);
  }
  /**
   * {@inheritDoc IGridEngine.moveTo}
   *
   * @category Pathfinding
   */
  moveTo(charId, targetPos, config) {
    return this.geHeadless.moveTo(charId, targetPos, config);
  }
  /**
   * {@inheritDoc IGridEngine.stopMovement}
   *
   * @category Basic Movement
   */
  stopMovement(charId) {
    this.geHeadless.stopMovement(charId);
  }
  /**
   * {@inheritDoc IGridEngine.setSpeed}
   *
   * @category Character
   */
  setSpeed(charId, speed) {
    this.geHeadless.setSpeed(charId, speed);
  }
  /**
   * {@inheritDoc IGridEngine.getSpeed}
   *
   * @category Character
   */
  getSpeed(charId) {
    return this.geHeadless.getSpeed(charId);
  }
  /**
   * Sets the container for a character.
   *
   * @category Character
   */
  setContainer(charId, container) {
    this.initGuard();
    const gridCharPhaser = this.gridCharacters?.get(charId);
    if (!gridCharPhaser) throw this.createCharUnknownErr(charId);
    gridCharPhaser.setContainer(container);
  }
  /**
   * @returns Container for a character.
   *
   * @category Character
   */
  getContainer(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getContainer();
  }
  /**
   * @returns X-offset for a character.
   *
   * @category Character
   */
  getOffsetX(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getOffsetX();
  }
  /**
   * Set custom x-offset for the sprite/container.
   *
   * @category Character
   */
  setOffsetX(charId, offsetX) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.setOffsetX(offsetX);
  }
  /**
   * @returns Y-offset for a character.
   *
   * @category Character
   */
  getOffsetY(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getOffsetY();
  }
  /**
   * Set custom y-offset for the sprite/container.
   *
   * @category Character
   */
  setOffsetY(charId, offsetY) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.setOffsetY(offsetY);
  }
  /**
   * @returns depth-offset for a character.
   *
   * @category Character
   */
  getDepthOffset(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getDepthOffset();
  }
  /**
   * {@inheritDoc IGridEngine.collidesWithTiles}
   *
   * @category Character
   */
  collidesWithTiles(charId) {
    return this.geHeadless.collidesWithTiles(charId);
  }
  /**
   * @returns {@link WalkingAnimationMapping} for a character. If a character
   * index was set, it will be returned instead.
   *
   * @category Character
   */
  getWalkingAnimationMapping(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    const animation = gridChar.getAnimation();
    return animation?.getWalkingAnimationMapping();
  }
  /**
   * @returns `true` if {@link https://annoraaq.github.io/grid-engine/p/layer-overlay/ | layer overlay}
   * is activated.
   *
   * @category Grid Engine
   */
  hasLayerOverlay() {
    this.initGuard();
    return !!this.config?.layerOverlay;
  }
  /**
   * Sets the {@link WalkingAnimationMapping} for a character. Alternatively you
   * can provide a number which is the character index (see also
   * {@link CharacterData | Character Config}). If you provide `undefined`, it
   * will disable walking animations for the character.
   *
   * @category Character
   */
  setWalkingAnimationMapping(charId, walkingAnimationMapping) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    const animation = gridChar.getAnimation();
    animation?.setWalkingAnimationMapping(walkingAnimationMapping);
  }
  /** @internal */
  update(time, delta) {
    if (this.isCreatedInternal && this.gridCharacters) {
      for (const [_key, gridChar] of this.gridCharacters) {
        gridChar.update(delta);
      }
    }
    this.geHeadless.update(time, delta);
  }
  /**
   * Adds a character after calling {@link create}.
   *
   * @category Grid Engine
   */
  addCharacter(charData) {
    this.geHeadless.addCharacter(charData);
    this.addCharacterInternal(charData);
  }
  /**
   * {@inheritDoc IGridEngine.hasCharacter}
   *
   * @category Grid Engine
   */
  hasCharacter(charId) {
    return this.geHeadless.hasCharacter(charId);
  }
  /**
   * {@inheritDoc IGridEngine.removeCharacter}
   *
   * @category Grid Engine
   */
  removeCharacter(charId) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.destroy();
    this.gridCharacters?.delete(charId);
    this.geHeadless.removeCharacter(charId);
  }
  /**
   * {@inheritDoc IGridEngine.removeAllCharacters}
   *
   * @category Grid Engine
   */
  removeAllCharacters() {
    this.initGuard();
    if (!this.gridCharacters) return;
    for (const charId of this.gridCharacters.keys()) {
      this.removeCharacter(charId);
    }
    this.geHeadless.removeAllCharacters();
  }
  /**
   * {@inheritDoc IGridEngine.getAllCharacters}
   *
   * @category Character
   */
  getAllCharacters(options) {
    return this.geHeadless.getAllCharacters(options);
  }
  /**
   * {@inheritDoc IGridEngine.getLabels}
   *
   * @category Character
   */
  getLabels(charId) {
    return this.geHeadless.getLabels(charId);
  }
  /**
   * {@inheritDoc IGridEngine.addLabels}
   *
   * @category Character
   */
  addLabels(charId, labels) {
    this.geHeadless.addLabels(charId, labels);
  }
  /**
   * {@inheritDoc IGridEngine.removeLabels}
   *
   * @category Character
   */
  removeLabels(charId, labels) {
    this.geHeadless.removeLabels(charId, labels);
  }
  /**
   * {@inheritDoc IGridEngine.clearLabels}
   *
   * @category Character
   */
  clearLabels(charId) {
    this.geHeadless.clearLabels(charId);
  }
  follow(charId, charIdToFollow, distance, closestPointIfBlocked) {
    let options;
    if (distance === void 0) {
      options = {
        distance: 0,
        closestPointIfBlocked: false
      };
    } else if (typeof distance === "number") {
      options = {
        distance,
        closestPointIfBlocked: false
      };
      if (closestPointIfBlocked) {
        options.closestPointIfBlocked = true;
      }
    } else {
      options = distance;
    }
    this.geHeadless.follow(charId, charIdToFollow, options);
  }
  /**
   * {@inheritDoc IGridEngine.isMoving}
   *
   * @category Character
   */
  isMoving(charId) {
    return this.geHeadless.isMoving(charId);
  }
  /**
   * {@inheritDoc IGridEngine.getFacingDirection}
   *
   * @category Character
   */
  getFacingDirection(charId) {
    return this.geHeadless.getFacingDirection(charId);
  }
  /**
   * {@inheritDoc IGridEngine.getFacingPosition}
   *
   * @category Character
   */
  getFacingPosition(charId) {
    return this.geHeadless.getFacingPosition(charId);
  }
  /**
   * {@inheritDoc IGridEngine.turnTowards}
   *
   * @category Basic Movement
   */
  turnTowards(charId, direction) {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.turnTowards(direction);
    this.geHeadless.turnTowards(charId, direction);
  }
  /**
   * {@inheritDoc IGridEngine.getCharactersAt}
   *
   * @category Tilemap
   */
  getCharactersAt(position, layer) {
    return this.geHeadless.getCharactersAt(position, layer);
  }
  /**
   * {@inheritDoc IGridEngine.setPosition}
   *
   * @category Character
   */
  setPosition(charId, pos, layer) {
    this.geHeadless.setPosition(charId, pos, layer);
  }
  /**
   * @returns Sprite of given character
   *
   * @category Character
   */
  getSprite(charId) {
    this.initGuard();
    const gridCharPhaser = this.gridCharacters?.get(charId);
    if (!gridCharPhaser) throw this.createCharUnknownErr(charId);
    return gridCharPhaser.getSprite();
  }
  /**
   * Sets the sprite for a character.
   *
   * @category Character
   */
  setSprite(charId, sprite) {
    this.initGuard();
    const gridCharPhaser = this.gridCharacters?.get(charId);
    if (!gridCharPhaser) throw this.createCharUnknownErr(charId);
    sprite.setOrigin(0, 0);
    gridCharPhaser.setSprite(sprite);
  }
  /**
   * {@inheritDoc IGridEngine.isBlocked}
   *
   * @category Tilemap
   */
  isBlocked(position, layer, collisionGroups = ["geDefault"]) {
    return this.geHeadless.isBlocked(position, layer, collisionGroups);
  }
  /**
   * {@inheritDoc IGridEngine.isTileBlocked}
   *
   * @category Tilemap
   */
  isTileBlocked(position, layer) {
    return this.geHeadless.isTileBlocked(position, layer);
  }
  /**
   * {@inheritDoc IGridEngine.getCollisionGroups}
   *
   * @category Character
   */
  getCollisionGroups(charId) {
    return this.geHeadless.getCollisionGroups(charId);
  }
  /**
   * {@inheritDoc IGridEngine.setCollisionGroups}
   *
   * @category Character
   */
  setCollisionGroups(charId, collisionGroups) {
    this.geHeadless.setCollisionGroups(charId, collisionGroups);
  }
  /**
   * {@inheritDoc IGridEngine.getIgnoreCollisionGroups}
   *
   * @category Character
   */
  getIgnoreCollisionGroups(charId) {
    return this.geHeadless.getIgnoreCollisionGroups(charId);
  }
  /**
   * {@inheritDoc IGridEngine.setIgnoreCollisionGroups}
   *
   * @category Character
   */
  setIgnoreCollisionGroups(charId, ignoreCollisionGroups) {
    this.geHeadless.setIgnoreCollisionGroups(charId, ignoreCollisionGroups);
  }
  /**
   * {@inheritDoc IGridEngine.getTilePosInDirection}
   *
   * @category Tilemap
   */
  getTilePosInDirection(position, charLayer, direction) {
    return this.geHeadless.getTilePosInDirection(
      position,
      charLayer,
      direction
    );
  }
  /**
   * {@inheritDoc IGridEngine.findShortestPath}
   * @alpha
   *
   * @category Pathfinding
   */
  findShortestPath(source, dest, options = {}) {
    return this.geHeadless.findShortestPath(source, dest, options);
  }
  /**
   * {@inheritDoc IGridEngine.steppedOn}
   *
   * @category Basic Movement
   */
  steppedOn(charIds, tiles, layer) {
    return this.geHeadless.steppedOn(charIds, tiles, layer);
  }
  /**
   * {@inheritDoc IGridEngine.characterShifted}
   *
   * @category GridEngine
   */
  characterShifted() {
    return this.geHeadless.characterShifted();
  }
  /**
   * {@inheritDoc IGridEngine.movementStarted}
   *
   * @category Character
   */
  movementStarted() {
    return this.geHeadless.movementStarted();
  }
  /**
   * {@inheritDoc IGridEngine.movementStopped}
   *
   * @category Character
   */
  movementStopped() {
    return this.geHeadless.movementStopped();
  }
  /**
   * {@inheritDoc IGridEngine.directionChanged}
   *
   * @category Character
   */
  directionChanged() {
    return this.geHeadless.directionChanged();
  }
  /**
   * {@inheritDoc IGridEngine.positionChangeStarted}
   *
   * @category Character
   */
  positionChangeStarted() {
    return this.geHeadless.positionChangeStarted();
  }
  /**
   * {@inheritDoc IGridEngine.positionChangeFinished}
   *
   * @category Character
   */
  positionChangeFinished() {
    return this.geHeadless.positionChangeFinished();
  }
  /**
   * {@inheritDoc IGridEngine.getMovementProgress}
   *
   * @category Character
   */
  getMovementProgress(charId) {
    return this.geHeadless.getMovementProgress(charId);
  }
  /**
   * {@inheritDoc IGridEngine.rebuildTileCollisionCache}
   *
   * @category Grid Engine
   */
  rebuildTileCollisionCache(x, y, width, height) {
    this.geHeadless.rebuildTileCollisionCache(x, y, width, height);
  }
  /**
   * {@inheritDoc IGridEngine.addQueueMovements}
   *
   * @category Queue Movement
   */
  addQueueMovements(charId, positions, options) {
    this.geHeadless.addQueueMovements(charId, positions, options);
  }
  /**
   * {@inheritDoc IGridEngine.getEnqueuedMovements}
   *
   * @category Queue Movement
   */
  getEnqueuedMovements(charId) {
    return this.geHeadless.getEnqueuedMovements(charId);
  }
  /**
   * {@inheritDoc IGridEngine.queueMovementFinished}
   *
   * @category Queue Movement
   */
  queueMovementFinished() {
    return this.geHeadless.queueMovementFinished();
  }
  /**
   * {@inheritDoc IGridEngine.clearEnqueuedMovements}
   *
   * @category Queue Movement
   */
  clearEnqueuedMovements(charId) {
    return this.geHeadless.clearEnqueuedMovements(charId);
  }
  /**
   * Returns the current state of Grid Engine. This is useful for persiting or
   * sharing the state.
   *
   * @category GridEngine
   *
   * @beta
   */
  getState() {
    return {
      characters: this.geHeadless.getState().characters.map((c) => ({
        ...c,
        offsetX: this.getOffsetX(c.id),
        offsetY: this.getOffsetY(c.id)
      }))
    };
  }
  /**
   * Sets the given state for Grid Engine. Be aware that it will **not** remove
   * any characters from Grid Engine. If you want to completely reset the state,
   * you should call {@link GridEngine.create}
   * or remove all characters via
   * {@link GridEngine.removeAllCharacters}.
   *
   * @category GridEngine
   *
   * @beta
   */
  setState(state) {
    this.geHeadless.setState(state);
    if (this.gridCharacters) {
      for (const charState of state.characters) {
        const char = this.gridCharacters.get(charState.id);
        if (char) {
          char.setOffsetX(charState.offsetX);
          char.setOffsetY(charState.offsetY);
        }
      }
    }
  }
  /**
   * {@inheritDoc IGridEngine.getTileCost}
   *
   * @category Pathfinding
   */
  getTileCost(position, charLayer, srcDirection) {
    this.initGuard();
    return this.geHeadless.getTileCost(position, charLayer, srcDirection);
  }
  /**
   * {@inheritDoc IGridEngine.revertCurrentMovement}
   *
   * @category Basic Movement
   */
  revertCurrentMovement(charId) {
    this.geHeadless.revertCurrentMovement(charId);
  }
  /**
   * {@inheritDoc IGridEngine.isCurrentMovementReverted}
   *
   * @category Basic Movement
   */
  isCurrentMovementReverted(charId) {
    return this.geHeadless.isCurrentMovementReverted(charId);
  }
  setConfigDefaults(config) {
    return {
      collisionTilePropertyName: "ge_collide",
      numberOfDirections: 4 /* FOUR */,
      characterCollisionStrategy: "BLOCK_TWO_TILES" /* BLOCK_TWO_TILES */,
      layerOverlay: false,
      cacheTileCollisions: false,
      ...config
    };
  }
  initGuard() {
    if (!this.isCreatedInternal) {
      throw this.createUninitializedErr();
    }
  }
  createUninitializedErr() {
    throw new Error(
      "GridEngine not initialized. You need to call create() first."
    );
  }
  addCharacters() {
    this.config?.characters.forEach(
      (charData) => this.addCharacterInternal(charData)
    );
  }
  createCharUnknownErr(charId) {
    return new Error(`Character unknown: ${charId}`);
  }
  addCharacterInternal(charData) {
    this.initGuard();
    if (!this.gridTilemap) throw this.createUninitializedErr();
    if (!this.config) throw this.createUninitializedErr();
    const gridCharPhaser = new GridCharacterPhaser(
      charData,
      this.scene,
      this.gridTilemap,
      this.config.layerOverlay,
      this.geHeadless
    );
    this.gridCharacters?.set(charData.id, gridCharPhaser);
  }
};

// src/main-esm.ts
var main_esm_default = GridEngine;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ArrayTilemap,
  CharacterShiftAction,
  CollisionStrategy,
  Direction,
  GridEngine,
  GridEngineHeadless,
  MoveToResult,
  NoPathFoundStrategy,
  NumberOfDirections,
  PathBlockedStrategy,
  PhaserTile,
  PhaserTileLayer,
  PhaserTilemap,
  QueuedPathBlockedStrategy,
  TiledLayer,
  TiledTile,
  TiledTilemap,
  directionFromPos
});
/*! Bundled license information:

tiled-property-flattener/dist/tiled_property_flattener.min.js:
  (*! Bundled license information:
  
  lodash/lodash.js:
    (**
     * @license
     * Lodash <https://lodash.com/>
     * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     *)
  *)
*/
