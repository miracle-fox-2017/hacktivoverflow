<template>
  <div id="app">
    <div class="header">
     <h1> HACKTIV OVER FLOW </h1>
    </div>      
    <router-view />
    <div class="footer hacktiv">
      <small> Copyright by Ahmad </small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #212121;
  height: 100%;
}

html,body {
  height: 100%;
}
.header {
  background-color: #FF5722;
  color: #FFFFFF;
}

.hacktiv {
  margin: 10px 0 10px 0;
}

h1 {
  margin: 0;
  size: 50px;
}
</style>
