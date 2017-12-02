import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import VueFirestore from 'vue-firestore'
import firebaseui from 'firebaseui'

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

var uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: 'http://localhost:8080',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      scopes: [
        'public_profile',
        'email'
      ]
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      defaultCountry: 'ID',
      defaultNationalNumber: '1234567890',
      loginHint: '+628123456789'
    }
  ]
}

const firebaseApp = firebase.initializeApp(config)
var ui = new firebaseui.auth.AuthUI(firebase.auth())
let firestore = firebaseApp.firestore()
let questionDB = firestore.collection('questions')

export default new Vuex.Store({
  state: {
    questions: [],
    questionDetail: '',
    answers: [],
    userDetails: null
  },
  actions: {
    signIn ({ dispatch }) {
      ui.start('#firebaseui-auth-container', uiConfig)
      dispatch('getUserInfo')
    },
    getUserInfo ({ commit }) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName
          var email = user.email
          // var emailVerified = user.emailVerified
          // var photoURL = user.photoURL
          // var uid = user.uid
          // var phoneNumber = user.phoneNumber
          // var providerData = user.providerData
          user.getIdToken().then(function (accessToken) {
            commit('setUserDetails', {
              displayName: displayName,
              email: email
            })
          })
        }
      }, function (error) {
        console.log(error)
      })
    },
    checkToken ({ dispatch, state }) {
      if (state.userDetails == null) {
        dispatch('signIn')
      }
    },
    getQuestions ({ commit }) {
      questionDB.get()
        .then(snapshot => commit('setQuestions', snapshot))
        .catch(err => console.log(err))
    },
    getAnswers ({ commit }, payload) {
      questionDB.doc(payload).collection('answers').get()
        .then(snapshot => commit('setAnswers', snapshot))
        .catch(err => console.log(err))
    },
    getQuestion ({ commit }, payload) {
      questionDB.doc(payload).get()
        .then(snapshot => commit('setQuestion', snapshot))
        .catch(err => console.log(err))
    },
    replyQuestion ({ dispatch }, payload) {
      questionDB.doc(payload.questionId)
        .collection('answers').add({
          answer: payload.answer
        })
        .then(ref => console.log(ref.id))
        .catch(err => console.log(err))
    },
    watchQuestions ({ commit }) {
      questionDB.onSnapshot(snapshot => {
        commit('addQuestion', snapshot)
      })
    },
    watchAnswers ({ commit }, payload) {
      questionDB.doc(payload)
        .collection('answers').onSnapshot(snapshot => {
          commit('addAnswer', snapshot)
        })
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
    },
    addQuestion (state, payload) {
      for (let update of payload.docChanges) {
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
    }
  }
})
