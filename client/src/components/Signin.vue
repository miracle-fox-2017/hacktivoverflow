<template>
  <div class="hello">
    <navbar />
    <div class="wrapper">
          <form class="form-signin text-center" @submit.prevent="login">
            <h3>Login</h3>
              <input type="text" class="form-control" v-model="username" placeholder="username" required="" autofocus="" />
              <input type="password" class="form-control" v-model="password" placeholder="Password" required="" />
              <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
          
          </form>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'Signin',
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  components: {
    Navbar
  },
  methods: {
    login () {
      this.$http.post('/users/signin', {
        username: this.username,
        password: this.password
      })
      .then(function (response) {
        localStorage.setItem('token', response.data.token)
        alert('Successfully login')
      })
      .catch(function (reason) {
        console.log(reason)
      })
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

.form-signin button{
    margin : 25px 0;
}
</style>