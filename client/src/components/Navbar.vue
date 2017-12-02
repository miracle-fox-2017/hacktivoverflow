<template>
  <div class="ui borderless main menu fixed stackable" style="position: fixed; top: 0px; left: auto; z-index: 10; padding: 0 50px;">
    <!-- <div class="ui text container"> -->
      <div href="#" class="header item">
        <img class="ui image logo" src="../assets/img/logo.png">
      </div>
      <router-link href="#" class="item" to="/">Home</router-link>
      <a href="#" class="item">Questions</a>
      <a href="#" class="item">Users</a>
      <div href="#" class="ui right item" tabindex="0">
        <router-link style="margin-left: 20px;" class="ui button" to="/login">Login</router-link>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {

}
</script>

<style>
.ui.image.logo {
    width: 150px;
}
</style>
