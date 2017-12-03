<template lang="html">
  <div class="commentColumn">
    <h4>Comments</h4>
      <div class="card" v-for="(comment, index) in dataComment">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            {{comment.title}}
            <br>
            <hr>
            <button class="btn btn-primary" type="button" name="button" @click="vote(comment)">Vote Up!</button>
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
      dataComment: [],
      counter: 0,
      userId: ''
    }
  },
  methods: {
    getCommentById () {
      this.dataComment = []
      this.comments.forEach((data) => {
        if (data.question._id === this.postId) {
          this.dataComment.push(data)
        }
      })
    },
    vote (commentById) {
      let arr = []
      commentById.voteAnswer.forEach((dataPrevious) => {
        arr.push(dataPrevious._id)
      })
      arr.forEach((dataArr) => {
        if (dataArr !== this.userId) {
          arr.push(this.userId)
        } else {
          console.log('sudah ada yg sama')
        }
      })
      this.$axios.put(`http://localhost:3000/answer/addVoteAnswer/${commentById._id}`, {
        voteAnswer: arr
      }).then(({data}) => {
        console.log(data)
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  computed: {
    comments () {
      return this.$store.state.comments
    },
    loginCredentials () {
      return this.$store.state.loginCredentials
    }
  },
  created () {
    this.getCommentById()
    this.userId = this.loginCredentials.id
  },
  watch: {
    postId (newId) {
      this.postId = newId
      this.getCommentById(this.postId)
    }
  }
}
</script>

<style lang="css" scoped>
.commentColumn {
  padding-top: 5em;
  padding-bottom: 5em
}
</style>
