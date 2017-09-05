(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var pace = require('pace-progress');

pace.start({
  document: false
});

},{"pace-progress":5}],2:[function(require,module,exports){
var $body = document.getElementsByTagName('body')[0];
var $trigger = document.getElementById('trigger');

// Menu trigger
function classToggle() {
  $body.classList.toggle('menu-open');
}

$trigger.addEventListener('click', classToggle, false);
},{}],3:[function(require,module,exports){
// var $window = $(window),
//     $body = $('body'),
//     $backToTop = $('.back-to-top'),
//     offset = 300,
//     offsetOpacity = 1200,
//     scrollTopDuration = 700;

// // Back to top
// $window.scroll(function(){
//   ( $(this).scrollTop() > offset ) ? $backToTop.addClass('is-visible') : $backToTop.removeClass('is-visible fade-out');
//   if( $(this).scrollTop() > offsetOpacity ) {
//     $backToTop.addClass('fade-out');
//   }
// });

// $backToTop.on('click', function(event){
//   event.preventDefault();
//   $body.animate({
//     scrollTop: 0 ,
//     }, scrollTopDuration
//   );
// });

var $body = document.getElementsByTagName('body')[0]
var $backToTop = document.getElementById('back-to-top');

var offset = 300;
var scrollTopDuration = 700;

function runScroll() {
  scrollTo($body, 0, scrollTopDuration);
}

function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop == to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}

window.addEventListener('scroll', function() {
  console.log(this);
  if (this.top >= offset) {
    $backToTop.classList.toggle('menu-open');
  }
});

$backToTop.addEventListener('click', runScroll, false)

},{}],4:[function(require,module,exports){
// global.$ = require('jquery');

// var form = require('./plugins/form');
// var lazyLoad = require('./plugins/lazy-load');
var loading = require('./plugins/loading');
var menu = require('./plugins/menu');
// var splash = require('./plugins/splash');
var toTop = require('./plugins/to-top');

},{"./plugins/loading":1,"./plugins/menu":2,"./plugins/to-top":3}],5:[function(require,module,exports){
(function() {
  var AjaxMonitor, Bar, DocumentMonitor, ElementMonitor, ElementTracker, EventLagMonitor, Evented, Events, NoTargetError, Pace, RequestIntercept, SOURCE_KEYS, Scaler, SocketRequestTracker, XHRRequestTracker, animation, avgAmplitude, bar, cancelAnimation, cancelAnimationFrame, defaultOptions, extend, extendNative, getFromDOM, getIntercept, handlePushState, ignoreStack, init, now, options, requestAnimationFrame, result, runAnimation, scalers, shouldIgnoreURL, shouldTrack, source, sources, uniScaler, _WebSocket, _XDomainRequest, _XMLHttpRequest, _i, _intercept, _len, _pushState, _ref, _ref1, _replaceState,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  defaultOptions = {
    catchupTime: 100,
    initialRate: .03,
    minTime: 250,
    ghostTime: 100,
    maxProgressPerFrame: 20,
    easeFactor: 1.25,
    startOnPageLoad: true,
    restartOnPushState: true,
    restartOnRequestAfter: 500,
    target: 'body',
    elements: {
      checkInterval: 100,
      selectors: ['body']
    },
    eventLag: {
      minSamples: 10,
      sampleCount: 3,
      lagThreshold: 3
    },
    ajax: {
      trackMethods: ['GET'],
      trackWebSockets: true,
      ignoreURLs: []
    }
  };

  now = function() {
    var _ref;
    return (_ref = typeof performance !== "undefined" && performance !== null ? typeof performance.now === "function" ? performance.now() : void 0 : void 0) != null ? _ref : +(new Date);
  };

  requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

  if (requestAnimationFrame == null) {
    requestAnimationFrame = function(fn) {
      return setTimeout(fn, 50);
    };
    cancelAnimationFrame = function(id) {
      return clearTimeout(id);
    };
  }

  runAnimation = function(fn) {
    var last, tick;
    last = now();
    tick = function() {
      var diff;
      diff = now() - last;
      if (diff >= 33) {
        last = now();
        return fn(diff, function() {
          return requestAnimationFrame(tick);
        });
      } else {
        return setTimeout(tick, 33 - diff);
      }
    };
    return tick();
  };

  result = function() {
    var args, key, obj;
    obj = arguments[0], key = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    if (typeof obj[key] === 'function') {
      return obj[key].apply(obj, args);
    } else {
      return obj[key];
    }
  };

  extend = function() {
    var key, out, source, sources, val, _i, _len;
    out = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = sources.length; _i < _len; _i++) {
      source = sources[_i];
      if (source) {
        for (key in source) {
          if (!__hasProp.call(source, key)) continue;
          val = source[key];
          if ((out[key] != null) && typeof out[key] === 'object' && (val != null) && typeof val === 'object') {
            extend(out[key], val);
          } else {
            out[key] = val;
          }
        }
      }
    }
    return out;
  };

  avgAmplitude = function(arr) {
    var count, sum, v, _i, _len;
    sum = count = 0;
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      v = arr[_i];
      sum += Math.abs(v);
      count++;
    }
    return sum / count;
  };

  getFromDOM = function(key, json) {
    var data, e, el;
    if (key == null) {
      key = 'options';
    }
    if (json == null) {
      json = true;
    }
    el = document.querySelector("[data-pace-" + key + "]");
    if (!el) {
      return;
    }
    data = el.getAttribute("data-pace-" + key);
    if (!json) {
      return data;
    }
    try {
      return JSON.parse(data);
    } catch (_error) {
      e = _error;
      return typeof console !== "undefined" && console !== null ? console.error("Error parsing inline pace options", e) : void 0;
    }
  };

  Evented = (function() {
    function Evented() {}

    Evented.prototype.on = function(event, handler, ctx, once) {
      var _base;
      if (once == null) {
        once = false;
      }
      if (this.bindings == null) {
        this.bindings = {};
      }
      if ((_base = this.bindings)[event] == null) {
        _base[event] = [];
      }
      return this.bindings[event].push({
        handler: handler,
        ctx: ctx,
        once: once
      });
    };

    Evented.prototype.once = function(event, handler, ctx) {
      return this.on(event, handler, ctx, true);
    };

    Evented.prototype.off = function(event, handler) {
      var i, _ref, _results;
      if (((_ref = this.bindings) != null ? _ref[event] : void 0) == null) {
        return;
      }
      if (handler == null) {
        return delete this.bindings[event];
      } else {
        i = 0;
        _results = [];
        while (i < this.bindings[event].length) {
          if (this.bindings[event][i].handler === handler) {
            _results.push(this.bindings[event].splice(i, 1));
          } else {
            _results.push(i++);
          }
        }
        return _results;
      }
    };

    Evented.prototype.trigger = function() {
      var args, ctx, event, handler, i, once, _ref, _ref1, _results;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if ((_ref = this.bindings) != null ? _ref[event] : void 0) {
        i = 0;
        _results = [];
        while (i < this.bindings[event].length) {
          _ref1 = this.bindings[event][i], handler = _ref1.handler, ctx = _ref1.ctx, once = _ref1.once;
          handler.apply(ctx != null ? ctx : this, args);
          if (once) {
            _results.push(this.bindings[event].splice(i, 1));
          } else {
            _results.push(i++);
          }
        }
        return _results;
      }
    };

    return Evented;

  })();

  Pace = window.Pace || {};

  window.Pace = Pace;

  extend(Pace, Evented.prototype);

  options = Pace.options = extend({}, defaultOptions, window.paceOptions, getFromDOM());

  _ref = ['ajax', 'document', 'eventLag', 'elements'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    source = _ref[_i];
    if (options[source] === true) {
      options[source] = defaultOptions[source];
    }
  }

  NoTargetError = (function(_super) {
    __extends(NoTargetError, _super);

    function NoTargetError() {
      _ref1 = NoTargetError.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    return NoTargetError;

  })(Error);

  Bar = (function() {
    function Bar() {
      this.progress = 0;
    }

    Bar.prototype.getElement = function() {
      var targetElement;
      if (this.el == null) {
        targetElement = document.querySelector(options.target);
        if (!targetElement) {
          throw new NoTargetError;
        }
        this.el = document.createElement('div');
        this.el.className = "pace pace-active";
        document.body.className = document.body.className.replace(/pace-done/g, '');
        document.body.className += ' pace-running';
        this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>';
        if (targetElement.firstChild != null) {
          targetElement.insertBefore(this.el, targetElement.firstChild);
        } else {
          targetElement.appendChild(this.el);
        }
      }
      return this.el;
    };

    Bar.prototype.finish = function() {
      var el;
      el = this.getElement();
      el.className = el.className.replace('pace-active', '');
      el.className += ' pace-inactive';
      document.body.className = document.body.className.replace('pace-running', '');
      return document.body.className += ' pace-done';
    };

    Bar.prototype.update = function(prog) {
      this.progress = prog;
      return this.render();
    };

    Bar.prototype.destroy = function() {
      try {
        this.getElement().parentNode.removeChild(this.getElement());
      } catch (_error) {
        NoTargetError = _error;
      }
      return this.el = void 0;
    };

    Bar.prototype.render = function() {
      var el, key, progressStr, transform, _j, _len1, _ref2;
      if (document.querySelector(options.target) == null) {
        return false;
      }
      el = this.getElement();
      transform = "translate3d(" + this.progress + "%, 0, 0)";
      _ref2 = ['webkitTransform', 'msTransform', 'transform'];
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        key = _ref2[_j];
        el.children[0].style[key] = transform;
      }
      if (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) {
        el.children[0].setAttribute('data-progress-text', "" + (this.progress | 0) + "%");
        if (this.progress >= 100) {
          progressStr = '99';
        } else {
          progressStr = this.progress < 10 ? "0" : "";
          progressStr += this.progress | 0;
        }
        el.children[0].setAttribute('data-progress', "" + progressStr);
      }
      return this.lastRenderedProgress = this.progress;
    };

    Bar.prototype.done = function() {
      return this.progress >= 100;
    };

    return Bar;

  })();

  Events = (function() {
    function Events() {
      this.bindings = {};
    }

    Events.prototype.trigger = function(name, val) {
      var binding, _j, _len1, _ref2, _results;
      if (this.bindings[name] != null) {
        _ref2 = this.bindings[name];
        _results = [];
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          binding = _ref2[_j];
          _results.push(binding.call(this, val));
        }
        return _results;
      }
    };

    Events.prototype.on = function(name, fn) {
      var _base;
      if ((_base = this.bindings)[name] == null) {
        _base[name] = [];
      }
      return this.bindings[name].push(fn);
    };

    return Events;

  })();

  _XMLHttpRequest = window.XMLHttpRequest;

  _XDomainRequest = window.XDomainRequest;

  _WebSocket = window.WebSocket;

  extendNative = function(to, from) {
    var e, key, _results;
    _results = [];
    for (key in from.prototype) {
      try {
        if ((to[key] == null) && typeof from[key] !== 'function') {
          if (typeof Object.defineProperty === 'function') {
            _results.push(Object.defineProperty(to, key, {
              get: function() {
                return from.prototype[key];
              },
              configurable: true,
              enumerable: true
            }));
          } else {
            _results.push(to[key] = from.prototype[key]);
          }
        } else {
          _results.push(void 0);
        }
      } catch (_error) {
        e = _error;
      }
    }
    return _results;
  };

  ignoreStack = [];

  Pace.ignore = function() {
    var args, fn, ret;
    fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    ignoreStack.unshift('ignore');
    ret = fn.apply(null, args);
    ignoreStack.shift();
    return ret;
  };

  Pace.track = function() {
    var args, fn, ret;
    fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    ignoreStack.unshift('track');
    ret = fn.apply(null, args);
    ignoreStack.shift();
    return ret;
  };

  shouldTrack = function(method) {
    var _ref2;
    if (method == null) {
      method = 'GET';
    }
    if (ignoreStack[0] === 'track') {
      return 'force';
    }
    if (!ignoreStack.length && options.ajax) {
      if (method === 'socket' && options.ajax.trackWebSockets) {
        return true;
      } else if (_ref2 = method.toUpperCase(), __indexOf.call(options.ajax.trackMethods, _ref2) >= 0) {
        return true;
      }
    }
    return false;
  };

  RequestIntercept = (function(_super) {
    __extends(RequestIntercept, _super);

    function RequestIntercept() {
      var monitorXHR,
        _this = this;
      RequestIntercept.__super__.constructor.apply(this, arguments);
      monitorXHR = function(req) {
        var _open;
        _open = req.open;
        return req.open = function(type, url, async) {
          if (shouldTrack(type)) {
            _this.trigger('request', {
              type: type,
              url: url,
              request: req
            });
          }
          return _open.apply(req, arguments);
        };
      };
      window.XMLHttpRequest = function(flags) {
        var req;
        req = new _XMLHttpRequest(flags);
        monitorXHR(req);
        return req;
      };
      try {
        extendNative(window.XMLHttpRequest, _XMLHttpRequest);
      } catch (_error) {}
      if (_XDomainRequest != null) {
        window.XDomainRequest = function() {
          var req;
          req = new _XDomainRequest;
          monitorXHR(req);
          return req;
        };
        try {
          extendNative(window.XDomainRequest, _XDomainRequest);
        } catch (_error) {}
      }
      if ((_WebSocket != null) && options.ajax.trackWebSockets) {
        window.WebSocket = function(url, protocols) {
          var req;
          if (protocols != null) {
            req = new _WebSocket(url, protocols);
          } else {
            req = new _WebSocket(url);
          }
          if (shouldTrack('socket')) {
            _this.trigger('request', {
              type: 'socket',
              url: url,
              protocols: protocols,
              request: req
            });
          }
          return req;
        };
        try {
          extendNative(window.WebSocket, _WebSocket);
        } catch (_error) {}
      }
    }

    return RequestIntercept;

  })(Events);

  _intercept = null;

  getIntercept = function() {
    if (_intercept == null) {
      _intercept = new RequestIntercept;
    }
    return _intercept;
  };

  shouldIgnoreURL = function(url) {
    var pattern, _j, _len1, _ref2;
    _ref2 = options.ajax.ignoreURLs;
    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
      pattern = _ref2[_j];
      if (typeof pattern === 'string') {
        if (url.indexOf(pattern) !== -1) {
          return true;
        }
      } else {
        if (pattern.test(url)) {
          return true;
        }
      }
    }
    return false;
  };

  getIntercept().on('request', function(_arg) {
    var after, args, request, type, url;
    type = _arg.type, request = _arg.request, url = _arg.url;
    if (shouldIgnoreURL(url)) {
      return;
    }
    if (!Pace.running && (options.restartOnRequestAfter !== false || shouldTrack(type) === 'force')) {
      args = arguments;
      after = options.restartOnRequestAfter || 0;
      if (typeof after === 'boolean') {
        after = 0;
      }
      return setTimeout(function() {
        var stillActive, _j, _len1, _ref2, _ref3, _results;
        if (type === 'socket') {
          stillActive = request.readyState < 2;
        } else {
          stillActive = (0 < (_ref2 = request.readyState) && _ref2 < 4);
        }
        if (stillActive) {
          Pace.restart();
          _ref3 = Pace.sources;
          _results = [];
          for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
            source = _ref3[_j];
            if (source instanceof AjaxMonitor) {
              source.watch.apply(source, args);
              break;
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }
      }, after);
    }
  });

  AjaxMonitor = (function() {
    function AjaxMonitor() {
      var _this = this;
      this.elements = [];
      getIntercept().on('request', function() {
        return _this.watch.apply(_this, arguments);
      });
    }

    AjaxMonitor.prototype.watch = function(_arg) {
      var request, tracker, type, url;
      type = _arg.type, request = _arg.request, url = _arg.url;
      if (shouldIgnoreURL(url)) {
        return;
      }
      if (type === 'socket') {
        tracker = new SocketRequestTracker(request);
      } else {
        tracker = new XHRRequestTracker(request);
      }
      return this.elements.push(tracker);
    };

    return AjaxMonitor;

  })();

  XHRRequestTracker = (function() {
    function XHRRequestTracker(request) {
      var event, size, _j, _len1, _onreadystatechange, _ref2,
        _this = this;
      this.progress = 0;
      if (window.ProgressEvent != null) {
        size = null;
        request.addEventListener('progress', function(evt) {
          if (evt.lengthComputable) {
            return _this.progress = 100 * evt.loaded / evt.total;
          } else {
            return _this.progress = _this.progress + (100 - _this.progress) / 2;
          }
        }, false);
        _ref2 = ['load', 'abort', 'timeout', 'error'];
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          event = _ref2[_j];
          request.addEventListener(event, function() {
            return _this.progress = 100;
          }, false);
        }
      } else {
        _onreadystatechange = request.onreadystatechange;
        request.onreadystatechange = function() {
          var _ref3;
          if ((_ref3 = request.readyState) === 0 || _ref3 === 4) {
            _this.progress = 100;
          } else if (request.readyState === 3) {
            _this.progress = 50;
          }
          return typeof _onreadystatechange === "function" ? _onreadystatechange.apply(null, arguments) : void 0;
        };
      }
    }

    return XHRRequestTracker;

  })();

  SocketRequestTracker = (function() {
    function SocketRequestTracker(request) {
      var event, _j, _len1, _ref2,
        _this = this;
      this.progress = 0;
      _ref2 = ['error', 'open'];
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        event = _ref2[_j];
        request.addEventListener(event, function() {
          return _this.progress = 100;
        }, false);
      }
    }

    return SocketRequestTracker;

  })();

  ElementMonitor = (function() {
    function ElementMonitor(options) {
      var selector, _j, _len1, _ref2;
      if (options == null) {
        options = {};
      }
      this.elements = [];
      if (options.selectors == null) {
        options.selectors = [];
      }
      _ref2 = options.selectors;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        selector = _ref2[_j];
        this.elements.push(new ElementTracker(selector));
      }
    }

    return ElementMonitor;

  })();

  ElementTracker = (function() {
    function ElementTracker(selector) {
      this.selector = selector;
      this.progress = 0;
      this.check();
    }

    ElementTracker.prototype.check = function() {
      var _this = this;
      if (document.querySelector(this.selector)) {
        return this.done();
      } else {
        return setTimeout((function() {
          return _this.check();
        }), options.elements.checkInterval);
      }
    };

    ElementTracker.prototype.done = function() {
      return this.progress = 100;
    };

    return ElementTracker;

  })();

  DocumentMonitor = (function() {
    DocumentMonitor.prototype.states = {
      loading: 0,
      interactive: 50,
      complete: 100
    };

    function DocumentMonitor() {
      var _onreadystatechange, _ref2,
        _this = this;
      this.progress = (_ref2 = this.states[document.readyState]) != null ? _ref2 : 100;
      _onreadystatechange = document.onreadystatechange;
      document.onreadystatechange = function() {
        if (_this.states[document.readyState] != null) {
          _this.progress = _this.states[document.readyState];
        }
        return typeof _onreadystatechange === "function" ? _onreadystatechange.apply(null, arguments) : void 0;
      };
    }

    return DocumentMonitor;

  })();

  EventLagMonitor = (function() {
    function EventLagMonitor() {
      var avg, interval, last, points, samples,
        _this = this;
      this.progress = 0;
      avg = 0;
      samples = [];
      points = 0;
      last = now();
      interval = setInterval(function() {
        var diff;
        diff = now() - last - 50;
        last = now();
        samples.push(diff);
        if (samples.length > options.eventLag.sampleCount) {
          samples.shift();
        }
        avg = avgAmplitude(samples);
        if (++points >= options.eventLag.minSamples && avg < options.eventLag.lagThreshold) {
          _this.progress = 100;
          return clearInterval(interval);
        } else {
          return _this.progress = 100 * (3 / (avg + 3));
        }
      }, 50);
    }

    return EventLagMonitor;

  })();

  Scaler = (function() {
    function Scaler(source) {
      this.source = source;
      this.last = this.sinceLastUpdate = 0;
      this.rate = options.initialRate;
      this.catchup = 0;
      this.progress = this.lastProgress = 0;
      if (this.source != null) {
        this.progress = result(this.source, 'progress');
      }
    }

    Scaler.prototype.tick = function(frameTime, val) {
      var scaling;
      if (val == null) {
        val = result(this.source, 'progress');
      }
      if (val >= 100) {
        this.done = true;
      }
      if (val === this.last) {
        this.sinceLastUpdate += frameTime;
      } else {
        if (this.sinceLastUpdate) {
          this.rate = (val - this.last) / this.sinceLastUpdate;
        }
        this.catchup = (val - this.progress) / options.catchupTime;
        this.sinceLastUpdate = 0;
        this.last = val;
      }
      if (val > this.progress) {
        this.progress += this.catchup * frameTime;
      }
      scaling = 1 - Math.pow(this.progress / 100, options.easeFactor);
      this.progress += scaling * this.rate * frameTime;
      this.progress = Math.min(this.lastProgress + options.maxProgressPerFrame, this.progress);
      this.progress = Math.max(0, this.progress);
      this.progress = Math.min(100, this.progress);
      this.lastProgress = this.progress;
      return this.progress;
    };

    return Scaler;

  })();

  sources = null;

  scalers = null;

  bar = null;

  uniScaler = null;

  animation = null;

  cancelAnimation = null;

  Pace.running = false;

  handlePushState = function() {
    if (options.restartOnPushState) {
      return Pace.restart();
    }
  };

  if (window.history.pushState != null) {
    _pushState = window.history.pushState;
    window.history.pushState = function() {
      handlePushState();
      return _pushState.apply(window.history, arguments);
    };
  }

  if (window.history.replaceState != null) {
    _replaceState = window.history.replaceState;
    window.history.replaceState = function() {
      handlePushState();
      return _replaceState.apply(window.history, arguments);
    };
  }

  SOURCE_KEYS = {
    ajax: AjaxMonitor,
    elements: ElementMonitor,
    document: DocumentMonitor,
    eventLag: EventLagMonitor
  };

  (init = function() {
    var type, _j, _k, _len1, _len2, _ref2, _ref3, _ref4;
    Pace.sources = sources = [];
    _ref2 = ['ajax', 'elements', 'document', 'eventLag'];
    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
      type = _ref2[_j];
      if (options[type] !== false) {
        sources.push(new SOURCE_KEYS[type](options[type]));
      }
    }
    _ref4 = (_ref3 = options.extraSources) != null ? _ref3 : [];
    for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
      source = _ref4[_k];
      sources.push(new source(options));
    }
    Pace.bar = bar = new Bar;
    scalers = [];
    return uniScaler = new Scaler;
  })();

  Pace.stop = function() {
    Pace.trigger('stop');
    Pace.running = false;
    bar.destroy();
    cancelAnimation = true;
    if (animation != null) {
      if (typeof cancelAnimationFrame === "function") {
        cancelAnimationFrame(animation);
      }
      animation = null;
    }
    return init();
  };

  Pace.restart = function() {
    Pace.trigger('restart');
    Pace.stop();
    return Pace.start();
  };

  Pace.go = function() {
    var start;
    Pace.running = true;
    bar.render();
    start = now();
    cancelAnimation = false;
    return animation = runAnimation(function(frameTime, enqueueNextFrame) {
      var avg, count, done, element, elements, i, j, remaining, scaler, scalerList, sum, _j, _k, _len1, _len2, _ref2;
      remaining = 100 - bar.progress;
      count = sum = 0;
      done = true;
      for (i = _j = 0, _len1 = sources.length; _j < _len1; i = ++_j) {
        source = sources[i];
        scalerList = scalers[i] != null ? scalers[i] : scalers[i] = [];
        elements = (_ref2 = source.elements) != null ? _ref2 : [source];
        for (j = _k = 0, _len2 = elements.length; _k < _len2; j = ++_k) {
          element = elements[j];
          scaler = scalerList[j] != null ? scalerList[j] : scalerList[j] = new Scaler(element);
          done &= scaler.done;
          if (scaler.done) {
            continue;
          }
          count++;
          sum += scaler.tick(frameTime);
        }
      }
      avg = sum / count;
      bar.update(uniScaler.tick(frameTime, avg));
      if (bar.done() || done || cancelAnimation) {
        bar.update(100);
        Pace.trigger('done');
        return setTimeout(function() {
          bar.finish();
          Pace.running = false;
          return Pace.trigger('hide');
        }, Math.max(options.ghostTime, Math.max(options.minTime - (now() - start), 0)));
      } else {
        return enqueueNextFrame();
      }
    });
  };

  Pace.start = function(_options) {
    extend(options, _options);
    Pace.running = true;
    try {
      bar.render();
    } catch (_error) {
      NoTargetError = _error;
    }
    if (!document.querySelector('.pace')) {
      return setTimeout(Pace.start, 50);
    } else {
      Pace.trigger('start');
      return Pace.go();
    }
  };

  if (typeof define === 'function' && define.amd) {
    define(['pace'], function() {
      return Pace;
    });
  } else if (typeof exports === 'object') {
    module.exports = Pace;
  } else {
    if (options.startOnPageLoad) {
      Pace.start();
    }
  }

}).call(this);

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvcGx1Z2lucy9sb2FkaW5nLmpzIiwiYXNzZXRzL2pzL3BsdWdpbnMvbWVudS5qcyIsImFzc2V0cy9qcy9wbHVnaW5zL3RvLXRvcC5qcyIsImFzc2V0cy9qcy9zY3JpcHQuanMiLCJub2RlX21vZHVsZXMvcGFjZS1wcm9ncmVzcy9wYWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHBhY2UgPSByZXF1aXJlKCdwYWNlLXByb2dyZXNzJyk7XG5cbnBhY2Uuc3RhcnQoe1xuICBkb2N1bWVudDogZmFsc2Vcbn0pO1xuIiwidmFyICRib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcbnZhciAkdHJpZ2dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmlnZ2VyJyk7XG5cbi8vIE1lbnUgdHJpZ2dlclxuZnVuY3Rpb24gY2xhc3NUb2dnbGUoKSB7XG4gICRib2R5LmNsYXNzTGlzdC50b2dnbGUoJ21lbnUtb3BlbicpO1xufVxuXG4kdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsYXNzVG9nZ2xlLCBmYWxzZSk7IiwiLy8gdmFyICR3aW5kb3cgPSAkKHdpbmRvdyksXG4vLyAgICAgJGJvZHkgPSAkKCdib2R5JyksXG4vLyAgICAgJGJhY2tUb1RvcCA9ICQoJy5iYWNrLXRvLXRvcCcpLFxuLy8gICAgIG9mZnNldCA9IDMwMCxcbi8vICAgICBvZmZzZXRPcGFjaXR5ID0gMTIwMCxcbi8vICAgICBzY3JvbGxUb3BEdXJhdGlvbiA9IDcwMDtcblxuLy8gLy8gQmFjayB0byB0b3Bcbi8vICR3aW5kb3cuc2Nyb2xsKGZ1bmN0aW9uKCl7XG4vLyAgICggJCh0aGlzKS5zY3JvbGxUb3AoKSA+IG9mZnNldCApID8gJGJhY2tUb1RvcC5hZGRDbGFzcygnaXMtdmlzaWJsZScpIDogJGJhY2tUb1RvcC5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZSBmYWRlLW91dCcpO1xuLy8gICBpZiggJCh0aGlzKS5zY3JvbGxUb3AoKSA+IG9mZnNldE9wYWNpdHkgKSB7XG4vLyAgICAgJGJhY2tUb1RvcC5hZGRDbGFzcygnZmFkZS1vdXQnKTtcbi8vICAgfVxuLy8gfSk7XG5cbi8vICRiYWNrVG9Ub3Aub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xuLy8gICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuLy8gICAkYm9keS5hbmltYXRlKHtcbi8vICAgICBzY3JvbGxUb3A6IDAgLFxuLy8gICAgIH0sIHNjcm9sbFRvcER1cmF0aW9uXG4vLyAgICk7XG4vLyB9KTtcblxudmFyICRib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXVxudmFyICRiYWNrVG9Ub3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFjay10by10b3AnKTtcblxudmFyIG9mZnNldCA9IDMwMDtcbnZhciBzY3JvbGxUb3BEdXJhdGlvbiA9IDcwMDtcblxuZnVuY3Rpb24gcnVuU2Nyb2xsKCkge1xuICBzY3JvbGxUbygkYm9keSwgMCwgc2Nyb2xsVG9wRHVyYXRpb24pO1xufVxuXG5mdW5jdGlvbiBzY3JvbGxUbyhlbGVtZW50LCB0bywgZHVyYXRpb24pIHtcbiAgaWYgKGR1cmF0aW9uIDw9IDApIHJldHVybjtcbiAgdmFyIGRpZmZlcmVuY2UgPSB0byAtIGVsZW1lbnQuc2Nyb2xsVG9wO1xuICB2YXIgcGVyVGljayA9IGRpZmZlcmVuY2UgLyBkdXJhdGlvbiAqIDEwO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgZWxlbWVudC5zY3JvbGxUb3AgPSBlbGVtZW50LnNjcm9sbFRvcCArIHBlclRpY2s7XG4gICAgaWYgKGVsZW1lbnQuc2Nyb2xsVG9wID09IHRvKSByZXR1cm47XG4gICAgc2Nyb2xsVG8oZWxlbWVudCwgdG8sIGR1cmF0aW9uIC0gMTApO1xuICB9LCAxMCk7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2codGhpcyk7XG4gIGlmICh0aGlzLnRvcCA+PSBvZmZzZXQpIHtcbiAgICAkYmFja1RvVG9wLmNsYXNzTGlzdC50b2dnbGUoJ21lbnUtb3BlbicpO1xuICB9XG59KTtcblxuJGJhY2tUb1RvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1blNjcm9sbCwgZmFsc2UpXG4iLCIvLyBnbG9iYWwuJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuXG4vLyB2YXIgZm9ybSA9IHJlcXVpcmUoJy4vcGx1Z2lucy9mb3JtJyk7XG4vLyB2YXIgbGF6eUxvYWQgPSByZXF1aXJlKCcuL3BsdWdpbnMvbGF6eS1sb2FkJyk7XG52YXIgbG9hZGluZyA9IHJlcXVpcmUoJy4vcGx1Z2lucy9sb2FkaW5nJyk7XG52YXIgbWVudSA9IHJlcXVpcmUoJy4vcGx1Z2lucy9tZW51Jyk7XG4vLyB2YXIgc3BsYXNoID0gcmVxdWlyZSgnLi9wbHVnaW5zL3NwbGFzaCcpO1xudmFyIHRvVG9wID0gcmVxdWlyZSgnLi9wbHVnaW5zL3RvLXRvcCcpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICB2YXIgQWpheE1vbml0b3IsIEJhciwgRG9jdW1lbnRNb25pdG9yLCBFbGVtZW50TW9uaXRvciwgRWxlbWVudFRyYWNrZXIsIEV2ZW50TGFnTW9uaXRvciwgRXZlbnRlZCwgRXZlbnRzLCBOb1RhcmdldEVycm9yLCBQYWNlLCBSZXF1ZXN0SW50ZXJjZXB0LCBTT1VSQ0VfS0VZUywgU2NhbGVyLCBTb2NrZXRSZXF1ZXN0VHJhY2tlciwgWEhSUmVxdWVzdFRyYWNrZXIsIGFuaW1hdGlvbiwgYXZnQW1wbGl0dWRlLCBiYXIsIGNhbmNlbEFuaW1hdGlvbiwgY2FuY2VsQW5pbWF0aW9uRnJhbWUsIGRlZmF1bHRPcHRpb25zLCBleHRlbmQsIGV4dGVuZE5hdGl2ZSwgZ2V0RnJvbURPTSwgZ2V0SW50ZXJjZXB0LCBoYW5kbGVQdXNoU3RhdGUsIGlnbm9yZVN0YWNrLCBpbml0LCBub3csIG9wdGlvbnMsIHJlcXVlc3RBbmltYXRpb25GcmFtZSwgcmVzdWx0LCBydW5BbmltYXRpb24sIHNjYWxlcnMsIHNob3VsZElnbm9yZVVSTCwgc2hvdWxkVHJhY2ssIHNvdXJjZSwgc291cmNlcywgdW5pU2NhbGVyLCBfV2ViU29ja2V0LCBfWERvbWFpblJlcXVlc3QsIF9YTUxIdHRwUmVxdWVzdCwgX2ksIF9pbnRlcmNlcHQsIF9sZW4sIF9wdXNoU3RhdGUsIF9yZWYsIF9yZWYxLCBfcmVwbGFjZVN0YXRlLFxuICAgIF9fc2xpY2UgPSBbXS5zbGljZSxcbiAgICBfX2hhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgICBfX2V4dGVuZHMgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKF9faGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBfX2luZGV4T2YgPSBbXS5pbmRleE9mIHx8IGZ1bmN0aW9uKGl0ZW0pIHsgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykgeyBpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHJldHVybiBpOyB9IHJldHVybiAtMTsgfTtcblxuICBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBjYXRjaHVwVGltZTogMTAwLFxuICAgIGluaXRpYWxSYXRlOiAuMDMsXG4gICAgbWluVGltZTogMjUwLFxuICAgIGdob3N0VGltZTogMTAwLFxuICAgIG1heFByb2dyZXNzUGVyRnJhbWU6IDIwLFxuICAgIGVhc2VGYWN0b3I6IDEuMjUsXG4gICAgc3RhcnRPblBhZ2VMb2FkOiB0cnVlLFxuICAgIHJlc3RhcnRPblB1c2hTdGF0ZTogdHJ1ZSxcbiAgICByZXN0YXJ0T25SZXF1ZXN0QWZ0ZXI6IDUwMCxcbiAgICB0YXJnZXQ6ICdib2R5JyxcbiAgICBlbGVtZW50czoge1xuICAgICAgY2hlY2tJbnRlcnZhbDogMTAwLFxuICAgICAgc2VsZWN0b3JzOiBbJ2JvZHknXVxuICAgIH0sXG4gICAgZXZlbnRMYWc6IHtcbiAgICAgIG1pblNhbXBsZXM6IDEwLFxuICAgICAgc2FtcGxlQ291bnQ6IDMsXG4gICAgICBsYWdUaHJlc2hvbGQ6IDNcbiAgICB9LFxuICAgIGFqYXg6IHtcbiAgICAgIHRyYWNrTWV0aG9kczogWydHRVQnXSxcbiAgICAgIHRyYWNrV2ViU29ja2V0czogdHJ1ZSxcbiAgICAgIGlnbm9yZVVSTHM6IFtdXG4gICAgfVxuICB9O1xuXG4gIG5vdyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBfcmVmO1xuICAgIHJldHVybiAoX3JlZiA9IHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZSAhPT0gbnVsbCA/IHR5cGVvZiBwZXJmb3JtYW5jZS5ub3cgPT09IFwiZnVuY3Rpb25cIiA/IHBlcmZvcm1hbmNlLm5vdygpIDogdm9pZCAwIDogdm9pZCAwKSAhPSBudWxsID8gX3JlZiA6ICsobmV3IERhdGUpO1xuICB9O1xuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZTtcblxuICBjYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWU7XG5cbiAgaWYgKHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PSBudWxsKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oZm4pIHtcbiAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZuLCA1MCk7XG4gICAgfTtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KGlkKTtcbiAgICB9O1xuICB9XG5cbiAgcnVuQW5pbWF0aW9uID0gZnVuY3Rpb24oZm4pIHtcbiAgICB2YXIgbGFzdCwgdGljaztcbiAgICBsYXN0ID0gbm93KCk7XG4gICAgdGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGRpZmY7XG4gICAgICBkaWZmID0gbm93KCkgLSBsYXN0O1xuICAgICAgaWYgKGRpZmYgPj0gMzMpIHtcbiAgICAgICAgbGFzdCA9IG5vdygpO1xuICAgICAgICByZXR1cm4gZm4oZGlmZiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dCh0aWNrLCAzMyAtIGRpZmYpO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHRpY2soKTtcbiAgfTtcblxuICByZXN1bHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywga2V5LCBvYmo7XG4gICAgb2JqID0gYXJndW1lbnRzWzBdLCBrZXkgPSBhcmd1bWVudHNbMV0sIGFyZ3MgPSAzIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSA6IFtdO1xuICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XS5hcHBseShvYmosIGFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgfVxuICB9O1xuXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBrZXksIG91dCwgc291cmNlLCBzb3VyY2VzLCB2YWwsIF9pLCBfbGVuO1xuICAgIG91dCA9IGFyZ3VtZW50c1swXSwgc291cmNlcyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgZm9yIChfaSA9IDAsIF9sZW4gPSBzb3VyY2VzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICBzb3VyY2UgPSBzb3VyY2VzW19pXTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgaWYgKCFfX2hhc1Byb3AuY2FsbChzb3VyY2UsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICAgIHZhbCA9IHNvdXJjZVtrZXldO1xuICAgICAgICAgIGlmICgob3V0W2tleV0gIT0gbnVsbCkgJiYgdHlwZW9mIG91dFtrZXldID09PSAnb2JqZWN0JyAmJiAodmFsICE9IG51bGwpICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBleHRlbmQob3V0W2tleV0sIHZhbCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dFtrZXldID0gdmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0O1xuICB9O1xuXG4gIGF2Z0FtcGxpdHVkZSA9IGZ1bmN0aW9uKGFycikge1xuICAgIHZhciBjb3VudCwgc3VtLCB2LCBfaSwgX2xlbjtcbiAgICBzdW0gPSBjb3VudCA9IDA7XG4gICAgZm9yIChfaSA9IDAsIF9sZW4gPSBhcnIubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgIHYgPSBhcnJbX2ldO1xuICAgICAgc3VtICs9IE1hdGguYWJzKHYpO1xuICAgICAgY291bnQrKztcbiAgICB9XG4gICAgcmV0dXJuIHN1bSAvIGNvdW50O1xuICB9O1xuXG4gIGdldEZyb21ET00gPSBmdW5jdGlvbihrZXksIGpzb24pIHtcbiAgICB2YXIgZGF0YSwgZSwgZWw7XG4gICAgaWYgKGtleSA9PSBudWxsKSB7XG4gICAgICBrZXkgPSAnb3B0aW9ucyc7XG4gICAgfVxuICAgIGlmIChqc29uID09IG51bGwpIHtcbiAgICAgIGpzb24gPSB0cnVlO1xuICAgIH1cbiAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1wYWNlLVwiICsga2V5ICsgXCJdXCIpO1xuICAgIGlmICghZWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGF0YSA9IGVsLmdldEF0dHJpYnV0ZShcImRhdGEtcGFjZS1cIiArIGtleSk7XG4gICAgaWYgKCFqc29uKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgZSA9IF9lcnJvcjtcbiAgICAgIHJldHVybiB0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlICE9PSBudWxsID8gY29uc29sZS5lcnJvcihcIkVycm9yIHBhcnNpbmcgaW5saW5lIHBhY2Ugb3B0aW9uc1wiLCBlKSA6IHZvaWQgMDtcbiAgICB9XG4gIH07XG5cbiAgRXZlbnRlZCA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBFdmVudGVkKCkge31cblxuICAgIEV2ZW50ZWQucHJvdG90eXBlLm9uID0gZnVuY3Rpb24oZXZlbnQsIGhhbmRsZXIsIGN0eCwgb25jZSkge1xuICAgICAgdmFyIF9iYXNlO1xuICAgICAgaWYgKG9uY2UgPT0gbnVsbCkge1xuICAgICAgICBvbmNlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5iaW5kaW5ncyA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuYmluZGluZ3MgPSB7fTtcbiAgICAgIH1cbiAgICAgIGlmICgoX2Jhc2UgPSB0aGlzLmJpbmRpbmdzKVtldmVudF0gPT0gbnVsbCkge1xuICAgICAgICBfYmFzZVtldmVudF0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJpbmRpbmdzW2V2ZW50XS5wdXNoKHtcbiAgICAgICAgaGFuZGxlcjogaGFuZGxlcixcbiAgICAgICAgY3R4OiBjdHgsXG4gICAgICAgIG9uY2U6IG9uY2VcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBFdmVudGVkLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGhhbmRsZXIsIGN0eCkge1xuICAgICAgcmV0dXJuIHRoaXMub24oZXZlbnQsIGhhbmRsZXIsIGN0eCwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIEV2ZW50ZWQucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICB2YXIgaSwgX3JlZiwgX3Jlc3VsdHM7XG4gICAgICBpZiAoKChfcmVmID0gdGhpcy5iaW5kaW5ncykgIT0gbnVsbCA/IF9yZWZbZXZlbnRdIDogdm9pZCAwKSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChoYW5kbGVyID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGRlbGV0ZSB0aGlzLmJpbmRpbmdzW2V2ZW50XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGkgPSAwO1xuICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuYmluZGluZ3NbZXZlbnRdLmxlbmd0aCkge1xuICAgICAgICAgIGlmICh0aGlzLmJpbmRpbmdzW2V2ZW50XVtpXS5oYW5kbGVyID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHRoaXMuYmluZGluZ3NbZXZlbnRdLnNwbGljZShpLCAxKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goaSsrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBFdmVudGVkLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncywgY3R4LCBldmVudCwgaGFuZGxlciwgaSwgb25jZSwgX3JlZiwgX3JlZjEsIF9yZXN1bHRzO1xuICAgICAgZXZlbnQgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgICAgaWYgKChfcmVmID0gdGhpcy5iaW5kaW5ncykgIT0gbnVsbCA/IF9yZWZbZXZlbnRdIDogdm9pZCAwKSB7XG4gICAgICAgIGkgPSAwO1xuICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuYmluZGluZ3NbZXZlbnRdLmxlbmd0aCkge1xuICAgICAgICAgIF9yZWYxID0gdGhpcy5iaW5kaW5nc1tldmVudF1baV0sIGhhbmRsZXIgPSBfcmVmMS5oYW5kbGVyLCBjdHggPSBfcmVmMS5jdHgsIG9uY2UgPSBfcmVmMS5vbmNlO1xuICAgICAgICAgIGhhbmRsZXIuYXBwbHkoY3R4ICE9IG51bGwgPyBjdHggOiB0aGlzLCBhcmdzKTtcbiAgICAgICAgICBpZiAob25jZSkge1xuICAgICAgICAgICAgX3Jlc3VsdHMucHVzaCh0aGlzLmJpbmRpbmdzW2V2ZW50XS5zcGxpY2UoaSwgMSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKGkrKyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIEV2ZW50ZWQ7XG5cbiAgfSkoKTtcblxuICBQYWNlID0gd2luZG93LlBhY2UgfHwge307XG5cbiAgd2luZG93LlBhY2UgPSBQYWNlO1xuXG4gIGV4dGVuZChQYWNlLCBFdmVudGVkLnByb3RvdHlwZSk7XG5cbiAgb3B0aW9ucyA9IFBhY2Uub3B0aW9ucyA9IGV4dGVuZCh7fSwgZGVmYXVsdE9wdGlvbnMsIHdpbmRvdy5wYWNlT3B0aW9ucywgZ2V0RnJvbURPTSgpKTtcblxuICBfcmVmID0gWydhamF4JywgJ2RvY3VtZW50JywgJ2V2ZW50TGFnJywgJ2VsZW1lbnRzJ107XG4gIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgIHNvdXJjZSA9IF9yZWZbX2ldO1xuICAgIGlmIChvcHRpb25zW3NvdXJjZV0gPT09IHRydWUpIHtcbiAgICAgIG9wdGlvbnNbc291cmNlXSA9IGRlZmF1bHRPcHRpb25zW3NvdXJjZV07XG4gICAgfVxuICB9XG5cbiAgTm9UYXJnZXRFcnJvciA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTm9UYXJnZXRFcnJvciwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIE5vVGFyZ2V0RXJyb3IoKSB7XG4gICAgICBfcmVmMSA9IE5vVGFyZ2V0RXJyb3IuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gX3JlZjE7XG4gICAgfVxuXG4gICAgcmV0dXJuIE5vVGFyZ2V0RXJyb3I7XG5cbiAgfSkoRXJyb3IpO1xuXG4gIEJhciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBCYXIoKSB7XG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICB9XG5cbiAgICBCYXIucHJvdG90eXBlLmdldEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0YXJnZXRFbGVtZW50O1xuICAgICAgaWYgKHRoaXMuZWwgPT0gbnVsbCkge1xuICAgICAgICB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLnRhcmdldCk7XG4gICAgICAgIGlmICghdGFyZ2V0RWxlbWVudCkge1xuICAgICAgICAgIHRocm93IG5ldyBOb1RhcmdldEVycm9yO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5lbC5jbGFzc05hbWUgPSBcInBhY2UgcGFjZS1hY3RpdmVcIjtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc05hbWUgPSBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZS5yZXBsYWNlKC9wYWNlLWRvbmUvZywgJycpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSArPSAnIHBhY2UtcnVubmluZyc7XG4gICAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJwYWNlLXByb2dyZXNzXCI+XFxuICA8ZGl2IGNsYXNzPVwicGFjZS1wcm9ncmVzcy1pbm5lclwiPjwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJwYWNlLWFjdGl2aXR5XCI+PC9kaXY+JztcbiAgICAgICAgaWYgKHRhcmdldEVsZW1lbnQuZmlyc3RDaGlsZCAhPSBudWxsKSB7XG4gICAgICAgICAgdGFyZ2V0RWxlbWVudC5pbnNlcnRCZWZvcmUodGhpcy5lbCwgdGFyZ2V0RWxlbWVudC5maXJzdENoaWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5lbDtcbiAgICB9O1xuXG4gICAgQmFyLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlbDtcbiAgICAgIGVsID0gdGhpcy5nZXRFbGVtZW50KCk7XG4gICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZSgncGFjZS1hY3RpdmUnLCAnJyk7XG4gICAgICBlbC5jbGFzc05hbWUgKz0gJyBwYWNlLWluYWN0aXZlJztcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lID0gZG9jdW1lbnQuYm9keS5jbGFzc05hbWUucmVwbGFjZSgncGFjZS1ydW5uaW5nJywgJycpO1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lICs9ICcgcGFjZS1kb25lJztcbiAgICB9O1xuXG4gICAgQmFyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihwcm9nKSB7XG4gICAgICB0aGlzLnByb2dyZXNzID0gcHJvZztcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcigpO1xuICAgIH07XG5cbiAgICBCYXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5nZXRFbGVtZW50KCkpO1xuICAgICAgfSBjYXRjaCAoX2Vycm9yKSB7XG4gICAgICAgIE5vVGFyZ2V0RXJyb3IgPSBfZXJyb3I7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5lbCA9IHZvaWQgMDtcbiAgICB9O1xuXG4gICAgQmFyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlbCwga2V5LCBwcm9ncmVzc1N0ciwgdHJhbnNmb3JtLCBfaiwgX2xlbjEsIF9yZWYyO1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy50YXJnZXQpID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgZWwgPSB0aGlzLmdldEVsZW1lbnQoKTtcbiAgICAgIHRyYW5zZm9ybSA9IFwidHJhbnNsYXRlM2QoXCIgKyB0aGlzLnByb2dyZXNzICsgXCIlLCAwLCAwKVwiO1xuICAgICAgX3JlZjIgPSBbJ3dlYmtpdFRyYW5zZm9ybScsICdtc1RyYW5zZm9ybScsICd0cmFuc2Zvcm0nXTtcbiAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICBrZXkgPSBfcmVmMltfal07XG4gICAgICAgIGVsLmNoaWxkcmVuWzBdLnN0eWxlW2tleV0gPSB0cmFuc2Zvcm07XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMubGFzdFJlbmRlcmVkUHJvZ3Jlc3MgfHwgdGhpcy5sYXN0UmVuZGVyZWRQcm9ncmVzcyB8IDAgIT09IHRoaXMucHJvZ3Jlc3MgfCAwKSB7XG4gICAgICAgIGVsLmNoaWxkcmVuWzBdLnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9ncmVzcy10ZXh0JywgXCJcIiArICh0aGlzLnByb2dyZXNzIHwgMCkgKyBcIiVcIik7XG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzID49IDEwMCkge1xuICAgICAgICAgIHByb2dyZXNzU3RyID0gJzk5JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9ncmVzc1N0ciA9IHRoaXMucHJvZ3Jlc3MgPCAxMCA/IFwiMFwiIDogXCJcIjtcbiAgICAgICAgICBwcm9ncmVzc1N0ciArPSB0aGlzLnByb2dyZXNzIHwgMDtcbiAgICAgICAgfVxuICAgICAgICBlbC5jaGlsZHJlblswXS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZ3Jlc3MnLCBcIlwiICsgcHJvZ3Jlc3NTdHIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMubGFzdFJlbmRlcmVkUHJvZ3Jlc3MgPSB0aGlzLnByb2dyZXNzO1xuICAgIH07XG5cbiAgICBCYXIucHJvdG90eXBlLmRvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb2dyZXNzID49IDEwMDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEJhcjtcblxuICB9KSgpO1xuXG4gIEV2ZW50cyA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBFdmVudHMoKSB7XG4gICAgICB0aGlzLmJpbmRpbmdzID0ge307XG4gICAgfVxuXG4gICAgRXZlbnRzLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSwgdmFsKSB7XG4gICAgICB2YXIgYmluZGluZywgX2osIF9sZW4xLCBfcmVmMiwgX3Jlc3VsdHM7XG4gICAgICBpZiAodGhpcy5iaW5kaW5nc1tuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgIF9yZWYyID0gdGhpcy5iaW5kaW5nc1tuYW1lXTtcbiAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjIubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICAgICAgYmluZGluZyA9IF9yZWYyW19qXTtcbiAgICAgICAgICBfcmVzdWx0cy5wdXNoKGJpbmRpbmcuY2FsbCh0aGlzLCB2YWwpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICB9XG4gICAgfTtcblxuICAgIEV2ZW50cy5wcm90b3R5cGUub24gPSBmdW5jdGlvbihuYW1lLCBmbikge1xuICAgICAgdmFyIF9iYXNlO1xuICAgICAgaWYgKChfYmFzZSA9IHRoaXMuYmluZGluZ3MpW25hbWVdID09IG51bGwpIHtcbiAgICAgICAgX2Jhc2VbbmFtZV0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJpbmRpbmdzW25hbWVdLnB1c2goZm4pO1xuICAgIH07XG5cbiAgICByZXR1cm4gRXZlbnRzO1xuXG4gIH0pKCk7XG5cbiAgX1hNTEh0dHBSZXF1ZXN0ID0gd2luZG93LlhNTEh0dHBSZXF1ZXN0O1xuXG4gIF9YRG9tYWluUmVxdWVzdCA9IHdpbmRvdy5YRG9tYWluUmVxdWVzdDtcblxuICBfV2ViU29ja2V0ID0gd2luZG93LldlYlNvY2tldDtcblxuICBleHRlbmROYXRpdmUgPSBmdW5jdGlvbih0bywgZnJvbSkge1xuICAgIHZhciBlLCBrZXksIF9yZXN1bHRzO1xuICAgIF9yZXN1bHRzID0gW107XG4gICAgZm9yIChrZXkgaW4gZnJvbS5wcm90b3R5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICgodG9ba2V5XSA9PSBudWxsKSAmJiB0eXBlb2YgZnJvbVtrZXldICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBPYmplY3QuZGVmaW5lUHJvcGVydHkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goT2JqZWN0LmRlZmluZVByb3BlcnR5KHRvLCBrZXksIHtcbiAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJvbS5wcm90b3R5cGVba2V5XTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2godG9ba2V5XSA9IGZyb20ucHJvdG90eXBlW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfcmVzdWx0cy5wdXNoKHZvaWQgMCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgICBlID0gX2Vycm9yO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX3Jlc3VsdHM7XG4gIH07XG5cbiAgaWdub3JlU3RhY2sgPSBbXTtcblxuICBQYWNlLmlnbm9yZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBmbiwgcmV0O1xuICAgIGZuID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICBpZ25vcmVTdGFjay51bnNoaWZ0KCdpZ25vcmUnKTtcbiAgICByZXQgPSBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICBpZ25vcmVTdGFjay5zaGlmdCgpO1xuICAgIHJldHVybiByZXQ7XG4gIH07XG5cbiAgUGFjZS50cmFjayA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBmbiwgcmV0O1xuICAgIGZuID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICBpZ25vcmVTdGFjay51bnNoaWZ0KCd0cmFjaycpO1xuICAgIHJldCA9IGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIGlnbm9yZVN0YWNrLnNoaWZ0KCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfTtcblxuICBzaG91bGRUcmFjayA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIHZhciBfcmVmMjtcbiAgICBpZiAobWV0aG9kID09IG51bGwpIHtcbiAgICAgIG1ldGhvZCA9ICdHRVQnO1xuICAgIH1cbiAgICBpZiAoaWdub3JlU3RhY2tbMF0gPT09ICd0cmFjaycpIHtcbiAgICAgIHJldHVybiAnZm9yY2UnO1xuICAgIH1cbiAgICBpZiAoIWlnbm9yZVN0YWNrLmxlbmd0aCAmJiBvcHRpb25zLmFqYXgpIHtcbiAgICAgIGlmIChtZXRob2QgPT09ICdzb2NrZXQnICYmIG9wdGlvbnMuYWpheC50cmFja1dlYlNvY2tldHMpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKF9yZWYyID0gbWV0aG9kLnRvVXBwZXJDYXNlKCksIF9faW5kZXhPZi5jYWxsKG9wdGlvbnMuYWpheC50cmFja01ldGhvZHMsIF9yZWYyKSA+PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgUmVxdWVzdEludGVyY2VwdCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUmVxdWVzdEludGVyY2VwdCwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIFJlcXVlc3RJbnRlcmNlcHQoKSB7XG4gICAgICB2YXIgbW9uaXRvclhIUixcbiAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAgUmVxdWVzdEludGVyY2VwdC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIG1vbml0b3JYSFIgPSBmdW5jdGlvbihyZXEpIHtcbiAgICAgICAgdmFyIF9vcGVuO1xuICAgICAgICBfb3BlbiA9IHJlcS5vcGVuO1xuICAgICAgICByZXR1cm4gcmVxLm9wZW4gPSBmdW5jdGlvbih0eXBlLCB1cmwsIGFzeW5jKSB7XG4gICAgICAgICAgaWYgKHNob3VsZFRyYWNrKHR5cGUpKSB7XG4gICAgICAgICAgICBfdGhpcy50cmlnZ2VyKCdyZXF1ZXN0Jywge1xuICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgcmVxdWVzdDogcmVxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIF9vcGVuLmFwcGx5KHJlcSwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPSBmdW5jdGlvbihmbGFncykge1xuICAgICAgICB2YXIgcmVxO1xuICAgICAgICByZXEgPSBuZXcgX1hNTEh0dHBSZXF1ZXN0KGZsYWdzKTtcbiAgICAgICAgbW9uaXRvclhIUihyZXEpO1xuICAgICAgICByZXR1cm4gcmVxO1xuICAgICAgfTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGV4dGVuZE5hdGl2ZSh3aW5kb3cuWE1MSHR0cFJlcXVlc3QsIF9YTUxIdHRwUmVxdWVzdCk7XG4gICAgICB9IGNhdGNoIChfZXJyb3IpIHt9XG4gICAgICBpZiAoX1hEb21haW5SZXF1ZXN0ICE9IG51bGwpIHtcbiAgICAgICAgd2luZG93LlhEb21haW5SZXF1ZXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHJlcTtcbiAgICAgICAgICByZXEgPSBuZXcgX1hEb21haW5SZXF1ZXN0O1xuICAgICAgICAgIG1vbml0b3JYSFIocmVxKTtcbiAgICAgICAgICByZXR1cm4gcmVxO1xuICAgICAgICB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGV4dGVuZE5hdGl2ZSh3aW5kb3cuWERvbWFpblJlcXVlc3QsIF9YRG9tYWluUmVxdWVzdCk7XG4gICAgICAgIH0gY2F0Y2ggKF9lcnJvcikge31cbiAgICAgIH1cbiAgICAgIGlmICgoX1dlYlNvY2tldCAhPSBudWxsKSAmJiBvcHRpb25zLmFqYXgudHJhY2tXZWJTb2NrZXRzKSB7XG4gICAgICAgIHdpbmRvdy5XZWJTb2NrZXQgPSBmdW5jdGlvbih1cmwsIHByb3RvY29scykge1xuICAgICAgICAgIHZhciByZXE7XG4gICAgICAgICAgaWYgKHByb3RvY29scyAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXEgPSBuZXcgX1dlYlNvY2tldCh1cmwsIHByb3RvY29scyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcSA9IG5ldyBfV2ViU29ja2V0KHVybCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzaG91bGRUcmFjaygnc29ja2V0JykpIHtcbiAgICAgICAgICAgIF90aGlzLnRyaWdnZXIoJ3JlcXVlc3QnLCB7XG4gICAgICAgICAgICAgIHR5cGU6ICdzb2NrZXQnLFxuICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgcHJvdG9jb2xzOiBwcm90b2NvbHMsXG4gICAgICAgICAgICAgIHJlcXVlc3Q6IHJlcVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXE7XG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZXh0ZW5kTmF0aXZlKHdpbmRvdy5XZWJTb2NrZXQsIF9XZWJTb2NrZXQpO1xuICAgICAgICB9IGNhdGNoIChfZXJyb3IpIHt9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFJlcXVlc3RJbnRlcmNlcHQ7XG5cbiAgfSkoRXZlbnRzKTtcblxuICBfaW50ZXJjZXB0ID0gbnVsbDtcblxuICBnZXRJbnRlcmNlcHQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoX2ludGVyY2VwdCA9PSBudWxsKSB7XG4gICAgICBfaW50ZXJjZXB0ID0gbmV3IFJlcXVlc3RJbnRlcmNlcHQ7XG4gICAgfVxuICAgIHJldHVybiBfaW50ZXJjZXB0O1xuICB9O1xuXG4gIHNob3VsZElnbm9yZVVSTCA9IGZ1bmN0aW9uKHVybCkge1xuICAgIHZhciBwYXR0ZXJuLCBfaiwgX2xlbjEsIF9yZWYyO1xuICAgIF9yZWYyID0gb3B0aW9ucy5hamF4Lmlnbm9yZVVSTHM7XG4gICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjIubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICBwYXR0ZXJuID0gX3JlZjJbX2pdO1xuICAgICAgaWYgKHR5cGVvZiBwYXR0ZXJuID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodXJsLmluZGV4T2YocGF0dGVybikgIT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwYXR0ZXJuLnRlc3QodXJsKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBnZXRJbnRlcmNlcHQoKS5vbigncmVxdWVzdCcsIGZ1bmN0aW9uKF9hcmcpIHtcbiAgICB2YXIgYWZ0ZXIsIGFyZ3MsIHJlcXVlc3QsIHR5cGUsIHVybDtcbiAgICB0eXBlID0gX2FyZy50eXBlLCByZXF1ZXN0ID0gX2FyZy5yZXF1ZXN0LCB1cmwgPSBfYXJnLnVybDtcbiAgICBpZiAoc2hvdWxkSWdub3JlVVJMKHVybCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFQYWNlLnJ1bm5pbmcgJiYgKG9wdGlvbnMucmVzdGFydE9uUmVxdWVzdEFmdGVyICE9PSBmYWxzZSB8fCBzaG91bGRUcmFjayh0eXBlKSA9PT0gJ2ZvcmNlJykpIHtcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBhZnRlciA9IG9wdGlvbnMucmVzdGFydE9uUmVxdWVzdEFmdGVyIHx8IDA7XG4gICAgICBpZiAodHlwZW9mIGFmdGVyID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgYWZ0ZXIgPSAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzdGlsbEFjdGl2ZSwgX2osIF9sZW4xLCBfcmVmMiwgX3JlZjMsIF9yZXN1bHRzO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3NvY2tldCcpIHtcbiAgICAgICAgICBzdGlsbEFjdGl2ZSA9IHJlcXVlc3QucmVhZHlTdGF0ZSA8IDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RpbGxBY3RpdmUgPSAoMCA8IChfcmVmMiA9IHJlcXVlc3QucmVhZHlTdGF0ZSkgJiYgX3JlZjIgPCA0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RpbGxBY3RpdmUpIHtcbiAgICAgICAgICBQYWNlLnJlc3RhcnQoKTtcbiAgICAgICAgICBfcmVmMyA9IFBhY2Uuc291cmNlcztcbiAgICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYzLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICAgICAgc291cmNlID0gX3JlZjNbX2pdO1xuICAgICAgICAgICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIEFqYXhNb25pdG9yKSB7XG4gICAgICAgICAgICAgIHNvdXJjZS53YXRjaC5hcHBseShzb3VyY2UsIGFyZ3MpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF9yZXN1bHRzLnB1c2godm9pZCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgICB9XG4gICAgICB9LCBhZnRlcik7XG4gICAgfVxuICB9KTtcblxuICBBamF4TW9uaXRvciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBBamF4TW9uaXRvcigpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgICBnZXRJbnRlcmNlcHQoKS5vbigncmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMud2F0Y2guYXBwbHkoX3RoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBBamF4TW9uaXRvci5wcm90b3R5cGUud2F0Y2ggPSBmdW5jdGlvbihfYXJnKSB7XG4gICAgICB2YXIgcmVxdWVzdCwgdHJhY2tlciwgdHlwZSwgdXJsO1xuICAgICAgdHlwZSA9IF9hcmcudHlwZSwgcmVxdWVzdCA9IF9hcmcucmVxdWVzdCwgdXJsID0gX2FyZy51cmw7XG4gICAgICBpZiAoc2hvdWxkSWdub3JlVVJMKHVybCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgPT09ICdzb2NrZXQnKSB7XG4gICAgICAgIHRyYWNrZXIgPSBuZXcgU29ja2V0UmVxdWVzdFRyYWNrZXIocmVxdWVzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmFja2VyID0gbmV3IFhIUlJlcXVlc3RUcmFja2VyKHJlcXVlc3QpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHMucHVzaCh0cmFja2VyKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEFqYXhNb25pdG9yO1xuXG4gIH0pKCk7XG5cbiAgWEhSUmVxdWVzdFRyYWNrZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gWEhSUmVxdWVzdFRyYWNrZXIocmVxdWVzdCkge1xuICAgICAgdmFyIGV2ZW50LCBzaXplLCBfaiwgX2xlbjEsIF9vbnJlYWR5c3RhdGVjaGFuZ2UsIF9yZWYyLFxuICAgICAgICBfdGhpcyA9IHRoaXM7XG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICAgIGlmICh3aW5kb3cuUHJvZ3Jlc3NFdmVudCAhPSBudWxsKSB7XG4gICAgICAgIHNpemUgPSBudWxsO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgaWYgKGV2dC5sZW5ndGhDb21wdXRhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucHJvZ3Jlc3MgPSAxMDAgKiBldnQubG9hZGVkIC8gZXZ0LnRvdGFsO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucHJvZ3Jlc3MgPSBfdGhpcy5wcm9ncmVzcyArICgxMDAgLSBfdGhpcy5wcm9ncmVzcykgLyAyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICBfcmVmMiA9IFsnbG9hZCcsICdhYm9ydCcsICd0aW1lb3V0JywgJ2Vycm9yJ107XG4gICAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICAgIGV2ZW50ID0gX3JlZjJbX2pdO1xuICAgICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucHJvZ3Jlc3MgPSAxMDA7XG4gICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfb25yZWFkeXN0YXRlY2hhbmdlID0gcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2U7XG4gICAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIF9yZWYzO1xuICAgICAgICAgIGlmICgoX3JlZjMgPSByZXF1ZXN0LnJlYWR5U3RhdGUpID09PSAwIHx8IF9yZWYzID09PSA0KSB7XG4gICAgICAgICAgICBfdGhpcy5wcm9ncmVzcyA9IDEwMDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PT0gMykge1xuICAgICAgICAgICAgX3RoaXMucHJvZ3Jlc3MgPSA1MDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiBfb25yZWFkeXN0YXRlY2hhbmdlID09PSBcImZ1bmN0aW9uXCIgPyBfb25yZWFkeXN0YXRlY2hhbmdlLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgOiB2b2lkIDA7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFhIUlJlcXVlc3RUcmFja2VyO1xuXG4gIH0pKCk7XG5cbiAgU29ja2V0UmVxdWVzdFRyYWNrZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gU29ja2V0UmVxdWVzdFRyYWNrZXIocmVxdWVzdCkge1xuICAgICAgdmFyIGV2ZW50LCBfaiwgX2xlbjEsIF9yZWYyLFxuICAgICAgICBfdGhpcyA9IHRoaXM7XG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICAgIF9yZWYyID0gWydlcnJvcicsICdvcGVuJ107XG4gICAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMi5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgICAgZXZlbnQgPSBfcmVmMltfal07XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLnByb2dyZXNzID0gMTAwO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFNvY2tldFJlcXVlc3RUcmFja2VyO1xuXG4gIH0pKCk7XG5cbiAgRWxlbWVudE1vbml0b3IgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gRWxlbWVudE1vbml0b3Iob3B0aW9ucykge1xuICAgICAgdmFyIHNlbGVjdG9yLCBfaiwgX2xlbjEsIF9yZWYyO1xuICAgICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgICB9XG4gICAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgICBpZiAob3B0aW9ucy5zZWxlY3RvcnMgPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zLnNlbGVjdG9ycyA9IFtdO1xuICAgICAgfVxuICAgICAgX3JlZjIgPSBvcHRpb25zLnNlbGVjdG9ycztcbiAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICBzZWxlY3RvciA9IF9yZWYyW19qXTtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKG5ldyBFbGVtZW50VHJhY2tlcihzZWxlY3RvcikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBFbGVtZW50TW9uaXRvcjtcblxuICB9KSgpO1xuXG4gIEVsZW1lbnRUcmFja2VyID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIEVsZW1lbnRUcmFja2VyKHNlbGVjdG9yKSB7XG4gICAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICAgIHRoaXMuY2hlY2soKTtcbiAgICB9XG5cbiAgICBFbGVtZW50VHJhY2tlci5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kb25lKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLmNoZWNrKCk7XG4gICAgICAgIH0pLCBvcHRpb25zLmVsZW1lbnRzLmNoZWNrSW50ZXJ2YWwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBFbGVtZW50VHJhY2tlci5wcm90b3R5cGUuZG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3MgPSAxMDA7XG4gICAgfTtcblxuICAgIHJldHVybiBFbGVtZW50VHJhY2tlcjtcblxuICB9KSgpO1xuXG4gIERvY3VtZW50TW9uaXRvciA9IChmdW5jdGlvbigpIHtcbiAgICBEb2N1bWVudE1vbml0b3IucHJvdG90eXBlLnN0YXRlcyA9IHtcbiAgICAgIGxvYWRpbmc6IDAsXG4gICAgICBpbnRlcmFjdGl2ZTogNTAsXG4gICAgICBjb21wbGV0ZTogMTAwXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIERvY3VtZW50TW9uaXRvcigpIHtcbiAgICAgIHZhciBfb25yZWFkeXN0YXRlY2hhbmdlLCBfcmVmMixcbiAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IChfcmVmMiA9IHRoaXMuc3RhdGVzW2RvY3VtZW50LnJlYWR5U3RhdGVdKSAhPSBudWxsID8gX3JlZjIgOiAxMDA7XG4gICAgICBfb25yZWFkeXN0YXRlY2hhbmdlID0gZG9jdW1lbnQub25yZWFkeXN0YXRlY2hhbmdlO1xuICAgICAgZG9jdW1lbnQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChfdGhpcy5zdGF0ZXNbZG9jdW1lbnQucmVhZHlTdGF0ZV0gIT0gbnVsbCkge1xuICAgICAgICAgIF90aGlzLnByb2dyZXNzID0gX3RoaXMuc3RhdGVzW2RvY3VtZW50LnJlYWR5U3RhdGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlb2YgX29ucmVhZHlzdGF0ZWNoYW5nZSA9PT0gXCJmdW5jdGlvblwiID8gX29ucmVhZHlzdGF0ZWNoYW5nZS5hcHBseShudWxsLCBhcmd1bWVudHMpIDogdm9pZCAwO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gRG9jdW1lbnRNb25pdG9yO1xuXG4gIH0pKCk7XG5cbiAgRXZlbnRMYWdNb25pdG9yID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIEV2ZW50TGFnTW9uaXRvcigpIHtcbiAgICAgIHZhciBhdmcsIGludGVydmFsLCBsYXN0LCBwb2ludHMsIHNhbXBsZXMsXG4gICAgICAgIF90aGlzID0gdGhpcztcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICAgICAgYXZnID0gMDtcbiAgICAgIHNhbXBsZXMgPSBbXTtcbiAgICAgIHBvaW50cyA9IDA7XG4gICAgICBsYXN0ID0gbm93KCk7XG4gICAgICBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGlmZjtcbiAgICAgICAgZGlmZiA9IG5vdygpIC0gbGFzdCAtIDUwO1xuICAgICAgICBsYXN0ID0gbm93KCk7XG4gICAgICAgIHNhbXBsZXMucHVzaChkaWZmKTtcbiAgICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID4gb3B0aW9ucy5ldmVudExhZy5zYW1wbGVDb3VudCkge1xuICAgICAgICAgIHNhbXBsZXMuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICBhdmcgPSBhdmdBbXBsaXR1ZGUoc2FtcGxlcyk7XG4gICAgICAgIGlmICgrK3BvaW50cyA+PSBvcHRpb25zLmV2ZW50TGFnLm1pblNhbXBsZXMgJiYgYXZnIDwgb3B0aW9ucy5ldmVudExhZy5sYWdUaHJlc2hvbGQpIHtcbiAgICAgICAgICBfdGhpcy5wcm9ncmVzcyA9IDEwMDtcbiAgICAgICAgICByZXR1cm4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLnByb2dyZXNzID0gMTAwICogKDMgLyAoYXZnICsgMykpO1xuICAgICAgICB9XG4gICAgICB9LCA1MCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEV2ZW50TGFnTW9uaXRvcjtcblxuICB9KSgpO1xuXG4gIFNjYWxlciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBTY2FsZXIoc291cmNlKSB7XG4gICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgIHRoaXMubGFzdCA9IHRoaXMuc2luY2VMYXN0VXBkYXRlID0gMDtcbiAgICAgIHRoaXMucmF0ZSA9IG9wdGlvbnMuaW5pdGlhbFJhdGU7XG4gICAgICB0aGlzLmNhdGNodXAgPSAwO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IHRoaXMubGFzdFByb2dyZXNzID0gMDtcbiAgICAgIGlmICh0aGlzLnNvdXJjZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSByZXN1bHQodGhpcy5zb3VyY2UsICdwcm9ncmVzcycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIFNjYWxlci5wcm90b3R5cGUudGljayA9IGZ1bmN0aW9uKGZyYW1lVGltZSwgdmFsKSB7XG4gICAgICB2YXIgc2NhbGluZztcbiAgICAgIGlmICh2YWwgPT0gbnVsbCkge1xuICAgICAgICB2YWwgPSByZXN1bHQodGhpcy5zb3VyY2UsICdwcm9ncmVzcycpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbCA+PSAxMDApIHtcbiAgICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWwgPT09IHRoaXMubGFzdCkge1xuICAgICAgICB0aGlzLnNpbmNlTGFzdFVwZGF0ZSArPSBmcmFtZVRpbWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5zaW5jZUxhc3RVcGRhdGUpIHtcbiAgICAgICAgICB0aGlzLnJhdGUgPSAodmFsIC0gdGhpcy5sYXN0KSAvIHRoaXMuc2luY2VMYXN0VXBkYXRlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2F0Y2h1cCA9ICh2YWwgLSB0aGlzLnByb2dyZXNzKSAvIG9wdGlvbnMuY2F0Y2h1cFRpbWU7XG4gICAgICAgIHRoaXMuc2luY2VMYXN0VXBkYXRlID0gMDtcbiAgICAgICAgdGhpcy5sYXN0ID0gdmFsO1xuICAgICAgfVxuICAgICAgaWYgKHZhbCA+IHRoaXMucHJvZ3Jlc3MpIHtcbiAgICAgICAgdGhpcy5wcm9ncmVzcyArPSB0aGlzLmNhdGNodXAgKiBmcmFtZVRpbWU7XG4gICAgICB9XG4gICAgICBzY2FsaW5nID0gMSAtIE1hdGgucG93KHRoaXMucHJvZ3Jlc3MgLyAxMDAsIG9wdGlvbnMuZWFzZUZhY3Rvcik7XG4gICAgICB0aGlzLnByb2dyZXNzICs9IHNjYWxpbmcgKiB0aGlzLnJhdGUgKiBmcmFtZVRpbWU7XG4gICAgICB0aGlzLnByb2dyZXNzID0gTWF0aC5taW4odGhpcy5sYXN0UHJvZ3Jlc3MgKyBvcHRpb25zLm1heFByb2dyZXNzUGVyRnJhbWUsIHRoaXMucHJvZ3Jlc3MpO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IE1hdGgubWF4KDAsIHRoaXMucHJvZ3Jlc3MpO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IE1hdGgubWluKDEwMCwgdGhpcy5wcm9ncmVzcyk7XG4gICAgICB0aGlzLmxhc3RQcm9ncmVzcyA9IHRoaXMucHJvZ3Jlc3M7XG4gICAgICByZXR1cm4gdGhpcy5wcm9ncmVzcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIFNjYWxlcjtcblxuICB9KSgpO1xuXG4gIHNvdXJjZXMgPSBudWxsO1xuXG4gIHNjYWxlcnMgPSBudWxsO1xuXG4gIGJhciA9IG51bGw7XG5cbiAgdW5pU2NhbGVyID0gbnVsbDtcblxuICBhbmltYXRpb24gPSBudWxsO1xuXG4gIGNhbmNlbEFuaW1hdGlvbiA9IG51bGw7XG5cbiAgUGFjZS5ydW5uaW5nID0gZmFsc2U7XG5cbiAgaGFuZGxlUHVzaFN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKG9wdGlvbnMucmVzdGFydE9uUHVzaFN0YXRlKSB7XG4gICAgICByZXR1cm4gUGFjZS5yZXN0YXJ0KCk7XG4gICAgfVxuICB9O1xuXG4gIGlmICh3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgIT0gbnVsbCkge1xuICAgIF9wdXNoU3RhdGUgPSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGU7XG4gICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBoYW5kbGVQdXNoU3RhdGUoKTtcbiAgICAgIHJldHVybiBfcHVzaFN0YXRlLmFwcGx5KHdpbmRvdy5oaXN0b3J5LCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICBpZiAod2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlICE9IG51bGwpIHtcbiAgICBfcmVwbGFjZVN0YXRlID0gd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlO1xuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaGFuZGxlUHVzaFN0YXRlKCk7XG4gICAgICByZXR1cm4gX3JlcGxhY2VTdGF0ZS5hcHBseSh3aW5kb3cuaGlzdG9yeSwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgU09VUkNFX0tFWVMgPSB7XG4gICAgYWpheDogQWpheE1vbml0b3IsXG4gICAgZWxlbWVudHM6IEVsZW1lbnRNb25pdG9yLFxuICAgIGRvY3VtZW50OiBEb2N1bWVudE1vbml0b3IsXG4gICAgZXZlbnRMYWc6IEV2ZW50TGFnTW9uaXRvclxuICB9O1xuXG4gIChpbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHR5cGUsIF9qLCBfaywgX2xlbjEsIF9sZW4yLCBfcmVmMiwgX3JlZjMsIF9yZWY0O1xuICAgIFBhY2Uuc291cmNlcyA9IHNvdXJjZXMgPSBbXTtcbiAgICBfcmVmMiA9IFsnYWpheCcsICdlbGVtZW50cycsICdkb2N1bWVudCcsICdldmVudExhZyddO1xuICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgdHlwZSA9IF9yZWYyW19qXTtcbiAgICAgIGlmIChvcHRpb25zW3R5cGVdICE9PSBmYWxzZSkge1xuICAgICAgICBzb3VyY2VzLnB1c2gobmV3IFNPVVJDRV9LRVlTW3R5cGVdKG9wdGlvbnNbdHlwZV0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgX3JlZjQgPSAoX3JlZjMgPSBvcHRpb25zLmV4dHJhU291cmNlcykgIT0gbnVsbCA/IF9yZWYzIDogW107XG4gICAgZm9yIChfayA9IDAsIF9sZW4yID0gX3JlZjQubGVuZ3RoOyBfayA8IF9sZW4yOyBfaysrKSB7XG4gICAgICBzb3VyY2UgPSBfcmVmNFtfa107XG4gICAgICBzb3VyY2VzLnB1c2gobmV3IHNvdXJjZShvcHRpb25zKSk7XG4gICAgfVxuICAgIFBhY2UuYmFyID0gYmFyID0gbmV3IEJhcjtcbiAgICBzY2FsZXJzID0gW107XG4gICAgcmV0dXJuIHVuaVNjYWxlciA9IG5ldyBTY2FsZXI7XG4gIH0pKCk7XG5cbiAgUGFjZS5zdG9wID0gZnVuY3Rpb24oKSB7XG4gICAgUGFjZS50cmlnZ2VyKCdzdG9wJyk7XG4gICAgUGFjZS5ydW5uaW5nID0gZmFsc2U7XG4gICAgYmFyLmRlc3Ryb3koKTtcbiAgICBjYW5jZWxBbmltYXRpb24gPSB0cnVlO1xuICAgIGlmIChhbmltYXRpb24gIT0gbnVsbCkge1xuICAgICAgaWYgKHR5cGVvZiBjYW5jZWxBbmltYXRpb25GcmFtZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbik7XG4gICAgICB9XG4gICAgICBhbmltYXRpb24gPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gaW5pdCgpO1xuICB9O1xuXG4gIFBhY2UucmVzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIFBhY2UudHJpZ2dlcigncmVzdGFydCcpO1xuICAgIFBhY2Uuc3RvcCgpO1xuICAgIHJldHVybiBQYWNlLnN0YXJ0KCk7XG4gIH07XG5cbiAgUGFjZS5nbyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdGFydDtcbiAgICBQYWNlLnJ1bm5pbmcgPSB0cnVlO1xuICAgIGJhci5yZW5kZXIoKTtcbiAgICBzdGFydCA9IG5vdygpO1xuICAgIGNhbmNlbEFuaW1hdGlvbiA9IGZhbHNlO1xuICAgIHJldHVybiBhbmltYXRpb24gPSBydW5BbmltYXRpb24oZnVuY3Rpb24oZnJhbWVUaW1lLCBlbnF1ZXVlTmV4dEZyYW1lKSB7XG4gICAgICB2YXIgYXZnLCBjb3VudCwgZG9uZSwgZWxlbWVudCwgZWxlbWVudHMsIGksIGosIHJlbWFpbmluZywgc2NhbGVyLCBzY2FsZXJMaXN0LCBzdW0sIF9qLCBfaywgX2xlbjEsIF9sZW4yLCBfcmVmMjtcbiAgICAgIHJlbWFpbmluZyA9IDEwMCAtIGJhci5wcm9ncmVzcztcbiAgICAgIGNvdW50ID0gc3VtID0gMDtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgZm9yIChpID0gX2ogPSAwLCBfbGVuMSA9IHNvdXJjZXMubGVuZ3RoOyBfaiA8IF9sZW4xOyBpID0gKytfaikge1xuICAgICAgICBzb3VyY2UgPSBzb3VyY2VzW2ldO1xuICAgICAgICBzY2FsZXJMaXN0ID0gc2NhbGVyc1tpXSAhPSBudWxsID8gc2NhbGVyc1tpXSA6IHNjYWxlcnNbaV0gPSBbXTtcbiAgICAgICAgZWxlbWVudHMgPSAoX3JlZjIgPSBzb3VyY2UuZWxlbWVudHMpICE9IG51bGwgPyBfcmVmMiA6IFtzb3VyY2VdO1xuICAgICAgICBmb3IgKGogPSBfayA9IDAsIF9sZW4yID0gZWxlbWVudHMubGVuZ3RoOyBfayA8IF9sZW4yOyBqID0gKytfaykge1xuICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50c1tqXTtcbiAgICAgICAgICBzY2FsZXIgPSBzY2FsZXJMaXN0W2pdICE9IG51bGwgPyBzY2FsZXJMaXN0W2pdIDogc2NhbGVyTGlzdFtqXSA9IG5ldyBTY2FsZXIoZWxlbWVudCk7XG4gICAgICAgICAgZG9uZSAmPSBzY2FsZXIuZG9uZTtcbiAgICAgICAgICBpZiAoc2NhbGVyLmRvbmUpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgIHN1bSArPSBzY2FsZXIudGljayhmcmFtZVRpbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhdmcgPSBzdW0gLyBjb3VudDtcbiAgICAgIGJhci51cGRhdGUodW5pU2NhbGVyLnRpY2soZnJhbWVUaW1lLCBhdmcpKTtcbiAgICAgIGlmIChiYXIuZG9uZSgpIHx8IGRvbmUgfHwgY2FuY2VsQW5pbWF0aW9uKSB7XG4gICAgICAgIGJhci51cGRhdGUoMTAwKTtcbiAgICAgICAgUGFjZS50cmlnZ2VyKCdkb25lJyk7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGJhci5maW5pc2goKTtcbiAgICAgICAgICBQYWNlLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gUGFjZS50cmlnZ2VyKCdoaWRlJyk7XG4gICAgICAgIH0sIE1hdGgubWF4KG9wdGlvbnMuZ2hvc3RUaW1lLCBNYXRoLm1heChvcHRpb25zLm1pblRpbWUgLSAobm93KCkgLSBzdGFydCksIDApKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZW5xdWV1ZU5leHRGcmFtZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIFBhY2Uuc3RhcnQgPSBmdW5jdGlvbihfb3B0aW9ucykge1xuICAgIGV4dGVuZChvcHRpb25zLCBfb3B0aW9ucyk7XG4gICAgUGFjZS5ydW5uaW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgYmFyLnJlbmRlcigpO1xuICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgTm9UYXJnZXRFcnJvciA9IF9lcnJvcjtcbiAgICB9XG4gICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFjZScpKSB7XG4gICAgICByZXR1cm4gc2V0VGltZW91dChQYWNlLnN0YXJ0LCA1MCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFBhY2UudHJpZ2dlcignc3RhcnQnKTtcbiAgICAgIHJldHVybiBQYWNlLmdvKCk7XG4gICAgfVxuICB9O1xuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoWydwYWNlJ10sIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFBhY2U7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBQYWNlO1xuICB9IGVsc2Uge1xuICAgIGlmIChvcHRpb25zLnN0YXJ0T25QYWdlTG9hZCkge1xuICAgICAgUGFjZS5zdGFydCgpO1xuICAgIH1cbiAgfVxuXG59KS5jYWxsKHRoaXMpO1xuIl19
