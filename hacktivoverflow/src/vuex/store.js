import Vue from 'vue'
import Vuex from 'vuex'
import VueFirestore from 'vue-firestore'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)
Vue.use(VueFirestore)

export default new Vuex.Store({
  state: {
    questions: [],
    questionDetail: '',
    answers: [],
    userDetails: null
  },
  actions,
  mutations
})
