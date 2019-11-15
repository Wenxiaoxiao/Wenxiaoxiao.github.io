webpackJsonp([2],{

/***/ "GZQf":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "I3on":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

var _stringify = __webpack_require__("mvHQ");

var _stringify2 = _interopRequireDefault(_stringify);

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

var _questionTree = __webpack_require__("gzec");

var _questionTree2 = _interopRequireDefault(_questionTree);

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

exports.default = {
				name: "question-tree",
				props: {
								model: Object,
								parentActive: {
												// type: Number,
												default: -1
								}
				},
				components: {
								"question-tree": _questionTree2.default
				},
				data: function data() {
								console.log("this", this);
								return {
												activeIndex: -1,
												childActive: -1
								};
				},

				methods: {
								// 选择按钮，修改当前激活序列，修改atore中数据
								checkBtn: function checkBtn(id, n) {
												this.activeIndex = n;
												this.childActive = this.childActive - 1; // 选择按钮时，重置子组件中的activeIndex
												var QUES_ILLS = JSON.parse(sessionStorage.getItem("TMP_QUES_ILLS"));
												this.eachList(QUES_ILLS, id, n);
												sessionStorage.setItem("TMP_QUES_ILLS", (0, _stringify2.default)(QUES_ILLS));
								},
								eachList: function eachList(data, id, i) {
												var _this = this;

												data.map(function (element) {
																if (element.id == id) {
																				element.choosed = 1;
																				element.children.map(function (item, n) {
																								if (n == i) {
																												item.choosed = 1;
																												if (item.children && item.children.length > 0) {
																																item.children.map(function (c, s) {
																																				if (c.type == 2) c.choosed = 2;
																																});
																												}
																								} else {
																												item.choosed = 0;
																												if (item.children && item.children.length > 0) {
																																item.children.map(function (c, s) {
																																				if (c.type == 2) c.choosed = 0;
																																});
																												}
																								}
																				});
																}
																if (element.children && element.children.length > 0) _this.eachList(element.children, id, i);
												});
								}
				},
				watch: {
								// 监听父组件的activeIndex修改，并重置当前组件的activeIndex；
								parentActive: function parentActive(newVal) {
												this.activeIndex = -1;
								}
				}
};

/***/ }),

/***/ "Lp6x":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.model.type==2)?_c('div',[_c('div',{staticClass:"questionItem"},[_c('span',{staticClass:"subTitle"},[_vm._v(_vm._s(_vm.model.content))]),_vm._v(" "),_c('div',{staticClass:"btns fc"},_vm._l((_vm.model.children),function(btnData,n){return _c('div',{key:n},[_c('span',{staticClass:"btn",class:n==_vm.activeIndex?'active':'',on:{"click":function($event){return _vm.checkBtn(_vm.model.id,n)}}},[_vm._v(_vm._s(btnData.content))])])}),0)]),_vm._v(" "),(_vm.model.children[_vm.activeIndex] && _vm.model.children[_vm.activeIndex].children && _vm.model.children[_vm.activeIndex].children.length>0)?_c('div',_vm._l((_vm.model.children[_vm.activeIndex].children),function(p){return _c('question-tree',{key:p.id,attrs:{"model":p,"parentActive":_vm.childActive}})}),1):_vm._e()]):_c('div',[(_vm.model.children && _vm.model.children.length>0)?_c('div',{staticClass:"questionSubItem"},[(_vm.model.children && _vm.model.children.length>0)?_c('div',{staticClass:"title"},[_vm._v("- "+_vm._s(_vm.model.content))]):_vm._e(),_vm._v(" "),(_vm.model.children && _vm.model.children.length>0)?_c('div',_vm._l((_vm.model.children),function(p){return _c('question-tree',{key:p.id,attrs:{"model":p}})}),1):_vm._e()]):_vm._e()])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "QgfA":
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

var _questionTree = __webpack_require__("gzec");

