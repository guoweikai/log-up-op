/*
 * @Date: 2020-07-13 07:22:31
 * @LastEditors: GWK
 * @LastEditTime: 2020-07-13 20:54:24
 * @FilePath: /log-upload/src/main.js
 */ 
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
// axios.defaults.baseURL ="http://10.60.129.3:30008"
// axios.defaults.baseURL = "http://rtc-fs.linkv.fun"
Vue.use(VueAxios, axios)
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
