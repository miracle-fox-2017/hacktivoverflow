<template>
  <div class="meta">
    <a class="like" @click="voteAnswer">
      <i class="thumbs outline up icon"></i> {{votes.length}} Likes
    </a>
  </div>
</template>

<script>
export default {
  props: ['answerId'],
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
      this.$http.post('/voteAnswers', {
        answerId: this.answerId,
        votes: true
      }, {
        headers: {
          accesstoken: localStorage.getItem('accesstoken')
        }
      })
      .then(({data}) => {
        this.votes.push(data)
      })
      // eslint-disable-next-line
      .catch(err => {
        this.$http.delete(`/voteAnswers/${this.votes[index]._id}`, {
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
    getVotes () {
      this.$http.get(`/voteAnswers/answers/${this.answerId}`)
      .then(({data}) => {
        this.votes = data
      })
      .catch(err => console.log(err))
    }
  },
  created () {
    this.getVotes()
  }
}
</script>

<style>

</style>
