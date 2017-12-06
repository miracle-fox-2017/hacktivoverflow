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
  props: ['answerId'],
  data () {
    return {
      errorClass: `ui basic modal ${this.questionId}`,
      votes: []
    }
  },
  methods: {
    voteAnswer () {
      let index = this.votes.map(v => { return v.userId }).indexOf(localStorage.getItem('userId'))
      // eslint-disable-next-line
      if (index == -1) {
        this.$http.post('/voteAnswers', {
          answerId: this.answerId,
          votes: true
        }, {
          headers: {
            accesstoken: localStorage.getItem('accesstoken')
          }
        })
        .then(({data}) => {
          if (data.access) {
            // eslint-disable-next-line
            $(`.ui.basic.modal.${this.questionId}`)
              .modal('show')
            console.log('error')
          } else {
            this.votes.push(data)
          }
        })
        // eslint-disable-next-line
        .catch(err => {
          // eslint-disable-next-line
          $(`.ui.basic.modal.${this.questionId}`)
            .modal('show')
        })
      } else {
        this.$http.delete(`/voteAnswers/${this.votes[index]._id}`, {
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
