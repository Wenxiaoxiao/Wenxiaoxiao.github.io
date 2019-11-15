webpackJsonp([23],{

/***/ "DbAC":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "FNJQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index1_vue__ = __webpack_require__("p7/E");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index1_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index1_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index1_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7e922663_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index1_vue__ = __webpack_require__("G1Va");
function injectStyle (ssrContext) {
  __webpack_require__("DbAC")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index1_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7e922663_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index1_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "G1Va":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fx-index1"},[_c('div',{staticClass:"fx-wrapper"},_vm._l((_vm.type4arr),function(item,index){return _c('div',{key:item.id},[_c('div',{staticClass:"fx-title"},[_vm._v(_vm._s(item.content))]),_vm._v(" "),_c('div',{staticClass:"fx-content"},_vm._l((item.children),function(val,i){return _c('div',{key:val.id,staticClass:"item",on:{"click":function($event){return _vm.choseDisease(index,i,val.choosed)}}},[_c('span',{class:val.choosed?'activeItem':''},[_vm._v(_vm._s(val.content))]),_vm._v(" "),(val.choosed == 1)?_c('div',{staticClass:"choseIcon"}):_vm._e()])}),0)])}),0),_vm._v(" "),_c('div',{staticClass:"fx-btns"},[_c('div',{staticClass:"nextBtn",on:{"click":function($event){return _vm.submitDiease()}}},[_vm._v("选好了")])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "p7/E":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__("mvHQ");

var _stringify2 = _interopRequireDefault(_stringify);

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

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

exports.default = {
    name: 'index1',
    data: function data() {
        return {
            orderId: null,
            type4arr: [],
            QUES_ILLS: []
        };
    },

    methods: {
        // 获取默认选择数组
        getAllChoose: function getAllChoose() {
            var list = JSON.parse((0, _stringify2.default)(this.type4arr));
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

        //提交
        submitDiease: function submitDiease() {
            var flag = false;
            this.initList(this.QUES_ILLS, 2, 3);
            this.initList(this.QUES_ILLS, 2, 4);
            var QUES_ILLS = JSON.parse((0, _stringify2.default)(this.QUES_ILLS));
            var result = this.getAllChoose();
            var findItem = function findItem(arr1, arr2) {
                arr1.map(function (item1) {
                    arr2.map(function (item2) {
                        if (item1.id === item2.id) {
                            // console.log("item1",item1);
                            // console.log("item2",item2);
                            item1.children = item2.children;
                        } else {
                            findItem(item1.children, arr2);
                        }
                    });
                });
            };
            var tmp = findItem(QUES_ILLS, result);
            result.map(function (item) {
                item.children.map(function (item) {
                    if (item.choosed === 1) {
                        flag = true;
                    }
                });
            });
            if (!flag) {
                this.$popup.msg("请您先选择疾病！");
                return;
            } else {
                this.hasQuestion = false;
                this.findQuestions(QUES_ILLS);
                console.log("this.hasQuestion", this.hasQuestion);
                if (!this.hasQuestion) {
                    //没有问题的情况下，直接跳过问答页和问答确认页 到结果页面
                    sessionStorage.setItem("TMP_QUES_ILLS", (0, _stringify2.default)(QUES_ILLS));
                    //获取选中疾病的答案id
                    var tmpIdList = [];
                    var findTmpIdList = function findTmpIdList(data) {
                        data.map(function (item) {
                            if (item.choosed === 1 && item.type === 3) {
                                console.log("item", item);
                                tmpIdList.push(item.id);
                                if (item.children.length > 0) {
                                    findTmpIdList(item.children);
                                }
                            } else if (item.children.length > 0) {
                                findTmpIdList(item.children);
                            } else if (item.children.length === 0) {
                                console.log("item", item);
                                tmpIdList.push(item.id);
                            }
                        });
                    };
                    var _tmp = findTmpIdList(QUES_ILLS);
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
                        //sessionStorage.setItem("REQUESTID",requestId);
                        var resultType = status === 100 ? '?resultType=1' : status === 101 ? '?resultType=0' : status === 102 ? '?resultType=2' : status === 103 ? '?resultType=4' : status === 201 ? '?resultType=3' : '';
                        THAT.$router.push({ path: '/fuxing/result' + resultType });
                        console.log(res); //100 通过 101 拒保 102 除责 103人工核保 201数据不正确
                    });
                } else {
                    // this.initList(QUES_ILLS,2,3);
                    // this.initList(QUES_ILLS,2,4);
                    // console.log("QUES_ILLS",QUES_ILLS);
                    // this.QUES_ILLS = QUES_ILLS;
                    sessionStorage.setItem("TMP_QUES_ILLS", (0, _stringify2.default)(QUES_ILLS));
                    //进入回答问题页面
                    console.log("进入回答问题页面");
                    this.$router.push({ path: '/fuxing/question' });
                }
            }
        },
        findQuestions: function findQuestions(data) {
            var _this = this;

            data.map(function (item) {
                console.log("item", item);
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
                    _this2.$set(item, 'choosed', 2);
                }
                if (item.children && item.children.length > 0) _this2.initList(item.children, type, level);
            });
        },

        //选中疾病
        choseDisease: function choseDisease(fatherIndex, index, old) {
            this.type4arr[fatherIndex].children[index].choosed = old == 1 ? 0 : 1;
            var hasCheckFather = false;
            if (old != 1) {
                hasCheckFather = true;
            } else {
                this.type4arr[fatherIndex].children.map(function (item, n) {
                    if (item.choosed == 1) {
                        hasCheckFather = true;
                        return false;
                    }
                });
            }
            this.type4arr[fatherIndex].choosed = hasCheckFather ? 1 : 0;
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
        }
    },
    mounted: function mounted() {
        var orderId = sessionStorage.getItem("ORDER_ID");
        this.orderId = orderId;
        var QUES_ILLS = JSON.parse(sessionStorage.getItem("QUES_ILLS"));
        this.QUES_ILLS = QUES_ILLS;
        var type4arr = this.findType4(QUES_ILLS);
        this.type4arr = type4arr;
    }
};

/***/ })

});
//# sourceMappingURL=23.js.map