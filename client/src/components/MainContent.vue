<template>
 <div>
    <div  v-for="(question, index) in questions" :key="index" >
    <router-link style="text-decoration: none;" :to="'/questions/' + question._id + '/' + question.title.split(' ').join('-')">
    <div class="listQuestion list-group">
      <a href="" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <router-link style="text-decoration: none;" :to="'/questions/' + question._id + '/' + question.title.split(' ').join('-')">
          <h5 style="color: #464a4e;" class="mb-1">{{ question.title }}</h5>
          </router-link>
          <small class="text-muted">{{ timeAgo(question.create_at) }}</small>
        </div>
        <p v-if="question.question_content.length > 50" class="mb-1">{{ question.question_content.split(' ').splice(0, 18).join(' ') }}</p>
        <p v-else class="mb-1">{{ question.question_content }}</p>
        <small class="text-muted">
          <span>
            <i class="fa fa-heart" aria-hidden="true"></i> 150 
          </span> 
          <span style="margin-left:3px;">
            <i class="fa fa-comment" aria-hidden="true"></i> 58 
          </span>
          <span style="margin-left:3px;">
            <i class="fa fa-user" aria-hidden="true"></i> {{ question.author.fullname }} 
          </span>
        </small>
      </a>
    </div>
    </router-link>
  </div>
 </div>
</template>
<script>
export default {
  name: 'MainContent',
  props: ['questions'],
  data () {
    return {
      contentQuestion: ''
    }
  },
  methods: {
    timeAgo (date) {
      return date
    }
  }

}
</script>

<style>
.listQuestion{
  text-align: left;
  margin-bottom: 3%;
}
</style>
