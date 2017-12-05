<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <h3 class="card-header">{{ questionDetail.title }}</h3>
          <div class="card-body">
            <p class="card-text">{{ questionDetail.body }}</p>
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-success" @click="reply = true">Reply</button>
          </div>
        </div>
        <div class="whitespace"></div>
        <reply v-if="reply" @hideme="reply = false" :questionId="id"/>
        <div class="whitespace"></div>
        <answer v-for="(answer, index) in answers" :key="index" :answer="answer"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import answer from '@/components/AnswerCard'
import reply from '@/components/Reply'
export default {
  props: ['id'],
  data () {
    return {
      reply: false
    }
  },
  components: {
    'answer': answer,
    'reply': reply
  },
  methods: {
    ...mapActions([
      'getAnswers',
      'getQuestion',
      'watchAnswers',
      'getUserInfo'
    ])
  },
  computed: {
    ...mapState([
      'answers',
      'questionDetail'
    ])
  },
  created () {
    this.getQuestion(this.id)
    this.watchAnswers(this.id)
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style scoped>
.whitespace {
  margin: 32px;
}
</style>
