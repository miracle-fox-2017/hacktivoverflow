<template lang="html">
  <div class="col-md-9">
    <div class="postDetails">
      <div class="card">
        <h4 class="card-header">{{postDetails.title}}</h4>
        <div class="card-body">
          <p class="card-text">{{postDetails.content}}</p>
          <router-link :to="`/main-page/edit/${postDetails._id}`">
            <button class="btn btn-primary" type="button" name="button" :id="`edt-btn${postDetails._id}`">Edit this post</button>
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
          postDetails.votePost.forEach((dataPrevious) => {
            arr.push(dataPrevious._id)
          })
          if (arr.indexOf(this.userId) === -1) {
            arr.push(this.userId)
            postDetails.voteCount += 1
            this.$axios.put(`http://localhost:3000/post/addVotePost/${postDetails._id}`, {
              votePost: arr,
              voteCount: postDetails.voteCount
            }).then(({data}) => {
              this.getPostDetails()
            }).catch((err) => {
              console.log(err)
            })
          } else {
            console.log('sudah ada yang sama')
          }
        } else {
          arr.push(this.userId)
          postDetails.voteCount += 1
          this.$axios.put(`http://localhost:3000/post/addVotePost/${postDetails._id}`, {
            votePost: arr,
            voteCount: postDetails.voteCount
          }).then(({data}) => {
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
      if (this.loginCredentials) {
        if (this.loginCredentials.role === 'admin' || this.postDetails.userPost._id === this.loginCredentials.id) {
          document.querySelector(`#edt-btn${this.postDetails._id}`).hidden = false
        } else {
          document.querySelector(`#edt-btn${this.postDetails._id}`).hidden = true
        }
      }
    }
  }
}
</script>

<style lang="css">
</style>
