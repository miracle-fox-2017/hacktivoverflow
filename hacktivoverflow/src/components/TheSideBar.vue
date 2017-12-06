<template>
  <div>
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <router-link :to="{name: 'TheQuestionSummary', params: {id: question._id}}"> {{ question.title}}</router-link>
    </li>
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
