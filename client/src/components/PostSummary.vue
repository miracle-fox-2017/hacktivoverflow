<template lang="html">
  <div>
    <div class="card">
      <router-link :to="`/main-page/details/${post._id}`">
        <h4 class="card-header">{{post.title}}</h4>
      </router-link>
      <button class="btn btn-danger" type="button" name="button" @click="deletePost(post._id)" :id="`del-btn${post._id}`">Delete this post</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostSummary',
  props: ['post'],
  methods: {
    deletePost (postId) {
      this.$axios.delete(`http://18.217.192.109/post/${postId}`)
      .then(({data}) => {
        this.$emit('sendDataDelete', {
          list: data
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  computed: {
    loginCredentials () {
      return this.$store.state.loginCredentials
    }
  },
  mounted () {
    if (this.loginCredentials.role === 'admin' || this.post.userPost._id === this.loginCredentials.id) {
      document.querySelector(`#del-btn${this.post._id}`).hidden = false
    } else {
      document.querySelector(`#del-btn${this.post._id}`).hidden = true
    }
  }
}
</script>

<style lang="css">

</style>
