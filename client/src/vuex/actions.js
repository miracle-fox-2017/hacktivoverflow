import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

const actions = {
  getAllQuestions: ({ commit }) => {
    http.get(`/questions`)
    .then(({ data }) => {
      commit('setQuestions', data)
    })
    .catch(err => console.error(err))
  },
  getQuestionsById: ({ commit }, payload) => {
    http.get(`/questions/${payload}`, { headers: { token: localStorage.getItem('token') } })
    .then(({ data }) => {
      commit('setQuestionDetail', data)
    })
    .catch(err => console.error(err))
  },
  getQuestionsByUserId: ({ commit }, payload) => {
    http.post('/questions/dashboard', payload, { headers: { token: localStorage.getItem('token') } })
    .then(({ data }) => {
      commit('setUserQuestions', data)
    })
    .catch(err => console.log(err))
  },
  addQuestion: ({ commit }, payload) => {
    http.post('/questions', payload, { headers: { token: localStorage.getItem('token') } })
    .then(({ data }) => {
      commit('setNewQuestion', data)
    })
    .catch(err => console.log(err))
  },
  deleteQuestion: ({ commit }, payload) => {
    http.delete(`/questions/${payload}`, { headers: { token: localStorage.getItem('token') } })
    .then(({ data }) => {
      commit('setNewUserQuestionsAfterDelete', data)
    })
    .catch(err => console.log(err))
  },
  editQuestion: ({commit}, payload) => {
    http.put(`/questions/${payload}`, payload, { headers: { token: localStorage.getItem('token') } })
    .then(({ data }) => {
      console.log(data)
      commit('setNewUserQuestionsAfterEdit', data)
    })
    .catch(err => console.log(err))
  }
}

export default actions
