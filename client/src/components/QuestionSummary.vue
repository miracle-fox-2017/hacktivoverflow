<template>
  <div class="ui segment">
    <div class="ui header">
      {{question.title}}
    </div>
    <div class="content">
      <p>{{question.question}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['question']
}
</script>

<style>

</style>
