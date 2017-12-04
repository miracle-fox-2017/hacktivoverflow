import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'

const http = axios.create({
  baseURL: 'http://localhost:3000/'
})

Vue.use(Vuex)

const state = {
  users: [],
  questions: [],
  answers: []
}

const mutations = {
  setUsers (state, payload) {
    state.users = payload
  },
  signupUser (state, payload) {
    state.users.push(payload)
  },
  loginUser (state, payload) {
    state.users.push(payload)
  },
  getQuestion (state, payload) {
    state.questions = payload
  },
  getQuestionById (state, payload) {
    state.questions = payload
  },
  getQuestionByAuthor (state, payload) {
    console.log(payload)
    state.questions = payload
  },
  createQuestion (state, payload) {
    console.log('data di mutations >>', payload)
    state.questions.push(payload)
  },
  deleteQuestion (state, payload) {
    const index = state.questions.findIndex((question) => question.id === payload)
    state.questions.splice(index, 1)
  },
  updatedQuestion (state, payload) {
    console.log('data di update quest mutations >>', payload)
    state.questions.forEach((question, index) => {
      if (question._id === payload._id) {
        console.log('INDEX >>', state.questions)
        console.log('quest iterasi >>>', question)
        state.questions[index].title = payload.title
        state.questions[index].question_content = payload.question_content
      }
    })
  },
  getAnswerByQuestion (state, payload) {
    console.log('data di mutations >>', payload)
    state.answers = payload
  },
  createAnswer (state, payload) {
    state.answers.push(payload)
  },
  deleteAnswer (state, payload) {
    const index = state.answers.findIndex((answer) => answer.id === payload)
    state.answers.splice(index, 1)
  }
}

const actions = {
  // START ANSWER //
  createAnswerQuestion ({ commit }, newAnswer) {
    // console.log('ini answer', newAnswer)
    http.post('api/answers', newAnswer).then(({ data }) => {
      commit('createAnswer', data)
    }).catch(err => {
      console.error(err)
    })
  },
  findAnswerByQuestion ({ commit }, questionId) {
    console.log('id quest >>>', questionId)
    http.get('api/answers/questions/' + questionId).then(({data}) => {
      console.log('answerquest', data)
      commit('getAnswerByQuestion', data)
    }).catch(err => {
      console.error(err)
    })
  },
  deleteAnswer ({ commit }, answerId) {
    console.log(answerId)
    let enjoyKey = localStorage.getItem('token')
    http.delete('/api/answers/' + answerId, { headers: {token: enjoyKey} }).then(({data}) => {
      commit('deleteAnswer', answerId)
    }).catch(err => {
      console.error(err)
    })
  },
  // END ANSWER //

  // START QUESTION //
  getAllQuestion ({ commit }) {
    http.get('api/questions').then(({data}) => {
      commit('getQuestion', data)
    }).catch(err => {
      console.error(err)
    })
  },
  getQuestionById ({ commit }, questionId) {
    http.get('api/questions/' + questionId).then(({data}) => {
      console.log('getQuestionById', data)
      commit('getQuestionById', data)
    }).catch(err => {
      console.error(err)
    })
  },
  getAllQuestionByAuthor ({ commit }, authorId) {
    http.get('api/questions/author/' + authorId).then(({data}) => {
      commit('getQuestionByAuthor', data)
    }).catch(err => {
      console.error(err)
    })
  },
  saveQuestion ({ commit }, newQuestion) {
    // console.log('newQuestion >>', newQuestion)
    http.post('api/questions', newQuestion).then(({data}) => {
      console.log('ini data actions', data)
      commit('createQuestion', data)
    }).catch(err => {
      console.error(err)
    })
  },
  deleteQuestion ({ commit }, questionId) {
    console.log(questionId)
    let enjoyKey = localStorage.getItem('token')
    http.delete('api/questions/' + questionId, { headers: {token: enjoyKey} })
    .then(({data}) => {
      commit('deleteQuestion', questionId)
    }).catch(err => {
      console.error(err)
    })
  },
  updateNewQuestion ({ commit }, newQuestion) {
    console.log('newQuestion >>', newQuestion)
    let enjoyKey = localStorage.getItem('token')
    http.put('api/questions/' + newQuestion._id, newQuestion, { headers: {token: enjoyKey} })
    .then(({data}) => {
      console.log('ini data update quest actions', data)
      commit('updatedQuestion', data)
    }).catch(err => {
      console.error(err)
    })
  },
  // END QUESTIONS //

   // START USERS //
  getAllUsers ({ commit }) {
    http.get('api/users').then(({data}) => {
      commit('setUsers', data)
    }).catch(err => {
      console.error(err)
    })
  },
  loginUser ({ commit }, user) {
    http.post('api/users/login', user).then(({data}) => {
      commit('loginUser', data)
      if (data.success) {
        swal({
          title: 'Good job!',
          text: 'username & password match!',
          type: 'success'
        }).then(function () {
          window.location.href = 'http://localhost:8080'
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.username)
          localStorage.setItem('user_Id', data.user_Id)
        })
      }
    }).catch(err => {
      if (err && 403) {
        swal(
          'Oops...',
          'Wrong Username & Password!',
          'error'
        )
      }
    })
  },
  registerUser ({ commit }, newUser) {
    http.post('api/users', newUser).then(({data}) => {
      console.log('data register di actions >>', data)
      commit('signupUser', data)
      if (data.msg) {
        console.log('masuk')
        let msg = data.msg
        // alert(msg)
        swal(
          'Oops...',
          msg,
          'error'
        )
      } else {
        swal(
          'Good job!',
          'Your Acoount was created',
          'success'
        )
        window.location.href = '/login'
      }
    }).catch(err => {
      console.error(err)
    })
  }
  // END USERS
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
