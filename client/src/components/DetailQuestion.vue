<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{ question.userId.username }}
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">
          {{ question.question }}
          <a href="#">#{{ question.tag }}</a> 
          <br>
          <time>{{ question.createdAt }}</time>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Save</a>
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'DetailQuestion',
  data () {
    return {
      
    }
  },
  computed: {
    ...mapState([
      'question'
    ])
  }
}
</script>

<style>

</style>
