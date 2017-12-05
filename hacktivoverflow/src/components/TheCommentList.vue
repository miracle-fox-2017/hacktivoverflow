<template>
<div>
  <div class="panel panel-success" v-for="comment in comments">
    <div class="panel-body" >
      {{comment.comment}}
      <br>
      <small class="text-muted">by {{comment.users.name}}</small>
      <div>
        <a href="#" v-on:click="destroy(comment._id)"><span class="glyphicon glyphicon-trash">delete</span></a>
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
      'getCommentById',
      'deleteComment'
    ]),
    destroy (id) {
      this.deleteComment({
        id: id,
        token: localStorage.getItem('token')
      })
    }
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
