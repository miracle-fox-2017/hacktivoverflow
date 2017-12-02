<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <question-card v-for="(question, index) in questions" :key="index" :question="question" />
      </div>
    </div>
  </div>
</template>

<script>
import questionCard from '@/components/QuestionCard'
import {mapState, mapActions} from 'vuex'
export default {
  components: {
    'question-card': questionCard
  },
  methods: {
    ...mapActions([
      'watchQuestions'
    ])
  },
  computed: {
    ...mapState([
      'questions'
    ])
  },
  created () {
    this.watchQuestions()
  }
}
</script>

<style>

</style>
