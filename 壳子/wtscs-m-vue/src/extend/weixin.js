import common from '../api/common'
import {tools} from '@static/js/wtsTools.esm.min.js' //工具
import httpList from '../api/httpList'
import popup from '../api/popup'
let weixin = (function () {
  return {
    default: {
      title: '梧桐树保险网—懂你，懂保险',
      desc: '梧桐树保险网一站式保险服务平台！网上买保险推荐选择，值得信赖！',
      href: common.api_root + "/index.html#/",
    },
    share: function (p,img) {
      //微信分享
      var param = p ? p : this.default;
      if(!p.href)param.href=location.href;
      var imgUrl=img?img:'https://bx.wts999.com/m/lib/images/logo-3.jpg';//默认图片
      // if(tools.isWtsNativeApp()){
      //   nativeApp.general.deviceready(function () {
      //       nativeApp.weixin.initShare({
      //           router:"wts://share?type=1&link="+encodeURIComponent(param.href)+"&title="+encodeURIComponent(param.title)+"&content="+encodeURIComponent(param.desc)+"&logo="+encodeURIComponent(imgUrl)
      //       })
      //   })
      //   return;
      // }
      console.log("p",p);
      if (!tools.isWeiXin()) return;
      this.getJssdk(function (data) {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: common.appId, // 必填，公众号的唯一标识
          timestamp: data.data.timeStamp, // 必填，生成签名的时间戳
          nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
          signature: data.data.signature, // 必填，签名，见附录1
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function () {
          //分享给朋友”及“分享到QQ”
          wx.updateAppMessageShareData({
            title: param.title,
            desc: param.desc,
            link: param.href,
            imgUrl: imgUrl,
            success: function () {
              //layer.msg('分享成功！');
            },
            cancel: function () {
              popup.msg('取消分享！');
            },
            fail: function (res) {
              // popup.alert(JSON.stringify(res));
            }
          });
          //分享到朋友圈”及“分享到QQ空间”
          wx.updateTimelineShareData({
            title: param.title,
            desc: param.desc,
            link: param.href,
            imgUrl: imgUrl,
            trigger: function (res) {
              // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
              //alert('发送成功');
            },
            success: function (res) {
              //layer.msg('已分享！');
            },
            cancel: function (res) {
              popup.msg('已取消！');
            },
            fail: function (res) {
              // popup.alert(JSON.stringify(res));
            }
          });
          //alert('已注册获取“发送给朋友”状态事件');
        });
        wx.error(function (res) {
          console.log(res);
        });
      })
    },
    hideMenu() {
      //隐藏微信地址栏自带工具栏
      if (!tools.isWeiXin()) return;
      this.getJssdk(function (data) {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: common.appId, // 必填，公众号的唯一标识
          timestamp: data.data.timeStamp, // 必填，生成签名的时间戳
          nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
          signature: data.data.signature, // 必填，签名，见附录1
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function () {
          wx.hideMenuItems({
            menuList: [
              'menuItem:share:timeline', // 复制链接
              'menuItem:share:appMessage', // 发送给朋友
              'menuItem:share:qq', // 分享到QQ
              'menuItem:share:weiboApp', // 分享到Weibo
              'menuItem:favorite', // 收藏
              'menuItem:share:facebook', // 分享到FB
              'menuItem:share:QZone', // 分享到 QQ 空间
              'menuItem:editTag', // 编辑标签
              'menuItem:delete', // 删除
              'menuItem:copyUrl', // 复制链接
              'menuItem:readMode', // 阅读模式:
              'menuItem:share:email', //邮件
            ],
            success: function (res) {
              console.log('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
            },
            fail: function (res) {
              alert(JSON.stringify(res));
            }
          });
        });

        wx.error(function (res) {
          console.log(res);
        });
      })
    },
    getJssdk: function (callback) {
      var url = location.href.split('#')[0];
      httpList.getHttp({
          name: "wx_getJssdk",
          header:2,
          params:[
           {
            name:'appid',
            val:common.appId
           },
           {
            name:'url',
            val:url
           },
          ]
        },
        (r, er) => {
          console.log(r);
          callback(r)
        }
      );
    }
  }
})()


export default weixin
