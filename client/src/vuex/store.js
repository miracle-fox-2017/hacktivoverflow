/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import firebase from 'firebase'
import { log } from 'util';



const http = axios.create({
  baseURL: 'http://ec2-54-200-168-142.us-west-2.compute.amazonaws.com:3000'

})

Vue.use(Vuex)
const state = {
  questions: [],
  question: null,
  isOwner: false,
  answers: [],
  isLikes: false,
  lenVotes: 0,
}

const getters = {
  
}

const mutations = {
  saveUser (state, payload ) {
    localStorage.setItem('username',payload.username)
    localStorage.setItem('email', payload.email)
    localStorage.setItem('id', payload.id)
  },
  setQuestions (state, payload) {
    state.questions = payload
  },
  setNewQuestion (state, payload) {
    state.questions.push(payload)
  },
  setOneQuestion (state, payload) {
    console.log(payload.userId.username, 'setquestion, dfoisoifoi')
    if (payload.userId.username === localStorage.getItem('username')) {
      state.isOwner = true
    } else {
      state.isOwner = false
    }
    state.question = payload
  },
  removeOne (state, payload) {
    console.log(payload, 'sdjfoisdjfsoifjosi')
    state.questions.forEach((item, index) => {
      if (item._id === payload._id) {
        state.questions.splice(index, 1)
      }
    })
  },
  removeLS () {
    localStorage.removeItem('id')
    localStorage.removeItem('username')
    localStorage.removeItem('email')
  },
  setAnswers (state, payload) {
    state.answers = payload
  },
  setNewAnswer  (state, payload) {
    state.answers.push(payload)
  },
  removeAns (state, payload) {
    state.answers.forEach((item, index) => {
      if (item._id === payload._id) {
        state.answers.splice(index, 1)
      }
    })
  },
  setAns (state, payload) {
    console.log(payload, '---')
    state.answers.forEach((el,index) => {
      if (el._id === payload._id) {
        state.answer[index] = payload
      }
    })
  }
}

//===================== actions ======///
//===================== actions ======///
//===================== actions ======///
//===================== actions ======///
//===================== actions ======///

const actions = {
  signup ({ commit }, dataUser) {
    http.post('/api/users', {
      username: dataUser.username,
      email: dataUser.email
    })
    .then(({ data }) => {
      let obj = {}
      obj.username = data.user.username
      obj.id = data.user._id
      obj.email = data.user.email
      commit('saveUser', obj)
    })
    .catch(err => console.error(err))
  },
  findByEmail ({ commit }, email) {
    http.get(`/api/users/${email}`)
    .then(({ data }) => {
      let obj = {}
      data.user.forEach(x => {
        obj.username = x.username
        obj.id = x._id
        obj.email = x.email
      })
      commit('saveUser', obj)
    })
    .catch(err => console.log(err))
  },
  getAllQuestions ({ commit }) {
    http.get('/api/questions')
    .then(({ data }) => {
      console.log(data)
      commit('setQuestions', data)
    })
    .catch(err => console.log(err))
  },
  postQuestionToDb ({ commit }, payload) {
    console.log(payload, 'post')
    let id = localStorage.getItem('id')
    http.post('/api/questions', {
      question: payload.message,
      tag: payload.tag,
      userId: id,
      title: payload.title
    })
    .then(({ data }) => {
      commit('setNewQuestion', data)
      console.log(data, 'berhasil memasukan data')
    })
    .catch(err => console.log(err))
  },
  getQuestionById ({ commit }, payload) {
    let id = payload
    http.get('/api/questions/' + id)
    .then(({ data }) => {
      console.log(data, '===')
      commit('setOneQuestion', data)
    })
    .catch(err => console.log(err))
  },
  editQuestionById ({ commit }, payload) {
    let id = localStorage.getItem('id')
    payload.userId= id
    http.put('/api/questions/' + payload.id, {
      question: payload.question,
      tag: payload.tag,
      userId: payload.userId,
      title: payload.title
    })
    .then(({ data }) => {
      console.log(data)
      commit('removeOne', data)
      commit('setNewQuestion', payload)
    })
    .catch(err => console.log(err))
  },
  removeById ({ commit }, payload) {
    console.log('payload remove', payload)
    http.delete('api/questions/'+ payload)
    .then(({ data }) => {
      console.log(data, 'masuk di remove')
      commit('removeOne', data)
    })
    .catch(err => console.log(err))
  },
  logout ({ commit }) {
    firebase.auth().signOut().then(() => {
      commit('removeLS')
    })
  },
  liked ({ commit }, payload) {
    console.log(payload, 'oopo')
    http.put(`/api/questions/${payload.questionId}/like`, {
      like: payload.userId
    })
    .then(({data}) => {
      console.log(data)
    })
    .catch(err => console.log(err))
  },
  disliked ({commit}, payload) {
    console.log('payload dislike', payload)
    http.put(`/api/questions/${payload.id}/dislike`, {
      like: payload.userId
    })
    .then(({
      data
    }) => {
      console.log(data)
    })
    .catch(err => console.log(err))
  },

  //-------------- answer --------- //
  getAnswerByQuestionId ({ commit }, payload) {
    console.log(payload, 'getAnswerByQuestionId')
    http.get(`/api/questions/${payload}/answers`)
    .then(({ data }) => {
      console.log(data)
      commit('setAnswers', data)
    })
    .catch(errr => console.log(err))
  },
  postComment ({ commit }, payload) {
     http.post('/api/answers', {
      userId: localStorage.getItem('id'),
      answer: payload.answer,
      questionId: payload.questionId
    })
    .then(({ data }) => {
      console.log(data, 'data post')
      commit('setNewAnswer', data)
    })
    .catch(err => console.log(err))
  },
  removeOne ({ commit }, payload) {
    console.log(payload, 'fooo')
    http.delete(`/api/answers/${payload}`)
    .then(({ data }) => {
      commit('removeAns', data)
    })
    .catch(err => console.log(err))
  },

  removeElVotesById({ commit }, payload) {
    console.log(payload, 'rem')
    http.put(`/api/answers/removeVotes/${payload.id}`, {
      votes: payload.userId
    })
    .then(({ data }) => {
      console.log(data, 'in data removesEl')
      commit('setAns', data)
    })
    .catch(err => console.log(err))
  },

  findByIdAndUpdate ({ commit }, payload) {
    console.log(payload)
    http.put(`/api/answers/editVotes/${payload.id}`, {
      votes: payload.userId
    })
    .then(({ data }) => {
      console.log(data, 'data likes di answer')
      commit('setAns', data)
    })
    .catch(err => console.log(err))
  }
}

const store = new Vuex.Store({
  getters,
  state,
  actions,
  mutations
})

export default store