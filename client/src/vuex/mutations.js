let mutations = {
  setPosts (state, payload) {
    state.posts = payload
  },
  saveNewPost (state, payload) {
    console.log('ini console log di vuex', payload)
    state.posts.push(payload)
  },
  saveLoginCredentials (state, payload) {
    console.log('credentials sudah masuk mutations', payload)
    state.loginCredentials = payload
    console.log('credentials sudah di save di state login vuex', state.loginCredentials)
  },
  setComments (state, payload) {
    state.comments = payload
  },
  saveNewComment (state, payload) {
    state.comments.push(payload)
  }
}

export default mutations
