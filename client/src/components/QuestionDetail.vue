<template>
  <div>
    <b-aside :is-show="editQuestion" title="Edit your Questions" :show-footer="false" placement="right" :backdrop="false" @close="editQuestion=false">
      <form @submit.prevent="updateQuestions">
      <label class="label">Title</label>
        <p class="control">
          <input class="input" type="text" v-model="formEdit.title">
        </p>
        <label class="label">Question</label>
        <p class="control">
          <textarea class="textarea" v-model="formEdit.body"></textarea>
        </p>
        <p>
          <code><strong>The Code</strong> <em>still</em> everything</code>
        </p>
         <br/>
        <button class="button is-warning">Edit Question</button>
      </form>
    </b-aside>
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
              <!-- APA{{question.like}}
              IDMU : {{ login.user_id }} -->
              <span>
                <!-- {{ liked }}        -->
                <h5>
                  <a v-if="!liked" @click.prevent="likeQuestion">
                    <span class="icon is-small">
                      <i class="fa fa-thumbs-o-up"></i>
                    </span>
                  </a>
                  <a v-else @click.prevent="unlikeQuestion">
                    <span class="icon is-small">
                      <i class="fa fa-thumbs-o-down"></i>
                    </span>
                  </a> 
                  <a @click.prevent="setFocus">
                    <span class="icon is-small">
                      <i class="fa fa-reply"></i>
                    </span>
                  </a> · 3 hrs
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
                  <strong>id user{{ answer.user_id }}</strong>
                  <br>
                    {{ answer.body }}
                  <br>
                  APA{{answer.like}}
                  IDMU : {{ login.user_id }}
                  <small>
                    <a v-if="likedAnswer" @click="likeAnswer">Like</a>
                    <a v-else @click="unlikeAnswer">Unlike</a>
                    · 3 hrs
                  </small>
                </p>
              </div>
            </div>
            <!-- ID COMMENT -->
            <!-- <div class="media-right">
              <span v-if="question.user_id._id == login.user_id || question.user_id._id == is_user">
                  <a >
                    <span class="icon is-small">
                      <i class="fa fa-edit"></i>
                    </span>
                  </a>
                  <a >
                    <span class="icon is-small">
                      <i class="fa fa-trash-o"></i>
                    </span>
                  </a>
              </span>
            </div> -->
          </article>
        </div>
      </div>
      <!-- id QUESTIONS -->

      <div class="media-right" v-if="question.user_id">
        <span v-if="question.user_id._id == login.user_id || question.user_id._id == is_user">
            <a @click.prevent="editWriteQuestion">
              <span class="icon is-small">
                <i class="fa fa-edit"></i>
              </span>
            </a>
            <a @click.prevent="deleteQuestions">
              <span class="icon is-small">
                <i class="fa fa-trash-o"></i>
              </span>
            </a>
        </span>
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
      like: true,
      editQuestion : false,
      formEdit: {
        body: '',
        title: ''
      }
    }
  },
  computed: {
    ...mapState([
      'question',
      'login'
    ]),
    liked: function () {
      // return this.question.like;
      let idx = this.question.like.findIndex(liker => liker === this.login.user_id || liker === this.is_user )
      console.log('idx ', idx)
      if(idx == -1) {
        return false
      } else {
        return true
      }
    },
    likedAnswer: (dataAnswer) => {
      // console.log('INI DATA ANSWER', dataAnswer)
      return true
      // let idx = this.question.answers_id.like.findIndex(liker => liker === this.login.user_id || this.is_user)
      // console.log('idx ', idx)
      // if(idx == -1) {
      //   return false
      // } else {
      //   return true
      // }
    }
  },
  methods: {
    ...mapActions([
      'detailQuestion',
      'updateQuestion',
      'deleteQuestion',
      'createAnswer',
      'setLike',
      'setUnlike',
      'setLikeAnswer',
      'setUnlikeAnswer'
    ]),
    deleteQuestions () {
      this.deleteQuestion(this.question._id)
      this.$router.push('/')
    },
    updateQuestions () {
      this.updateQuestion({
        ...this.formEdit,
        id: this.question._id
      })
      this.editQuestion = false
      this.formEdit.body = '',
      this.formEdit.title = ''
    },
    editWriteQuestion () {
      let token = localStorage.getItem('token')
      if (token) {
        this.editQuestion = true
        this.formEdit.body = this.question.body
        this.formEdit.title = this.question.title
      } else {
        alert('You Must Login for Ask')
      }
    },
    likeQuestion () {
      console.log('LIKE QUES', this.id)
      let loginCheck = localStorage.getItem('token')
      if(!loginCheck) {
        alert('You must be Login to Like this Question')
      } else {
        this.setLike(this.id)
        // console.log(this.liked)
      }
    },
    unlikeQuestion () {
      console.log('UNLIKE QUES')
      let loginCheck = localStorage.getItem('token')
      if(!loginCheck) {
        alert('You must be Login to Unlike this Question')
      } else {
        this.setUnlike(this.id)
        // console.log(this.liked)
      }
    },
    likeAnswer () {
      console.log('LIKE ANS')
      let loginCheck = localStorage.getItem('token')
      if(!loginCheck) {
        alert('You must be Login to Like this Answer')
      } else {
        this.setLikeAnswer(this.id)
        // console.log(this.liked)
      }
    },
    unlikeAnswer () {
      console.log('UNLIKE ANS')
      let loginCheck = localStorage.getItem('token')
      if(!loginCheck) {
        alert('You must be Login to Unlike this Answer')
      } else {
        this.setUnlikeAnswer(this.id)
        // console.log(this.liked)
      }
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
    // this.liked()
    let parsing = localStorage.getItem('user_id')
    if (parsing) {
      this.is_user = parsing
    }
  },
  watch: {
    id () {
      this.detailQuestion(this.id)
    }
  }
}
</script>

<style>

</style>
