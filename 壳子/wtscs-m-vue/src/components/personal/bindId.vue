<template>
<div class="body-container binding bind-id" :class="show?'animated fadeInRight':'animated fadeOutLeft'" v-show="displays" id="bindIdDiv">
    <p class="lz-fs-30 policy-01 pol-02">保单认证 <span class="policy-btn-close" @click='close'>关闭</span></p>
    <div class="form-list">
        <div class="name">证件号</div>
        <div class="form-right"><input type="text" placeholder="请填写您的证件号" v-model="identifyNumber" class="input-check IdentifyNumber"/></div>
    </div>
    <div class="form-list">
        <div class="name">手机号码</div>
        <div class="form-right">
            <input type="tel" placeholder="中国+86" v-model="mobile" class="mobile input-check"/>
        </div>
    </div>
    <div class="form-list">
        <input type="number" class="verification input-check" placeholder="请输入手机验证码" v-model="verification"/>
        <button class="sentVerification" :disabled="veriTime==-1?false:true" @click="sentVerifi">{{veriTime==-1?'获取验证码':veriTime+'S'}}</button>
    </div>
    <button class="wts-btn-big margin-top-60 btn-id" @click='bindId'>下一步</button>
    <div class="bind-msg-head">
        <p class="bind-msg-cen">验证流程</p>
        <div class="bind-top-border">
            <p class="bind-msg-title "><span>1</span>证件号填写</p>
            <p class="bind-msg-content">输入购买保险时投保人证件号码</p>
            <p class="bind-msg-title"><span>2</span>手机号填写</p>
            <p class="bind-msg-content">输入购买保险时预留的投保人手机号</p>
            <p class="bind-msg-title"><span>3</span>获取验证码</p>
            <p class="bind-msg-content">获取并输入手机验证码</p>
            <p class="bind-msg-title"><span>4</span>完成提交</p>
        </div>
    </div>
</div>
</template>

<script>
var vm;
export default {
  props: {
    showBind:false
  },
  data: () => ({
    show:false,
    identifyNumber:'',//证件号
    mobile:'',//手机号
    verification:'',//验证码
    veriTime:-1,//倒计时
    timeCount:0,//倒计时间距
    displays:false,
  }),
  props: ["showBind"],
  computed: {},
  created(){
    vm=this;
  },
  methods: {
    bindId(){
      //调用绑定保单
      if(!this.mobile){
        return this.$popup.alert('您的手机号尚未填写！')
      }
      if(!this.$regulars.isPhone(this.mobile)){
        return this.$popup.alert('您填写的手机号格式不正确！')
      }
      if(!this.identifyNumber){
        return this.$popup.alert('您的证件号尚未填写！')
      }
      if(!this.$regulars.issfz(this.identifyNumber)){
        return this.$popup.alert('您填写的证件号格式不正确！')
      }
      if(!this.verification){
        return this.$popup.alert('您的验证码尚未填写！')
      }
      this.$http.getHttp(
        {
          name: 'P_bind_policy',
          header: 2,
          params: [
            {name:'policyholderIdentifyNumber',val:this.identifyNumber},
            {name:'sms',val:this.verification},
            {name:'policyholderMobile',val:this.mobile},
          ]
        },
        data => {
          console.log(data);
          vm.$popup.msg('绑定成功，2秒后返回保单列表！');
          setTimeout(function(){
            vm.close();
          },2000)
        }
      );
    },
    sentVerifi(){
      //发送验证码
      var self=this;
      if(!this.mobile){
        return this.$popup.alert('您的手机号填写为空！')
      }
      if(!this.$regulars.isPhone(this.mobile)){
        return this.$popup.alert('您填写的手机号格式不正确！')
      }
      if(this.compassTime()){
        return this.$popup.msg(this.timeCount+'S后才能再次发送验证码！')
      }
      this.$http.getHttp(
        {
          name: 'P_captext',
          header: 2,
          params: [{name:'phone',val:this.mobile}]
        },
        data => {
          console.log(data);
          self.$popup.msg('验证码已发送');
          sessionStorage.setItem('veriTime',(new Date()).getTime());
          vm.conutTime();
        }
      );
    },
    conutTime(){
      //倒计时
      vm.veriTime=120;
      var timer = setInterval(function () {
          vm.veriTime--;
          if (vm.veriTime < 0) {
              clearInterval(timer);
          } 
      }, 1000);
    },
    close(){
      this.$emit('bindHide', false);
    },
    compassTime(){
      //比较缓存中时间
      var local=sessionStorage.getItem('veriTime');
      if(!local)return false;
      var nowTime = (new Date()).getTime();
      var timeCount=Number((nowTime-local)/1000)
      console.log(timeCount);
      if(timeCount<120){
        this.timeCount=120-parseInt(timeCount)
        return true;
      }
      return false;
      
    }
  },
  watch: {
    showBind(newVal) {
      console.log(newVal);
      this.show = newVal;
      this.displays=true;
    }
  }
};
</script>

