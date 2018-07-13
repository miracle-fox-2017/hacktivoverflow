<template>
  <div style="padding:30px;" class="ui container segment">
    <div class="ui grid">
      <div style="padding: 40px 20px !important" class="eleven wide column">
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
