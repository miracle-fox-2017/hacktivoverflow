<template>
  <article class="row">
    <div class="column">
      <h4 class="ui header">{{ userQuestion.title }}</h4>
      <p>{{ userQuestion.content }}</p>
    </div>
    <div class="three wide column">
      <div class="ui right floated buttons">
        <button id="btnstyle" class="ui active button">Edit</button>
        <div class="or"></div>
        <button id="btnstyle" class="ui negative button" @click="submitDeleteQuestion(userQuestion)">Delete</button>
      </div>
    </div>
  </article>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'DashboardSummaries',
    props: ['userQuestion'],
    methods: {
      ...mapActions(['deleteQuestion']),
      submitDeleteQuestion (userQuestion) {
        // console.log(userQuestion._id);
        this.deleteQuestion(userQuestion._id)
      }
    }
  }
</script>

<style scoped>
  #iconstyle {
    font-size: 24px;
    margin: 0 1rem 0 0;
  }

  #btnstyle {
    width: 90px;
  }

  #remove {
    box-shadow: none;
  }
</style>
