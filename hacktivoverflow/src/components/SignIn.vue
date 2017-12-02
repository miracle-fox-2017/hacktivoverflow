<template>
  <div id="firebaseui-auth-container">

  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  methods: {
    ...mapActions([
      'signIn'
    ])
  },
  mounted () {
    this.signIn()
  }
}
</script>
