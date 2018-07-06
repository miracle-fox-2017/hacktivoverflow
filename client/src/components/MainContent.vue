<template lang="html">
  <div class="col-md-9">
    <PostSummary v-for="(post, index) in posts" :post="post" :key="index" @sendDataDelete="receiveDataDelete"></PostSummary>
  </div>
</template>

<script>
import PostSummary from '@/components/PostSummary'
export default {
  components: {
    PostSummary
  },
  computed: {
    posts () {
      return this.$store.state.posts
    }
  },
  methods: {
    receiveDataDelete (fromChild) {
      this.posts.forEach((data, index) => {
        if (data._id === fromChild.list._id) {
          this.posts.splice(index, 1)
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
