<template>
  <div class="container">
    <div style="margin-bottom: 5%;" class="row">
      <div class="col-sm-8">
        <router-view :questions="questions"/>
      </div>
      <div class="col-sm-4">
        <Sidebar></Sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import MainContent from '@/components/MainContent'
import Sidebar from '@/components/Sidebar'
import {mapActions, mapState} from 'vuex'

export default {
  name: 'Content',
  components: {
    MainContent,
    Sidebar
  },
  computed: {
    ...mapState([
      'questions'
    ])
  },
  methods: {
    ...mapActions([
      'getAllQuestion'
    ])
  },
  created () {
    this.getAllQuestion()
  },
  mounted () {
    let storage = localStorage.getItem('token')
    if (!storage) {
      // this.$router.push({name: 'home'})
    }
  }
}
</script>

<style>

</style>
