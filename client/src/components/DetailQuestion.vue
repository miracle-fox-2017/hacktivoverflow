<template>
  <div>
    <div v-if="editOn">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{ question.userId.username }}
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
          <a class="card-footer-item">Delete</a>
        </footer>
        <footer class="card-footer" v-else>  
          <a class="card-footer-item">Comment</a>
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
          <div class="content">
            <label>Your question</label>
            <textarea class="textarea" v-model="formEdit.question" placeholder="Textarea"></textarea><br>
            <label>Tag</label>
            <input type="text" v-model="formEdit.tag" placeholder="Textarea"></input><br>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item"><span @click="sendForm(formEdit)">Submit</span></a>
          <a class="card-footer-item"><span @click="removeOne(formEdit.id)">Delete</span></a>
          <a class="card-footer-item"><span @click="cancel">Cancel</span></a>
        </footer>  
      </div>     
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'DetailQuestion',
  data () {
    return {
      editOn: true,
      formEdit: {
        question: '',
        tag: '',
        id: ''
      }
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
      'removeById'
    ]),
    edit: function () {
      this.editOn = false
      this.formEdit.question = this.question.question
      this.formEdit.tag = this.question.tag
      this.formEdit.id = this.question._id
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
      this.changeRoute()
    },
    cancel: function () {
      this.changeRoute()
    },
    changeRoute: function () {
      this.$router.push({ path: '/hacktivoverflow' })
    }
  }
}
</script>

<style>

</style>
