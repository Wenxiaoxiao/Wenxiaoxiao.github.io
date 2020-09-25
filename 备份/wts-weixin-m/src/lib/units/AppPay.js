/**
 * Created by Administrator on 2019-07-16
 * 郝兴来
 */
function AppPay() {}
AppPay.prototype = {
    constructor: AppPay,
    //支付授权
    init: function(options, callBack) {
        var self = this;
        this.callBack = callBack;
        this.initData = { //初始参数
            orderId: '', //订单号
            payWay: "", //支付方式
            orderType: "", //支付类型
            wxOrderType: "", //微信支付类型
            openId: "", //openId  微信内必填
            paySuccessUrl: "", //支付结果页
            payErrorUrl: "", //支付失败页
        };
        this.result = {
            code: 0, //0-支付失败，1-支付成功
            msg: '', //错误信息
        };
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
    wxPay: function() {
        var self = this;
        //微信公众号支付
        $.ajaxPackage({
            type: "get",
            url: "/pay/wechat/app",
            data: { "tradeNo": self.initData.orderId, "orderType": self.initData.wxOrderType || self.initData.orderType },
            dataType: 'json',
            success: function(data, isError) {
                if (!isError) {
                    self.success(0, '支付失败,请尝试重新支付!错误码：' + data.msg);
                    return;
                };
                var ask;
                setTimeout(function() {
                    ask = $.layerinquiry('是否已完成支付？', ['确认', '取消'], function() {
                        self.success(1)
                    }, function() {
                        layer.close(ask)
                        self.success(-1, '取消支付')
                    })
                }, 2000)
                // 用订单号查是否支付成功
                var appPayList = data.data;
                nativeApp.general.deviceready(function () {
                  nativeApp.weixin.wxPay(appPayList, function (result) {
                    layer.close(ask)
                    result = result?JSON.parse(result):{};
                    if (result.code == 0) {
                      self.success(1);
                    } else {
                      self.success(0, "支付失败");
                    }
                  });
                })
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                payFlag = true;
                console.log(textStatus);
            }
        });
    },
    //支付宝支付
    aliPay: function() {
        var self = this;
        $.ajaxPackage({
            type: "post",
            url: "/pay/alipay/app",
            data: { "tradeNo": self.initData.orderId, "orderType": self.initData.orderType },
            dataType: 'json',
            success: function(data, isError) {
                if (!isError) {
                    $.layerMsg('支付失败,请尝试重新支付!');
                    return;
                };

                if (data.httpCode != 200) {
                    $.layerMsg('支付失败,请尝试重新支付!');
                    return;
                }
                var ask;
                setTimeout(function() {
                    ask = $.layerinquiry('是否已完成支付？', ['确认', '取消'], function() {
                        self.success(1)
                    }, function() {
                        layer.close(ask)
                        self.success(-1, '取消支付')
                    })
                }, 2000)
                //拉起支付宝
                nativeApp.general.deviceready(function () {
                  nativeApp.aliPay.aliPay(data.data, function (result) {
                    layer.close(ask)
                    result = result?JSON.parse(result):{};
                    if (result.code == 0) {
                      self.success(1);
                    } else {
                      self.success(0, "支付失败");
                    }
                  });
                })
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    },
    //银联支付
    unionPay: function() {
        var target = window.location.origin + '/pay/chinapay/web?tradeNo=' + this.initData.orderId + "&orderType=" + this.initData.orderType;
        nativeApp.general.deviceready(function () {
            nativeApp.general.router({url:"wts://specialWeb?url="+encodeURIComponent(target)});
        })
    },
    success: function(code, msg) {
        if (code == 1) {
            window.location.replace(this.initData.paySuccessUrl)
            return;
        }
        this.result = {
            code: code,
            msg: msg
        }
        this.callBack(this.result)
    },

}
