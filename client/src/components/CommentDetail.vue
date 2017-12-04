<template>
<div class="container">

<link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">
    <div class="container" >
        <div class="row">
            <div class="col-sm-8">
                <button  v-if="isOwner(comment,userId)"  @click="removeComment(comment._id)" type="button" class="close"> 
                       <span aria-hidden="true">&times;</span>
                       <span class="sr-only">Close</span>
                </button>                  
                <div class="panel panel-white post panel-shadow">
                    <div class="post-heading">
                        <div class="pull-left image">
                            <img src="http://bootdey.com/img/Content/user_1.jpg" class="img-circle avatar" alt="user profile image">
                        </div>
                        <div class="pull-left meta">
                            <div class="title h5">
                                <a href="#"><b>{{ comment.userId.name }}</b></a>
                                comment
                            </div>
                            <h6 class="text-muted time"> {{ comment.commentDate }} </h6>
                        </div>
                    </div> 
                    <div class="post-description"> 
                        <p> {{ comment.desc }}</p>
                        <div class="stats">
                                <a  href="#" v-if="liked(userId)" @click.prevent="voteComment(comment._id)" class="fa fa-thumbs-up icon white"> {{ comment.commentLike.length }} </a>                        
                                <a  href="#" v-else="liked(userId)" @click.prevent="voteComment(comment._id)" class="fa fa-thumbs-up icon blue"> {{ comment.commentLike.length }} </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>	
</div>	
</template>

<script>
import { mapActions } from 'vuex'
export default {
	props: ['comment'],
    computed : {
        userId() {
          return this.$store.state.userId
        }  
    },
    methods : {
        ...mapActions ([
            'commentRemove',
            'commentVote'
            ]),
        removeComment : function (commentId) {
            this.commentRemove(commentId)
        },
        voteComment : function (commentId) {
            this.commentVote(commentId)
        },
        liked : function(user) {
          if(this.comment.commentLike.indexOf(user) != -1){
            return false
          }else{
            return true
          }
        },
        isOwner : function(comment,user) {
          if(comment.userId._id == user){
            return true
          }else{
            return false
          }
        }                

    }
}	
</script>

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
.container {
    box-sizing: border-box;
     width: 100%; 
     color: #009688; 
}  

.col-sm-8 {
    background-color: #FFFFFF;    
}

.voteComment {
    background-color: blue;
}

.white {
  color: black;
}

.blue {
  color: blue;
}


</style>