<template>
  <div>
    <div v-for="(question, index) in questions" :key="index" >
      <router-link style="text-decoration: none;" :to="'/questions/' + question._id + '/' + url(question.title)">
      <div class="listQuestion list-group">
        <a href="" class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <router-link style="text-decoration: none;" :to="'/questions/' + question._id + '/' + url(question.title)">
            <h5 style="color: #464a4e;" class="mb-1">{{ question.title }}</h5>
            </router-link>
            <small class="text-muted">{{ timeAgo(question.create_at) }}</small>
          </div>
          <p class="mb-1"> {{ sortDesc(question.question_content) }} ...</p>
          <small class="text-muted">
            <span>
              <i class="fa fa-heart" aria-hidden="true"></i> 150 
            </span> 
            <span style="margin-left:3px;">
              <i class="fa fa-comment" aria-hidden="true"></i> {{ lengtComment(question._id) }} 
            </span>
            <span style="margin-left:3px;">
              <i class="fa fa-user" aria-hidden="true"></i> {{ question.author.fullname }} 
            </span>
          </small>
        </a>
      </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'MainContent',
  props: ['questions'],
  data () {
    return {
      contentQuestion: ''
    }
  },
  computed: {
    ...mapState([
      'answers'
    ])
  },
  methods: {
    ...mapActions([
      'findAnswerByQuestion'
    ]),
    lengtComment (questID) {
      // this.findAnswerByQuestion(questID)
      // console.log(this.answers)
      // this.questions.forEach(question => {
      //   // console.log(question._id)
      //   this.findAnswerByQuestion(question._id)
      // })
    },
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
  },
  mounted () {
    // this.questions.forEach(question => {
      // console.log(question._id)
    //   this.findAnswerByQuestion(question._id)
    // })
    // console.log(this.answers.length)
  }
}
</script>

<style>
.listQuestion{
  text-align: left;
  margin-bottom: 3%;
}
</style>
