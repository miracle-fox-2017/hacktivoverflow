const mutations = {
  setQuestions: (state, payload) => {
    state.questions = payload
  },
  setNewQuestion: (state, payload) => {
    state.questions.push(payload)
  },
  setUserQuestions: (state, payload) => {
    state.userQuestions = payload
  }
}

export default mutations
