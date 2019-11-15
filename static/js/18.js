webpackJsonp([18],{

/***/ "9NhK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__("hLzq");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6bcb4f18_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__("sRcB");
function injectStyle (ssrContext) {
  __webpack_require__("E8Y/")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6bcb4f18_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "E8Y/":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "hLzq":
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

var _illList = __webpack_require__("xM1M");

var _illList2 = _interopRequireDefault(_illList);

var _vuex = __webpack_require__("NYxO");

var _lodash = __webpack_require__("M4fF");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//

exports.default = {
  name: "Index",
  data: function data() {
    return {
      illList: [], //疾病子组件列表
      pageLevel: 0, // 页面等级 
      desLevel: 0, //疾病等级
      fromvalue: "", // 测算页fromvalue
      diseseAll: null
    };
  },
  created: function created() {
    // 获取地址栏key 与code
    if (this.desLevel == 0 && this.$route.query.key && this.$route.query.proCode) {
      var data = {
        key: this.$route.query.key,
        code: this.$route.query.proCode
      };
      this.intell.paperId = "";
      this.intell.indexList = []; //初始化列表
      this.intell.int_quey = data; //初始化参数
      this.set_msg({ key: "intelligent", data: this.intell });
    }
  },
  mounted: function mounted() {
    this.getParams();
  },

  methods: (0, _extends3.default)({
    getParams: function getParams() {
      this.pageLevel = parseInt(this.$route.params.pageLevel); // 页面等级（当前所选疾病的页面等级）
      this.desLevel = parseInt(this.$route.params.desLevel); // 疾病等级（流程大疾病等级）
      console.log(this.$route.params);
      if (this.desLevel > 0 && this.pageLevel == 0) {
        this.diseseAll = this.intell.indexList.length > 0 ? this.intell.indexList : null;
      }
      if (!this.diseseAll) {
        this.getInform();
      } else {
        this.illListFn();
      };
    },

    //获取测算页带过来的fromvalue值
    getInform: function getInform() {
      var _this = this;

      this.$http.getHttp({
        name: "getInfo",
        params: [{ name: "key", val: this.intell.int_quey.key }],
        header: 2
      }, function (res) {
        var datas = JSON.parse(res.data);
        console.log(datas);
        sessionStorage.setItem("productProcess", (0, _stringify2.default)(datas.info.productProcess));
        _this.fromvalue = datas.info.writeInform.fromvalue;
        _this.getIllList(_this.fromvalue); //疾病Ajax请求
      });
    },

    //请求疾病列表
    getIllList: function getIllList(fromvalue) {
      var _this2 = this;

      var load = this.$popup.loading("正在请求智能核保数据...");
      this.$http.getHttp({
        name: "qusetionList",
        params: {
          fromvalue: fromvalue
        },
        code: this.intell.int_quey.code
      }, function (res) {
        console.log(res);
        _this2.$popup.closeLay(load);
        _this2.diseseAll = res.data.riskData; //疾病列表全部数据
        _this2.intell.paperId = res.data.paperId; //paperId 缓存
        _this2.intell.indexList = _this2.diseseAll; //首页数据缓存
        _this2.set_msg({ key: "intelligent", data: _this2.intell }); //将当前选择项缓存
        _this2.illListFn();
      });
    },

    //疾病列表大于2级页子组件赋值
    illListFn: function illListFn() {
      var self = this;
      var index = this.pageLevel;
      if (this.pageLevel > 0) {
        this.intell.issList.splice(this.desLevel); //删掉当前等级之后的问题列表
        var arrList = this.diseseAll;
        _lodash2.default.forEach(this.intell.diseseList[this.desLevel], function (v, i) {
          arrList = arrList[v];
          if (i == index) return;
        });
        this.illList = arrList.subDiseaseList;
      } else {
        this.intell.diseseList[this.desLevel] = [];
        this.illList = this.diseseAll;
      }
    },

    //点击切换列表 跳转  赋值列表数据
    onillList: function onillList(list, i) {
      if (list.subDiseaseList) {
        this.intell.diseseList[this.desLevel][this.pageLevel] = i;
        this.set_msg({ key: "intelligent", lev: 'diseseList', data: this.intell.diseseList }); //将当前选择项缓存
        this.$router.push({ path: "/index4/" + (this.pageLevel + 1) + "/" + this.desLevel });
      } else if (list.result) {
        if (_lodash2.default.findIndex(this.intell.issList, function (v) {
          return v.diseaseCode == list.diseaseCode;
        }) > -1) return this.$popup.msg("已选择当前疾病");
        //  //结果存在跳结果页
        this.intell.issList[this.desLevel] = list;
        this.set_msg({ key: "intelligent", lev: "issList", data: this.intell.issList }); //存储问题列表
        this.$router.push({ name: 'IssueList4', query: { desLevel: this.desLevel } });
      } else if (list.diseaseQuestion) {
        if (_lodash2.default.findIndex(this.intell.issList, function (v) {
          return v.diseaseCode == list.diseaseCode;
        }) > -1) return this.$popup.msg("已选择当前疾病");
        this.intell.issList[this.desLevel] = list;
        //问题存在跳问题页
        this.set_msg({ key: "intelligent", lev: "issList", data: this.intell.issList }); //存储问题列表
        this.$router.push({ path: "/issue4/0/" + this.desLevel });
      }
    },

    //上一部
    resultFun: function resultFun(type) {
      switch (type) {
        case 0:
          this.$router.go(-1);
          break;
      }
    }
  }, (0, _vuex.mapMutations)({
    set_msg: "SET_MESSAGE"
  })),
  computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(["intell"
  // ...
  ])),
  components: {
    "ill-list": _illList2.default
  },
  watch: {
    '$route': 'getParams'
  }
}; //疾病列表组件

/***/ }),

/***/ "sRcB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"intellBox"},[(_vm.pageLevel==0)?_c('h4',{staticClass:"lz-title-h4"},[_vm._v("请选择被保人告知异常所属模块，"),_c('br'),_vm._v("如不在列表中则不能投保。")]):(_vm.pageLevel>0)?_c('h4',{staticClass:"lz-title-h4"},[_vm._v("选择具体疾病名称")]):_vm._e(),_vm._v(" "),_c('ill-list',{attrs:{"illList":_vm.illList,"pageLevel":_vm.pageLevel},on:{"result-index":_vm.onillList}}),_vm._v(" "),(_vm.desLevel>0)?_c('div',{staticClass:"lz-isIndex",on:{"click":function($event){return _vm.resultFun(0)}}},[_vm._v("上一步")]):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=18.js.map