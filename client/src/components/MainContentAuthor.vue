<template>
  <div>
    <div v-for="(question, index) in questions" :key="index" >
    <!-- <router-link style="text-decoration: none;" :to="'/questions/' + question._id + '/' + question.title.split(' ').join('-')"> -->
    <div class="card mb-3" style="text-align:left;">
      <div class="card border-light mb-3" style="">
        <div class="card-body">
          <h4 class="card-title">{{ question.title }}</h4>
          <p class="card-text">{{ sortDesc(question.question_content) }} ...</p>
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
        </div>
      </div>
      <div style="margin-top: -3%; float:right; text-align: right;" class="card-footer">
        <p style="font-size:12px; float:left; text-align:left;">{{ timeAgo(question.create_at) }}</p>
        <router-link style="text-decoration: none;" :to="'/questions/' + question._id + '/' + url(question.title)">
          <button style="margin-right:1%;" type="button" class="btn btn-outline-dark btn-sm">View</button>
        </router-link>
        <button data-toggle="modal" data-target="#updateModal" style="margin-right:1%;" type="button" class="btn btn-outline-dark btn-sm">Update</button>
        <button @click="deleteQuestion(question._id)" type="button" class="btn btn-outline-dark btn-sm">Delete</button>
      </div>
    </div>
    <!-- </router-link> -->
  </div>
  <!-- START MODAL UPDATE -->
    <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update Question</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-ModalCreateQuestion modal-body">
          <form>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Title:</label>
              <input type="text" class="form-control" id="recipient-name" required=""/>
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Content:</label>
              <textarea class="form-control" id="message-text" required=""/></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" data-dismiss="modal" class="btn btn-dark">Update Question</button>
        </div>
      </div>
    </div>
  </div>
  <!-- END MODAL UPDATE -->
 </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'MainContentAuthor',
  computed: {
    ...mapState([
      'questions'
    ])
  },
  methods: {
    ...mapActions([
      'getQuestionByAuthor',
      'deleteQuestion'
    ]),
    timeAgo (date) {
      return date
    },
    url (title) {
      let url = title.split(' ')
      let clean = []
      let urlClean = []
      url.forEach(url => {
        let cleanUrl = url.replace(/\W/g, '')
        clean.push(cleanUrl)
      })
      clean.forEach(cleaner => {
        if (cleaner.length !== 0) {
          urlClean.push(cleaner)
        }
      })
      return urlClean.join('-')
    },
    sortDesc (sort) {
      if (sort.length > 100) {
        return sort.split(' ').splice(0, 18).join(' ')
      } else {
        return sort
      }
    }
  }
}
</script>

<style>

</style>
