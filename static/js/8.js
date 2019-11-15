webpackJsonp([8],{

/***/ "0Imh":
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

var _vuex = __webpack_require__("NYxO");

var _mintUi = __webpack_require__("Au9i");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'index',
    data: function data() {
        return {
            proCode: null,
            orderId: null,
            showMore: false,
            hasQuestion: false,
            pointList: null,
            diseaseList: [],
            headerTitle: '智能核保',
            clientHeight: 10,
            activeIndex: 0
        };
    },
    created: function created() {},

    methods: {
        //展示更多
        showMoreIll: function showMoreIll() {
            if (!this.showMore) {
                var result = this.getAllChoose();
                if (!result || result.length == 0) {
                    this.$popup.msg("您尚未选择任何疾病！");
                    return;
                }
            }
            this.showMore = !this.showMore;
        },

        //找到 type = 4
        findType4: function findType4(arr) {
            var type4arr = [];
            var findTypeList = function findTypeList(data) {
                data.map(function (item) {
                    if (item.children.length > 0 && item.children[0].type === 4) {
                        type4arr.push(item);
                    } else {
                        findTypeList(item.children);
                    }
                });
            };
            findTypeList(arr);
            return type4arr;
        },

        //提交疾病
        submitDiease: function submitDiease() {
            //flag 这里要判断 ????
            var result = this.getAllChoose();
            if (!result || result.length == 0) {
                this.$popup.msg("请您先选择疾病！");
                return;
            }
            //判断是否有 type = 4
            var type4arr = this.findType4(result);
            if (type4arr.length > 0) {
                //有二级疾病
                sessionStorage.setItem("QUES_ILLS", (0, _stringify2.default)(result));
                this.$router.push({ path: '/fuxing/index1' });
            } else {
                //无二级疾病
                this.hasQuestion = false;
                this.findQuestions(result);
                console.log("this.hasQuestion", this.hasQuestion);
                console.log("result", result);
                if (!this.hasQuestion) {
                    //没有问题的情况下，直接跳过问答页和问答确认页 到结果页面
                    sessionStorage.setItem("QUES_ILLS", (0, _stringify2.default)(result));
                    sessionStorage.setItem("TMP_QUES_ILLS", (0, _stringify2.default)(result));
                    console.log("result", result);
                    //获取选中疾病的答案id
                    var tmpIdList = [];
                    var findTmpIdList = function findTmpIdList(data) {
                        data.map(function (item) {
                            if (item.choosed === 1 && item.type === 3 && item.children.length === 0) {
                                console.log("item", item);
                                tmpIdList.push(item.id);
                                // if(item.children.length>0){
                                //     findTmpIdList(item.children);
                                // }
                            } else if (item.choosed === 1 && item.children.length > 0) {
                                findTmpIdList(item.children);
                            } else if (item.choosed === 1 && item.children.length === 0) {
                                console.log("item", item);
                                tmpIdList.push(item.id);
                            }
                        });
                    };
                    var QUES_ILLS = result;
                    var tmp = findTmpIdList(QUES_ILLS);
                    console.log("tmpIdList", tmpIdList);
                    this.chosedIllIds = tmpIdList;
                    //获取核保结果
                    var HEALTHY_TYPE = sessionStorage.getItem("HEALTHY_TYPE") === '1' ? 2 : 1;
                    var THAT = this;
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
                } else {
                    this.initList(result, 2, 3);
                    console.log("result", result);
                    sessionStorage.setItem("QUES_ILLS", (0, _stringify2.default)(result));
                    sessionStorage.setItem("TMP_QUES_ILLS", (0, _stringify2.default)(result));
                    //进入回答问题页面
                    console.log("进入回答问题页面");
                    this.$router.push({ path: '/fuxing/question' });
                    sessionStorage.setItem("TYPE4_DATA", (0, _stringify2.default)([]));
                }
            }
        },
        findQuestions: function findQuestions(data) {
            var _this = this;

            data.map(function (item) {
                if (item.type == 2) {
                    _this.hasQuestion = true;
                    return false;
                }
                if (item.children && item.children.length > 0) _this.findQuestions(item.children);
            });
        },
        initList: function initList(data, type, level) {
            var _this2 = this;

            data.map(function (item, index) {
                if (item.type == type && item.level == level) {
                    item.choosed = 2;
                }
                if (item.children && item.children.length > 0) _this2.initList(item.children, type, level);
            });
        },

        // 获取默认选择数组
        getAllChoose: function getAllChoose() {
            var list = JSON.parse((0, _stringify2.default)(this.pointList));
            if (list && list.length > 0) {
                var filterData = list.filter(function (item) {
                    item.children = item.children.filter(function (t) {
                        return t.choosed;
                    });
                    return item.choosed == 1;
                });
                return filterData;
            } else {
                return [];
            }
        },

        //点击选择疾病
        choseDisease: function choseDisease(fatherIndex, index, old) {
            console.time('a');
            this.pointList[fatherIndex].children[index].choosed = old == 1 ? 0 : 1;
            var hasCheckFather = false;
            if (old != 1) {
                hasCheckFather = true;
            } else {
                this.pointList[fatherIndex].children.map(function (item, n) {
                    if (item.choosed == 1) {
                        hasCheckFather = true;
                        return false;
                    }
                });
            }
            this.pointList[fatherIndex].choosed = hasCheckFather ? 1 : 0;
            console.timeEnd('a');
        },

        //点击左边获取右边
        showChild: function showChild(list, index) {
            this.activeIndex = index;
            this.$forceUpdate();
        },

        //点击header
        onHeaderBtn: function onHeaderBtn(headerText) {
            this.$router.go(-1);
        },

        //请求疾病列表
        getPointList: function getPointList() {
            var THAT = this;
            _mintUi.Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            THAT.$http.getHttp({
                name: 'fxIllList',
                params: {},
                orderId: THAT.orderId,
                type: 'get'
            }, function (res) {
                _mintUi.Indicator.close();
                if (THAT.healthyType == 0 && res.data.holderDiseaseNodes.length > 0) {
                    var pointList = THAT.setAllChoose(res.data.holderDiseaseNodes);
                    THAT.pointList = pointList;
                    //THAT.diseaseList = THAT.pointList[THAT.activeIndex].children;
                } else if (THAT.healthyType == 1 && res.data.insureDiseaseNodes.length > 0) {
                    //insureDiseaseNodes
                    var _pointList = THAT.setAllChoose(res.data.insureDiseaseNodes);
                    THAT.pointList = _pointList;
                    //THAT.diseaseList = THAT.pointList[THAT.activeIndex].children;
                }
            });
            console.log("THAT.pointList", THAT.pointList);
        },

        // 设置默认选择项
        setAllChoose: function setAllChoose(data) {
            var _this3 = this;

            data.map(function (item, index) {
                item.choosed = 0;
                if (item.children && item.children.length > 0) {
                    _this3.setAllChoose(item.children);
                }
            });
            return data;
        }
    },
    computed: {},
    components: {
        "header-text": _header2.default
    },
    mounted: function mounted() {
        var healthyType = this.$route.query.healthyType,
            orderId = this.$route.query.policyId,
            jumpKey = this.$route.query.key,
            proCode = this.$route.query.proCode;
        this.healthyType = healthyType;
        this.orderId = orderId;
        sessionStorage.setItem("HEALTHY_TYPE", healthyType);
        sessionStorage.setItem("ORDER_ID", orderId);
        sessionStorage.setItem("JUMP_KEY", jumpKey);
        sessionStorage.setItem("proCode", proCode);
        this.clientHeight = window.innerHeight;
        this.getPointList();
        console.log("this.pointList", this.pointList);
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

/***/ }),

/***/ "GPbX":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "f8F6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fx-index"},[_c('div',{staticClass:"fx-tips"},[_vm._v("请选择疾病：")]),_vm._v(" "),_c('div',{style:({height:_vm.clientHeight+'px',overflow:'hidden'})},[_c('div',{staticClass:"point-list",style:({height:_vm.clientHeight+'px'})},_vm._l((_vm.pointList),function(value,i){return _c('div',{key:value.id,on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.showChild(value.children,i)}}},[_c('div',{class:_vm.activeIndex == i?'activeItem':''},[_vm._v(_vm._s(value.content))])])}),0),_vm._v(" "),(_vm.pointList!==null && _vm.pointList.length>0 && _vm.activeIndex!==null)?_c('div',{staticClass:"child-list",style:({height:_vm.clientHeight+'px'})},_vm._l((_vm.pointList[_vm.activeIndex].children),function(value,index){return _c('div',{key:value.id,staticClass:"disease",on:{"click":function($event){return _vm.choseDisease(_vm.activeIndex,index,value.choosed)}}},[_c('div',{class:value.choosed?'activeItem':''},[_vm._v(_vm._s(value.content))]),_vm._v(" "),(value.choosed == 1)?_c('div',{staticClass:"choseIcon"}):_vm._e()])}),0):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"fx-btns"},[(!_vm.showMore)?_c('div',{staticClass:"preBtn",on:{"click":_vm.showMoreIll}},[_vm._v("查看已选疾病")]):_vm._e(),_vm._v(" "),(_vm.showMore)?_c('div',{staticClass:"preBtn",on:{"click":_vm.showMoreIll}},[_vm._v("收起")]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"nextBtn",on:{"click":function($event){return _vm.submitDiease()}}},[_vm._v("选好了")])]),_vm._v(" "),(_vm.showMore)?_c('div',{staticClass:"fix-results"},[_c('div',{staticClass:"mask",on:{"click":_vm.showMoreIll}}),_vm._v(" "),_c('div',{staticClass:"fix-main"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"list"},_vm._l((_vm.pointList),function(value,index){return (value.choosed==1)?_c('div',{key:index},_vm._l((value.children),function(p,n){return (p.choosed==1)?_c('div',{key:n,staticClass:"list-item",on:{"click":function($event){return _vm.choseDisease(index,n,1)}}},[_c('div',{staticClass:"list-content"},[_vm._v(_vm._s(p.content))]),_vm._v(" "),_c('img',{staticClass:"close",attrs:{"src":__webpack_require__("tNrc")}})]):_vm._e()}),0):_vm._e()}),0)])]):_vm._e()])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"titile"},[_c('span',[_vm._v("被保险人所患疾病：")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "lSQy":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__("0Imh");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6960b793_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__("f8F6");
function injectStyle (ssrContext) {
  __webpack_require__("GPbX")
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6960b793_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "tNrc":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAYAAAAP6L+eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkIyNEZCRTRGMEFDMTFFOTgxRDlGOEVGODFCREMxMUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkIyNEZCRTVGMEFDMTFFOTgxRDlGOEVGODFCREMxMUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyQjI0RkJFMkYwQUMxMUU5ODFEOUY4RUY4MUJEQzExRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyQjI0RkJFM0YwQUMxMUU5ODFEOUY4RUY4MUJEQzExRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pk6QoqQAAAHtSURBVHjapJXJSgNBEIYnw3jwIIjiFiUYH0BciKIinvTo0bMLrhgQN0QPiQhqxAXFaAwuD+DZi+DJg8SYxOQhRPCuoCT6F9RAOWTGmbHhz1Snpz+qq//u8fSH38OKorRAU9Cr4rDdhkp/9QfWP/bxaNLwE+L/uqBW6EVx2QCN4TFJsQot8f/VUA6qcQmN6lC0JIF3BbwSykBeh9A4HjPcTUE9HtRYH1+GIhy/Qc02ax4TmWZQ8za9FHrbgRY5rrKZuYRSpgF9QDW8uActcFzLcJ8J9FJAHwiKbPP6oFZkAtnFw7WnDU1A7Qa3HEEjHD8B2G2EqCbZUOZzhszLuE8bFeQ4AWigGECzqN8hRO7f4szvKDtonMfTtPtmk7U/NmcbItts8Mbo2d1Ag1DBbKJqw05Uz6zof3GZClaT7IBPoF7RL6ErwsIttsAX0DTH19Asx35ehdcNmMw/qlsKGoKi4hCVQ884zg1OwNL8ZLUOgxWD4oSmAa+zA44L8yfZCd+Gd46hFQHPAu6zAl8Jnz5ypnmTVdGFNW/IvLEY+BwaFubvtOGYA5E5XbkpwL0STJmOGZZv99MUERdXBW+on8BnItMcL7/g8LtHF9eaKMs9gSfE8gOKywb4poDXq3wA6HT1QZ/KPxrDV6HTHwEGAEpves2F9pb2AAAAAElFTkSuQmCC"

/***/ })

});
//# sourceMappingURL=8.js.map