webpackJsonp([28],{

/***/ "P++i":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "YR3J":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__("Dd8w");

var _extends3 = _interopRequireDefault(_extends2);

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

var _motheds = __webpack_require__("PWXd");

var _motheds2 = _interopRequireDefault(_motheds);

var _vuex = __webpack_require__("NYxO");

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
//

var vm;
exports.default = {
  name: "Issue",
  data: function data() {
    return {
      resultdata: [],
      diseaseCode: ''
    };
  },
  created: function created() {
    vm = this;
    this.getQuery();
  },

  methods: (0, _extends3.default)({
    getQuery: function getQuery() {
      this.desLevel = parseInt(this.$route.params.desLevel);
      this.intell.diseseList.splice(this.desLevel + 1); //删掉当前等级之后的疾病列表
      this.intell.issList.splice(this.desLevel + 1); //删除当前等级之后的问题列表
      this.set_msg({ key: "intelligent", data: this.intell });
    },

    //type 0后退 1确认 2返回疾病列表
    resultFun: function resultFun(type) {
      switch (type) {
        case 0:
          this.$router.go(-1);
          break;
        case 1:
          vm.$router.push({ name: "Result3" });
          break;
        case 2:
          if (this.intell.results.result == 2) {
            vm.$router.push({ name: "Result3" });
          } else {
            this.$router.push({ path: "/duola/index/0/" + (this.desLevel + 1) });
          }
          break;
      }
    }
  }, (0, _vuex.mapMutations)({
    set_msg: "SET_MESSAGE"
  })),
  computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(["intell"
  // ...
  ])),
  components: {},
  mounted: function mounted() {
    console.log(this.issList);
  }
};

/***/ }),

/***/ "ga6X":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"issueListBox"},[_c('h4',{staticClass:"lz-title-h4"},[_vm._v("请确认您的告知异常选项")]),_vm._v(" "),_vm._l((_vm.intell.issList),function(list,i){return _c('div',[_c('div',{staticClass:"text"},[_vm._v(_vm._s(i+1)+"："+_vm._s(list.diseaseDesc))]),_vm._v(" "),_vm._l((list.arrgeMent),function(item,n){return (list.arrgeMent)?_c('div',{staticClass:"question"},[_vm._v("Q"+_vm._s(n+1)+"："+_vm._s(item.diseaseName)+"\r\n      "),_vm._l((item.subDiseaseList),function(val,s){return (val.check)?_c('p',[_vm._v("A"+_vm._s(n+1)+"："+_vm._s(val.name)+"\r\n      ")]):_vm._e()})],2):_vm._e()})],2)}),_vm._v(" "),_c('div',{staticClass:"btn"},[_c('div',{staticClass:"lz-isIndex",on:{"click":function($event){return _vm.resultFun(1)}}},[_vm._v("已完成健康告知")])]),_vm._v(" "),_c('div',{staticClass:"lz-isIndex",on:{"click":function($event){return _vm.resultFun(2)}}},[_vm._v("还有其他疾病需要反馈")]),_vm._v(" "),_c('div',{staticClass:"lz-isIndex",on:{"click":function($event){return _vm.resultFun(0)}}},[_vm._v("上一步")]),_vm._v(" "),_c('div',{staticClass:"padding-top-30",staticStyle:{"color":"red"},attrs:{"align":"center"}},[_vm._v("注:如有答题需回到上一题,请点击“上一步”")])],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "ztFl":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issueList_vue__ = __webpack_require__("YR3J");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issueList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issueList_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issueList_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issueList_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_56afbcb2_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_issueList_vue__ = __webpack_require__("ga6X");
function injectStyle (ssrContext) {
  __webpack_require__("P++i")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issueList_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_56afbcb2_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_issueList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ })

});
//# sourceMappingURL=28.js.map