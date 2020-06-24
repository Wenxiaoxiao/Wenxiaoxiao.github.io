
/**
 * Created by Administrator on 2019-07-16
 * 郝兴来
 */
function H5Pay() {
}
H5Pay.prototype = {
    constructor: H5Pay,
    init: function (options, callBack) {
        this.callBack = callBack;
        this.initData = { //初始参数
            orderId: '', //订单号
            payWay: "", //支付方式
            orderType: "", //支付类型
            H5orderType: "", //H5支付类型
            openId: "", //openId  微信内必填
            paySuccessUrl: "", //支付结果页
            payErrorUrl: "", //支付失败页
        };
        this.result = {
            code: 0, //0-支付失败，1-支付成功
            msg: '', //错误信息
        }
        this.initData = $.extend({}, this.initData, options);
        var payWay = options.payWay;

        //判断支付方式：1-微信，2-支付宝；3-银联
        if (payWay == 1) {
            this.wxPay()
        } else if (payWay == 2) {
            this.aliPay()
        } else if (payWay == 4) {
            this.unionPay()
        }
    },
    //微信支付
    wxPay: function () {
        var self = this;
        //微信公众号支付
        if ($.tools().isWeiXin()) {
            //获取微信的openid
            // $.ajaxPackage({
            //     type: "post",
            //     url: "/custom/personal/api/getUcUser",
            //     contentType: "application/json",
            //     async: true,
            //     data: JSON.stringify({}),
            //     success: function (data, isError) {
            //         if (!isError) {
            //             return;
            //         };

            //         self.wxApiPay({
            //             "tradeNo": self.initData.orderId,
            //             "openid": data.data.openId,
            //             "orderType": self.initData.orderType,
            //         })
            //     },
            //     error: function (XMLHttpRequest, textStatus, errorThrown) {
            //         console.log(textStatus);
            //     }
            // });
            console.log("appid", sessionStorage.payAppid, sessionStorage[sessionStorage.payAppid]);
            var payOpenId = sessionStorage[sessionStorage.payAppid];
            if (!payOpenId) {// 解决小概率出现openid取不到的问题
                var code = $.getQueryString('code');
                if (!code) {
                    if (confirm("微信支付授权失败，是否重新授权？")) {
                        location.reload();
                    }
                    return;
                }
                var params = sessionStorage.openidParams
                self.getOpenId(JSON.parse(params), function () {
                    payOpenId = sessionStorage[sessionStorage.payAppid];
                    self.wxApiPay({
                        "tradeNo": self.initData.orderId,
                        "openid": payOpenId,
                        "orderType": self.initData.orderType,
                    })
                });
                return;
            }
            self.wxApiPay({
                "tradeNo": self.initData.orderId,
                "openid": payOpenId,
                "orderType": self.initData.orderType,
            })
        } else {
            //微信web支付
            var orderType = self.initData.H5orderType || "zhonganZZService";
            var target = 'https://' + window.location.host + '/pay/wechat/h5?tradeNo=' + self.initData.orderId + '&orderType=' + orderType;
            window.location.href = '../market/payLead.html?payUrl=' + target;
        }
    },
    // 拉起微信jssdk支付
    wxApiPay: function (config) {
        var self = this;
        $.ajaxPackage({
            url: "/pay/wechat/jsapi",
            async: true,
            data: config,
            success: function (data, isError) {
                if (!isError) {
                    self.success(0, '接口报错' + data.msg);
                    return;
                };
                var paySign = data.data;
                var opetions = {
                    "appId": paySign.appId,     //公众号名称，由商户传入
                    "timeStamp": paySign.timeStamp,         //时间戳，自1970年以来的秒数
                    "nonceStr": paySign.nonceStr, //随机串
                    "package": paySign.package,
                    "signType": paySign.signType,         //微信签名方式：
                    "paySign": paySign.paySign //微信签名
                };

                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', opetions,
                    function (res) {
                        console.log(JSON.stringify(res))
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            self.result.code = 1;
                            self.success(1)
                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            self.success(0, '取消支付')
                        } else {
                            self.success(0, res.err_msg)
                        }

                    }
                );
            },
        });
    },

    //支付宝支付
    aliPay: function () {
        var target = 'https://' + window.location.host + '/pay/alipay/wap?tradeNo=' +
            this.initData.orderId + "&orderType=" + this.initData.orderType;
        window.location.href = '../market/payLead.html?payType=02&payUrl=' + target;
    },

    //银联支付
    unionPay: function () {
        var target = 'https://' + window.location.host + '/pay/chinapay/web?tradeNo=' +
            this.initData.orderId + "&orderType=" + this.initData.orderType;
        window.location.href = target;
    },
    success: function (code, msg) {
        if (code == 1) {
            window.location.replace(this.initData.paySuccessUrl);
        }
        this.callBack({
            code: code,
            msg: msg
        })
    },

    // 获取“梧桐树保险”微信openid；因为与登录公众号不符，需另行授权
    getOpenId: function (params, callBack) {
        var self = this;
        var appids = "";
        var doman = window.location.href;
        if (doman.indexOf("wts9999.net") > -1) {
            //测试环境
            appids = "wx04452e22173121e5";
        } else {
            //正式环境
            appids = "wx348659a6e11cb40b";
        }
        self.appid = params.appid ? params.appid : appids;
        sessionStorage.payAppid = self.appid;
        sessionStorage.openidParams = JSON.stringify(params);
        var payOpenId = sessionStorage[self.appid];
        if (payOpenId || !$.tools().isWeiXin()) {
            $(".lz-readys").remove();
            return;
        }
        if ($.tools().isWeiXin() && !payOpenId) {
            var code = $.getQueryString('code');
            if (code) {
                if (params.ajaxType == 1) {// 保单系统获取openid
                    $.ajaxPackage({
                        url: "/pay/wechat/getOpenid",
                        contentType: "application/json",
                        type: "get",
                        data: {
                            code: code,
                        },
                        success: function (data, isError) {
                            $(".lz-readys").remove();
                            if (!isError) {
                                return;
                            };
                            if (!data.data) {
                                location.href = self.funcUrlDel("code");
                                // $.layerMsg('openId获取异常');
                                return;
                            }
                            sessionStorage[self.appid] = data.data;
                            callBack && callBack();
                        },
                    });
                } else {// 增值服务获取openid
                    $.ajax({
                        type: 'post',
                        url: "/uc/login/api/getOpenid",
                        contentType: "application/json",
                        async: false,
                        data: JSON.stringify({
                            code: code,
                            belongTo: params.belongTo
                        }),
                        success: function (data, isError) {
                            if (data.msg == "重复CODE请求" || data.httpCode == 409) {
                                var tempHref = location.href;
                                tempHref = self.delQueStr(tempHref, 'code');
                                tempHref = self.delQueStr(tempHref, 'state');
                                var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + self.appid + '&redirect_uri=' + encodeURIComponent(tempHref) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
                                // location.href=url;
                                window.location.replace(url);
                                return;
                            }

                            if (data.httpCode != 200) {
                                $.layerMsg(data.msg)
                                return;
                            }

                            if (!data.data.openId) {
                                $.layerMsg('openId获取异常');
                                return;
                            }
                            sessionStorage[self.appid] = data.data.openId;
                        }
                    })
                    // $.ajaxPackage({
                    //     url: "/uc/login/api/getOpenid",
                    //     contentType: "application/json",
                    //     async: true,
                    //     data: JSON.stringify({
                    //         code:code,
                    //         belongTo:params.belongTo
                    //     }),

                    // });
                }
            } else {
                var tempHref = location.href;
                tempHref = this.delQueStr(tempHref, 'code');
                tempHref = this.delQueStr(tempHref, 'state');
                var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + self.appid + '&redirect_uri=' + encodeURIComponent(tempHref) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
                // location.href=url;
                window.location.replace(url);
            }
        }
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
            if (this.isAL() && window.location.hash.split("?").length > 1) {
                return "";
            }
            return window.location.hash;
        }
        return "";
    },
    funcUrlDel: function (name) {
        var loca = window.location;
        var baseUrl = loca.origin + loca.pathname + "?";
        var query = loca.search.substr(1);
        if (query.indexOf(name) > -1) {
            var obj = {}
            var arr = query.split("&");
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].split("=");
                obj[arr[i][0]] = arr[i][1];
            };
            delete obj[name];
            var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
            return url
        } else {
            return window.location.href;
        };
    }


}