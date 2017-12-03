<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <router-view />
      </div>
      <div class="col-md-4">
        <the-right-side-bar />
      </div>
    </div>
  </div>
</template>

<script>
import TheRightSideBar from '@/components/TheRightSideBar'
export default {
  components: {
    TheRightSideBar
  }
}
</script>

<style lang="css">
</style>
