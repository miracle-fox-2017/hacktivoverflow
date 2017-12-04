<template>
  <article class="row">
    <div class="two wide column">Votes</div>
    <div class="two wide column">Answers</div>
    <div class="seven wide column">{{ question.title }}</div>
    <div class="three wide column none-shadow" v-for="(tag, index) in question.tags" :key="index">
      <a class="ui small red horizontal label">{{ tag }}</a>
    </div>
    <div class="two wide column">{{ question.questioner.name }}</div>
  </article>
</template>

<script>
  export default {
    name: 'QuestionsSummaries',
    props: ['question']
  }
</script>

<style scoped></style>
