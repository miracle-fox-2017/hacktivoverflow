<template lang="html">
  <div>
    <div class="card">
      <router-link :to="`/main-page/details/${post._id}`">
        <h4 class="card-header">{{post.title}}</h4>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostSummary',
  props: ['post']
}
</script>

<style lang="css">

</style>
