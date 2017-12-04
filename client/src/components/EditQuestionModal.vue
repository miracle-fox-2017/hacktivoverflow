<template>
  <div id="editQuestion" class="ui modal">
  <i class="close icon"></i>
  <div class="header">
    Edit Question
  </div>
  <div class="content">
    <div class="ui form">
      <div class="two fields">
        <div class="field">
          <label>Title</label>
          <input type="text" name="title" placeholder="title" v-model="userQuestion.title">
        </div>
        <div class="field">
          <label>Tags</label>
          <input type="text" name="tags" placeholder="tags" v-model="userQuestion.tags">
        </div>
      </div>
      <div class="field">
        <label>Description</label>
        <textarea name="desc" rows="10" v-model="userQuestion.content"></textarea>
      </div>
    </div>
  </div>
  <div class="actions">
    <div class="ui black deny button">
      Cancel
    </div>
    <div class="ui positive button" @click="submitNewQuestion">
      Submit
    </div>
  </div>
</div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'EditQuestionModal',
    props: ['userQuestion'],
    data: function () {
      return {
        newUserQuestion: {
          title: this.userQuestion.title,
          content: this.userQuestion.content,
          tags: this.userQuestion.tags
        }
      }
    },
    methods: {
      ...mapActions(['editQuestion']),
      submitNewQuestion () {
        this.editQuestion(this.newUserQuestion)
      }
    }
  }
</script>

<style scoped>
</style>
