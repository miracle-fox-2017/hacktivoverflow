<template>
  <div id="app">
    <navigation @show-login-panel="showLogin = true"/>
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
  data () {
    return {
      ...mapState([
        'userDetails'
      ]),
      showLogin: false
    }
  },
  watch: {
    userDetails () {
      if (this.userDetails !== null) {
        // this.showLogin = false
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
