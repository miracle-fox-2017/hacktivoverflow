<template>
  <div class="container">
    <div class="jumbotron">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h3 class="panel-title" v-text="questionData.title">Panel primary</h3>
        </div>
        <div class="panel-body">
          <p v-text="questionData.text"></p>
        </div>
        <div class="panel-footer">
          <button v-if="userStatus === false" class="btn btn-success" @click="debounce">Like</button>
          <button v-if="userStatus === true" class="btn btn-success" @click="debounce">Dislike</button>
          <button class="btn btn-default" data-toggle="modal" data-target="#CommentModal" >Comment</button>
        </div>
        <div class="container">
          <answer-item v-on:updateAnswerById="updateAnswer" v-on:deleteAnswerById="deleteAnswer" v-for="answer in comment" :key="answer._id" :answer="answer"></answer-item>
        </div>
      </div>
    </div>
    <div id="CommentModal" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Your Comment</h4>
          </div>
          <div class="modal-body">
            <div>
              <textarea class="form-control" rows="3" id="textArea" v-model="answer.text"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addComment" data-dismiss="modal">Add Comment</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnswerItem from './AnswerItem'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

export default {
  props: ['questionID'],
  data () {
    return {
      answer: {
        question_id: '',
        text: ''
      },
      comment: [],
      userStatus: '',
      userID: '',
      questionData: {
        _id: '',
        title: '',
        text: '',
        category: '',
        userID: '',
        voterID: []
      }
    }
  },
  components: {
    AnswerItem
  },
  methods: {
    addComment () {
      this.$http.post('/api/answer', {
        text: this.answer.text,
        questionID: this.questionID
      }, {
        headers: {
          token: localStorage.getItem('tokenOverflow')
        }
      })
      .then(({data}) => {
        this.comment.push(data)
      })
      .catch(err => console.error(err))
    },
    getComment () {
      this.$http.get(`/api/answer/${this.questionID}`, {
        headers: {
          token: localStorage.getItem('tokenOverflow')
        }
      })
      .then(({data}) => {
        this.comment = data
      })
      .catch(err => console.error(err))
    },
    deleteAnswer (answerID) {
      let deletedIdx = this.comment.findIndex(element => {
        return element._id === answerID
      })

      this.comment.splice(deletedIdx, 1)
    },
    updateAnswer (payload) {
      let updatedIdx = this.comment.findIndex(element => {
        return element._id === payload.answerID
      })

      this.comment.splice(updatedIdx, 1, payload.newAnswer)
    },
    likeQuestion () {
      if (this.userStatus === true) {
        this.userStatus = false
      } else {
        this.userStatus = true
      }
      let decoded = jwt.decode(localStorage.getItem('tokenOverflow'))
      this.$http.put(`/api/questions/${this.questionID}`, {
        voter_id: decoded.userID,
        statusLike: this.userStatus
      }, {
        headers: {
          token: localStorage.getItem('tokenOverflow')
        }
      })
      .then(({data}) => {
        if (this.userStatus) {
          this.questionData.voterID.push(decoded.userID)
        } else {
          let deletedIdx = this.questionData.voterID.findIndex(element => {
            return element._id === decoded.userID
          })

          this.questionData.voterID.splice(deletedIdx, 1)
        }
      })
      .catch(err => console.error(err))
    },
    getDetailQuestion () {
      this.$http.get(`/api/questions/${this.questionID}`, {
        headers: {
          token: localStorage.getItem('tokenOverflow')
        }
      })
      .then(({data}) => {
        this.questionData._id = data.questionData._id
        this.questionData.title = data.questionData.title
        this.questionData.text = data.questionData.text
        this.questionData.category = data.questionData.category
        this.questionData.userID = data.questionData.user_id
        this.questionData.voterID = data.questionData.voter_id
        this.userStatus = data.userStatus
      })
      .catch(err => console.error(err))
    },
    debounce: _.debounce(function () {
      this.likeQuestion()
    }, 500)
  },
  computed: {
    getDetail () {
      return this.$store.state.detailQuestion
    }
  },
  created () {
    this.getDetailQuestion()
    this.getComment()
    let decoded = jwt.decode(localStorage.getItem('tokenOverflow'))
    this.userID = decoded.userID
  }
}
</script>

<style>

</style>
