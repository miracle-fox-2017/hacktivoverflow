<template>
  <div class="ui celled grid">
    <article class="row" v-for="(question, index) in questions" :key="index">
      <div class="one center aligned wide column">
        0
        <i class="thumbs outline up icon"></i>
      </div>
      <div class="one center aligned wide column">
        0
        <i class="comments outline icon"></i>
      </div>
      <div class="nine wide column">
        <router-link :to="{ name: 'questions', params: { id: question._id } }">{{ question.title }}</router-link>
      </div>
      <div class="three wide column none-shadow" v-for="(tag, index) in question.tags" :key="index">
        <a class="ui small red horizontal label">{{ tag }}</a>
      </div>
      <div class="two wide column">{{ question.questioner.name }}</div>
    </article>
  </div>
</template>

<script>
  import { mapActions } from 'vuex' //, mapGetters
  export default {
    name: 'HomeSummaries',
    props: ['questions'],
    // computed: {
    //
    // },
    methods: {
      ...mapActions([
        'getQuestionsVotersByQuestionId'
      ])
    },
    created: function () {
      this.getQuestionsVotersByQuestionId()
    }
  }
</script>

<style scoped></style>
