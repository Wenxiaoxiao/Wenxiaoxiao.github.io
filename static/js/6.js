webpackJsonp([6],{

/***/ "DXjS":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__("mvHQ");

var _stringify2 = _interopRequireDefault(_stringify);

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

var _header = __webpack_require__("Cz8s");

var _header2 = _interopRequireDefault(_header);

var _insureTree = __webpack_require__("GK8I");

var _insureTree2 = _interopRequireDefault(_insureTree);

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
//
//
//
//
//
//

exports.default = {
    name: 'issue',
    data: function data() {
        return {
            orderId: null,
            headerTitle: '智能核保',
            clientHeight: 0,
            questionJson: []
        };
    },
    created: function created() {},

    methods: {
        //头部点击事件
        onHeaderBtn: function onHeaderBtn(text) {
            this.$router.go(-1);
        },

        //返回修改
        goPrev: function goPrev() {
            var TMP_QUES_ILLS = JSON.parse(sessionStorage.getItem("TMP_QUES_ILLS"));
            this.initList(TMP_QUES_ILLS, 2, 3);
            this.initList(TMP_QUES_ILLS, 2, 4);
            sessionStorage.setItem("TMP_QUES_ILLS", (0, _stringify2.default)(TMP_QUES_ILLS));
            this.$router.go(-1);
        },
        initList: function initList(data, type, level) {
            var _this = this;

            data.map(function (item, index) {
                if (item.type == type && item.level == level) {
                    _this.$set(item, 'choosed', 2);
                }
                if (item.children && item.children.length > 0) _this.initList(item.children, type, level);
            });
        },

        //确定
        goNext: function goNext() {
            //获取选中疾病的答案id
            var tmpIdList = [];
            var findTmpIdList = function findTmpIdList(data) {
                data.map(function (item) {
                    if (item.choosed === 1 && item.type === 3 && item.children.length === 0) {
                        tmpIdList.push(item.id);
                        // if(item.children.length>0){
                        //     findTmpIdList(item.children);
                        // }
                    } else if (item.choosed === 1 && item.children.length > 0) {
                        findTmpIdList(item.children);
                    } else if (item.choosed === 1 && item.children.length === 0) {
                        tmpIdList.push(item.id);
                    }
                });
            };
            var QUES_ILLS = JSON.parse(sessionStorage.getItem("TMP_QUES_ILLS"));
            var tmp = findTmpIdList(QUES_ILLS);
            console.log("tmpIdList", tmpIdList);
            this.chosedIllIds = tmpIdList;
            //获取核保结果
            var THAT = this;
            var HEALTHY_TYPE = sessionStorage.getItem("HEALTHY_TYPE") === '1' ? 2 : 1;
            _mintUi.Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            THAT.$http.getHttp({
                name: 'fxResults',
                params: {
                    type: HEALTHY_TYPE,
                    ids: tmpIdList
                },
                orderId: THAT.orderId,
                type: 'post'
            }, function (res) {
                _mintUi.Indicator.close();
                var status = res.data.status;
                //返回的唯一标识 requestId
                //let requestId = res.data.requestId;
                var errorContent = res.data.errorList;
                if (errorContent) {
                    sessionStorage.setItem("errorContent", (0, _stringify2.default)(errorContent));
                }
                //sessionStorage.setItem("REQUESTID",requestId);
                var resultType = status === 100 ? '?resultType=1' : status === 101 ? '?resultType=0' : status === 102 ? '?resultType=2' : status === 103 ? '?resultType=4' : status === 201 ? '?resultType=3' : '';
                THAT.$router.push({ path: '/fuxing/result' + resultType });
                console.log(res); //100 通过 101 拒保 102 除责 103人工核保 201数据不正确
            });
        }
    },
    computed: {},
    components: {
        "header-text": _header2.default,
        "insure-tree": _insureTree2.default
    },
    mounted: function mounted() {
        var orderId = sessionStorage.getItem("ORDER_ID");
        this.orderId = orderId;
        var QUES_ILLS = JSON.parse(sessionStorage.getItem("TMP_QUES_ILLS"));
        this.questionJson = QUES_ILLS;
        console.log(this.questionJson);
        this.clientHeight = window.innerHeight - document.getElementsByClassName("fx-btns")[0].clientHeight - document.getElementsByClassName("fx-tips")[0].clientHeight;
    }
};

/***/ }),

