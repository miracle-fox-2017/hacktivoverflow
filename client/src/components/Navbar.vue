<template>
  <header class="ui attached stackable menu">
    <nav class="ui container">
      <router-link class="item" to="/"><i class="home icon"></i>Home</a></router-link>
      <router-link class="item" to="/blog"><i class="file text outline icon"></i>Articles</a></router-link>
      <router-link class="item" to="/admin" v-if="token"><i class="dashboard icon"></i>Dashboard</a></router-link>
      <div id="remove" class="right item">
        <div v-if="token">
          <!-- <button class="ui basic button none-shadow" @click="logout">Logout</button> -->
          <button class="ui facebook button" @click="logout">
            <i class="sign out icon"></i>
            Sign out
          </button>
        </div>
        <div v-else>
          <!-- <button class="ui basic button none-shadow" @click="login">Login</button> -->
          <button class="ui facebook button" @click="login">
            <i class="facebook icon"></i>
            Sign in with Facebook
          </button>
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
        token: localStorage.getItem('token')
      }
    },
    methods: {
      login () {
        window.FB.login (response => {
          console.log('fblogin response ', response)
          if (response.status === 'connected') {
            window.FB.api('/me', {fields: ['id', 'name', 'gender', 'picture', 'email']}, dataUser => {
              this.$http.post('/users', dataUser)
              .then(result => {
                window.localStorage.setItem('token', result.data.token)
                window.location.reload()
              })
              .catch(err => console.log(err))
            })
          } else {
            console.log('User cancelled login or did not fully authorize.')
          }
        }, {scope: 'public_profile, email'})
      },
      logout () {
        window.localStorage.removeItem('token')
        window.location.reload()
      }
    },
    created () {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: '1826498564044116',
          cookie: true,  // enable cookies to allow the server to access the session
          xfbml: true,  // parse social plugins on this page
          version: 'v2.8' // use graph api version 2.8
        })
      };
      (function (d, s, id) { // Load the SDK asynchronously
        var js, fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) return
        js = d.createElement(s)
        js.id = id
        js.src = 'https://connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'facebook-jssdk'))
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #remove:before {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    height: 100%;
    width: 1px;
    background: transparent;
  }
</style>
