<template>
  <div class="ui grid">
    <div class="ui header">
      <h1>List Of Questions</h1>
    </div>
    <div class="row">
      <div class="column">
        <QuestionSummary v-for="question in questions" :key="question._id" :question="question"/>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionSummary from '@/components/QuestionSummary'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    QuestionSummary
  },
  computed: {
    ...mapState([
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
