webpackJsonp([20],{

/***/ "0m0y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

var _header = __webpack_require__("Cz8s");

var _header2 = _interopRequireDefault(_header);

var _upload = __webpack_require__("hYS1");

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'upload2',
    data: function data() {
        return {
            headerTitle: '资料上传'
        };
    },
    created: function created() {},

    methods: {
        //点击header
        onHeaderBtn: function onHeaderBtn(headerText) {
            console.log(headerText);
        },

        //获取图片
        getImg: function getImg(imgList) {
            console.log('图片列表');
            console.log(imgList);
        }
    },
    computed: {},
    components: {
        "header-text": _header2.default,
        "up-load": _upload2.default
    },
    mounted: function mounted() {}
}; //
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

/***/ }),

/***/ "2JPp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fx-upload2"},[_c('header-text',{staticClass:"fx-header",attrs:{"headerText":_vm.headerTitle},on:{"header-event":_vm.onHeaderBtn}}),_vm._v(" "),_c('div',{staticClass:"fx-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"subTitle"},[_vm._v("原因：（后台返回）")]),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('div',{staticClass:"subTitle"},[_vm._v("1.返回补充类型")]),_vm._v(" "),_c('up-load',{on:{"return-img":_vm.getImg}})],1),_vm._v(" "),_vm._m(2)],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"text"},[_vm._v("尊敬的投保人："),_c('br'),_vm._v("感谢您的信任并投保我公司。"),_c('br'),_vm._v("您为被保人{证件号码为（证件号）}递交的投保单号"),_c('br'),_vm._v("码为（投保单号）的投保申请，我公司已经收悉。现"),_c('br'),_vm._v("因业务处理及审核工作中出现了如下情况需要与您进"),_c('br'),_vm._v("一步沟通。")])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"text"},[_vm._v("本内容涉及到投保单资料的确认，属于保险合同的组"),_c('br'),_vm._v("成部分。为使您的利益得到有效的保证，请您在收到"),_c('br'),_vm._v("本通知书后的（有效期）天内给与答复，并务必请您"),_c('br'),_vm._v("及（被保人）或其监护人在本通知书上亲笔签字。"),_c('br')])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fx-btns"},[_c('div',{staticClass:"nextBtn"},[_vm._v("确认提交")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "Q4F4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload2_vue__ = __webpack_require__("0m0y");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload2_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload2_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload2_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload2_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1cc7aebc_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_upload2_vue__ = __webpack_require__("2JPp");
function injectStyle (ssrContext) {
  __webpack_require__("kfua")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload2_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1cc7aebc_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_upload2_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "kfua":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

});
//# sourceMappingURL=20.js.map