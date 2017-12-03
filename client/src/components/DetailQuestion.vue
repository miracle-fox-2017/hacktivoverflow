<template>
  <div>
    {{ questions.title }}
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  props: ['id'],
  mounted () {
    console.log('>>>', this.questions[1])
  },
  computed: {
    ...mapState([
      'questions'
    ])
  },
  methods: {
    ...mapActions([
      'getQuestionById'
    ])
  },
  created () {
    this.getQuestionById(this.id)
  }
}
</script>

<style>

</style>
