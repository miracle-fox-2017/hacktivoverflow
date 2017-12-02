<template>
  <div>
    <div class="form_wrapper">
      <div class="form_container">
        <div class="title_container">
          <h2>Login Form</h2>
        </div>
        <div class="row clearfix">
          <div class="col_half">
            <form @submit.prevent="loginUser(loginForm)">
              <div class="input_field"><span><i class="fa fa-user" aria-hidden="true"></i></span>
                <input v-model="loginForm.username" type="text" name="username" placeholder="Username" required=""/>
              </div>
              <div class="input_field"><span><i class="fa fa-lock" aria-hidden="true"></i></span>
                <input v-model="loginForm.password" type="password" name="password" placeholder="Password" required=""/>
              </div>
              <input class="button" type="submit" value="Sign in"/>
              <div class="row clearfix bottom_row">
                <div class="col_half remember_me">
                  <input name="" type="checkbox" value=""/> Remember me
                </div>
                <div class="col_half forgot_pw"><a href="#">Forgot Password?</a></div>
              </div>
            </form>
          </div>
          <div class="col_half last">
            <div class="social_btn fb">
              <a href="#">
                <span>
                  <i class="fa fa-facebook" aria-hidden="true"></i>
                </span>
                Sign in with Facebook
              </a>
            </div>
            <div class="social_btn tw"><a href="#"><span><i class="fa fa-twitter" aria-hidden="true"></i></span>Sign in with Twitter</a></div>
            <div class="social_btn gplus"><a href="#"><span><i class="fa fa-google-plus" aria-hidden="true"></i></span>Sign in with Google+</a></div>
            <div class="row clearfix create_account">
              <div><a href="/register">Create an Account</a></div>
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
  name: 'LoginPage',
  data: function () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  mounted () {
    // start cek storage
    let storage = localStorage.getItem('token')
    if (storage) {
      this.$router.push({name: 'mainPage'})
    }
  },
  methods: {
    ...mapActions([
      'loginUser'
    ])
  }
}
</script>

<style scoped>
body {
  font-family: Verdana, Geneva, sans-serif;
  font-size: 14px;
  background: #f2f2f2;
}

.clearfix:after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
}

.form_wrapper {
  background: #fff;
  width: 550px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 25px;
  margin: 10% auto 0;
  position: relative;
  z-index: 1;
  border-top: 5px solid #343a40;
  -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
}
.form_wrapper h2 {
  font-size: 1.5em;
  line-height: 1.5em;
  margin: 0;
}
.form_wrapper .title_container {
  text-align: center;
  padding-bottom: 15px;
}
.form_wrapper h3 {
  font-size: 1.1em;
  font-weight: normal;
  line-height: 1.5em;
  margin: 0;
}
.form_wrapper .row {
  margin: 10px -15px;
}
.form_wrapper .row > div {
  padding: 0 15px;
  box-sizing: border-box;
}
.form_wrapper .col_half {
  width: 50%;
  float: left;
}
.form_wrapper .input_field {
  position: relative;
  margin-bottom: 20px;
}
.form_wrapper .input_field > span {
  position: absolute;
  left: 0;
  top: 0;
  color: #333;
  height: 100%;
  border-right: 1px solid #ccc;
  text-align: center;
  width: 30px;
}
.form_wrapper .input_field > span > i {
  padding-top: 10px;
}
.form_wrapper .textarea_field > span > i {
  padding-top: 10px;
}
.form_wrapper input[type="text"] {
  width: 100%;
  padding: 8px 10px 9px 35px;
  height: 35px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  outline: none;
  -webkit-transition: all 0.30s ease-in-out;
  -moz-transition: all 0.30s ease-in-out;
  -ms-transition: all 0.30s ease-in-out;
  transition: all 0.30s ease-in-out;
}
.form_wrapper input[type="text"]:focus {
  border: 1px solid #343a40;
}
.form_wrapper input[type="email"] {
  width: 100%;
  padding: 8px 10px 9px 35px;
  height: 35px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  outline: none;
  -webkit-transition: all 0.30s ease-in-out;
  -moz-transition: all 0.30s ease-in-out;
  -ms-transition: all 0.30s ease-in-out;
  transition: all 0.30s ease-in-out;
}
.form_wrapper input[type="email"]:focus {
  border: 1px solid #343a40;
}
.form_wrapper input[type="password"] {
  width: 100%;
  padding: 8px 10px 9px 35px;
  height: 35px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  outline: none;
  -webkit-transition: all 0.30s ease-in-out;
  -moz-transition: all 0.30s ease-in-out;
  -ms-transition: all 0.30s ease-in-out;
  transition: all 0.30s ease-in-out;
}
.form_wrapper input[type="password"]:focus {
  border: 1px solid #343a40;
}
.form_wrapper input[type="submit"] {
  background: #343a40;
  height: 35px;
  line-height: 35px;
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  font-size: 1.1em;
  margin-bottom: 10px;
  -webkit-transition: all 0.30s ease-in-out;
  -moz-transition: all 0.30s ease-in-out;
  -ms-transition: all 0.30s ease-in-out;
  transition: all 0.30s ease-in-out;
}
.form_wrapper input[type="submit"]:hover {
  background: #343a40;
}
.form_wrapper input[type="submit"]:focus {
  background: #343a40;
}
.form_wrapper input[type="checkbox"] {
  margin-right: 2px;
}

.form_container .row .col_half.last {
  border-left: 1px solid #ccc;
}

.remember_me {
  display: flex;
}

.forgot_pw {
  text-align: right;
}

.social_btn {
  width: 100%;
  margin-bottom: 20px;
  font-size: 15px;
}
.social_btn a {
  align-items: center;
  color: #fff;
  display: flex;
  height: 35px;
  text-decoration: none;
}
.social_btn a span {
  align-items: center;
  align-self: stretch;
  display: flex;
  font-size: 17px;
  justify-content: center;
  margin-right: 10px;
  text-align: center;
  width: 35px;
}
.social_btn.fb {
  background: #3b5ca1;
}
.social_btn.fb span {
  background: #314d87;
}
.social_btn.tw {
  background: #45b0e4;
}
.social_btn.tw span {
  background: #26a3df;
}
.social_btn.gplus {
  background: #de4c33;
}
.social_btn.gplus span {
  background: #cc3a21;
}

.create_account a {
  color: #343a40;
  text-decoration: none;
  font-weight: bold;
}

.bottom_row {
  font-size: 0.7em;
  color: #ababab;
}
.bottom_row a {
  text-decoration: none;
  color: #ababab;
}

.credit {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 15px;
  color: #343a40;
}
.credit a {
  color: #343a40;
}

@media (max-width: 600px) {
  .form_wrapper .col_half {
    width: 100%;
    float: none;
  }

  .bottom_row .col_half {
    width: 50%;
    float: left;
  }

  .form_container .row .col_half.last {
    border-left: none;
  }

  .remember_me {
    padding-bottom: 20px;
  }
}
</style>
