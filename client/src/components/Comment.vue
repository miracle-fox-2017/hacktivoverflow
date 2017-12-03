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
export default {
  name: 'Comment',
  props: ['postId'],
  data () {
    return {
      userId: ''
    }
  },
  methods: {
    vote (comment) {
      let arr = []
      console.log(comment.voteCount)
      if (this.userId !== undefined) {
        if (comment.voteAnswer.length !== 0) {
          console.log('masuk if')
          comment.voteAnswer.forEach((dataPrevious) => {
            arr.push(dataPrevious._id)
            console.log(dataPrevious._id)
          })
          if (arr.indexOf(this.userId) === -1) {
            console.log('masuk if arr')
            arr.push(this.userId)
            comment.voteCount += 1
          } else {
            console.log('sudah ada yang sama')
          }
        } else {
          console.log('masuk else')
          arr.push(this.userId)
          comment.voteCount += 1
        }
        console.log(comment.voteCount)
        this.$axios.put(`http://localhost:3000/answer/addVoteAnswer/${comment._id}`, {
          voteAnswer: arr,
          voteCount: comment.voteCount
        }).then(({data}) => {
          console.log(data)
        }).catch((err) => {
          console.log(err)
        })
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
