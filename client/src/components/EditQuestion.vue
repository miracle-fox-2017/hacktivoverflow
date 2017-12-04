<template>
  <div class="content">
    <div class="ui form fluid">
      <div class="field">
        <label>Title</label>
        <input name="title" placeholder="What your problem? Be specific" type="text" v-model="formQuestion.title">
      </div>
      <div class="field">
        <label>Question Detail</label>
        <textarea name="question" placeholder="Describe more specific about your problem..." v-model="formQuestion.question"></textarea>
      </div>
      <div class="field">
        <div class="actions">
          <button class="ui ok primary button" @click="editExec">Submit</button>
          <button class="ui deny button">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['questionId'],
  data () {
    return {
      formQuestion: {
        title: '',
        question: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'editQuestions'
    ]),
    editExec () {
      let questionData = {
        questionId: this.questionId,
        formQuestion: this.formQuestion
      }
      this.editQuestions(questionData)
      // this.$http.put(`/questions/${this.questionId}`, this.formQuestion, {
      //   headers: {
      //     accesstoken: localStorage.getItem('accesstoken')
      //   }
      // })
      // .then(({data}) => {
      //   this.$emit('questionEdited', data)
      //   /* eslint-disable */
      //   $('.small.modal.edit')
      //     .modal('hide')
      //   ;
      // })
      // .catch(err => console.log(err))
    },
    getQuestion (questionId) {
      this.$http.get(`/questions/${questionId}`)
      .then(({data}) => {
        this.formQuestion.title = data.title
        this.formQuestion.question = data.question
      })
      .catch(err => console.log(err))
    }
  },
  mounted () {
    this.getQuestion(this.questionId)
  },
  watch: {
    questionId (newQuestionId) {
      this.getQuestion(newQuestionId)
    }
  }
}
</script>

<style>

</style>
