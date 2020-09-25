<template>
  <div id="app" class="body-container">
    <keep-alive max="3">
    <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title"/>
  </div>
</template>

<script>
require('static/css/animate.min.css')
require('static/iconfont/iconfont.css')
import Vconsole from 'vconsole'
// import wtsTools from 'static/js/wtsTools.1.0.esm'
// var wtsTools=require('static/js/wtsTools.1.0.js');
export default {
  name: 'App',
  mounted() {
    if(this.$config.env == 0 || this.$route.query.console){
        const vConsole = new Vconsole();
    }
    setTimeout(()=>{
      var loading=document.getElementById('lz_loading');
      loading.style.display = 'none';
    },100)
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      
    }
  },
}
</script>
<style lang="scss">
  @import '~@/sass/main';
  #app {
    width: 100%;
    max-width: 10rem;
    min-height: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
</style>
