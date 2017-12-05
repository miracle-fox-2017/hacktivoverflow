<template lang="html">
  <div class="commentColumn">
    <h4>Comments</h4>
      <div class="card" v-for="(comment, index) in commentById">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            {{comment.title}}
            <br>
            <hr>
            <button class="btn btn-primary" type="button" name="button" @click="vote(comment)" id="btnVote">Vote Up! {{comment.voteCount}} Times Voted</button>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'Comment',
  props: ['postId'],
  data () {
    return {
      userId: ''
    }
  },
  methods: {
    ...mapActions(
      [
        'getCommentById'
      ]
    ),
    vote (comment) {
      let arr = []
      if (this.userId !== undefined) {
        if (comment.voteAnswer.length !== 0) {
          comment.voteAnswer.forEach((dataPrevious) => {
            arr.push(dataPrevious._id)
          })
          console.log('indexof', arr.indexOf(this.userId))
          if (arr.indexOf(this.userId) === -1) {
            document.querySelector('#btnVote').disabled = true
            arr.push(this.userId)
            comment.voteCount += 1
            this.$axios.put(`http://18.217.192.109/answer/addVoteAnswer/${comment._id}`, {
              voteAnswer: arr,
              voteCount: comment.voteCount
            }).then(({data}) => {
              this.getCommentById({_id: this._props.postId})
            }).catch((err) => {
              console.log(err)
            })
          } else {
            console.log('sudah ada yang sama')
          }
        } else {
          document.querySelector('#btnVote').disabled = true
          arr.push(this.userId)
          comment.voteCount += 1
          this.$axios.put(`http://18.217.192.109/answer/addVoteAnswer/${comment._id}`, {
            voteAnswer: arr,
            voteCount: comment.voteCount
          }).then(({data}) => {
            this.getCommentById({_id: this._props.postId})
          }).catch((err) => {
            console.log(err)
          })
        }
      } else {
        this.$router.push('/')
      }
    }
  },
  computed: {
    commentById () {
      return this.$store.state.commentById
    },
    loginCredentials () {
      return this.$store.state.loginCredentials
    }
  },
  created () {
    this.userId = this.loginCredentials.id
  }
}
</script>

<style lang="css" scoped>
.commentColumn {
  padding-top: 5em;
  padding-bottom: 5em
}
</style>
