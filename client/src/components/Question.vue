<template lang="html">
  <div class="well wll-sm">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4>
          <router-link :to="{ path: '/question/' + question._id }">{{ question.title }}</router-link>
          <span @click="voteQuestionUp(question)" class="right-fix pull-right "><button class="btn btn-success btn-sm"type="button" name="button"><i class="fa fa-thumbs-up" aria-hidden="true"></i></button></span>
          <span @click="voteQuestionDown(question)" class="right-fix pull-right"><button class="btn btn-primary btn-sm"type="button" name="button"><i class="fa fa-thumbs-down" aria-hidden="true"></i></button></span>
          <span v-if="userLogin == question.userId" @click="removeQuestion" class="right-fix pull-right "><button class="btn btn-danger btn-sm"type="button" name="button"><i class="fa fa-trash" aria-hidden="true"></i></button></span>
          <span v-if="userLogin == question.userId" @click="editQuestion(question)" class="right-fix pull-right "><button class="btn btn-info btn-sm"type="button" name="button"><i class="fa fa-pencil" aria-hidden="true"></i></button></span>
        </h4>
        <p>By: {{ question.name }}</p>
        <span>Vote: {{ totalQuestionVote }}</span>
      </div>
      <div class="panel-body panel-question">
        <p class="question">{{ question.question }}</p>
      </div>
      <div v-for="a in answers" class="panel-body">
        <span @click="voteAnswerUp(a)" class="right-fix pull-right "><button class="btn btn-success btn-sm"type="button" name="button"><i class="fa fa-thumbs-up" aria-hidden="true"></i></button></span>
        <span @click="voteAnswerDown(a)" class="right-fix pull-right"><button class="btn btn-primary btn-sm"type="button" name="button"><i class="fa fa-thumbs-down" aria-hidden="true"></i></button></span>
        <span v-if="userLogin == a.userId" @click="removeAnswer(a._id)" class="right-fix pull-right "><button class="btn btn-danger btn-sm"type="button" name="button"><i class="fa fa-trash" aria-hidden="true"></i></button></span>
        <p class="answer">{{ a.answer }}</p>
        <p>By: {{ a.name }}</p>
        <span>Vote: {{ a.upVote.length - a.downVote.length }}</span>
      </div>
    </div>
    <button type="button" class="btn btn-success" name="button" data-toggle="modal" data-target="#answer">Answer</button>
    <!-- Modal Answer -->
    <div id="answer" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Answer</h4>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="sendAnswer" class="form-horizontal">
              <fieldset>
                <div class="form-group">
                  <label for="image" class="col-lg-2 control-label">Image Url</label>
                  <div class="col-lg-10">
                    <input v-model="image" class="form-control" id="image" placeholder="http://image.url/this_is_jpg.jpg" type="text">
                  </div>
                </div>
                <div class="form-group">
                  <label for="answer" class="col-lg-2 control-label">Your Answer</label>
                  <div class="col-lg-10">
                    <textarea v-model="answer" class="form-control" rows="3" id="answer"></textarea>
                  </div>
                </div>
                <div class="modal-footer">
                  <div class="form-group">
                    <div class="col-lg-10 col-lg-offset-2">
                      <button type="reset" class="btn btn-default" data-dismiss="modal">Cancel</button>
                      <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div> <!-- end answer modal -->
    
    <!-- Modal Update Question -->
    <div id="update" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Question</h4>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="sendUpdateQuestion" class="form-horizontal">
              <fieldset>
                <div class="form-group">
                  <label for="title" class="col-lg-2 control-label">Title</label>
                  <div class="col-lg-10">
                    <input v-model="updateQuestion.title" class="form-control" id="title" placeholder="http://image.url/this_is_jpg.jpg" type="text">
                  </div>
                </div>
                <div class="form-group">
                  <label for="image" class="col-lg-2 control-label">Image Url</label>
                  <div class="col-lg-10">
                    <input v-model="updateQuestion.image" class="form-control" id="image" placeholder="http://image.url/this_is_jpg.jpg" type="text">
                  </div>
                </div>
                <div class="form-group">
                  <label for="question" class="col-lg-2 control-label">Question</label>
                  <div class="col-lg-10">
                    <textarea v-model="updateQuestion.question" class="form-control" rows="3" id="question"></textarea>
                  </div>
                </div>
                <div class="modal-footer">
                  <div class="form-group">
                    <div class="col-lg-10 col-lg-offset-2">
                      <button type="reset" class="btn btn-default" data-dismiss="modal">Cancel</button>
                      <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div> <!-- end updateQuestion modal -->
    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: function () {
    return {
      image: '',
      answer: '',
      _id: '',
      updateQuestion: {
        _id: '',
        title: '',
        image: '',
        question: ''
      },
      index: 0
    }
  },
  watch: {
    '$route' (to, from) {
      this.getQuestion(this.$route.params.id)
      this.getAnswer(this.$route.params.id)
      if (this.statusLogin) {
        this._id = JSON.parse(localStorage.getItem('dataUser'))._id
        this.statusLogin = true
      }
    }
  },
  computed: {
    ...mapState([
      'statusLogin',
      'userLogin',
      'question',
      'answers'
    ]),
    totalQuestionVote: function () {
      if (this.question.upVote) {
        return this.question.upVote.length - this.question.downVote.length
      } else {
        return 0
      }
    },
    totalAnswerVote: function () {
      // return this.answer.upVote.length - this.answer.downVote.length
      return 0
    }
  },
  methods: {
    ...mapActions([
      'getQuestion',
      'getAnswer',
      'postAnswer',
      'updatedQuestion',
      'deleteQuestion',
      'deleteAnswer',
      'voteQuestion',
      'voteAnswer',
      'changeLoginState'
    ]),
    sendAnswer: function () {
      let newAnswer = {
        questionId: this.$route.params.id,
        image: this.image,
        answer: this.answer
      }
      this.postAnswer(newAnswer)
      // eslint-disable-next-line
      $('#answer').modal('hide')
      this.image = ''
      this.answer = ''
    },
    editQuestion: function (question) {
      this.updateQuestion._id = question._id
      this.updateQuestion.title = question.title
      this.updateQuestion.image = question.image
      this.updateQuestion.question = question.question
      // eslint-disable-next-line
      $('#update').modal('show')
    },
    sendUpdateQuestion: function () {
      this.updatedQuestion(this.updateQuestion)
      // eslint-disable-next-line
      $('#update').modal('hide')
    },
    removeQuestion: function () {
      this.deleteQuestion(this.$route.params.id)
      this.$router.push('/')
    },
    removeAnswer: function (answerId) {
      this.deleteAnswer(answerId)
    },
    voteQuestionUp: function (question) {
      if (this.statusLogin) {
        question.value = 1
        this.voteQuestion(question)
      } else {
        alert('please login')
      }
    },
    voteQuestionDown: function (question) {
      if (this.statusLogin) {
        question.value = -1
        this.voteQuestion(question)
      } else {
        alert('please login')
      }
    },
    voteAnswerUp: function (answer) {
      if (this.statusLogin) {
        answer.value = 1
        this.voteAnswer(answer)
      } else {
        alert('please login')
      }
    },
    voteAnswerDown: function (answer) {
      if (this.statusLogin) {
        answer.value = -1
        this.voteAnswer(answer)
      } else {
        alert('please login')
      }
    },
    changeLoginState: function () {
    }
  },
  created: function () {
    this.getQuestion(this.$route.params.id)
    this.getAnswer(this.$route.params.id)
    if (this.statusLogin) {
      this._id = JSON.parse(localStorage.getItem('dataUser'))._id
      this.statusLogin = true
    }
  }
}
</script>

<style lang="css" scoped>
.right-fix {
  margin-left: 1px;
  margin-top: -2px;
}
.panel-question {
  border-bottom: 1px solid lightgray;
}
.answer, .question {
  color: black;
}
</style>
