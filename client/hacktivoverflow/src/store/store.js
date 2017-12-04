import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'

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
    },

    setDeleteAnswer (state, payload) {
      state.answers.forEach((answer, index) => {
        if (answer._id === payload) {
          state.answers.splice(index, 1)
        }
      })
    },

    setUpdateAnswer (state, payload) {
      state.answers.forEach((answer, index) => {
        if (answer._id === payload.id) {
          state.answers[index].content = payload.content
        }
      })
    },

    setDeleteQuestion (state, payload) {
      state.questions.forEach((question, index) => {
        if (question._id === payload) {
          state.questions.splice(index, 1)
        }
      })
    },

    setUpdateQuestion (state, payload) {
      state.questions.forEach((question, index) => {
        if (question._id === payload.id) {
          state.questions[index].title = payload.title
          state.questions[index].content = payload.content
        }
      })
    }
  },

  getters: {
    answerwithoption: function (state) {
      var accesstoken = localStorage.getItem('access_token')
      var decoded = jwt.decode(accesstoken)
      var answerwithoption = []

      if (decoded) {
        answerwithoption = state.answers.map((answer) => {
          answer.editmenu = false
          if (answer.by._id === decoded._id) {
            answer.removable = true
            answer.editable = true
          } else {
            answer.removable = false
            answer.editable = false
          }
          return answer
        })

        return answerwithoption
      } else {
        answerwithoption = state.answers.map((answer) => {
          answer.removable = false
          answer.editable = false
          return answer
        })
        return answerwithoption
      }
    },

    questionwithoption: function (state) {
      var accesstoken = localStorage.getItem('access_token')
      var decoded = jwt.decode(accesstoken)
      var questionwithoption = []

      if (decoded) {
        questionwithoption = state.questions.map((question) => {
          question.editmenu = false
          if (question.author._id === decoded._id) {
            question.removable = true
            question.editable = true
          } else {
            question.removable = false
            question.editable = false
          }
          return question
        })

        return questionwithoption
      } else {
        questionwithoption = state.questions.map((question) => {
          question.removable = false
          question.editable = false
          return question
        })
        return questionwithoption
      }
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
    },

    deleteanswer: function ({commit}, answerid) {
      var accesstoken = localStorage.getItem('access_token')
      http.delete('/api/answer/delete/' + answerid, {headers: {access_token: accesstoken}}).then(({data}) => {
        commit('setDeleteAnswer', answerid)
      }).catch(err => {
        console.log(err.message)
      })
    },

    updateanswer: function ({commit}, newanswer) {
      var accesstoken = localStorage.getItem('access_token')
      var inputanswer = {
        content: newanswer.content
      }
      http.put('/api/answer/update/' + newanswer.id, inputanswer, {headers: {access_token: accesstoken}}).then(({data}) => {
        commit('setUpdateAnswer', newanswer)
      })
    },

    deletequestion: function ({commit}, questionid) {
      var accesstoken = localStorage.getItem('access_token')
      http.delete('/api/question/delete/' + questionid, {headers: {access_token: accesstoken}}).then(({data}) => {
        commit('setDeleteQuestion', questionid)
      }).catch(err => {
        console.log(err.message)
      })
    },

    updatequetion: function ({commit}, question) {
      var accesstoken = localStorage.getItem('access_token')
      var inputquestion = {
        title: question.title,
        content: question.content
      }
      http.put('/api/question/update/' + question.id, inputquestion, {headers: {access_token: accesstoken}}).then(({data}) => {
        commit('setUpdateQuestion', question)
      }).catch(err => {
        console.log(err.message)
      })
    }
  }
})
