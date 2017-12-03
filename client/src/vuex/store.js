import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const http = axios.create(({
  baseURL: 'http://localhost:3000'
}))

Vue.use(Vuex)

const state = {
  users: []
}

const mutations = {
  setUsers (state, payload) {
    state.users = payload
  },
  saveUser (state, newUser) {
    state.users.push(newUser)
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
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store