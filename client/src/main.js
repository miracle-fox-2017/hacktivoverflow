// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import axios from 'axios'

Vue.config.productionTip = false
let url = "http://ec2-34-216-160-66.us-west-2.compute.amazonaws.com:3000"
let local =  'http://localhost:3000'

Vue.prototype.$http = axios.create({
  baseURL: url
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
