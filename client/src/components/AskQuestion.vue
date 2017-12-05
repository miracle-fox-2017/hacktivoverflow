<template>
  <div class="content">
    <div class="ui form fluid">
      <div class="field">
        <label>Title</label>
        <input name="title" placeholder="What your problem? Be specific" type="text" v-model="formQuestion.title">
      </div>
      <div class="field">
        <label>Question Detail</label>
        <textarea name="question" placeholder="Describe more specific about your problem..." v-model="formQuestion.question"></textarea>
      </div>
      <div class="field">
        <div class="actions">
          <button class="ui ok primary button" @click="postNewQuestion(formQuestion)">Submit</button>
          <!-- <button class="ui button" @click="clearForm">Clear Form</button> -->
          <button class="ui deny button">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  computed: {
    ...mapState([
      'formQuestion'
    ])
  },
  methods: {
    ...mapActions([
      'postNewQuestion'
    ])
  }
}
</script>

<style>

</style>
