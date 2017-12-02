<template>
  <div class="container">


<!-- Button trigger modal -->
<button class="btn btn-primary btn-lg pull-left" data-toggle="modal" data-target="#myModalHorizontal">
    Add Question
</button>

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
                    Add your question
                </h4>
            </div>
            
            <!-- Modal Body -->
            <div class="modal-body">
                
                <form class="form-horizontal" role="form">
                  <div class="form-group">
                    <label  class="col-sm-2 control-label"
                              for="title">Title</label>
                    <div class="col-sm-10">
                        <input v-model="title" type="text" class="form-control" 
                        id="inputEmail3" placeholder="your question title"/>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label"
                          for="ask">Ask</label>
                    <div class="col-sm-10">
                        <textarea v-model="desc" id="area" type="text" class="form-control" placeholder="what do you want to know??"/>
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
                <button @click="createQuestion" data-dismiss="modal" type="button" class="btn btn-primary">
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
      title: '',
      desc: ''
    }
  },
  methods: {
    ...mapActions ([
        'addQuestion',
        'getAllQuestion'
      ]),
    createQuestion: function () {
      let keep = this
      this.addQuestion({
        title : keep.title,
        desc : keep.desc
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