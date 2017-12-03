<template>
<div>
<table class="table table is-hoverable">
  <thead>
    <tr>
      <th>Votes</th>
      <th>Answer</th>
      <th>Views</th>
      <th>Questions</th>
      <th>Post By</th>
    </tr>
  </thead>
  <tfoot>
    <tr v-for="question in questions" key="question._id">
      <th></th>
      <th></th>
      <th></th>
      <th><router-link :to="`/hacktivoverflow/questions/${question._id}`"><span @click="sendingId(question._id)">{{ question.question }}</span></router-link></th>  
      <th>{{ question.userId.username }}</th>  
    </tr>
  </tfoot>
</table>
</div>
</template>

<script>
/* eslint-disable */
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }]*/
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Questions',
  data: function () {
    return {}
  },
  computed: {
    ...mapState([
      'questions'
    ])
  },
  methods: {
    ...mapActions([
      'getAllQuestions',
      'getQuestionById'
    ]),
    sendingId: function (id) {
      this.getQuestionById(id)
    }
  },
  created () {
    this.getAllQuestions()
  }

}
</script>

<style>

</style>
