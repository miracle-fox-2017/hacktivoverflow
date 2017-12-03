<template>
  <div>
    <a class="button is-warning">Ask Question</a>
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
  name: 'SideBar'
}
</script>

<style>

</style>
