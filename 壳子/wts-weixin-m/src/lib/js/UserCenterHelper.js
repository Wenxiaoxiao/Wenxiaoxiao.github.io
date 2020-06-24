/**
 * 用户中心操作类
 * @constructor
 */

var UserCenterHelper = function () {

    var envirement = 0;
    var domainTest = {
        html: 'https://bx.wts9999.net',
        api: 'https://bx.wts9999.net',
        whiteList: [
            "//anxin.lzyunying.com"
        ]
    };
    var domainDev = {
        html: 'https://bx.wts999.com',
        api: 'https://bx.wts999.com',
        whiteList: [
            "//anxin.lzyunying.com"
        ]
    };
    this.domain = envirement == 1 ? domainDev : domainTest;
    this.apiurl = {
        wxoauthappid: this.domain.api + '/uc/login/wxoauthappid',
        wxmplogin: this.domain.api + '/uc/login/wxmplogin',
        //公众号登录跳转页
        wxmploginHtml: this.domain.html + '/wxmplogin.html',
        autoLogin: this.domain.api + '/uc/ucUser/autoLogin',


        //支付宝相关
        getAliOauthUrl: "https://" + this.domain.api + '/uc/login/getThirdOauthUrl',
        aliOauthBaseInfo: this.domain.api + '/uc/login/thirdOauthBaseInfo',
    };

}
var tool = $.tools();
/**
 * 当前用户信息
 * 如果希望转义微信表情,则引入emoji.js即可 否则表情字符显示可能不正确
 * < script src="xxxx/lib/js/emoji.js">< /script >
 * @returns {string}
 */
UserCenterHelper.prototype.getUserInfo = function () {
    var userCenterToken = tool.getcookie("WTS_TOKEN_A");
    if (userCenterToken == "") {
        return "";
    } else {
        var indexS = userCenterToken.indexOf(".");
        var indexE = userCenterToken.lastIndexOf(".");
        var infoBase64 = userCenterToken.substring(indexS + 1, indexE);
        var unicode = BASE64.decoder(infoBase64);
        var str = '';
        for (var i = 0, len = unicode.length; i < len; ++i) {
            var cc = unicode[i];
            if (cc != 0) {
                str += String.fromCharCode(cc);
            }
        }
        //如果希望转义微信表情,则引入emoji.js即可
        /*if (typeof jEmoji != "undefined"){
         str = jEmoji.softbankToUnified(str);
         str = jEmoji.googleToUnified(str);
         str = jEmoji.docomoToUnified(str);
         str = jEmoji.kddiToUnified(str);
         }*/
        return JSON.parse(str).user;
    }
}

// H5登录
UserCenterHelper.prototype.h5mplogin = function () {
    var self = this;
    var df = $.Deferred();
    var userCenterToken = tool.getcookie("WTS_TOKEN_A");
    if (userCenterToken) {
        autoLogin.call(self, df)  //获取用户信息
    } else {
        return df.reject(false);
    }
    return df.promise();
};


/**
 * 公众号授权登录
 * !如果静默授权登录失败,99%可能是因为用户未登录,则需使用显示授权重新登录一次,即换参数 wxscope 值为snsapi_base 重新登录
 * @param force 是否忽略cookie 强制登录
 * @param wxscope 微信授权方式 snsapi_base,snsapi_userinfo 默认为静默授权,如果用户未关注会导致无法获取用户信息
 */
