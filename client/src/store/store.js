import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'
Vue.use(Vuex)
const http = axios.create({
  baseURL: 'http://localhost:3000'
})

const state = {
  questions: [],
  answers: [],
  question: '',
  isDeleteQuestion: false,
  isEditQuestion: false
}

const mutations = {
  setQuestions (state, payload) {
    state.questions = payload
  },
  saveNewQuestion (state, payload) {
    http.get('/questions')
      .then((dataQuestions) => {
        state.questions = dataQuestions.data
      })
  },
  getDataQuestionById (state, payload) {
    state.question = payload
  },
  getDataAnswersByQuestion (state, payload) {
    state.answers = payload
  },
  saveNewAnswer (state, payload) {
    http.get(`/answers/question/${payload.question}`)
      .then((dataAnswers) => {
        state.answers = dataAnswers.data
      })
  }
}

const actions = {
  getAllDataQuestions ({ commit }) {
    http.get('/questions')
      .then((dataQuestions) => {
        commit('setQuestions', dataQuestions.data)
      })
      .catch((reason) => {
        console.log(reason)
      })
  },
  createNewDataQuestion ({ commit }, newQuestion) {
    let dataUser = jwt.decode(localStorage.getItem('token'))
    newQuestion.author = dataUser.id
    http.post('/questions', newQuestion)
      .then((newData) => {
        commit('saveNewQuestion', newData.data)
        alert('You posted 1 question!')
      })
      .catch((reason) => {
        console.log(reason)
      })
  },
  findQuestionById ({ commit }, id) {
    http.get(`/questions/${id}`)
      .then((dataQuestion) => {
        commit('getDataQuestionById', dataQuestion.data)
      })
      .catch((reason) => {
        console.log(reason)
      })
  },
  getAnswerByIdQuestion ({ commit }, id) {
    http.get(`/answers/question/${id}`)
      .then((dataAnswes) => {
        commit('getDataAnswersByQuestion', dataAnswes.data)
      })
      .catch((reason) => {
        console.log(reason)
      })
  },
  createNewAnswer ({ commit }, payload) {
    let dataUser = jwt.decode(localStorage.getItem('token'))
    http.post(`/answers`, {
      answer: payload.answer,
      question: payload.id,
      author: dataUser.id
    })
      .then((dataAnswer) => {
        commit('saveNewAnswer', dataAnswer.data)
      })
      .catch((reason) => {
        console.log(reason)
      })
  },
  deleteQuestionById ({ commit }, id) {
    http.delete(`/questions/${id}`)
      .then((response) => {
        alert('Successfully deleted!')
      })
      .catch((reason) => {
        console.log(reason)
      })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
