<template>
  <div>
    <nav class="navbar is-warning is-fixed-top contai">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="https://hacktiv8.com/img/logo-hacktiv8_bordered--md5--f7ee5fc69819b5ef3849344c119f5e18.png" alt="Modern convertation" width="50" height="80">
          <h1 class="title"> HacktivOverflow</h1>
        </a>
        <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            <router-link to="/">Questions</router-link>
          </a>
          <a class="navbar-item">
            <router-link to="/users">Users</router-link>
          </a>
        </div>
        <div v-if="!status" class="navbar-end">
          <div class="navbar-item">
            <form @submit.prevent="checkLogin(singin)">
              <div class="control is-grouped">
                <p class="control is-expanded">
                  <input class="input" v-model="singin.username" type="text" placeholder="Username">
                </p>
                <p class="control is-expanded">
                  <input class="input" v-model="singin.password" type="password" placeholder="Password">
                </p>
                <p class="control">
                  <button class="button is-dark">
                    Login
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div v-else class="navbar-end">
          <div class="navbar-item">
            <dropdown trigger="hover">
            <a class="navbar-link">
              <span class="icon">
                  <i class="fa fa-user-o"></i>
                </span>
              <span>{{ name }}</span>
            </a>
            <div slot="content">
              <menus>
                <menu-item icon="user">Profile</menu-item>
                <menu-item icon="lock">Settings</menu-item>
                <div class="divider"></div>
                <menu-item icon=""><a @click.prevent="loGout">Sign out</a></menu-item>
              </menus>
            </div>
          </dropdown>
          </div>
        </div>
      </div>
    </nav>
    <section v-if="!status" class="hero contai is-warning">
      <div class="hero-body ">
      <br/><br/>
      <div class="columns">
        <div class="column is-two-thirds">
          <br/>
          <h1 class="title">
            Welcome to the HacktivOverflow
          </h1>
          <div class="outer">
            <figure class="img1 embed news">
              <img src="https://hacktiv8.com/img/logo-hacktiv8_bordered--md5--f7ee5fc69819b5ef3849344c119f5e18.png" alt="hacktiv logo">
            </figure>
            </div>
        </div>
        <div class="column">
          <form @submit.prevent="registersUser">
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">Name</label>
              </div>
                <p class="control is-expanded">
                  <input class="input" v-model="register.name" type="text" placeholder="Name">
                </p>
            </div>
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">Email</label>
              </div>
                <p class="control is-expanded">
                  <input class="input" v-model="register.email" type="email" placeholder="Email">
                </p>
            </div>
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">Gender</label>
              </div>        
              <p class="control">
                <label class="radio">
                  <input type="radio" value="male" v-model="register.gender" >
                  Male
                </label>
                <label class="radio">
                  <input type="radio" value="female" v-model="register.gender">
                  Female
                </label>
              </p>
            </div>
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">Username</label>
              </div>
                <p class="control is-expanded">
                  <input class="input" v-model="register.username" type="text" placeholder="Username">
                </p>
            </div>
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">Password</label>
              </div>
                <p class="control is-expanded">
                  <input class="input" v-model="register.password" type="password" placeholder="Password">
                </p>
            </div>
            <button class="button is-dark">Sign Up</button>
            <a @click="clear" class="button">Reset</a>
          </form>
        </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Menu',
  data () {
    return {
      user_id: '',
      name: '',
      status : false,
      register: {        
        name: '',
        email: '',
        username: '',
        password: '',
        gender: ''
      },
      singin: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState([
      'login'
    ])
  },
  methods: {
    registersUser () {
      // console.log('MASUK', data)
      this.registerUser({...this.register})
      this.clear()
    },
    ...mapActions([
      'registerUser',
      'checkLogin',
      'clearSession'
    ]),
    clear () {
      console.log('clear jalan')
      this.register.name = '',
      this.register.email = '',
      this.register.username = '',
      this.register.password = '',
      this.register.gender = '',
      this.singin.usernam = '',
      this.singin.password = ''
    },
    loGout () {
      console.log('KELUAR')
      localStorage.clear()
      this.clearSession()
      this.status = false
    }
  },
  created () {
    let parsing = JSON.parse(localStorage.getItem('token'))
    // console.log('APA INI', parsing)
    if(parsing) {
      this.status = true
      this.name = localStorage.getItem('username')
      this.user_id = localStorage.getItem('user_id')
    }
  },
  watch: {
    login () {
      let parsing = JSON.parse(localStorage.getItem('token'))
      if(parsing) {
        localStorage.setItem('username', parsing.name)
        localStorage.setItem('user_id', parsing.user_id)
        this.name = localStorage.getItem('username')
        this.user_id = localStorage.getItem('user_id')
        this.status = true
      }
    },
    logGout () {
      this.$router.push('/')
    }
  }
}
</script>
