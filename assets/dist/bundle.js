parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"igKP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.darkModeSupport=exports.heroAnimation=exports.smoothScrolling=exports.stickyHeader=exports.lateInit=void 0;var e=function(){window.setTimeout(function(){document.body.classList.add("loaded")},500)};exports.lateInit=e;var t=function(){var e=document.querySelector("header#app-topbar"),t=0;window.addEventListener("scroll",function(){window.scrollY<(window.matchMedia("(max-width: 650px)").matches?1:750)?e.classList.remove("opaque"):(e.classList.add("opaque"),e.classList.toggle("hidden",document.body.getBoundingClientRect().top<t)),t=document.body.getBoundingClientRect().top})};exports.stickyHeader=t;var o=function(){Array.from(document.querySelectorAll('a[href*="#"]:not([href="#"])')).forEach(function(e){return e.addEventListener("click",function(t){t.preventDefault(),document.querySelector("header#app-topbar").classList.add("hidden"),document.querySelector(e.getAttribute("href")).scrollIntoView({behavior:"smooth"})},!1)})};exports.smoothScrolling=o;var r=function(){var e=document.querySelector("#app-hero");try{e&&"true"===localStorage.getItem("staticHero")&&e.classList.add("static"),localStorage.setItem("staticHero","true")}catch(t){e&&e.classList.add("static")}};exports.heroAnimation=r;var c=function(){window.matchMedia("(prefers-color-scheme: dark)").addListener(a),a(),document.addEventListener("keydown",function(e){"m"===e.key&&a(document.body.classList.contains("darkmode")?"light":"dark")})};exports.darkModeSupport=c;var a=function(e){var t=localStorage.getItem("savedMode"),o=null;if(e)switch(e){case"light":case"dark":o=e;case"system":try{localStorage.setItem("savedMode",e)}catch(r){}}else"light"!==t&&"dark"!==t||(o=t);switch(o){case"light":return n();case"dark":return s();default:window.matchMedia("(prefers-color-scheme: dark)").matches?s():n()}},n=function(){document.body.classList.remove("darkmode"),document.querySelector('link[rel="icon"]').setAttribute("href","assets/images/icon_light.png"),document.querySelector('link[rel="apple-touch-icon"]').setAttribute("href","assets/images/icon_apple_light.png"),document.querySelector('link[rel="mask-icon"]').setAttribute("color","#030044"),document.querySelector('meta[name="theme-color"]').setAttribute("content","#fff"),document.querySelector('meta[name="msapplication-TileColor"]').setAttribute("content","#fff")},s=function(){document.body.classList.add("darkmode"),document.querySelector('link[rel="icon"]').setAttribute("href","assets/images/icon_dark.png"),document.querySelector('link[rel="apple-touch-icon"]').setAttribute("href","assets/images/icon_apple_dark.png"),document.querySelector('link[rel="mask-icon"]').setAttribute("color","#fff"),document.querySelector('meta[name="theme-color"]').setAttribute("content","#000"),document.querySelector('meta[name="msapplication-TileColor"]').setAttribute("content","#000")};
},{}],"C4Nx":[function(require,module,exports) {
"use strict";var e=require("./js/pageutils");(0,e.lateInit)(),(0,e.stickyHeader)(),(0,e.smoothScrolling)(),(0,e.heroAnimation)(),(0,e.darkModeSupport)();
},{"./js/pageutils":"igKP"}]},{},["C4Nx"], null)
//# sourceMappingURL=/bundle.js.map