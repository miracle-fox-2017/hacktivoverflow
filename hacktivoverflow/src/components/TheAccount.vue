<template>
  <div class="container">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">My Account</h3>
      </div>
      <div v-for="question in questionOfUser" >
        <ul class="list-group" >
          <li class="list-group-item d-flex justify-content-between align-items-center">
          <h4>{{ question.title }}</h4>
          <p>{{ question.content }}</p>
          <button type="button" class="btn btn-success" data-toggle="modal" data-target="#editModal" v-on:click="get(question)">
            edit
          </button>
          <button type="button" class="btn btn-success" v-on:click="destroy(question._id)">delete</button>
        </li>
        </ul>
      </div>
    </div>
    <TheQuestionEdit :question="question"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TheQuestionEdit from '@/components/TheQuestionEdit'

export default {
  data () {
    return {
      question: ''
    }
  },
  components: {
    TheQuestionEdit
  },
  methods: {
    ...mapActions([
      'getQuestionByUser',
      'deleteQuestion'
    ]),
    get (obj) {
      this.question = obj
    },
    destroy (id) {
      this.deleteQuestion({
        id: id,
        idUser: localStorage.getItem('id'),
        token: localStorage.getItem('token')
      })
    }
  },
  created () {
    this.getQuestionByUser({id: localStorage.getItem('id')})
  },
  computed: {
    ...mapState([
      'questionOfUser'
    ])
  }

}
</script>

<style>

</style>
