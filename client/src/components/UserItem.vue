<template>
  <div class="panel panel-primary">
    <div class="panel-heading">
      <h3 class="panel-title" v-text="question.title"></h3>
    </div>
    <div class="panel-body">
      <p v-text="question.text"></p>
    </div>
    <div class="panel-footer">
      <button class="btn btn-success" @click="updateQuestion" data-toggle="modal" data-target="#UpdatedModal">Update</button>
      <button class="btn btn-danger" @click="deleteQuestion">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['question'],
  methods: {
    deleteQuestion () {
      let konfirmasi = confirm('Yakin tong?!')

      if (konfirmasi) {
        this.$store.dispatch('deleteUserQuestion', this.question._id)
      }
    },
    updateQuestion () {
      this.$store.commit('setUpdateUserQuestion', this.question._id)
    }
  }
}
</script>

<style>

</style>
