<template>
  <div>
    <article class="media"  v-if="answer && !statusEdit">
    <figure class="media-left">
      <p class="image is-48x48">
        <img src="https://bulma.io/images/placeholders/96x96.png">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong v-if="answer.user_id">{{ answer.user_id.name }}</strong>
          {{answer.createdAt}}
          <br>
            {{ answer.body }}
          <br>
          <!-- APA{{answer.like}}
          IDMU : {{ login.user_id }} -->
          <small v-if="is_user ">
            <a v-if="!liked" @click="likeAnswer(answer._id)">
               <span class="icon is-small">
                <i class="fa fa-thumbs-o-up"></i>
              </span>
            </a>
            <a v-else @click="unlikeAnswer(answer._id)">
              <span class="icon is-small">
                <i class="fa fa-thumbs-o-down"></i>
              </span>
            </a>
          </small>
        </p>
      </div>
    </div>
    <!-- ID COMMENT -->
    <div class="media-right">
      <span v-if="answer.user_id._id == login.user_id || answer.user_id._id == is_user">
          <a @click.prevent="editAnswer(answer._id)">
            <span class="icon is-small">
              <i class="fa fa-edit"></i>
            </span>
          </a>
          <a @click.prevent="deleteAnswer(answer._id)">
            <span class="icon is-small">
              <i class="fa fa-trash-o"></i>
            </span>
          </a>
      </span>
    </div>
  </article>
  <article v-else class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png">
        </p>
      </figure>
      <div class="media-content">
        <div class="field">
          <p class="control">
            <textarea class="textarea" v-model="edit.body"></textarea>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button @click="saveeditAnswer" class="button">Edit comment</button>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Answer',
  data () {
    return {
      statusEdit : false,
      edit: {
        body: ''
      }
    }
  },
  props: ['answer', 'id'],
  computed: {
    ...mapState([
      'login'
    ]),
    liked: function(){
      console.log('MASUK LIKE')
      if(this.answer.like.length && this.answer.like.length !== 0) {
        console.log('NGECEK GA')
        let idx = this.answer.like.findIndex(liker => liker === this.login.user_id || liker === this.is_user)
        console.log('idx ', idx)
        if(idx == -1) {
          return false
        } else {
          return true
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'detailQuestion',
      'createAnswer',
      'updateAnswer',
      'setLikeAnswer',
      'setUnlikeAnswer',
      'deleteAnswer'
    ]),
    editAnswer () {
      this.edit.body = this.answer.body
      this.statusEdit = true
    },
    saveeditAnswer () {
      this.updateAnswer({
        ...this.edit,
        id: this.answer._id
      })
      this.edit.body = ''
      this.statusEdit = false
    },
    likeAnswer (id) {
      console.log('LIKE ANS')
      let loginCheck = localStorage.getItem('token')
      if(!loginCheck) {
        alert('You must be Login to Like this Answer')
      } else {
        this.setLikeAnswer(id)
        // console.log(this.liked)
      }
    },
    unlikeAnswer (id) {
      console.log('UNLIKE ANS')
      let loginCheck = localStorage.getItem('token')
      if(!loginCheck) {
        alert('You must be Login to Unlike this Answer')
      } else {
        this.setUnlikeAnswer(id)
        // console.log(this.liked)
      }
    },
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
    answer () {
      this.detailQuestion(this.id)
    }
  }
}
</script>

<style>

</style>
