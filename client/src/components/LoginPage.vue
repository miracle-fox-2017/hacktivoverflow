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
          </div>
        </div>
        <div class="ui segment">
          <div class="field" style="text-align: center;">
            Don't have an account? <a style="padding: 5px !important" class="ui button primary" @click="modalSignup">Sign up</a>
          </div>
          <div class="field" style="text-align: center;">
            <router-link to="/">Back to Home.</router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- <a href="#" @click="signOut();">Sign out</a> -->
    <div style="padding: 30px !important;" class="ui small modal signup">
      <i class="close icon"></i>
      <!-- <div class="ui container"> -->
        <div class="content">
          <div class="ui form fluid">
            <div class="field">
              <label>Username</label>
              <input name="username" placeholder="Username" type="text" v-model="formSignup.username">
            </div>
            <div class="field">
              <label>Password</label>
              <input name="password" placeholder="Password" type="password" v-model="formSignup.password">
            </div>
            <div class="field">
              <label>First Name</label>
              <input name="first_name" placeholder="First Name" type="text" v-model="formSignup.first_name">
            </div>
            <div class="field">
              <label>Last Name</label>
              <input name="last_name" placeholder="Last Name" type="text" v-model="formSignup.last_name">
            </div>
            <div class="field">
              <label>Email</label>
              <input name="email" placeholder="Email" type="email" v-model="formSignup.email">
            </div>
            <div class="field">
              <div class="actions">
                <button class="ui ok primary button" @click="userSignup">Signup</button>
                <button class="ui deny button">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      <!-- </div> -->
    </div>
    <div class="ui active dimmer" :style="loader">
      <div class="ui loader"></div>
    </div>
    <div class="ui basic modal login">
      <div class="ui icon header" style="color: red;">
        <i class="remove circle outline icon"></i>
        Login Failed!!
      </div>
      <div class="content">
        <p style="color: red; text-align: center; font-size: 18px;">Incorrect Username/Password!!</p>
      </div>
      <div class="actions">
        <div class="ui red basic cancel inverted button">
          <i class="remove icon"></i>
          Close
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      loader: 'display: none;',
      googleSignInParams: {
        client_id: '606831286728-13rd42d2k5li26uelcu4u2h49ekhce0f.apps.googleusercontent.com'
      },
      username: '',
      password: '',
      formSignup: {
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: ''
      }
    }
  },
  methods: {
    login () {
      this.loader = 'display: block;'
      this.$http.post('/users/login', {
        username: this.username,
        password: this.password
      })
      .then(({data}) => {
        localStorage.setItem('userId', data.userId)
        localStorage.setItem('accesstoken', data.accesstoken)
        this.$router.push('/')
      })
      .catch(err => {
        $(`.ui.basic.modal.login`)
          .modal('show')
        ;
        this.loader = 'display: none;'
      })
    },
    // signOut () {
    //   var auth2 = gapi.auth2.getAuthInstance()
    //   auth2.signOut().then(function () {
    //     console.log('User signed out.')
    //   })
    // },
    onSignInSuccess (googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      this.loader = 'display: block;'
      this.$http.post('/users/login', {}, {
        headers: {
          google_token: id_token
        }
      })
      .then(({data}) => {
        localStorage.setItem('userId', data.userId)        
        localStorage.setItem('accesstoken', data.accesstoken)
        this.$router.push('/')        
      })
    },
    onSignInError (error) {
      // `error` contains any error occurred. 
      this.loader = 'display: none;'
      console.log('OH NOES', error)
    },
    modalSignup () {
      $('.small.modal.signup')
        .modal('show')
      ;
    },
    userSignup () {
      this.$http.post('/users/signup', this.formSignup)
      .then(({data}) => {
        console.log('Signup success!')
      })
      .catch(err => console.log(err))
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
