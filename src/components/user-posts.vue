<template>
  <div>
    <div id="editPost" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Modal Header</h4>
          </div>
          <div class="modal-body">
            <span class="input-label">Title</span>
            <input type="text" placeholder="Type your title" v-model="editPost.title">
            <span class="input-label">Content</span>
            <textarea name="name" placeholder="What would you like to ask?" v-model="editPost.content"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="updatePost" data-dismiss="modal">Update</button>
          </div>
        </div>
      </div>
    </div>
    <ul class="user-posts">
      <li v-for="(post,index) in getPost" :key="index">
        <span class="title">{{post.title}}</span>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editPost" @click="setEditModal(post)">Edit</button>
        <button type="button" class="btn btn-danger" @click="deletePost(post._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props:["userId"],
  data(){
    return{
      editPost:{
        id:"",
        title:"",
        content:""
      }
    }
  },
  computed:{
    getPost(){
      return this.$store.state.postList.filter((post)=>{
        if(post.UserId == this.userId){
          return post
        }
      });
    }
  },
  methods:{
    setEditModal(post){
      this.editPost.id=post._id;
      this.editPost.title=post.title;
      this.editPost.content=post.content;
    },
    updatePost(){
      this.$axios.put(`post/edit/${this.editPost.id}`,{
        title:this.editPost.title,
        content:this.editPost.content
      },{
        headers:{
          token:localStorage.getItem("login_token")
        }
      }).then(function({data}){
        if(data.status){
          this.$store.dispatch("getAllPost");
        }
      }.bind(this)).catch(function(err){
        console.log(err);
      });
    },
    deletePost(postId){
      this.$axios.delete(`post/delete/${postId}`,{
        headers:{
          token:localStorage.getItem("login_token")
        }
      }).then(function({data}){
        if(data.status){
          this.$store.dispatch("getAllPost");
        }
      }.bind(this)).catch(function({err}){
        console.log(err);
      });
    }
  }
}
</script>
<style lang="scss">
#editPost {
  .input-label {
    display: block;
    font-size: 16px;
    margin-top: 10px;
    font-weight: bold;
    font-family: "Roboto";
  }
  @mixin default-input {
    width: 100%;
    outline: none;
    font-family: "Roboto";
    box-sizing: border-box;
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
    margin-bottom: 10px;
    @include default-input;
  }
}
.user-posts {
  padding: 0;
  width: 90%;
  margin: auto;
  max-width: 900px;
  margin-bottom: 50px;
  li {
    padding: 25px;
    list-style: none;
    margin-top: 20px;
    box-sizing: border-box;
    background-color: #F1F1F1;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.20);
    button {
      margin-top: 10px;
    }
    .title {
      color: #555;
      display: block;
      font-size: 40px;
      font-family: "Roboto",sans-serif;
    }
  }
}
</style>
