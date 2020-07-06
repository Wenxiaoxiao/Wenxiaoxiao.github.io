import Vue from 'vue'
import App from './App'
import notice from './api/notice'
import http from './api/http'
import tools from './api/tools'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(http)
Vue.use(notice)
Vue.use(tools)

Vue.prototype.$http = http.wxRequest;
Vue.prototype.$notice = notice;
Vue.prototype.$tools = tools;

const app = new Vue({
    ...App
})
app.$mount()
