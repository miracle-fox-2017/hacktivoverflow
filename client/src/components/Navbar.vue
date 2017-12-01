<template>
  <header class="ui attached stackable menu">
    <nav class="ui container">
      <router-link class="item" to="/"><i class="home icon"></i>Home</a></router-link>
      <router-link class="item" to="/blog"><i class="file text outline icon"></i>Articles</a></router-link>
      <router-link class="item" to="/admin" v-if="fbAccessToken"><i class="dashboard icon"></i>Dashboard</a></router-link>
      <div class="right item">
          <div v-if="fbAccessToken">
            <button class="ui basic button none-shadow" @click="logout">Logout</button>
          </div>
          <div v-else>
            <button class="ui basic button none-shadow" @click="login">Login</button>
            <button class="ui basic button">Signup</button>
          </div>
        </div>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'Navbar',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        fbAccessToken: localStorage.getItem('fbAccessToken')
      }
    },
    methods: {
      login () {
        FB.login(response => {
          console.log('fblogin response ', response)
          if (response.status === 'connected') {
            localStorage.setItem('fbAccessToken', response.authResponse.accessToken)
            FB.api('/me', {
                fields: ['id', 'name', 'gender', 'picture', 'email']
              }, dataUser => {
               // console.log(response);
               this.$http.post('/users', dataUser)
               .then(result => console.log(result))
               .catch(err => console.log(err))
             });

          } else {
            console.log('User cancelled login or did not fully authorize.')
          }
        }, {scope: 'public_profile, email'})
      },
      logout () {
        localStorage.removeItem('fbAccessToken')
        location.reload()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
