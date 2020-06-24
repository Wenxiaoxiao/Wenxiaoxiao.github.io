/**
 * Created by Administrator on 2017/12/25.
 * 郝兴来
 */
function WtsLogin() { }
WtsLogin.prototype = {
    constructor: WtsLogin,
    init: function (options, callBack) {
        //this.dom = "#cityPicker";
        var self = this;
        this.callBack = callBack;

        var domain = options.env == 1 ? 'https://bx.wts999.com' : 'https://bx.wts9999.net';
        var base = options.env == 1 ? 'wts999.com' : 'wts9999.net';
        this.params = {
            domain: domain,//域名-全面
            historyLocal: ['WTS_USER', 'WTS_USER_2'],//历史缓存名称
            base: base,//域名-一级
            wxscope: "snsapi_base",
            zfbcode: "auth_base",
            autoLogin:  '/uc/ucUser/autoLogin', //获取登录数据
            //微信相关
            wxoauthappid: domain + '/uc/login/wxoauthappid',
            wxmplogin: domain + '/uc/login/wxmplogin',
            wxmploginHtml: domain + '/wxmplogin.html',
            //支付宝相关
            getAliOauthUrl: domain + '/uc/login/getThirdOauthUrl',
            aliOauthBaseInfo: domain + '/uc/login/thirdOauthBaseInfo',
        }
        var login = this.getQueryStringByName('login');
        var sessionlogin = sessionStorage.getItem('login');
        if (navigator.userAgent.indexOf("wtsbxwApp") > -1) {
            this.callBack(false)
            return;
        }
        if (login && login == 2) {
            sessionStorage.setItem('login', login);
            this.callBack(false)
            return;
        } else if (sessionlogin && sessionlogin == 2) {
            this.callBack(false)
            return;
        }
        this.token = $.cookie('WTS_TOKEN_A');
        if (this.token) {
            self.getUserInfo();
        } else {
            self.toChannel()
        }
    },
    /**
     * 判断是哪个渠道登录-微信，支付宝，h5
     */
    toChannel: function () {
        if (this.isWeiXin()) {
            this.wxmplogin();
        } else if (this.isAL()) {
            this.ALmplogin();
        } else {
            this.h5mplogin();
        }
    },
    wxmplogin: function () {
        var self = this;
        var code = this.getQueryStringByName('code');
        var state = this.getQueryStringByName('state');
        if (!code) {
            $.ajax({
                type: 'get',
                url: self.params.wxoauthappid,
                async: false,
                cache: false,
                data: {
                    key: 'oauth.wx.mp.appid'
                },
                dataType: 'json',
                success: function (result) {
                    //将页面跳转至微信授权页
                    if (result != null && result.httpCode == 200 && result.data != "") {
                        var redirectUrl = self.wechat_redirect_url(result);//获取授权地址
                        location.href = redirectUrl;
                    } else {
                        alert('获取appid失败 \n ' + result);
                    }
                }
            });
        } else {
            $.ajax({
                type: 'get',
                url: self.params.wxmplogin,
                async: false,
                cache: false,
                data: {
                    code: code,
                    state: state
                },
                dataType: 'json',
                success: function (result) {
                    if(result.msg == "重复CODE请求" || result.httpCode == 409){
                        var tempHref = location.href;
                        tempHref = self.delQueStr(tempHref, 'code');
                        tempHref = self.delQueStr(tempHref, 'state');
                        return window.location.replace(tempHref);
                    }
                    if (result != null && result.httpCode == 200 && result.data != "") {
                        console.log(result.data);
                        self.getUserInfo();
                        //如果静默授权登录失败,则换成显示授权重新登录一次
                    } else if (result.httpCode == 303 && self.params.wxscope == "snsapi_base") {
                        self.params.wxscope = "snsapi_userinfo";
                        $.ajax({
                            type: 'get',
                            url: self.params.wxoauthappid,
                            async: false,
                            cache: false,
                            data: {
                                key: 'oauth.wx.mp.appid'
                            },
                            dataType: 'json',
                            success: function (result) {
                                //将页面跳转至微信授权页
                                if (result != null && result.httpCode == 200 && result.data != "") {
                                    var redirectUrl = self.wechat_redirect_url(result);//获取授权地址
                                    location.href = redirectUrl;
                                } else {
                                    alert('获取appid失败 \n ' + JSON.stringify(result));
                                }
                            }
                        });
                        //location.href=url;
                    } else {
                        alert('微信身份识别失败 \n ' + JSON.stringify(result));
                    }
                }
            });
        }
    },
    ALmplogin: function () {
        var self = this;
        var Request= this.getQueryStringByNameByVue(); //实例化
        var auth_code =Request.auth_code || "";
        var app_id = Request.app_id;
        var source = Request.source;
        var scope = Request.scope;
        if (auth_code == "") {
            var redirectUrl = self.al_redirect_url();//获取授权地址
            location.href = redirectUrl;
        } else {
            $.ajax({
                type: 'post',
                url: self.params.aliOauthBaseInfo,
                async: false,
                contentType: "application/json",
                data: JSON.stringify({
                    "appId": app_id,
                    "source": source,
                    "scope": scope,
                    "authCode": auth_code.split("#")[0],
                    "serverCode": 'alp'
                }),
                dataType: 'json',
                success: function (result) {
                    var url;
                    if(result.msg == "请求参数出错" || result.httpCode == 400){
                        url = location.href;
                        url = self.delQueStr(url, "auth_code");
                        url = self.delQueStr(url, "app_id");
                        url = self.delQueStr(url, "source");
                        url = self.delQueStr(url, "userOutputs");
                        url = self.delQueStr(url, "alipay_token");
                        return window.location.replace(url);
                    }
                    if (result != null && result.httpCode == 200  && result.data) {
                        if(self.getLocal("vueHash") && window.location.hash.indexOf(self.getLocal("vueHash"))<0){
                            url = location.href;
                            url = self.delQueStr(url, "auth_code");
                            url = self.delQueStr(url, "app_id");
                            url = self.delQueStr(url, "source");
                            url = self.delQueStr(url, "scope");
                            url = self.delQueStr(url, "userOutputs");
                            url = self.delQueStr(url, "alipay_token");
                            url = url.replace(/\#\/+/g,"");
                            url+="#/"+self.getLocal("vueHash");
                            localStorage.clear('vueHash');
                            return window.location.replace(url);
                        }
                        self.getUserInfo();
                    }else if(result.httpCode == 303 && self.params.zfbcode == "auth_base"){
                        self.params.zfbcode = "auth_user";
                        var redirectUrl = self.al_redirect_url();//获取授权地址
                        location.href = redirectUrl;
                    }else {
                        alert('支付宝身份识别失败 \n ' + result);
                    }
                }
            });
        }
    },
    h5mplogin: function () {
        var self = this;
        var loginDatas = JSON.parse(sessionStorage.getItem("WTS_USER_3"));
        if (loginDatas) {
            if (self.checkUserServerCode(loginDatas))return;
            return self.callBack(loginDatas)
        }
        return this.callBack(false)
    },
    getUserInfo: function () {
        var self = this;
        var loginDatas = JSON.parse(sessionStorage.getItem("WTS_USER_3"));
        if (loginDatas) {
            if (self.checkUserServerCode(loginDatas))return;
            return self.callBack(loginDatas)
        }
        $.ajax({
            type: "post",
            url: self.params.autoLogin,
            async: false,
            dataType: 'json',
            success: function (result, er) {
                console.log(result);
                if (result.httpCode == 403) {
                    self.clearUser()
                    return self.toChannel()
                }
                if (self.checkUserServerCode(result.data)) return;
                if (result.data) {
                    sessionStorage.setItem("WTS_USER_3",JSON.stringify(result.data));
                }

                return self.callBack(result.data);
            }
        });
    },
    //微信
    isWeiXin: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    isDD: function () {
        //判断是不是钉钉
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf("dingtalk") >= 0;
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
    //获取地址栏参数
    getQueryStringByName: function (name) {
        var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return result[1];
    },

    //获取地址栏参数
    getQueryStringByNameByVue: function () {
        var obj = {};
        var name,value; 
        var str=location.href; //取得整个地址栏
        var num=str.indexOf("?") 
        str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

        var arr=str.split("&"); //各个参数放到数组里
        for(var i=0;i < arr.length;i++){ 
            num=arr[i].indexOf("="); 
            if(num>0){ 
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            obj[name]=value;
            } 
        }
        return obj; 
    },

    //清除本地cookie和缓存的用户信息
    clearUser: function () {
        $.cookie('WTS_TOKEN_A', '', {
            expires: 1,
            path: "/",
            domain: this.params.base,
            secure: true
        });
        var historys = this.params.historyLocal;
        for (var k in historys) {
            localStorage.clear(historys[k]);
        }
        sessionStorage.clear();
    },

    //判断用户信息环境
    checkUserServerCode: function (userDta) {
        var self = this;
        var result=false;
        if (self.isAL() && userDta.serverCode != "alp") {
            result= true;
        }
        if (self.isWeiXin() && userDta.serverCode != "wx") {
            result= true;
        }
        if(result){
            self.clearUser()
            self.toChannel()
        }
        return result;
    },

    //获取微信授权地址
    wechat_redirect_url: function (result) {
        var wxappid = result.data.appid; //appid
        var domain = result.data.domain; //安全域名
        var fromurl = '';
        var tempHref = location.href;
        tempHref = this.delQueStr(tempHref, 'code');
        tempHref = this.delQueStr(tempHref, 'state');
        //如果当前访问域名不在安全域名内,则跳转到个人中心的登录跳转页
        fromurl = document.domain == domain ? encodeURIComponent(tempHref) : encodeURIComponent(this.params.wxmploginHtml + "?jumpToUrl=" + tempHref);
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wxappid + '&redirect_uri=' + fromurl + '&response_type=code&scope=' + this.params.wxscope + '&state=' + this.params.wxscope + '#wechat_redirect';
        return url;
    },
    //获取微信授权地址
    al_redirect_url: function () {
        var tempHref = location.href;
        tempHref = this.delQueStr(tempHref, "auth_code");
        tempHref = this.delQueStr(tempHref, "app_id");
        tempHref = this.delQueStr(tempHref, "source");
        tempHref = this.delQueStr(tempHref, "scope");
        tempHref = this.delQueStr(tempHref, "userOutputs");
        tempHref = this.delQueStr(tempHref, "alipay_token");
        var fromurl = '';
        //如果当前访问域名不在安全域名内,则跳转到个人中心的登录跳转页
        fromurl = document.domain.indexOf("bx.wts999")>-1 ? encodeURIComponent(tempHref) :encodeURIComponent(this.params.wxmploginHtml + "?jumpToUrl=" + tempHref);
        if(this.params.zfbcode != "auth_base" && tempHref.split("#/")[1]){
            this.setLocal("vueHash",tempHref.split("#/")[1]);
        }
        var url = this.params.getAliOauthUrl + "?serverCode=alp&scope="+this.params.zfbcode + "&url=" + fromurl;
        return url;
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
            return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1) + this.hasHash();
        }
        else {
            arr = str.split('=');
            if (arr[0] == ref) {
                return url.substr(0, url.indexOf('?')) + this.hasHash();
            }
            else {
                return url;
            }
        }
    },

    //判断是否存才hash
    hasHash: function () {
        if (window.location.hash && window.location.hash.length > 0) {
            if(this.isAL() && window.location.hash.split("?").length>1){
                return "";
            }
            return window.location.hash;
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

}