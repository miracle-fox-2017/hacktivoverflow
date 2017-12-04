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
  addQuestion: ({ commit }, payload) => {
    http.post('/questions', payload, {headers: {token: localStorage.getItem('token')}})
    .then(({ data }) => {
      commit('setNewQuestion', data)
    })
    .catch(err => console.log(err))
  },
  getQuestionsByUserId: ({ commit }, payload) => {
    http.post('/questions/dashboard', payload, {headers: {token: localStorage.getItem('token')}})
    .then(({ data }) => {
      commit('setUserQuestions', data)
    })
    .catch(err => console.log(err))
  },
  deleteQuestion: ({ commit }, payload) => {
    console.log(payload);
    http.delete(`/questions/${payload}`, {headers: {token: localStorage.getItem('token')}})
    .then(({ data }) => {
      console.log(data);
      commit('setUserQuestions', data)
    })
    .catch(err => console.log(err))
  }
}

export default actions
