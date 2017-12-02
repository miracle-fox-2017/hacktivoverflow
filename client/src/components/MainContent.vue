<template lang="html">
  <div class="col-md-9">
    <PostSummary v-for="(post, index) in posts" :post="post" :key="index"></PostSummary>
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
  }
}
</script>

<style lang="css">
</style>
