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
  username: '',
  email: '',
  id: ''
}

const mutations = {
  saveUser (state, payload ) {
    state.username = payload.username
    state.email = payload.email
    state.id = payload.id
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
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
