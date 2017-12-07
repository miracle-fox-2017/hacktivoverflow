<template>
  <div class="hello">
    <navbar />
    <add-question/>
    <list-question />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import ListQuestion from '@/components/ListQuestion'
import AddQuestion from '@/components/AddQuestion'
export default {
  name: 'LandingPage',
  components: {
    Navbar,
    ListQuestion,
    AddQuestion
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
