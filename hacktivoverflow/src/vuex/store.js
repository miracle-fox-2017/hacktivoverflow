import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const http = axios.create({
  baseUrl: 'http://localhost:3000'
})

Vue.use(Vuex)

const state = {
  questions: [],
  question: {},
  comments: []
}

const mutations = {
  setQuestions (state, payload) {
    console.log('data di mutations sebagai paylload', payload)
    state.questions = payload
  },
  setQuestion (state, payload) {
    state.question = payload
  },
  getQuestion (state, payload) {
    state.questions.push(payload[0])
  },
  setComments (state, payload) {
    state.comments = payload
  },
  getComment (state, payload) {
    state.comments.push(payload[0])
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
      // console.log(dta)
      commit('setQuestion', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  postQuestion ({ commit }, payload) {
    console.log(payload)
    http.post(`http://localhost:3000/api/questions/create`, payload)
    .then(({data}) => {
      commit('getQuestion', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  getAllComments ({ commit }) {
    http.get('http://localhost:3000/api/comments/list')
    .then(({data}) => {
      commit('setComments', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  postComment ({ commit }, payload) {
    console.log(payload)
    // http.post('http://localhost:3000/api/comments/add', payload)
    // .then(({data}) => {
    //   commit('getComment', data)
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }

}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store