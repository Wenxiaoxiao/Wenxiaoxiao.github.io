webpackJsonp([10],{

/***/ "Cs99":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_2_vue__ = __webpack_require__("ER+d");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_2_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_2_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_2_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_2_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_20739f6a_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_issue_2_vue__ = __webpack_require__("vbXT");
function injectStyle (ssrContext) {
  __webpack_require__("LYN6")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_2_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_20739f6a_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_issue_2_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "ER+d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__("mvHQ");

var _stringify2 = _interopRequireDefault(_stringify);

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
//

exports.default = {
  name: "Issue2",
  data: function data() {
    return {
      viewList: {}, //传递给子组件的数据
      pageLevel: 0,
      resultIssue: {},
      isIndex: null
    };
  },
  created: function created() {},

  methods: (0, _extends3.default)({
    //获取测算页带过来的fromvalue值
    getInform: function getInform() {
      var _this = this;

      this.$http.getHttp({
        name: "getInfo",
        params: [{ name: "key", val: this.$route.query.key }],
        header: 2
      }, function (res) {
        var datas = JSON.parse(res.data);
        console.log(datas);
        sessionStorage.setItem("productProcess", (0, _stringify2.default)(datas.info.productProcess));
        _this.writeInformDatas = JSON.parse(res.data).info;
      });
    },

    /**疾病赋值 */
    questInit: function questInit() {
      this.isIndex = null;
      this.resultIssue = {};
      //当前疾病等级
      this.pageLevel += 1;
      this.viewList = this.intell.issList[0];
      console.log(this.viewList);
    },

    /**问题参数过滤 */
    questionApi: function questionApi(item, i) {
      this.isIndex = i;
      //深拷贝当前问题数据 便于参数赋值
      if (_.isEmpty(this.resultIssue)) this.resultIssue = _.cloneDeep(this.viewList);
      this.resultIssue.subDiseaseList = [item];
      console.log(this.resultIssue);
    },

    /** 请求问题或结果*/
    intellAjax: function intellAjax(datas) {
      var _this2 = this;

      var load = this.$popup.loading("加载中...");
      this.$http.getHttp({
        name: "answerList",
        params: datas,
        code: this.intell.int_quey.code
      }, function (res) {
        console.log(res);
        _this2.$popup.closeLay(load);
        if (res.data.questions) {
          // 有问题时进入问题页
          _this2.intell.issList = res.data.questions;
          _this2.set_msg({ key: "intelligent", lev: "issList", data: _this2.intell.issList }); //将当前选择项缓存
          _this2.questInit();
        } else {
          //无问题时进入结果页
          _this2.intell.results.success = res.data.success;
          _this2.intell.results.resultInfo = res.data.result;
          _this2.set_msg({ key: "intelligent", lev: "results", data: _this2.intell.results }); //将当前选择项缓存
          _this2.$router.replace({ path: '/result-2' }); //跳转到问题页
        }
      });
    },

    /**下一步与返回重选 */
    diseaseTap: function diseaseTap(next) {
      if (next == 1) {
        // 下一步
        if (_.isEmpty(this.resultIssue)) return this.$popup.msg("请先选择问题答案");
        var datas = {
          questions: [this.resultIssue],
          paperId: this.intell.paperId,
          orderNo: this.intell.orderNo
        };
        this.intellAjax(datas);
      } else {
        // 返回重选
        this.$router.go(-1);
      }
    },
    goBack: function goBack(next) {
      var vm = this;
      this.$popup.inquiry("是否重新选择疾病", ['重新开始', '取消'], function () {
        next();
      }, function () {
        next(false);
      });
    }
  }, (0, _vuex.mapMutations)({
    set_msg: "SET_MESSAGE"
  })),
  computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(["intell"]
  // ...
  )),
  mounted: function mounted() {
    this.questInit();
  },

  /**返回按钮显示 */
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    if (this.pageLevel > 1 && to.name == 'Index2' && from.name == 'Issue2') {
      this.goBack(next);
      return;
    }
    next();
  }
};

/***/ }),

/***/ "LYN6":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "vbXT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"issueBox2"},[_c('div',{staticClass:"text"},[_vm._v(_vm._s(_vm.viewList.diseaseName))]),_vm._v(" "),_c('div',{staticClass:"question"},[_vm._v("Q"),_c('span',{staticClass:"index"},[_vm._v(_vm._s(_vm.pageLevel))]),_vm._v(":"+_vm._s(_vm.viewList.diseaseDesc)+"\r\n    ")]),_vm._v(" "),_c('div',{staticClass:"btn"},_vm._l((_vm.viewList.subDiseaseList),function(item,i){return _c('div',{key:i,class:_vm.isIndex == i?'active':'',on:{"click":function($event){return _vm.questionApi(item,i)}}},[_c('i'),_vm._v(" \r\n        "+_vm._s(item.diseaseDesc)+"\r\n        ")])}),0),_vm._v(" "),_c('div',{staticClass:"blank"}),_vm._v(" "),_c('div',{staticClass:"intell-btn-box"},[_c('span',{staticClass:"fl renew-btn",on:{"click":function($event){return _vm.diseaseTap(0)}}},[_vm._v("重新开始")]),_vm._v(" "),_c('span',{staticClass:"fr",on:{"click":function($event){return _vm.diseaseTap(1)}}},[_vm._v("下一步")])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=10.js.map