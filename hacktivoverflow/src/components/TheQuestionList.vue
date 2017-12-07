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
    <div v-show="token">
      <button type="button" class="btn btn-success" v-on:click="like(question._id)"><span class="glyphicon glyphicon-heart">like({{question.likes.length}})</span></button> 
      <router-link :to="{name: 'TheQuestionSummary', params: {id: question._id}}">
        <button type="button" class="btn btn-success" >
          <span class="glyphicon glyphicon-comment">{{comments.length}}comment</span>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      token: localStorage.getItem('token')
    }
  },
  props: ['question'],
  methods: {
    getById () {
      this.getByIdQuestion(this.question._id)
    },
    ...mapActions([
      'getByIdQuestion',
      'likeQuestion'
    ]),
    like (id) {
      console.log(this.token)
      this.likeQuestion({
        idUser: localStorage.getItem('id'),
        id: id
      })
    }
  },
  computed: {
    ...mapState([
      'questions',
      'comments'
    ])
  }
}
</script>
