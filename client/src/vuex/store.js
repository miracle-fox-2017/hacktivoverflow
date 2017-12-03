import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  questions: [],
  question: '',
  answers: []
}

const mutations = {
  saveNewQuestion: function (state, payload) {
    console.log(payload)
  },
  saveQuestions: function (state, payload) {
    state.questions = payload
  },
  saveQuestion: function (state, payload) {
    state.question = payload
  },
  deleteQuestion: function (state, payload) {
    let q = state.questions
    let pos = q.findIndex(function (e) {
      return e._id === payload
    })
    state.questions.splice(pos, 1)
  },
  saveAnswer: function (state, payload) {
    state.answers = payload
  },
  postAnswer: function (state, payload) {
    state.answers.push(payload)
  },
  deleteAnswer: function (state, payload) {
    let a = state.answers
    let pos = a.findIndex(function (e) {
      return e._id === payload
    })
    state.answers.splice(pos, 1)
  },
}

const actions = {
  addQuestion: function ({ commit }, newQuestion) {
    let token = JSON.parse(localStorage.getItem('dataUser')).token
    axios.post('http://localhost:3000/api/question', {
      title: newQuestion.title,
      image: newQuestion.image,
      question: newQuestion.question
    }, {
      headers: { token: token }
    })
    .then(resp => {
      console.log(resp)
    })
    .catch(err => {
      console.log(err)
    })
  },
  getQuestions: function ({ commit }) {
    axios.get('http://localhost:3000/api/question')
    .then(({ data }) => {
      commit('saveQuestions', data.questions)
    })
    .catch(err => {
      console.log(err)
    })
  },
  getQuestion: function ({ commit }, questionId) {
    axios.get('http://localhost:3000/api/question/' + questionId)
    .then(({ data }) => {
      commit('saveQuestion', data.question)
    })
    .catch(err => {
      console.log(err)
    })
  },
  deleteQuestion: function ({ commit }, questionId) {
    let token = JSON.parse(localStorage.getItem('dataUser')).token
    axios.delete('http://localhost:3000/api/question/' + questionId, {
      headers: { token: token }
    })
    .then(({ data }) => {
      commit('deleteQuestion', questionId)
    })
    .catch(err => {
      console.log(err)
    })
  },
  getAnswer: function ({ commit }, questionId) {
    axios.get('http://localhost:3000/api/question/' + questionId + '/answer')
    .then(({ data }) => {
      commit('saveAnswer', data.answers)
    })
    .catch(err => {
      console.log(err)
    })
  },
  postAnswer: function ({ commit }, newAnswer) {
    let token = JSON.parse(localStorage.getItem('dataUser')).token
    axios.post('http://localhost:3000/api/question/' + newAnswer.questionId + '/answer', {
      image: newAnswer.image,
      answer: newAnswer.answer
    }, {
      headers: { token: token }
    })
    .then(({ data }) => {
      commit('postAnswer', data.answer)
    })
    .catch(err => {
      console.log(err)
    })
  },
  deleteAnswer: function ({ commit }, answerId) {
    let token = JSON.parse(localStorage.getItem('dataUser')).token
    axios.delete('http://localhost:3000/api/answer/' + answerId, {
      headers: { token: token }
    })
    .then(({ data }) => {
      commit('deleteAnswer', answerId)
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
