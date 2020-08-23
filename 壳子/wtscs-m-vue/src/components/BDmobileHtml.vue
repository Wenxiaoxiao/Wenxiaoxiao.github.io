<template>
  <div class="userTellLogin lz-bg-fff">
    <!-- 顶部logo -->
    <div class="lz-logo-box">
      <div class="img-c-fff">
        <img class="img-c" src="static/images/icons.png" alt>
      </div>
      <p>梧桐树保险网</p>
    </div>
    <!-- 登录填写 -->
    <div class="input-container">
      <div class="userNum from-input">
         <img src="static/images/user-icon-tell.png" class="user-icon left" alt="">
        <input type="number" v-model="mobile"
         onkeypress="return event.keyCode>=48&&event.keyCode<=57"
        class="intoTell inputVals" placeholder="请输入手机号">
      </div>
      <div class="authCode from-input">
        <img src="static/images/user-icon-pass.png" class="user-icon left" alt="">
        <input type="number" v-model="code"
        onkeypress="return event.keyCode>=48&&event.keyCode<=57"
         class="intocaptch inputVals" placeholder="请输入验证码">
        <button
          @click="getCode"
          id="cendcaptch"
          class="fr getNum right"
          :class="isClick?'active':''"
        >{{codeVal}}</button>
      </div>
      <div class="code-info">收不到验证码？请拨打客服电话<a href="tel://400-9955-788">400-9955-788</a></div>
      <a href="javascript:;" @click="submit" id="login" class="loginBtn">登录</a>
    </div>
    <app-loading :loaded="loaded"></app-loading>
  </div>
</template>
<script>
import loading from "@/components/commons/loading";

