<template>
  <div>
    <h1>List Users</h1>
    <br/>
      <div v-for="user in users" :key="user._id" class="card">
        <div v-if="user._id">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{ user.name }}</p>
                <p class="subtitle is-6">@{{user.username}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    <br/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'UsersList',
  computed: {
    ...mapState([
      'users'
    ])
  },
  methods: {
    ...mapActions([
      'allUsers'
    ])
  },
  created () {
    this.allUsers()
  }
}
</script>

<style>

</style>
