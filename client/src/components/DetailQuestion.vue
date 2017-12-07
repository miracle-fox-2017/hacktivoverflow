<template>
  <div>
    <div v-if="editOn">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title" v-if="question">
          {{ question.userId.username }}
        </p>
        <hr>
        <p>
          {{ question.title }}
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header> 
        <div class="card-content">
          <div class="content">
            {{ question.question }}
            <a href="#">#{{ question.tag }}</a> 
            <br>
            <time>{{ question.createdAt }}</time>
          </div>
        </div>
        <footer class="card-footer" v-if="isOwner">  
           <a class="card-footer-item"><span @click="edit">Edit</span></a>
           <div v-if="isLiked">
             <a class="card-footer-item" @click="like(question, question.userId)">
            <i class="fa fa-thumbs-up" aria-hidden="true"></i></a>
           </div>
          <div v-else>
             <a class="card-footer-item" @click="dislike(question, question.userId)">
            <i class="fa fa-thumbs-down" aria-hidden="true"></i></a>
           </div>
          <div>
            <p>{{ likesLen(question.like) }} </p>
          </div>
        </footer>
        <footer class="card-footer" v-else>  
          <div v-if="isLiked">
            <a @click="like(question, question.userId)">
          <i class="fa fa-thumbs-up" aria-hidden="true"></i></a>
          </div>
          <div v-else>
            <a @click="dislike(question, question.userId)">
            <i class="fa fa-thumbs-dowm" aria-hidden="true"></i></a>
          </div>
          <div>
            <p>{{ likesLen(question.like) }}</p>
          </div>
        </footer>    
      </div>     
    </div>
    <div v-else>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header> 
        <div class="card-content">
          <div class="content" style="text-align: left">
            <label>Title</label>
            <input type="text" v-model="formEdit.title">
            <br>
            <br>
            <label>Your question</label>
            <textarea class="textarea" v-model="formEdit.question" placeholder="Textarea"></textarea>
            <br>
            <label>Tag</label>
            <input type="text" v-model="formEdit.tag" placeholder="Textarea"></input>
            <br>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item"><span @click="sendForm(formEdit)">Submit</span></a>
          <a class="card-footer-item"><span @click="removeOne(formEdit.id)">Delete</span></a>
          <a class="card-footer-item"><span @click="cancel">Cancel</span></a>
        </footer>  
      </div>     
    </div>
    <div>
      <Answer :id="formEdit.id"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Answer from './Answer'
export default {
  name: 'DetailQuestion',
  components: {Answer},
  data () {
    return {
      editOn: true,
      formEdit: {
        question: '',
        tag: '',
        id: '',
        title: ''
      },
      isLiked: true
    }
  },
  computed: {
    ...mapState([
      'question',
      'isOwner'
    ])
  },
  methods: {
    ...mapActions([
      'editQuestionById',
      'removeById',
      'liked',
      'disliked'
    ]),
    edit: function () {
      this.editOn = false
      this.formEdit.question = this.question.question
      this.formEdit.tag = this.question.tag
      this.formEdit.id = this.question._id
      this.formEdit.title = this.question.title
      console.log(this.formEdit)
    },
    sendForm: function (data) {
      this.editQuestionById(data)
      this.changeRoute()
    },
    removeOne: function (id) {
      console.log()
      this.removeById(id)
      this.formEdit.question = ''
      this.formEdit.tag = ''
      this.formEdit.title = ''
      this.changeRoute()
    },
    cancel: function () {
      this.changeRoute()
    },
    changeRoute: function () {
      this.$router.push({ path: '/hacktivoverflow' })
    },
    like: function (questionId, userId) {
      this.isLiked = false
      let obj = {
        userId: userId._id,
        questionId: questionId._id
      }
      console.log(questionId, 'like question' + obj)
      this.liked(obj)
    },
    dislike: function (questionId, userId) {
      this.isLiked = true
      let obj = {
        userId: userId._id,
        id: questionId._id
      }
      console.log('dislike')
      this.disliked(obj)
    },
    likesLen: function (value) {
      return value.length
    }
  }
}
</script>

<style>

</style>
