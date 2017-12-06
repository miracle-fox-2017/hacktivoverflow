<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link class="navbar-brand" :to="{ name: 'Index'}">Pak Haji Overflow</router-link>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li><router-link :to="{ name: 'Index'}">Timeline</router-link></li>
          <li><router-link :to="{ name: 'User'}">My Questions</router-link></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="" data-toggle="modal" data-target="#AddQModal"><span class="glyphicon glyphicon-user"></span>Add New Question</a></li>
        <li><a href="" @click="userLogout"><span class="glyphicon glyphicon-log-in"></span>Logout</a></li>
        </ul>
      </div>
    </div>
</nav>
</template>

<script>
export default {
  methods: {
    userLogout () {
      localStorage.removeItem('tokenOverflow')
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style>

</style>
