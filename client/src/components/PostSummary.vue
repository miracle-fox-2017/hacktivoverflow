<template lang="html">
  <div>
    <div class="card">
      <router-link :to="`/main-page/details/${post._id}`">
        <h4 class="card-header">{{post.title}}</h4>
      </router-link>
      <button class="btn btn-danger" type="button" name="button" @click="deletePost(post._id)">Delete this post</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostSummary',
  props: ['post'],
  methods: {
    deletePost (postId) {
      this.$axios.delete(`http://localhost:3000/post/${postId}`)
      .then(({data}) => {
        this.$emit('sendDataDelete', {
          list: data
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="css">

</style>
