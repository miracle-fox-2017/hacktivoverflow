<template>
  <div class="ui container">
    <di class="ui header">
      <h2>{{question.title}}</h2>
      <div class="ui divider"></div>
    </di>
    <div class="content">
      <p style="text-align: justify">{{question.question}}</p>
      <i style="color: #ababab; font-size: 10px;">{{question.userId.first_name}} {{question.userId.last_name}}</i>
    </div>
    <div class="ui divider"></div>
    <AddAnswer :questionId="question._id"/>
  </div>
</template>

<script>
import AddAnswer from '@/components/AddAnswer'
export default {
  components: {
    AddAnswer
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
        console.log(this.question)
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
