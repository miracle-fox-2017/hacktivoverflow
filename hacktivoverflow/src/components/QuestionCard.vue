<template>
<div>
  <div class="whitespace"></div>
  <div class="card">
    <div class="card-header">
      <span class="float-right">
        <button v-if="allowEdit" type="button" class="btn btn-outline-danger" @click="deleteSubmit">x</button>
      </span>
      <input v-if="editMode" type="text" v-model="question.title">
      <h3 v-else>{{ question.title }}</h3>
    </div>
  <div class="card-body">
    <textarea v-if="editMode" rows="3" v-model="question.body"> </textarea>
    <p v-else class="card-text">{{ question.body.substr(0,50) }}</p>
    <p v-if="isEmpty" class="text-danger">Field cannot be empty</p>
  </div>
  <div class="card-footer">
    <span class="float-right">
      <footer class="blockquote-footer">{{ question.email }}</footer>
    </span>
    <span v-if="editMode">
      <button type="button" class="btn btn-outline-info" @click="editSubmit">Send</button>
    </span>
    <span v-else>
      <button v-if="editMode" class="btn btn-primary">
        Save
      </button>
      <router-link v-else :to="{
        name: 'QuestionDetail',
        params: {
          id: question.id
        }
      }">
        <button class="btn btn-primary">See more</button>
    </router-link>
    </span>
    <span v-if="allowEdit">
      <button v-if="editMode" type="button" class="btn btn-outline-warning">Cancel</button>
      <button v-else type="button" class="btn btn-outline-warning" @click="editMode = true">Edit</button>
    </span>
  </div>
  </div>
  <div class="whitespace"></div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: ['question'],
  data () {
    return {
      isEmpty: false,
      allowEdit: false,
      editMode: false
    }
  },
  methods: {
    ...mapActions([
      'editQuestion',
      'deleteQuestion'
    ]),
    editCheck () {
      if (this.userDetails !== null) {
        if (this.userDetails.email === this.question.email) {
          this.allowEdit = true
        }
      }
    },
    editSubmit () {
      if (this.question.title === '' || this.question.body === '') {
        this.isEmpty = true
      } else {
        this.editQuestion({
          questionId: this.question.id,
          title: this.question.title,
          body: this.question.body
        })
        this.editMode = false
      }
    },
    deleteSubmit () {
      this.deleteQuestion(this.question.id)
    }
  },
  computed: {
    ...mapState([
      'userDetails'
    ])
  },
  mounted () {
    this.editCheck()
  }
}
</script>

<style scoped>
.whitespace {
  margin: 8px
}
</style>
