webpackJsonp([13],{

/***/ "1abe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_vue__ = __webpack_require__("jGz4");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9facbde6_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_issue_vue__ = __webpack_require__("AYdA");
function injectStyle (ssrContext) {
  __webpack_require__("mN0i")
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9facbde6_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_issue_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "AYdA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"issueBox"},[_c('iss-view',{attrs:{"viewList":_vm.viewList},on:{"questionApi":_vm.questionApi}}),_vm._v(" "),_c('div',{staticClass:"lz-isIndex",on:{"click":function($event){return _vm.lastFun(0)}}},[_vm._v("上一步")]),_vm._v(" "),_c('div',{staticClass:"padding-top-30",staticStyle:{"color":"red"},attrs:{"align":"center"}},[_vm._v("注:答题时如需回到上一题,请点击“上一步”")])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "jGz4":
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

var _issView = __webpack_require__("N29Q");

var _issView2 = _interopRequireDefault(_issView);

var _vuex = __webpack_require__("NYxO");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "Issue",
  data: function data() {
    return {
      pageLevel: 0, //页面等级
      desLevel: 0,
      viewList: {} //传递给子组件的数据
    };
  },
  created: function created() {},

  methods: (0, _extends3.default)({
    getParams: function getParams() {
      console.log(this.$route.params);
      this.pageLevel = parseInt(this.$route.params.pageLevel);
      this.desLevel = parseInt(this.$route.params.desLevel);
      this.intell.issList.splice(this.desLevel + 1);
      this.pageInit = this.intell.issList[this.desLevel];
      console.log(this.$route.query);
      if (this.pageLevel == 0) this.questInit(); //当前为为1级问题时初始化存储数据
      this.questFilter();
    },

    //一级页数据初始化
    questInit: function questInit() {
      this.pageInit.arrgeMent = [];
      this.pageInit.arrgeMent[this.pageLevel] = this.pageInit.diseaseQuestion;
      this.set_msg({ key: "intelligent", lev: "issList", data: this.intell.issList });
    },

    // 问题列表数据过滤
    questFilter: function questFilter() {
      this.pageInit.arrgeMent.splice(this.pageLevel + 1);
      this.name = this.pageInit.diseaseDesc;
      var disess = this.pageInit.arrgeMent[this.pageLevel];
      this.viewList = {
        name: this.name,
        question: disess.question,
        questionData: disess.questionData,
        level: this.pageLevel + 1
      };
    },

    //是否答案选择
    questionApi: function questionApi(list, index) {
      this.pageInit.arrgeMent[this.pageLevel].questionData.map(function (evl, i) {
        index == i ? evl.check = true : evl.check = false;
      });
      console.log(this.pageInit.arrgeMent[this.pageLevel]);
      if (list.result) {
        this.set_msg({ key: "intelligent", lev: "issList", data: this.intell.issList });
        this.$router.push({ name: 'IssueList', query: { desLevel: this.desLevel } });
      } else if (list.diseaseQuestion) {
        this.pageInit.arrgeMent[this.pageLevel + 1] = list.diseaseQuestion; //问题选项
        this.set_msg({ key: "intelligent", lev: "issList", data: this.intell.issList });
        this.$router.push({ path: "/issue/" + (this.pageLevel + 1) + "/" + this.desLevel });
      }
    },


    // 上一步
    lastFun: function lastFun() {
      this.$router.go(-1);
    }
  }, (0, _vuex.mapMutations)({
    set_msg: "SET_MESSAGE"
  })),
  components: {
    "iss-view": _issView2.default
  },
  computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(["intell"]
  // ...
  )),
  mounted: function mounted() {
    this.getParams();
  },

  watch: {
    '$route': 'getParams'
  }
}; //
//
//
//
//
//
//

/***/ }),

/***/ "mN0i":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

});
//# sourceMappingURL=13.js.map