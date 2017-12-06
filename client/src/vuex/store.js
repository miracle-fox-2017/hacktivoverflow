import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const http = axios.create(({
  baseURL: 'http://localhost:3000'
}))

Vue.use(Vuex)

const state = {
  users: [],
  questions: [],
  login: false,
  question: {
    title: '',
    body: '',
    like: [],
    answers_id: [{
      user_id: '',
      body: '',
      createdAt: '',
      like: []
    }]
  }
}

const mutations = {
  setUsers (state, payload) {
    state.users = payload
  },
  saveUser (state, newUser) {
    state.users.push(newUser)
  },
  setLogin (state, payload) {
    console.log('set login masuk nih ', payload)
    state.login = payload
  },
  setQuestions (state, payload) {
    state.questions = payload
  },
  saveQuestion (state, newQuestion) {
    state.questions.push(newQuestion)
  },
  clearLogin (state) {
    state.login = ''
  },
  setQuestionDetail (state, detailQuestion) {
    // console.log(detailQuestion)
    state.question = detailQuestion
  },
  saveAnswer (state, newAnswer) {
    // console.log(state.question, newAnswer)
    state.question.answers_id.unshift(newAnswer)
  },
  setlike (state, updateLike) {
    console.log('KE MUTATIONS', updateLike)
    state.question = updateLike
    // state.question.answers_id.map(likeid => {
    //   if(likeid == updateLike._id) {
    //     likeid.like = updateLike
    //   } else {
    //     likeid.like.push(updateLike)
    //   }
    // })
  },
  setunlike (state, updateLike) {
    state.question = updateLike
  },
  setlikeanswer (state, updateLike) {
    console.log(state.question.answers_id,'KE MUTATIONS', updateLike)
    let filterQuestion = state.question.answers_id.filter((question) => question._id !== updateLike)
    state.question.answers_id = filterQuestion
  },
  setunlikeanswer (state, updateLike) {
    // state.question.answers_id = updateLike
    let filterQuestion = state.question.answers_id.filter((question) => question._id !== updateLike)
    state.question.answers_id = filterQuestion
  },
  setUpdateQuestion (state, updateQuestion) {
    state.question = updateQuestion
  },
  setDeleteQuestion (state, idQuestion) {
    
    let idx = state.questions.findIndex(question => question._id == idQuestion)
    state.questions.splice(idx, 1)
  }
}

const actions = {
  allUsers ({ commit }) {
    http.get('/users')
    .then(({data}) => {
      console.log(data)
      commit('setUsers', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  registerUser ({ commit }, newUser) {
    // console.log('INI DARI NEW USER', newUser)
    http.post('/register', newUser)
    .then(({ data }) => {
      // console.log('HASIL SIMPAN', data.data)
      commit('saveUser', data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  checkLogin ({ commit }, loginUser) {
    http.post('/login', loginUser)
    .then(( {data} ) => {
      console.log(data)
      // let parsingData = JSON.stringify(data)
      // console.log(parsingData)
      localStorage.setItem('token', JSON.stringify(data))
      commit('setLogin', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  allQuestions ({ commit }) {
    http.get('/questions')
    .then(({data}) => {
      commit('setQuestions', data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  createQuestion ({ commit }, newQuestion) {
    http.post('/questions', newQuestion,{
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({ data }) => {
      console.log(data)
      commit('saveQuestion', data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  clearSession ({ commit }) {
    commit('clearLogin')
  },
  detailQuestion ({ commit }, id) {
    console.log('MASUK ACTION')
    http.get(`/questions/${id}`)
    .then(({data}) => {
      // console.log(data)
      commit('setQuestionDetail',data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  createAnswer ({ commit }, dataAnswer) {
    // console.log('INI DI ACTIONS', dataAnswer)
    http.post('/answers', dataAnswer, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({ data }) => {
      console.log('HASIL CREATE ACTIONS', data)
      commit('saveAnswer', data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  setLike ({ commit }, id) {
    let koken = localStorage.getItem('token')
    console.log('ID', koken)
    http.put(`/questions/like/${id}`, {}, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      console.log('LIKE', data)
      commit('setlike', data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  setUnlike ({ commit }, id) {
    http.put(`/questions/unlike/${id}`,{}, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      console.log('UNLIKE', data)
      commit('setunlike', data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  setLikeAnswer ({ commit }, id) {
    let koken = localStorage.getItem('token')
    console.log('ID', koken)
    http.put(`/answers/like/${id}`, {}, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      console.log('LIKE', data)
      commit('setlikeanswer', data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  setUnlikeAnswer ({ commit }, id) {
    http.put(`/answers/unlike/${id}`,{}, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      console.log('UNLIKE', data)
      commit('setunlikeanswer', data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  updateQuestion ({ commit }, newUpdate) {
    console.log('NEW UPDATE', newUpdate)
    http.put(`/questions/${newUpdate.id}`,newUpdate , {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      console.log('NEW UPDATE HASIL', data)
      commit('setUpdateQuestion', data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  deleteQuestion({commit}, id) {
    // console.log('INI ID', id)
    http.delete(`/questions/${id}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      console.log('NEW DELETE HASIL', data)
      alert(data.msg)
      commit('setDeleteQuestion', id)
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