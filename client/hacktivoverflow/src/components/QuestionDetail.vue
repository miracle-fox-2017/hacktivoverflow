<template lang="html">
  <div class="list-group disabled">
    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{question.title}}</h5>
        <small class="text-muted">{{question.createdAt}}</small>
      </div>
      <p class="mb-1">{{question.content}}</p>
      <small class="text-muted"><i class="fa fa-thumbs-up red" aria-hidden="true"> {{question.voters.length}}</i></small>
    </a>
    <h4>Answer</h4>
    <div class="list-group">
      <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" v-for="answer in answers">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{answer.by.name}}</h5>
          <small class="text-muted">{{answer.createdAt}}</small>
        </div>
        <p class="mb-1">{{answer.content}}</p>
        <small class="text-muted"><i class="fa fa-thumbs-up" aria-hidden="true" v-on:click="voteAnswer(answer._id)"> {{answer.voters.length}}</i></small>
      </a>
    </div>
    <form v-if="access_token">
      <fieldset>
        <div class="form-group">
          <label for="exampleInputEmail1">Reply</label>
          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your answer" v-model="inputanswer">
          <small id="emailHelp" class="form-text text-muted">your answer</small>
          <button type="button" name="button" v-on:click="erasepostanswer(inputanswer)">Post</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'QuestionDetail',
  data () {
    return {
      access_token: '',
      inputanswer: ''
    }
  },

  props: ['id'],
  computed: {
    ...mapState([
      'question',
      'answers'
    ])
  },

  methods: {
    ...mapActions([
      'getOneQuestion',
      'getAnswerQuestion',
      'postanswer',
      'voteAnswer'
    ]),

    getToken: function () {
      this.access_token = localStorage.getItem('access_token')
    },

    erasepostanswer (inputanswer) {
      this.postanswer(inputanswer)
      this.inputanswer = ''
    }
  },

  created () {
    this.getOneQuestion(this.id)
    this.getAnswerQuestion(this.id)
    this.getToken()
  }
}
</script>

<style lang="css">
 .red {
   color: blue;
 }

 .list-group > a.disabled {
   color: #999999;
 }
 .list-group > a.disabled:hover,
 .list-group > a.disabled:focus {
   color: #999999;
   text-decoration: none;
   background-color: transparent;
   cursor: not-allowed;
 }

</style>
