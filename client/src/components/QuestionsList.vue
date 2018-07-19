<template>
  <table class="table">
    <thead>
      <tr>
        <th><abbr title="Position">Like</abbr></th>
        <th>Title</th>
        <th><abbr title="Played">Answer</abbr></th>
        <th>Rating</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th><abbr title="Position">Like</abbr></th>
        <th>Title</th>
        <th><abbr title="Played">Answer</abbr></th>
        <th>Rating</th>
      </tr>
    </tfoot>
    <tbody v-for="question in questions" :key="question._id">
      <tr>
        <th><span class="icon is-small"><i class="fa fa-heart"></i>{{question.like.length}}</span></th>
        <td><router-link :to="'/question/detail/'+question._id">{{question.title}} </router-link><br/>
          <span v-if="question.user_id">
            <small>by : {{ question.user_id.name }}</small>
          </span>
        </td>
        <td class="tengah"><i>{{ question.answers_id.length }}</i><br>answer</td>
        <td>
          <div class="stars">
            <form action="">
              <input class="star star-5" id="star-5" type="radio" name="star"/>
              <label class="star star-5" for="star-5"></label>
              <input class="star star-4" id="star-4" type="radio" name="star"/>
              <label class="star star-4" for="star-4"></label>
              <input class="star star-3" id="star-3" type="radio" name="star"/>
              <label class="star star-3" for="star-3"></label>
              <input class="star star-2" id="star-2" type="radio" name="star"/>
              <label class="star star-2" for="star-2"></label>
              <input class="star star-1" id="star-1" type="radio" name="star"/>
              <label class="star star-1" for="star-1"></label>
            </form>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'QuestionsList',
  computed: {
    ...mapState([
      'questions'
    ])
  },
  methods: {
    ...mapActions([
      'allQuestions'
    ])
  },
  created () {
    this.allQuestions()
  }
}
</script>

<style> 

</style>
