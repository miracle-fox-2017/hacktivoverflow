<template lang="html">
  <div class="col-md-9">
    <div class="postQuestion">
      <form @submit.prevent="postNewQuestion(formPost)">
        <div class="form-group">
          <label for="exampleInputEmail1">Input Title</label>
          <input type="text" class="form-control" id="inputTitle" placeholder="Post Title" v-model="formPost.title">
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Input Content</label>
          <textarea class="form-control" rows="5" id="inputContent" v-model="formPost.content"></textarea>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'PostQuestion',
  data () {
    return {
      formPost: {
        title: '',
        content: '',
        userPost: ''
      }
    }
  },
  computed: {
    loginCredentials () {
      return this.$store.state.loginCredentials
    }
  },
  created () {
    this.formPost.userPost = this.loginCredentials.id
  },
  methods: {
    ...mapActions(
      [
        'postNewQuestion'
      ]
    )
  }
}
</script>

<style lang="css">
</style>
