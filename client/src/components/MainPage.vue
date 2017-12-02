<template lang="html">
  <div class="container">
    <div class="row">
      <Sidebar></Sidebar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import MainContent from '@/components/MainContent'
import {mapActions} from 'vuex'
export default {
  name: 'MainPage',
  components: {
    Sidebar,
    MainContent
  },
  methods: {
    ...mapActions(
      [
        'getAllPosts'
      ]
    )
  },
  created () {
    this.getAllPosts()
  }
}
</script>

<style lang="css">
</style>
