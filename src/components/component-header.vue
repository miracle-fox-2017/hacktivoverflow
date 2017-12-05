<template>
  <nav id="navbar" class="navbar navbar-default" style="margin-bottom:0;">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link class="navbar-brand" to="/">Hacktiv8Overflow</router-link>
      </div>
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li><router-link :to="'/user/'+loggedInUserId">Your Post</router-link></li>
        </ul>
        <div class="navbar-right">
          <button type="button" v-if="loginState" @click="logout">Logout</button>
          <button type="button" v-else @click="login">Login</button>
        </div>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>
<script>
export default {
  data(){
    return{
      loggedInUserId:"",
      loginState:localStorage.getItem("login_token") != null
    }
  },
  beforeCreate(){
    if(localStorage.getItem("login_token") != null){
      this.$axios.get("user/userid",{
        headers:{
          token:localStorage.getItem("login_token")
        }
      }).then(function({data}){
        if(data.status){
          this.loggedInUserId=data.msg;
        }else{
          localStorage.removeItem("login_token");
          this.$router.push("/access");
        }
      }.bind(this)).catch(function(err){
        console.log(err);
      });
    }
  },
  methods:{
    login(){
      this.$router.push("/access");
    },
    logout(){
      localStorage.removeItem("login_token");
      this.$router.push("/access");
    }
  }
}
</script>
<style lang="scss">
#navbar {
  .navbar-right {
    height: 50px;
    button {
      top: 50%;
      height: 30px;
      position: relative;
      padding-left: 10px;
      padding-right: 10px;
      border: 1px solid #FFF;
      transform: translateY(-50%);
    }
  }
}
</style>
