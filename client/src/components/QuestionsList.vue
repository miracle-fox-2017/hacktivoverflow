<template>
  <div class="ui grid">
    <div class="ui header">
      <h1>List Of Questions</h1>
    </div>
    <div class="row">
      <div style="text-align: left;" class="column">
        <QuestionSummary v-for="question in questions" :key="question._id" :question="question"/>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionSummary from '@/components/QuestionSummary'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    QuestionSummary
  },
  computed: {
    ...mapGetters([
      'questions'
    ])
  },
  methods: {
    ...mapActions([
      'getAllQuestions'
    ])
  },
  created () {
    this.getAllQuestions()
  }
}
</script>

<style>

</style>
