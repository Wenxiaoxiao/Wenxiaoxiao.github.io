
/**
 * Created by Administrator on 2019-07-16
 * 郝兴来
 */
import {tools} from '@static/js/wtsTools.esm.min.js' //工具
import http from '@/api/httpList.js' //ajax请求
import popup from '@/api/popup.js' //弹窗

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
    //微信公众号支付
    if (tools.isWeiXin()) {
      //获取微信的openid
      var payOpenId = localStorage.payOpenId
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
    http.getHttp(
      {
        name: "wechat_jsapi",
        params: config
      },
      (data, isError) => {
        if (!isError) {
          self.success(0, '接口报错' + data.msg);
          return;
        }
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
      }
    );
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
    var appid = params.appid ? params.appid : 'wx348659a6e11cb40b';
    var payOpenId = localStorage.payOpenId;
    if (tools.isWeiXin() && !payOpenId) {
      var code = tools.getQueryString('code');
      if (code) {

        http.getHttp(
          {
            name: "wechat_getOpenid",
            params: {
              code: code,
              belongTo: params.belongTo
            }
          },
          (data,isError) => {
            if (!isError) {
              return;
            }
            if (!data.data.openId) {
              popup.msg('openId获取异常');
              return;
            }
            localStorage.payOpenId = data.data.openId;
          }
        );
      } else {

        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + encodeURIComponent(location.href) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
        console.log("wxlogin",url)
        location.href = url;
      }
    }

  }
};
export default H5Pay;
