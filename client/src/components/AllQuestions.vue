<template>
<div class="container">
  <AddQuestion></addQuestion>
  <QuestionsSummary v-for="(question, index) in questions" :question="question" :key="index"></QuestionsSummary>
</div>
</template>

<script>
import QuestionsSummary from '@/components/QuestionsSummary'
import AddQuestion from '@/components/AddQuestion'
export default {
  props: ['questions'],
  components : {
    QuestionsSummary,
    AddQuestion
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