var _questionTree2 = _interopRequireDefault(_questionTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'question',
    data: function data() {
        return {
            headerTitle: '智能核保',
            clientHeight: 0,
            QUES_ILLS: []
        };
    },
    created: function created() {},

    methods: {
        //
        onHeaderBtn: function onHeaderBtn() {},

        //确定
        goNext: function goNext() {
            var QUES_ILLS = JSON.parse(sessionStorage.getItem("TMP_QUES_ILLS"));
            this.hasMoreQueation = '';
            this.checkMoreQuestion(QUES_ILLS);
            if (!this.hasMoreQueation) {
                this.$router.push({ path: '/fuxing/issue' });
            }
        },

        //上一步
        goPrev: function goPrev() {
            this.$router.go(-1);
            //this.$router.push({path:'/fuxing/index'});
        },

        // 校验是否还有未选择的问题
        checkMoreQuestion: function checkMoreQuestion(data) {
            var _this = this;

            if (this.hasMoreQueation) return;
            data.forEach(function (item, i) {
                if (item.type == 2 && item.choosed == 2) {
                    _this.hasMoreQueation = item.content;
                    _this.$popup.alert('问题--"' + item.content + '"尚未选择，请您选择后再提交！');
                    return false;
                }
                if (item.children && item.children.length > 0) _this.checkMoreQuestion(item.children);
            });
        },
        checkHasQuestion: function checkHasQuestion(data) {
            data.forEach(function (item, i) {
                item.hasQ = false;
                item.children.forEach(function (p, n) {
                    if (p.children && p.children.length > 0) {
                        item.hasQ = true;
                        return false;
                    }
                });
            });
        }
    },
    computed: {},
    components: {
        "header-text": _header2.default,
        "question-tree": _questionTree2.default
    },
    mounted: function mounted() {
        var QUES_ILLS = JSON.parse(sessionStorage.getItem("TMP_QUES_ILLS"));
        this.checkHasQuestion(QUES_ILLS);
        this.QUES_ILLS = QUES_ILLS;
        sessionStorage.setItem("TMP_QUES_ILLS", (0, _stringify2.default)(QUES_ILLS));

        this.clientHeight = window.innerHeight - document.getElementsByClassName("fx-btns")[0].clientHeight - document.getElementsByClassName("fx-tips")[0].clientHeight;
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

/***/ "Smwe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fx-question"},[_c('div',{staticClass:"fx-tips"},[_vm._v("请如实回答下列问题：")]),_vm._v(" "),_c('div',{staticClass:"fx-content",style:({height:_vm.clientHeight+'px'})},[_c('div',{staticClass:"wrapper"},_vm._l((_vm.QUES_ILLS),function(vals,i){return _c('div',{directives:[{name:"show",rawName:"v-show",value:(vals.hasQ),expression:"vals.hasQ"}],key:i,staticClass:"questionItems"},_vm._l((vals.children),function(p,m){return _c('question-tree',{key:m,attrs:{"model":p,"parentActive":"-1"}})}),1)}),0)]),_vm._v(" "),_c('div',{staticClass:"fx-btns"},[_c('div',{staticClass:"preBtn",on:{"click":function($event){return _vm.goPrev()}}},[_vm._v("上一步")]),_vm._v(" "),_c('div',{staticClass:"nextBtn",on:{"click":function($event){return _vm.goNext()}}},[_vm._v("确定")])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "gzec":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_questionTree_vue__ = __webpack_require__("I3on");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_questionTree_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_questionTree_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_questionTree_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_questionTree_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2f7b59f2_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_questionTree_vue__ = __webpack_require__("Lp6x");
function injectStyle (ssrContext) {
  __webpack_require__("mPzS")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_questionTree_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2f7b59f2_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_questionTree_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "jZYJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_question_vue__ = __webpack_require__("QgfA");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_question_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_question_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_question_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_question_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4e407c4e_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_question_vue__ = __webpack_require__("Smwe");
function injectStyle (ssrContext) {
  __webpack_require__("GZQf")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_question_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4e407c4e_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_question_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "mPzS":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

});
//# sourceMappingURL=2.js.map