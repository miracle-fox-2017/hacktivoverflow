<template>
  <div>
    <nav class="sticky-top myNavBar navbar-expand-lg navbar navbar-dark bg-dark">
      <div class="container">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand" href="/">HacktivOverFlow</a>
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
            </li>
            <li v-if="user" class="nav-item">
              <router-link style="text-decoration: none;"  :to="'/author/' + authorId">
                <a @click="getAllQuestionByAuthor(authorId)" class="nav-link" href="">Your Question</a>
              </router-link>
            </li>
            <li v-if="user" class="nav-item">
              <a data-toggle="modal" data-target="#ModalCreate" class="nav-link" href="">Create Question</a>
            </li>
          </ul>
          <div style="margin-right:2%;" v-if="user">
            <p style="color:white;" class="my-2 my-sm-0">hello.. {{user}}</p>
          </div>
          <a v-if="user" v-on:click="toLogout" class="btn btn-outline-secondary" href="" role="button">Logout</a>
          <a v-if="!user" class="btn btn-outline-secondary" href="/login" role="button" style="margin-right:1%;">Login</a>
          <a v-if="!user" class="btn btn-outline-secondary" href="/register" role="button">Register</a>
        </div>
      </div>
    </nav>
    <ModalCreateQuestion/>
  </div>
</template>

<script>
import ModalCreateQuestion from '@/components/ModalCreateQuestion'
import {mapActions} from 'vuex'
export default {
  name: 'Navbar',
  components: {
    ModalCreateQuestion
  },
  data: function () {
    return {
      user: '',
      authorId: localStorage.getItem('user_Id')
    }
  },
  created () {
    this.user = localStorage.getItem('name')
    // console.log('this.user >', localStorage.getItem('user_Id'))
  },
  methods: {
    toLogout () {
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      localStorage.removeItem('user_Id')
      this.$router.push({name: 'MainPage'})
    },
    ...mapActions([
      'getAllQuestionByAuthor'
    ])
  }
}
</script>

<style>
.myNavBar{
  margin-bottom: 5%;
}
</style>
