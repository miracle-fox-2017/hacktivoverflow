const mutations = {
  setQuestions: (state, payload) => {
    state.questions = payload
  },
  setNewQuestion: (state, payload) => {
    state.questions.push(payload)
  },
  setUserQuestions: (state, payload) => {
    state.userQuestions = payload
  },
  setNewUserQuestionsAfterDelete: (state, payload) => {
    let checkIndex = state.userQuestions.findIndex(element => {
      return element._id === payload._id
    })
    state.userQuestions.splice(checkIndex, 1)
  },
  setNewUserQuestionsAfterEdit: (state, payload) => {
    console.log(payload)
  },
  setQuestionDetail: (state, payload) => {
    state.questionDetail = payload
  }
}

export default mutations
