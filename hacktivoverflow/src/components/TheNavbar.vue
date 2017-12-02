<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <h1 class="navbar-brand">H8O</h1>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" @click="login">
          Login
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      ...mapState([
        'userDetails'
      ])
    }
  },
  methods: {
    login () {
      this.$emit('show-login-panel')
    }
  }
  // watch: {
  //   userDetails () {
  //     if (this.userDetails !== null) {
  //       this.showLoginButton = false
  //     }
  //   }
  // }
}
</script>

<style scoped>
</style>
