/**
 * Created by Administrator on 2017/8/2.
 */

!(function ($) {
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
            user: u,
        };
    }()
}
var environment='/* @echo NODE_ENV */';//0-测试，1-正式，2-灰度

var baseUrl=['https://bx.wts9999.net','https://bx.wts999.com','https://bx-web.wts999.com'];;//基础路径
// var baseUrl=['','','https://bx-web.wts999.com','http://192.168.33.30:8080','http://admin.wts9999.com'];//基础路径

 //全局数据
 var globedata = {
    commonShare: true, //是否是公共分享
    environment: environment, //0-测试，1-正式，2-灰度
    baseUrl:baseUrl[environment],//基础路径
}
$.extend({
    globedata:globedata,//全局参数
    tools: tools,//工具类
    regular: regular,//正则类
    ajaxPackage: ajaxPackage,//ajax托管
    getLocalUrl: function () {
        var url = location.href;
        var num = url.indexOf("?");
        if (num != -1) {
            url = url.substring(0, num);
        }
        return url;
    },//获取基础地址
    getQueryString: getQueryString,//获取地址栏参数
    domain: document.domain,
    shareWx:shareWx,
    //domain :"http://bx.wts999.com/",//正式环境
    indexHtml: function () {
        var url = $.getLocalUrl();
        if (url.indexOf("/market/") > -1 || url.indexOf("/community/") > -1 || url.indexOf("/personal/") > -1) {
            return "/";
        } else {
            return "/";
        }
    },
});
console.log($.domain);
//工具类
function tools() {
    return {
        android: browser.versions.android,//安卓 
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
        isWeiXin: function () {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        },

        isWtsNativeApp:function () {
            //微信
            var ua = window.navigator.userAgent.toLowerCase();
            return ua.match(/wtsApp/i) == 'wtsapp' ? true : false;
        },

        //判断是不是钉钉
        isDD: function () {
            var ua = navigator.userAgent.toLowerCase();
            var result=ua.indexOf("dingtalk") >= 0;
            return result;
        },

        //支付宝环境
        isAL: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/Alipay/i) == "alipay") {
                 return true;
            } else {
                return false;
            }
        },

        //获取appid
        getWxId: function () {
            var openId="";
            var doman=document.domain;
            if(doman.indexOf("wts9999.net")>-1){
                //测试环境
                openId="wx04452e22173121e5";
            }else{
                //正式环境
                openId="wx3bbb18bc95bc7cff";
            }
            return openId;
        },

        //获取安卓版本号
        getAnbanben: function () {
            var user = this.user;
            var index = user.indexOf("Android");
            if (index > 0) {
                return parseFloat(user.slice(index + 8));
            } else {
                return null;
            }
        },

        //判断是否需要绑定手机号
        hasPhonrNumber:function(user){
            if(!user||!user.id){
                return false;
            }else{
                return true;
            }
        },

        // 获取html名称
        pageName: function () {
            var a = location.href;
            var b = a.split("/");
            var c = b.slice(b.length - 1, b.length).toString(String).split(".");
            return c.slice(0, 1);
        },

        //判断null
        isNull: function (exp) {
            if (!exp && typeof exp != "undefined" && exp != 0) {
                return true;
            } else if (exp == "null") {
                return true;
            }
            return false;
        },
        /**
         * 时间格式化
         * dateFormat("yyyy-MM-dd hh:mm:ss",crtTime);
         * @param fmt 格式
         * @param date 时间对象
         */
        dateFormat: function (fmt,date) {
            var o = {
            "M+" : date.getMonth()+1,     //月份
            "d+" : date.getDate(),     //日
            "h+" : date.getHours(),     //小时
            "m+" : date.getMinutes(),     //分
            "s+" : date.getSeconds(),     //秒
            "q+" : Math.floor((date.getMonth()+3)/3), //季度
            "S" : date.getMilliseconds()    //毫秒
            };
            if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
            for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            return fmt;
        },
        //删除地址栏参数
        delQueStr: function (url, ref) {
            var str = "";
            if (url.indexOf('?') != -1) {
                str = url.substr(url.indexOf('?') + 1);
            }
            else {
                return url;
            }
            var arr = "";
            var returnurl = "";
            if (str.indexOf('&') != -1) {
                arr = str.split('&');
                for (var i in arr) {
                    if (arr[i].split('=')[0] != ref) {
                        returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
                    }
                }
                return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
            }
            else {
                arr = str.split('=');
                if (arr[0] == ref) {
                    return url.substr(0, url.indexOf('?'));
                }
                else {
                    return url;
                }
            }
        },

        //获取cookie
        getcookie: function (name) {
            var strcookie = document.cookie;
            var arrcookie = strcookie.split("; ");
            for (var i = 0; i < arrcookie.length; i++) {
                var arr = arrcookie[i].split("=");
                if (arr[0] == name)return decodeURIComponent(arr[1]);
            }
            return "";
        },

        //设置本地储存
        setLocal: function (name, value, type) {
            var curTime = new Date().getTime();
            if (!type || type == 2) { //默认设置-之前存在则使用创建时间
                var data = localStorage.getItem(name);
                if (!data || data == "null") {
                    localStorage.setItem(name, JSON.stringify({
                        data: value,
                        time: curTime
                    }));
                } else {
                    var dataObj = JSON.parse(data);
                    var setTime = dataObj.time;
                    localStorage.setItem(name, JSON.stringify({
                        data: value,
                        time: setTime
                    }));
                }
            } else if (type == 1) { //type:1重新创建
                localStorage.setItem(name, JSON.stringify({
                    data: value,
                    time: curTime
                }));
            }

        },

        //获取本地储存
        getLocal: function (name, exp) {
            var data = localStorage.getItem(name);
            var dataObj = JSON.parse(data);
            if (!exp) {
                exp = 1000 * 60 * 60 * 24 * 3;
            }
            if (dataObj && new Date().getTime() - dataObj.time > exp) {
                localStorage.removeItem(name);
                console.log('信息已过期');
                return null;
            } else {
                var dataObjDatatoJson = !dataObj ? null : dataObj.data;
                return dataObjDatatoJson;
            }
        },

        /*
        * 深复制
        * params
        * -destination  被赋值的新对象
        * -source  取值的对象
        * -miss  忽略的对象
        * */
        deepCopy: function (destination, source,miss) {
            for (var p in source) {
                if($.inArray(p, miss)>-1){
                    continue;
                }
                if (getType(source[p]) == "array" || getType(source[p]) == "object") {
                    destination[p] = getType(source[p]) == "array" ? [] : {};
                    arguments.callee(destination[p], source[p]);
                }
                else {
                    destination[p] = source[p];
                }
            }
            function getType(o) {
                var _t;
                return ((_t = typeof(o)) == "object" ? o == null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
            }
        },
        comeFrom: function () {
            var comeFrom=sessionStorage.getItem("comeFrom");
			if(comeFrom){
                return comeFrom;
            }else{
                return "null";
            }
        },

        /*
        * ios页面返回刷新
        * */
        reloadIos: function () {
            var isPageHide = false;
            window.addEventListener('pageshow', function () {
                if (isPageHide) {
                    window.location.reload();
                }
            });
            window.addEventListener('pagehide', function () {
                isPageHide = true;
            });
        },

        // 是否为js函数
        isFn: function (FunName) {
            return typeof FunName === "function"?true:false;
        },
        cutString: function (content, length) {
            var _ret = this.getCutValue(content, length)
            var _cutFlag = _ret.cutflag; 
            var _cutStringn = _ret.cutstring; 
            if (_cutFlag) { 
                return _cutStringn + "..."; 
            } else { 
                return _cutStringn; 
            } 
        },

        // 获取字符分类
        getCutValue: function(pStr, pLen) { 
            // 原字符串长度
            var self=this;
            var _strLen = pStr.length;
            var _cutString;
            // 默认情况下，返回的字符串是原字符串的一部分
            var _cutFlag = true;
            var _lenCount = 0;
            var _ret = false;
            if (_strLen <= pLen/2) {
                _cutString = pStr;
                _ret = true;
            }
            if (!_ret) {
                for (var i = 0; i < _strLen ; i++ ) {
                    if (self.isFull(pStr.charAt(i))) {
                        _lenCount += 2;
                    } else {
                        _lenCount += 1;
                    }
                    if (_lenCount > pLen) {
                        _cutString = pStr.substring(0, i);
                        _ret = true;
                        break;
                    } else if (_lenCount == pLen) {
                        _cutString = pStr.substring(0, i + 1);
                        _ret = true;
                        break;
                    }
                }
            }
            if (!_ret) {
                _cutString = pStr;
                _ret = true;
            }
            if (_cutString.length == _strLen) {
                _cutFlag = false;
            }
            return {"cutstring":_cutString, "cutflag":_cutFlag};
        },
        //是否全角文字
        isFull:function (pChar) {
            if ((pChar.charCodeAt(0) > 128)) {
                return true;
            } else {
                return false;
            }
        }
    }
}

