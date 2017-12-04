import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const http = axios.create(({
  baseURL: 'http://localhost:3000'
}))

Vue.use(Vuex)

const state = {
  users: [],
  questions: [],
  login: '',
  question: ''
}

const mutations = {
  setUsers (state, payload) {
    state.users = payload
  },
  saveUser (state, newUser) {
    state.users.push(newUser)
  },
  setLogin (state, payload) {
    state.login = payload
  },
  setQuestions (state, payload) {
    state.questions = payload
  },
  saveQuestion (state, newQuestion) {
    state.questions.push(newQuestion)
  },
  clearLogin (state) {
    state.login = ''
  },
  setQuestionDetail (state, detailQuestion) {
    // console.log(detailQuestion)
    state.question = detailQuestion
  }
}

const actions = {
  allUsers ({ commit }) {
    http.get('/users')
    .then(({data}) => {
      console.log(data)
      commit('setUsers', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  registerUser ({ commit }, newUser) {
    // console.log('INI DARI NEW USER', newUser)
    http.post('/register', newUser)
    .then(({ data }) => {
      // console.log('HASIL SIMPAN', data.data)
      commit('saveUser', data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  checkLogin ({ commit }, loginUser) {
    http.post('/login', loginUser)
    .then(( {data} ) => {
      console.log(data)
      // let parsingData = JSON.stringify(data)
      // console.log(parsingData)
      localStorage.setItem('token', JSON.stringify(data))
      commit('setLogin', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  allQuestions ({ commit }) {
    http.get('/questions')
    .then(({data}) => {
      commit('setQuestions', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  createQuestion ({ commit }, newQuestion) {
    http.post('/questions', newQuestion,{
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({ data }) => {
      console.log(data)
      commit('saveQuestion', data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  clearSession ({ commit }) {
    commit('clearLogin')
  },
  detailQuestion ({ commit }, id) {
    console.log('MASUK ACTION')
    http.get(`/questions/${id}`)
    .then(({data}) => {
      // console.log(data)
      commit('setQuestionDetail',data)
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