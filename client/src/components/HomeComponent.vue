<template>
  <main class="ui container">
    <section class="ui equal width celled stackable grid">
      <div class="row middle aligned center aligned">
        <div class="column">
          <h2 class="ui header">Lates Question</h2>
        </div>
        <div class="two wide column">
          <button class="ui primary button">
            Ask Question
          </button>
        </div>
      </div>

      <article class="row center aligned">
        <div class="two wide column">
          <div class="ui medium header">
            Votes
          </div>
        </div>
        <div class="two wide column">
          <div class="ui medium header">
            Answers
          </div>
        </div>
        <div class="column">
          <div class="ui medium header">
            Title
          </div>
        </div>
        <div class="three wide column">
          <div class="ui medium header">
            Tags
          </div>
        </div>
        <div class="two wide column">
          <div class="ui medium header">
            Questioner
          </div>
        </div>
      </article>
      <router-view v-for="(question, index) in questions" :key="index" :question="question"/>
    </section>
  </main>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'HomeComponent',
    computed: {
      ...mapGetters(['questions'])
    },
    methods: {
      ...mapActions(['getAllQuestions'])
    },
    created: function () {
      this.getAllQuestions()
    }
  }
</script>

<style scoped></style>
