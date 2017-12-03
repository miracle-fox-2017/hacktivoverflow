/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { log } from 'util';


const http = axios.create({
  baseURL: 'http://localhost:4000'
})

Vue.use(Vuex)
const state = {
  questions: []
}

const mutations = {
  saveUser (state, payload ) {
    localStorage.setItem('username',payload.username)
    localStorage.setItem('email', payload.email)
    localStorage.setItem('id', payload.id)
  },
  setQuestions (state, payload) {
    state.questions = payload
  },
  setNewQuestion (state, payload) {
    console.log(payload, 'di set new')
    state.questions.push(payload)
  }

}

const actions = {
  signup ({ commit }, dataUser) {
    console.log(dataUser)
    http.post('/api/users', {
      username: dataUser.username,
      email: dataUser.email
    })
    .then(({ data }) => {
      let obj = {}
      obj.username = data.user.username
      obj.id = data.user._id
      obj.email = data.user.email
      commit('saveUser', obj)
    })
    .catch(err => console.error(err))
  },
  findByEmail ({ commit }, email) {
    http.get(`/api/users/${email}`)
    .then(({ data }) => {
      let obj = {}
      data.user.forEach(x => {
        obj.username = x.username
        obj.id = x._id
        obj.email = x.email
      })
      console.log(obj, 'finduser')
      commit('saveUser',  obj)
    })
    .catch(err => console.log(err))
  },
  getAllQuestions ({ commit }) {
    http.get('/api/questions')
    .then(({ data }) => {
      console.log(data)
      commit('setQuestions', data)
    })
    .catch(err => console.log(err))
  },
  postQuestionToDb ({ commit }, payload) {
    console.log(payload, 'post')
    let id = localStorage.getItem('id')
    http.post('/api/questions', {
      question: payload.message,
      tag: payload.tag,
      userId: id
    })
    .then(({ data }) => {
      commit('setNewQuestion', data)
      console.log(data, 'berhasil memasukan data')
    })
    .catch(err => console.log(err))
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
