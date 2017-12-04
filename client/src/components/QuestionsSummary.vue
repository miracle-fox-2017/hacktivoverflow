<template>
<div class="container"> 
    <button @click="remove(question._id)" class="btn btn-default pull-right">
    <span class="glyphicon glyphicon-trash"></span> </button>
       <router-link :to="`/edit/${question._id}`">
        <button class="btn btn-default pull-right" data-toggle="modal" data-target="ModalHorizontal">
            <span class="glyphicon glyphicon-edit"></span>
        </button>
       </router-link>        
    <h3>{{ question.userId.name }} <small> post this message at {{ question.createdAt }}</small> </h3> <small> {{ question.title }}</small>
    <div class="panel panel-default">
      <div class="panel-body"> {{ question.desc }}</div>
      </div>
      <router-link :to="`/${question._id}`" > 
        <button class="btn btn-default pull-left"> Show Detail or Answer 
        </button> 
      </router-link>
      <button @click="voteLike(question._id)" class="btn btn-default pull-right"><span class="glyphicon glyphicon-thumbs-up"></span> {{ question.like.length }}</button>
    </div>  
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['question'],
  methods: {
    ...mapActions([
      'deleteQuestion',
      'getAllQuestion',
      'voteQuestion'
      ]),
    remove : function (questionId) {
      this.deleteQuestion(questionId)
    },
    voteLike : function (questionId) {
      this.voteQuestion(questionId)
    }
  },
  created () {
    this.getAllQuestion()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

small {
  color: #9E9E9E;
}

h3 {
  color: #FF5722;
}
.panel-body {
  color: #C2185B;
}

.container {
  margin-top: 20px;
  background-color: #F5F5F5;
}
</style>
