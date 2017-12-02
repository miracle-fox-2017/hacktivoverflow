/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import firebase, { database } from 'firebase'

const http = axios.create({
  baseURL: 'http://localhost:4000'
})

Vue.use(Vuex)
const state = {
  username: '',
  email: '',
  password: ''
}

const mutations = {
  saveUser (state, payload) {
    console.log(payload)
    state.username = payload.user.username
    state.email = payload.user.email
    state.password = payload.user.password
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
      console.log('data hasil submit', data)
      commit('saveUser', data)
    })
    .catch(err => console.error(err))
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
