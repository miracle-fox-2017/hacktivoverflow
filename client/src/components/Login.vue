<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <form @submit.prevent="postLoginCredentials(formLogin)">
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input type="text" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter username" v-model="formLogin.username">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Password" v-model="formLogin.password">
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Login</button>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalRegister">Register</button>
        </div>
      </form>
      <!-- Modal -->
      <div class="modal" tabindex="-1" role="dialog" id="modalRegister">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Register New Account</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="registerAccount(formRegister)">
                <div class="form-group">
                  <label for="exampleInputEmail1">First Name</label>
                  <input type="text" class="form-control" id="first_name" aria-describedby="emailHelp" placeholder="Enter first name" v-model="formRegister.first_name">
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Last Name</label>
                  <input type="text" class="form-control" id="last_name" aria-describedby="emailHelp" placeholder="Enter last name" v-model="formRegister.last_name">
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Username</label>
                  <input type="text" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter username" v-model="formRegister.username">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="password" placeholder="Password" v-model="formRegister.password">
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-primary" id="regBtn">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'Login',
    data () {
      return {
        formLogin: {
          username: '',
          password: ''
        },
        formRegister: {
          first_name: '',
          last_name: '',
          username: '',
          password: '',
          role: 'user'
        }
      }
    },
    methods: {
      ...mapActions(
        [
          'postLoginCredentials',
          'registerAccount'
        ]
      )
    }
  }
</script>
