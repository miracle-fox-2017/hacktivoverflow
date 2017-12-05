<template>
  <div class="container-fluid text-center">
    <div class="row content">

      <div class="col-sm-7 text-left">
        <div class="well" v-for="(question, index) in questions" :key="index">
            <router-link :to="`/${question._id}`"><h3>{{question.title}}</h3></router-link>
              <p>{{question.question}}</p>
  
              <h6>Posted by : {{question.author.username}}</h6>
        </div>
      </div>

      

    </div>
  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'ListQuestion',
  data: function () {
    return {
      token: ''
    }
  },
  computed: {
    ...mapState([
      'questions'
    ])
  },
  methods: {
    ...mapActions([
      'getAllDataQuestions'
    ])
  },
  created () {
    this.getAllDataQuestions()
    this.token = localStorage.getItem('token')
  }
}
</script>

<style scoped>

</style>