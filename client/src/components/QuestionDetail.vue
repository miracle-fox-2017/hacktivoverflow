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
            <small>{{question.createdAt}}</small><br/>
            <div class="stars">
              <form action="">
                <input class="star star-5" id="star-5" type="radio" name="star"/>
                <label class="star star-5" for="star-5"></label>
                <input class="star star-4" id="star-4" type="radio" name="star"/>
                <label class="star star-4" for="star-4"></label>
                <input class="star star-3" id="star-3" type="radio" name="star"/>
                <label class="star star-3" for="star-3"></label>
                <input class="star star-2" id="star-2" type="radio" name="star"/>
                <label class="star star-2" for="star-2"></label>
                <input class="star star-1" id="star-1" type="radio" name="star"/>
                <label class="star star-1" for="star-1"></label>
              </form>
            </div>
            <h3 class="subtitle">{{ question.title }}</h3>
              {{ question.body }}
              <br>
              <br/>
              <!-- APA{{question.like}}
              IDMU : {{ login.user_id }} -->
              <span v-if="is_user">
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
                  </a>
                </h5>
              </span>
          </p>
        </div>
        <div v-for="answer in question.answers_id" :key="answer._id">
          <Answer :answer="answer"/>
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
    <article v-if="is_user" class="media">
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
    <article v-else class="media">
      <div class="media-content">
        <div class="field">
          <p class="control merah">
            You must be login to comment this question
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Answer from '@/components/Answer'
export default {
  props: ['id'],
  name: 'questionDetail',
  components: {
    Answer
  },
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
    }
  },
  methods: {
    ...mapActions([
      'detailQuestion',
      'updateQuestion',
      'deleteQuestion',
      'createAnswer',
      'setLike',
      'setUnlike'
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
    },
    createdFake () {
      // this.liked()
      let parsing = localStorage.getItem('user_id')
      if (parsing) {
        this.is_user = parsing
      }
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
    },
    is_user () {
      this.createdFake()
    }
  }
}
</script>

<style scoped>
  .merah {
    color: red;
  }
</style>
