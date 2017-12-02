<template>
  <div class="ui container segment">
    <div class="ui grid">
      <div class="eleven wide column">
        <router-view/>
      </div>
      <div class="five wide column">
        <Sidebar/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
export default {
  components: {
    Sidebar
  }

}
</script>

<style>

</style>
