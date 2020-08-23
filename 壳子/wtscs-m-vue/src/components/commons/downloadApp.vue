<template>
<div class="show-box" v-show="load">
    <div class="layer-app">
        <img src="static/images/app-download.png" alt="" class="downloadImg">
        <p>长按扫一扫下载app</p>
        <p>获取更多服务</p>
    </div>
    <div class="shadeBac" @click="close()"></div>
</div>
</template>

<script>
export default {
  data() {
    return {
      load: false
    };
  },
  props: ["showAppDown"],
  computed: {},
  methods: {
      close(){
        //   this.load=false;
          this.$emit('showBack', false);
      }
  },
  watch: {
    showAppDown(newVal) {
      console.log(newVal);
      this.load = newVal;
    }
  }
};
</script>

<style lang="scss">
.show-box {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
}
.shadeBac {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba($color: #000000, $alpha: 0.5);
}
.layer-app {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: #fff;
  width: 200px;
  padding: 10px;
  z-index: 2;
  .downloadImg {
    width: 100%;
  }
  p {
    line-height: 2;
    font-size: r(30);
    text-align: center;
  }
}
</style>