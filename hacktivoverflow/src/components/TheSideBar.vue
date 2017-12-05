<template>
  <div class="row border-primary">
    <h4>{{ question.title}}</h4>
  </div>

  

</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: ['question'],
  name: 'TheSideBar',
  methods: {
    ...mapActions([
      'getAllQuestions'
    ])
  }
}
</script>

<style>

</style>
