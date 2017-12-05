<template>
<div>
<navbar> </navbar>
<div class="row col-md-8 text-center"> 
  <div class="panel panel-default">
    <div class="panel-heading"> <h4>{{question.title}}</h4></div>
    <div class="panel-body">
    <p>{{question.question}}</p>
    <div class="pull-right">
        <a href="#" @click="deleteQuestion(question)">
            <span class="glyphicon glyphicon-trash"></span>
        </a>
        <a @click="editQuestion(question)" data-toggle="modal" data-target="#editQuestion">
            <span class="glyphicon glyphicon-pencil"></span>
        </a>

      </div>
    </div> 
  </div>
  <div v-if="isEdit" id="editQuestion" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Edit Question</h4>
      </div>
      <div class="modal-body">
        <form>
            <div class="form-group">
              <label for="title">Title:</label>
              <input type="text" class="form-control" v-model="questionDetail.title">
            </div>
            <div class="form-group">
              <label for="question">Question:</label>
              <textarea type="text" class="form-control" v-model="questionDetail.question"> </textarea>
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" @click="updateDataQuestion"> Submit </button>
      </div>
    </div>

  </div>
</div>
  <add-answer :id="id"> </add-answer>
  <div class="container-fluid text-center">
    <div class="row content">
      <div class="col-sm-6 text-left">
       <h3>Answer</h3>
        <div class="well" v-for="(answer, index) in answers" :key="index">
         <a @click="deleteAnswer(answer)">
           <span class="glyphicon glyphicon-trash"></span>
         </a>
         <p>{{answer.answer}}</p>
         <h6>Replied by : {{answer.author.username}}</h6>
         
        </div>
      </div>

    </div>
  </div>
</div>

</div>
</template>

<script>
import AddAnswer from '@/components/AddAnswer'
import Navbar from '@/components/Navbar'
import {mapActions, mapState} from 'vuex'
import jwt from 'jsonwebtoken'
export default {
  props: ['id'],
  data: function () {
    return {
      isEditQuestion: false,
      isDeleteQuestion: false,
      questionDetail: {
        title: '',
        question: '',
        id: ''
      },
      isEdit: false,
      target: ''
    }
  },
  name: 'QuestionDetail',
  components: {
    Navbar,
    AddAnswer
  },
  computed: {
    ...mapState([
      'question',
      'answers'
    ])
  },
  methods: {
    ...mapActions([
      'findQuestionById',
      'getAnswerByIdQuestion',
      'deleteQuestionById',
      'updateDataQuestionById',
      'deleteDataAnswer'
    ]),
    deleteQuestion (question) {
      if (question.author.username !== jwt.decode(localStorage.getItem('token')).username) {
        alert('You are not authorized to delete this question!')
      } else {
        this.deleteQuestionById(question._id)
      }
    },
    editQuestion (question) {
      if (question.author.username !== jwt.decode(localStorage.getItem('token')).username) {
        alert('You are not authorized to edit this question!')
        this.isEdit = false
      } else {
        this.isEdit = true
        this.questionDetail.title = question.title
        this.questionDetail.question = question.question
        this.questionDetail.id = question._id
      }
    },
    updateDataQuestion () {
      this.updateDataQuestionById(this.questionDetail)
    },
    deleteAnswer (answer) {
      if (answer.author._id !== jwt.decode(localStorage.getItem('token')).id) {
        alert('You are not authorized to delete this answer!')
      } else {
        this.deleteDataAnswer(answer._id)
      }
    }
  },
  created () {
    this.findQuestionById(this.id)
    this.getAnswerByIdQuestion(this.id)
  }
}
</script>

<style scoped>
.pull-right a{
  padding: 10px;
}
</style>