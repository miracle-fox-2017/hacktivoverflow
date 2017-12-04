<template>
  <div class="meta">
    <a class="like" @click="voteAnswer">
      <i class="thumbs outline up icon"></i> {{votes.length}} Likes
    </a>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  props: ['questionId'],
  data () {
    return {
      votes: []
    }
  },
  methods: {
    voteAnswer () {
      let index = this.votes.map(v => { return v.userId }).indexOf(localStorage.getItem('userId'))
      // console.log(index)
      // if (index == -1) {
      this.$http.post('/voteQuestions', {
        questionId: this.questionId,
        votes: true
      }, {
        headers: {
          accesstoken: localStorage.getItem('accesstoken')
        }
      })
      .then(({data}) => {
        this.votes.push(data)
      })
      .catch(err => {
        // console.log(err)
        this.$http.delete(`/voteQuestions/${this.votes[index]._id}`, {
          headers: {
            accesstoken: localStorage.getItem('accesstoken')
          }
        })
        .then(response => {
          this.votes.splice(index, 1)
        })
        .catch(error => console.log(error))
      })
      // } else {
      // console.log(this.votes[index]._id)
    },
    getVotes (questionId) {
      this.$http.get(`/voteQuestions/questions/${questionId}`)
      .then(({data}) => {
        this.votes = data
      })
      .catch(err => console.log(err))
    }
  },
  mounted () {
    this.getVotes(this.questionId)
  }
}
</script>

<style>

</style>
