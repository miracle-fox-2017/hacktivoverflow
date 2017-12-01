<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <h3 class="card-header">{{ questionDetail.title }}</h3>
          <div class="card-body">
            <p class="card-text">{{ questionDetail.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  props: ['id'],
  methods: {
    ...mapActions([
      'getAnswers',
      'getQuestion'
    ])
  },
  computed: {
    ...mapState([
      'answers',
      'questionDetail'
    ])
  },
  created () {
    this.getQuestion(this.id)
    this.getAnswers(this.id)
  }
}
</script>

<style scoped>
.whitespace {
  margin-bottom: 16px
}
</style>
