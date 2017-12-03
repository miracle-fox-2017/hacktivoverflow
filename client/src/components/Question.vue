<template lang="html">
  <div class="well wll-sm">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4>
          <router-link :to="{ path: '/question/' + question._id }">{{ question.title }}</router-link>
          <span class="right-fix pull-right "><button class="btn btn-success btn-sm"type="button" name="button"><i class="fa fa-thumbs-up" aria-hidden="true"></i></button></span>
          <span class="right-fix pull-right"><button class="btn btn-primary btn-sm"type="button" name="button"><i class="fa fa-thumbs-down" aria-hidden="true"></i></button></span>
        </h4>
        <p>By: {{ question.userId }}</p>
        <span>Vote: XX</span>
      </div>
      <div class="panel-body panel-question">
        <p class="question">{{ question.question }}</p>
      </div>
      <div v-for="answer in answers" class="panel-body">
        <span class="right-fix pull-right "><button class="btn btn-success btn-sm"type="button" name="button"><i class="fa fa-thumbs-up" aria-hidden="true"></i></button></span>
        <span class="right-fix pull-right"><button class="btn btn-primary btn-sm"type="button" name="button"><i class="fa fa-thumbs-down" aria-hidden="true"></i></button></span>
        <p class="answer">{{ answer.answer }}</p>
        <p>By: {{ answer.userId }}</p>
        <span>Vote: XX</span>
      </div>
    </div>
    <button type="button" class="btn btn-success" name="button" data-toggle="modal" data-target="#answer">Answer</button>
    <!-- Modal -->
    <div id="answer" class="modal fade" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Answer</h4>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="sendAnswer" class="form-horizontal">
              <fieldset>
                <div class="form-group">
                  <label for="image" class="col-lg-2 control-label">Image Url</label>
                  <div class="col-lg-10">
                    <input v-model="image" class="form-control" id="image" placeholder="http://image.url/this_is_jpg.jpg" type="text">
                  </div>
                </div>
                <div class="form-group">
                  <label for="answer" class="col-lg-2 control-label">Your Answer</label>
                  <div class="col-lg-10">
                    <textarea v-model="answer" class="form-control" rows="3" id="answer"></textarea>
                  </div>
                </div>
                <div class="modal-footer">
                  <div class="form-group">
                    <div class="col-lg-10 col-lg-offset-2">
                      <button type="reset" class="btn btn-default" data-dismiss="modal">Cancel</button>
                      <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: function () {
    return {
      image: '',
      answer: ''
    }
  },
  watch: {
    '$route' (to, from) {
      this.getQuestion(this.$route.params.id)
      this.getAnswer(this.$route.params.id)
    }
  },
  computed: {
    ...mapState([
      'question',
      'answers'
    ])
  },
  methods: {
    ...mapActions([
      'getQuestion',
      'getAnswer',
      'postAnswer'
    ]),
    sendAnswer: function () {
      let newAnswer = {
        questionId: this.$route.params.id,
        image: this.image,
        answer: this.answer
      }
      this.postAnswer(newAnswer)
      // eslint-disable-next-line
      $('#answer').modal('hide')
      this.image = ''
      this.answer = ''
    }
  },
  created: function () {
    this.getQuestion(this.$route.params.id)
    this.getAnswer(this.$route.params.id)
  }
}
</script>

<style lang="css" scoped>
.right-fix {
  margin-left: 1px;
  margin-top: -2px;
}
.panel-question {
  border-bottom: 1px solid lightgray;
}
.answer, .question {
  color: black;
}
</style>
