<template>
  <div class="ui segment">
    <div class="ui grid">
      <div class="one wide column center aligned" @click="submitVoteAnswer(answer)">
        {{ answer.voters.length }}
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
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'AnswerDetail',
    props: ['answer'],
    computed: {
      // ...mapState(['answersVoters'])
      ...mapGetters([
        'answersVotes'
      ])
    },
    data: () => {
      return {
        userId: localStorage.getItem('id')
      }
    },
    methods: {
      ...mapActions([
        'voteAnswer',
        'deleteAnswer'
      ]),
      submitDeleteAnswer (answer) {
        this.deleteAnswer(answer._id)
      },
      submitVoteAnswer (answer) {
        // console.log(answer._id)
        this.voteAnswer(answer._id)
      }
    },
    created: function () {
      // console.log(this.answer)
      // this.getAnswersVotersByAnswerId(this.answer._id)
    }
  }
</script>

<style scoped>
  .trash {
    font-size: 20px;
  }
</style>
