<template>
  <div v-show="showmask" class="callPhoneContent">
    <div class="callPhoneMask"></div>
    <div class="callPhoneInfo">
      <div class="title">温馨提示</div>
      <div class="content">{{text}}</div>
      <div class="btn">
        <a @click="hideMask" class="cel" href="javascript:;">取消</a>
        <a @click="hideMask" cless="center" :href="phone">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["phone", "text"],
  data() {
    return {
        showmask:false
    };
  },
  methods: {
      hideMask(){
          this.showmask = false;
      },
      showMask(){
          this.showmask = true;
      }
  },
  mounted: function() {}
};
</script>

<style lang="scss">
.callPhoneContent {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  .callPhoneMask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
  .callPhoneInfo {
    position: absolute;
    text-align: center;
    border-radius: r(10);
    width: r(540);
    background: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: r(30);
    .title {
      color: #000;
      font-size: r(33);
      font-weight: 900;
    }

    .content{
        padding-top: r(20);
        font-size: r(30);
    }
    .btn{
        margin-top: r(20);
        a{
            display: inline-block;
            color: #626262;
            font-size: r(30);
            width: r(230);
            height: r(80);
            line-height: r(80);
            text-align: center;
            background: #dedede;
            border-radius: r(10);
            &.cel{
                background: #4580f6;
                color: #fff;
                margin-right: r(10);
            }
        }
    }
  }
}
</style>