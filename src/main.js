import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
// import httpRequest from './utils/httpRequest' // api: https://github.com/axios/axios
// import axios from 'axios'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import {
  post,
  fetch,
  patch,
  put
} from './utils/https'
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.config.productionTip = false
// 挂载全局
// Vue.prototype.$http = httpRequest // ajax请求方法
new Vue({
  render: h => h(App),
  router
}).$mount('#app')