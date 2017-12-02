<template>
<div>
  <div class="card border-primary">
    <div class="card-body">
      <blockquote class="card-blockquote">
        <p> {{ answer.answer }}</p>
        <footer class="blockquote-footer">email here</footer>
      </blockquote>
        <footer>
          <button type="button" class="btn btn-outline-primary">Upvote</button>
          <button type="button" class="btn btn-outline-secondary">Downvote</button>
        </footer>
    </div>
  </div>
  <div class="whitespace"></div>
</div>
</template>

<script>
export default {
  props: ['answer']
}
</script>

<style scoped>
.whitespace {
  margin: 16px;
}
</style>
