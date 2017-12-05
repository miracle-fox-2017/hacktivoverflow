<template>
  <div>
    <section class="comments">
      <article v-for="(answer, index) in answers" :key="index" class="comment">
        <a class="comment-img">
          <img src="http://static.bleacherreport.net/images/redesign/avatars/default-user-icon-profile.png" alt="" width="50" height="50" />
          <button v-if="user" @click="updateQuestionModal(answer)" data-toggle="modal" data-target="#updateAnswerModal" style="position:absolute; margin-top:7%; font-size:10px;" type="button" class="btn btn-outline-dark btn-sm">Update</button>
          <button v-if="user" @click="deleteAnswer(answer._id)" style="margin-top:13%; font-size:11px;" type="button" class="btn btn-outline-dark btn-sm">Delete</button>
        </a>
        <div class="comment-body">
          <div class="text">
            <p>{{ answer.answer_content }}</p>
          </div>
          <p class="attribution">by <span style="font-weight:bold;">{{ answerBy }}</span> at {{ answer.create_at }}</p>
        </div>
      </article>
    </section>
    <!-- START MODAL UPDATE -->
    <div class="modal fade" id="updateAnswerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Answer</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-ModalCreateQuestion modal-body">
            <form>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Answer:</label>
                <textarea style="height:270px;" class="form-control" id="message-text" v-model="answerUpdate.answer_content" required=""/></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="updateAnswer(answerUpdate)" type="button" data-dismiss="modal" class="btn btn-dark">Update Answer</button>
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
  name: 'DetailQuestionAnswer',
  props: ['answersprops'],
  data: function () {
    return {
      answerBy: '',
      load: this.answers,
      user: localStorage.getItem('user_Id'),
      owner: '',
      answerUpdate: {
        id: '',
        answer_content: ''
      }
    }
  },
  computed: {
    ...mapState([
      'questions',
      'answers'
    ])
  },
  methods: {
    ...mapActions([
      'deleteAnswer',
      'getAllQuestionByAuthor',
      'updateNewAnswer'
    ]),
    updateQuestionModal (answer) {
      this.answerUpdate._id = answer._id
      this.answerUpdate.answer_content = answer.answer_content
    },
    updateAnswer (answerUpdate) {
      // console.log('??????', answerUpdate)
      let storage = localStorage.getItem('token')
      if (storage) {
        this.updateNewAnswer(answerUpdate)
      }
    }
  },
  created () {
    // cek owner
    // this.getAllQuestionByAuthor(this.user)
    // if (this.questions[0].author === this.user) {
    //   this.owner = true
    // }

    this.answers.forEach(answer => {
      this.answerBy = answer
    })
    return this.load
  }
}
</script>

<style scoped>
article,
aside,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block
}

a {
  color: #6d84b4;
  text-decoration: none;
}

body {
  width: 100%;
  height: 100%;
  margin: 20px auto;
  font: 16px/1.4 Arial, sans-serif;
  background: #3b5998;
}

section {
  background: #f8f9fa9c;
  padding-right: 45px;
  padding-top: 20px;
  margin: auto;
}

.comment {
  overflow: hidden;
  padding: 0 0 1em;
  border-bottom: 1px solid #ddd;
  margin: 0 0 1em;
  margin-left: 20px;
  *zoom: 1;
  width: 100%;
}

.comment-img {
  float: left;
  margin-right: 33px;
  border-radius: 5px;
  overflow: hidden;
}

.comment-img img {
  display: block
}

.comment-body {
  overflow: hidden
}

.comment .text {
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  background: #fff;
}

.comment .text p:last-child {
  margin: 0
}

.comment .attribution {
  margin: 0.5em 0 0;
  font-size: 14px;
  color: #666;
}


/* Decoration */

.comments,
.comment {
  position: relative
}

.comments:before,
.comment:before,
.comment .text:before {
  content: "";
  position: absolute;
  top: 0;
  left: 65px;
}

.comments:before {
  width: 3px;
  left: 82px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.1);
}

.comment:before {
  width: 9px;
  height: 9px;
  border: 3px solid #fff;
  border-radius: 100px;
  margin: 16px 0 0 -6px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(0, 0, 0, 0.1);
  background: #ccc;
}

.comment:hover:before {
  background: #3b5998
}

.comment .text:before {
  top: 18px;
  left: 78px;
  width: 9px;
  height: 9px;
  border-width: 0 0 1px 1px;
  border-style: solid;
  border-color: #e5e5e5;
  background: #fff;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
}
</style>