UserCenterHelper.prototype.wxmplogin = function (force, wxscope) {
    var self = this;
    var df = $.Deferred();
    this.errorNum = 0;
    if (typeof (force) == "undefined") {
        force = false;
    }
    if (typeof (wxscope) == "undefined") {
        wxscope = "snsapi_base";
    }
    var userCenterToken = tool.getcookie("WTS_TOKEN_A");

    function getName() {
        //获取页面名称判断
        var pageName = tool.pageName()
        if (pageName[0] == "index" || pageName[0] == "personal") {
            if (document.domain != self.domain.html) {
                return true;
            }
            return false;
        }
        return true;
    }

    //如有token,并且不需强制登录,则跳过
    if (userCenterToken != "" && !force && !tool.isNull(userCenterToken)) {
        //df.resolve(this.getUserInfo());
        autoLogin.call(self, df) //获取用户信息
    } else {
        var wxCode = getQueryStringByName('code');
        if (window.location.href.indexOf("codelose") > -1) {
            wxCode = "";
        }
        var state = getQueryStringByName('state');
        //没有微信CODE时先跳转到授权页
        if (wxCode == "") {
            //获取授权用的微信公众号appid
            $.ajax({
                type: 'get',
                url: self.apiurl.wxoauthappid,
                async: false,
                cache: false,
                data: {
                    key: 'oauth.wx.mp.appid'
                },
                dataType: 'json',
                success: function (result) {
                    //将页面跳转至微信授权页
                    if (result != null && result.httpCode == 200 && result.hasOwnProperty('data') && result.data != "") {
                        var wxappid = result.data.appid;
                        //安全域名
                        var domain = result.data.domain;
                        var fromurl = null;
                        var tempHref = getLocalUrls();
                        //如果当前访问域名不在安全域名内,则跳转到个人中心的登录跳转页
                        if (document.domain != domain) {
                            fromurl = self.apiurl.wxmploginHtml + "?jumpToUrl=" + encodeURIComponent(tempHref);
                        } else {
                            fromurl = tempHref;
                        }
                        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wxappid + '&redirect_uri=' + encodeURIComponent(fromurl) + '&response_type=code&scope=' + wxscope + '&state=' + wxscope + '#wechat_redirect';
                        location.href = url;
                    } else {
                        alert('获取appid失败 \n ' + result);
                        if (self.errorNum > 9) {
                            layer.msg("系统打盹了，请稍后再试");
                            return;
                        }
                        self.errorNum++;
                        df.reject(res);
                    }
                }
            });
            //有CODE时调用服务器登录接口
        } else {
            $.ajax({
                type: 'get',
                url: self.apiurl.wxmplogin,
                async: false,
                cache: false,
                data: {
                    code: wxCode,
                    state: state
                },
                dataType: 'json',
                success: function (result) {
                    if (result != null && result.httpCode == 200 && result.hasOwnProperty('data') && result.data != "") {
                        console.log(result.data);
                        console.log('111');
                        window.location.hash = "codelose";
                        autoLogin.call(self, df) //获取用户信息

                        //如果静默授权登录失败,则换成显示授权重新登录一次
                    } else if (result.httpCode == 303 && wxscope == "snsapi_base") {
                        //var url=location.href.replace("snsapi_base","snsapi_userinfo");
                        wxscope = "snsapi_userinfo";
                        $.ajax({
                            type: 'get',
                            url: self.apiurl.wxoauthappid,
                            async: false,
                            cache: false,
                            data: {
                                key: 'oauth.wx.mp.appid'
                            },
                            dataType: 'json',
                            success: function (result) {
                                //将页面跳转至微信授权页
                                if (result != null && result.httpCode == 200 && result.hasOwnProperty('data') && result.data != "") {
                                    var wxappid = result.data.appid;
                                    //安全域名
                                    var domain = result.data.domain;
                                    var fromurl = null;
                                    //如果当前访问域名不在安全域名内,则跳转到个人中心的登录跳转页
                                    if (document.domain != domain) {
                                        fromurl = self.apiurl.wxmploginHtml + "?jumpToUrl=" + encodeURIComponent(location.href);
                                    } else {
                                        fromurl = getLocalUrls();
                                    }
                                    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wxappid + '&redirect_uri=' + encodeURIComponent(fromurl) + '&response_type=code&scope=' + wxscope + '&state=' + wxscope + '#wechat_redirect';
                                    location.href = url;
                                } else {
                                    alert('获取appid失败 \n ' + result);
                                    if (self.errorNum > 9) {
                                        layer.msg("系统打盹了，请稍后再试");
                                        return;
                                    }
                                    self.errorNum++;
                                    df.reject(res);
                                }
                            }
                        });

                        //location.href=url;
                    } else if (result.httpCode == 409) {
                        var url = getLocalUrls();
                        location.href = url;
                    } else {
                        alert('微信身份识别失败 \n ' + result);
                        if (self.errorNum > 9) {
                            layer.msg("系统打盹了，请稍后再试");
                            return;
                        }
                        self.errorNum++;
                        df.reject(res);
                    }
                }
            });
        }
    }

    return df.promise();
};


/**
 * 支付宝授权登录
 */
