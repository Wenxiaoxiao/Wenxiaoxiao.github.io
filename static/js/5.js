webpackJsonp([5],{

/***/ "+jY+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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

exports.default = {
  props: {
    viewList: Object,
    index: Number
  },
  data: function data() {
    return {
      selectIndex: ''
    };
  },

  methods: {
    resultEmit: function resultEmit(item, i) {
      this.$emit("questionApi", item, i);
    },

    //数组过滤
    selectFilter: function selectFilter(i) {
      if (!this.selectIndex) {
        this.selectIndex = i + "";
      } else if (this.selectIndex.indexOf(i) > -1) {
        var arr = this.selectIndex.split(",");
        var index = arr.indexOf(i.toString());
        arr.splice(index, 1);
        this.selectIndex = arr.join(",");
        console.log(arr);
      } else {
        this.selectIndex = this.selectIndex + "," + i;
      }
    },
    selectResult: function selectResult() {
      if (!this.selectIndex) return this.$popup.msg("至少选择一项");
      this.$emit("questionApi", {}, this.selectIndex, true);
    }
  },
  mounted: function mounted() {},
  created: function created() {},

  watch: {
    viewList: function viewList(newVal) {
      console.log(newVal);
    }
  }
};

/***/ }),

/***/ "H6zK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issViewMost_vue__ = __webpack_require__("+jY+");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issViewMost_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issViewMost_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issViewMost_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issViewMost_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5b172ccc_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_issViewMost_vue__ = __webpack_require__("x5HX");
function injectStyle (ssrContext) {
  __webpack_require__("n5N9")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issViewMost_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5b172ccc_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_issViewMost_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "n5N9":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "qCrU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_vue__ = __webpack_require__("uLPJ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0e2e1c83_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_issue_vue__ = __webpack_require__("v+61");
function injectStyle (ssrContext) {
  __webpack_require__("s9E0")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0e2e1c83_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_issue_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "s9E0":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "uLPJ":
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

var _issViewMost = __webpack_require__("H6zK");

var _issViewMost2 = _interopRequireDefault(_issViewMost);

var _vuex = __webpack_require__("NYxO");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vm; //
//
//
//
//
//
//

exports.default = {
  name: "Issue",
  data: function data() {
    return {
      diseaseCode: '',
      viewList: {} //传递给子组件的数据
    };
  },
  created: function created() {
    vm = this;
    this.getParams();
  },

  methods: (0, _extends3.default)({
    getParams: function getParams() {
      //问题等级
      this.pageLevel = parseInt(this.$route.params.pageLevel);
      //疾病等级
      this.desLevel = parseInt(this.$route.params.desLevel);
      // 上个页面选择的疾病或者问题code
      this.diseaseCode = this.$route.params.code;
      // 选择的是否code 无则为空
      this.answerCode = this.$route.params.anCode;
      //有页面返回的可能则删除当前疾病等级之后的疾病数据
      this.intell.issList.splice(this.desLevel + 1);
      this.pageInit = vm.intell.issList[vm.desLevel]; //当前疾病选项数据从store取出
      this.handleFilterData(); //选择的参数保存
      this.questInit(this.diseaseCode, this.answerCode);
    },

    //一级页数据初始化
    questInit: function questInit(code, anCode) {
      var load = this.$popup.loading("正在获取结果...");
      this.$http.getHttp({
        name: "deseaseCommit",
        params: {
          paperId: this.intell.paperId,
          diseaseCode: code,
          answerCode: anCode
        },
        code: this.intell.int_quey.code
      }, function (res) {
        console.log(res);
        vm.$popup.closeLay(load);
        if (!vm.resultList(res)) return;
        //问题选项为1级时初始化问题
        if (vm.pageLevel == 0) vm.pageInit.arrgeMent = [];
        //问题赋值
        vm.pageInit.arrgeMent[vm.pageLevel] = res.data.questions[0];
        console.log(vm.pageInit);
        //组件数据过滤
        vm.questFilter();
      });
    },

    /**组件数据过滤 */
    questFilter: function questFilter() {
      //有返回的可能则将问题删减到当前问题级别数
      this.pageInit.arrgeMent.splice(this.pageLevel + 1);
      //疾病名称
      this.name = this.pageInit.diseaseDesc;
      //问题选项
      var disess = this.pageInit.arrgeMent[this.pageLevel];
      console.log(disess);
      //组件数据
      this.viewList = {
        name: this.name,
        question: disess.diseaseDesc,
        questionData: disess.subDiseaseList,
        level: this.pageLevel + 1,
        questionType: disess.questionType
      };
    },

    //是否答案选择
    questionApi: function questionApi(list, index, select) {
      if (select) {
        var answerCode = "";
        console.log(index);
        //将选择的当前疾病问题等级的是否 赋值check区分选项
        this.pageInit.arrgeMent[this.pageLevel].subDiseaseList.map(function (evl, i) {
          if (index.indexOf(i) > -1) {
            evl.check = true;
            answerCode = !answerCode ? evl.diseaseCode : answerCode + "," + evl.diseaseCode;
          }
        });
      } else {
        //将选择的当前疾病问题等级的是否 赋值check区分选项
        this.pageInit.arrgeMent[this.pageLevel].subDiseaseList.map(function (evl, i) {
          index == i ? evl.check = true : evl.check = false;
        });
        var answerCode = list.diseaseCode; //当前选择的是否code
      }
      var diseaseCode = this.pageInit.arrgeMent[this.pageLevel].diseaseCode; //当前问题code
      console.log(answerCode);
      //当前疾病所有数据提交到store
      this.set_msg({ key: "intelligent", lev: "issList", data: this.intell.issList });
      // //问题等级自增 跳转下一页
      this.$router.push({ path: "/BN/issue/" + (this.pageLevel + 1) + "/" + this.desLevel + "/" + diseaseCode + "/" + answerCode });
    },
    handleFilterData: function handleFilterData() {
      var list = {
        diseaseCode: this.diseaseCode, //问题code
        answerCode: this.answerCode || "" //选择code

        //若没有数据 初始化
      };if (!this.pageInit.paramsDate) this.pageInit.paramsDate = [];
      this.pageInit.paramsDate.splice(this.pageLevel);
      this.pageInit.paramsDate.push(list);
      console.log(this.intell.issList);
      this.set_msg({ key: "intelligent", lev: "issList", data: this.intell.issList });
    },
    resultList: function resultList(res) {
      if (!res.data.result) return true;
      vm.intell.results.resultInfo = res.data.result;
      console.log(this.pageInit);
      if (res.data.success == "true") {
        // S:承保  Q:转人工核保  EX:除外责任  D:拒保
        if (res.data.type == "S") vm.intell.results.result = 0;
        if (res.data.type == "EX") vm.intell.results.result = 1;
        if (res.data.type == "Q") vm.intell.results.result = 5;
      } else {
        vm.intell.results.result = 2;
      }
      this.set_msg({ key: "intelligent", lev: "issList", data: vm.intell.issList });
      this.set_msg({ key: "intelligent", lev: "results", data: vm.intell.results });
      this.$router.replace({ path: "/BN/issueList/" + this.desLevel, name: "IssueList1" });
      return false;
    },

    // 上一步
    lastFun: function lastFun() {
      this.$router.go(-1);
    }
  }, (0, _vuex.mapMutations)({
    set_msg: "SET_MESSAGE"
  })),
  components: {
    "iss-view-most": _issViewMost2.default
  },
  computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(["intell"]
  // ...
  )),
  mounted: function mounted() {},

  watch: {
    '$route': 'getParams'
  }
};

/***/ }),

