<template>
<div>
<navbar> </navbar>
<div class="row col-md-8 text-center"> 
  <div class="panel panel-default">
    <div class="panel-heading"> <h4>{{question.title}}</h4></div>
    <div class="panel-body">
    <p>{{question.question}}</p>
    </div>
  </div>
  <add-answer :id="id"> </add-answer>
  <div class="container-fluid text-center">
    <div class="row content">
      <div class="col-sm-6 text-left">
       <h3>Answer</h3>
        <div class="well" v-for="(answer, index) in answers" :key="index">
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
export default {
  props: ['id'],
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
      'getAnswerByIdQuestion'
    ])
  },
  created () {
    this.findQuestionById(this.id)
    this.getAnswerByIdQuestion(this.id)
  }
}
</script>

<style>
</style>