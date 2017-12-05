import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const http = axios.create({
  baseUrl: 'http://localhost:3000'
})

Vue.use(Vuex)

const state = {
  questions: [],
  question: {}
}

const mutations = {
  setQuestions (state, payload) {
    console.log('data di mutations sebagai paylload', payload)
    state.questions = payload
  },
  setQuestion (state, payload) {
    state.question = payload
  }
}

const actions = {
  getAllQuestions ({ commit }) {
    http.get('http://localhost:3000/api/questions/list')
    .then(({data}) => {
      commit('setQuestions', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  getByIdQuestion ({ commit }, payload) {
    http.get(`http://localhost:3000/api/questions/getBy/${payload}`)
    .then(({data}) => {
      console.log('data di actions', data)
      commit('setQuestion', data)
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