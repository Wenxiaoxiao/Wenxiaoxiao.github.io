webpackJsonp([35],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("y9m4");
__webpack_require__("WgSQ");
__webpack_require__("j1ja");
module.exports = __webpack_require__("NHnr");


/***/ }),

/***/ "3utI":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "CQSw":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var filter = {
  // 字符串截取
  subString: function subString(value, length) {
    if (!value) {
      return "";
    }
    value = value.trim();
    if (value.length > length) {
      var first = value.toString().substring(0, length);
      value = first + "...";
    }
    return value;
  },

  // 数字处理
  numberFormat: function numberFormat(value) {
    value = parseInt(value);
    if (isNaN(value)) {
      return 0;
    }

    if (value >= 10000) {
      value = value + "";
      var len = value.length;
      value = value.slice(0, len - 3);
      return parseFloat(value / 10) + "万";
    } else {
      return value;
    }
  },

  // 内容\n换成回车
  fmtContent: function fmtContent(value) {
    value = value.split("\n").join("<br/>");
    return value;
  },

  //根据产品类型判断是否显示保障金额
  guaranteeLimit: function guaranteeLimit(content) {
    if (!content || !content.insuranceProductName) return "";
    var val = "";
    if (content.insuranceProductName.indexOf("重疾") > -1 || content.insuranceProductName.indexOf("重大疾病") > -1) {
      val = content.guaranteeLimit + "元";
    } else {
      val = "详见保障权益";
    }
    return val;
  },

  // 日期字数控制
  timeNum: function timeNum(content, num) {
    if (!content) return;
    if (num < content.length) return content;
    return content.slice(0, num);
  }
};

exports.filter = filter;

/***/ }),

/***/ "CsAh":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Du/2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SET_MESSAGE = exports.SET_MESSAGE = "SET_MESSAGE";

/***/ }),

/***/ "EYFh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('router-view',{directives:[{name:"wechat-title",rawName:"v-wechat-title",value:(_vm.$route.meta.title),expression:"$route.meta.title"}]})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "IcnI":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__("NYxO");

var _vuex2 = _interopRequireDefault(_vuex);

var _state = __webpack_require__("lwq5");

var _state2 = _interopRequireDefault(_state);

var _mutations = __webpack_require__("ukYY");

var _mutations2 = _interopRequireDefault(_mutations);

var _getters = __webpack_require__("UjVw");

var _getters2 = _interopRequireDefault(_getters);

var _mutationTypes = __webpack_require__("Du/2");

var types = _interopRequireWildcard(_mutationTypes);

var _myPlugins = __webpack_require__("oX1p");

var _myPlugins2 = _interopRequireDefault(_myPlugins);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);
exports.default = new _vuex2.default.Store({
    state: _state2.default,
    getters: _getters2.default,
    plugins: [(0, _myPlugins2.default)()],
    mutations: _mutations2.default
});

/***/ }),

/***/ "J8Iu":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "M93x":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__("xJD8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6578b797_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__("EYFh");
function injectStyle (ssrContext) {
  __webpack_require__("rECb")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6578b797_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "NHnr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _keys = __webpack_require__("fZjL");

var _keys2 = _interopRequireDefault(_keys);

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

var _App = __webpack_require__("M93x");

var _App2 = _interopRequireDefault(_App);

var _router = __webpack_require__("YaEn");

var _router2 = _interopRequireDefault(_router);

var _flexible = __webpack_require__("zzYx");

var _flexible2 = _interopRequireDefault(_flexible);

var _httpList = __webpack_require__("hZ8p");

var _httpList2 = _interopRequireDefault(_httpList);

var _motheds = __webpack_require__("PWXd");

var _motheds2 = _interopRequireDefault(_motheds);

var _popup = __webpack_require__("kHS1");

var _popup2 = _interopRequireDefault(_popup);

var _common = __webpack_require__("t5DY");

var _common2 = _interopRequireDefault(_common);

var _vueWechatTitle = __webpack_require__("YqKu");

var _vueWechatTitle2 = _interopRequireDefault(_vueWechatTitle);

var _filter = __webpack_require__("CQSw");

var filter = _interopRequireWildcard(_filter);

var _store = __webpack_require__("IcnI");

var _store2 = _interopRequireDefault(_store);

__webpack_require__("9Z4o");

var _mintUi = __webpack_require__("Au9i");

var _mintUi2 = _interopRequireDefault(_mintUi);

var _vconsole = __webpack_require__("Lw6n");

var _vconsole2 = _interopRequireDefault(_vconsole);

__webpack_require__("CsAh");

__webpack_require__("3utI");

__webpack_require__("NWtE");

__webpack_require__("d8/S");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 解决URLSearchParams ios10.3以下版本的兼容性
//公共过滤器
//工具
//工具
//rem转换
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
_vue2.default.config.productionTip = false;
//公共sass文件
//工具
//工具
//ajax请求

if (_common2.default.env == '0') {
  var vConsole = new _vconsole2.default();
  _vue2.default.use(vConsole);
}

_vue2.default.use(_flexible2.default);
// Vue.use(ajax)
_vue2.default.use(_httpList2.default);
_vue2.default.use(_motheds2.default);
_vue2.default.use(_popup2.default);
_vue2.default.use(filter);
_vue2.default.use(_vueWechatTitle2.default);
_vue2.default.use(_mintUi2.default);

var filters = filter.filter;
(0, _keys2.default)(filters).forEach(function (key) {
  _vue2.default.filter(key, filters[key]);
});

// Vue.directive('title', {
//   inserted: function (el, binding) {
//     document.title = binding.value;
//   },
//   update:function (el, binding) {
//     document.title = binding.value;
//   }
// });
// 将API方法绑定到全局
// Vue.prototype.$ajax = ajax
_vue2.default.prototype.$http = _httpList2.default;
_vue2.default.prototype.$tool = _motheds2.default;
_vue2.default.prototype.$popup = _popup2.default;
_vue2.default.prototype.$store = _store2.default;
_vue2.default.prototype.$common = _common2.default;
/* eslint-disable no-new */
new _vue2.default({
  el: '#app',
  router: _router2.default,
  components: { App: _App2.default },
  template: '<App/>'
});

/***/ }),

