<template>
  <div class="reply">
    <div class="card">
      <div class="card-body">
        <textarea class="form-control" id="exampleTextarea" rows="3" v-model="reply"></textarea>
      </div>
      <div class="card-footer">
        <button type="button" class="btn btn-outline-info" @click="sendReply">Send</button>
        <button type="button" class="btn btn-outline-warning" @click="hideMe">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props: ['questionId'],
  data () {
    return {
      reply: ''
    }
  },
  methods: {
    ...mapActions([
      'replyQuestion'
    ]),
    hideMe () {
      this.$emit('hideme')
    },
    sendReply () {
      this.replyQuestion({
        questionId: this.questionId,
        answer: this.reply
      })
      this.hideMe()
    }
  }
}
</script>

<style>

</style>
