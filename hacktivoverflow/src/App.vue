<template>
  <div id="app">
    <navigation/>
    <sign-in v-if="showLogin"/>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import navbar from '@/components/TheNavbar'
import signIn from '@/components/SignIn'
import {mapState} from 'vuex'
export default {
  name: 'app',
  components: {
    navigation: navbar,
    'sign-in': signIn
  },
  data: {
    ...mapState([
      'userDetails'
    ]),
    showLogin: true
  },
  watch: {
    userDetails () {
      if (this.userDetails !== null) {
        this.showLogin = false
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
</style>
