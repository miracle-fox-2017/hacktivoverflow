<template>
  <div class="access-form">
    <div class="group-tab-button">
      <button type="button" @click="cleanInputForm" data-toggle="tab" href="#signin">Login</button>
      <button type="button" @click="cleanInputForm" data-toggle="tab" href="#signup">Register</button>
    </div>
    <div class="tab-content">
      <div id="signin" class="tab-pane active">
        <span class="input-label">Email</span>
        <input type="text" v-model="email" placeholder="Email">
        <span class="input-label">Password</span>
        <input type="password" v-model="password" placeholder="Password">
        <button type="button" @click="signin" class="btn btn-primary">SignIn</button>
      </div>
      <div id="signup" class="tab-pane">
        <span class="input-label">Email</span>
        <input type="text" v-model="email" placeholder="Email">
        <span class="input-label">Password</span>
        <input type="password" v-model="password" placeholder="Password">
        <button type="button" @click="signup" class="btn btn-primary">SignUp</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      email:null,
      password:null
    }
  },
  created(){
    if(localStorage.getItem("login_token") != null){
      this.$axios.get("user/userid",{
        headers:{
          token:localStorage.getItem("login_token")
        }
      }).then(function({data}){
        if(data.status){
          this.$router.push("/");
        }else{
          localStorage.removeItem("login_token");
        }
      }.bind(this)).catch(function(err){
        console.log(err);
      });
    }
  },
  methods:{
    cleanInputForm(){
      this.email=null;
      this.password=null;
    },
    signup(){
      this.$axios.post("user/signup",{
        email:this.email,
        password:this.password
      }).then(function({data}){
        if(data.status){
          this.cleanInputForm();
        }else{
          console.log(data.msg);
        }
      }.bind(this)).catch(function(err){
        console.log(err);
      });
    },
    signin(){
      this.$axios.post("user/signin",{
        email:this.email,
        password:this.password
      }).then(function({data}){
        if(data.status){
          localStorage.setItem("login_token",data.msg);
          this.$router.push("/");
        }else{
          console.log(data.msg);
        }
      }.bind(this)).catch(function(err){
        console.log(err);
      });
    }
  }
}
</script>
<style lang="scss">
html,body {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-image: url("../assets/polygon-background.jpg");
}
.access-form {
  top: 50%;
  width: 80%;
  margin: auto;
  overflow: hidden;
  max-width: 350px;
  position: relative;
  border-radius: 5px;
  background-color: #FFF;
  box-shadow: 0 0 10px 0 rgba(0,0,0,.2);
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  .group-tab-button {
    overflow: hidden;
    button {
      width: 50%;
      float: left;
      height: 50px;
      border: none;
      outline: none;
      font-size: 20px;
      font-weight: 300;
      box-sizing: border-box;
      transition-duration: 0.3s;
      background-color: transparent;
      font-family: "Roboto",sans-serif;
    }
    button:hover {
      background-color: #F1F1F1;
    }
  }
  .tab-content {
    overflow: hidden;
    box-sizing: border-box;
    padding: 10px 20px 20px 20px;
    .input-label {
      color: #555;
      display: block;
      font-size: 15px;
      margin-top: 10px;
      font-weight: bold;
      margin-bottom: 5px;
      font-family: "Roboto",sans-serif;
    }
    input {
      width: 100%;
      height: 40px;
      outline: none;
      font-size: 16px;
      margin-bottom: 10px;
      padding: 5px 10px 5px 10px;
      font-family: "Roboto",sans-serif;
    }
    button {
      float: right;
      margin-top: 10px;
    }
  }
}
</style>
