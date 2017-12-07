<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand"><router-link to="/">Hacktiv Overflow</router-link></a>
      </div>
      <ul class="nav navbar-nav">
        <li><a href="#"<router-link to="/">Question</router-link></a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right" v-if="isLogin">
         <li> <router-link to="/myaccount"><button type="button" class="btn btn-warning">My Account</button></router-link></li>
         <li><button type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal">Ask Question</button></li>
        <li><a href="#" v-on:click="logout">Logout</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right" v-else>
        <li> <router-link to="/login">Sign in</router-link></li>
      </ul>
    </div>
    <div>
    <TheAskQuestion/>
  </div>
  </nav>
  
</template>

<script>
import TheAskQuestion from '@/components/TheAskQuestion'

export default {
  components: {
    TheAskQuestion
  },
  data () {
    return {
      isLogin: localStorage.getItem('token')
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/login')
      location.reload()
    }
  }
}
</script>

<style>

</style>