/***/ "NWtE":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "PWXd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = __webpack_require__("pFYg");

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = __webpack_require__("mvHQ");

var _stringify2 = _interopRequireDefault(_stringify);

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

var _common = __webpack_require__("t5DY");

var _common2 = _interopRequireDefault(_common);

var _httpList = __webpack_require__("hZ8p");

var _httpList2 = _interopRequireDefault(_httpList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Alloylever from 'alloylever';

var browser = {
    versions: function () {
        var u = navigator.userAgent;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Firefox') > -1, //火狐内核Gecko
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android
            iPhone: u.indexOf('iPhone') > -1, //iPhone
            iPad: u.indexOf('iPad') > -1, //iPad
            webApp: u.indexOf('Safari') > -1, //Safari
            user: u
        };
    }()
    // 工具
}; // import { log } from 'util';
function tools() {
    return {
        android: browser.versions.android, //安卓
        trident: browser.versions.trident, //IE内核
        presto: browser.versions.presto, //opera内核
        webKit: browser.versions.webKit, //苹果、谷歌内核
        gecko: browser.versions.gecko, //火狐内核Gecko
        mobile: browser.versions.mobile, //是否为移动终端
        ios: browser.versions.ios, //ios
        iPhone: browser.versions.iPhone, //iPhone
        iPad: browser.versions.iPad, //iPad
        webApp: browser.versions.webApp, //Safari
        user: browser.versions.user, //Safari
        //微信
        isWeiXin: function isWeiXin() {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        },
        //获取安卓版本号
        getAnbanben: function getAnbanben() {
            var user = this.user;
            var index = user.indexOf("Android");
            if (index > 0) {
                return parseFloat(user.slice(index + 8));
            } else {
                return null;
            }
        },
        // 获取html名称
        pageName: function pageName() {
            var a = location.href;
            var b = a.split("/");
            var c = b.slice(b.length - 1, b.length).toString(String).split(".");
            return c.slice(0, 1);
        },
        //判断是数组
        isArray: function isArray(o) {
            return Object.prototype.toString.call(o) == '[object Array]';
        },

        //判断null
        isNull: function isNull(exp) {
            if (!exp && typeof exp != "undefined" && exp != 0) {
                return true;
            } else if (exp == "null") {
                return true;
            }
            return false;
        },
        //删除地址栏参数
        delQueStr: function delQueStr(url, ref) {
            var str = "";
            if (url.indexOf('?') != -1) {
                str = url.substr(url.indexOf('?') + 1);
            } else {
                return url;
            }
            var arr = "";
            var returnurl = "";
            var setparam = "";
            if (str.indexOf('&') != -1) {
                arr = str.split('&');
                for (i in arr) {
                    if (arr[i].split('=')[0] != ref) {
                        returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
                    }
                }
                return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
            } else {
                arr = str.split('=');
                if (arr[0] == ref) {
                    return url.substr(0, url.indexOf('?'));
                } else {
                    return url;
                }
            }
        },
        //获取cookie
        getcookie: function getcookie(name) {
            var strcookie = document.cookie;
            var arrcookie = strcookie.split("; ");
            for (var i = 0; i < arrcookie.length; i++) {
                var arr = arrcookie[i].split("=");
                if (arr[0] == name) return decodeURIComponent(arr[1]);
            }
            return "";
        },
        //设置本地储存
        setLocal: function setLocal(name, value) {
            var curTime = new Date().getTime();
            localStorage.setItem(name, (0, _stringify2.default)({ data: value, time: curTime }));
        },
        //获取本地储存
        getLocal: function getLocal(name, exp) {
            var data = localStorage.getItem(name);
            var dataObj = JSON.parse(data);
            if (exp && new Date().getTime() - dataObj.time > exp) {
                console.log('信息已过期');
                return null;
            } else {
                //console.log("data="+dataObj.data);
                //console.log(JSON.parse(dataObj.data));
                var dataObjDatatoJson = dataObj.data;
                return dataObjDatatoJson;
            }
        },
        //session 设置session本地缓存
        setsion: function setsion(name, value) {
            sessionStorage.setItem(name, (0, _stringify2.default)(value || null));
        },
        //session 获取session本地缓存
        getsion: function getsion(name) {
            var data = sessionStorage.getItem(name) || undefined;
            if (!data) return data;
            return JSON.parse(data);
        },
        /*
        * 深复制
        * params
        * -destination  被赋值的新对象
        * -source  取值的对象
        * -miss  忽略的对象
        * */
        deepCopy: function deepCopy(destination, source, miss) {
            for (var p in source) {
                if ($.inArray(p, miss) > -1) {
                    return;
                }
                if (getType(source[p]) == "array" || getType(source[p]) == "object") {
                    destination[p] = getType(source[p]) == "array" ? [] : {};
                    arguments.callee(destination[p], source[p]);
                } else {
                    destination[p] = source[p];
                }
            }
            function getType(o) {
                var _t;
                return ((_t = typeof o === 'undefined' ? 'undefined' : (0, _typeof3.default)(o)) == "object" ? o == null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
            }
        },
        isDD: function isDD() {
            //判断是不是钉钉
            var ua = navigator.userAgent.toLowerCase();
            return ua.indexOf("dingtalk") >= 0;
        }

    };
}

//正则类
function regular() {
    return {
        //电话号码
        isPhone: function isPhone(phone) {
            var pattern = /^1[3,4,5,7,8]\d{9}$/;
            return pattern.test(phone);
        },
        //邮件
        isEmail: function isEmail(email) {
            var pattern = /^((([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})[; ,])*(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})))$/;
            return pattern.test(email);
        },
        //姓名
        isName: function isName(val) {
            var pattern = /^[\u4e00-\u9fa5]{2,10}$|^[\w+\s]{1,20}$/;
            return pattern.test(val);
        },
        //邮编
        isZip: function isZip(val) {
            var pattern = /^[0-9]\d{5}$/;
            return pattern.test(val);
        },
        //身份证
        issfz: function issfz(val) {
            var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            return pattern.test(val);
        },
        //数字
        isNum: function isNum(val) {
            var pattern = /([1-9]\d*\.?\d*)|(0\.\d*[1-9])/;
            return pattern.test(val);
        },
        //匹配中英文
        isChAndEn: function isChAndEn(val) {
            var pattern = /[a-zA-Z\u4e00-\u9fa5]+/g;
            return !pattern.test(val);
        },
        //获取身份证对应的性别和年龄
        getDateSex: function getDateSex(num) {
            var UUserCard = num;
            var returns = {
                age: '',
                sex: ''
                //获取出生日期
            };UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
            //获取性别
            if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
                //alert("男");
                returns.sex = 1;
            } else {
                //alert("女");
                returns.sex = 2;
            }
            //获取年龄
            var myDate = new Date();
            var month = myDate.getMonth() + 1;
            var day = myDate.getDate();
            var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
            if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
                age++;
            }
            //alert(age);
            returns.age = age;
            return returns;
        }
    };
}

