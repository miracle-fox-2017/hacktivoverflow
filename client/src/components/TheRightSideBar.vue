<template lang="html">
  <div class="right-panel well">
    <h3>Top Question</h3>
    <div class="list-group">
      <router-link class="list-group-item" :to="{ path: '/question/1', params: {} }">
        <h4 class="list-group-item-heading">programming black magic</h4>
        <p class="list-group-item-text">1 Answer, 20 Vote</p>
      </router-link>
      <a href="#" class="list-group-item">
        <h4 class="list-group-item-heading">cara menghilang</h4>
        <p class="list-group-item-text">1 Answer, -20 Vote</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