//正则类
function regular() {
    return {
        //电话号码
        isPhone: function (phone) {
            var pattern = /^1\d{10}$/;
            return pattern.test(phone);
        },
        //邮件
        isEmail: function (email) {
            var pattern = /^((([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})[; ,])*(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})))$/;
            return pattern.test(email);
        },
        //姓名
        isName: function (val) {
            // var pattern = /^[\u4e00-\u9fa5]{2,10}$|^[\w+\s]{1,20}$/;
            // return pattern.test(val);
            if(val){
                return true;
            }else{
                return false;
            }
        },
        //邮编
        isZip: function (val) {
            var pattern = /^[0-9]\d{5}$/;
            return pattern.test(val);
        },
        //身份证
        issfz: function (val) {
            var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            return pattern.test(val);
        },
        //数字
        isNum: function (val) {
            var pattern = /([1-9]\d*\.?\d*)|(0\.\d*[1-9])/;
            return pattern.test(val);
        },
        //数字或字母组合
        isNumOrStr: function (val) {
            var pattern = /^[A-Za-z0-9]+$/;
            return pattern.test(val);
        },
        //匹配中英文
        isChAndEn: function (val) {
            var pattern = /[a-zA-Z\u4e00-\u9fa5]+/g;
            return !pattern.test(val);
        },
        isBirth:function(val) {
            var pattern = /^[A-Za-z]{1}\d{9}$/;
            return pattern.test(val);
        },
        //匹配拼音
        isNameSpell: function (val) {
            var pattern = /^([a-z]+(\s){1})([a-z]+)$/g;
            return pattern.test(val);
        },
        //获取身份证对应的性别和年龄
        getDateSex: function (num) {
            var UUserCard = num;
            var returns = {
                age: '',
                sex: ''
            };
            //获取出生日期
            UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
            //获取性别
            if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
                returns.sex = 1;
            } else {
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
            returns.age = age;
            return returns;
        }
    }
}

