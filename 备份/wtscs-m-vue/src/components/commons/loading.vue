<template>
<!--页面加载动画-->
<div v-show="!load" class="lz-readys">
    <div class="spinner">
        <div class="spinner-container container1">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
        </div>
        <div class="spinner-container container2">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
        </div>
        <div class="spinner-container container3">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
        load:false
    };
  },
  props: ["loaded"],
  computed: {},
  methods: {},
  mounted() {
      this.load= this.loaded;
  },
  watch: {
    loaded(newVal) {
      console.log('loaded:',newVal);
      this.load = newVal;
    }
  }
};
</script>

<style lang="scss">
//页面加载前动图

</style>