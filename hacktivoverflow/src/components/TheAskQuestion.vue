<template>
<div>
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Ask Questions</h4>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label>Title</label>
              <input type="text" class="form-control"  aria-describedby="emailHelp" placeholder="Enter title question"  v-model="title">
              <br>
              <label>Question</label>
              <textarea class="form-control" rows="5" v-model="content"></textarea>
              <small class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" v-on:click="post" data-dismiss="modal">Save changes</button>
        </div>
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
      title: '',
      content: ''
    }
  },
  methods: {
    post () {
      this.postQuestion({
          title: this.title, 
          content: this.content, 
          token: localStorage.getItem('token')
      })
      this.title = ''
      this.content = ''
    },
    ...mapActions ([
      'postQuestion'
    ])
  }

}
</script>

<style>

</style>
