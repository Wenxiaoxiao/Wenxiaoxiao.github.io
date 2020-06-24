/*! nativeApp -v1.0 原生与H5交互相关 created By 李强 develop by 李强 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.nativeApp = factory());
}(this, (function () { 'use strict';

/**
 * app
 * 核心全局app方法
 */
var app = {
    user: {
        //获取app相关用户信息
        getUserInfo: function getUserInfo(success) {
            navigator.user.getUserInfo(success);
        },
        //通知app退出登录
        loginOut: function loginOut(success) {
            navigator.user.loginOut(success);
        }

    },

    weixin: {
        /**主动拉起微信分享*
         * params:{
                type (类型 "WX/XCX")
                link (分享页面链接)
                title (标题)
                content (内容)
                logo (图片)
                userName (小程序appid)
                path (小程序打开路径)
            }
         * **/
        wxShare: function wxShare(params, success, fail) {
            navigator.weixin.wxShare(params, success, fail);
        },
        /**初始化微信分享*
        * params:{
               type (类型 "WX/XCX")
               link (分享页面链接)
               title (标题)
               content (内容)
               logo (图片)
               userName (小程序appid)
               path (小程序打开路径)
           }
        * **/
        initWxShare: function initWxShare(params, success, fail) {
            navigator.weixin.initWxShare(params, success, fail);
        },
        /**微信支付*
         * params:{
                appid (微信appid)
                partnerid (微信商户id)
                prepayid (订单id)
                package (财付通文档填写的数据和签名微信开放平台文档对数据做的签名)
                timestamp (时间戳)
                sign (签名)
                noncestr (随机串)
            }
         * **/
        wxPay: function wxPay(params, success, fail) {
            navigator.weixin.wxPay(params, success, fail);
        },
        /**打开微信小程序*
         * params:{
                userName (小程序appid)
                path (小程序页面路径)
                miniProgramType (小程序类型 0:正式版  1:开发版  2:体验版)
            }
         * **/
        openMiniProgram: function openMiniProgram(params, success, fail) {
            navigator.weixin.openMiniProgram(params, success, fail);
        }
    },

    aliPay: {
        /**主动拉起支付宝支付*
        * params:{
               orderInfo (后台请求获取支付宝支付相关的字符串信息)
           }
        * **/
        aliPay: function aliPay(params, success, fail) {
            navigator.aliPay.aliPay(params, success, fail);
        }
    },

    general: {
        /**打开app内置页面*
         * params:{
                url (页面路径)
                title (页面标题  可选参数)
            }
         * **/
        router: function router(params, success, fail) {
            navigator.general.router(params, success, fail);
        },
        /**pdf预览*
         * params:{
                url (pdf链接)
                title (页面标题  可选参数)
            }
         * **/
        readPdf: function readPdf(params, success, fail) {
            navigator.general.readPdf(params, success, fail);
        },
        /**下载图片*
         * params:{
                url (图片链接)
                title (页面标题  可选参数)
            }
         * **/
        downloadImage: function downloadImage(params, success, fail) {
            navigator.general.downloadImage(params, success, fail);
        },
        /**设备初始化*
         *callback
         * **/
        deviceready: function deviceready(callback) {
            document.addEventListener('deviceready', function () {
                callback();
            }, false);
        }
    }
};

return app;

})));
/* nativeApp 欢迎来到梧桐树保险网 https://www.wts999.com/ */
//# sourceMappingURL=nativeApp.js.map
