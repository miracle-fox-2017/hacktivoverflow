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
      state.questions.push(payload)
      console.log('inMutation ', payload)
    }
  },
  actions: {
    getAllQuestions (context) {
      http.get('/questions')
      .then(({data}) => {
        console.log(data)
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
        console.log('inAction ', data)
      })
    }
  }
})

export default store
