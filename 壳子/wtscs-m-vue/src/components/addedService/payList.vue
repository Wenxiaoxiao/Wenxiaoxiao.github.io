<template>
  <div class="pay-list">
    <div class="pay-li">
      <img src="/static/images/pay/wx-pay.png" alt class="payImg" />
      <span class="name">微信</span>
      <input type="radio" class="lz-radio" name="pay" checked value="1" @click="check(1)" />
    </div>
    <div class="pay-li">
      <img src="/static/images/pay/zfb-pay.png" alt class="payImg" />
      <span class="name">支付宝</span>
      <input type="radio" class="lz-radio" name="pay" value="2" @click="check(2)" />
    </div>
    <div class="pay-li">
      <img src="/static/images/pay/yinlian.png" alt class="payImg" />
      <span class="name">银联</span>
      <input type="radio" class="lz-radio" name="pay" value="4" @click="check(4)" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      check(value) {
        this.$emit("check", value);
      }
    };
  },
  computed: {},
  methods: {},
  created(){
    this.check(1);
  }
};
</script>

<style lang="scss">
.pay-list {
  width: 100%;
  background-color: #fff;
  padding: 0 r(20);
  margin-bottom: r(20);
  .pay-li {
    border-bottom: 1px solid #f9f9f9;
    font-size: r(30);
    line-height: r(90);
    height: r(90);
    position: relative;
    &:last-child {
      border-bottom: none;
    }
  }
  .payImg {
    width: r(50);
    height: r(50);
    vertical-align: middle;
    margin-right: 5px;
    position: relative;
    top: -2px;
  }
  .lz-radio {
    position: absolute;
    right: r(10);
    top: 50%;
    margin-top: -9px;
  }
}
</style>
