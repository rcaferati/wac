(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["wac"] = factory();
	else
		root["wac"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCssEndEvent", function() { return setCssEndEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "beforeCssLayout", function() { return beforeCssLayout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "beforeNextCssLayout", function() { return beforeNextCssLayout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "beforeFutureCssLayout", function() { return beforeFutureCssLayout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onceTransitionEnd", function() { return onceTransitionEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onceAnimationEnd", function() { return onceAnimationEnd; });
function recursiveAnimationFrame(frames, callback) {
  if (frames && Number.isInteger(frames) && frames > 0) {
    window.requestAnimationFrame(() => {
      recursiveAnimationFrame(frames - 1, callback);
    });
    return;
  }
  callback();
}

function setCssEndEvent(element, type, { tolerance = 0, propertyName }) {
  return new Promise(resolve => {
    if (!element) {
      resolve(false);
      return;
    }
    let eventName = null;
    const capitalized = type.charAt(0).toUpperCase() + type.slice(1);
    let run = 0;
    function end(event) {
      const target = event.srcElement || event.target;
      if (target === element) {
        if (run >= tolerance) {
          if (propertyName && propertyName !== event.propertyName) {
            return;
          }
          element.removeEventListener(eventName, end);
          resolve(event);
        }
        run += 1;
      }
    }
    if (element.style[`Webkit${capitalized}`] !== undefined) {
      eventName = `webkit${capitalized}End`;
    }
    if (element.style.OTransition !== undefined) {
      eventName = `o${type}End`;
    }
    if (element.style[type] !== undefined) {
      eventName = `${type}end`;
    }
    element.addEventListener(eventName, end);
  });
}

function beforeCssLayout(callback) {
  window.requestAnimationFrame(callback);
}

function beforeNextCssLayout(callback) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(callback);
  });
}

function beforeFutureCssLayout(frames, callback) {
  recursiveAnimationFrame(frames + 1, callback);
}

function onceTransitionEnd(element, options = {}) {
  return new Promise(resolve => {
    setCssEndEvent(element, 'transition', options).then(resolve);
  });
}

function onceAnimationEnd(element, options = {}) {
  return new Promise(resolve => {
    setCssEndEvent(element, 'animation', options).then(resolve);
  });
}

/***/ })
/******/ ]);
});