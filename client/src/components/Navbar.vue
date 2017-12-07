<template>
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
    <router-link :to="`/`">
      <a class="navbar-brand" href="/">Hacktivoverflow</a></router-link>
    </div>
    <ul class="nav navbar-nav navbar-right">
      <li v-show="token == undefined"> <router-link :to="`/signup`">
        <span class="glyphicon glyphicon-user"></span> Sign Up </router-link>
        </li>
      <li v-show="token == undefined"><router-link :to="`/signin`">
      <span class="glyphicon glyphicon-log-in"></span> Login</router-link></li>
      <li v-show="token != undefined"> <a href="/" @click="logout">
        <span class="glyphicon glyphicon-log-out"></span> Logout </a></li>
    </ul>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  data: function () {
    return {
      token: ''
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.token = ''
      alert('Good Bye!')
      this.$router.push('/')
    }
  },
  created () {
    this.token = localStorage.getItem('token')
  }
}
</script>

<style>
</style>