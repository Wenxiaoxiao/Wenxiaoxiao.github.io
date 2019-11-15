webpackJsonp([9],{

/***/ "4rYY":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__("Dd8w");

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__("NYxO");

var _lodash = __webpack_require__("M4fF");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "Result",
  data: function data() {
    return {
      writeInformDatas: ''
    };
  },
  created: function created() {
    this.getInfo();
  },

  methods: {
    /**获取订单数据 */
    getInfo: function getInfo() {
      var _this = this;

      this.$http.getHttp({
        name: "getInfo",
        params: [{ name: "key", val: this.intell.int_quey.key }],
        header: 2
      }, function (res) {
        _this.writeInformDatas = JSON.parse(res.data).info;
        console.log(_this.writeInformDatas);
      });
    },

    /**智能核保跳订单页 */
    resultInfoAjax: function resultInfoAjax(type) {
      var _this2 = this;

      if (type == 0) {
        window.location.href = location.origin + "/jump.html?url=" + encodeURIComponent(location.origin + "/market/premium-family.html?id=" + this.intell.int_quey.code + "&key=" + this.intell.int_quey.key);
      } else {
        //存储智能核保所需orderNo
        this.writeInformDatas.writeInform.fromvalue.intelligent = {
          paperId: this.intell.paperId,
          orderNo: this.intell.orderNo
        };
        var load = this.$popup.loading("正在请求数据...");
        this.$http.getHttp({
          name: "setInfo",
          params: { info: this.writeInformDatas }
        }, function (data) {
          console.log(data);
          _this2.$popup.closeLay(load);
          var process = JSON.parse(sessionStorage.getItem("productProcess"));
          if (process.orderPage == 1) {
            window.location.href = location.origin + "/jump.html?url=" + encodeURIComponent("./market/writeInform-moreinsure.html?key=" + data.data + "&proCode=" + _this2.intell.int_quey.code + "");
          } else if (process.orderPage == 2) {
            window.location.href = location.origin + "/jump.html?url=" + encodeURIComponent("./market/writeInform-3.html?key=" + data.data + "&proCode=" + _this2.intell.int_quey.code + "");
          }
        });
      }
    },

    //返回提示用户弹窗
    goBack: function goBack(next) {
      var vm = this;
      this.$popup.inquiry("是否重新选择疾病", ['重新开始', '取消'], function () {
        next();
      }, function () {
        next(false);
      });
    }
  },
  components: {},
  computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(["intell"])),
  mounted: function mounted() {},

  //监听返回
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    if (to.name == 'Index2' && from.name == 'Result2') {
      this.goBack(next);
      return;
    }
    next();
  }
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
//
//

/***/ }),

/***/ "LKux":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "R1+S":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_result_2_vue__ = __webpack_require__("4rYY");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_result_2_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_result_2_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_result_2_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_result_2_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_aa814302_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_result_2_vue__ = __webpack_require__("fL+r");
function injectStyle (ssrContext) {
  __webpack_require__("LKux")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_result_2_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_aa814302_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_result_2_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "fL+r":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"resultBox"},[_c('h4',{staticClass:"lz-title-h4"},[_vm._v("核保结论")]),_vm._v(" "),_c('div',{staticClass:"resultText"},[_c('div',{staticClass:"question",domProps:{"innerHTML":_vm._s(_vm.intell.results.resultInfo)}}),_vm._v(" "),(_vm.intell.results.success == 'true')?_c('div',{staticClass:"btn"},[_c('div',{staticClass:"lz-isIndex",on:{"click":function($event){return _vm.resultInfoAjax(1)}}},[_vm._v("\r\n        继续投保 \r\n      ")])]):_vm._e(),_vm._v(" "),(_vm.intell.results.success == 'false')?_c('div',{staticClass:"btn"},[_c('div',{staticClass:"lz-isIndex",on:{"click":function($event){return _vm.resultInfoAjax(0)}}},[_vm._v("\r\n        核保不通过\r\n      ")])]):_vm._e()])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=9.js.map