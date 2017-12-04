<template lang="html">
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="collapse navbar-collapse" id="navbarColor01">
      <div class="container">
        <div class="row">
          <div class="col-md-10">
            <a class="navbar-brand" href="#">Djawab</a>
          </div>
          <div class="col-md-2">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#" data-toggle="modal" data-target="#registermodal">Register <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <ul class="nav nav-pills">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">User</a>
                    <div class="dropdown-menu" x-placement="bottom-start" style="position: absolute; transform: translate3d(0px, 47px, 0px); top: 0px; left: 0px; will-change: transform;">
                      <a href="" class="dropdown-item" data-toggle="modal" data-target="#loginmodal">Login</a>
                      <a class="dropdown-item" href="#">My Question</a>
                      <a class="dropdown-item" href="#" v-on:click="logout">Logout</a>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal login -->
      <div class="modal fade" id="loginmodal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Login</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <fieldset>
                  <div class="form-group">
                    <label for="emailinput">Email</label>
                    <input type="email" class="form-control" id="emailinput" aria-describedby="emailHelp" placeholder="Masukkan email anda" v-model="email">
                    <small id="emailHelp" class="form-text text-muted"></small>
                  </div>
                  <div class="form-group">
                    <label for="passwordinput">Password</label>
                    <input type="password" class="form-control" id="passwordinput" aria-describedby="emailHelp" placeholder="masukkan password" v-model="password">
                    <small id="emailHelp" class="form-text text-muted"></small>
                  </div>
                </fieldset>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" v-on:click="login" data-dismiss="modal">Login</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
  </nav>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HeaderMain',
  data () {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    login: function () {
      axios.post('http://localhost:3000/api/user/signin', {
        email: this.email,
        password: this.password
      })
      .then(function (response) {
        localStorage.setItem('access_token', response.data.access_token)
        this.email = ''
        this.password = ''
      })
      .catch(function (error) {
        console.log(error)
      })
    },

    logout: function () {
      localStorage.removeItem('access_token')
      location.reload()
    }
  }
}
</script>

<style lang="css">
</style>
