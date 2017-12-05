<template>
  <div class="modal fade" id="addComment" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Comment here</h4>
      </div>
      <div class="modal-body">
        <textarea class="form-control" rows="5" placeholder="your comments here... " v-model="comment"></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" v-on:click="post" data-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      comment: ''
    }
  },
  methods: {
    post () {
      this.postComment({
        token: localStorage.getItem('token'),
        comment: this.comment,
        questions: this.$route.params.id
      })
      this.comment = ''      
    },
    ...mapActions ([
      'postComment'
    ])
  }

}
</script>

<style>

</style>
