<template>
<div>
  <div class="whitespace"></div>
  <div class="card">
    <div class="card-body">
      <div class="form-group">
        <label for="question title">Title</label>
        <input type="text" v-model="title">
      </div>
      <div class="form-group">
        <label for="question body">Question</label>
        <textarea class="form-control" rows="3" v-model="body"></textarea>
      </div>
    </div>
    <div class="card-footer">
      <button type="button" class="btn btn-outline-info" @click="sendQuestion">Send</button>
      <button type="button" class="btn btn-outline-warning" @click="hideMe">Cancel</button>
      <div class="whitespace"></div>
      <p class="text-warning" v-if="loginWarning == true">You need to be logged in to post a question</p>
      <p class="text-warning" v-if="noMsgErr == true">There is nothing to post</p>
    </div>
    </div>
    <div class="whitespace"></div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      title: '',
      body: '',
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
      'askQuestion'
    ]),
    hideMe () {
      this.$emit('hideme')
    },
    sendQuestion () {
      if (this.userDetails == null) {
        this.loginWarning = true
      } else if (this.reply !== '') {
        this.askQuestion({
          title: this.title,
          body: this.body
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