<template>
  <div class="card">
  <h3 class="card-header">Card header</h3>
  <div class="card-body">
    <h5 class="card-title">{{ question.title }}</h5>
  </div>
  <div class="card-body">
    <p class="card-text">{{ (question.body).substr(0,100) }}</p>
    <router-link>
    <button></button>
    </router-link>
    <router-link>
    <button></button>
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
