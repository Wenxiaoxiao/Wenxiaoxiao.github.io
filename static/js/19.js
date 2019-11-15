webpackJsonp([19],{

/***/ "+lxR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_waiting_vue__ = __webpack_require__("6i/x");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_waiting_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_waiting_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_waiting_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_waiting_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_341b2ad4_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_waiting_vue__ = __webpack_require__("rY0n");
function injectStyle (ssrContext) {
  __webpack_require__("VHMI")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_waiting_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_341b2ad4_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_waiting_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "6i/x":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

var _mintUi = __webpack_require__("Au9i");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

exports.default = {
    name: 'waiting',
    data: function data() {
        return {
            result: null,
            waiting: {
                resultTitle: "提交成功",
                resultText: "您的相关资料已提交人工审核，人工审核大概需要 1-3个工作日，请您耐心等待！"
            }
        };
    },
    created: function created() {},

    methods: {
        waitingAction: function waitingAction() {
            window.location.href = this.$common.api_root + "/m/index.html#/personal";
        }
    },
    mounted: function mounted() {
        var _this = this;

        var orderId = this.$route.query.orderId;
        _mintUi.Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        this.$http.getHttp({
            name: 'fxJudgeBC',
            params: {
                orderId: orderId
            },
            type: 'get'
        }, function (res) {
            _mintUi.Indicator.close();
            console.log(res);
            _this.result = res.data;
        });
    }
};

/***/ }),

/***/ "VHMI":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "rY0n":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fx-waiting"},[_c('div',{staticClass:"waitingBg bg"}),_vm._v(" "),_c('div',{staticClass:"title"},[_vm._v(_vm._s(_vm.waiting.resultTitle))]),_vm._v(" "),_c('div',{staticClass:"content"},[_vm._v(_vm._s(_vm.waiting.resultText))]),_vm._v(" "),_c('div',{staticClass:"btns"},[(_vm.result === 'true')?_c('div',{staticClass:"oneBtn blueBtn",on:{"click":function($event){return _vm.waitingAction()}}},[_vm._v("返回首页")]):_vm._e()])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=19.js.map