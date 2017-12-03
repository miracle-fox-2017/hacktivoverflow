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
    console.log('data di mutations >>', payload)
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
    state.questions = payload
  },
  createQuestion (state, payload) {
    state.questions.push(payload)
  },
  getAnswerByQuestion (state, payload) {
    state.answers = payload
  }
}

const actions = {
  findAnswerByQuestion ({ commit }, questionId) {
    // console.log('id quest >>>', questionId)
    http.get('api/answers/questions/' + questionId).then(({data}) => {
      console.log('answerquest', data)
      commit('getAnswerByQuestion', data)
    }).catch(err => {
      console.error(err)
    })
  },
  getAllQuestion ({ commit }) {
    http.get('api/questions').then(({data}) => {
      commit('getQuestion', data)
    }).catch(err => {
      console.error(err)
    })
  },
  getQuestionById ({ commit }, questionId) {
    http.get('api/questions/' + questionId).then(({data}) => {
      // console.log(data)
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
    console.log(newQuestion)
    http.post('api/questions', newQuestion).then(({data}) => {
      commit('createQuestion', data)
    }).catch(err => {
      console.error(err)
      if (err) {
        swal(
          'Oops...',
          'Title & Question must be filled!',
          'error'
        )
      }
    })
  },
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
          window.location.href = 'http://localhost:8080/questions'
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
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
