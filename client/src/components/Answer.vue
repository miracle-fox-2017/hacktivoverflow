<template>
  <article class="media" v-if="answer">
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
          APA{{answer.like}}
          IDMU : {{ login.user_id }}
          <small v-if="is_user ">
            <a v-if="!liked" @click="likeAnswer(answer._id)">Like</a>
            <a v-else @click="unlikeAnswer(answer._id)">Unlike</a>
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
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Answer',
  props: ['answer'],
  computed: {
    ...mapState([
      'login'
    ]),
    liked: function(){
      console.log(this.answer.like)
      if(this.answer.like !== 0) {
        let idx = this.answer.like.findIndex(liker => liker === this.login.user_id || this.is_user)
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
      'createAnswer',
      'setLikeAnswer',
      'setUnlikeAnswer'
    ]),
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
}
</script>

<style>

</style>
