<template lang="html">
  <div class="col-md-9">
    <div class="postDetails">
      <div class="card">
        <h4 class="card-header">{{postDetails.title}}</h4>
        <div class="card-body">
          <p class="card-text">{{postDetails.content}}</p>
          <router-link :to="`/main-page/edit/${postDetails._id}`">
            <button class="btn btn-primary" type="button" name="button">Edit this post</button>
          </router-link>
        </div>
      </div>
    </div>
    <Comment :postId="postId"></Comment>
    <PostComment :postId="postId"></PostComment>
  </div>
</template>

<script>
import Comment from '@/components/Comment'
import PostComment from '@/components/PostComment'
import {mapActions} from 'vuex'
export default {
  name: 'PostDetails',
  props: ['postId'],
  components: {
    Comment,
    PostComment
  },
  data () {
    return {
      postDetails: {}
    }
  },
  methods: {
    getPostDetails () {
      this.$axios.get(`http://localhost:3000/post/${this.postId}`)
      .then(({data}) => {
        this.postDetails = data
        console.log('ini jalan', this.postDetails)
        this.getCommentById(this.postDetails)
      }).catch((err) => {
        console.log(err)
      })
    },
    ...mapActions(
      [
        'getCommentById'
      ]
    )
  },
  created () {
    this.getPostDetails()
  },
  watch: {
    postId (newId) {
      this.postId = newId
      this.getPostDetails(this.postId)
    }
  }
}
</script>

<style lang="css">
</style>
