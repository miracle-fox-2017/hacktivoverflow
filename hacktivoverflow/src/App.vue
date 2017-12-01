<template>
  <div id="app">
    <navigation/>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import navbar from '@/components/TheNavbar'

export default {
  name: 'app',
  components: {
    navigation: navbar
  }
}
</script>

<style>
body {
  margin: 0;
}
</style>
