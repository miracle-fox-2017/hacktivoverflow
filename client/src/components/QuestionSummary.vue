<template>
<div class="ui feed">
  <div class="event">
    <div class="label">
      <img src="../assets/img/user.svg">
    </div>
    <div class="content">
      <div class="summary" style="font-size: 12px;">
        <a>{{question.userId.first_name}} {{question.userId.last_name}}</a> posted new question
        <div class="date">
          
        </div>
      </div>
      <div class="extra text">
        <router-link :to="`/questions/${question._id}`"><h3>{{question.title}}</h3></router-link>
        <p>{{question.question.substring(0, 200)}}</p>
      </div>
      <!-- <div class="meta">
        <a class="like">
          <i class="like icon"></i> 5 Likes
        </a>
      </div> -->
    </div>
  </div>
  <div class="ui divider"></div>
</div>
</template>

<script>
export default {
  props: ['question']
}
</script>

<style>

</style>
