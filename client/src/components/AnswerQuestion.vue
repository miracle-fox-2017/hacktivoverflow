<template>
  <div>
    <AnswerList v-for="answer in answers" key="answer.Id" :answer="answer" @answerDeleted="answerDeleted"/>
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
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    AnswerList
  },
  data () {
    return {
      answerForm: ''
    }
  },
  props: ['questionId'],
  computed: {
    ...mapState([
      'answers'
    ])
  },
  methods: {
    ...mapActions([
      'getAnswers',
      'postNewAnswer'
    ]),
    addAnswer () {
      this.postNewAnswer({
        answer: this.answerForm,
        questionId: this.questionId
      })
    },
    answerDeleted (value) {
      let index = this.answers.map(a => { return a._id }).indexOf(value._id)
      this.answers.splice(index, 1)
    }
  },
  created () {
    this.getAnswers(this.questionId)
  },
  watch: {
    questionId (newId) {
      this.getAnswers(newId)
    }
  }
}
</script>

<style>

</style>
