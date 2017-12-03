<template>
  <section class="hero">
    <div class="hero-body">
      <section class="hero is-small is-light">
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-two-thirds">
                <router-view/>
              </div>
              <div class="column">
                <SideBar/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import SideBar from '@/components/SideBar'
export default {
  name: 'Home',
  components: {
    SideBar
  }
}
</script>

<style>

</style>