function errorLogFn() {
    // 错误打印处理
    //发给投诉的用户打开带有vconsole=show的url
    var consoleDiv = document.createElement("div");
    consoleDiv.id = "console_log";
    consoleDiv.innerText = "console";
    document.getElementsByTagName("body")[0].appendChild(consoleDiv);
    Alloylever.config({
        cdn: 'http://s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js', //vconsole的CDN地址
        reportUrl: "http://policy-produce.cn-hangzhou.log.aliyuncs.com/logstores/app/track", //错误上报地址
        reportPrefix: 'qun', //错误上报msg前缀，一般用于标识业务类型
        reportKey: 'key1', //错误上报msg前缀的key，用户上报系统接收存储msg
        otherReport: { //需要上报的其他信息
            isAndriod: tools().android
        },
        entry: "#console_log" //请点击这个DOM元素6次召唤vConsole。//你可以通过AlloyLever.entry('#entry2')设置多个机关入口召唤神龙
    });
};
// errorLogFn();


exports.default = {
    tools: tools, regular: regular

    // 使用
    // this.$tool.regular().isNum("123")

    // this.$route.query.name  获取地址栏参数

};

/***/ }),

/***/ "UjVw":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// 使用getters 页面可以使用this.diseseList 获取 state里的数据
var getters = {
    intell: function intell(state) {
        return state.intelligent;
    } //疾病列表
};

exports.default = getters;

/***/ }),

/***/ "Xqlh":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! layer mobile-v2.0 弹层组件移动版 License LGPL http://layer.layui.com/mobile By 贤心 */
;!function(a){"use strict";var b=document,c="querySelectorAll",d="getElementsByClassName",e=function(a){return b[c](a)},f={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:"scale"},g={extend:function(a){var b=JSON.parse(JSON.stringify(f));for(var c in a)b[c]=a[c];return b},timer:{},end:{}};g.touch=function(a,b){a.addEventListener("click",function(a){b.call(this,a)},!1)};var h=0,i=["layui-m-layer"],j=function(a){var b=this;b.config=g.extend(a),b.view()};j.prototype.view=function(){var a=this,c=a.config,f=b.createElement("div");a.id=f.id=i[0]+h,f.setAttribute("class",i[0]+" "+i[0]+(c.type||0)),f.setAttribute("index",h);var g=function(){var a="object"==typeof c.title;return c.title?'<h3 style="'+(a?c.title[1]:"")+'">'+(a?c.title[0]:c.title)+"</h3>":""}(),j=function(){"string"==typeof c.btn&&(c.btn=[c.btn]);var a,b=(c.btn||[]).length;return 0!==b&&c.btn?(a='<span yes type="1">'+c.btn[0]+"</span>",2===b&&(a='<span no type="0">'+c.btn[1]+"</span>"+a),'<div class="layui-m-layerbtn">'+a+"</div>"):""}();if(c.fixed||(c.top=c.hasOwnProperty("top")?c.top:100,c.style=c.style||"",c.style+=" top:"+(b.body.scrollTop+c.top)+"px"),2===c.type&&(c.content='<i></i><i class="layui-m-layerload"></i><i></i><p>'+(c.content||"")+"</p>"),c.skin&&(c.anim="up"),"msg"===c.skin&&(c.shade=!1),f.innerHTML=(c.shade?"<div "+("string"==typeof c.shade?'style="'+c.shade+'"':"")+' class="layui-m-layershade"></div>':"")+'<div class="layui-m-layermain" '+(c.fixed?"":'style="position:static;"')+'><div class="layui-m-layersection"><div class="layui-m-layerchild '+(c.skin?"layui-m-layer-"+c.skin+" ":"")+(c.className?c.className:"")+" "+(c.anim?"layui-m-anim-"+c.anim:"")+'" '+(c.style?'style="'+c.style+'"':"")+">"+g+'<div class="layui-m-layercont">'+c.content+"</div>"+j+"</div></div></div>",!c.type||2===c.type){var k=b[d](i[0]+c.type),l=k.length;l>=1&&layer.close(k[0].getAttribute("index"))}document.body.appendChild(f);var m=a.elem=e("#"+a.id)[0];c.success&&c.success(m),a.index=h++,a.action(c,m)},j.prototype.action=function(a,b){var c=this;a.time&&(g.timer[c.index]=setTimeout(function(){layer.close(c.index)},1e3*a.time));var e=function(){var b=this.getAttribute("type");0==b?(a.no&&a.no(),layer.close(c.index)):a.yes?a.yes(c.index):layer.close(c.index)};if(a.btn)for(var f=b[d]("layui-m-layerbtn")[0].children,h=f.length,i=0;h>i;i++)g.touch(f[i],e);if(a.shade&&a.shadeClose){var j=b[d]("layui-m-layershade")[0];g.touch(j,function(){layer.close(c.index,a.end)})}a.end&&(g.end[c.index]=a.end)},a.layer={v:"2.0",index:h,open:function(a){var b=new j(a||{});return b.index},close:function(a){var c=e("#"+i[0]+a)[0];c&&(c.innerHTML="",b.body.removeChild(c),clearTimeout(g.timer[a]),delete g.timer[a],"function"==typeof g.end[a]&&g.end[a](),delete g.end[a])},closeAll:function(){for(var a=b[d](i[0]),c=0,e=a.length;e>c;c++)layer.close(0|a[0].getAttribute("index"))}}, true?!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return layer}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):function(){var a=document.scripts,c=a[a.length-1],d=c.src,e=d.substring(0,d.lastIndexOf("/")+1);c.getAttribute("merge")||document.head.appendChild(function(){var a=b.createElement("link");return a.href=e+"need/layer.css?2.0",a.type="text/css",a.rel="styleSheet",a.id="layermcss",a}())}()}(window);

