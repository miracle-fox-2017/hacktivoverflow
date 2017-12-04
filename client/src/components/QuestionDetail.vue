<template>
  <div>
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <div  v-if="question.user_id">
              <strong>{{ question.user_id.name }}</strong> <small>@{{question.user_id.username}}</small> <small>31m</small>
            </div>
            <h3 class="subtitle">{{ question.title }}</h3>
              {{ question.body }}<br><br/>
            <h5>
              <a v-if="like">Like</a>
              <a v-else>Unlike</a>
             · <a  @click.prevent="setFocus">Reply</a> · 3 hrs</h5>
          </p>
        </div>

        <div v-for="answer in question.answers_id" :key="answer._id">
          <article class="media">
            <figure class="media-left">
              <p class="image is-48x48">
                <img src="https://bulma.io/images/placeholders/96x96.png">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ answer.user_id }}</strong>
                  <br>
                    {{ answer.body }}
                  <br>
                  <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </article>
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png">
        </p>
      </figure>
      <div class="media-content">
        <div class="field">
          <p class="control">
            <textarea v-model="body" ref="reply" class="textarea" placeholder="Add a comment..."></textarea>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button @click="comment" class="button">Post comment</button>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: ['id'],
  name: 'questionDetail',
  data () {
    return {
      body: '',
      like: false
    }
  },
  computed: {
    ...mapState([
      'question'
    ])
  },
  methods: {
    ...mapActions([
      'detailQuestion',
      'createAnswer'
    ]),
    comment () {
      // console.log(this.question, this.id)
      let loginCheck = localStorage.getItem('token')
      if(!loginCheck) {
        alert('You must be Login to Comment this Question')
      } else {
        this.createAnswer({
          answer: this.body,
          question_id: this.id
        })
        this.body = ''
      }
    },
    setFocus () {
      // console.log('MASUK')
      this.$refs.reply.focus();
    }
  },
  mounted () {
    // console.log(this.id)
    this.detailQuestion(this.id)
  }
}
</script>

<style>

</style>
