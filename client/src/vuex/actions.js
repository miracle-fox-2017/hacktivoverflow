import axios from 'axios'
import router from '../router'

let actions = {
  getAllPosts ({commit}) {
    axios.get('http://localhost:3000/post')
    .then(({data}) => {
      commit('setPosts', data)
    }).catch((err) => {
      console.log(err)
    })
  },
  postNewQuestion ({commit}, payload) {
    console.log('ini data inputan dari depan', payload)
    axios.post('http://localhost:3000/post', payload)
    .then(({data}) => {
      commit('saveNewPost', data)
    }).catch((err) => {
      console.log(err)
    })
  },
  postLoginCredentials ({commit}, payload) {
    console.log('ini data login dari depan', payload)
    axios.post('http://localhost:3000/login', payload)
    .then(({data}) => {
      commit('saveLoginCredentials', data)
      router.push('main-page')
    }).catch((err) => {
      console.log(err)
    })
  }
}

export default actions
