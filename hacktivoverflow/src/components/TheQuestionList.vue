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
      <a href="#" v-on:click="like(question._id)"><span class="glyphicon glyphicon-heart">like({{question.likes.length}})</span></a> 
      <router-link :to="{name: 'TheQuestionSummary', params: {id: question._id}}"><span class="glyphicon glyphicon-comment">{{comments.length}}comment</span></router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState} from 'vuex'

export default {
  props: ['question'],
  methods: {
    getById () {
      this.getByIdQuestion(this.question._id)
    },
    ...mapActions([
      'getByIdQuestion',
      'likeQuestion'
    ]),
    ...mapState([
      'comments'
    ]),
    like (id) {
      this.likeQuestion({
        idUser: localStorage.getItem('id'),
        id: id
      })
    }
  },
  computed: {
    ...mapState([
      'questions'
    ])
  }
  
}
</script>

<style>

</style>
