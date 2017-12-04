<template>
  <div class="ui container">
    <di class="ui header">
      {{question.title}} <br>
      <i style="color: #ababab; font-size: 12px;">{{question.userId.first_name}} {{question.userId.last_name}}</i>
      <div class="ui divider"></div>
    </di>
    <div class="content">
      <p style="text-align: justify">{{question.question}}</p>
    </div>
    <div class="ui divider"></div>
    <AnswerQuestion :questionId="question._id"/>
  </div>
</template>

<script>
import AnswerQuestion from '@/components/AnswerQuestion'
export default {
  components: {
    AnswerQuestion
  },
  data () {
    return {
      question: {}
    }
  },
  props: ['id'],
  methods: {
    getQuestion (id) {
      this.$http.get(`/questions/${id}`)
      .then(({data}) => {
        this.question = data
      })
      .catch(err => console.log(err))
    }
  },
  mounted () {
    this.getQuestion(this.id)
  },
  watch: {
    id (newId) {
      this.getQuestion(newId)
    }
  }
}
</script>

<style>

</style>
