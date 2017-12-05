<template lang="html">
  <div class="list-group disabled">
    <a class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{question.title}}</h5>
        <small class="text-muted">{{question.createdAt}}</small>
      </div>
      <p class="mb-1">{{question.content}}</p>
      <small class="text-muted"><i class="fa fa-thumbs-up red" aria-hidden="true"> {{question.voters}}</i></small>
    </a>
    <h4>Answer</h4>
    <div class="list-group">
      <a class="list-group-item list-group-item-action flex-column align-items-start" v-for="answer in answerwithoption">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{answer.by.name}}</h5>
          <small class="text-muted">{{answer.createdAt | formatdate}}</small>
        </div>
        <p class="mb-1">{{answer.content}}</p>
        <small class="text-muted"><i class="fa fa-thumbs-up" aria-hidden="true" v-on:click="voteAnswer(answer._id)"> {{answer.voters.length}}</i></small>
        <small v-if="answer.removable"><i class="fa fa-trash-o" aria-hidden="true" v-on:click="deleteanswer(answer._id)"></i></small>
        <small><i class="fa fa-pencil-square-o" aria-hidden="true" v-if="answer.editable" data-toggle="modal" data-target="#editmodal" v-on:click="showedit(answer)"></i></small>
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
    <!-- modal register -->
    <div class="modal fade" id="editmodal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Your Answer</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <fieldset>
                <div class="form-group">
                  <label for="emailinput">Answer</label>
                  <textarea class="form-control" id="descriptioninput" rows="3" placeholder="text your answer" v-model="editanswer.content"></textarea>
                  <small id="emailHelp" class="form-text text-muted"></small>
                </div>
              </fieldset>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="updateanswer(editanswer)">Edited</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'QuestionDetail',
  data () {
    return {
      access_token: '',
      inputanswer: '',
      editanswer: {
        id: '',
        content: ''
      }
    }
  },

  props: ['id'],
  computed: {
    ...mapState([
      'question',
      'answers'
    ]),

    answerwithoption () {
      return this.$store.getters.answerwithoption
    }
  },

  methods: {
    ...mapActions([
      'getOneQuestion',
      'getAnswerQuestion',
      'postanswer',
      'voteAnswer',
      'deleteanswer',
      'updateanswer'
    ]),

    getToken: function () {
      this.access_token = localStorage.getItem('access_token')
    },

    erasepostanswer (inputanswer) {
      this.postanswer(inputanswer)
      this.inputanswer = ''
    },

    showedit (answer) {
      this.editanswer.id = answer._id
      this.editanswer.content = answer.content
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

 i {
   font-size: 16px;
   cursor: pointer;
 }

</style>