//当前实例组件
var that = null;
export default {
  data: () => ({
    mobile: "",
    code: "",
    isClick: false,
    //加载开关
    loaded: false,
    s: null,
    countDown: 0,
    initcountDown: 60,
    codeVal: "获取验证码",
    redUrl: "",
    type: "1" //跳转方式  1  vue跳转  2.jq跳转
  }),
  components: {
    "app-loading": loading
  },

  mounted() {
    that = this;
    this.loaded = true;
    that.redUrl =
      that.$route.query.redUrl ||
      window.location.origin + window.location.pathname;
    if (that.$route.query.type) {
      that.type = that.$route.query.type;
    }

    if (this.$config.user && this.$config.user.id) {
      if (that.type == 1) {
        that.$router.replace({
          path: that.redUrl
        });
      } else {
        window.location.replace(that.redUrl);
      }
    }
  },
  methods: {
    initCode() {
      that.countDown = that.initcountDown;
      that.isClick = false;
      that.codeVal = "获取验证码";
      clearInterval(that.s);
    },
    //获取验证码
    getCode: function() {
      if (that.isClick) {
        return;
      }
      var val = that.mobile;
      if (that.$tools.trim(val).length == 0) {
        return that.$popup.msg("请输入手机号");
      }

      if (!that.$regulars.isPhone(val)) {
        return that.$popup.msg("请输入正确的手机号");
      }
      that.countDown = that.initcountDown;
      that.codeVal = that.countDown + "S";
      that.isClick = true;

      that.s = setInterval(function() {
        if (that.countDown == 1) {
          that.initCode();
        } else {
          that.countDown--;
          that.codeVal = that.countDown + "S";
        }
      }, 1000);

      //获取验证码的请求
      that.$http.getHttp(
        {
          name: "getCodeNumber",
          url: "/captcha/send/captext?phone=" + val
        },
        data => {
          if (data.httpCode != 200) {
            that.initCode();
            return;
          }
        }
      );
    },

    //提交的点击事件
    submit() {
      var phone = that.$tools.trim(that.mobile);
      var code = that.code;
      if (phone.length == 0) return that.$popup.msg("请输入手机号");
      if (!that.$regulars.isPhone(phone))
        return that.$popup.msg("请输入正确的手机号");

      // var serverCode = "wx";
      var ajaxUrl = "/uc/login/api/h5phoneRegister";
      // if (that.$tools.isAL()) {
      //   serverCode = "zfb";
      //   ajaxUrl = "/uc/login/thirdPhoneRegister";
      // }

      if(that.$tools.isWeiXin() || that.$tools.isAL()){
        ajaxUrl = "/uc/login/phoneRegister";
      }

      if (that.code.length == 0) return that.$popup.msg("请输入验证码");
      //绑定手机号

      //加载动画
      var load = that.$popup.loading("正在绑定手机号...");

      that.$http.getHttp(
        {
          name: "bindingMobile",
          url: ajaxUrl,
          params: {
            phone,
            // serverCode,
            captch: code
            // openid: that.$config.user.openid,
            // unionid: that.$config.user.unionid
          }
        },
        data => {
          that.$popup.close(load);
          if (data.httpCode != 200) {
            return;
          }
          that.initCode();
          that.$config.user = data.data;
          sessionStorage.setItem("WTS_USER_3",JSON.stringify(data.data));
          that.$popup.msg("验证成功");

          if (that.type == 1) {
            that.$router.replace({
              path: that.redUrl
            });
          } else {
            location.replace(that.redUrl)
          }
        }
      );
    }
  },
  destroyed(){
    this.initCode();
  }
};
</script>
<style lang="scss">
.userTellLogin {
  padding: r(30);
  min-height: 100vh;
  background: url(~@/user-tell-bg.jpg) no-repeat top center;
  background-size: contain;
  .lz-logo-box {
   padding: r(50) 0;
    .img-c-fff{
      background-color: #fff;
      width: r(150);
      height: r(150);
      margin: 0 auto;
      border-radius: 50%;
      padding: r(10);
      >img{
        width: r(130);
        height: r(130);
        display: block;
        margin: 0 auto;;
      }
    }
    >p {
        padding-top: r(15);
        font-size: r(40);
        text-align: center;
        font-weight: 900;
        color: #fff;
    }
    #version {
        padding-top: (20);
        text-align: center;
        font-size: r(30)
    }
  }
  .input-container {
    padding: r(56) r(30) 0;
    background-color: #fff;
    min-height: r(700);
    border-radius: 5px;
    .from-input {
        height: r(120);
        color: #999;
        position: relative;
        font-size: r(30);
        .user-icon{
           position: absolute;
           width: r(48);
           top: 50%;
           transform:translateY(-50%);
        }
        .eye {
            color: #e50011;
            right: r(10);
        }
        >input {
            border: none;
            width: 100%;
            display: block;
            padding: 0 r(60);
            margin: 0;
            line-height: r(120);
            height: r(120);
            font-size: r(30);
            border-bottom: 1px solid #dfdfdf;
        }
    }
    .authCode {
      > input {
        padding-right: r(210);
      }
      .getNum {
        position: absolute;
        font-size: r(38);
        color: #000;
        background-color: #fff;
        top: 50%;
        transform:translateY(-50%);
        right: 0;
        font-size: r(28);
        width: r(180);
        height: r(60);
        line-height: r(60);
        color: $baseColor;
        text-align: center;
        border:0;
        &.active {
          background-color: #999;
          color: #fff;
        }
      }
    }
    .extend-box {
      height: r(100);
      line-height: r(100);
      > a {
        color: #787878;
        font-size: r(28);
      }
    }
  }
  .loginBtn {
    color: #fff;
    display: block;
    height: r(90);
    line-height: r(90);
    text-align: center;
    font-size: r(34);
    margin-top: r(90);
    background-color: #4581f6;
    border-radius: 5px;
  }
  .code-info {
    font-size: r(28);
    color: #999;
    margin-top: r(20);
    a {
      color: #0084ff;
      margin-left: 1px;
    }
  }
}
</style>
