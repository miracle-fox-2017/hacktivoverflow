<template>
  <div class="reply">
    <div class="card">
      <div class="card-body">
        <textarea class="form-control" id="exampleTextarea" rows="3" v-model="reply"></textarea>
      </div>
      <div class="card-footer">
        <button type="button" class="btn btn-outline-info" @click="sendReply">Send</button>
        <button type="button" class="btn btn-outline-warning" @click="hideMe">Cancel</button>
        <div class="whitespace"></div>
        <p class="text-warning" v-if="loginWarning == true">You need to be logged in to reply to question</p>
        <p class="text-warning" v-if="noMsgErr == true">There is nothing to post</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: ['questionId'],
  data () {
    return {
      reply: '',
      loginWarning: false,
      noMsgErr: false
    }
  },
  computed: {
    ...mapState([
      'userDetails'
    ])
  },
  methods: {
    ...mapActions([
      'replyQuestion'
    ]),
    hideMe () {
      this.$emit('hideme')
    },
    sendReply () {
      console.log(this.userDetails == null)
      if (this.userDetails == null) {
        console.log('error tidak ada id')
        this.loginWarning = true
      } else if (this.reply !== '') {
        this.replyQuestion({
          questionId: this.questionId,
          answer: this.reply
        })
        this.hideMe()
      } else {
        this.noMsgErr = true
      }
    }
  }
}
</script>

<style>
.whitespace {
  margin: 32px;
}
</style>
