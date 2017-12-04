<template>
<div class="container">

<link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">
    <div class="container" >
        <div class="row">
            <div class="col-sm-8">
                <button  @click="removeComment(comment._id)" type="button" class="close"> 
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
                            <button @click="voteComment(comment._id)" class="btn btn-default stat-item">
                                <i class="fa fa-thumbs-up icon"></i>{{ comment.commentLike.length }}
                            </button>
                       <!--       <button @click="voteLike(question._id)" class="btn btn-default pull-right"><span class="glyphicon glyphicon-thumbs-up"></span> {{ question.like.length }}</button> -->
    <!--                         <a href="#" class="btn btn-default stat-item">
                                <i class="fa fa-thumbs-down icon"></i>12
                            </a> -->                         
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

.post-description:hover {
 
}


</style>