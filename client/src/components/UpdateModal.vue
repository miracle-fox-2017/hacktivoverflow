<template>
  <div class="modal" id="UpdatedModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">Update Question Data</h4>
        </div>
        <div class="modal-body">
          <div class="form-horizontal">
            <fieldset>
              <div class="form-group">
                <label for="inputEmail" class="col-lg-2 control-label">Title</label>
                <div class="col-lg-10">
                  <input class="form-control" type="text" v-model="title">
                </div>
              </div>
              <div class="form-group">
                <label for="textArea" class="col-lg-2 control-label">Question</label>
                <div class="col-lg-10">
                  <textarea class="form-control" rows="3" id="textArea" v-model="text"></textarea>
                  <span class="help-block">Nanya yang jelas ye tong.</span>
                </div>
              </div>
              <div class="form-group">
                <label for="inputCategoryl" class="col-lg-2 control-label">Category</label>
                <div class="col-lg-10">
                  <input class="form-control" v-model="category" type="text">
                </div>
              </div>
              <div class="form-group">
                <div class="col-lg-10 col-lg-offset-2">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button class="btn btn-primary" @click="updateQuestion">Save</button>
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
      title: '',
      text: '',
      category: '',
      _id: ''
    }
  },
  methods: {
    updateQuestion () {
      this.$store.dispatch('updateQuestion', {
        title: this.title,
        text: this.text,
        category: this.category,
        _id: this._id
      })

      alert('Update Success!!')
      this.title = ''
      this.text = ''
      this.category = ''
      this._id = ''
    }
  },
  computed: {
    updatedQuestion () {
      this.title = this.$store.state.updatedQuestion.title
      this.text = this.$store.state.updatedQuestion.text
      this.category = this.$store.state.updatedQuestion.category
      this._id = this.$store.state.updatedQuestion._id
    }
  },
  watch: {
    updatedQuestion () {}
  }
}
</script>

<style>

</style>
