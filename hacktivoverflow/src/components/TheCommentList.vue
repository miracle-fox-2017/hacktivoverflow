<template>
<div>
  <div class="panel panel-success" v-for="comment in comments">
    <div class="panel-body" >
      {{comment.comment}}
      <br>
      <small class="text-muted">by {{comment.users.name}}</small>
      <div>
        <a href="#"><span class="glyphicon glyphicon-trash">delete</span></a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'getCommentById'
    ])
  },
  created () {
    this.getCommentById(this.$route.params.id)
  },
  computed: {
    ...mapState([
      'comments'
    ])
  }
}
</script>

<style>

</style>
