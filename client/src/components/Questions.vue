<template lang="html">
  <div class="well wll-sm">
    <h3>Question List</h3>
    <div v-for="question in questions" class="panel panel-default">
      <div class="panel-heading">
        <router-link :to="{ path: '/question/' + question._id }">
          <h4>{{ question.title }}</h4>
        </router-link>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-3 col-sm-3">
            <p>Vote: {{ question.upVote.length - question.downVote.length }}</p>
          </div>
          <div class="col-md-9 col-sm-9">
            <p>By: {{ question.name }}</p>
            <p>On: {{ question.createdAt | formatDate }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'questions',
      'initLoad'
    ])
  },
  methods: {
    ...mapActions([
      'getQuestions',
      'changeInitLoad'
    ])
  },
  created: function () {
    if (this.initLoad) {
      this.getQuestions()
      this.changeInitLoad(false)
    }
  },
  mounted: function () {
    // this.getQuestions()
  }
}
</script>

<style lang="css">
</style>