/***/ }),

/***/ "YaEn":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__("/ocq");

var _vueRouter2 = _interopRequireDefault(_vueRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Index = function Index() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(14)]).then(__webpack_require__.bind(null, "2NXm"));
}; //首页
var Result = function Result() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(11)]).then(__webpack_require__.bind(null, "g0mm"));
}; //结果页
var Issue = function Issue() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(13)]).then(__webpack_require__.bind(null, "1abe"));
}; //问题页
var IssueList = function IssueList() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(12)]).then(__webpack_require__.bind(null, "Es/o"));
}; //问题列表

// 百年
var BN = function BN() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(33)]).then(__webpack_require__.bind(null, "2lwF"));
}; //首页
var Result1 = function Result1() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(31)]).then(__webpack_require__.bind(null, "BfvO"));
}; //结果页
var Issue1 = function Issue1() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(5)]).then(__webpack_require__.bind(null, "qCrU"));
}; //问题页
var IssueList1 = function IssueList1() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(32)]).then(__webpack_require__.bind(null, "muwr"));
}; //问题列表

// //中信宝
var Index2 = function Index2() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(7)]).then(__webpack_require__.bind(null, "eXNc"));
}; //首页
var Issue2 = function Issue2() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(10)]).then(__webpack_require__.bind(null, "Cs99"));
}; //问题
var Result2 = function Result2() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(9)]).then(__webpack_require__.bind(null, "R1+S"));
}; //结论

//多啦A宝
var Index3 = function Index3() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(30)]).then(__webpack_require__.bind(null, "wnwG"));
}; //首页
var Result3 = function Result3() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(27)]).then(__webpack_require__.bind(null, "9s1u"));
}; //结果页
var Issue3 = function Issue3() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(29)]).then(__webpack_require__.bind(null, "j+RF"));
}; //问题页
var IssueList3 = function IssueList3() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(28)]).then(__webpack_require__.bind(null, "ztFl"));
}; //问题列表

var Index4 = function Index4() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(18)]).then(__webpack_require__.bind(null, "9NhK"));
}; //首页
var Result4 = function Result4() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(15)]).then(__webpack_require__.bind(null, "fPOg"));
}; //结果页
var Issue4 = function Issue4() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(17)]).then(__webpack_require__.bind(null, "t50/"));
}; //问题页
var IssueList4 = function IssueList4() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(16)]).then(__webpack_require__.bind(null, "vTgW"));
}; //问题列表

//复兴
var Index5 = function Index5() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(8)]).then(__webpack_require__.bind(null, "lSQy"));
}; //首页
var Index6 = function Index6() {
  return __webpack_require__.e/* import() */(23).then(__webpack_require__.bind(null, "FNJQ"));
}; //二级疾病页面
var Issue5 = function Issue5() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(6)]).then(__webpack_require__.bind(null, "KCXp"));
}; //问题页
var Result5 = function Result5() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(22)]).then(__webpack_require__.bind(null, "BMyh"));
}; //结果页
var Healthy5 = function Healthy5() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, "cQzn"));
}; //健康告知页
var Healthy6 = function Healthy6() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(24)]).then(__webpack_require__.bind(null, "wMNz"));
};
var Form5 = function Form5() {
  return __webpack_require__.e/* import() */(25).then(__webpack_require__.bind(null, "/T/w"));
}; //填单页面
var Question5 = function Question5() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, "jZYJ"));
}; //回答问题界面
var Finish5 = function Finish5() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(26)]).then(__webpack_require__.bind(null, "xDzH"));
}; //结束健康告知界面
var Questionnaire5 = function Questionnaire5() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, "thkH"));
}; //低保额问卷
var Upload1 = function Upload1() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(21)]).then(__webpack_require__.bind(null, "QPAt"));
}; //上传资料1
var Upload2 = function Upload2() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(20)]).then(__webpack_require__.bind(null, "Q4F4"));
}; //上传资料2
var Upload3 = function Upload3() {
  return Promise.all/* import() */([__webpack_require__.e(0), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, "dVKS"));
}; //上传资料3
var Waiting = function Waiting() {
  return __webpack_require__.e/* import() */(19).then(__webpack_require__.bind(null, "+lxR"));
}; //等待结果

