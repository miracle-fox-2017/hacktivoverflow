<template>
  <main class="ui container">
    <section class="ui equal width celled stackable grid">
      <div class="row middle aligned center aligned">
        <div class="column">
          <h2 class="ui header">Your Questions</h2>
        </div>
      </div>
      <router-view v-for="(userQuestion, index) in userQuestions" :key="index" :userQuestion="userQuestion"/>
    </section>
  </main>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters(['userQuestions'])
    },
    methods: {
      ...mapActions(['getQuestionsByUserId'])
    },
    created: function () {
      this.getQuestionsByUserId()
    }
  }
</script>

<style scoped>
</style>
