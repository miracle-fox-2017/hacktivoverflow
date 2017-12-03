<template>
  <div class="hello">  
     <article class="message is-dark">
      <div class="message-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
        <span class="tag is-link"><router-link :to="`hacktivoverflow/askquestion`">Ask Question</router-link></span>
      </div>
    </article>
    <div class="columns">
      <div class="column is-three-fifths">
        <Questions/>
      </div>
      <div class="column">
        <router-view/>
      </div>
    </div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import Questions from './Questions'
export default {
  name: 'HelloWorld',
  components: { Questions },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
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
