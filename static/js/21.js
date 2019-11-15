webpackJsonp([21],{

/***/ "5CK1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fx-upload1"},[_c('div',{staticClass:"fx-tips"},[_vm._v("核保资料")]),_vm._v(" "),_c('div',{staticClass:"fx-content",style:({height:_vm.clientHeight+'px'})},[_vm._m(0),_vm._v(" "),_c('up-load',{on:{"return-img":_vm.getImg1}})],1),_vm._v(" "),_c('div',{staticClass:"fx-btns1"},[_c('div',{staticClass:"nextBtn",on:{"click":_vm.upData}},[_vm._v("确认提交")])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"subTitle"},[_vm._v("请上传真实的诊断病历。检验报告等。上传要求： "),_c('br'),_vm._v("①病历或报告必须完整页面。 "),_c('br'),_vm._v("②检查者姓名和医院盖章需清晰不得覆盖。")])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "QPAt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload1_vue__ = __webpack_require__("U7v4");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload1_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload1_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload1_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b563376e_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_upload1_vue__ = __webpack_require__("5CK1");
function injectStyle (ssrContext) {
  __webpack_require__("wvJD")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_upload1_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b563376e_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_upload1_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "U7v4":
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
//
//
//

var axios = __webpack_require__("mtWM");
exports.default = {
    name: 'upload1',
    data: function data() {
        return {
            orderId: null,
            headerTitle: '资料上传',
            imgList: [],
            clientHeight: 0
        };
    },
    created: function created() {},

    methods: {
        //点击header
        onHeaderBtn: function onHeaderBtn(headerText) {
            // console.log(headerText);
        },

        //获取图片
        getImg1: function getImg1(imgList) {
            console.log('图片列表1');
            console.log(imgList);
            this.imgList = imgList;
        },
        upData: function upData() {
            var QUESTION_PARAMS = JSON.parse(sessionStorage.getItem("QUESTION_PARAMS"));
            console.log("QUESTION_PARAMS", QUESTION_PARAMS);
            console.log("imgList", this.imgList);
            if (this.imgList.length === 0) {
                this.$popup.msg("您还未上传核保资料！");
                return;
            }
            var imgList = this.imgList;
            imgList.map(function (item, i) {
                QUESTION_PARAMS['upload' + i] = item;
            });
            console.log(QUESTION_PARAMS);
            var THAT = this;
            _mintUi.Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            THAT.$http.getHttp({
                name: 'fxFormSave',
                params: QUESTION_PARAMS,
                orderId: THAT.orderId,
                type: 'post'
            }, function (res) {
                _mintUi.Indicator.close();
                // console.log("res",res);
                THAT.$router.push({ path: '/fuxing/waiting', query: { "orderId": THAT.orderId } });
            });
        },
        prevBtn: function prevBtn() {
            //返回测算页

        }
    },
    computed: {},
    components: {
        "header-text": _header2.default,
        "up-load": _upload2.default
    },
    mounted: function mounted() {
        var orderId = sessionStorage.getItem("ORDER_ID");
        this.orderId = orderId;
        this.clientHeight = window.innerHeight - document.getElementsByClassName("fx-tips")[0].clientHeight - document.getElementsByClassName("fx-btns1")[0].clientHeight - 10;
    }
};

/***/ }),

/***/ "wvJD":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

});
//# sourceMappingURL=21.js.map