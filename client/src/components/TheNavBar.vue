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
      
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li><router-link :to="{ path: '/ask', params: {} }">Ask A Question</router-link></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><div class="fb-login-button fix-padding" data-max-rows="1" data-size="small" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="true"></div></li>
          <!-- <li><a href="#"><img height="25" src="https://scontent-sin6-2.xx.fbcdn.net/v/t39.2365-6/17639236_1785253958471956_282550797298827264_n.png?oh=499251858fbeca5f9770531c16da6e89&oe=5A89FFEA" /></a></li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
}
</script>

<style lang="css">
.fix-padding {
  padding: 8px;
}
</style>
