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
        <div v-if="login == ''" class="navbar-end">
          <div class="navbar-item">
            <div class="control is-grouped">
              <p class="control is-expanded">
                <input class="input" type="text" placeholder="Username">
              </p>
              <p class="control is-expanded">
                <input class="input" type="password" placeholder="Password">
              </p>
              <p class="control">
                <a class="button is-dark">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
        <div v-else class="navbar-end">
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
    <section v-if="login == ''" class="hero contai is-warning">
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
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      login: 'ss'
    }
  }
}
</script>

<style>

</style>
