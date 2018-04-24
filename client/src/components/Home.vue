<template>
  <div class="hello">
      <h1 class="welcomeUser" v-if="checkIn">Hay {{ name }}</h1>
      <login :checkIn="checkIn"></login> 
    <router-view :questions="questions"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import login from '@/components/login'
export default {
  components: {
    login
  },
  computed: {
    questions () {
      return this.$store.state.questions
    },
    checkIn () {
      return this.$store.state.checkIn
    },
    name () {
      return this.$store.state.name
    }    
  },
  methods: {
    ...mapActions([
        'getAllQuestion',
        'isCheckIn'
      ])
  },
  created () {
    this.getAllQuestion()
    this.isCheckIn()
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

.welcomeUser {
  color: #FFCCBC;
}
.hello {
  margin-left: 50px;
  margin-right: 50px;
}
</style>
