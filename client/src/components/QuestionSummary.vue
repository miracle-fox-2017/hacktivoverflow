<template>
<div class="ui divided items">
  <div class="item">
    <div class="content">
      <a class="header">{{question.title}}</a>
      <div class="meta">
        <span class="cinema">{{question.userId.first_name}} {{question.userId.last_name}}</span>
      </div>
      <div class="description">
        <p>{{question.question}}</p>
      </div>
      <div class="extra">
        <div class="ui label">IMAX</div>
        <div class="ui label"><i class="globe icon"></i> Additional Languages</div>
      </div>
    </div>
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
