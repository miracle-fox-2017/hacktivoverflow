import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'

const http = axios.create({
  baseURL: 'http://localhost:3000/'
})

Vue.use(Vuex)

const state = {
  users: []
}

const mutations = {
  setUsers (state, payload) {
    console.log('data di mutations >>', payload)
    state.users = payload
  },
  signupUser (state, payload) {
    state.users.push(payload)
  },
  loginUser (state, payload) {
    state.users.push(payload)
  }
}

const actions = {
  getAllUsers ({ commit }) {
    http.get('api/users').then(({data}) => {
      commit('setUsers', data)
    }).catch(err => {
      console.error(err)
    })
  },
  loginUser ({ commit }, user) {
    http.post('api/users/login', user).then(({data}) => {
      commit('loginUser', data)
      if (data.success) {
        swal({
          title: 'Good job!',
          text: 'username & password match!',
          type: 'success'
        }).then(function () {
          window.location.href = 'http://localhost:8080/'
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.username)
          localStorage.setItem('user_Id', data.user_Id)
        })
      }
    }).catch(err => {
      if (err && 403) {
        swal(
          'Oops...',
          'Wrong Username & Password!',
          'error'
        )
      }
    })
  },
  registerUser ({ commit }, newUser) {
    http.post('api/users', newUser).then(({data}) => {
      console.log('data register di actions >>', data)
      commit('signupUser', data)
      if (data.msg) {
        console.log('masuk')
        let msg = data.msg
        // alert(msg)
        swal(
          'Oops...',
          msg,
          'error'
        )
      } else {
        swal(
          'Good job!',
          'Your Acoount was created',
          'success'
        )
        window.location.href = '/login'
      }
    }).catch(err => {
      console.error(err)
    })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
