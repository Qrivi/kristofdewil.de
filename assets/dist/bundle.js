<<<<<<< HEAD
parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"igKP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.darkModeSupport=exports.heroAnimation=exports.smoothScrolling=exports.stickyHeader=void 0;var e=function(){var e=document.querySelector("header#app-topbar"),t=0;window.addEventListener("scroll",function(){window.scrollY<(window.matchMedia("(max-width: 650px)").matches?1:750)?e.classList.remove("opaque"):(e.classList.add("opaque"),e.classList.toggle("hidden",document.body.getBoundingClientRect().top<t)),t=document.body.getBoundingClientRect().top})};exports.stickyHeader=e;var t=function(){Array.from(document.querySelectorAll('a[href*="#"]:not([href="#"])')).forEach(function(e){return e.addEventListener("click",function(t){t.preventDefault(),document.querySelector("header#app-topbar").classList.add("hidden"),document.querySelector(e.getAttribute("href")).scrollIntoView({behavior:"smooth"})},!1)})};exports.smoothScrolling=t;var o=function(){var e=document.querySelector("#app-hero");try{e&&"true"===localStorage.getItem("staticHero")&&e.classList.add("static"),localStorage.setItem("staticHero","true")}catch(t){e&&e.classList.add("static")}};exports.heroAnimation=o;var r=function(){window.matchMedia("(prefers-color-scheme: dark)").addListener(c),c(),document.addEventListener("keydown",function(e){"m"===e.key&&c(document.body.classList.contains("darkmode")?"light":"dark")})};exports.darkModeSupport=r;var c=function(e){var t=localStorage.getItem("savedMode"),o=null;if(e)switch(e){case"light":case"dark":o=e;case"system":try{localStorage.setItem("savedMode",e)}catch(r){}}else"light"!==t&&"dark"!==t||(o=t);switch(o){case"light":return a();case"dark":return n();default:window.matchMedia("(prefers-color-scheme: dark)").matches?n():a()}},a=function(){document.body.classList.remove("darkmode"),document.querySelector('link[rel="icon"]').setAttribute("href","assets/images/icon_light.png"),document.querySelector('link[rel="apple-touch-icon"]').setAttribute("href","assets/images/icon_apple_light.png"),document.querySelector('link[rel="mask-icon"]').setAttribute("color","#030044"),document.querySelector('meta[name="theme-color"]').setAttribute("content","#fff"),document.querySelector('meta[name="msapplication-TileColor"]').setAttribute("content","#fff")},n=function(){document.body.classList.add("darkmode"),document.querySelector('link[rel="icon"]').setAttribute("href","assets/images/icon_dark.png"),document.querySelector('link[rel="apple-touch-icon"]').setAttribute("href","assets/images/icon_apple_dark.png"),document.querySelector('link[rel="mask-icon"]').setAttribute("color","#fff"),document.querySelector('meta[name="theme-color"]').setAttribute("content","#000"),document.querySelector('meta[name="msapplication-TileColor"]').setAttribute("content","#000")};
},{}],"C4Nx":[function(require,module,exports) {
"use strict";var r=require("./js/pageutils");(0,r.stickyHeader)(),(0,r.smoothScrolling)(),(0,r.heroAnimation)(),(0,r.darkModeSupport)();
},{"./js/pageutils":"igKP"}]},{},["C4Nx"], null)
=======
// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/pageutils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.darkModeSupport = exports.heroAnimation = exports.smoothScrolling = exports.stickyHeader = exports.lateInit = void 0;

var lateInit = function lateInit() {
  window.setTimeout(function () {
    document.body.classList.add('loaded');
  }, 500);
};

exports.lateInit = lateInit;

