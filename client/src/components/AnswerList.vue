<template>
  <div class="ui segment">
    <div class="ui feed">
      <i style="color: #ababab; font-size: 10px;">{{answer.userId.first_name}} {{answer.userId.last_name}}</i>
      <div class="event">
        <div class="content">
          <div class="extra text">
            <p>{{answer.answer}}</p>
          </div>
          <div class="meta">
            <a class="like" @click="voteAnswer">
              <i class="thumbs outline up icon"></i> 0 Likes
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['answer'],
  methods: {
    voteAnswer () {

    }
  },
  created () {

  }
}
</script>

<style>

</style>
