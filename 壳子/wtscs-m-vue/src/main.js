// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"

import Vue from 'vue/dist/vue.esm.js'
import App from './App'
import router from './router'
import rem from '@static/js/flexible.js' //rem转换
import http from '@/api/httpList.js' //ajax请求
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import {tools,regulars} from '@static/js/wtsTools.esm.min.js' //弹窗
import unit from '@/api/unit.js' //业务工具方法
import popup from '@/api/popup.js' //弹窗
import config from '@/api/common.js' //公共变量
import weixin from '@/extend/weixin' //微信方法
import title from 'vue-wechat-title' //标题更新
import filter from '@/api/filter.js' //公共过滤器
import VueLazyload from 'vue-lazyload' //图片懒加载


wtsLogin.init({ env: config.env }, function (e) {
  if(e){
    config.user = e;
    if(tools.getcookie('WTS_TOKEN_A')){
      config.token = tools.getcookie('WTS_TOKEN_A');
    }else{
      config.token = e.token;
    }
    initVue();
  }else{
    console.log(e);
    initVue();
  }
})

function initVue() {
  Vue.use(http)
  Vue.use(tools)
  Vue.use(regulars)
  Vue.use(MintUI);
  Vue.use(popup)
  Vue.use(filter)
  Vue.use(title)
  Vue.use(config)
  Vue.use(weixin)
  Vue.use(unit)


  Object.keys(filter).forEach(key => {
    Vue.filter(key, filter[key])
  })

  Vue.directive('title', {
    inserted: function (el, binding) {
      document.title = binding.value;
    },
    update: function (el, binding) {
      document.title = binding.value;
    }
  });
  // 将API方法绑定到全局
  Vue.prototype.$http = http;
  Vue.prototype.$tools = tools;
  Vue.prototype.$regulars = regulars;
  Vue.prototype.$popup = popup;
  Vue.prototype.$config = config;
  Vue.prototype.$weixin = weixin;
  Vue.prototype.$unit = unit;
  new Vue({
    el: '#app',
    router,
    components: {
      App
    },
    template: '<App/>'
  })

  Vue.use(VueLazyload, {
    preLoad: 1.5,
    error: require('static/images/reload.gif'),
    loading: require('static/images/timg.gif')
  })
}
