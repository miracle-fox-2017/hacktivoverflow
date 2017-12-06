<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <h3 class="panel-title">Comment By: {{answer.user_id.name}}</h3>
    </div>
    <div class="panel-body">
      <p v-text="answer.text"></p>
    </div>
    <div class="panel-footer">
      <button v-if="statusLike === false" class="btn btn-warning" @click="debounce">Like</button>
      <button v-if="statusLike === true" class="btn btn-warning" @click="debounce">Dislike</button>
      <button v-if="statusUser === true" class="btn btn-danger" @click="deleteAnswer" >Delete</button>
    </div>
    <p>Like count: {{answer.voter_id.length}}</p>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken'
import _ from 'lodash'

export default {
  props: ['answer'],
  data () {
    return {
      statusUser: '',
      statusLike: ''
    }
  },
  methods: {
    //  Hapus Answer Berdasarkan ID Answer
    deleteAnswer () {
      this.$http.delete(`/api/answer/${this.answer._id}`, {
        headers: {
          token: localStorage.getItem('tokenOverflow')
        }
      })
      .then(({data}) => {
        this.$emit('deleteAnswerById', data._id)
      })
      .catch(err => console.error(err))
    },
    likeAnswer () {
      if (this.statusLike === true) {
        this.statusLike = false
      } else {
        this.statusLike = true
      }
      let decoded = jwt.decode(localStorage.getItem('tokenOverflow'))
      this.$http.put(`/api/answer/${this.answer._id}`, {
        voter_id: decoded.userID,
        statusLike: this.statusLike
      }, {
        headers: {
          token: localStorage.getItem('tokenOverflow')
        }
      })
      .then(({data}) => {
        this.$emit('updateAnswerById', {
          newAnswer: data,
          answerID: this.answer._id
        })
      })
      .catch(err => console.error(err))
    },
    debounce: _.debounce(function () {
      this.likeAnswer()
    }, 500)
  },
  mounted () {
    let decoded = jwt.decode(localStorage.getItem('tokenOverflow'))
    if (decoded.userID === this.answer.user_id._id) {
      this.statusUser = true
    }

    let likeIdx = this.answer.voter_id.findIndex(element => {
      return element === decoded.userID
    })

    if (likeIdx === -1) {
      this.statusLike = false
    } else {
      this.statusLike = true
    }
  }
}
</script>
