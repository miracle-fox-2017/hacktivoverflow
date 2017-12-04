<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand"><router-link to="/">Hacktiv Overflow</router-link></a>
      </div>
      <ul class="nav navbar-nav">
        <li><a href="#">Questions</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li v-if="isLogin"> <a href="#" v-on:click="logout">Logout</a></li>
        <li v-else> <router-link to="/login">Sign in</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      isLogin: localStorage.getItem('token')
    }
  },
  methods: {
    logout () {
      localStorage.clear();
      this.$router.push('/login')
      location.reload();
    }
  }
}
</script>

<style>

</style>
