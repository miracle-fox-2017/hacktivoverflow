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
              APA{{question.like.length}}
              <span v-if="question.like.length <= 0">
                <h5>
                  <a @click.prevent="likeQuestion">Like</a>
                · <a @click.prevent="setFocus">Reply</a> · 3 hrs
                </h5>
              </span>
              <span v-else v-for="like in question.like" :key="like._id">
                <br/>id: yang LIKE {{like}} 
                <br/>id: USER{{is_user}}
                <h5>
                  <a v-if="like !== is_user" @click.prevent="likeQuestion">Like</a>
                  <a v-else @click.prevent="unlikeQuestion">Unlike</a> 
                · <a  @click.prevent="setFocus">Reply</a> · 3 hrs
                </h5>
              </span>
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
                  <small>
                    <a v-if="like" @click="likeAnswer">Like</a>
                    <a v-else @click="unlikeAnswer">Unlike</a>
                    · 3 hrs
                  </small>
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
      is_user: '',
      body: '',
      like: true
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
      'createAnswer',
      'setLike',
      'setUnlike'
    ]),
    likeQuestion () {
      console.log('LIKE QUES', this.id)
      let loginCheck = localStorage.getItem('token')
      if(!loginCheck) {
        alert('You must be Login to Like this Question')
      } else {
        this.setLike(this.id)
      }
    },
    unlikeQuestion () {
      console.log('UNLIKE QUES')
      let loginCheck = localStorage.getItem('token')
      if(!loginCheck) {
        alert('You must be Login to Unlike this Question')
      } else {
        this.setUnlike(this.id)
      }
    },
    likeAnswer () {
      console.log('LIKE ANS')
    },
    unlikeAnswer () {
      console.log('UNLIKE ANS')
    },
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
  },
  created () {
    let parsing = localStorage.getItem('user_id')
    if (parsing) {
      this.is_user = parsing
    }
  }
}
</script>

<style>

</style>
