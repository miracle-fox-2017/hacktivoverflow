<template lang="html">
  <div>
    <div class="card">
      <h4 class="card-header">{{post.title}}</h4>
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