/***/ "v+61":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"issueBox"},[_c('iss-view-most',{attrs:{"viewList":_vm.viewList},on:{"questionApi":_vm.questionApi}}),_vm._v(" "),_c('div',{staticClass:"lz-isIndex margin-top-40",on:{"click":function($event){return _vm.lastFun(0)}}},[_vm._v("上一步")]),_vm._v(" "),_c('div',{staticClass:"padding-top-30",staticStyle:{"color":"red"},attrs:{"align":"center"}},[_vm._v("注:答题时如需回到上一题,请点击“上一步”")])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "x5HX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"iss-view"},[_c('div',{staticClass:"text"},[_vm._v(_vm._s(_vm.viewList.name))]),_vm._v(" "),_c('div',{staticClass:"question"},[_vm._v("\n       Q"),_c('span',{staticClass:"index"},[_vm._v(_vm._s(_vm.viewList.level))]),_vm._v(":"+_vm._s(_vm.viewList.question)+"\n   ")]),_vm._v(" "),(_vm.viewList.questionType == 'M')?_c('div',{staticClass:"select-btn"},_vm._l((_vm.viewList.questionData),function(item,i){return _c('div',{staticClass:"options",class:_vm.selectIndex && _vm.selectIndex.indexOf(i)>-1?'active':'',on:{"click":function($event){return _vm.selectFilter(i)}}},[_c('i'),_vm._v(" "+_vm._s(item.name)+" \n       ")])}),0):_c('div',{staticClass:"btn"},_vm._l((_vm.viewList.questionData),function(val,i){return _c('div',{on:{"click":function($event){return _vm.resultEmit(val,i)}}},[_vm._v(_vm._s(val.name)+" ")])}),0),_vm._v(" "),(_vm.viewList.questionType == 'M')?_c('div',{staticClass:"submit lz-isIndex",on:{"click":_vm.selectResult}},[_vm._v("\n     确认\n   ")]):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=5.js.map