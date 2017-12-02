<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <form @submit.prevent="postLoginCredentials(formLogin)">
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input type="text" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter username" v-model="formLogin.username">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Password" v-model="formLogin.password">
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'Login',
    data () {
      return {
        formLogin: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions(
        [
          'postLoginCredentials'
        ]
      )
    }
  }
</script>
