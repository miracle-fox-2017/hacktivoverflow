import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  questions: [],
  question: ''
}

const mutations = {
  saveNewQuestion: function (state, payload) {
    state.questions.push(payload)
    // this.$http.
  },
  saveQuestions: function (state, payload) {
    state.questions = payload
  },
  saveQuestion: function (state, payload) {
    state.question = payload
  }
}

const actions = {
  addQuestion: function ({ commit }, newQuestion) {
    commit('saveNewQuestion', newQuestion)
  },
  getQuestions: function ({ commit }) {
    axios.get('http://localhost:3000/api/question')
    .then(({ data }) => {
      commit('saveQuestions', data.questions)
    })
    .catch(err => {
      console.log(err)
    })
  },
  getQuestion: function ({ commit }, questionId) {
    axios.get('http://localhost:3000/api/question/' + questionId)
    .then(({ data }) => {
      commit('saveQuestion', data.question)
    })
    .catch(err => {
      console.log(err)
    })
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
