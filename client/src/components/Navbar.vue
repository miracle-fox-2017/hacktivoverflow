<template>
  <div class="ui borderless main menu fixed stackable" style="position: fixed; top: 0px; left: auto; z-index: 10; padding: 0 50px;">
    <!-- <div class="ui text container"> -->
      <div class="header item">
        <img class="ui image logo" src="../assets/img/logo.png">
      </div>
      <router-link class="item" to="/">Home</router-link>
      <router-link to="/users" class="item">Users</router-link>
      <div class="ui right item" tabindex="0" v-if="isLogin">
        <router-link style="margin-left: 20px;" class="ui primary button" to="/myaccount">My Account</router-link>
        <button style="margin-left: 20px;" class="ui primary button" @click="modalQuestion">Ask Question</button>
        <button style="margin-left: 20px;" class="ui negative button" @click="logout">Logout</button>
      </div>
      <div class="ui right item" tabindex="0" v-else>
        <router-link style="margin-left: 20px;" class="ui button" to="/login">Login</router-link>
      </div>
    <!-- </div> -->

    <div style="padding: 30px !important;" class="ui small modal question">
      <i class="close icon"></i>
      <div class="ui container">
        <AskQuestion/>
      </div>
    </div>
  </div>
</template>

<script>
import AskQuestion from '@/components/AskQuestion'
export default {
  components: {
    AskQuestion
  },
  data () {
    return {
      isLogin: localStorage.getItem('accesstoken')
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    },
    modalQuestion () {
      /* eslint-disable */
      $('.small.modal.question')
        .modal('show')
      ;
    }
  }
}
</script>

<style>
.ui.image.logo {
    width: 150px;
}
</style>
