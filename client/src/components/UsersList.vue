<template>
  <div class="ui three column grid">
    <div class="column" v-for="user in users" key="user._id">
      <div class="ui fluid card">
        <div class="image">
          <img src="../assets/img/user.svg">
        </div>
        <div class="content">
          <a style="text-align: center;" class="header">{{user.first_name}} {{user.last_name}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
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
