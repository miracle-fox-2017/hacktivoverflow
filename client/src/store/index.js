import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    questions: [],
    answers: [],
    myQuestions: [],
    formQuestion: {
      title: '',
      question: ''
    },
    users: []
  },
  mutations,
  actions
})

export default store
