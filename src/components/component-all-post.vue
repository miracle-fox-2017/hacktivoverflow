<template>
  <div class="wrapper">
    <div class="create-post">
      <input type="text" v-model="newPost.title" placeholder="Type your title">
      <textarea name="name" v-model="newPost.content" placeholder="What would you like to ask?"></textarea>
      <button type="button" class="btn btn-primary" @click="submitPost">Submit</button>
    </div>
    <ul class="post-list">
      <li v-for="(post,index) in posts" :key="index">
        <router-link :to="'post/'+post._id" class="title">{{post.title}}</router-link>
        <span class="date">Ditanyakan pada {{post.createdAt}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return{
      newPost:{
        title:"",
        content:""
      }
    }
  },
  methods:{
    submitPost(){
      if(this.newPost.title.length > 0 && this.newPost.content.length > 0){
        this.$axios.post("post/add",this.newPost,{
          headers:{
            token:localStorage.getItem("login_token")
          }
        }).then(function({data}){
          if(data.status){
            this.newPost.title="";
            this.newPost.content="";
            this.$store.dispatch("addNewPost",data.msg);
          }else{
            console.log(data.msg);
          }
        }.bind(this)).catch(function(err){
          console.log(err);
        });
      }else{
        alert("Please fill all the form!");
      }
    }
  },
  computed:{
    posts(){
      return this.$store.state.postList
    }
  }
}
</script>
<style lang="scss">
.wrapper {
  width: 90%;
  margin: auto;
  max-width: 900px;
  margin-bottom: 50px;
  .create-post {
    padding: 25px;
    overflow: hidden;
    margin-top: 20px;
    border-radius: 5px;
    box-sizing: border-box;
    background-color: #F1F1F1;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.20);
    @mixin default-input {
      width: 100%;
      outline: none;
      box-sizing: border-box;
      font-family: "Roboto",sans-serif;
    }
    input {
      font-size: 24px;
      padding: 5px 10px 5px 10px;
      @include default-input;
    }
    textarea {
      resize: none;
      height: 150px;
      padding: 10px;
      font-size: 18px;
      margin-top: 20px;
      line-height: 35px;
      @include default-input;
    }
    button {
      float: right;
      margin-top: 10px;
      font-family: "Roboto",sans-serif;
    }
  }
  .post-list {
    margin: 0;
    padding: 0;
    li {
      padding: 25px;
      list-style: none;
      margin-top: 20px;
      box-sizing: border-box;
      background-color: #F1F1F1;
      box-shadow: 0 0 10px 0 rgba(0,0,0,.20);
    }
    .title {
      color: #555;
      display: block;
      font-size: 40px;
      text-decoration: none;
      font-family: "Roboto",sans-serif;
    }
    .date {
      font-size: 18px;
      font-style: italic;
    }
  }
}
</style>
