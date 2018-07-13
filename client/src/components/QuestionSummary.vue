<template>
<div class="ui feed">
  <div class="event">
    <div class="label">
      <img src="../assets/img/user.svg">
    </div>
    <div class="content">
      <div class="summary" style="font-size: 12px;">
        <a v-if="question.userId._id == myId">You</a>
        <a v-else>{{question.userId.first_name}} {{question.userId.last_name}}</a> posted a question
        <div class="date">
          
        </div>
      </div>
      <div class="extra text">
        <router-link :to="`/questions/${question._id}`"><h3>{{question.title}}</h3></router-link>
        <p>{{question.question.substring(0, 200)}}. . .</p>
      </div>
      <VoteQuestion :questionId="question._id"/>
      <CommentsQuestion :questionId="question._id"/>
    </div>
  </div>
  <div class="ui divider"></div>
</div>
</template>

<script>
import CommentsQuestion from '@/components/CommentsQuestion'
import VoteQuestion from '@/components/VoteQuestion'
export default {
  data () {
    return {
      myId: localStorage.getItem('userId')
    }
  },
  components: {
    VoteQuestion,
    CommentsQuestion
  },
  props: ['question']
}
</script>

<style>

</style>
