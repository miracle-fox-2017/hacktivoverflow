import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import router from '@/router/index'

Vue.use(Vuex)
const http = axios.create({
  baseURL: 'http://localhost:3000'
})

const state = {
  questions: [],
  answers: [],
  question: '',
  isDeleteQuestion: false,
  isEditQuestion: false,
  like: ''
}

const mutations = {
  deleteDataQuestion (state, payload) {
    const indexQuestion = state.questions.findIndex((question) =>
    question._id === payload._id
  )
    state.questions.splice(indexQuestion, 1)
  },
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
  },
  updateDataQuestion (state, payload) {
    state.question = payload
  },
  deleteDataAnswer (state, payload) {
    const indexAnswer = state.answers.findIndex((answer) =>
      answer._id === payload._id
    )
    state.answers.splice(indexAnswer, 1)
  },
  likeQuestion (state, payload) {
    http.get('/questions')
    .then((dataQuestions) => {
      state.questions = dataQuestions.data
    })
  },
  likeAnswer (state, payload) {
    http.get('/answers')
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
        console.log(newData.data)
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
        console.log('Haiiii', response)
        commit('deleteDataQuestion', response.data)
        router.push('/')
      })
      .catch((reason) => {
        console.log(reason)
      })
  },
  updateDataQuestionById ({ commit }, question) {
    http.put(`/questions/${question.id}`, {
      title: question.title,
      question: question.question
    })
    .then((dataQuestion) => {
      commit('updateDataQuestion', dataQuestion.data)
    })
    .catch((reason) => {
      console.log(reason)
    })
  },
  deleteDataAnswer ({ commit }, id) {
    http.delete(`/answers/${id}`)
    .then((dataAnswer) => {
      commit('deleteDataAnswer', dataAnswer.data)
    })
    .catch((reason) => {
      console.log(reason)
    })
  },
  likeQuestion ({commit}, id) {
    let dataUser = jwt.decode(localStorage.getItem('token')).id
    let indexQuestion = this.state.questions.findIndex((question) => question._id === id)
    let indexLiker = this.state.questions[indexQuestion].likes.findIndex((like) => like === dataUser)
    if (indexLiker === -1) {
      http.put(`/questions/like/${id}`, {
        userId: dataUser
      })
      .then((dataQuestion) => {
        commit('likeQuestion', dataQuestion.data)
      })
      .catch((reason) => {
        console.log(reason)
      })
    } else {
      state.like = true
      http.put(`/questions/unlike/${id}`, {
        userId: dataUser
      })
      .then((dataQuestion) => {
        commit('likeQuestion', dataQuestion.data)
      })
    }
  },
  likeAnswer ({commit}, id) {
    let dataUser = jwt.decode(localStorage.getItem('token')).id
    let indexAnswer = this.state.answers.findIndex((answer) => answer._id === id)
    let indexLiker = this.state.answers[indexAnswer].likes.findIndex((like) => like === dataUser)
    if (indexLiker === -1) {
      http.put(`/answers/like/${id}`, {
        userId: dataUser
      })
      .then((dataAnswer) => {
        commit('likeAnswer', dataAnswer.data)
      })
      .catch((reason) => {
        console.log(reason)
      })
    } else {
      http.put(`/answers/unlike/${id}`, {
        userId: dataUser
      })
      .then((dataAnswer) => {
        commit('likeAnswer', dataAnswer.data)
      })
      .catch((reason) => {
        console.log(reason)
      })
    }
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