//获取地址栏参数
function getQueryString(name,type) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var search=window.location.search;
    if(type){
        search=decodeURI(search);
    }
    var r = search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//对ajax 进行统一的托管处理: 比如统一的错误码处理et...
function ajaxPackage(paramList, num, action) { 
    var sendNum = num | 0;
    var _httpDefaultOpts = {
        type: 'POST', // GET/DELETE/HEAD/JSONP/POST/PUT
        url: '',
        dataType: 'json',
        params: {}, // 拼接在url的参数
        contentType: 'application/x-www-form-urlencoded',
        timeout:60000,
        data: {},
        isBase: true,
        beforeSend: function () {
        }, // ajax 执行开始 执行函数
        success: function (data, isError) {
        }, // ajax 执行成功 执行函数
        error: function (data) {
        }, // ajax 执行失败 执行函数
        complete: function (data) {
        }// ajax 执行结束 执行函数
    };
    if ($.isPlainObject(paramList)) {
        paramList = $.extend({}, _httpDefaultOpts, paramList);

        //把所有参数按照英文首字母升序排列得到一个字符串
        if (paramList.isBase) {
            paramList.url = paramList.base?paramList.base:globedata.baseUrl + paramList.url;
        }
        ajax();
        
    }
    function ajax() {
        $.ajax({
            type: paramList.type,
            url: paramList.url,
            dataType: paramList.dataType,
            timeout : paramList.timeout, //超时时间设置，单位毫秒
            data: paramList.data,
            contentType: paramList.contentType,
            async: paramList.async,
            beforeSend: function (request) {
                // todo 测试用 
                // var token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3dCIsImlhdCI6MTU2MjEyMzAwNiwidWlkIjoxMTMzNTc1NDIzOTgzMDEzODkwLCJvaWQiOiJvYzd4RXYwZWhPNjI5UFRPaGtZd1lsTi1aUjVNIiwiaXNzIjoid3MiLCJ1c2VyIjp7ImlkIjoxMTMzNTc1NDIzOTgzMDEzODkwLCJlbmFibGUiOm51bGwsInJlbWFyayI6bnVsbCwiY3JlYXRlQnkiOm51bGwsImNyZWF0ZVRpbWUiOm51bGwsInVwZGF0ZUJ5IjpudWxsLCJ1cGRhdGVUaW1lIjpudWxsLCJrZXl3b3JkIjpudWxsLCJuaWNrbmFtZSI6IlN0YXJcdUQ4M0RcdURDQTYiLCJoZWFkaW1ndXJsIjoiaHR0cHM6Ly9zdGF0aWMud3RzOTk5OS5uZXQvaGVhZEltYWdlL28tV1JLd1RLMTdvc1lKWUY0Q3huQkdSSGl3MzguanBnIiwic2V4IjoiMiIsImJpcnRoZGF5IjpudWxsLCJwcm92aW5jZSI6Iua5luWMlyIsImNpdHkiOiLmrabmsYkiLCJlbWFpbCI6bnVsbCwibW9iaWxlMSI6InYyXzcwNTM5YTMzZDlmYzliZGFhNWQyNzIzNjgzMDQyMTg1IiwibW9iaWxlMiI6IkRFVi5ORGN5T1Rka09HUXRabUptTlMwME5UYzRMV0psWTJVdE16TXdOak5rWlRCbU1UYzRUVzVZTjFKc00wUkZNMlJ2VVdOaVRWQnpWbGRJY0RRM2QweG1hU3RhV214QlFVRkJRVUZCUVVGQlFUZDNTVlk0V25kdFlubGlkbmM0V0ZoMVpFNHlXbHBwWmtwa1JrcE5Vek5tUzBvM2JqQmlXbUpqT0VvMWRVMUlOMUJUVWpCSEAzOEN1R0FCbDVwVEJ4UnVXSXprbUFNPT0iLCJtb2JpbGUiOiIxNTkqKioqMTA0NyIsInVuaW9uaWQiOiJvYzd4RXYwZWhPNjI5UFRPaGtZd1lsTi1aUjVNIiwib3BlbmlkIjoiby1XUkt3VEsxN29zWUpZRjRDeG5CR1JIaXczOCIsInNlcnZlckNvZGUiOiJ3eCIsImltZWkiOm51bGwsImRldmljZU5vIjpudWxsLCJkZXZpY2VUeXBlIjpudWxsLCJkZXZpY2VCcmFuZCI6bnVsbCwiYXBwVmVyc2lvbiI6bnVsbCwiY3VycmVudENsaWVudEZsYWciOiJvYzd4RXYwZWhPNjI5UFRPaGtZd1lsTi1aUjVNIiwiYXBwSW5mbyI6eyJpbWVpIjpudWxsLCJkZXZpY2VObyI6bnVsbCwiZGV2aWNlVHlwZSI6bnVsbCwiZGV2aWNlQnJhbmQiOm51bGwsImFwcFZlcnNpb24iOm51bGx9LCJ3eEluZm8iOnsibmljayI6IlN0YXJcdUQ4M0RcdURDQTYiLCJoZWFkSW1hZ2UiOiJodHRwczovL3N0YXRpYy53dHM5OTk5Lm5ldC9oZWFkSW1hZ2Uvby1XUkt3VEsxN29zWUpZRjRDeG5CR1JIaXczOC5qcGciLCJvcGVuaWQiOiJvLVdSS3dUSzE3b3NZSllGNEN4bkJHUkhpdzM4IiwidW5pb25pZCI6Im9jN3hFdjBlaE82MjlQVE9oa1l3WWxOLVpSNU0iLCJzZXgiOiIyIiwicHJvdmluY2UiOiLmuZbljJciLCJjaXR5Ijoi5q2m5rGJIn19fQ.xyUXEpeYZfIcOG_NdSuO3qOr75fTvGQUzFVxjdJRHnxTES8Vy4P2z5HeoRL4eU1xq206gjf6R5fUQZv97ZvNtQ';
                // if (token) {
                //     request.setRequestHeader('WTS_TOKEN_A', token);
                // }
                if(paramList.headers && paramList.headers.token){
                    request.setRequestHeader('WTS_TOKEN_A', paramList.headers.token);
                }else if(sessionStorage.getItem("token")){
                    request.setRequestHeader('WTS_TOKEN_A', sessionStorage.getItem("token"));
                }
                paramList.beforeSend(request);
                if (sendNum > 0)return false;
            },
            success: function (data, textStatus, jqXHR) {
                sendNum++;
                var isError = successError(data);
                paramList.success(data, isError);
            },
            error: function (data, textStatus, errorThrown) {
                console.log(data);
                console.log(data.status);
                console.log(textStatus);
                var isError = errordata(data, textStatus)
                paramList.error(data, isError);
            },
            complete: function (data) {
                paramList.complete(data);
            }
        });
    }

    //请求错误处理
    function errordata(data, textStatus) {
        if (textStatus == 'timeout') {
            layerMsg('网络请求超时，请先改善网络环境！')
            return false;
        }
        else if (data.status == 502) {
            layerMsg('服务器出错，请稍后再试-502')
            return false;
        } else if (data.status == 0) {
            layerMsg('未联网，请先检查网络')
            return false;
        }
        return 1;
    }

    //公共错误处理
    function successError(data) {
        if(data.httpCode == 403){
            if(tools().isWtsNativeApp()){
                layerMsg("您的账号已在其他设备登录，请您重新登录");
                setTimeout(function(){
                    nativeApp.general.deviceready(function(){
                        nativeApp.user.loginOut(function(){
                            nativeApp.general.closeWebView();
                            var url = encodeURIComponent(window.location.href);
                            nativeApp.general.router({url:"wts://web?force=1&url="+url});
                        },function(){
                            layerMsg("退出登录失败!");
                        })
                    })
                },1000);
                return false;
            }
        }
        if (data.httpCode != 200 && data.data) {
            layer.open({
                content: data.data.errorMsg
                ,skin:'lzAlert'
                ,btn: '我知道了'
            });
            return false;
        }else if(data.httpCode != 200){
            layer.open({
                content: data.msg
                ,skin:'lzAlert'
                ,btn: '我知道了'
            });
            return false;
        }
        return true
    }
}

