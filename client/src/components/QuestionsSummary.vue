<template>
<div class="container"> 
    <button @click="remove(question._id)" class="btn btn-default pull-right">
    <span class="glyphicon glyphicon-trash"></span> </button>  
    <h3>{{ question.userId.name }} </h3> <small> {{ question.title }}</small>
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
</style>
