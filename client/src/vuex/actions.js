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
    http.get(`/questions/${payload}`)
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
      commit('setQuestionsAfterDelete', data)
    })
    .catch(err => console.log(err))
  },
  editQuestion: ({ commit }, payload) => {
    http.put(`/questions/${payload}`, payload, { headers: { token: localStorage.getItem('token') } })
    .then(({ data }) => {
      commit('setNewUserQuestionsAfterEdit', data)
    })
    .catch(err => console.log(err))
  },

  /* ------------------------------------------------------------------------ */

  getAnswerByQuestionId: ({ commit }, payload) => {
    http.post('/answers/detail', {question: payload})
    .then(({ data }) => {
      commit('setAnswers', data)
    })
    .catch(err => console.log(err))
  },
  addAnswer: ({ commit }, payload) => {
    http.post('/answers', payload, { headers: { token: localStorage.getItem('token') } })
    .then(({ data }) => {
      commit('setNewAnswers', data)
    })
    .catch(err => console.log(err))
  },
  deleteAnswer: ({ commit }, payload) => {
    // console.log('--> masuk actions', payload);
    http.delete(`/answers/${payload}`, { headers: { token: localStorage.getItem('token') } })
    .then(({ data }) => {
      commit('setAnswersAfterDelete', data)
    })
    .catch(err => console.log(err))
  },

  /* ------------------------------------------------------------------------ */

  getQuestionsVotersByQuestionId: ({ commit }, payload) => {
    // console.log('--> masuk action', payload);
    http.post('/questions-voters/detail', {question: payload})
    .then(({ data }) => {
      commit('setQuestionsVoters', data)
    })
    .catch(err => console.log(err))
  },
  voteQuestion: ({ commit }, payload) => {
    // console.log('--> masuk voteQuestion', payload)
    http.post('/questions-voters', { question: payload }, { headers: { token: localStorage.getItem('token') } })
    .then(({ data }) => {
      commit('setNewQuestionsVoters', data)
    })
    .catch(err => console.log(err))
  },
  cancelVoteQuestion: ({ commit }, payload) => {
    // console.log('--> masuk cancelVoteQuestion', payload)
    http.post('/questions-voters/remove', { voter: payload }, { headers: { token: localStorage.getItem('token') } })
    .then(({ data }) => {
      // console.log('--> actions data', data)
      commit('setQuestionsVotersAfterDelete', data)
    })
    .catch(err => console.log(err))
  },

  /* ------------------------------------------------------------------------ */

  getAnswersVotersByQuestionId: ({ commit }, payload) => {
    // console.log('--> masuk action', payload);
    http.post('/answers-voters/detail', {answer: payload})
    .then(({ data }) => {
      commit('setAnswersVoters', data)
    })
    .catch(err => console.log(err))
  }
  // ,addAnswer: ({ commit }, payload) => {
  //   http.post('/answers', payload, { headers: { token: localStorage.getItem('token') } })
  //   .then(({ data }) => {
  //     commit('setNewAnswers', data)
  //   })
  //   .catch(err => console.log(err))
  // },
  // deleteAnswer: ({ commit }, payload) => {
  //   // console.log('--> masuk actions', payload);
  //   http.delete(`/answers/${payload}`, { headers: { token: localStorage.getItem('token') } })
  //   .then(({ data }) => {
  //     commit('setAnswersAfterDelete', data)
  //   })
  //   .catch(err => console.log(err))
  // },
}

export default actions