/*
    * 微信分享监听
    * params
    * title-标题
    * img-图片地址
    * desc-描述
    * appId-appId
    * */
function shareWx(params) {
    if(!$.tools().isWeiXin())return;
    $.globedata.commonShare=false;
    var img=params.img || "https://" + $.domain + "/lib/images/logo-3.jpg";
    var appId = $.tools().getWxId();
    var title = params.title;
    var url = location.href.split('#')[0];
    var link = params.link || url;
    // if($.tools().isWtsNativeApp()){
    //     nativeApp.general.deviceready(function () {
    //         nativeApp.weixin.initShare({
    //             router:"wts://share?type=1&link="+encodeURIComponent(link)+"&title="+encodeURIComponent(title)+"&content="+encodeURIComponent(params.desc)+"&logo="+encodeURIComponent(img)
    //         })
    //     })
    //     return;
    // }
    // 调用服务器获取签名
    $.ajax({
        type: "POST",
        url: "/tools/wechat/api/getJssdk",
        data: {
            appid: appId,
            url: url
        },
         async: false,
        dataType: 'json',
        success: function (data, isError) {
            //微信config授权
            if (!isError) {
                return;
            }
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appId, // 必填，公众号的唯一标识
                timestamp: data.data.timeStamp, // 必填，生成签名的时间戳
                nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
                signature: data.data.signature, // 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ','closeWindow'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function () {
                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title: params.title,
                    desc: params.desc,
                    link: link,
                    imgUrl: img,
                    success: function () {
                        // layer.msg('分享成功！');
                    },
                    cancel: function () {
                        layerMsg('取消分享！')
                    },
                    fail: function (res) {
                        layerMsg(JSON.stringify(res))
                    }
                });
                //分享给朋友
                wx.onMenuShareAppMessage({
                    title: title,
                    desc: params.desc,
                    link: link,
                    imgUrl: img,
                    trigger: function (res) {
                        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                    },
                    success: function (res) {
                        //layer.msg('已分享！');
                    },
                    cancel: function (res) {
                        layerMsg('已取消！')
                    },
                    fail: function (res) {
                        layerMsg(JSON.stringify(res))
                    }
                });
            });

            wx.error(function (res) {
                console.log(res);
            });

        }
    });

}


