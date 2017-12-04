<template>
  <div class="container">
    <div class="row spasi">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import QuestionCard from '@/components/QuestionCard'
import QuestionDetail from '@/components/QuestionDetail'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  components: {
    QuestionCard,
    QuestionDetail
  }
}
</script>
<style>
  .spasi {
    padding-top: 42px;
    padding-bottom: 14px;
  }
</style>
