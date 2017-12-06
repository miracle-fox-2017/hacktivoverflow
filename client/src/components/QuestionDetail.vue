<template>
  <article class="row">
    <div class="column">
      <div class="ui grid">
        <div class="one wide column center aligned middle aligned" @click="submitVoteQuestion" >
          <i class="header-icon thumbs outline down icon blue" v-if="userStatus"></i>
          <i class="header-icon thumbs outline up icon blue" v-else></i>
          <p>{{ questionsVoters.length }} Vote</p>
        </div>
        <div class="fifteen wide column">
          <h4 class="ui header">{{ questionDetail.title }}</h4>
          <p>{{ questionDetail.content }}</p>
          <!-- <p>Post by: {{ questionDetail.questioner.name }} on {{ questionDetail.createdAt }}</p> -->
        </div>
      </div>

      <div class="ui segments">
        <div class="ui segment" v-for="(answer, index) in answers" :key="index">
          <div class="ui grid">
            <div class="one wide column center aligned">
              0
              <i class="thumbs outline up icon"></i>
            </div>
            <div class="fourteen wide column">
              <p>{{ answer.content }}</p>
              <!-- <p>{{ answer.answerer.name }}</p> -->
            </div>
            <div class="one wide column right aligned" v-if="answer.answerer._id === userId" @click="submitDeleteAnswer(answer)">
              <i class="trash outline icon"></i>
            </div>
          </div>
        </div>
      </div>
      <button class="ui right floated positive button" @click="addCommentModal" v-if="token">Comment</button>
      <AddCommentModal :id="id"/>
    </div>
  </article>
</template>

<script>
  /* global $ */
  import { mapActions, mapGetters } from 'vuex'
  import AddCommentModal from '@/components/AddCommentModal'
  export default {
    name: 'QuestionDetail',
    props: ['id'],
    components: {
      AddCommentModal
    },
    computed: {
      ...mapGetters([
        'questionDetail',
        'answers',
        'questionsVoters',
        'answersVoters'
      ])
    },
    data: () => {
      return {
        userId: localStorage.getItem('id'),
        token: localStorage.getItem('token'),
        userStatus: ''
      }
    },
    methods: {
      ...mapActions([
        'getQuestionsById',
        'getAnswerByQuestionId',
        'deleteAnswer',
        'getQuestionsVotersByQuestionId',
        'getAnswersVotersByQuestionId',
        'voteQuestion',
        'cancelVoteQuestion'
      ]),
      addCommentModal () {
        $('#addComment').modal('show')
      },
      submitDeleteAnswer (answer) {
        this.deleteAnswer(answer._id)
      },
      submitVoteQuestion () {
        let checkIndex = this.questionsVoters.findIndex(element => {
          return element.voter === this.userId
        })

        if (checkIndex === -1) {
          this.voteQuestion(this.id)
        } else {
          this.cancelVoteQuestion(this.userId)
        }
      }
    },
    created: function () {
      this.getQuestionsById(this.id)
      this.getAnswerByQuestionId(this.id)
      this.getQuestionsVotersByQuestionId(this.id)
    }
  }
</script>

<style scoped>
  .top {
    padding-top: 1rem;
  }

  .trash {
    font-size: 20px;
  }

  .header-icon {
    font-size: 2em;
  }
</style>
