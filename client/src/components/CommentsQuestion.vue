<template>
  <div class="meta">
    <a class="like">
      <i class="comments outline icon"></i> {{answers.length}} Comments
    </a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      answers: []
    }
  },
  props: ['questionId'],
  created () {
    this.$http.get(`/answers/${this.questionId}`)
    .then(({data}) => {
      console.log(data)
      this.answers = data
    })
    .catch(err => console.log(err))
  }
}
</script>

<style>

</style>
