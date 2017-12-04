<template>
  <div>
    <div style="text-align:left;" class="card-deck">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">{{ questions.title }}</h3>
          <hr>
          <p class="card-text">
            <small class="text-muted">
            <span style="font-weight:bold;">
              <i class="fa fa-heart" aria-hidden="true"></i> 150 
            </span> 
            <span style="font-weight:bold; margin-left:3px;">
              <i class="fa fa-comment" aria-hidden="true"></i> 58 
            </span>
            <span style="font-weight:bold; margin-left:3px;">
              <i class="fa fa-user" aria-hidden="true"></i> 
            </span>
          </small>
          </p>
          <p class="card-text">{{ questions.question_content }}</p>
          <!-- Start Comment -->
          <DetailQuestionAnswer :answers="answers"/>
          <!-- End Comment -->
        </div>
      </div>
    </div>
    <!-- Start Answer -->
    <Answer :questions="questions" :answers="answers"/>
    <!-- End Answer -->
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import DetailQuestionAnswer from '@/components/DetailQuestionAnswer'
import Answer from '@/components/Answer'
export default {
  props: ['id'],
  components: {
    DetailQuestionAnswer,
    Answer
  },
  computed: {
    ...mapState([
      'questions',
      'answers'
    ])
  },
  methods: {
    ...mapActions([
      'getQuestionById',
      'findAnswerByQuestion'
    ])

  },
  created () {
    // console.log('>>>', this.id)
    this.getQuestionById(this.id)
    this.findAnswerByQuestion(this.id)
  }
}
</script>

<style>

</style>
