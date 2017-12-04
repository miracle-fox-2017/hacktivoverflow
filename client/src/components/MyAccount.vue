<template>
  <div class="ui container segment">
    <div class="ui header">
      <h2>Your Questions List</h2>
    </div>
    <div class="row">
      <table class="ui celled padded table">
        <thead>
          <th>Title</th>
          <th>Votes</th>
          <th>Description</th>
          <th>Options</th>
        </tr></thead>
        <tbody>
          <tr v-for="question in questions" key="question._id">
            <td class="single line">
              {{question.title}}
            </td>
            <td class="two wide">
              <div class="ui star rating" data-rating="3" data-max-rating="3"></div>
            </td>
            <td>{{question.question.substring(0, 100)}}</td>
            <td class="three wide center aligned">
              <button class="ui positive button" @click="modalEdit(question._id)">Edit</button>
              <button class="ui negative button" @click="deleteQuestions(question._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="padding: 30px !important;" class="ui small modal edit">
      <i class="close icon"></i>
      <div class="ui container">
        <EditQuestion :questionId="idQuestionTemp"/>
      </div>
    </div>
  </div>
</template>

<script>
import EditQuestion from '@/components/EditQuestion'
export default {
  components: {
    EditQuestion
  },
  data () {
    return {
      questions: [],
      idQuestionTemp: ''
    }
  },
  methods: {
    deleteQuestions (id) {
      this.$http.delete(`/questions/${id}`, {
        headers: {
          accesstoken: localStorage.getItem('accesstoken')
        }
      })
      .then(({data}) => {
        let index = this.questions.map(q => { return q._id }).indexOf(id)
        this.questions.splice(index, 1)
      })
      .catch(err => console.log(err))
    },
    modalEdit (id) {
      /* eslint-disable */
      this.idQuestionTemp = id
      $('.small.modal.edit')
        .modal('show')
      ;
    }
  },
  created () {
    this.$http.get('/questions/myquestions', {
      headers: {
        accesstoken: localStorage.getItem('accesstoken')
      }
    })
    .then(({data}) => {
      this.questions = data
    })
    .catch(err => console.log(err))
  }

}
</script>

<style>

</style>
