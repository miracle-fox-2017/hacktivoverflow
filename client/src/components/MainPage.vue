<template lang="html">
  <div class="container">
    <router-link :to="`/`">
      <button class="btn btn-primary" type="button" name="button" style="margin-bottom: 4em" @click="logOut()">Log Out</button>
    </router-link>
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
        'getAllPosts',
        'getAllComments'
      ]
    ),
    logOut () {
      this.loginCredentials = {}
    }
  },
  created () {
    this.getAllPosts()
    this.getAllComments()
  },
  computed: {
    loginCredentials () {
      return this.$store.state.loginCredentials
    }
  }
}
</script>

<style lang="css">
</style>
