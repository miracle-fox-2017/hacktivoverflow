<template>
  <article class="row">
    <div class="column">
      <h4 class="ui header">{{ questionDetail.title }}</h4>
      <p>{{ questionDetail.content }}</p>
      <div class="ui segments">
        <div class="ui segment" v-for="(answer, index) in answers" :key="index">
          <div class="ui grid">
            <div class="one wide column center aligned">
              0
              <i class="thumbs outline up icon"></i>
            </div>
            <div class="fourteen wide column">
              <p>{{ answer.content }}</p>
            </div>
            <div class="one wide column right aligned" v-if="answer.answerer._id === userId" @click="submitDeleteAnswer(answer)">
              <i class="trash outline icon"></i>
            </div>
          </div>
        </div>
      </div>
      <button class="ui right floated positive button" @click="addCommentModal">Comment</button>
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
        'answers'
      ])
    },
    data: function () {
      return {
        userId: localStorage.getItem('id')
      }
    },
    methods: {
      ...mapActions([
        'getQuestionsById',
        'getAnswerByQuestionId',
        'deleteAnswer'
      ]),
      addCommentModal () {
        $('#addComment').modal('show')
      },
      submitDeleteAnswer (answer) {
        // console.log(answer);
        this.deleteAnswer(answer._id)
      }
    },
    created: function () {
      this.getQuestionsById(this.id)
      this.getAnswerByQuestionId(this.id)
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
</style>