//使用
//console.log($.tools().getAnbanben());
//console.log($.regular().isPhone(16855454545));
//console.log($.regular().issfz("320311770706001"));

//$.getLocalUrl()

//横屏处理
function hengshuping() {
    setTimeout(function () {
        if (window.orientation == 180 || window.orientation == 90 || window.orientation == -90) {
            layer.msg('为了更好的体验，请使用竖屏浏览')
        } else if (window.orientation == 0) {
            console.log("竖屏");
        }
    }, 500);
}

function layerMsg(text,time){
    //中间轻提示框
    layer.open({
        content: text
        ,skin: 'msg'
        ,style: 'bottom:0;'
        ,time: time?time:3 //2秒后自动关闭
      });
}

//判断来源-小程序-app
function comeFrom() {
    var comes=$.getQueryString("comeFrom");
    if(comes && comes=="xcx"){
        sessionStorage.setItem("comeFrom","xcx");
    }else if(comes=="app"){
        sessionStorage.setItem("comeFrom","app");
    }
}
comeFrom();
// if(globedata.environment==0 || getQueryString('console')){
//     setTimeout(function(){errorLogFn()},100);
// }
function errorLogFn() {
    // 错误打印处理
    //发给投诉的用户打开带有vconsole=show的url
    var url=location.href,jsUrl;
    if(url.indexOf("/market/") > -1 || url.indexOf("/community/") > -1 || url.indexOf("/personal/") > -1 || url.indexOf("/exercise/") > -1|| url.indexOf("/products/") > -1 || url.indexOf("/customer/")){
        jsUrl='<script src="../lib/js/vconsole.min.js"></script>';
    }else{
        jsUrl='<script src="./lib/js/vconsole.min.js"></script>';
    }
    $("head").append(jsUrl);
    setTimeout(function(){
        new VConsole();
        $('#__vconsole').css('font-size','13px');
    },500)
}
//横屏监听
$(window).bind('orientationchange', function (e) {
    hengshuping();
});
})(jQuery);