<style lang="scss">
 //绑定信息页
.binding {
  height: 100vh;
  background-color: #efeff4;
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .binding-top-text {
    @include remCalc(font-size, 30);
    text-align: left;
    @include remCalc(line-height, 40);
    background-color: $bg-color-ff6e06;
    color: #fff;
    @include remCalc(padding, 10, 20);
  }
  .read-inform {
    @include remCalc(padding, 0, 30);
    @include remCalc(font-size, 28);
    @include remCalc(height, 82);
    @include remCalc(line-height, 82);
    color: #888;

  }
  .form-list {
    width: 100%;
    background: #fff;
    @include remCalc(padding, 0, 30);
    @include remCalc(height, 90);
    @include remCalc(line-height, 90);
    border-bottom: 1px solid #efeff4;
    @include remCalc(font-size, 34);
    overflow: hidden;
    
    .name,.name-img {
      width: 25%;
      float: left;
      height: 100%;
      position: relative;
      p{
        font-size: 12px;
        height: 40%;
        line-height: 1.2;
      }
      img{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 90%;
        display: block;
        transform: translateX(-50%) translateY(-50%);
      }
    }
    .name-img{
      width: 35%;
      float: left;
      height: 100%;
    }
    .form-right,.form-right-img {
      width: 75%;
      float: left;
      height: 98%;
    }
    .form-right-img{
      width: 65%;
    }
    input[type="text"], input[type="number"], input[type="tel"] {
      border: none;
      width: 100%;
      height: 98%;
      color: #000;
      padding: 0;
      margin: 0;
      font-size: r(30);
    }
    input[type="tel"] {
      float: left;
    }
    input[type="radio"] {
      padding: 0;
      margin: 0;
      margin-right: 10px;
    }
    input.verification {
      width: 50%;
      float: left;
    }
    .sentVerification {
      float: right;
      width: 45%;
      height: r(90);
      @include remCalc(line-height, 90);
      text-align: center;
      color: $bg-color-ff6e06;
      border-left: 1px solid #efeff4;
      background-color: #fff;
    }

  }
  .bind-msg-head {
    margin-top: r(50);
    padding: r(30);
    position: relative;
    .bind-msg-cen {
      text-align: center;
      font-size: r(36);
      color: #000;
      position: absolute;
      top: 0;
      left: r(280);
      width: r(180);
      background: #efeff4;
    }
    .bind-top-border {
      border-top: 1px solid #ddd;
      padding-top: r(30);
    }
    .bind-msg-title {
      padding-left: r(42);
      font-size: r(30);
      color: #000;
      line-height: 1.8;
      position: relative;
      span {
        position: absolute;
        font-size: r(30);
        left: 0;
        display: inline-block;
        width: r(35);
        height: r(35);
        border-radius: 50%;
        background: #fa9352;
        color: #fff;
        top: 5px;
        text-align: center;
        line-height: r(32);
      }
    }

    .bind-msg-content {
      padding-left: r(42);
      font-size: r(28);
      color: #999;
      line-height: 1.5;
    }

  }
}

.bind-id {
  z-index: 555;
  position: fixed;
  left: 50%;
  margin-left: r(-375);
  top: 0;
  
}

.bind-mobile {
  z-index: 444;
  position: fixed;
  left: 50%;
  margin-left: r(-375);
  top: 0;
}

</style>