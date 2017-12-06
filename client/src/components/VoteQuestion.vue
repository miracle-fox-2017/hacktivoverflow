<template>
  <div class="meta">
    <a class="like" @click="voteAnswer">
      <i class="thumbs outline up icon"></i> {{votes.length}} Likes
    </a>
    <div :class="errorClass">
      <div class="ui icon header" style="color: red;">
        <i class="remove circle outline icon"></i>
        Access Denied!!
      </div>
      <div class="content">
        <p style="color: red; text-align: center; font-size: 18px;">Please login before response any questions or answer!!</p>
      </div>
      <div class="actions">
        <div class="ui red basic cancel inverted button">
          <i class="remove icon"></i>
          Close
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  props: ['questionId'],
  data () {
    return {
      errorClass: `ui basic modal ${this.questionId}`,
      votes: [],
      isLogin: localStorage.getItem('accesstoken')
    }
  },
  methods: {
    voteAnswer () {
      let index = this.votes.map(v => { return v.userId }).indexOf(localStorage.getItem('userId'))
      console.log(index)
      if (index == -1) {
        this.$http.post('/voteQuestions', {
          questionId: this.questionId,
          votes: true
        }, {
          headers: {
            accesstoken: localStorage.getItem('accesstoken')
          }
        })
        .then(({data}) => {
          if(data.access) {
            $(`.ui.basic.modal.${this.questionId}`)
              .modal('show')
            ;
            console.log('error')
          } else {
            this.votes.push(data)
          }
        })
        .catch(err => {
          $(`.ui.basic.modal.${this.questionId}`)
            .modal('show')
        })
      } else {
        this.$http.delete(`/voteQuestions/${this.votes[index]._id}`, {
          headers: {
            accesstoken: localStorage.getItem('accesstoken')
          }
        })
        .then(response => {
          this.votes.splice(index, 1)
        })
        .catch(error => console.log(error))
      }
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
