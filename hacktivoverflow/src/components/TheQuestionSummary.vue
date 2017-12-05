<template>
  <div class="container">
    <div class="col-md-10">
      <div class="panel panel-success" v-for="question in question">
        <div class="panel-heading " >
          <h1 class="panel-title">{{question.title}}</h1>
        </div>
        <div class="panel-body">
          {{question.content}}
          <br>
          <small class="text-muted">by {{ question.users.name }}</small>
          <br>
          <button type="button" class="btn btn-info pull-right" data-toggle="modal" data-target="#addComment">comment</button>
        </div>
        <TheAddComment/>
      </div>
    </div>
    <div class="col-md-8">
      <div class="panel panel-success">
        <div class="panel-body">
          tetstststst
          <br>
          <small class="text-muted">oke</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TheAddComment from '@/components/TheAddComment'

export default {
  components: {
    TheAddComment
  },
  methods: {
    ...mapActions([
      'getByIdQuestion'
    ])
  },
  created () {
    this.getByIdQuestion(this.$route.params.id)  
  },
  computed: {
    ...mapState([
      'question'
    ])
  }
}
</script>

<style>

</style>
