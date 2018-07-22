<template>
  <main class="ui container">
    <section class="ui equal width celled stackable grid">
      <div class="row middle aligned center aligned">
        <div class="column">
          <h2 class="ui header">Lates Questions</h2>
        </div>
        <div class="two wide column">
          <button class="ui positive button" @click="addQuestionModal">
            Ask Question
          </button>
          <AddQuestionModal/>
        </div>
      </div>
      <router-view :questions="questions"/>
    </section>
  </main>
</template>

<script>
  /* global $ */
  import { mapGetters, mapActions } from 'vuex'
  import AddQuestionModal from '@/components/AddQuestionModal'
  export default {
    name: 'Home',
    components: {
      AddQuestionModal
    },
    computed: {
      ...mapGetters(['questions'])
    },
    methods: {
      ...mapActions(['getAllQuestions']),
      addQuestionModal () {
        $('#askQuestion').modal('show')
      }
    },
    created: function () {
      this.getAllQuestions()
    }
    // ,watch: {
    //   questions () {
    //     this.getAllQuestions()
    //   }
    // },
  }
</script>

<style scoped></style>
