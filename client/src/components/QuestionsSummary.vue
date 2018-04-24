<template>
<div class="container"> 
    <button v-if="isOwner(question,userId)" @click="remove(question._id)" class="btn btn-default pull-right">
    <span class="glyphicon glyphicon-trash"></span> </button>
       <router-link :to="`/edit/${question._id}`">
        <button v-if="isOwner(question,userId)" class="btn btn-default pull-right" data-toggle="modal" data-target="ModalHorizontal">
            <span class="glyphicon glyphicon-edit"></span>
        </button>
       </router-link>        
    <h3>{{ question.userName }} <small> post this message at {{ question.createdAt }}</small> </h3> 
    <h2> {{ question.title }} </h2>
    <div class="panel panel-default">
      <div class="panel-body"> {{ question.desc }}</div>
      </div>
      <router-link :to="`/${question._id}`" > 
        <button class="btn btn-default pull-left"> Show Detail or Answer 
        </button> 
      </router-link>
      <a href="#" v-if="liked(userId)" @click.prevent="voteLike(question._id)" class="glyphicon glyphicon-thumbs-up pull-right white"> {{ question.like.length }} </a>
       <a href="#" v-else="liked(userId)" @click.prevent="voteLike(question._id)" class="glyphicon glyphicon-thumbs-up pull-right blue"> {{ question.like.length }} </a>
    </div>  
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['question'],
  computed : {
    checkIn() {
      return this.$store.state.checkIn
    },
    userId() {
      return this.$store.state.userId
    }      

  },  
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
    },
    liked : function(questionId) {
      if(this.question.like.indexOf(questionId) != -1){
        return false
      }else{
        return true
      }
    },
    isOwner : function(question,user) {
      if(question.userId._id == user){
        return true
      }else{
        return false
      }
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
  text-decoration: none;
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

.white {
  color: black;
}

.blue {
  color: blue;
}
.container {
  margin-top: 20px;
  background-color: #F5F5F5;
}
</style>
