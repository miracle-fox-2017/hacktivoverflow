<template>
  <div class="panel panel-primary">
    <div class="panel-heading">
      <h3 class="panel-title" v-text="question.title"></h3>
    </div>
    <div class="panel-body" v-text="question.text"></div>
    <div class="panel-footer">
      <button class="btn btn-primary" @click="detailQuestion">Detail</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['question'],
  methods: {
    detailQuestion () {
      this.$router.push({name: 'DetailQuestion', params: {questionID: this.question._id}})
    }
  }
}
</script>

<style>

</style>
