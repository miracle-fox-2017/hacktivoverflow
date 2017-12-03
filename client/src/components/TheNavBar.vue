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
          <li><router-link :to="{ path: '/ask', params: {} }">Ask A Question</router-link></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li v-if="!statusLogin" ><button @click="getFbToken" class="btn fix-margin blue-facebook" type="button" name="button"><span class="fa fa-facebook-square"></span> Login with facebook</button></li>
          <li v-else class="fix-dropdown">{{ dataUser.name }} <img :src="dataUser.picture" class="navbar-profile-picture"> <button @click="logout" type="button" class="btn btn-default fix-margin" name="button">logout</button></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: function () {
    return {
      statusLogin: false,
      dataUser: ''
    }
  },
  methods: {
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
          localStorage.setItem('dataUser', JSON.stringify(obj))
          this.statusLogin = true
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
      this.statusLogin = false
      this.$router.push('/')
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
