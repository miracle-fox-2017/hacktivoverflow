const mutations = {
  setQuestions (state, payload) {
    state.questions = payload
  },
  setMyQuestions (state, payload) {
    state.myQuestions = payload
  },
  saveNewQuestion (state, payload) {
    state.questions.unshift(payload)
    state.formQuestion.title = ''
    state.formQuestion.question = ''
  },
  setAnswers (state, payload) {
    state.answers = payload
  },
  saveNewAnswer (state, payload) {
    state.answers.push(payload)
  },
  removeAnswer (state, payload) {
    let index = state.answers.map(a => { return a._id }).indexOf(payload._id)
    state.answers.splice(index, 1)
  },
  editedQuestion (state, payload) {
    let index = state.myQuestions.map(q => { return q._id }).indexOf(payload._id)
    // console.log(index)
    state.myQuestions.splice(index, 1, payload)
  },
  deletedQuestion (state, payload) {
    let index = state.myQuestions.map(q => { return q._id }).indexOf(payload._id)
    state.myQuestions.splice(index, 1)
  },
  setUsers (state, payload) {
    state.users = payload
  }
}

export default mutations
