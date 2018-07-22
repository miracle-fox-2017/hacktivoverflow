<template>
  <div id="addComment" class="ui modal">
  <i class="close icon"></i>
  <div class="header">
    Comment
  </div>
  <div class="content">
    <div class="ui form">
      <div class="field">
        <textarea name="desc" rows="10" v-model="newComment"></textarea>
      </div>
    </div>
  </div>
  <div class="actions">
    <div class="ui black deny button">
      Cancel
    </div>
    <div class="ui positive button" @click="submitComment">
      Submit
    </div>
  </div>
</div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'AddCommentModal',
    props: ['id'],
    data: function () {
      return {
        newComment: null
      }
    },
    methods: {
      ...mapActions(['addAnswer']),
      submitComment () {
        console.log('--> halo masuk method ga?')
        this.addAnswer({
          id: this.id,
          content: this.newComment
        })
      }
    }
  }
</script>

<style scoped>
</style>
