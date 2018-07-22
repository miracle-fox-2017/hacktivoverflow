<template lang="html">
  <div class="">
    <div class="col-md-1">
      <button class="btn btn-primary my-2 my-sm-0" type="submit" data-toggle="modal" data-target="#addModal" v-if="access_token">Add Question</button>
    </div>
    <br>
    <div class="list-group" v-for="question in questionwithoption">
      <a class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1"><router-link :to="`/question/${question._id}`">{{question.title}}</router-link></h5>
          <small class="text-muted">{{question.createdAt | formatdate}}</small>
        </div>
        <p class="mb-1">{{question.content.substring(0, 100)}} ...</p>
        <small class="text-muted">by: {{question.author.name}}</small>
        <br>
        <small class="text-muted"><i class="fa fa-thumbs-up" aria-hidden="true" v-on:click="vote(question._id)"> {{question.voters.length}}</i></small>
        <small v-if="question.removable"><i class="fa fa-trash-o" aria-hidden="true" v-on:click="deletequestion(question._id)"></i></small>
        <small v-if="question.editable"><i class="fa fa-pencil-square-o" aria-hidden="true" v-on:click="showedit(question)" data-toggle="modal" data-target="#editModal"></i></small>
      </a>
    </div>

    <!-- modal -->
    <div class="modal fade" id="addModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">new question</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <fieldset>
                <div class="form-group">
                  <label for="titleinput">Title</label>
                  <input type="text" class="form-control" id="titleinput" aria-describedby="emailHelp" placeholder="Masukkan title question" v-model="newquestion.title">
                  <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                  <label for="descriptioninput">Content</label>
                  <textarea class="form-control" id="descriptioninput" rows="3" placeholder="content question" v-model="newquestion.content"></textarea>
                </div>
              </fieldset>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" data-dismiss="modal" v-on:click="tambahquestion">Create</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal editquestion -->
    <div class="modal fade" id="editModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">new question</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <fieldset>
                <div class="form-group">
                  <label for="titleinput">Title</label>
                  <input type="text" class="form-control" id="titleinput" aria-describedby="emailHelp" placeholder="Masukkan title question" v-model="editquestion.title">
                  <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                  <label for="descriptioninput">Content</label>
                  <textarea class="form-control" id="descriptioninput" rows="3" placeholder="content question" v-model="editquestion.content"></textarea>
                </div>
              </fieldset>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-info" data-dismiss="modal" v-on:click="updatequetion(editquestion)">Create</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'QuestionCard',
  data () {
    return {
      newquestion: {
        title: '',
        content: ''
      },
      access_token: '',
      editquestion: {
        title: '',
        content: '',
        id: ''
      }
    }
  },

  computed: {
    ...mapState([
      'questions'
    ]),

    questionwithoption () {
      return this.$store.getters.questionwithoption
    }
  },

  methods: {
    ...mapActions([
      'getAllQuestion',
      'postquestion',
      'vote',
      'deletequestion',
      'updatequetion'
    ]),

    tambahquestion () {
      this.postquestion(this.newquestion)
      this.newquestion.title = ''
      this.newquestion.content = ''
    },

    getToken: function () {
      this.access_token = localStorage.getItem('access_token')
    },

    showedit (question) {
      this.editquestion.id = question._id
      this.editquestion.title = question.title
      this.editquestion.content = question.content
    }

  },

  created () {
    this.getAllQuestion()
    this.getToken()
  }
}
</script>

<style scoped>
i {
  font-size: 16px;
  cursor: pointer;
}

.list-group > a.disabled {
  color: #999999;
}
.list-group > a.disabled:hover,
.list-group > a.disabled:focus {
  color: #999999;
  text-decoration: none;
  background-color: transparent;
  cursor: not-allowed;
}

</style>
