<template lang="html">
  <div class="col-md-3">
    <div class="container sideBar">
      <router-link :to="`/main-page`">
        <p>Home</p>
      </router-link>
      <router-link :to="`/main-page/post`">
        <p>Post Now</p>
      </router-link>
      <div v-for="(post, index) in posts" :post="post" :key="index">
        <router-link :to="`/main-page/details/${post._id}`">
          <p>{{post.title}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  computed: {
    posts () {
      return this.$store.state.posts
    }
  }
}
</script>

<style lang="css" scoped>
.sideBar {
  background-color: #eee;
  border-radius: 5px;
}
</style>
