<template lang="html">
  <div class="col-md-9">
    <div class="postDetails">
      <div class="card">
        <h4 class="card-header">{{postDetails.title}}</h4>
        <div class="card-body">
          <h4 class="card-title">Special title treatment</h4>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostDetails',
  props: ['postId'],
  data () {
    return {
      postDetails: {}
    }
  },
  methods: {
    getPostDetails () {
      this.$axios.get(`http://localhost:3000/post/${this.postId}`)
      .then(({data}) => {
        this.postDetails = data
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  created () {
    this.getPostDetails()
  }
}
</script>

<style lang="css">
</style>
