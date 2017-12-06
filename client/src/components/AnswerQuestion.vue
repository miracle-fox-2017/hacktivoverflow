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
    <div :class="errorClass">
      <div class="ui icon header" style="color: red;">
        <i class="remove circle outline icon"></i>
        Access Denied!!
      </div>
      <div class="content">
        <p style="color: red; text-align: center; font-size: 18px;">Please login before response any questions or answer!!</p>
      </div>
      <div class="actions">
        <div class="ui red basic cancel inverted button">
          <i class="remove icon"></i>
          Close
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnswerList from '@/components/AnswerList'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    AnswerList
  },
  data () {
    return {
      errorClass: `ui basic modal ${this.questionId}`,
      answerForm: ''
    }
  },
  props: ['questionId'],
  computed: {
    ...mapGetters([
      'answers'
    ])
  },
  methods: {
    ...mapActions([
      'getAnswers',
      'postNewAnswer'
    ]),
    addAnswer () {
      if(localStorage.getItem('accesstoken')){
        this.postNewAnswer({
          answer: this.answerForm,
          questionId: this.questionId
        })
        this.answerForm = ''
      } else {
        $(`.ui.basic.modal.${this.questionId}`)
          .modal('show')
        ;
      }
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
