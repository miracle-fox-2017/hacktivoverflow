<template>
  <div>
    <form @submit.prevent="postQuestionToDb(formQuest), clearField()" style="text-align:left;">
      <label class="label">Title</label>
      <div class="control">
        <input type="text" v-model="formQuest.title" placeholder="Textarea"></input>
      </div>
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
          <button class="button is-link" >Submit</button>
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
        tag: '',
        title: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'postQuestionToDb'
    ]),
    clearField: function () {
      this.formQuest = {}
    }
  }
}
</script>

<style>

</style>
