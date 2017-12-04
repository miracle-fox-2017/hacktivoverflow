<template>
  <article class="row">
    <div class="column">
      <h4 class="ui header">{{ userQuestion.title }}</h4>
      <p>{{ userQuestion.content }}</p>
    </div>
    <div class="three wide column">
      <div class="ui right floated buttons">
        <button id="btnstyle" class="ui active button" @click="editQuestionModal(userQuestion)">Edit</button>
        <EditQuestionModal :userQuestion="userQuestion"/>
        <div class="or"></div>
        <button id="btnstyle" class="ui negative button" @click="submitDeleteQuestion(userQuestion)">Delete</button>
      </div>
    </div>
  </article>
</template>

<script>
  import { mapActions } from 'vuex'
  import EditQuestionModal from '@/components/EditQuestionModal'
  export default {
    name: 'DashboardSummaries',
    props: ['userQuestion'],
    components: {
      EditQuestionModal
    },
    methods: {
      ...mapActions(['deleteQuestion']),
      submitDeleteQuestion (userQuestion) {
        this.deleteQuestion(userQuestion._id)
      },
      editQuestionModal (userQuestion) {
        console.log(userQuestion);
        $('#editQuestion').modal('show')
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
