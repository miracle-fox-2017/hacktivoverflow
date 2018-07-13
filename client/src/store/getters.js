const getters = {
  questions: state => {
    return state.questions
  },
  answers: state => {
    return state.answers
  },
  myQuestions: state => {
    return state.myQuestions
  },
  formQuestion: state => {
    return state.formQuestion
  },
  users: state => {
    return state.users
  }
}

export default getters
