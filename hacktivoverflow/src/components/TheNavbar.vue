<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <router-link to="/">
        <h1 class="navbar-brand">H8O</h1>
      </router-link>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" @click="login">
          Login
        </li>
        <div class="float-right">
        </div>
      </ul>
      <div class="float-right">
        <button type="button" class="btn btn-primary btn-lg btn-block" @click="postQuestion = true">Ask a Question</button>
      </div>
    </nav>
    <ask-question v-if="postQuestion" @hideme="postQuestion = false"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import askQuestion from '@/components/QuestionCreate'
export default {
  components: {
    'ask-question': askQuestion
  },
  data () {
    return {
      ...mapState([
        'userDetails'
      ]),
      postQuestion: false
    }
  },
  methods: {
    login () {
      this.$emit('show-login-panel')
    }
  }
  // watch: {
  //   userDetails () {
  //     if (this.userDetails !== null) {
  //       this.showLoginButton = false
  //     }
  //   }
  // }
}
</script>

<style scoped>
</style>
