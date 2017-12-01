import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import VueFirestore from 'vue-firestore'

require('firebase/firestore')

Vue.use(Vuex)
Vue.use(VueFirestore)

let config = {
  apiKey: 'AIzaSyA8M-l_dP6_Jz3rK2GOaWifHzHFbsS-RL0',
  authDomain: 'h8-overflow.firebaseapp.com',
  databaseURL: 'https://h8-overflow.firebaseio.com',
  projectId: 'h8-overflow',
  storageBucket: '',
  messagingSenderId: '146128308394'
}

const firebaseApp = firebase.initializeApp(config)
let firestore = firebaseApp.firestore()
let questionDB = firestore.collection('questions')

export default new Vuex.Store({
  state: {
    questions: [],
    questionDetail: '',
    answers: []
  },
  actions: {
    getQuestions ({ commit }) {
      questionDB.get()
        .then(snapshot => commit('setQuestions', snapshot))
        .catch(err => console.log(err))
    },
    getAnswers ({commit}, payload) {
      questionDB.doc(payload).collection('answers').get()
        .then(snapshot => commit('setAnswers', snapshot))
        .catch(err => console.log(err))
    },
    getQuestion ({commit}, payload) {
      questionDB.doc(payload).get()
        .then(snapshot => commit('setQuestion', snapshot))
        .catch(err => console.log(err))
    }
  },
  mutations: {
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
    }
  }
})
