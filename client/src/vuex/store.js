import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

const http = axios.create({baseURL: 'http://localhost:3000'})
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    questions: []
  },
  mutations: {
    setQuestions (state, payload) {
      state.questions = payload
    },
    saveNewQuestion (state, payload) {
      state.questions.unshift(payload)
    }
  },
  actions: {
    getAllQuestions (context) {
      http.get('/questions')
      .then(({data}) => {
        context.commit('setQuestions', data)
      })
      .catch(err => console.log(err))
    },
    postNewQuestion (context, newQuestion) {
      http.post('/questions', newQuestion, {
        headers: {
          accesstoken: localStorage.getItem('accesstoken')
        }
      })
      .then(({data}) => {
        context.commit('saveNewQuestion', data)
        router.push('/')
      })
    }
  }
})

export default store
