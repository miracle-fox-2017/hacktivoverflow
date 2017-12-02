<template>
  <div class="container">
    {{ users }}
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'MainPage',
  computed: {
    ...mapState([
      'users'
    ])
  },
  methods: {
    ...mapActions([
      'getAllUsers'
    ])
  },
  created () {
    this.getAllUsers()
  }
}
</script>

<style>

</style>
