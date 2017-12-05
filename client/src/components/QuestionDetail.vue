<template>
  <article class="row">
    <div class="column">
      <h4 class="ui header">{{ questionDetail.title }}</h4>
      <p>{{ questionDetail.content }}</p>
    </div>
  </article>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  // import EditQuestionModal from '@/components/EditQuestionModal'
  export default {
    name: 'QuestionDetail',
    props: ['id'],
    computed: {
      ...mapGetters(['questionDetail'])
    },
    methods: {
      ...mapActions(['getQuestionsById'])
    },
    created: function () {
      this.getQuestionsById(this.id)
    }
  }
</script>

<style scoped>
</style>
