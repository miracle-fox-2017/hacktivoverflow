<template>
  <div class="container">
    <div class="jumbotron">
      <user-item v-for="question in UserQuestions" :key="question._id" :question="question"></user-item>
    </div>
    <updated-modal></updated-modal>
  </div>
</template>

<script>
import UserItem from './UserItem'
import UpdatedModal from './UpdateModal'

export default {
  components: {
    UserItem,
    UpdatedModal
  },
  computed: {
    UserQuestions () {
      return this.$store.state.userQuestions
    }
  },
  watch: {
    UserQuestions () {}
  },
  created () {
    this.$store.dispatch('getUserQuestions', localStorage.getItem('tokenOverflow'))
  }
}
</script>
