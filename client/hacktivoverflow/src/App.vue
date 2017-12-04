<template>
  <div id="app">
    <HeaderMain></HeaderMain>
    <router-view/>
  </div>
</template>

<script>
import HeaderMain from './components/HeaderMain'
export default {
  name: 'app',
  components: {
    HeaderMain
  }
}
</script>

<style>

</style>
