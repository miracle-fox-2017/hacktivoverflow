<template>
<div>
  <div class="panel panel-success" v-for="comment in comments">
    <div class="panel-body" >
      {{comment.comment}}
      <br>
      <small class="text-muted">by {{comment.users.name}}</small>
      <div v-show="token">
        <button type="button" class="btn btn-success" v-on:click="destroy(comment._id)"><span class="glyphicon glyphicon-trash">delete</span></button>
        <button type="button" class="btn btn-success" v-on:click="like(comment._id)"><span class="glyphicon glyphicon-heart">like({{comment.likes.length}})</span></button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      token: localStorage.getItem('token')
    }
  },
  methods: {
    ...mapActions([
      'getCommentById',
      'deleteComment',
      'likeComment'
    ]),
    destroy (id) {
      this.deleteComment({
        id: id,
        idUser: localStorage.getItem('id'),
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
