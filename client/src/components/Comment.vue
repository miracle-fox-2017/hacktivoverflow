<template lang="html">
  <div class="commentColumn">
    <h4>Comments</h4>
      <div class="card" v-for="(comment, index) in dataComment">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            {{comment.title}}
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: ['postId'],
  data () {
    return {
      dataComment: []
    }
  },
  methods: {
    getCommentById () {
      this.dataComment = []
      this.comments.forEach((data) => {
        if (data.question._id === this.postId) {
          this.dataComment.push(data)
        }
      })
    }
  },
  computed: {
    comments () {
      return this.$store.state.comments
    }
  },
  created () {
    this.getCommentById()
  },
  watch: {
    postId (newId) {
      this.postId = newId
      this.getCommentById(this.postId)
    }
  }
}
</script>

<style lang="css" scoped>
.commentColumn {
  padding-top: 5em;
  padding-bottom: 5em
}
</style>
