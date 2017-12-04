<template>
  <div class="ui segment">
    <div class="ui feed">
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
export default {
  components: {
    VoteAnswer
  },
  props: ['answer']
}
</script>

<style>

</style>
