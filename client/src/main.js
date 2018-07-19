// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueBlu from 'vue-blu'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import 'vue-blu/dist/css/vue-blu.min.css'
import store from './vuex/store'


Vue.use(VueBlu)
// Vue.use(Buefy)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
