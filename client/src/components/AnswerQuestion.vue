<template>
  <div>
    <AnswerList v-for="answer in answers" key="answer.Id" :answer="answer"/>
    <div class="ui form">
      <div class="field">
        <label>Answer Question</label>
        <textarea rows="2" v-model="answerForm"></textarea>
      </div>
      <div class="field">
        <button class="ui primary button" @click="addAnswer">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import AnswerList from '@/components/AnswerList'
export default {
  components: {
    AnswerList
  },
  data () {
    return {
      answerForm: '',
      answers: []
    }
  },
  props: ['questionId'],
  methods: {
    addAnswer () {
      this.$http.post('/answers', {
        answer: this.answerForm,
        questionId: this.questionId
      }, {
        headers: {
          accesstoken: localStorage.getItem('accesstoken')
        }
      })
      .then(({data}) => {
        this.answerForm = ''
        this.answers.push(data)
      })
      .catch(err => console.log(err))
    },
    getAnswer () {
      this.$http.get(`/answers/${this.questionId}`)
      .then(({data}) => {
        this.answers = data
      })
      .catch(err => console.log(err))
    }
  },
  created () {
    this.getAnswer()
  }
}
</script>

<style>

</style>
