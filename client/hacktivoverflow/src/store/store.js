import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    questions: [],
    question: '',
    answers: []
  },

  mutations: {
    setAllQuestions (state, payload) {
      state.questions = payload
    },

    setOneQuestion (state, payload) {
      state.question = payload
    },

    setAnswerQuestion (state, payload) {
      state.answers = payload
    },

    setPostAnswer (state, payload) {
      state.answers.push(payload)
    },

    setPostQuestion (state, payload) {
      state.questions.push(payload)
    },

    setVoteQuestion (state, payload) {
      state.questions.forEach((question, index) => {
        if (question._id === payload._id) {
          state.questions[index].voters = payload.voters
        }
      })
    },

    setVoteAnswer (state, payload) {
      state.answers.forEach((answer, index) => {
        if (answer._id === payload._id) {
          state.answers[index].voters = payload.voters
        }
      })
    }
  },

  actions: {
    getAllQuestion: function ({commit}) {
      http.get('/api/question/getall')
      .then(({data}) => {
        commit('setAllQuestions', data)
      })
    },

    getOneQuestion: function ({commit}, paramsid) {
      http.get('/api/question/getone/' + paramsid)
      .then(({data}) => {
        commit('setOneQuestion', data)
      })
    },

    getAnswerQuestion: function ({commit}, paramsid) {
      http.get('/api/answer/getbyquestion/' + paramsid)
      .then(({data}) => {
        commit('setAnswerQuestion', data)
      })
    },

    postanswer: function ({commit}, inputanswer) {
      var newanswer = {
        content: inputanswer,
        question_id: this.state.question._id
      }

      var accesstoken = localStorage.getItem('access_token')

      http.post('/api/answer/create', newanswer, {headers: {access_token: accesstoken}})
        .then(({data}) => {
          commit('setPostAnswer', data)
        }).catch(err => console.log(err.message))
    },

    postquestion: function ({commit}, newquestion) {
      var anewquestion = {
        title: newquestion.title,
        content: newquestion.content
      }
      var accesstoken = localStorage.getItem('access_token')

      http.post('/api/question/create', anewquestion, {headers: {access_token: accesstoken}})
        .then(({data}) => {
          commit('setPostQuestion', data)
        }).catch(err => console.log(err.message))
    },

    vote: function ({commit}, questionid) {
      var dami = {
        title: 'dami'
      }
      var accesstoken = localStorage.getItem('access_token')
      http.put('/api/question/vote/' + questionid, dami, {headers: {access_token: accesstoken}}).then(({data}) => {
        commit('setVoteQuestion', data)
        console.log(data)
      }).catch(err => {
        console.log(err.message)
      })
    },

    voteAnswer: function ({commit}, answerid) {
      var dami = {
        title: 'dami'
      }
      var accesstoken = localStorage.getItem('access_token')
      http.put('/api/answer/vote/' + answerid, dami, {headers: {access_token: accesstoken}}).then(({data}) => {
        commit('setVoteAnswer', data)
        console.log(data)
      }).catch(err => {
        console.log(err.message)
      })
    }
  }
})
