<template>
<div class="row">
  <div class="col-md-12">
    <div class="thumbnail">
      <div class="caption">
        <!-- <h3><a v-on:click="getById">{{ question.title }}</a></h3> -->
        <h3><a v-on:click="getById"><router-link :to="{name: 'TheQuestionSummary', params: {id: question._id}}" :question="question">{{ question.title }}</router-link></a></h3>
        <p>{{ question.content }}</p>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import TheQuestionSummary from '@/components/TheQuestionSummary'
import { mapActions} from 'vuex'

export default {
  props: ['question'],
  components: {
    TheQuestionSummary
  },
  methods: {
    getById () {
      this.getByIdQuestion(this.question._id)
    },
    ...mapActions([
      'getByIdQuestion'
    ])
  },
  
}
</script>

<style>

</style>
