<template>
  <div class="ui container">
    <g-signin-button
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError">
      Sign in with Google
    </g-signin-button>
    <a href="#" @click="signOut();">Sign out</a>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      googleSignInParams: {
        client_id: '606831286728-13rd42d2k5li26uelcu4u2h49ekhce0f.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    signOut () {
      var auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(function () {
        console.log('User signed out.')
      })
    },
    onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user. 
      // See https://developers.google.com/identity/sign-in/web/reference#users 
      const profile = googleUser.getBasicProfile() // etc etc 
      console.log(profile)
      var id_token = googleUser.getAuthResponse().id_token;
      console.log(id_token)
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
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>
