<template>
<div>
<table class="table table is-hoverable">
  <thead>
    <tr>
      <th>Questions</th>
      <th>Post By</th>
      <th><router-link :to="`/askquestion`"><i class="fa fa-plus" fa-lg aria-hidden="true"></i></router-link></th>
    </tr>
  </thead>
  <tfoot>
    <tr v-for="question in questions" key="question._id">
      <th><router-link :to="`/hacktivoverflow/questions/${question._id}`"><span @click="sendingId(question._id)">{{ question.title }}</span></router-link></th>  
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
      'getQuestionById',
      'getAnswerByQuestionId'
    ]),
    sendingId: function (id) {
      this.getQuestionById(id)
      this.getAnswerByQuestionId(id)
      console.log('hello seding ID')
    }
  },
  created () {
    this.getAllQuestions()
  }

}
</script>

<style scoped>

.fa.fa-plus {
  font-size: 44px;
  color: #00d1b2;
}

</style>
