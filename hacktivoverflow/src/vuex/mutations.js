const mutations = {
  setQuestions (state, payload) {
    let questions = []
    payload.forEach(doc => {
      questions.push({
        id: doc.id,
        title: doc.data().title,
        body: doc.data().body
      })
    })
    state.questions = questions
  },
  setAnswers (state, payload) {
    let answers = []
    payload.forEach(doc => {
      answers.push({
        id: doc.id,
        answer: doc.data().answer
      })
    })
    state.answers = answers
  },
  setQuestion (state, payload) {
    state.questionDetail = payload.data()
  },
  addQuestion (state, payload) {
    for (let update of payload.docChanges) {
      // console.log(update.id)
      state.questions.push(update.doc.data())
    }
  },
  addAnswer (state, payload) {
    for (let update of payload.docChanges) {
      state.answers.push(update.doc.data())
    }
  },
  setUserDetails (state, payload) {
    state.userDetails = payload
  },
  clearAnswers (state) {
    state.answers = []
  }
}

export default mutations
