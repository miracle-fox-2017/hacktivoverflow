// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
/* eslint-disable */
import axios from 'axios'
import swal from 'sweetalert2'

const axiosConfig = {
  baseURL: 'http://localhost:3000/',
  timeout: 30000,
}

Vue.prototype.$http = axios.create(axiosConfig)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
