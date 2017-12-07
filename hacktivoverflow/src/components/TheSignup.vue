<template>
  <div>
    <form>
      <fieldset>
        <div class="form-group">
          <div>
            <label>Display Name</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="J.Doe" v-model="name">
          </div>
          <div>
            <br>
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="you@example.org" v-model="email">
          </div>
          <div>
            <br>
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="*******" v-model="password">  
          </div>
          <div>
            <br>
            <button type="button" class="btn btn-primary" v-on:click="isSignup">Sign up</button>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    isSignup () {
      this.$http.post('http://localhost:3000/api/users/signup', {
        name: this.name,
        email: this.email,
        password: this.password
      })
      .then(({data}) => { this.$router.push('/login') })
	    .catch(err => { console.log(err) })
    }
  }
}
</script>

<style scope>
.form-control {
 margin: auto;
  width: 25%;
}

</style>
