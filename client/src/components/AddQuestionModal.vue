<template>
  <div id="askQuestion" class="ui modal">
  <i class="close icon"></i>
  <div class="header">
    Ask Question
  </div>
  <div class="content">
    <div class="ui form">
      <div class="two fields">
        <div class="field">
          <label>Title</label>
          <input type="text" name="title" placeholder="title" v-model="newQuestion.title">
        </div>
        <div class="field">
          <label>Tags</label>
          <input type="text" name="tags" placeholder="tags" v-model="newQuestion.tags">
        </div>
      </div>
      <div class="field">
        <label>Description</label>
        <textarea name="desc" rows="10" v-model="newQuestion.content"></textarea>
      </div>
    </div>
  </div>
  <div class="actions">
    <div class="ui black deny button">
      Cancel
    </div>
    <div class="ui positive button" @click="submitQuestion">
      Submit
    </div>
  </div>
</div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'AddQuestionModal',
    data: function () {
      return {
        newQuestion: {
          title: null,
          content: null,
          tags: null
        }
      }
    },
    methods: {
      ...mapActions(['addQuestion']),
      submitQuestion () {
        this.addQuestion(this.newQuestion)
        // this.clearForm()
        // $('#askQuestion').modal('hide')
      }
      // ,clearForm () {
      //   this.newQuestion.title = null,
      //   this.newQuestion.content = null,
      //   this.newQuestion.tags = null
      //   console.log(this.newQuestion);
      //   return this.newQuestion
      // }
    }
  }
</script>

<style scoped>
</style>
