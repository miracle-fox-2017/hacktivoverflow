<template>
  <div class="modal" id="AddQModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">Add New Question</h4>
        </div>
        <div class="modal-body">
          <div class="form-horizontal">
            <fieldset>
              <div class="form-group">
                <label for="inputEmail" class="col-lg-2 control-label">Title</label>
                <div class="col-lg-10">
                  <input class="form-control" id="inputEmail" placeholder="Title" type="text" v-model="questionData.title">
                </div>
              </div>
              <div class="form-group">
                <label for="textArea" class="col-lg-2 control-label">Question</label>
                <div class="col-lg-10">
                  <textarea class="form-control" rows="3" id="textArea" v-model="questionData.text"></textarea>
                  <span class="help-block">Nanya yang jelas ye tong.</span>
                </div>
              </div>
              <div class="form-group">
                <label for="inputCategoryl" class="col-lg-2 control-label">Category</label>
                <div class="col-lg-10">
                  <input class="form-control" id="inputCategory" placeholder="Category" type="text" v-model="questionData.category">
                </div>
              </div>
              <div class="form-group">
                <div class="col-lg-10 col-lg-offset-2">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button class="btn btn-primary" @click="addQuestion">Submit</button>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      questionData: {
        title: '',
        text: '',
        category: ''
      }
    }
  },
  methods: {
    addQuestion () {
      this.$store.dispatch('addQuestion', this.questionData)
      alert('Success Post')
      this.questionData.title = ''
      this.questionData.text = ''
      this.questionData.category = ''
    }
  }
}
</script>

<style>

</style>
