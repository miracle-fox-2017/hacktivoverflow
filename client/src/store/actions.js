import router from '../router'
import axios from 'axios'

const http = axios.create({baseURL: 'http://localhost:3000'})

const actions = {
  getAllQuestions (context) {
    http.get('/questions')
    .then(({data}) => {
      context.commit('setQuestions', data)
    })
    .catch(err => console.log(err))
  },
  postNewQuestion (context, newQuestion) {
    http.post('/questions', newQuestion, {
      headers: {
        accesstoken: localStorage.getItem('accesstoken')
      }
    })
    .then(({data}) => {
      context.commit('saveNewQuestion', data)
      router.push('/')
    })
    .catch(err => console.log(err))
  },
  getAnswers (context, questionId) {
    http.get(`/answers/${questionId}`)
    .then(({data}) => {
      context.commit('setAnswers', data)
    })
    .catch(err => console.log(err))
  },
  postNewAnswer (context, newAnswer) {
    // console.log(newAnswer)
    http.post('/answers', newAnswer, {
      headers: {
        accesstoken: localStorage.getItem('accesstoken')
      }
    })
    .then(({data}) => {
      context.commit('saveNewAnswer', data)
    })
    .catch(err => console.log(err))
  },
  deleteAnswer (context, answerId) {
    http.delete(`/answers/${answerId}`, {
      headers: {
        accesstoken: localStorage.getItem('accesstoken')
      }
    })
    .then(({data}) => {
      context.commit('removeAnswer', data)
    })
    .catch(err => console.log(err))
  },
  editQuestions (context, questionData) {
    http.put(`/questions/${questionData.questionId}`, questionData.formQuestion, {
      headers: {
        accesstoken: localStorage.getItem('accesstoken')
      }
    })
    .then(({data}) => {
      context.commit('editedQuestion', data)
      /* eslint-disable */
      $('.small.modal.edit')
        .modal('hide')
      ;
    })
  .catch(err => console.log(err))
  },
  getMyQuestions (context) {
    http.get('/questions/myquestions', {
      headers: {
        accesstoken: localStorage.getItem('accesstoken')
      }
    })
    .then(({data}) => {
      context.commit('setMyQuestions', data)
    })
    .catch(err => console.log(err))
  },
  deleteQuestions (context, id) {
    http.delete(`/questions/${id}`, {
      headers: {
        accesstoken: localStorage.getItem('accesstoken')
      }
    })
    .then(({data}) => {
      context.commit('deletedQuestion', data)
    })
    .catch(err => console.log(err))
  },
  getAllUsers (context) {
    http.get('/users')
    .then(({data}) => {
      context.commit('setUsers', data)
    })
    .catch(err => console.log(err))
  }
}

export default actions