var stickyHeader = function stickyHeader() {
  var header = document.querySelector('header#app-topbar');
  var scrollPos = 0;
  window.addEventListener('scroll', function () {
    if (window.scrollY < (window.matchMedia('(max-width: 650px)').matches ? 1 : 750)) {
      header.classList.remove('opaque');
    } else {
      header.classList.add('opaque');
      header.classList.toggle('hidden', document.body.getBoundingClientRect().top < scrollPos);
    }

    scrollPos = document.body.getBoundingClientRect().top;
  });
};

exports.stickyHeader = stickyHeader;

var smoothScrolling = function smoothScrolling() {
  Array.from(document.querySelectorAll('a[href*="#"]:not([href="#"])')).forEach(function (link) {
    return link.addEventListener('click', function (event) {
      event.preventDefault();
      document.querySelector('header#app-topbar').classList.add('hidden');
      document.querySelector(link.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    }, false);
  });
};

exports.smoothScrolling = smoothScrolling;

var heroAnimation = function heroAnimation() {
  var hero = document.querySelector('#app-hero');

  try {
    if (hero && localStorage.getItem('staticHero') === 'true') {
      hero.classList.add('static');
    }

    localStorage.setItem('staticHero', 'true');
  } catch (err) {
    if (hero) {
      hero.classList.add('static');
    }
  }
};

exports.heroAnimation = heroAnimation;

var darkModeSupport = function darkModeSupport() {
  window.matchMedia('(prefers-color-scheme: dark)').addListener(adaptColorScheme);
  adaptColorScheme();
  document.addEventListener('keydown', function (event) {
    if (event.key === 'm') {
      adaptColorScheme(document.body.classList.contains('darkmode') ? 'light' : 'dark');
    }
  });
};

exports.darkModeSupport = darkModeSupport;

var adaptColorScheme = function adaptColorScheme(forcedMode) {
  var savedMode = localStorage.getItem('savedMode');
  var newMode = null;

  if (forcedMode) {
    switch (forcedMode) {
      case 'light':
      case 'dark':
        newMode = forcedMode;

      case 'system':
        try {
          localStorage.setItem('savedMode', forcedMode);
        } catch (err) {// localStorage unavailable: mode won't be persisted
        }

    }
  } else if (savedMode === 'light' || savedMode === 'dark') {
    newMode = savedMode;
  }

  switch (newMode) {
    case 'light':
      return setLightMode();

    case 'dark':
      return setDarkMode();

    default:
      window.matchMedia('(prefers-color-scheme: dark)').matches ? setDarkMode() : setLightMode();
  }
};

var setLightMode = function setLightMode() {
  document.body.classList.remove('darkmode');
  document.querySelector('link[rel="icon"]').setAttribute('href', 'assets/images/icon_light.png');
  document.querySelector('link[rel="apple-touch-icon"]').setAttribute('href', 'assets/images/icon_apple_light.png');
  document.querySelector('link[rel="mask-icon"]').setAttribute('color', '#030044');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#fff');
  document.querySelector('meta[name="msapplication-TileColor"]').setAttribute('content', '#fff');
};

var setDarkMode = function setDarkMode() {
  document.body.classList.add('darkmode');
  document.querySelector('link[rel="icon"]').setAttribute('href', 'assets/images/icon_dark.png');
  document.querySelector('link[rel="apple-touch-icon"]').setAttribute('href', 'assets/images/icon_apple_dark.png');
  document.querySelector('link[rel="mask-icon"]').setAttribute('color', '#fff');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000');
  document.querySelector('meta[name="msapplication-TileColor"]').setAttribute('content', '#000');
};
},{}],"bundle.js":[function(require,module,exports) {
"use strict";

var _pageutils = require("./js/pageutils");

(0, _pageutils.lateInit)();
(0, _pageutils.stickyHeader)();
(0, _pageutils.smoothScrolling)();
(0, _pageutils.heroAnimation)();
(0, _pageutils.darkModeSupport)();
},{"./js/pageutils":"js/pageutils.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64717" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","bundle.js"], null)
>>>>>>> Added delay to certain CSS transitions
//# sourceMappingURL=/bundle.js.map