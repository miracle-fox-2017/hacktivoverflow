<template>
  <div class="container">
    <div class="modalAddQuestion text-left" v-show="token != undefined">
        <button type="button" class="btn btn-info" data-toggle="modal" data-target="#addQuestion">Add Question</button>        
    </div>
   
    <!-- Modal -->
    <div class="modal fade" id="addQuestion" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">

          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Add Question </h4>
          </div>

          <div class="modal-body">
            <form class="form-horizontal">

              <div class="form-group">
                <label class="control-label col-sm-2" for="title">Title </label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="newQuestion.title" placeholder="Enter title">
                </div>
              </div>

              <div class="form-group">
                <label class="control-label col-sm-2" for="tags">Question </label>
                <div class="col-sm-8">
                  <textarea type="text" v-model="newQuestion.question" class="form-control" placeholder="Enter Question" />
                </div>
              </div>
              <div class="form-group">
                 <button type="button" class="btn btn-default" data-dismiss="modal" @click="createNewDataQuestion(newQuestion)">Submit</button>
              </div>
            </form>
          </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AddQuestion',
  data: function () {
    return {
      newQuestion: {
        title: '',
        question: ''
      },
      token: ''
    }
  },
  methods: {
    ...mapActions([
      'createNewDataQuestion'
    ])
  },
  created () {
    this.token = localStorage.getItem('token')
  }
}
</script>

<style scoped>
  textarea{
    height: 100px;
  }
  .modalAddQuestion{
    margin: 10px 0;
  }
</style>