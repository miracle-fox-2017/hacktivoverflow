<template>
  <article class="row">
    <div class="one center aligned wide column">
      0
      <i class="thumbs outline up icon"></i>
    </div>
    <div class="one center aligned wide column">
      0
      <i class="comments outline icon"></i>
    </div>
    <div class="nine wide column">{{ question.title }}</div>
    <div class="three wide column none-shadow" v-for="(tag, index) in question.tags" :key="index">
      <a class="ui small red horizontal label">{{ tag }}</a>
    </div>
    <div class="two wide column">{{ question.questioner.name }}</div>
  </article>
</template>

<script>
  export default {
    name: 'HomeSummaries',
    props: ['question']
  }
</script>

<style scoped></style>
