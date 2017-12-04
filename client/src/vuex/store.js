import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

// new Vuex.Store({
const store = new Vuex.Store({
  state: {
    questions: []
  },
  getters: {
    questions: state => state.questions
  },
  mutations: {
    setQuestions: (state, payload) => {
      state.questions = payload
    },
    setNewQuestion: (state, payload) => {
      state.questions.push(payload)
    }
  },
  actions: {
    getAllQuestions: ({ commit }) => {
      http.get(`/questions`)
      .then(({ data }) => {
        commit('setQuestions', data)
      })
      .catch(err => console.error(err))
    },
    addQuestion: ({ commit }, payload) => {
      http.post('/questions', payload, {headers: {token: localStorage.getItem('token')}})
      .then(({ data }) => {
        // console.log(response);
        commit('setNewQuestion', data)
      })
      .catch(err => console.log(err))
    }
  }
})

export default store
