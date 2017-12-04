import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

const http = axios.create({baseURL: 'http://localhost:3000'})
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    questions: [],
    answers: [],
    myQuestions: []
  },
  mutations: {
    setQuestions (state, payload) {
      state.questions = payload
    },
    setMyQuestions (state, payload) {
      state.myQuestions = payload
    },
    saveNewQuestion (state, payload) {
      state.questions.unshift(payload)
    },
    setAnswers (state, payload) {
      state.answers = payload
    },
    saveNewAnswer (state, payload) {
      state.answers.push(payload)
    },
    removeAnswer (state, payload) {
      let index = state.answers.map(a => { return a._id }).indexOf(payload._id)
      state.answers.splice(index, 1)
    },
    editedQuestion (state, payload) {
      let index = state.myQuestions.map(q => { return q._id }).indexOf(payload._id)
      // console.log(index)
      state.myQuestions.splice(index, 1, payload)
    },
    deletedQuestion (state, payload) {
      let index = state.myQuestions.map(q => { return q._id }).indexOf(payload._id)
      state.myQuestions.splice(index, 1)
    }
  },
  actions: {
    getAllQuestions (context) {
      http.get('/questions')
      .then(({data}) => {
        context.commit('setQuestions', data)
      })
      .catch(err => console.log(err))
    },
    postNewQuestion (context, newQuestion) {
      http.post('/questions', newQuestion, {
        headers: {
          accesstoken: localStorage.getItem('accesstoken')
        }
      })
      .then(({data}) => {
        context.commit('saveNewQuestion', data)
        router.push('/')
      })
      .catch(err => console.log(err))
    },
    getAnswers (context, questionId) {
      http.get(`/answers/${questionId}`)
      .then(({data}) => {
        context.commit('setAnswers', data)
      })
      .catch(err => console.log(err))
    },
    postNewAnswer (context, newAnswer) {
      // console.log(newAnswer)
      http.post('/answers', newAnswer, {
        headers: {
          accesstoken: localStorage.getItem('accesstoken')
        }
      })
      .then(({data}) => {
        context.commit('saveNewAnswer', data)
      })
      .catch(err => console.log(err))
    },
    deleteAnswer (context, answerId) {
      http.delete(`/answers/${answerId}`, {
        headers: {
          accesstoken: localStorage.getItem('accesstoken')
        }
      })
      .then(({data}) => {
        context.commit('removeAnswer', data)
      })
      .catch(err => console.log(err))
    },
    editQuestions (context, questionData) {
      http.put(`/questions/${questionData.questionId}`, questionData.formQuestion, {
        headers: {
          accesstoken: localStorage.getItem('accesstoken')
        }
      })
      .then(({data}) => {
        context.commit('editedQuestion', data)
        /* eslint-disable */
        $('.small.modal.edit')
          .modal('hide')
        ;
      })
    .catch(err => console.log(err))
    },
    getMyQuestions (context) {
      http.get('/questions/myquestions', {
        headers: {
          accesstoken: localStorage.getItem('accesstoken')
        }
      })
      .then(({data}) => {
        context.commit('setMyQuestions', data)
      })
      .catch(err => console.log(err))
    },
    deleteQuestions (context, id) {
      http.delete(`/questions/${id}`, {
        headers: {
          accesstoken: localStorage.getItem('accesstoken')
        }
      })
      .then(({data}) => {
        context.commit('deletedQuestion', data)
      })
      .catch(err => console.log(err))
    }
  }
})

export default store
