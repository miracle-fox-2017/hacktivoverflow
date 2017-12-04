<template>
  <div>
    <h3>Sign In</h3>
    <p v-if="error">Invalid Input || password must be min 8 chars</p>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="login">Let Me In</button>
    <p>You don't have an account? You can <router-link to="/signup"> create one</router-link></p>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: '',
      error: false
    }
  },
  methods: {
    ...mapActions([
      'findByEmail'
    ]),
    login: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.findByEmail(this.email)
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
.login  {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 20px;
  widht: 10%;
  cursor: pointer;
}
p {
  margin-top: 40px;
  font-size: 13px;
}

p a {
  text-decoration: underline;
  cursor: pointer;
}

</style>
