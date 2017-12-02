<template>
  <div class="ui container">
    <div class="ui grid centered stackable">
      <div class="seven wide column">
        <div class="ui segment login">
          <div class="ui header center aligned">
            Login To - HacktivOverflow
          </div>
          <div class="ui form">
            <div class="field">
              <label>Username</label>
              <input name="username" placeholder="Username" type="text" v-model="username">
            </div>
            <div class="field">
              <label>Password</label>
              <input name="password" placeholder="Password" type="password" v-model="password">
            </div>
            <div class="field">
              <button class="ui primary button fluid" type="submit" @click="login">Login</button>
            </div>
            <div class="field" style="text-align: center;">-or-</div> 
            <div class="field">
              <g-signin-button class="ui google plus button fluid" :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">
                <i class="google icon"></i>
                Login with Google
              </g-signin-button>
            </div>
            <div class="ui divider"></div>
            <div class="field" style="text-align: center;">
              Don't have an account? <a href="#">Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <a href="#" @click="signOut();">Sign out</a> -->
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      googleSignInParams: {
        client_id: '606831286728-13rd42d2k5li26uelcu4u2h49ekhce0f.apps.googleusercontent.com'
      },
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$http.post('/users/login', {
        username: this.username,
        password: this.password
      })
      .then(({data}) => {
        localStorage.setItem('accesstoken', data.accesstoken)
      })
      .catch(err => console.log(err))
    },
    signOut () {
      var auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(function () {
        console.log('User signed out.')
      })
    },
    onSignInSuccess (googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      this.$http.post('/users/login', {}, {
        headers: {
          google_token: id_token
        }
      })
      .then(({data}) => {
        localStorage.setItem('accesstoken', data.accesstoken)
      })
    },
    onSignInError (error) {
      // `error` contains any error occurred. 
      console.log('OH NOES', error)
    }
  }
}
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  /* display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff; */
}
</style>
