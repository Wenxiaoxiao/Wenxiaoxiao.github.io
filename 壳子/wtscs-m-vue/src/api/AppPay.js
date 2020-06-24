/**
 * Created by Administrator on 2019-11-12
 * 李强
 */
import {tools} from '@static/js/wtsTools.esm.min.js' //工具
import http from '@/api/httpList.js' //ajax请求
import popup from '@/api/popup.js' //弹窗

function AppPay() {}
AppPay.prototype = {
  constructor: AppPay,
  init: function (options, callBack) {
    this.callBack = callBack;
    this.initData = { //初始参数
      orderId: '', //订单号
      payWay: "", //支付方式
      orderType: "", //支付类型
      wxOrderType: "", //微信支付类型
      paySuccessUrl: "", //支付结果页
      payErrorUrl: "", //支付失败页
    };
    this.result = {
      code: 0, //0-支付失败，1-支付成功
      msg: '', //错误信息
    }
    this.initData = Object.assign(this.initData, options);
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
    var config = {
      "tradeNo": self.initData.orderId,
      "orderType": self.initData.orderType,
    }
    http.getHttp({
        name: "wx_appPay",
        params: config
      },
      (data, isError) => {
        console.log(data, isError);
        if (!isError) {
          self.success(0, '支付失败,请尝试重新支付!错误码：' + data.msg);
          return;
        }
        var ask;
        setTimeout(function () {
          ask = popup.inquiry('是否已完成支付？', ['确认', '取消'], function () {
            self.success(1)
          }, function () {
            layer.close(ask);
            self.success(-1, '取消支付');
          })
        }, 2000);
        // 用订单号查是否支付成功
        var appPayList = data.data;
        nativeApp.general.deviceready(function(){
          nativeApp.weixin.wxPay(appPayList, function (result) {
            layer.close(ask);
            result = result?JSON.parse(result):{};
            if (result.code == 0) {
              self.success(1);
            } else {
              self.success(0, "支付失败");
            }
          });
        })
      }
    );
  },

  //支付宝支付
  aliPay: function () {
    var self = this;
    var config = {
      "tradeNo": self.initData.orderId,
      "orderType": self.initData.orderType,
    }
    http.getHttp({
        name: "ali_appPay",
        params: config
      },
      (data, isError) => {
        if (!isError) {
          self.success(0, '支付失败,请尝试重新支付!错误码：' + data.msg);
          return;
        }
        var ask;
        setTimeout(function () {
          ask = popup.inquiry('是否已完成支付？', ['确认', '取消'], function () {
            self.success(1)
          }, function () {
            layer.close(ask);
            self.success(-1, '取消支付');
          })
        }, 2000);
        //拉起支付宝
        nativeApp.general.deviceready(function(){
          nativeApp.aliPay.aliPay(data.data, function (result) {
            layer.close(ask);
            result = result?JSON.parse(result):{};
            if (result.code == 0) {
              self.success(1);
            } else {
              self.success(0, "支付失败");
            }
          })
        });
      }
    );
  },
   //银联支付
   unionPay: function () {
    var target = 'https://' + window.location.host + '/pay/chinapay/web?tradeNo=' +
      this.initData.orderId + "&orderType=" + this.initData.orderType;
      nativeApp.general.deviceready(function () {
        nativeApp.general.router({url:"wts://specialWeb?url="+encodeURIComponent(target)});
      })
  },
  success: function (code, msg) {
    if (code == 1) {
      window.location.replace(this.initData.paySuccessUrl);
      return;
    }
    this.callBack({
      code: code,
      msg: msg
    })
  },
};
export default AppPay;
