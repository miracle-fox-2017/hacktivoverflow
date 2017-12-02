import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const http = axios.create({baseURL: 'http://localhost:3000'})
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    questions: []
  },
  mutations: {
    setQuestions (state, payload) {
      state.questions = payload
      console.log('mutations ', payload)
    }
  },
  actions: {
    getAllQuestions (context) {
      http.get('/questions')
      .then(({data}) => {
        context.commit('setQuestions', data)
        console.log('actions ', data)
      })
      .catch(err => console.log(err))
    }
  }
})

export default store
