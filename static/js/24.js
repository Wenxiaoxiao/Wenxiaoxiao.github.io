webpackJsonp([24],{

/***/ "Ooyj":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

var _header = __webpack_require__("Cz8s");

var _header2 = _interopRequireDefault(_header);

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
//
//
//
//
//
//

exports.default = {
    name: 'healthy1',
    data: function data() {
        return {
            clientHeight: 0,
            clientHeight1: 0,
            headerTitle: '健康告知',
            holderHealthContent: "被保险人健康告知", //投保人健康告知
            insureHealthContent: "" //被保险人健康告知
        };
    },
    created: function created() {},

    methods: {
        //进入智能审核
        goNext: function goNext() {
            //弹出一个弹窗 订单填写
            //this.$router.push({path:'/fuxing/form'})
            // console.log('aaa');
        },

        //点击header
        onHeaderBtn: function onHeaderBtn(headerText) {
            console.log(headerText);
        },

        //请求健康告知
        getHealthContent: function getHealthContent() {}
    },
    computed: {},
    components: {
        "header-text": _header2.default
    },
    mounted: function mounted() {
        this.getHealthContent();
        console.log(window.innerHeight);
        this.clientHeight1 = window.innerHeight - document.getElementsByClassName("fx-header")[0].clientHeight;
        this.clientHeight = this.clientHeight1 - document.getElementsByClassName("fx-btns")[0].clientHeight - document.getElementsByClassName("fx-tab")[0].clientHeight - document.getElementsByClassName("fx-space")[0].clientHeight;
    }
};

/***/ }),

/***/ "aBcO":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "nQLK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fx-healthy"},[_c('header-text',{staticClass:"fx-header",attrs:{"headerText":_vm.headerTitle},on:{"header-event":_vm.onHeaderBtn}}),_vm._v(" "),_c('div',{staticClass:"fx-content",style:({height:_vm.clientHeight1+'px'})},[_c('div',{staticClass:"fx-space"}),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('div',{style:({height:_vm.clientHeight+'px',overflow:'auto'}),domProps:{"innerHTML":_vm._s(_vm.holderHealthContent)}})]),_vm._v(" "),_c('div',{staticClass:"fx-btns"},[_c('div',{staticClass:"nextBtn",on:{"click":function($event){return _vm.goNext()}}},[_vm._v("下一步")])])],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fx-tab"},[_c('div',{staticClass:"text text1"},[_vm._v("投保人健康告知")]),_vm._v(" "),_c('div',{staticClass:"text text1"},[_vm._v("被保险人健康告知")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "wMNz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_healthy1_vue__ = __webpack_require__("Ooyj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_healthy1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_healthy1_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_healthy1_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_healthy1_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_dcdd5c5c_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_healthy1_vue__ = __webpack_require__("nQLK");
function injectStyle (ssrContext) {
  __webpack_require__("aBcO")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_healthy1_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_dcdd5c5c_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_healthy1_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ })

});
//# sourceMappingURL=24.js.map