_vue2.default.use(_vueRouter2.default);
exports.default = new _vueRouter2.default({
  routes: [
  //复兴交互式核保--低保额问卷
  {
    path: '/fuxing/questionnaire',
    component: Questionnaire5,
    name: 'Questionnaire5',
    meta: {
      title: '智能核保'
    }
  },
  //复兴交互式核保--上传资料1
  {
    path: '/fuxing/upload1',
    component: Upload1,
    name: 'Upload1',
    meta: {
      title: '智能核保'
    }
  },
  // //复兴交互式核保--上传资料2
  // {
  //   path:'/fuxing/upload2',
  //   component:Upload2,
  //   name:'Upload2',
  //   meta:{
  //     title:'智能核保'
  //   }
  // },
  //复兴交互式核保--上传资料3
  {
    path: '/fuxing/upload3',
    component: Upload3,
    name: 'Upload3',
    meta: {
      title: '智能核保'
    }
  },
  // //复兴交互式核保--健康告知
  // {
  //   path:'/fuxing/healthy',
  //   component:Healthy5,
  //   name:'Healthy5',
  //   meta:{
  //     title:'智能核保'
  //   }
  // },
  // {
  //   path:'/fuxing/healthy1',
  //   component:Healthy6,
  //   name:'Healthy6',
  //   meta:{
  //     title:'智能核保'
  //   }
  // },
  //复兴交互式核保--选择疾病
  {
    path: '/fuxing/index',
    component: Index5,
    name: 'Index5',
    meta: {
      title: '智能核保'
    }
  },
  //选择疾病 二级疾病
  {
    path: '/fuxing/index1',
    component: Index6,
    name: 'Index6',
    meta: {
      title: '智能核保'
    }
  },
  //复兴交互式核保--选择完疾病之后进入回答问题界面
  {
    path: '/fuxing/question',
    component: Question5,
    name: 'Question5',
    meta: {
      title: '智能核保'
    }
  },
  //复兴交互式核保--问题确认页
  {
    path: '/fuxing/issue',
    component: Issue5,
    name: 'Issue5',
    meta: {
      title: '智能核保'
    }
  },
  //复兴交互式核保--健康告知结束页
  // {
  //   path:'/fuxing/finish',
  //   component:Finish5,
  //   name:'Finish5',
  //   meta:{
  //     title:'智能核保'
  //   }
  // },
  //复兴交互式核保--审核成功进入投保填单页面
  // {
  //   path:'/fuxing/form',
  //   component:Form5,
  //   name:'Form5',
  //   meta:{
  //     title:'智能核保'
  //   }
  // },
  //复兴交互式核保--结论页
  {
    path: '/fuxing/result',
    component: Result5,
    name: 'Result5',
    meta: {
      title: '核保结论'
    }
  },
  //复兴交互式核保--等待结果页
  {
    path: '/fuxing/waiting',
    component: Waiting,
    name: 'Waiting',
    meta: {
      title: '核保结论'
    }
  },
  // // 首页
  {
    path: '/index/:pageLevel/:desLevel',
    component: Index,
    name: 'Index',
    meta: {
      title: '智能核保'
    }
  }, {
    path: '/result',
    component: Result,
    name: 'Result',
    meta: {
      title: '智能核保'
    }
  }, {
    path: '/issue/:pageLevel/:desLevel',
    component: Issue,
    name: 'Issue',
    meta: {
      title: '智能核保'
    }
  }, {
    path: '/issueList',
    component: IssueList,
    name: 'IssueList',
    meta: {
      title: '智能核保'
    }
  },
  // 百年智能核保
  {
    path: '/BNIndex/:pageLevel?/:desLevel?',
    component: BN,
    name: 'BN',
    meta: {
      title: '智能核保'
    }
  }, {
    path: '/BN/issue/:pageLevel/:desLevel/:code/:anCode?',
    component: Issue1,
    name: 'Issue1',
    meta: {
      title: '智能核保'
    }
  }, {
    path: '/BN/issueList/:desLevel',
    component: IssueList1,
    name: 'IssueList1',
    meta: {
      title: '智能核保'
    }
  }, {
    path: '/BN/result',
    component: Result1,
    name: 'Result1',
    meta: {
      title: '智能核保'
    }
  },
  //中信宝
  // 首页
  {
    path: '/index-2',
    component: Index2,
    name: 'Index2',
    meta: {
      title: '智能核保'
    }
  }, {
    path: '/issue-2',
    component: Issue2,
    name: 'Issue2',
    meta: {
      title: '智能核保'
    }
  }, {
    path: '/result-2',
    component: Result2,
    name: 'Result2',
    meta: {
      title: '核保结论'
    }
  },
  // 首页
  {
    path: '/index/:pageLevel/:desLevel',
    component: Index,
    name: 'Index',
    meta: {
      title: '智能核保'
    }
  }, {
    path: '/result',
    component: Result,
    name: 'Result',
    meta: {
      title: '智能核保'
    }
  }, {
    path: '/issue/:pageLevel/:desLevel',
    component: Issue,
    name: 'Issue',
    meta: {
      title: '智能核保'
    }
  }, {
    path: '/issueList',
    component: IssueList,
    name: 'IssueList',
    meta: {
      title: '智能核保'
    }
  },
  //多啦A宝
  {
    path: '/duola/index/:pageLevel/:desLevel',
    component: Index3,
    name: 'Index3',
    meta: {
      title: '智能核保'
    }
  }, {
    path: '/duola/result',
    component: Result3,
    name: 'Result3',
    meta: {
      title: '智能核保'
    }
  }, {
    path: '/duola/issue/:pageLevel/:desLevel/:code',
    component: Issue3,
    name: 'Issue3',
    meta: {
      title: '智能核保'
    }
  }, {
    path: '/duola/issueList/:desLevel',
    component: IssueList3,
    name: 'IssueList3',
    meta: {
      title: '智能核保'
    }
  },
  // 海宝
  {
    path: '/index4/:pageLevel/:desLevel',
    component: Index4,
    name: 'Index4',
    meta: {
      title: '智能核保'
    }
  }, {
    path: '/result4',
    component: Result4,
    name: 'Result4',
    meta: {
      title: '智能核保'
    }
  }, {
    path: '/issue4/:pageLevel/:desLevel',
    component: Issue4,
    name: 'Issue4',
    meta: {
      title: '智能核保'
    }
  }, {
    path: '/issueList4',
    component: IssueList4,
    name: 'IssueList4',
    meta: {
      title: '智能核保'
    }
  }]
});