UserCenterHelper.prototype.ALmplogin = function () {
    var self = this;
    var df = $.Deferred();
    this.errorNum = 0;
    var userCenterToken = tool.getcookie("WTS_TOKEN_A");


    // alert("JQuserCenterToken======" + userCenterToken);

    //如有token,并且不需强制登录,则跳过
    if (userCenterToken != "" && !force && !tool.isNull(userCenterToken)) {
        autoLogin.call(self, df) //获取用户信息
    } else {
        var auth_code = getQueryStringByName('auth_code');
        var app_id = getQueryStringByName('app_id');
        var source = getQueryStringByName('source');
        var scope = getQueryStringByName('scope');
        // alert("zfb=====" + auth_code);

        if (window.location.href.indexOf("codelose") > -1) {
            wxCode = "";
        }

        if (auth_code == "") {
            var tempHref = escape(window.location.href);
            window.location.href = self.apiurl.getAliOauthUrl + "?serverCode=alp" + "&url=" + (tempHref);
        } else {
            $.ajax({
                type: 'post',
                url: self.apiurl.aliOauthBaseInfo,
                async: false,
                data: {
                    "appId": app_id,
                    "source": source,
                    "scope": scope,
                    "authCode": auth_code,
                    "serverCode": 'alp'
                },
                dataType: 'json',
                success: function (result) {
                    if (result != null && result.httpCode == 200 && result.hasOwnProperty('data') && result.data != "") {
                        // alert("aliOauthBaseInfo === " + JSON.stringify(result));
                        autoLogin.call(self, df, 1) //获取用户信息
                    } else {
                        alert('支付宝身份识别失败 \n ' + result);
                        if (self.errorNum > 9) {
                            layer.msg("系统打盹了，请稍后再试");
                            return;
                        }
                        self.errorNum++;
                        df.reject(res);
                    }
                }
            });
        }
    }


    return df.promise();
};




var ucHelper = new UserCenterHelper();
$(document).ready(function () {
    //如果微信内打开,则开启自动登录
    if (tool.isWeiXin()) {

        var WTS_TOKEN_PARAMS = getQueryStringByName("WTS_TOKEN_A");
        var WTS_TOKEN_COKKIE = $.cookie('WTS_TOKEN_A');
        //如果返回参数中有token,但是cookie中没有,那么加入到cookie中
        if (WTS_TOKEN_PARAMS != "" && typeof WTS_TOKEN_COKKIE == "undefined") {
            //如果当前页和个人中心在同一根域名下,则以有COOKIE不要设置重新设置COOKIE
            $.cookie('WTS_TOKEN_A', WTS_TOKEN_PARAMS, {
                expires: 30,
                path: '/'
            });
        }

        ucHelper.wxmplogin(false).then(function (user) {
            init(user);
        });
    }
    
    else {
        ucHelper.h5mplogin().then(function (user) {
             init(false);
         });
        
    }
    //  else if(tool.isAL()){
    //       ucHelper.ALmplogin().then(function (user) {
    //          init(user);
    //      });
    //  }
});




//========工具方法=====

var username = document.cookie.split(";")[0].split("=")[1];
//JS操作cookies方法!
//写cookies
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    //exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    exp.setTime(exp.getTime() + +10 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//获取地址栏参数
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}
//重定向时，去掉微信参数
function getLocalUrls() {
    var url = location.href;
    url = tool.delQueStr(url, "code");
    url = tool.delQueStr(url, "state");
    return url;
}

function redirectUrl() {
    var url = location.origin + location.pathname;
    location.href = url;
}


//检查地址是否在白名单中-whiteList白名单
function checkUrl(url, whiteList) {
    var returns = false;
    for (var k in whiteList) {
        if (url == whiteList[k]) {
            returns = true;
            return false;
        }
    }
    return returns
}

function autoLogin(df, type) {
    var self = this;
    //获取用户信息
    if (type) return redirectUrl();
    // var loginDatas = tool.getLocal("WTS_USER_3");
    // var cookieUser=$.cookie('WTS_USER_3');
    // if (loginDatas && cookieUser) {
    //     return df.resolve(loginDatas);
    // }else if(cookieUser){
    //     return df.resolve(JSON.parse(cookieUser));
    // }
    $.ajax({
        type: "post",
        url: self.apiurl.autoLogin,
        async: false,
        dataType: 'json',
        success: function (result, er) {
            console.log(result);
            var domain = window.location.host.split(".");
            domain = domain[domain.length - 2] + "." + domain[domain.length - 1];
            if (result.httpCode == 403) {
                $.cookie('WTS_TOKEN_A', '', {
                    expires: 1,
                    path: "/",
                    domain: domain,
                    secure: true
                });
                if (tool.isWeiXin()) {
                    return self.wxmplogin();
                }else{
                    return self.h5mplogin();
                }
                

            }
            if (result.data) {
                tool.setLocal("WTS_USER_3", result.data);
                $.cookie('WTS_USER_3', JSON.stringify(result.data), {
                    expires: 1,
                    path: "/",
                    domain: domain,
                    secure: true
                });
            }
            df.resolve(result.data);
        }
    });
}