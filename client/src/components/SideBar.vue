<template>
  <div>
    <modal title="Write your Questions" :backdrop="false" :is-show="isShow3" @close="isShow3=false">
      <form @submit.prevent="">
        <label class="label">Title</label>
        <p class="control">
          <input class="input" v-model="ask.title" type="text" placeholder="Title">
        </p>
        <label class="label">Question</label>
        <p class="control">
          <textarea class="textarea" v-model="ask.body" placeholder="Ask something usefull"></textarea>
        </p>
        <div slot="footer">
          <button @click="isShow3=false" class="button is-light">Cancel</button>
          <button class="button is-warning">Save</button>
        </div>
      </form>
    </modal>
    <a @click="toggle3" class="button is-warning">Ask Question</a>
    <hr/><br/>
    <div class="box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
              <br>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                <span class="icon is-small"><i class="fa fa-reply"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-small"><i class="fa fa-retweet"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-small"><i class="fa fa-heart"></i></span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </div>
    <timeline>
      <timeline-item date="2 minutes ago" type="primary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante soe aiea ose dos soois.
      </timeline-item>
      <timeline-item date="Sat, 5 Mar" type="primary">
        <p>adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </timeline-item>
      <timeline-item date="Sun, 11 Feb" type="success">
        Call to customer Jacob and discuss the detail.
      </timeline-item>
    </timeline>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data () {
    return {
      isShow3 : false,
      ask: {
        body: '',
        title: ''
      }
    }
  },
  methods: {
    toggle3 () {
      this.isShow3 = true
    }
  }
}
</script>

<style>

</style>
