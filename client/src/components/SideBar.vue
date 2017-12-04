<template>
  <div> 
    <b-aside :is-show="writeQuestion" title="Write your Questions" :show-footer="false" placement="right" :backdrop="false" @close="writeQuestion=false">
      <form @submit.prevent="createQuestion(ask)">
      <label class="label">Title</label>
        <p class="control">
          <input class="input" v-model="ask.title" type="text" placeholder="Title">
        </p>
        <label class="label">Question</label>
        <p class="control">
          <textarea class="textarea" v-model="ask.body" placeholder="Ask something usefull"></textarea>
        </p>
        <p>
          <code><strong>The Code</strong> just everything</code>
        </p>
         <br/>
        <button  class="button is-warning"> Asking</button>
      </form>
    </b-aside>
    <a @click="toggle3" class="button is-warning">Ask Question</a>
    <hr/><br/>
    <div class="box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p >
              
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                <span class="icon is-small"><i class="fa fa-reply"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-small"><i class="fa fa-retweet"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-small"><i class="fa fa-heart"></i></span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </div>
    <timeline>
      <timeline-item class="style='text-align:left;'" date="100 minutes ago" type="primary" v-for="question in questions" :key="question._id">
        <router-link :to="'/question/detail/'+question._id">{{ question.title }}</router-link>
      </timeline-item>
    </timeline>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'SideBar',
  props: ['id'],
  data () {
    return {
      user_id : '',
      isShow3 : false,
      showModal: false,
      writeQuestion: false,
      ask: {
        body: '',
        title: '',
        user_id: ''
      }
    }
  },
  computed: {
    ...mapState([
      'questions',
      
    ])
  },
  methods: {
    toggle3 () {
      let token = localStorage.getItem('token')
      if (token) {
        this.writeQuestion = true
      } else {
        alert('You Must Login for Ask')
      }
    },
    ...mapActions([
      'createQuestion',
      'allQuestions',
      'detailQuestion'
    ])
  },
  created () {
    this.allQuestions()
    this.ask.user_id = localStorage.getItem('user_id')
  },
  watch: {
    login () {
      let parsing = JSON.parse(localStorage.getItem('token'))
      localStorage.setItem('username', parsing.name)
      localStorage.setItem('user_id', parsing.user_id)
      this.user_id = localStorage.getItem('user_id')
    },
    id (newId) {
      this.detailQuestion(this.id)
    }
  }

}
</script>
<style>
.timeline-item .timeline-item-main {
    margin-left: 24px;
    padding-bottom: 16px;
    text-align: initial!important;
}
</style>
