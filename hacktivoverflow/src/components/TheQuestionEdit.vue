<template>
  <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Edit Question</h4>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label>Title</label>
              <input type="text" class="form-control" :value="this.question.title">
              <br>
              <label>Question</label>
              <textarea class="form-control" rows="5" v-model="content">{{ this.question.content }}</textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="edit">Edit changes</button>
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
      content: '',
      title: ''
    }
  },
  props: ['question'],
  methods: {
    edit () {
      this.question.content = this.content
      this.editQuestion(this.question)
      location.reload()
    },
    ...mapActions([
      'editQuestion'
    ])
  }
}
</script>

<style>

</style>
