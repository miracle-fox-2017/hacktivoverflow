import axios from 'axios'

let actions = {
  getAllPosts ({commit}) {
    axios.get('http://localhost:3000/post')
    .then(({data}) => {
      commit('setPosts', data)
    }).catch((err) => {
      console.log(err)
    })
  }
}

export default actions