/***/ }),

/***/ "d8/S":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "hZ8p":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ajax = __webpack_require__("yPgl");

var _ajax2 = _interopRequireDefault(_ajax);

var _qs = __webpack_require__("mw3O");

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//ajax请求
//获取URL查询字符串值
function getURLSearchParams(params) {
    if (!isArray(params)) return;
    var param = new URLSearchParams();
    for (var i = 0, len = params.length; i < len; i++) {
        param.append(params[i].name, params[i].val);
    }
    return param;
}
//判断是数组
function isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
}

/* =============================================
 * 				 ajax请求列表
 * 
 *		将需要用到的API进行整合， 通过axios来执行XMLhttprequest数据获取，
 *		最后通过 getAjax 方法导出统一的接口
 * =============================================  */

var apiList = {
    //百年智能核保获得问卷号
    indexList: {
        url: '/bus/core/api/healthyStart/', //+params.code
        params: {}
    },
    //百年智能核保疾病问题提交
    deseaseCommit: {
        url: '/bus/core/api/deseaseCommit/', //+params.code
        params: {}
    },
    //获取测算数据
    getInfo: {
        url: '/tools/caculate/api/getInfo',
        params: {}
    },
    //存取测算数据
    setInfo: {
        url: '/tools/caculate/api/save',
        params: {}
    },

    // 中信宝接口
    // 疾病列表
    flagIndex: {
        url: '/bus/core/question/flag/',
        params: {}
    },
    //问题
    answerList: {
        url: '/bus/core/answer/',
        params: {}
    },
    //===================================
    //复兴交互式核保
    //获取险种健告内容
    fxIllList: {
        url: '/bus/core/healthy/policyHealth/',
        params: {}, //?policyId=120012
        type: 'get'
    },
    //获取核保结果
    fxResults: {
        url: '/bus/core/healthy/policyCheck/',
        params: {},
        type: 'post'
    },
    //获取人工核保页面表单数据 /api/policyHealths/read/underwrite
    fxFormData: {
        url: "/bus/core/healthy/getUnderwrite/",
        params: {}, //?requestId=5da052374a3eba3010d27654&policyId=120012
        type: "get"
    },
    //保存人工核保表单数据
    fxFormSave: {
        url: "/bus/core/healthy/saveUnderwrite/",
        params: {},
        type: "post"
    },
    //获取补充问卷表单数据
    fxGetAddData: {
        url: "/bus/core/healthy/inSupplement/",
        params: {}, //?requestId=5da14be64a3eba2d2c285e7f
        type: "get"
    },
    //提交补充问卷信息
    fxPostAddData: {
        url: "/bus/core/healthy/saveSupplement/",
        params: {}, //?requestId=5da14be64a3eba2d2c285e7f
        type: "post"
    },
    //判断是B端还是C端
    fxJudgeBC: {
        url: "/policy/order/api/orderChannel",
        params: {},
        type: "get"
    },
    //===================================
    // 多啦A宝
    //问题
    duolaAList: {
        // 106005
        url: '/bus/core/hk/question/flag/', //+params.code
        params: {}
    },
    //问题
    duolaAQuestion: {
        // 106005
        url: '/bus/core/hk/answer/', //+params.code
        params: {}
    },
    duolaSetInfo: {
        // 106005
        url: '/tools/caculate/api/hk/save', //+params.code
        params: {}
    },
    //海宝
    qusetionList: {
        // 106005
        url: '/bus/core/intelligent/question/api/', //+params.code
        params: {}
    },
    questionAnswerList: {
        url: '/bus/core/intelligent/answer/api/',
        params: {}
    }

    //获取AJAX请求 数据
};function getHttp(param, success, failure) {
    var data = apiList[param.name];
    var params;
    var url = data.url;
    if (!data) {
        alert("未找到此对象");
        return;
    }
    if (param.header == 2 && param.params) {
        params = getURLSearchParams(param.params);
        console.log(params);
    } else if (param.header == 2) {
        params = getURLSearchParams(data.params);
        console.log(params);
    } else if (param.params) {
        params = param.params;
    } else {
        params = data.params;
    }
    if (param.code) {
        url = url + param.code;
    }
    if (param.orderId) {
        url = url + param.orderId;
    }
    console.log(data.type);
    if (!data.type || data.type == "post") {
        _ajax2.default.post(url, params, success, failure);
    } else if (data.type == "get") {
        _ajax2.default.get(url, params, success, failure);
    } else if (data.type == "put") {
        _ajax2.default.put(url, params, success, failure);
    }
}

exports.default = {
    getHttp: getHttp
};

/***/ }),

/***/ "kHS1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

var _layer = __webpack_require__("Xqlh");

var _layer2 = _interopRequireDefault(_layer);

