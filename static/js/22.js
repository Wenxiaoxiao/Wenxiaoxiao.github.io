webpackJsonp([22],{

/***/ "BMyh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_result_vue__ = __webpack_require__("Kr5R");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_result_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_result_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_result_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_result_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_33defcc0_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_result_vue__ = __webpack_require__("m3Kh");
function injectStyle (ssrContext) {
  __webpack_require__("J7iG")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_result_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_33defcc0_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_result_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "J7iG":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Kr5R":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

var _header = __webpack_require__("Cz8s");

var _header2 = _interopRequireDefault(_header);

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
//
//
//
//
//

exports.default = {
    name: 'result',
    data: function data() {
        return {
            headerTitle: '核保结果',
            flag: null,
            json: { //100 通过 101 拒保 102 除责 103 人工核保 201 数据不正确
                "1": {
                    resultType: 1, //0为未通过 1为通过 2为带条件投保 3为补充资料
                    resultTitle: "您已通过审核，可以正常投保",
                    resultText: "您的健康报告已通过本次审核，恭喜您可以正常投保本产品。"
                },
                "0": {
                    resultType: 0, //0为未通过 1为通过 2为带条件投保 3为补充资料
                    resultTitle: "抱歉未通过审核",
                    resultText: "您的健康告知不符合保险公司的审核标准，可联系梧桐树保险顾问为您推荐其他产品。"
                },
                "3": {
                    resultType: 3, //0为未通过 1为通过 2为带条件投保 3为补充资料
                    resultTitle: "sorry,系统走神啦，请联系",
                    resultTitle1: '在线客服帮您解决'
                },
                "2": {
                    resultType: 2, //0为未通过 1为通过 2为带条件投保 3为补充资料
                    resultTitle: "需除外部分责任后投保",
                    resultText: "您本次核保的结论是：",
                    resultLink: "", //errorContent
                    resultChose: "您是否接受此条件继续投保？"
                },
                "4": {
                    resultType: 4, //0为未通过 1为通过 2为带条件投保 3为补充资料
                    resultTitle: "转人工核保",
                    resultText: "根据您的健康告知，需要转人工核保进行审核，人工核保需要1-3个工作日，您是否需要转人工核保？",
                    resultLink: "" //errorContent
                }
            },
            result: {}
        };
    },
    created: function created() {},

    methods: {
        //点击header
        onHeaderBtn: function onHeaderBtn(headerText) {
            console.log(headerText);
        },

        //根据id找到最后一级病种
        findItemById: function findItemById(arr, targetId) {
            //判断type是否等于1 ===》病种
            var targetItem;
            var findItem = function findItem(array, itemId) {
                array.forEach(function (item) {
                    if (item.id == itemId) {
                        //console.log("item",item);
                        if (item.type === 1 || item.type === 4) {
                            targetItem = item;
                        } else {
                            console.log("item", item);
                            findItem(arr, item.parentId);
                        }
                    } else if (item.children.length > 0) {
                        findItem(item.children, itemId);
                    }
                });
            };
            var tmp1 = findItem(arr, targetId);
            console.log("targetItem", targetItem);
            return targetItem.content;
        },

        //请求结论页面
        getResultPage: function getResultPage() {
            var THAT = this;
            var errorContent = sessionStorage.getItem("errorContent");
            if (errorContent) {
                var tmp = JSON.parse(errorContent);
                //需要加上病种
                var QUES_ILLS = JSON.parse(sessionStorage.getItem("QUES_ILLS"));
                var tmpStr;
                if (tmp.length > 1) {
                    if (THAT.flag == 2) {
                        tmpStr = "<br/>";
                    } else {
                        tmpStr = "";
                    }
                    tmp.map(function (item, index) {
                        if (item.status === 102) {
                            var illName = THAT.findItemById(QUES_ILLS, item.diseaseId);
                            console.log("illName", illName);
                            tmpStr = tmpStr + '<span style="color:#666;">' + (index + 1) + '.' + illName + '：</span>' + '<br/>' + item.errorContent + '<br/>';
                        }
                    });
                } else {
                    tmpStr = "";
                    tmp.map(function (item, index) {
                        if (item.status === 102) {
                            var illName = THAT.findItemById(QUES_ILLS, item.diseaseId);
                            console.log("illName", illName);
                            tmpStr = tmpStr + '<span style="color:#666;">' + illName + '：</span>' + '<br/>' + item.errorContent + '<br/>';
                        }
                    });
                }
                THAT.json["2"].resultLink = tmpStr;
                if (tmpStr !== "") {
                    THAT.json["4"].resultLink = '<div class="list-title">除外项</div>' + tmpStr;
                } else {
                    THAT.json["4"].resultLink = null;
                }
            }
            console.log(THAT.$route.query.resultType);
            var flag = THAT.$route.query.resultType;
            THAT.result = THAT.json[flag];
            THAT.flag = flag;
        },

        //点击按钮事件
        resultAction: function resultAction(type) {
            console.log("this.$common.api_root", this.$common.api_root);
            console.log(type);
            var HEALTHY_TYPE = sessionStorage.getItem("HEALTHY_TYPE"); //0 投保人 1被保人
            var JUMP_KEY = sessionStorage.getItem("JUMP_KEY");
            var proCode = sessionStorage.getItem("proCode");
            console.log("HEALTHY_TYPE", HEALTHY_TYPE);
            if (type === 3) {
                //取消投保
                if (HEALTHY_TYPE === "1") {
                    //已经是被投保人健康告知了
                    //this.$router.push({path:'/fuxing/healthy'});
                    window.location.href = this.$common.api_root + "/market/healthy.html?key=" + JUMP_KEY + "&proCode=" + proCode;
                } else if (HEALTHY_TYPE === "0") {
                    window.location.href = this.$common.api_root + "/market/healthy-holder.html?key=" + JUMP_KEY + "&proCode=" + proCode;
                }
            }
            if (type === 5) {
                //人工核保 //调订单页
                window.location.href = this.$common.api_root + "/market/writeInform-3.html?key=" + JUMP_KEY + "&proCode=" + proCode;
                //这里后台处理
                //this.$router.push({path:'/fuxing/questionnaire'})
            }
            if (type === 0) {
                //继续投保
                console.log("跳到订单页");
                if (HEALTHY_TYPE === "0") {
                    //跳到被保人健康告知
                    window.location.href = this.$common.api_root + "/market/healthy.html?key=" + JUMP_KEY + "&proCode=" + proCode;
                } else if (HEALTHY_TYPE === "1") {
                    window.location.href = this.$common.api_root + "/market/writeInform-3.html?key=" + JUMP_KEY + "&proCode=" + proCode;
                }
                //this.$common.api_root
            }
            if (type === 1) {
                console.log("客服页面");
                window.location.href = 'https://bx.wts999.com/m/customer/index.html';
                //https://bx.wts999.com/m/customer/index.html
            }
            if (type === 2) {
                //返回
                // this.$router.push({path:'/fuxing/healthy'})
                if (HEALTHY_TYPE === "1") {
                    //已经是被投保人健康告知了
                    //this.$router.push({path:'/fuxing/healthy'});
                    window.location.href = this.$common.api_root + "/market/healthy.html?key=" + JUMP_KEY + "&proCode=" + proCode;
                } else if (HEALTHY_TYPE === "0") {
                    window.location.href = this.$common.api_root + "/market/healthy-holder.html?key=" + JUMP_KEY + "&proCode=" + proCode;
                }
            }
            if (type === 4) {
                // console.log('aa');
                if (HEALTHY_TYPE === "1") {
                    //已经是被投保人健康告知了
                    window.location.href = this.$common.api_root + "/market/writeInform-3.html?key=" + JUMP_KEY + "&proCode=" + proCode;
                    //this.$router.push({path:'/fuxing/healthy'});
                    //window.location.href = this.$common.api_root+"/market/healthy.html?key="+JUMP_KEY+"&proCode=" + proCode;
                } else if (HEALTHY_TYPE === "0") {
                    window.location.href = this.$common.api_root + "/market/healthy-holder.html?key=" + JUMP_KEY + "&proCode=" + proCode;
                }
            }
        }
    },
    computed: {},
    components: {
        "header-text": _header2.default
    },
    mounted: function mounted() {
        this.getResultPage();
    }
};

/***/ }),

/***/ "m3Kh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fx-result"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.flag == 0),expression:"flag == 0"}],staticClass:"rejectBg bg"}),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.flag == 1 || _vm.flag == 2),expression:"flag == 1 || flag == 2"}],staticClass:"passBg bg"}),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.flag == 3 || _vm.flag == 4),expression:"flag == 3 || flag == 4"}],staticClass:"warnBg bg"}),_vm._v(" "),_c('div',{staticClass:"title"},[_vm._v(_vm._s(_vm.result.resultTitle))]),_vm._v(" "),_c('div',{staticClass:"title1"},[_vm._v(_vm._s(_vm.result.resultTitle1))]),_vm._v(" "),_c('div',{staticClass:"content"},[_vm._v(_vm._s(_vm.result.resultText)),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.flag == 2),expression:"flag == 2"}],staticClass:"linktext",domProps:{"innerHTML":_vm._s(_vm.result.resultLink)}})]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.flag == 4 && _vm.result.resultLink),expression:"flag == 4 && result.resultLink"}],staticClass:"list-item",domProps:{"innerHTML":_vm._s(_vm.result.resultLink)}}),_vm._v(" "),_c('div',{staticClass:"content"},[_vm._v(_vm._s(_vm.result.resultChose))]),_vm._v(" "),_c('div',{staticClass:"btns"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.flag == 1),expression:"flag == 1"}],staticClass:"oneBtn blueBtn",on:{"click":function($event){return _vm.resultAction(0)}}},[_vm._v("继续投保")]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.flag == 0),expression:"flag == 0"}]},[_c('div',{staticClass:"oneBtn blueBtn",on:{"click":function($event){return _vm.resultAction(1)}}},[_vm._v("联系保险顾问")]),_vm._v(" "),_c('div',{staticClass:"oneBtn whiteBtn",on:{"click":function($event){return _vm.resultAction(2)}}},[_vm._v("返回")])]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.flag == 2),expression:"flag == 2"}]},[_c('div',{staticClass:"twoBtn whiteBtn1",on:{"click":function($event){return _vm.resultAction(3)}}},[_vm._v("取消投保")]),_vm._v(" "),_c('div',{staticClass:"twoBtn blueBtn",on:{"click":function($event){return _vm.resultAction(4)}}},[_vm._v("继续投保")])]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.flag == 3),expression:"flag == 3"}]},[_c('div',{staticClass:"oneBtn blueBtn",on:{"click":function($event){return _vm.resultAction(1)}}},[_vm._v("联系在线客服")])]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.flag == 4),expression:"flag == 4"}]},[_c('div',{staticClass:"twoBtn whiteBtn1",on:{"click":function($event){return _vm.resultAction(3)}}},[_vm._v("取消投保")]),_vm._v(" "),_c('div',{staticClass:"twoBtn blueBtn",on:{"click":function($event){return _vm.resultAction(5)}}},[_vm._v("转人工核保")])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});
//# sourceMappingURL=22.js.map