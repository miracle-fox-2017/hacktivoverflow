<template>
  <div class="list-group">
    <p class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <h3 class="mb-1">{{ question.title }}</h3>
        <small class="text-muted">3 days ago</small>
      </div>
      <p class="mb-1">{{ question.content }}</p>
      <small class="text-muted">by {{ question.users.name }}</small>
    </p>
    <div>
      <a href="#"><span class="glyphicon glyphicon-heart-empty">like</span></a> 
      <router-link :to="{name: 'TheQuestionSummary', params: {id: question._id}}"><span class="glyphicon glyphicon-comment">comment</span></router-link>
    </div>
  </div>
</template>

<script>
import { mapActions} from 'vuex'

export default {
  props: ['question'],
  methods: {
    getById () {
      this.getByIdQuestion(this.question._id)
    },
    ...mapActions([
      'getByIdQuestion'
    ])
  },
  
}
</script>

<style>

</style>
