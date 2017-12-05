<template>
  <div class="wrapper">
    <router-link to="/" class="btn btn-default">Back</router-link>
    <div class="post-body">
      <span class="title">{{post.title}}</span>
      <span class="content">{{post.content}}</span>
      <button type="button" class="btn btn-default" @click="upvote">Upvote {{post.vote.length}}</button>
      <button type="button" class="btn btn-default" @click="downvote">Downvote {{post.downvote.length}}</button>
    </div>
    <div class="write-comment">
      <textarea placeholder="Type your comment" v-model="newComment"></textarea>
      <button type="button" class="btn btn-primary" @click="addComment">Add Comment</button>
    </div>
    <ul class="comment-list">
      <li v-for="(comment,index) in commentList">
        <span class="title">Answer by {{comment.UserId.email}}</span>
        <span class="content">{{comment.comment}}</span>
        <button type="button" class="btn btn-default" @click="upvoteComment(comment._id)">Upvote {{comment.vote.length}}</button>
        <button type="button" class="btn btn-default" @click="downvoteComment(comment._id)">Downvote {{comment.downvote.length}}</button>
        <button type="button" class="btn btn-default" v-if="comment.UserId._id == userId" @click="deleteComment(comment._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props:["postId"],
  data(){
    return{
      newComment:"",
      commentList:[],
      userId:""
    }
  },
  created(){
    this.getAllComment();
    this.getUserId();
  },
  computed:{
    post(){
      return this.$store.state.postList.filter((post)=>{
        return post._id == this.postId
      })[0];
    }
  },
  methods:{
    getUserId(){
      if(localStorage.getItem("login_token") != null){
        this.$axios.get("user/userid",{
          headers:{
            token:localStorage.getItem("login_token")
          }
        }).then(function({data}){
          if(data.status){
            this.userId=data.msg;
          }else{
            console.log(data.msg);
          }
        }.bind(this)).catch(function(err){
          console.log(err);
        });
      }
    },
    upvote(){
      if(localStorage.getItem("login_token") != null){
        this.$axios.post(`post/upvote/${this.postId}`,null,{
          headers:{
            token:localStorage.getItem("login_token")
          }
        }).then(function({data}){
          if(data.status){
            this.$store.dispatch("getAllPost");
          }else{
            alert(data.msg);
          }
        }.bind(this)).catch(function(err){
          console.log(err);
        });
      }else{
        alert("Please Login!");
      }
    },
    downvote(){
      if(localStorage.getItem("login_token") != null){
        this.$axios.post(`post/downvote/${this.postId}`,null,{
          headers:{
            token:localStorage.getItem("login_token")
          }
        }).then(function({data}){
          if(data.status){
            this.$store.dispatch("getAllPost");
          }else{
            alert(data.msg);
          }
        }.bind(this)).catch(function(err){
          console.log(err);
        });
      }else{
        alert("Please Login");
      }
    },
    getAllComment(){
      this.$axios.get("comment/all",{
        headers:{
          postid:this.postId
        }
      }).then(function({data}){
        this.commentList=data.msg;
      }.bind(this)).catch(function(err){
        console.log(err);
      });
    },
    addComment(){
      if(localStorage.getItem("login_token") != null){
        this.$axios.post("comment/add",{comment:this.newComment},{
          headers:{
            token:localStorage.getItem("login_token"),
            postid:this.postId
          }
        }).then(function({data}){
          if(data.status){
            this.newComment="";
            this.getAllComment();
          }else{
            alert(data.msg);
          }
        }.bind(this)).catch(function(err){
          console.log(err);
        });
      }else{
        alert("Please Login");
      }
    },
    deleteComment(commentId){
      this.$axios.delete(`comment/delete/${commentId}`,{
        headers:{
          token:localStorage.getItem("login_token")
        }
      }).then(function({data}){
        if(data.status){
          this.getAllComment();
        }else{
          alert(data.msg);
        }
      }.bind(this)).catch(function(err){
        console.log(err);
      });
    },
    upvoteComment(commentId){
      if(localStorage.getItem("login_token") != null){
        this.$axios.post(`comment/upvote/${commentId}`,null,{
          headers:{
            token:localStorage.getItem("login_token")
          }
        }).then(function({data}){
          if(data.status){
            this.getAllComment();
          }else{
            alert(data.msg);
          }
        }.bind(this)).catch(function(err){
          console.log(err);
        });
      }else{
        alert("Please Login!");
      }
    },
    downvoteComment(commentId){
      if(localStorage.getItem("login_token") != null){
        this.$axios.post(`comment/downvote/${commentId}`,null,{
          headers:{
            token:localStorage.getItem("login_token")
          }
        }).then(function({data}){
          if(data.status){
            this.getAllComment();
          }else{
            alert(data.msg);
          }
        }.bind(this)).catch(function(err){
          console.log(err);
        });
      }else{
        alert("Please Login");
      }
    }
  }
}
</script>
<style lang="scss">
.wrapper {
  width: 90%;
  margin: auto;
  max-width: 900px;
  margin-top: 20px;
  margin-bottom: 50px;
  .post-body {
    padding: 25px;
    list-style: none;
    margin-top: 20px;
    box-sizing: border-box;
    background-color: #F1F1F1;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.20);
    span {
      display: block;
      font-family: "Roboto",sans-serif;
    }
    button {
      margin-top: 10px;
    }
    .title {
      color: #555;
      font-size: 40px;
    }
    .content {
      font-size: 18px;
      line-height: 30px;
    }
  }
  .write-comment {
    padding: 25px;
    list-style: none;
    margin-top: 20px;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #F1F1F1;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.20);
    textarea {
      width: 100%;
      resize: none;
      height: 100px;
      padding: 10px;
      outline: none;
      font-size: 18px;
      box-sizing: border-box;
      font-family: "Roboto",sans-serif;
    }
    button {
      float: right;
      margin-top: 10px;
    }
  }
  .comment-list {
    padding: 0;
    li {
      padding: 25px;
      margin-top: 20px;
      list-style: none;
      box-sizing: border-box;
      background-color: #F1F1F1;
      box-shadow: 0 0 10px 0 rgba(0,0,0,.20);
    }
    span {
      display: block;
      font-family: "Roboto",sans-serif;
    }
    .title {
      font-size: 16px;
      font-weight: bold;
      font-style: italic;
      margin-bottom: 10px;
    }
    .content {
      font-size: 20px;
      font-weight: 300;
      line-height: 30px;
      margin-bottom: 10px;
    }
  }
}
</style>
