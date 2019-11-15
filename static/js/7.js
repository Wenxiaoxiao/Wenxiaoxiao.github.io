webpackJsonp([7],{

/***/ "KHvu":
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
//
//
//
//
//

exports.default = {
  data: function data() {
    return {
      load: false
    };
  },

  props: ["loaded"],
  computed: {},
  methods: {},
  watch: {
    loaded: function loaded(newVal) {
      console.log(newVal);
      this.load = newVal;
    }
  }
};

/***/ }),

/***/ "eXNc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_2_vue__ = __webpack_require__("k8I1");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_2_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_2_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_2_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_2_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_98cd5824_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_2_vue__ = __webpack_require__("zg6R");
function injectStyle (ssrContext) {
  __webpack_require__("wZf7")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_2_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_98cd5824_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_2_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "h4QM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.load),expression:"!load"}],staticClass:"lz-readys"},[_vm._m(0)])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"spinner"},[_c('div',{staticClass:"spinner-container container1"},[_c('div',{staticClass:"circle1"}),_vm._v(" "),_c('div',{staticClass:"circle2"}),_vm._v(" "),_c('div',{staticClass:"circle3"}),_vm._v(" "),_c('div',{staticClass:"circle4"})]),_vm._v(" "),_c('div',{staticClass:"spinner-container container2"},[_c('div',{staticClass:"circle1"}),_vm._v(" "),_c('div',{staticClass:"circle2"}),_vm._v(" "),_c('div',{staticClass:"circle3"}),_vm._v(" "),_c('div',{staticClass:"circle4"})]),_vm._v(" "),_c('div',{staticClass:"spinner-container container3"},[_c('div',{staticClass:"circle1"}),_vm._v(" "),_c('div',{staticClass:"circle2"}),_vm._v(" "),_c('div',{staticClass:"circle3"}),_vm._v(" "),_c('div',{staticClass:"circle4"})])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "k8I1":
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

var _loading = __webpack_require__("y5K+");

var _loading2 = _interopRequireDefault(_loading);

var _motheds = __webpack_require__("PWXd");

var _motheds2 = _interopRequireDefault(_motheds);

var _lodash = __webpack_require__("M4fF");

var _lodash2 = _interopRequireDefault(_lodash);

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
//
//
//
//
//
//
//
//

exports.default = {
  name: "Index2",
  data: function data() {
    return {
      pointList: null,
      //加载开关
      loaded: false
    };
  },
  created: function created() {
    // 获取地址栏key 与code
    //  this.$route.query.key,
    // 获取地址栏key 与code
    if (this.$route.query.key && this.$route.query.proCode) {
      var data = {
        key: this.$route.query.key,
        code: this.$route.query.proCode
      };
      this.set_msg({ key: "intelligent", lev: "int_quey", data: data });
    }
  },

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
        _this.getPointList(); //疾病Ajax请求
      });
    },

    //请求疾病列表
    getPointList: function getPointList() {
      var _this2 = this;

      console.log(this.$route.query.proCode);
      this.$http.getHttp({
        name: "flagIndex",
        params: {},
        code: this.$route.query.proCode
      }, function (res) {
        console.log(res);
        _this2.loaded = true;
        _this2.pointList = res.data.riskData;
        //paperId 缓存
        _this2.intell.paperId = res.data.paperId;
        //orderNo 缓存
        _this2.intell.orderNo = res.data.orderNo;
        _this2.set_msg({ key: "intelligent", data: _this2.intell }); //将当前选择项缓存
      });
    },

    /** 一级疾病选择*/
    selectTap: function selectTap(check, value) {
      value.required = check;
      console.log(this.pointList);
    },

    /** 二级疾病选择*/
    subItemTap: function subItemTap(item, value) {
      var required = item.required || 0;
      //当前疾病已选择
      if (required == 1) {
        //校验二级疾病选择的个数
        this.$set(item, 'required', 0);
      } else {
        this.$set(item, 'required', 1);
      }
      console.log(this.pointList);
    },

    /**疾病选择完成 请求智能核保 */
    intellFilter: function intellFilter() {
      var _this3 = this;

      var vm = this;
      var isRequired = true; //是否选择患病详情校验
      var datas = {
        questions: [],
        paperId: this.intell.paperId,
        orderNo: this.intell.orderNo
        // 过滤选择的疾病
      };_lodash2.default.forEach(this.pointList, function (v) {
        if (v.required == 1) {
          // 二级疾病列表
          var subDiseaseList = _lodash2.default.filter(v.subDiseaseList, ['required', 1]);
          if (v.diseaseCode == '99999') {
            _this3.intell.results.success = 'false';
            _this3.intell.results.resultInfo = "非常抱歉，您未能通过本次投保审核，请选择其他保险产品";
            _this3.set_msg({ key: "intelligent", lev: "results", data: _this3.intell.results }); //将当前选择项缓存
            _this3.$router.replace({ path: '/result-2' }); //跳转到问题页
            return isRequired = false;
          }
          //判断是否选择患病详情
          if (_lodash2.default.isEmpty(subDiseaseList)) {
            vm.$popup.msg("还未选择" + v.diseaseDesc + "患病详情");
            return isRequired = false;
          }
          _lodash2.default.forEach(subDiseaseList, function (s) {
            var objs = {
              diseaseCode: v.diseaseCode,
              diseaseDesc: v.diseaseDesc
            };
            objs.subDiseaseList = s;
            datas.questions.push(objs);
          });
        }
      });
      if (!isRequired) return;
      if (_lodash2.default.isEmpty(datas.questions)) return this.$popup.msg("请先选择疾病");
      console.log(datas);
      // 请求问题或结果
      this.intellAjax(datas);
    },

    /** 请求问题或结果*/
    intellAjax: function intellAjax(datas) {
      var _this4 = this;

      var load = this.$popup.loading("加载中...");
      this.$http.getHttp({
        name: "answerList",
        params: datas,
        code: this.$route.query.proCode
      }, function (res) {
        console.log(res);
        _this4.$popup.closeLay(load);
        if (res.data.questions) {
          _this4.intell.issList = res.data.questions;
          _this4.set_msg({ key: "intelligent", lev: "issList", data: _this4.intell.issList }); //将当前选择项缓存
          _this4.$router.push({ path: '/issue-2' }); //跳转到问题页
        } else {
          _this4.intell.results.success = res.data.success;
          _this4.intell.results.resultInfo = res.data.result;
          _this4.set_msg({ key: "intelligent", lev: "results", data: _this4.intell.results }); //将当前选择项缓存
          _this4.$router.push({ path: '/result-2' }); //跳转到结果页
        }
      });
    }
  }, (0, _vuex.mapMutations)({
    set_msg: "SET_MESSAGE"
  })),
  computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(["intell"])),
  components: {
    "app-loading": _loading2.default
  },
  mounted: function mounted() {
    this.getInform();
  }
};

