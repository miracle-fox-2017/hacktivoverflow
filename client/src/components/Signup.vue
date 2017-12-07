<template>
  <div class="hello">
    <navbar />
    <div class="wrapper">
    <h3> Register </h3>
      <form class="form-signin text-center" @submit.prevent="signup">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="username" class="form-control" v-model="username">
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" class="form-control" v-model="password">
        </div>
        <button type="submit" class="btn btn-lg btn-primary btn-block">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'
  export default {
    data: function () {
      return {
        username: '',
        password: ''
      }
    },
    name: 'Signup',
    components: {
      Navbar
    },
    methods: {
      signup () {
        this.$http.post('/users/signup', {
          username: this.username,
          password: this.password
        })
        .then(function (response) {
          if (response.data === '') {
            alert('Username is already in use!')
          } else {
            alert('Successfully registered. Please login first to start posting!')
          }
        })
        .catch((reason) => {
          console.log(reason)
        })
        this.$router.push('/signin')
      }
    }
  }
</script>

<style scoped>
.wrapper {	
    margin-top: 80px;
    margin-bottom: 80px;
}
.form-signin {
  max-width: 380px;
  padding: 15px 35px 45px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,0.1);  
}
</style>