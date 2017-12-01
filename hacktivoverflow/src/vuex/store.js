import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import VueFire from 'vuefire'
import firebase from 'firebase'

Vue.use(Vuex)
Vue.use(VueFire)

let config = {
  apiKey: 'AIzaSyA8M-l_dP6_Jz3rK2GOaWifHzHFbsS-RL0',
  authDomain: 'h8-overflow.firebaseapp.com',
  databaseURL: 'https://h8-overflow.firebaseio.com',
  projectId: 'h8-overflow',
  storageBucket: '',
  messagingSenderId: '146128308394'
}

const firebaseApp = firebase.initializeApp(config)
Vue.prototype.$db = firebaseApp.database()

export default new Vuex.Store({
  state: {
    // nanti disini semua state nya
    something: ''
  },
  mutations,
  actions
})