/***/ }),

/***/ "s2Fc":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "wZf7":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "y5K+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_loading_vue__ = __webpack_require__("KHvu");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_loading_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_loading_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_loading_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_loading_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_17b0f362_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_loading_vue__ = __webpack_require__("h4QM");
function injectStyle (ssrContext) {
  __webpack_require__("s2Fc")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_loading_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_17b0f362_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_loading_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "zg6R":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"index-2"},[_c('div',{staticClass:"point-list"},_vm._l((_vm.pointList),function(value,i){return _c('div',{key:i,staticClass:"point-01"},[_c('p',{staticClass:"title"},[_vm._v(_vm._s(i+1)+"、是否有"+_vm._s(value.showName || value.diseaseDesc)+"。")]),_vm._v(" "),_c('div',{staticClass:"select-btn clearfix"},[_c('div',{staticClass:"select-yes fl",class:value.required == 1?'active':'',on:{"click":function($event){return _vm.selectTap(1,value)}}},[_c('i'),_vm._v(" 是\r\n        ")]),_vm._v(" "),_c('div',{staticClass:"select-no fr",class:value.required == 0?'active':'',on:{"click":function($event){return _vm.selectTap(0,value)}}},[_c('i'),_vm._v(" 否\r\n        ")])]),_vm._v(" "),(value.subDiseaseList.length>0)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(value.required == 1),expression:"value.required == 1"}],staticClass:"point-02 clearfix"},_vm._l((value.subDiseaseList),function(item,n){return _c('span',{key:n,class:item.required == 1?'active':'',on:{"click":function($event){return _vm.subItemTap(item,value.subDiseaseList)}}},[_vm._v(_vm._s(item.diseaseDesc))])}),0):_vm._e()])}),0),_vm._v(" "),_c('div',{staticClass:"blank"}),_vm._v(" "),_c('div',{staticClass:"intell-btn"},[_c('span',{on:{"click":_vm.intellFilter}},[_vm._v("智能核保")])]),_vm._v(" "),_c('app-loading',{attrs:{"loaded":_vm.loaded}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=7.js.map