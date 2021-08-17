/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 297:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".quickReplyBox[data-v-7ba5bd90] {\n  position: relative;\n}\n.el-form-item__label div[data-v-7ba5bd90] {\n  font-weight: bold;\n  color: red;\n}\n.el-form-item--mini.el-form-item[data-v-7ba5bd90],\n.el-form-item--small.el-form-item[data-v-7ba5bd90] {\n  margin-bottom: 10px;\n}\n.el-select[data-v-7ba5bd90] {\n  width: 300px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 691:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".list li[data-v-67d05af9] {\n  margin-bottom: 10px;\n  font-size: 14px;\n  line-height: 30px;\n}\n.list li[data-v-67d05af9]:hover {\n  background-color: #f5f5f5;\n}\n.list li .el-button[data-v-67d05af9] {\n  float: right;\n}\n.tips[data-v-67d05af9] {\n  color: #909399;\n  font-size: 14px;\n  text-align: center;\n}\n.addReplyBox[data-v-67d05af9] {\n  margin-top: 15px;\n  padding-top: 10px;\n  border-top: 1px dashed #ccc;\n}\n.box-card .el-card__header[data-v-67d05af9] {\n  padding: 10px 20px;\n}\n.box-card .el-card__header span[data-v-67d05af9] {\n  font-size: 14px;\n}\n.demo-card-foot[data-v-67d05af9] {\n  padding: 10px 0;\n  float: right;\n  color: #909399;\n}\n.clearfix[data-v-67d05af9]:before,\n.clearfix[data-v-67d05af9]:after {\n  display: table;\n  content: \"\";\n}\n.clearfix[data-v-67d05af9]:after {\n  clear: both;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 210:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(297);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(346)/* .default */ .Z
var update = add("cd99e666", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 564:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(691);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(346)/* .default */ .Z
var update = add("ab41a78a", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 346:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ addStylesClient)
});

;// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

;// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90&scoped=true&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "quickReplyBox" },
    [
      _c(
        "transition",
        { attrs: { name: "el-fade-in-linear" } },
        [
          _c(
            "el-form",
            {
              staticClass: "demo-form-inline",
              attrs: { inline: true, size: "small" }
            },
            [
              _c(
                "el-form-item",
                [
                  _c("div", { attrs: { slot: "label" }, slot: "label" }, [
                    _vm._v(
                      "            \n            " +
                        _vm._s(_vm.title + ": ") +
                        "\n        "
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "el-select",
                    {
                      attrs: { placeholder: "请选择" },
                      on: { change: _vm.enterReply },
                      model: {
                        value: _vm.currentReply,
                        callback: function($$v) {
                          _vm.currentReply = $$v
                        },
                        expression: "currentReply"
                      }
                    },
                    _vm._l(_vm.list, function(item, index) {
                      return _c("el-option", {
                        key: index,
                        attrs: { label: item, value: item }
                      })
                    }),
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                [
                  _c("el-button", {
                    staticClass: "btnQuickReplySet",
                    attrs: {
                      type: "primary",
                      icon: "el-icon-s-tools",
                      title: _vm.tips
                    },
                    on: { click: _vm.openSet }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            visible: _vm.setShow,
            width: "90%",
            "append-to-body": "",
            center: ""
          },
          on: {
            "update:visible": function($event) {
              _vm.setShow = $event
            }
          }
        },
        [_c("set")],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


;// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=7ba5bd90&scoped=true&

;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/App.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const Appvue_type_script_lang_js_ = ({
  data() {
    return {
      list: [],
      currentReply: '',
      fwin_replyLoaded: false, // 弹层回复面板打开状态
      fwin_replyLoading: false, // 弹层回复面板加载状态
      hasEditor: false, // 是否打开了高级回复
      setShow: false,
    }
  },
  created() {
    this.getList();
  },
  computed: {
    title(){
      return this.$app.getNameSpace();
    },
    tips(){
      return `${this.$app.getNameSpace()}设置`;
    }
  },
  methods: {
    // 获取APP自定义回复
    getList(){
      this.list = this.$app.getStorage();
      this.currentReply = this.list[0];
    },
    // 打开APP设置面板
    openSet() {
      this.setShow = !this.setShow;
    },
    // 设置回复内容
    enterReply(){
      let vm = this;
      if(vm.fwin_replyLoaded){
        vm.enterPostReply();
      } else if(vm.hasEditor) {
        vm.enterEditorReply();
      } else {
        vm.enterFastPostReply();
      }
    },
    // 设置楼层/右下角快速回复框内容
    enterPostReply(){
      let vm = this;
      let $postmessage = document.querySelector('#postmessage');
      $postmessage.value = vm.currentReply;
    },
    // 设置快速回复框内容
    enterFastPostReply(){
      let vm = this;
      let $fastpostmessage = document.querySelector('#fastpostmessage');
      $fastpostmessage.style.background = '';
      $fastpostmessage.value = vm.currentReply;
    },
    // 设置高级回复框内容
    enterEditorReply(){
      let vm = this;
      let $editorIframe = document.querySelector('#e_iframe').contentWindow.document.body;
      $editorIframe.style.background = '';
      $editorIframe.innerHTML = vm.currentReply;
    },
    // 点击楼层回复
    fastreBindClick(){
      let vm = this;
      document.querySelector('body').addEventListener('click', (e)=>{
        if(vm.fwin_replyLoading && e.target.className == 'fastre'){
          vm.fwin_replyLoaded = false;
        }
      }, true)
    },
    // 点击右下角快速回复按钮
    replyfastBindClick(){
      let vm = this;
      document.querySelector('body').addEventListener('click', (e)=>{
        if(vm.fwin_replyLoading && e.target.className == 'replyfast'){
          vm.fwin_replyLoaded = false;
        }
      }, true)
    },
    // 点击楼层/右下角快速回复面板关闭按钮
    flbcBindClick(){        
      let vm = this;
      document.querySelector('body').addEventListener('click', (e)=>{
        if(e.target.className == 'flbc'){
          vm.fwin_replyLoaded = false;            
        }            
      }, true)
    },
    // 检测是否是高级回复
    checkEditor(){
      this.hasEditor = document.querySelector('#e_iframe');
    },
    // 监听楼层回复面板加载完成
    postReplyMutationObserver(){
      let vm = this;
      let mos =  new MutationObserver(function(mutations, observer){
        for (const mutation in mutations) {
          if (Object.hasOwnProperty.call(mutations, mutation)) {
            const element = mutations[mutation];
            if(element.target.id=='fwin_content_reply' && element.type!='childList'){
              console.log(element);
              vm.fwin_replyLoading = true;
              vm.fwin_replyLoaded = true;
            } else {
              vm.fwin_replyLoading = false;                
            }
          }
        }
      });
      mos.observe(document.querySelector('#append_parent'), { 
        attributes: true,
        childList: true,
        subtree: true 
      });
    }
  },
  mounted() {
    this.checkEditor();
    this.postReplyMutationObserver();
    this.enterReply();
    this.fastreBindClick();
    this.replyfastBindClick();
    this.flbcBindClick();
  },
  watch: {
    // 监听楼层回复面板显示状态
    fwin_replyLoaded(n, o){
      let vm = this;
      if(n){
        let $floatlayout_reply = document.querySelector('#floatlayout_reply');
        $floatlayout_reply.insertBefore(vm.$el, $floatlayout_reply.childNodes[0]);
        vm.enterPostReply();
      } else {
        let $fastposteditor = document.querySelector('#fastposteditor');
        $fastposteditor.insertBefore(vm.$el, $fastposteditor.childNodes[0]);
      }
    }
  }
});

;// CONCATENATED MODULE: ./src/App.vue?vue&type=script&lang=js&
 /* harmony default export */ const src_Appvue_type_script_lang_js_ = (Appvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/App.vue?vue&type=style&index=0&id=7ba5bd90&scoped=true&lang=less&
var Appvue_type_style_index_0_id_7ba5bd90_scoped_true_lang_less_ = __webpack_require__(210);
;// CONCATENATED MODULE: ./src/App.vue?vue&type=style&index=0&id=7ba5bd90&scoped=true&lang=less&

;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./src/App.vue



;


/* normalize component */

var component = normalizeComponent(
  src_Appvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "7ba5bd90",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/App.vue"
/* harmony default export */ const App = (component.exports);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Set.vue?vue&type=template&id=67d05af9&scoped=true&
var Setvue_type_template_id_67d05af9_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "setBox" },
    [
      _c("el-card", { staticClass: "box-card", attrs: { shadow: "never" } }, [
        _c(
          "div",
          {
            staticClass: "clearfix",
            attrs: { slot: "header" },
            slot: "header"
          },
          [
            _c("span", [_vm._v(_vm._s(_vm.$app.getName()))]),
            _vm._v(" "),
            _c(
              "el-button",
              {
                staticStyle: { float: "right", padding: "3px 0" },
                attrs: { type: "text" },
                on: { click: _vm.closeSetBox }
              },
              [_c("i", { staticClass: "el-icon-circle-close" })]
            )
          ],
          1
        ),
        _vm._v(" "),
        _vm.list.length > 0
          ? _c(
              "ul",
              { staticClass: "list" },
              _vm._l(_vm.list, function(item, index) {
                return _c(
                  "li",
                  { key: index },
                  [
                    _vm._v(
                      "\n        " +
                        _vm._s(index + 1 + "、" + _vm.list[index]) +
                        " "
                    ),
                    _c("el-button", {
                      attrs: {
                        type: "danger",
                        size: "mini",
                        icon: "el-icon-delete",
                        circle: ""
                      },
                      on: {
                        click: function($event) {
                          return _vm.delReply(index)
                        }
                      }
                    })
                  ],
                  1
                )
              }),
              0
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.list.length == 0
          ? _c("p", { staticClass: "tips" }, [_vm._v("未设置快速回帖内容!")])
          : _vm._e(),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "addReplyBox" },
          [
            _c(
              "el-input",
              {
                staticClass: "input-with-select",
                attrs: { placeholder: "请输入新的回复内容", clearable: "" },
                model: {
                  value: _vm.newReply,
                  callback: function($$v) {
                    _vm.newReply = $$v
                  },
                  expression: "newReply"
                }
              },
              [
                _c("el-button", {
                  attrs: { slot: "append", icon: "el-icon-s-promotion" },
                  on: { click: _vm.addReply },
                  slot: "append"
                })
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c("div", [
          _c("span", { staticClass: "demo-card-foot" }, [
            _vm._v(_vm._s("ver: " + _vm.$app.getVersion()))
          ])
        ])
      ])
    ],
    1
  )
}
var Setvue_type_template_id_67d05af9_scoped_true_staticRenderFns = []
Setvue_type_template_id_67d05af9_scoped_true_render._withStripped = true


;// CONCATENATED MODULE: ./src/Set.vue?vue&type=template&id=67d05af9&scoped=true&

;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Set.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const Setvue_type_script_lang_js_ = ({
  data(){
    return {
      list: [],
      showAddBox: false,
      newReply: '',
    }
  },
  props: {
    showSet: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    showSet(newVal, oldVal){
      let vm = this;
      if(newVal == false && vm.list.length == 0){
        vm.$confirm('未设置快速回帖内容，是否重置为默认设置？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'success',
        }).then(action => {
          vm.list = vm.$app.defaultReply;
        }).catch(() => {
          vm.$message.info('请输入自定义回复内容');
        });
        
        vm.$emit('update:showSet', true);
        vm.showSet = true;
        return false;
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(){
      this.list = this.$app.getStorage();
    },
    closeSetBox(){
      this.$emit('update:showSet', false);
    },
    delReply(index){
      this.list.splice(index, 1);
    },
    addReply(){
      if(this.newReply == ''){
        this.$message.error('回复内容不能为空！');
        return false;
      }
      if(this.list.indexOf(this.newReply) != -1){
        this.$message.error('已存在相同内容！');
        return false;
      }
      this.list.push(this.newReply);
      this.newReply = ''
    }
  },
});

;// CONCATENATED MODULE: ./src/Set.vue?vue&type=script&lang=js&
 /* harmony default export */ const src_Setvue_type_script_lang_js_ = (Setvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/Set.vue?vue&type=style&index=0&id=67d05af9&scoped=true&lang=less&
var Setvue_type_style_index_0_id_67d05af9_scoped_true_lang_less_ = __webpack_require__(564);
;// CONCATENATED MODULE: ./src/Set.vue?vue&type=style&index=0&id=67d05af9&scoped=true&lang=less&

;// CONCATENATED MODULE: ./src/Set.vue



;


/* normalize component */

var Set_component = normalizeComponent(
  src_Setvue_type_script_lang_js_,
  Setvue_type_template_id_67d05af9_scoped_true_render,
  Setvue_type_template_id_67d05af9_scoped_true_staticRenderFns,
  false,
  null,
  "67d05af9",
  null
  
)

/* hot reload */
if (false) { var Set_api; }
Set_component.options.__file = "src/Set.vue"
/* harmony default export */ const Set = (Set_component.exports);
;// CONCATENATED MODULE: ./src/index.js



const $fastposteditor = document.querySelector('#fastposteditor');
const $postbox = document.querySelector('#postbox');
const $appRoot = document.createElement('div');
$appRoot.id = 'app';
if($fastposteditor){  
  $fastposteditor.insertBefore($appRoot, $fastposteditor.childNodes[0]);
}
if($postbox){  
  $postbox.insertBefore($appRoot, $postbox.childNodes[4]);
}

Vue.prototype.$app = {
  storageKey: 'QuickReply',
  defaultReply: [
      '感谢楼主分享，支持一下！',
      '支持一下，希望楼主做的更好，加油！',
      '做的不错哦，楼主加油，期待更好的作品！',
      '标记一下，先看看好不好，谢谢楼主咯！'
  ],  
  setStorage(value){
    GM_setValue(this.storageKey, value);
  },
  getStorage(){
    var key = this.storageKey;

    if(GM_getValue(key) && GM_getValue(key).length > 0){
      return GM_getValue(key);        
    }
    //TODO 兼容旧版本key名，待移除
    if(GM_getValue('replysCustom') && GM_getValue('replysCustom').length > 0){
      this.setStorage('');
      return GM_getValue('replysCustom');
    }

    return this.defaultReply;
  },  
  getName: function() {
    return GM_info['script']['name'];
  },
  getNameSpace: function() {
    return GM_info['script']['namespace'];
  },
  getVersion: function() {
    return GM_info['script']['version'];
  },
}

Vue.component("set", Set);

new Vue({
  el: '#app',
  render: h => h(App)
});
})();

/******/ })()
;