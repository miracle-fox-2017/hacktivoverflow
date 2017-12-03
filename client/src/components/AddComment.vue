<template>
  <div class="container">


<!-- Button trigger modal -->
<button class="btn btn-default pull-right" data-toggle="modal" data-target="#myModalHorizontal" ><span class="glyphicon glyphicon-comment"></span> comment </button>

<!-- Modal -->
<div class="modal fade" id="myModalHorizontal" tabindex="-1" role="dialog" 
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
                    Add your Comment
                </h4>
            </div>
            
            <!-- Modal Body -->
            <div class="modal-body">
                
                <form class="form-horizontal" role="form">
                  <div class="form-group">
                    <label class="col-sm-2 control-label"
                          for="ask">Comment</label>
                    <div class="col-sm-10">
                        <textarea v-model="desc" id="area" type="text" class="form-control" placeholder="Comment here"/>
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
                <button @click.prevent="commentAdd" data-dismiss="modal" type="button" class="btn btn-primary">
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
  props: ['questionId'],
  data () {
    return {
      desc: ''
    }
  },
  methods: {
    ...mapActions ([
        'addComment'
      ]),
    commentAdd: function () {
      let keep = this;
      this.addComment({
        desc : this.desc,
        questionId : this.questionId
      })
    }
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
</style>