/***/ "GK8I":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_insureTree_vue__ = __webpack_require__("c8bu");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_insureTree_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_insureTree_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_insureTree_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_insureTree_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_24bdaebe_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_insureTree_vue__ = __webpack_require__("W6+h");
function injectStyle (ssrContext) {
  __webpack_require__("jgs+")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_insureTree_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_24bdaebe_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_insureTree_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "KCXp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_vue__ = __webpack_require__("DXjS");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_issue_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ee480ec4_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_issue_vue__ = __webpack_require__("tuqe");
function injectStyle (ssrContext) {
  __webpack_require__("n6JN")
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ee480ec4_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_issue_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "W6+h":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.model.type==2 && _vm.model.choosed==1)?_c('div',[_vm._l((_vm.model.children),function(val){return _c('div',{directives:[{name:"show",rawName:"v-show",value:(val.choosed==1),expression:"val.choosed==1"}],key:val.id,staticClass:"subTitle"},[_c('div',{staticClass:"item"},[_vm._v(_vm._s(_vm.model.content))]),_vm._v(" "),(val.content === '是')?_c('span',{staticClass:"yes result"},[_vm._v(_vm._s(val.content))]):_vm._e(),_vm._v(" "),(val.content !== '是')?_c('span',{staticClass:"no result"},[_vm._v(_vm._s(val.content))]):_vm._e()])}),_vm._v(" "),_vm._l((_vm.model.children),function(val,i){return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.model.children && _vm.model.children.length>0),expression:"model.children && model.children.length>0"}],key:i},_vm._l((val.children),function(p){return _c('insure-tree',{directives:[{name:"show",rawName:"v-show",value:(val.children && val.children.length>0),expression:"val.children && val.children.length>0"}],key:p.id,attrs:{"model":p}})}),1)})],2):_c('div',_vm._l((_vm.model.children),function(p,m){return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.model.children && _vm.model.children.length>0),expression:"model.children && model.children.length>0"}],key:m},[_c('div',{staticClass:"treeSubItem"},[(_vm.model.choosed ==1 && p.children.length>0)?_c('div',{staticClass:"title"},[_vm._v("- "+_vm._s(_vm.model.content))]):_vm._e(),_vm._v(" "),_c('insure-tree',{attrs:{"model":p}})],1)])}),0)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "c8bu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

var _insureTree = __webpack_require__("GK8I");

var _insureTree2 = _interopRequireDefault(_insureTree);

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

exports.default = {
  name: "insure-tree",
  props: {
    model: Object
  },
  components: {
    "insure-tree": _insureTree2.default
  }
};

/***/ }),

/***/ "jgs+":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "n6JN":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "tuqe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fx-issue"},[_c('div',{staticClass:"fx-tips"},[_vm._v("请确认您选择的问题：")]),_vm._v(" "),_c('div',{staticClass:"fx-content",style:({height:_vm.clientHeight+'px'})},[_c('div',{staticClass:"wrapper"},_vm._l((_vm.questionJson),function(value,index){return _c('div',{directives:[{name:"show",rawName:"v-show",value:(value.hasQ),expression:"value.hasQ"}],key:index,staticClass:"questionItem"},_vm._l((value.children),function(p,m){return _c('div',{key:m},[_c('insure-tree',{attrs:{"model":p}})],1)}),0)}),0)]),_vm._v(" "),_c('div',{staticClass:"fx-btns"},[_c('div',{staticClass:"preBtn",on:{"click":function($event){return _vm.goPrev()}}},[_vm._v("返回修改")]),_vm._v(" "),_c('div',{staticClass:"nextBtn",on:{"click":function($event){return _vm.goNext()}}},[_vm._v("确定")])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=6.js.map