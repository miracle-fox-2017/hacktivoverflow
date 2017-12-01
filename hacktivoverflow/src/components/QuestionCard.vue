<template>
  <div class="card">
  <h3 class="card-header">{{ question.title }}</h3>
  <div class="card-body">
    <p class="card-text">{{ question.body.substr(0,50) }}</p>
    <router-link :to="{
      name: 'QuestionDetail',
      params: {
        id: question.id
      }
    }">
    <button class="btn btn-primary">See more</button>
    </router-link>
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
