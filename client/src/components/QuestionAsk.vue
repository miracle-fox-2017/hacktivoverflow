<template lang="html">
  <div class="container">
    <form v-on:submit.prevent="sendQuestion" class="form-horizontal" >
      <fieldset>
        <legend>Ask Question</legend>
        <div class="form-group">
          <label for="title" class="col-lg-2 control-label">Title</label>
          <div class="col-lg-10">
            <input v-model="title" class="form-control" id="title" placeholder="Title" type="text">
          </div>
        </div>
        <div class="form-group">
          <label for="image" class="col-lg-2 control-label">Image Url</label>
          <div class="col-lg-10">
            <input v-model="image" class="form-control" id="image" placeholder="http://image.url/this_is_jpg.jpg" type="text">
          </div>
        </div>
        <div class="form-group">
          <label for="question" class="col-lg-2 control-label">Question explanation</label>
          <div class="col-lg-10">
            <textarea v-model="question" class="form-control" rows="3" id="question"></textarea>
            <span class="help-block">Please ask a clear question.</span>
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-10 col-lg-offset-2">
            <button @click="cancleQuestion" type="reset" class="btn btn-default">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data: function () {
    return {
      title: '',
      image: '',
      question: ''
    }
  },
  computed: {
    ...mapState([
      'questions'
    ])
  },
  methods: {
    ...mapActions([
      'addQuestion',
      'getQuestions'
    ]),
    sendQuestion: function () {
      if (this.title && this.question) {
        if (this.image) {
          let link = this.image
          // eslint-disable-next-line
          let regex = '^https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:jpg|gif|png)$'
          let patt = new RegExp(regex)
          if (patt.test(link)) {
            let obj = {
              title: this.title,
              image: this.image,
              question: this.question
            }
            this.addQuestion(obj)
            this.$router.push('/')
          } else {
            alert('please fill image link correctly')
          }
        } else {
          let obj = {
            title: this.title,
            image: this.image,
            question: this.question
          }
          this.addQuestion(obj)
          this.$router.push('/')
        }
      } else {
        alert('please fill title & question')
      }
    },
    cancleQuestion: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css">
</style>
