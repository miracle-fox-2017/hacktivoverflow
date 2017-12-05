<template>
  <div class="ui segment">
    <div class="ui feed">
      <button class="ui button icon" href="#" style="color: red; float: right; font-size: 18px; padding: .3em .3em .3em !important;" v-if="answer.userId._id == userId" @click="deleteAnswer(answer._id)"><i class="remove circle outline icon"></i></button>
      <div class="meta" style="font-size: 12px; color: #393996;" v-if="answer.userId._id == userId">
        <i class="user icon"></i><span>You</span>
      </div>
      <div class="meta" style="font-size: 12px; color: #393996;" v-else>
        <i class="user icon"></i><span>{{answer.userId.first_name}} {{answer.userId.last_name}}</span>
      </div>
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
