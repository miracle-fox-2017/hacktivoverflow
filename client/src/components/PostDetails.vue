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
          <button class="btn btn-primary" type="button" name="button" @click="vote(postDetails)">Vote this question! Voted {{postDetails.voteCount}} Times </button>
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
      postDetails: {},
      userId: ''
    }
  },
  methods: {
    vote (postDetails) {
      let arr = []
      if (this.userId !== undefined) {
        if (postDetails.votePost.length !== 0) {
          console.log('masuk if')
          postDetails.votePost.forEach((dataPrevious) => {
            arr.push(dataPrevious._id)
          })
          console.log('indexof', arr.indexOf(this.userId))
          if (arr.indexOf(this.userId) === -1) {
            console.log('masuk if arr')
            arr.push(this.userId)
            postDetails.voteCount += 1
            this.$axios.put(`http://localhost:3000/post/addVotePost/${postDetails._id}`, {
              votePost: arr,
              voteCount: postDetails.voteCount
            }).then(({data}) => {
              console.log(data)
              this.getPostDetails()
            }).catch((err) => {
              console.log(err)
            })
          } else {
            console.log('sudah ada yang sama')
          }
        } else {
          console.log('masuk else')
          arr.push(this.userId)
          postDetails.voteCount += 1
          console.log(postDetails.voteCount)
          this.$axios.put(`http://localhost:3000/post/addVotePost/${postDetails._id}`, {
            votePost: arr,
            voteCount: postDetails.voteCount
          }).then(({data}) => {
            console.log(data)
            this.getPostDetails()
          }).catch((err) => {
            console.log(err)
          })
        }
      } else {
        this.$router.push('/')
      }
    },
    getPostDetails () {
      this.$axios.get(`http://localhost:3000/post/${this.postId}`)
      .then(({data}) => {
        this.postDetails = data
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
  computed: {
    loginCredentials () {
      return this.$store.state.loginCredentials
    }
  },
  created () {
    this.getPostDetails()
    this.userId = this.loginCredentials.id
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
