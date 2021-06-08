/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/assets/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/js/main.js":
/*!*******************************!*\
  !*** ./src/assets/js/main.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_addStep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/addStep */ "./src/assets/js/modules/addStep.js");
/* harmony import */ var _modules_deleteStep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/deleteStep */ "./src/assets/js/modules/deleteStep.js");
/* harmony import */ var _modules_scroolToUp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/scroolToUp */ "./src/assets/js/modules/scroolToUp.js");



'use strict';

Object(_modules_addStep__WEBPACK_IMPORTED_MODULE_0__["default"])('.recipe-ingredients__list', '#add-ingredient');
Object(_modules_addStep__WEBPACK_IMPORTED_MODULE_0__["default"])('.recipe-instruction__list', '#add-step');
Object(_modules_deleteStep__WEBPACK_IMPORTED_MODULE_1__["default"])('.recipe-ingredients__list', '.ingredient__delete');
Object(_modules_deleteStep__WEBPACK_IMPORTED_MODULE_1__["default"])('.recipe-instruction__list', '.instruction__delete');
Object(_modules_scroolToUp__WEBPACK_IMPORTED_MODULE_2__["default"])();

/***/ }),

/***/ "./src/assets/js/modules/addStep.js":
/*!******************************************!*\
  !*** ./src/assets/js/modules/addStep.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var addStep = function addStep(listSelector, btnSelector) {
  try {
    var list = document.querySelector(listSelector),
        btnAddItem = document.querySelector(btnSelector);
    btnAddItem.addEventListener('click', function () {
      var li = document.createElement('li');

      if (list.className == 'recipe-instruction__list') {
        li.classList.add('recipe-instruction__step', 'flex');
        li.innerHTML = "\n          <p class=\"input-group__header\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0440\u0435\u0446\u0435\u043F\u0442\u0430</p>\n          <button class=\"btn__delete\"><ion-icon class=\"instruction__delete\" name=\"close-outline\"></ion-icon></button>\n          <div class=\"recipe-instruction__img\">\n            <label class=\"img-load__label\"> \n              <p class=\"input-group__header\">\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u043E\u0442\u043E</p>\n              <input class=\"img-load__input\" type=\"file\">\n            </label>\n            <label class=\"img-checkbox__label\">\n              <input class=\"img-checkbox__input\" type=\"checkbox\" name=\"\" id=\"without-photo\">\n              <span class=\"img-checkbox__text\">\u0431\u0435\u0437 \u0444\u043E\u0442\u043E</span> \n            </label>\n          </div>\n          <textarea class=\"recipe-instruction__text\" name=\"\" id=\"\" placeholder=\"\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0448\u0430\u0433\u0430 \u0440\u0435\u0446\u0435\u043F\u0442\u0430...\" maxlength=\"700\"></textarea>";
      } else {
        li.classList.add('flex', 'recipe-ingredients__list-item');
        li.innerHTML = "\n          <input class=\"ingredient__name\" type=\"text\" placeholder=\"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438\u043D\u0433\u0440\u0435\u0434\u0438\u0435\u043D\u0442\u0430\" maxlength=\"100\">\n          <input class=\"ingredient__number\" type=\"number\" placeholder=\"\u041A\u043E\u043B-\u0432\u043E\" min=\"1\">\n          <select class=\"ingredient__value\">\n            <option value=\"gr\">\u0433\u0440</option>\n            <option value=\"kg\">\u043A\u0433</option>\n            <option value=\"litr\">\u043B</option>\n            <option value=\"mililitr\">\u043C\u043B</option>\n            <option value=\"pieces\">\u0448\u0442</option>\n          </select> \n          <button class=\"btn__delete ingredient__delete\"><ion-icon class=\"ingredient__delete\" name=\"close-outline\"></ion-icon></button>";
      }

      list.append(li); // console.log(list);
    });
  } catch (_unused) {
    console.log('Not found nedeed page');
  }
};

/* harmony default export */ __webpack_exports__["default"] = (addStep);

/***/ }),

/***/ "./src/assets/js/modules/deleteStep.js":
/*!*********************************************!*\
  !*** ./src/assets/js/modules/deleteStep.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var deleteStep = function deleteStep(listSelector, btnSelector) {
  var list = document.querySelector(listSelector);

  try {
    list.addEventListener('click', function (e) {
      if (e.target && e.target.matches(btnSelector)) {
        list.removeChild(e.target.parentElement.parentElement);
      }
    });
  } catch (_unused) {
    console.log('Not found button');
  }
};

/* harmony default export */ __webpack_exports__["default"] = (deleteStep);

/***/ }),

/***/ "./src/assets/js/modules/scroolToUp.js":
/*!*********************************************!*\
  !*** ./src/assets/js/modules/scroolToUp.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var scrollToUp = function scrollToUp() {
  var btnToUp = document.querySelector('.arrow-up'),
      header = document.querySelector('#header');
  btnToUp.addEventListener('click', function (e) {
    e.preventDefault();
    header.scrollIntoView({
      behavior: 'smooth'
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (scrollToUp);

/***/ })

/******/ });
//# sourceMappingURL=script.js.map