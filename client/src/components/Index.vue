<template>
  <div>
    <Navbar/>
    <router-view></router-view>
    <addq-modal></addq-modal>
  </div>
</template>

<script>
import Navbar from './Navbar'
import AddqModal from './AddQModal'
import { mapActions } from 'vuex'

export default {
  components: {
    Navbar,
    AddqModal
  },
  methods: {
    ...mapActions([
      'getAllQuestion'
    ])
  },
  mounted () {
    this.getAllQuestion()
  }
}
</script>