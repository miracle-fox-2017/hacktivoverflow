let mutations = {
  setPosts (state, payload) {
    state.posts = payload
  },
  saveNewPost (state, payload) {
    state.posts.push(payload)
  },
  saveLoginCredentials (state, payload) {
    state.loginCredentials = payload
  },
  setComments (state, payload) {
    state.comments = payload
  },
  setCommentById (state, payload) {
    state.commentById = payload
  },
  saveNewComment (state, payload) {
    state.comments.push(payload)
    state.commentById.push(payload)
  }
}

export default mutations
