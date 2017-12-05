<template>
  <div class="container">
    <h2>{{question[0].title}}</h2>
    <p>{{question[0].content}}</p>
  </div>
</template>

<script>
import { mapState} from 'vuex'

export default {
    name: 'TheQuestionSummary',
    computed: {
      ...mapState([
        'question'
      ])
    },

    

}
</script>

<style>

</style>