__webpack_require__("J8Iu");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//弹出层样式
var popup = function () {
    return {
        msg: function msg(text) {
            //中间轻提示框
            _layer2.default.open({
                content: text,
                skin: 'msg',
                styles: 'bottom:0;',
                time: 2 //2秒后自动关闭
            });
        },
        alert: function alert(text, btn) {
            //ios风格确认按钮弹窗
            _layer2.default.open({
                content: text,
                skin: 'lzAlert',
                btn: btn || '我知道了'
            });
        },
        footer: function footer(text) {
            //底部提示框
            _layer2.default.open({
                content: text,
                skin: 'footer'
            });
        },
        loading: function loading(text) {
            //加载中
            var loading = _layer2.default.open({
                type: 2,
                content: text,
                shadeClose: false
            });
            return loading;
        },
        /**
         * 询问框弹窗
         * text-文字
         * btns-按钮文本
         * yes-成功回调
         * no-失败回调
         */
        inquiry: function inquiry(text, btns, _yes, _no) {
            var inquiry = _layer2.default.open({
                content: text,
                btn: btns,
                skin: "inquiry",
                shadeClose: false,
                yes: function yes(index) {
                    _layer2.default.close(inquiry);
                    _yes(index);
                },
                no: function no() {
                    if (_no) {
                        _no();
                    }
                }
            });
        },
        closeLay: function closeLay(index) {
            _layer2.default.close(index);
        }
    };
}(); //弹出层
exports.default = popup;

/***/ }),

/***/ "lwq5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var state = {
    intelligent: {
        indexList: [], //首页全部数据
        diseseList: [], //疾病列表索引
        issList: [], //问题列表
        int_quey: {}, //测算页带过来的参数
        paperId: '',
        results: {} //结果
    }
};
exports.default = state;

/***/ }),

/***/ "oX1p":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = __webpack_require__("fZjL");

var _keys2 = _interopRequireDefault(_keys);

var _motheds = __webpack_require__("PWXd");

var _motheds2 = _interopRequireDefault(_motheds);

var _mutationTypes = __webpack_require__("Du/2");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 函数方法名称
//处理本地缓存插件 
var myPlugins = function myPlugins(socket) {
    return function (store) {
        (0, _keys2.default)(store.state).map(function (key) {
            if (_motheds2.default.tools().getsion(key)) {
                store.commit(_mutationTypes.SET_MESSAGE, { key: key, data: _motheds2.default.tools().getsion(key) });
            }
        });
        store.subscribe(function (mutation, state) {
            (0, _keys2.default)(store.state).map(function (key) {
                _motheds2.default.tools().setsion(key, state[key]);
            });
        });
    };
};
exports.default = myPlugins;

/***/ }),

/***/ "rECb":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "t5DY":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var common = {
    // root:['https://bx.wts9999.net','https://bx.wts999.com','http://192.168.32.246:8090'], //
    // root:['','',''], //
    // env:'1', //环境 0测试 1正式 2本地
    root: ['https://bx.wts9999.net', 'https://bx.wts999.com', 'http://192.168.32.246:8090', 'http://192.168.33.16:8080', 'https://bx-web-v2.wts9999.net'], //
    env: '4' //环境 0测试 1正式 2本地

    // 获取 页面公共变量
};common.api_root = common.root[common.env];
exports.default = common;

/***/ }),

/***/ "ukYY":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__("bOdI");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mutationTypes = __webpack_require__("Du/2");

var types = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mutaions = (0, _defineProperty3.default)({}, types.SET_MESSAGE, function (state, payload) {
    if (payload.lev) {
        state[payload.key][payload.lev] = payload.data;
    } else {
        state[payload.key] = payload.data;
    }
});
exports.default = mutaions;

/***/ }),

/***/ "xJD8":
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

