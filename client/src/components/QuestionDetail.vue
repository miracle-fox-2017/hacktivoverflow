<template>
  <div class="ui container">
    <di class="ui header">
      <h2>{{question.title}}</h2>
      <div class="ui divider"></div>
    </di>
    <div class="content">
      <p style="text-align: justify">{{question.question}}</p>
    </div>
    <div class="ui divider"></div>
    <div class="ui form">
      <div class="field">
        <label>Answer Question</label>
        <textarea rows="2"></textarea>
      </div>
      <div class="field">
        <button class="ui primary button">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      question: {}
    }
  },
  props: ['id'],
  methods: {
    getQuestion () {
      this.$http.get(`/questions/${this.id}`)
      .then(({data}) => {
        this.question = data
        console.log(this.question)
      })
      .catch(err => console.log(err))
    }
  },
  mounted () {
    this.getQuestion()
  },
  watch: {
    id (newId) {
      this.getOneArticle()
    }
  }
}
</script>

<style>

</style>
