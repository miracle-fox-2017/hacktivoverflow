import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

// const http = axios.create({
//   baseUrl: 'http://localhost:3000'
// })

Vue.use(Vuex)

const state = {
  question: []
}

const mutations = {
}

const actions = {
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
