<template lang="html">
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link class="navbar-brand" :to="{ path: '/', params: {} }">Hacktiv Overflow</router-link>
      </div>
      
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
        <ul class="nav navbar-nav">
          <li @click="cekLogin">
            <router-link :to="{ path: '/ask', params: {} }">Ask A Question</router-link>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li v-if="!statusLogin" ><button @click="getFbToken" class="btn fix-margin blue-facebook" type="button" name="button"><span class="fa fa-facebook-square"></span> Login with facebook</button></li>
          <li v-else class="fix-dropdown">{{ dataUser.name }} <img :src="dataUser.picture" class="navbar-profile-picture"> <button @click="logout" type="button" class="btn btn-default fix-margin" name="button">logout</button></li>
        </ul>
      </div>
    </div>
    <div v-if="alertPleaseLogin" class="alert alert-dismissible alert-danger">
      <button @click="dismissAlertLogin" type="button" class="close" data-dismiss="alert">&times;</button>
      please log in
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: function () {
    return {
      alertPleaseLogin: false,
      dataUser: ''
    }
  },
  computed: {
    ...mapState([
      'statusLogin'
    ])
  },
  methods: {
    ...mapActions([
      'changeLogin',
      'changeLoginState'
    ]),
    getFbToken: function () {
      // eslint-disable-next-line
      FB.login((response) => {
        localStorage.setItem('fb_token', response.authResponse.accessToken)
        this.getUser(response.authResponse.accessToken)
      }, {
        scope: 'public_profile, email'
      })
    },
    getUser: function (token) {
      let AccessToken = token
      this.$http.get('https://graph.facebook.com/me?fields=email,id,name,picture&access_token=' + AccessToken)
      .then(({ data }) => {
        let obj = {
          id: data.id,
          name: data.name,
          picture: data.picture.data.url
        }
        this.loginOnOwnServer(obj, token)
      })
      .catch(err => {
        console.log(err)
      })
    },
    loginOnOwnServer: function (obj, AccessToken) {
      this.$http.post('http://localhost:3000/api/signfb', [], {
        headers: { fb_token: AccessToken }
      })
      .then(({ data }) => {
        if (data.msg === 'success') {
          obj.token = data.token
          obj._id = data.userId
          localStorage.setItem('dataUser', JSON.stringify(obj))
          this.changeLogin(true)
          this.changeLoginState(obj._id)
          this.dataUser = obj
        } else {
          console.log('unsuccessfull connection to server')
        }
      })
      .catch(err => {
        console.log(err)
        this.logout()
      })
    },
    logout: function () {
      localStorage.removeItem('dataUser')
      localStorage.removeItem('fb_token')
      this.dataUser = ''
      this.changeLogin(false)
      this.changeLoginState('')
      this.$router.push('/')
    },
    cekLogin: function () {
      let fbToken = localStorage.getItem('fb_token')
      if (fbToken) {
        this.$router.push('/ask')
      } else {
        this.alertPleaseLogin = true
      }
    },
    dismissAlertLogin: function () {
      this.alertPleaseLogin = false
    }
  },
  created: function () {
    let fbToken = localStorage.getItem('fb_token')
    if (fbToken) {
      this.getUser(fbToken)
    } else {
      this.logout()
    }
  }
}
</script>

<style lang="css" scoped>
.fix-margin {
  margin: 8px;
  padding: 4px;
}
.blue-facebook {
  color: white;
  background-color: #3B5998;
  border-radius: 4px;
}
.navbar-profile-picture {
  height: 25px;
  border-radius: 50%;
}
.fix-dropdown {
  margin-left: 15px;
}
</style>
