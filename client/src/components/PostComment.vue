<template lang="html">
  <div class="postComment">
    <h4>Post new Comment</h4>
    <form @submit.prevent="postNewComment(formComment)">
      <div class="form-group">
        <label for="inputPost">Input Title</label>
        <input class="form-control" type="text" placeholder="Default input" v-model="formComment.title">
      </div>
      <div class="form-group">
        <label for="inputPost">Input Content</label>
        <textarea class="form-control" type="text" placeholder="Input content" v-model="formComment.content"></textarea>
      </div>
      <div class="form-group">
        <button class="btn btn-success" type="submit" name="button">POST</button>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'PostComment',
  props: ['postId'],
  data () {
    return {
      formComment: {
        title: '',
        content: '',
        question: ''
      }
    }
  },
  computed: {
    idChange () {
      this.formComment.question = this.postId
      return this.formComment.question
    }
  },
  created () {
    console.log(this.idChange)
  },
  methods: {
    ...mapActions(
      [
        'postNewComment'
      ]
    )
  }
}
</script>

<style lang="css" scoped>
</style>