exports.default = {
  name: 'App',
  // mounted() {
  //   var myCookie="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3dCIsImlhdCI6MTUxNzEyMzQ2MiwidWlkIjo5Mzc2MjYwMDMyMDU4NDA4OTYsImlzcyI6IndzIiwidXNlciI6eyJpZCI6OTM3NjI2MDAzMjA1ODQwODk2LCJlbmFibGUiOnRydWUsInJlbWFyayI6bnVsbCwiY3JlYXRlQnkiOm51bGwsImNyZWF0ZVRpbWUiOjE1MTIzODI0MzQwMDAsInVwZGF0ZUJ5IjpudWxsLCJ1cGRhdGVUaW1lIjoxNTE2ODc1MzUyMDAwLCJrZXl3b3JkIjpudWxsLCJuaWNrbmFtZSI6IuWFtOadpeWViiIsImhlYWRpbWd1cmwiOiJodHRwOi8vd3gucWxvZ28uY24vbW1vcGVuL3ZpXzMyL1EwajRUd0dUZlRMN1hLUHBjdHE4OURGYXpFcGZETEt5eXpIc3V6Sk5nY1k5ODVScUNjVHJTQXdMR0V6aEN6amJiM1k3MTNsc1ZNVDBjN1Z0dFJVd1RBLzAiLCJzZXgiOiIxIiwiYmlydGhkYXkiOjE1MTU1MTM2MDAwMDAsInByb3ZpbmNlIjoi5rKz5YyX55yBIiwiY2l0eSI6IuWUkOWxseW4giIsImVtYWlsIjpudWxsLCJtb2JpbGUxIjoiWDRNWjgxTXIyeHdySHNrRmpyRDhOYT09IiwibW9iaWxlMiI6IjJ2Z2VWc1hJN21FTXlTQmVtYWNselZ4bFVOSmF6Q0h1NFpCaXBWeGs1UjFLTFBuRUNibFp2MzFwaE9obm8zVTJkUERiOXZVVkdoUlYwMHZJTXZiTHVNPT0iLCJtb2JpbGUiOiIxODUqKioqNjAxMSIsImxvY2tlZCI6ZmFsc2UsInJlY2VpdmVyTmFtZSI6IumDneWFtOadpSIsInJlY2VpdmVyUGhvbmUiOiIydmdlVnNYSTdtRU15U0JlbWFjbHpWeGxVTkphekNIdTRaQmlwVnhrNVIxS0xQbkVDYmxadjMxcGhPaG5vM1UyZFBEYjl2VVZHaFJWMDB2SU12Ykx1TT09IiwicmVjZWl2ZXJQaG9uZTEiOm51bGwsInJlY2VpdmVyUGhvbmUyIjpudWxsLCJyZWNlaXZlckFkZHJlc3MiOiLllaXlnLDmlrnnrKzkuInnrKzkuInmlrkiLCJpZGVudGlmeU51bWJlciI6IjQyMTM4MTE5OTEwODA4MDA3OSIsImlkZW50aWZ5TnVtYmVyMSI6IjQyMTM4MTE5OTEwODA4KioqKiIsImppZmVuIjo1MDAwMDAsImppbmRvdSI6MzE0MiwibGV2ZWwiOjMsImRldmljZUlkIjpudWxsLCJkZXZpY2VUeXBlIjowLCJkZXZpY2VUYWciOm51bGwsImppZmVuU3RhcnQiOm51bGwsImppZmVuRW5kIjpudWxsLCJqaW5kb3VTdGFydCI6bnVsbCwiamluZG91RW5kIjpudWxsfX0.jOPOpcPCgW_wdDkoj2hUixOFUjF1SN2eIXsp3wH9ajBmdU9ITMPciVXxjReXmRly2TkKe1_AwCm2V9hw1or_Tw"
  //   this.$cookie.set('WTS_TOKEN', myCookie, {expires: 1, path: "/", domain: 'wts9999.net',secure: true});
  // },
  watch: {
    '$route': function $route(to, from) {
      var toDepth = to.path.split('/').length;
      var fromDepth = from.path.split('/').length;
    }
  }

};

/***/ }),

/***/ "yPgl":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__("OMJi");

var _common = __webpack_require__("t5DY");

var _common2 = _interopRequireDefault(_common);

var _popup = __webpack_require__("kHS1");

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__("j1ja");
// import layer from 'vue2-layer-mobile' //弹出层

// 配置API接口地址
var root = '';
var root = _common2.default.api_root;
console.log(root);

__webpack_require__("hKoQ").polyfill();
// 引用axios
var axios = __webpack_require__("mtWM");
// 自定义判断元素类型JS
function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
// 参数过滤函数
function filterNull(o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key];
        }
        if (toType(o[key]) === 'string') {
            console.log(o[key]);
            o[key] = o[key].trim();
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key]);
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key]);
        }
    }
    return o;
}
/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

function apiAxios(method, url, params, success, failure) {
    if (params) {
        // params = filterNull(params)
    }
    axios({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
        baseURL: root,
        withCredentials: true
    }).then(function (res) {
        if (success && params.flag) {
            var isError = successError1(res.data);
            success(res.data, isError);
        } else if (success) {
            var isError = successError(res.data);
            success(res.data, isError);
        }
    }).catch(function (err) {
        var res = err.response;
        if (res) {
            errordata(res.status);
        }
    });
}

//请求错误处理
function errordata(data) {
    if (data.status == 502) {
        _popup2.default.msg('服务器出错，请稍后再试-502');
        return false;
    } else if (data.status == 0) {
        _popup2.default.msg('未联网，请先检查网络');
        return false;
    }
    return 1;
}

//公共错误处理 
function successError1(data) {
    //新框架暂定 httpCode=1 为成功标志
    //服务器出错
    if (data.httpCode != 1 && data.data) {
        _popup2.default.alert(data.data.errorMsg);
        return false;
    } else if (data.httpCode != 1) {
        _popup2.default.alert(data.msg);
        return false;
    }
    return true;
}

//公共错误处理
function successError(data) {
    //服务器出错
    if (data.httpCode != 200 && data.data) {
        _popup2.default.alert(data.data.errorMsg);
        return false;
    } else if (data.httpCode != 200) {
        _popup2.default.alert(data.msg);
        return false;
    }
    return true;
}

// 返回在vue模板中的调用接口
exports.default = {
    get: function get(url, params, success, failure) {
        return apiAxios('GET', url, params, success, failure);
    },
    post: function post(url, params, success, failure) {
        return apiAxios('POST', url, params, success, failure);
    },
    put: function put(url, params, success, failure) {
        return apiAxios('PUT', url, params, success, failure);
    },
    delete: function _delete(url, params, success, failure) {
        return apiAxios('DELETE', url, params, success, failure);
    }
};

/***/ }),

/***/ "zzYx":
/***/ (function(module, exports) {

(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});

    //计算样式视差
    //var $dom = document.createElement('div');
    //$dom.style = 'font-size:12px;position:absolate;left:9999px;';
    //console.log(document.body);
    //document.body.appendChild($dom);
    //// 计算出放大后的字体
    //var scaledFontSize = parseInt(window.getComputedStyle($dom, null).getPropertyValue('font-size'));
    //document.body.removeChild($dom);
    //// 计算原字体和放大后字体的比例
    //var scaleFactor = 12 / scaledFontSize;

    if (metaEl) {
        //console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }

    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    function refreshRem(){
        var width = docEl.getBoundingClientRect().width;
        //var width = window.screen.availWidth;
        if (width / dpr > 540) {
            width = 540 * dpr;
        }
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }
    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);

    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }


    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }
})(window, window['lib'] || (window['lib'] = {}));

/***/ })

},[0]);
//# sourceMappingURL=app.js.map