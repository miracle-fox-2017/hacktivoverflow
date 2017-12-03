<template>
  <div id="app">
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
          <a class="navbar-item" href="/">
            Questions
          </a>
          <a class="navbar-item" href="/">
            Users
          </a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <dropdown trigger="hover">
            <a class="navbar-link">
              <span class="icon">
                  <i class="fa fa-user-o"></i>
                </span>
              <span>Username</span>
            </a>
            <div slot="content">
              <menus>
                <menu-item icon="user">Profile</menu-item>
                <menu-item icon="lock">Settings</menu-item>
                <div class="divider"></div>
                <menu-item icon="">Sign out</menu-item>
              </menus>
            </div>
          </dropdown>
          </div>
        </div>
      </div>
    </nav>
    <section class="hero contai is-warning">
      <div class="hero-body ">
      <br/><br/>
      <div class="columns">
        <div class="column is-two-thirds">
          <h1 class="title">
            Welcome to the HacktivOverflow
          </h1>
          <figure class="image is-128x128">
            <img src="https://hacktiv8.com/img/logo-hacktiv8_bordered--md5--f7ee5fc69819b5ef3849344c119f5e18.png">
          </figure>
        </div>
        <div class="column">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">Name</label>
            </div>
              <p class="control is-expanded">
                <input class="input" type="text" placeholder="Name">
              </p>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">Email</label>
            </div>
              <p class="control is-expanded">
                <input class="input" type="email" placeholder="Email">
              </p>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">Gender</label>
            </div>        
            <p class="control">
              <label class="radio">
                <input type="radio" name="question">
                Male
              </label>
              <label class="radio">
                <input type="radio" name="question">
                Female
              </label>
            </p>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">Username</label>
            </div>
              <p class="control is-expanded">
                <input class="input" type="text" placeholder="Username">
              </p>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">Password</label>
            </div>
              <p class="control is-expanded">
                <input class="input" type="password" placeholder="Password">
              </p>
          </div>
          <a class="button is-dark">Sign Up</a>
          <a class="button">Reset</a>
        </div>
      </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Hero title
          </h1>
          <h2 class="subtitle">
            <router-view/>
          </h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Barlow+Condensed|Roboto');
#app {
  font-family: 'Barlow Condensed','Roboto', sans-serif!important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  text-decoration-style: none!important;
  background-color: #fff!important;
}
.notification a:not(.button) {
  color: currentColor;
  text-decoration: none!important;
}
.label {
  color: #fff!important;
}
.contai {
  margin: 0;
  position: relative;
}

@media screen and (min-width: 1024px) {
  .contai {
    max-width: 100%;
    width: 100%;
    padding: 0 300px 0 300px;
    margin: 0;
  }
  .contai.is-fluid {
    margin-left: 0;
    margin-right: 0;
    max-width: none;
    width: auto;
  }
}

@media screen and (max-width: 1215px) {
  .contai.is-widescreen {
    max-width: auto;
    width: auto;
  }
}

@media screen and (max-width: 1407px) {
  .contai.is-fullhd {
    max-width: auto;
    width: auto;
  }
}

@media screen and (min-width: 1216px) {
  .contai {
    max-width: auto;
    width: auto;
  }
}

@media screen and (min-width: 1408px) {
  .contai {
    max-width: auto;
    width: auto;
  }
}
.navbar > .contai {
  -webkit-box-align: stretch;
      -ms-flex-align: stretch;
          align-items: stretch;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-height: 3.25rem;
  width: 100%;
}
@media screen and (max-width: 1023px) {
  .navbar > .contai {
    display: block;
  }
  .navbar-brand .navbar-item,
  .navbar-tabs .navbar-item {
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .navbar-menu {
    background-color: transparent;
    -webkit-box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);
            box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);
    padding: 0.5rem 0;
  }
  .navbar-menu.is-active {
    display: block;
  }
  .navbar.is-fixed-bottom-touch, .navbar.is-fixed-top-touch {
    left: 0;
    position: fixed;
    right: 0;
    z-index: 30;
  }
  .navbar.is-fixed-bottom-touch {
    bottom: 0;
  }
  .navbar.is-fixed-bottom-touch.has-shadow {
    -webkit-box-shadow: 0 -2px 3px rgba(10, 10, 10, 0.1);
            box-shadow: 0 -2px 3px rgba(10, 10, 10, 0.1);
  }
  .navbar.is-fixed-top-touch {
    top: 0;
  }
  .navbar.is-fixed-top .navbar-menu, .navbar.is-fixed-top-touch .navbar-menu {
    -webkit-overflow-scrolling: touch;
    max-height: calc(100vh - 3.25rem);
    overflow: auto;
  }
  html.has-navbar-fixed-top-touch {
    padding-top: 3.25rem;
  }
  html.has-navbar-fixed-bottom-touch {
    padding-bottom: 3.25rem;
  }
}
</style>
