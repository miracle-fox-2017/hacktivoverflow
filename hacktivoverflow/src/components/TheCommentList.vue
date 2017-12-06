<template>
<div>
  <div class="panel panel-success" v-for="comment in comments">
    <div class="panel-body" >
      {{comment.comment}}
      <br>
      <small class="text-muted">by {{comment.users.name}}</small>
      <div>
        <a href="#" v-on:click="destroy(comment._id)"><span class="glyphicon glyphicon-trash">delete</span></a>
        <a href="#" v-on:click="like(comment._id)"><span class="glyphicon glyphicon-heart">like({{comment.likes.length}})</span></a>
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
      'deleteComment',
      'likeComment'
    ]),
    destroy (id) {
      this.deleteComment({
        id: id,
        token: localStorage.getItem('token')
      })
    },
    like (id) {
      this.likeComment({
        idUser: localStorage.getItem('id'),
        id: id
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
