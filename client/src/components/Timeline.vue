<template>
  <div class="container">
    <div class="jumbotron">
      <h1>Pak Haji Overflow</h1>
      <p>Entong nanya pak haji jawab.</p>
      <timeline-item v-for="question in allQuestion" :key="question._id" :question="question"></timeline-item>
    </div>
  </div>
</template>

<script>
import TimelineItem from './TimelineItem'
export default {
  components: {
    TimelineItem
  },
  computed: {
    allQuestion () {
      return this.$store.state.questions
    }
  }
}
</script>

<style>

</style>
