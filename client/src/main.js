// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }]*/
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import firebase from 'firebase'

Vue.config.productionTip = false

let app;
var config = {
  apiKey: "AIzaSyA6tkCsALPbiLlw038YHJ0izByVMcNgwU8",
  authDomain: "vue-project-1a9b9.firebaseapp.com",
  databaseURL: "https://vue-project-1a9b9.firebaseio.com",
  projectId: "vue-project-1a9b9",
  storageBucket: "vue-project-1a9b9.appspot.com",
  messagingSenderId: "889735417412"
}
firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    /* eslint-disable no-new */
  app = new Vue({
      el: '#app',
      store,
      router,
      template: '<App/>',
      components: { App }
    })
  }
})


