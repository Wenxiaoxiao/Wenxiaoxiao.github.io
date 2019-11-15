webpackJsonp([4],{

/***/ "2SWa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fx-healthy"},[_c('div',{staticClass:"fx-content"},[_c('div',{staticClass:"fx-space"}),_vm._v(" "),(_vm.healthyType === '0' &&!_vm.showInsureHealthContent)?_c('div',{staticClass:"fx-tab bg-style1"},[_c('div',{staticClass:"text text1"},[_vm._v("投保人健康告知")]),_vm._v(" "),_c('div',{staticClass:"text"},[_vm._v("被保险人健康告知")])]):_vm._e(),_vm._v(" "),(_vm.healthyType === '0' && _vm.showInsureHealthContent)?_c('div',{staticClass:"fx-tab bg-style2"},[_c('div',{staticClass:"text text1"},[_vm._v("投保人健康告知")]),_vm._v(" "),_c('div',{staticClass:"text"},[_vm._v("被保险人健康告知")])]):_vm._e(),_vm._v(" "),(_vm.healthyType === '1')?_c('div',{staticClass:"fx-tab bg-style3"},[_vm._v("\r\n            被保险人健康告知\r\n        ")]):_vm._e(),_vm._v(" "),(!_vm.showInsureHealthContent)?_c('div',{staticClass:"wrapper",style:({overflow:'auto',height:_vm.contentHeight+'px'}),domProps:{"innerHTML":_vm._s(_vm.holderHealthContent)}}):_vm._e(),_vm._v(" "),(_vm.showInsureHealthContent)?_c('div',{staticClass:"wrapper",style:({overflow:'auto',height:_vm.contentHeight+'px'}),domProps:{"innerHTML":_vm._s(_vm.insureHealthContent)}}):_vm._e(),_vm._v(" "),(_vm.healthyType === '1')?_c('div',{staticClass:"wrapper",style:({overflow:'auto',height:_vm.contentHeight+'px'}),domProps:{"innerHTML":_vm._s(_vm.insureHealthContent)}}):_vm._e()]),_vm._v(" "),(!_vm.showInsureHealthContent)?_c('div',{staticClass:"fx-btns"},[_c('div',{staticClass:"preBtn",on:{"click":function($event){return _vm.showModal(1)}}},[_c('span',{staticClass:"sp1"},[_vm._v("部分情况有")]),_c('span',{staticClass:"sp2"},[_vm._v("(支持智能审核)")])]),_vm._v(" "),_c('div',{staticClass:"nextBtn",on:{"click":function($event){return _vm.goNext()}}},[_vm._v("以上情况全无")])]):_vm._e(),_vm._v(" "),(_vm.showInsureHealthContent)?_c('div',{staticClass:"fx-btns"},[_c('div',{staticClass:"preBtn",on:{"click":function($event){return _vm.showModal(2)}}},[_c('span',{staticClass:"sp1"},[_vm._v("部分情况有")]),_c('span',{staticClass:"sp2"},[_vm._v("(支持智能审核)")])]),_vm._v(" "),_c('div',{staticClass:"nextBtn",on:{"click":function($event){return _vm.goNext()}}},[_vm._v("以上情况全无")])]):_vm._e(),_vm._v(" "),_c('pop-modal',{attrs:{"modalHeight":236,"modalTitle":_vm.modalTitle,"modalContent":_vm.modalContent},on:{"cancel-event":function($event){return _vm.hideModal()},"sure-event":function($event){return _vm.goIntellCheck()}}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "4O3X":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "LSfl":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Ol9X":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_modal_vue__ = __webpack_require__("uYo6");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_modal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_modal_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_modal_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_modal_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_53606dea_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_modal_vue__ = __webpack_require__("hfeC");
function injectStyle (ssrContext) {
  __webpack_require__("4O3X")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_modal_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_53606dea_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_modal_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "cQzn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_healthy_vue__ = __webpack_require__("mZcs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_healthy_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_healthy_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_healthy_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_healthy_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_69ecece2_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_healthy_vue__ = __webpack_require__("2SWa");
function injectStyle (ssrContext) {
  __webpack_require__("LSfl")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_healthy_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_69ecece2_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_healthy_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "hfeC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"fx-modal",style:({height:_vm.clientHeight1+'px'})},[_c('div',{staticClass:"modal",style:({height:_vm.modalHeight+'px'})},[_c('div',{staticClass:"header"},[_vm._v(_vm._s(_vm.modalTitle))]),_vm._v(" "),_c('div',{staticClass:"content"},[_vm._v(_vm._s(_vm.modalContent))]),_vm._v(" "),_c('div',{staticClass:"footer"},[_c('div',{staticClass:"cancel",on:{"click":function($event){return _vm.Cancel()}}},[_vm._v("取消")]),_vm._v(" "),_c('div',{staticClass:"sure",on:{"click":function($event){return _vm.Sure()}}},[_vm._v("确认")])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "mZcs":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

var _header = __webpack_require__("Cz8s");

var _header2 = _interopRequireDefault(_header);

var _modal = __webpack_require__("Ol9X");

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'healthy',
    data: function data() {
        return {
            type: null,
            orderId: null,
            healthyType: null, //0有投保人健康告知 1无投保人健康告知
            showInsureHealthContent: false,
            contentHeight: 0,
            headerTitle: '健康告知',
            holderHealthContent: "", //投保人健康告知
            insureHealthContent: "", //被保险人健康告知
            modalTitle: "您即将进入智能核保",
            modalContent: "如被保险人健康告知上有相关问题， 可通过智能核保了解被保险人健康状 况，快速得到核保结果。"
        };
    },
    created: function created() {},

    methods: {
        //showModal
        showModal: function showModal(type) {
            //console.log(type);
            this.type = type;
            //healthyType:null,//0有投保人健康告知 1无投保人健康告知
            var healthyType = this.healthyType;
            if (healthyType === '1' || type === 1) {
                this.modalTitle = "温馨提示";
                this.modalContent = "投保人健康告知不符合保险公司要求， 将无法投保该产品！";
            } else {
                this.modalTitle = "您即将进入智能核保";
                this.modalContent = "如被保险人健康告知上有相关问题， 可通过智能核保了解被保险人健康状 况，快速得到核保结果。";
            }
            document.getElementsByClassName("fx-modal")[0].style.display = "block";
        },

        //hideModal
        hideModal: function hideModal() {
            document.getElementsByClassName("fx-modal")[0].style.display = "none";
        },

        //进入智能审核
        goIntellCheck: function goIntellCheck() {
            var healthyType = this.healthyType;
            //console.log(this.type);
            if (healthyType === '1' || this.type === 1) {
                this.hideModal();
            } else {
                //this.type
                sessionStorage.setItem("TYPE", this.type);
                this.$router.push({ path: '/fuxing/index' });
            }
        },

        //进入下一步
        goNext: function goNext() {
            //做一个判断，如果没有投保人健康告知
            //healthyType:null,//0有投保人健康告知 1无投保人健康告知
            var healthyType = this.healthyType,
                showInsureHealthContent = this.showInsureHealthContent;
            if (healthyType === '0' && !showInsureHealthContent) {
                this.showInsureHealthContent = true;
            } else if (healthyType === '0' && showInsureHealthContent) {
                this.goNext1();
            } else if (healthyType === '1') {
                this.goNext1();
            }
        },
        goNext1: function goNext1() {
            //跳到订单页面
            console.log("跳到订单页面");
            var JUMP_KEY = sessionStorage.getItem("JUMP_KEY");
            var ORDER_ID = sessionStorage.getItem("ORDER_ID");
            window.location.href = this.$common.api_root + "/jump.html?url=" + encodeURIComponent("./market/writeInform-3.html?key=" + JUMP_KEY + "&proCode=" + ORDER_ID + "");
        },

        //点击header
        onHeaderBtn: function onHeaderBtn(headerText) {
            console.log(headerText);
        },

        //请求健康告知
        getHealthContent: function getHealthContent() {
            var THAT = this;
            THAT.$http.getHttp({
                name: 'fxIllList',
                params: {},
                orderId: THAT.orderId,
                type: 'get'
            }, function (res) {
                THAT.holderHealthContent = res.data.holderHealthContent;
                THAT.insureHealthContent = res.data.insureHealthContent;
            });
        }
    },
    computed: {},
    components: {
        "header-text": _header2.default,
        "pop-modal": _modal2.default
    },
    mounted: function mounted() {
        var contentHeight = window.innerHeight - document.getElementsByClassName("fx-btns")[0].clientHeight;
        this.contentHeight = contentHeight;
        console.log(window.innerHeight);
        //根据type判断
        console.log(this.$route.query.healthyType);
        var healthyType = this.$route.query.healthyType,
            orderId = this.$route.query.policyId,
            jumpKey = this.$route.query.key;
        this.healthyType = healthyType;
        this.orderId = orderId;
        sessionStorage.setItem("HEALTHY_TYPE", healthyType);
        sessionStorage.setItem("ORDER_ID", orderId);
        sessionStorage.setItem("JUMP_KEY", jumpKey);
        this.getHealthContent();
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

/***/ }),

/***/ "uYo6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: {
        modalTitle: String,
        modalContent: String,
        modalHeight: Number
    },
    data: function data() {
        return {
            clientHeight1: 0
        };
    },
    created: function created() {},

    methods: {
        Cancel: function Cancel() {
            this.$emit('cancel-event');
        },
        Sure: function Sure() {
            this.$emit('sure-event');
        }
    },
    computed: {},
    mounted: function mounted() {
        this.clientHeight1 = window.innerHeight;
    },

    watch: {
        headerText: function headerText(newVal) {
            console.log(newVal);
        }
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

/***/ })

});
//# sourceMappingURL=4.js.map