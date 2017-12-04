<template>
  <div class="ui segment">
    <div class="ui feed">
      <button class="ui button icon" href="#" style="color: red; float: right; font-size: 18px; padding: .3em .3em .3em !important;" v-if="answer.userId._id == userId" @click="deleteAnswer(answer._id)"><i class="remove circle outline icon"></i></button>
      <i style="color: #ababab; font-size: 10px;">{{answer.userId.first_name}} {{answer.userId.last_name}}</i>
      <div class="event">
        <div class="content">
          <div class="extra text">
            <p>{{answer.answer}}</p>
          </div>
          <VoteAnswer :answerId="answer._id"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VoteAnswer from '@/components/VoteAnswer'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      userId: localStorage.getItem('userId')
    }
  },
  components: {
    VoteAnswer
  },
  props: ['answer'],
  methods: {
    ...mapActions([
      'deleteAnswer'
    ])
  }
}
</script>

<style>

</style>
