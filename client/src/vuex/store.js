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
    }
  },
  actions: {
    getAllQuestions: (context, payload) => {
      http.get(`/questions`)
      .then(({ data }) => {
        context.commit('setQuestions', data)
      })
      .catch(err => console.error(err))
    }
  }
})

export default store
