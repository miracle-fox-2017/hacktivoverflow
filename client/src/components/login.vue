<template>
  <div class="container">


<!-- Button trigger modal -->
<button v-if="checkIn == false"class="btn btn-primary btn-xs pull-right sidebutton" data-toggle="modal" data-target="#login">
    Login
</button>

<button @click.prevent="logout" v-else="checkIn"class="btn btn-primary btn-xs pull-right sidebutton">
    Logout
</button>

<button class="btn btn-primary btn-xs pull-right" v-if="!checkIn" data-toggle="modal" data-target="#register">
    Register
</button>
<!-- Login -->
<div class="modal fade" id="login" tabindex="-1" role="dialog" 
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <button type="button" class="close" 
                   data-dismiss="modal">
                       <span aria-hidden="true">&times;</span>
                       <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    Login
                </h4>
            </div>
            
            <!-- Modal Body -->
            <div class="modal-body">
                
                <form class="form-horizontal" role="form">
                  <div class="form-group">
                    <label  class="col-sm-2 control-label"
                              for="username">Username</label>
                    <div class="col-sm-10">
                        <input v-model="username" type="text" class="form-control" 
                        id="inputEmail3" placeholder="username"/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label"
                          for="password">Password</label>
                    <div class="col-sm-10">
                        <input type="password" v-model="password" id="area" class="form-control" placeholder="your password"/>
                    </div>
                  </div>
                </form>     
            </div>    
            <!-- Modal Footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-default"
                        data-dismiss="modal">
                            Close
                </button>
                <button @click="login" data-dismiss="modal" type="button" class="btn btn-primary">
                    Submit
                </button>
            </div>
        </div>
    </div>
</div>


<!-- Register -->
<div class="modal fade" id="register" tabindex="-1" role="dialog" 
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <button type="button" class="close" 
                   data-dismiss="modal">
                       <span aria-hidden="true">&times;</span>
                       <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    Register
                </h4>
            </div>
            
            <!-- Modal Body -->
            <div class="modal-body">
                
                <form class="form-horizontal" role="form">
                  <div class="form-group">
                    <label  class="col-sm-2 control-label"
                              for="Name">Name</label>
                    <div class="col-sm-10">
                        <input v-model="name" type="text" class="form-control" 
                        placeholder="Name"/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label  class="col-sm-2 control-label"
                              for="username">Username</label>
                    <div class="col-sm-10">
                        <input v-model="username" type="text" class="form-control" 
                        placeholder="Username"/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label  class="col-sm-2 control-label"
                              for="email">Email</label>
                    <div class="col-sm-10">
                        <input v-model="email" type="text" class="form-control" 
                        placeholder="Email"/>
                    </div>
                  </div>   
                  <div class="form-group">
                    <label  class="col-sm-2 control-label"
                              for="password">Password</label>
                    <div class="col-sm-10">
                        <input v-model="password" type="password" class="form-control" 
                        placeholder="password"/>
                    </div>
                  </div>                                  
                </form>     
            </div>    
            <!-- Modal Footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-default"
                        data-dismiss="modal">
                            Close
                </button>
                <button @click="createUser" data-dismiss="modal" type="button" class="btn btn-primary">
                    Submit
                </button>
            </div>
        </div>
    </div>
</div>


    
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      username : '',
      password : '',
      name: '',
      email: '',
      bol : false
    }
  },
  computed : {
    token() {
      return this.$store.state.token
    },
    checkIn() {
      return this.$store.state.checkIn
    }    
  },
  methods : {
    ...mapActions([
      'signIn',
      'signUp',
      'signOut',
      'isCheckIn'
      ]),
    createUser: function () {
      this.signUp({
        name : this.name,
        username : this.username,
        email : this.email,
        password : this.password
      })
    },
    login : function () {
      this.signIn({
        username : this.username,
        password : this.password        
      })
    },
    logout () {
      this.signOut()
    }
  },
  created () {
    this.isCheckIn()
  }
}
</script>

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

#area {
  margin: 0px 1.32812px 0px 0px; 
  width: 468px;
}

.container {
  margin-top: 20px;
  margin-bottom: 20px;
}

.sidebutton {
  margin-left: 10px;
}
</style>