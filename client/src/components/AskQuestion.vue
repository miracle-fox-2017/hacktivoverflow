<template>
  <div>
    <form @submit.prevent="postQuestionToDb(formQuest)">
      <div class="field">
        <label class="label">Message</label>
        <div class="control">
          <textarea class="textarea" v-model="formQuest.message" placeholder="Textarea"></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Tag</label>
        <div class="control">
          <input type="text" v-model="formQuest.tag" placeholder="Textarea"></input>
        </div>
      </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">Submit</button>
      </div>
      <div class="control">
        <button class="button is-text">Cancel</button>
      </div>
    </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AskQuestion',
  data () {
    return {
      formQuest: {
        message: '',
        tag: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'postQuestionToDb'
    ])
  }
}
</script>

<style>

</style>
