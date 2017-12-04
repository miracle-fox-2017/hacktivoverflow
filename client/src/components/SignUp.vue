<template>
  <div class="sign-up">
    <p>Let's create a new Account</p>
    <p v-if="error">Invalid Input || password must be min 8 chars</p>
    <form @submit.prevent="auth(formSignUp)">
      <input type="text" v-model="formSignUp.username" placeholder="Username">
      <input type="text" v-model="formSignUp.email" placeholder="Email">
      <input type="password" v-model="formSignUp.password" placeholder="Password">
      <button type="submit">Sign Up</button>
    </form>
    <span>or go back to <router-link to="/login">login</router-link></span>
  </div>
</template>

<script>
/* eslint-disable */
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }]*/
import { mapActions } from 'vuex'
import firebase from 'firebase'
export default {
  name: 'SignUp',
  data () {
    return {
      formSignUp: {
        username: '',
        email: '',
        password: '',
        error: false
      }
    }
  },
  methods: {
    ...mapActions([
      'signup'
    ]),
    auth (dataUser) {
    firebase.auth().createUserWithEmailAndPassword(dataUser.email, dataUser.password)
    .then((dataUser) => {
      console.log('berhasil auth')
      this.signup(this.formSignUp)
      this.$router.replace('hacktivoverflow')
    })
    .catch(err => {
      console.log(err)
      this.error = true
    })
    }
  }
}
</script>

<style scoped>
.signUp {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 10px;
  width: 10%;
  cursor: pointer;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>
