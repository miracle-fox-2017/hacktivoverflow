// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import axios from 'axios'

// const rootUrl = "http://35.186.144.106:3002";
const rootUrl = "http://ec2-34-216-77-179.us-west-2.compute.amazonaws.com";

Vue.prototype.$http = axios.create({
  baseURL: rootUrl
})

Vue.prototype.$findIndexByValue = (array, key, valueSearch) => {
	let result = null;

	array.forEach( function(item, index) {
		if (item[key] === valueSearch) {
			result = index;
		}
	});

	return result;
}


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
