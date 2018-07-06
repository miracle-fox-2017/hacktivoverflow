import axios from 'axios'
import router from '../router'

let actions = {
  getAllPosts ({commit}) {
    axios.get('http://18.217.192.109/post')
    .then(({data}) => {
      commit('setPosts', data)
    }).catch((err) => {
      console.log(err)
    })
  },
  postNewQuestion ({commit}, payload) {
    axios.post('http://18.217.192.109/post', payload)
    .then(({data}) => {
      commit('saveNewPost', data)
    }).catch((err) => {
      console.log(err)
    })
  },
  postLoginCredentials ({commit}, payload) {
    axios.post('http://18.217.192.109/login', payload)
    .then(({data}) => {
      commit('saveLoginCredentials', data)
      router.push('main-page')
    }).catch((err) => {
      console.log(err)
    })
  },
  getAllComments ({commit}) {
    axios.get('http://18.217.192.109/answer')
    .then(({data}) => {
      commit('setComments', data)
    }).catch((err) => {
      console.log(err)
    })
  },
  getCommentById ({commit}, payload) {
    axios.get(`http://18.217.192.109/answer/${payload._id}`)
    .then(({data}) => {
      commit('setCommentById', data)
    })
  },
  postNewComment ({commit}, payload) {
    axios.post('http://18.217.192.109/answer', payload)
    .then(({data}) => {
      commit('saveNewComment', data)
    }).catch((err) => {
      console.log(err)
    })
  },
  registerAccount ({commit}, payload) {
    axios.post(`http://18.217.192.109/user`, payload)
    .then(({data}) => {
      commit('saveNewUser', data)
    }).catch((err) => {
      console.log(err)
    })
  }
}

export default actions
