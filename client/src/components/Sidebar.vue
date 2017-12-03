<template>
  <div class="ui container">
    <div class="ui header">
      <h3>Recent Questions</h3>
    </div>
    <div class="ui segment" v-for="(question,i) in questions" key="question._id" v-if="i < 5">
      <router-link :to="`/questions/${question._id}`">{{question.title}}</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'questions'
    ])
  }
}
</script>

<style>

</style>
