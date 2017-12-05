<template lang="html">
  <div class="col-md-9">
    <div class="editPost">
      <h2>Edit Post</h2>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Input Title</label>
          <input type="text" class="form-control" id="inputTitle" placeholder="Post Title" v-model="title">
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Input Content</label>
          <textarea class="form-control" rows="5" id="inputContent" v-model="content"></textarea>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary" @click="postEdit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditPost',
  props: ['postId'],
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    getDataDetails () {
      this.posts.forEach((data) => {
        if (data._id === this.postId) {
          this.title = data.title
          this.content = data.content
        }
      })
    },
    postEdit () {
      this.$axios.put(`http://18.217.192.109/post/${this.postId}`, {
        title: this.title,
        content: this.content
      }).then(({data}) => {
        console.log(data.title)
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  created () {
    this.getDataDetails()
  },
  computed: {
    posts () {
      return this.$store.state.posts
    }
  }
}
</script>

<style lang="css">
</style>
