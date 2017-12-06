import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const http = axios.create({
  baseURL: `http://localhost:3000`
})

export default new Vuex.Store({
  state: {
    questions: [],
    detailQuestion: {},
    userQuestions: [],
    updatedQuestion: {}
  },
  mutations: {
    setAllQuestion (state, payload) {
      state.questions = payload
    },
    addNewQuestion (state, payload) {
      state.questions.push(payload)
    },
    setUserQuestions (state, payload) {
      state.userQuestions = payload
    },
    deleteUserQuestion (state, payload) {
      let deletedIndex = state.userQuestions.findIndex(element => {
        return element._id === payload
      })

      state.userQuestions.splice(deletedIndex, 1)
    },
    setUpdateUserQuestion (state, payload) {
      let updatedIndex = state.userQuestions.findIndex(element => {
        return element._id === payload
      })

      state.updatedQuestion = state.userQuestions[updatedIndex]
    }
  },
  actions: {
    getAllQuestion ({ commit }) {
      http.get('/api/questions')
      .then(({data}) => {
        commit('setAllQuestion', data)
      })
      .catch(err => console.error(err))
    },
    addQuestion ({ commit }, payload) {
      http.post('/api/questions', {
        title: payload.title,
        text: payload.text,
        category: payload.category
      }, {
        headers: {
          token: localStorage.getItem('tokenOverflow')
        }
      })
      .then(({data}) => {
        commit('addNewQuestion', data)
      })
      .catch(err => console.error(err))
    },
    getUserQuestions ({ commit }, payload) {
      http.get(`/api/questions/userquestion`, {
        headers: {
          token: payload
        }
      })
      .then(({data}) => {
        commit('setUserQuestions', data)
      })
      .catch(err => console.error(err))
    },
    deleteUserQuestion ({ commit }, payload) {
      http.delete(`/api/questions/${payload}`)
      .then(({data}) => {
        commit('deleteUserQuestion', data._id)
      })
    },
    updateQuestion ({ commit }, payload) {
      http.put(`/api/questions/${payload._id}`, {
        title: payload.title,
        text: payload.text,
        category: payload.category
      }, {
        headers: {
          token: localStorage.getItem('tokenOverflow')
        }
      })
      .then(({data}) => console.log(data))
      .catch(err => console.error(err))
    },
    likeQuestion ({ commit }, payload) {
      http.put(`/api/questions/${payload.questionID}`, {
        userID: payload.userID,
        userStatus: payload.userStatus
      }, {
        headers: {
          token: localStorage.getItem('tokenOverflow')
        }
      })
      .then(({data}) => {
        console.log(data)
      })
    }
  }
})
