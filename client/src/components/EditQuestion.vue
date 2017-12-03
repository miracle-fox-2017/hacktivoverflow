<template>
<div class="container">	
<!-- Modal -->
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
	                        id="inputEmail3" :placeholder="question.title"/>
	                    </div>
	                  </div>
	                  <div class="form-group">
	                    <label class="col-sm-2 control-label"
	                          for="ask">Ask</label>
	                    <div class="col-sm-10">
	                        <textarea v-model="desc" id="area" type="text" class="form-control" :placeholder="question.desc"/>
	                    </div>
	                  </div>
	                </form>     
	            </div>    
	            <!-- Modal Footer -->
	            <div class="modal-footer">
	                <router-link to="/"> <button type="button" class="btn btn-default"
	                        data-dismiss="modal">
	                            Close
	                </button>
	                </router-link>
	                <router-link to="/"> <button @click="questionEdit" type="button" class="btn btn-primary">
	                    Submit
	                </button>
	            	</router-link>
	            </div>
	        </div>
	    </div>
</div>	
</template>

<script>
import { mapActions } from 'vuex'
export default {
	props : ['questionId'],
	data () {
		return {
			title: '',
			desc: ''
		}
	},
	computed : {
		question () {
			return this.$store.state.question
		}
	},
	methods : {
		...mapActions([
			'getQuestion',
			'editQuestion'
			]),
		questionEdit : function () {
			console.log("masuk")
			this.editQuestion({
				questionId : this.questionId,
				title : this.title,
				desc : this.desc
			})
		}
	},
	created () {
		this.getQuestion(this.questionId)
	}
}
</script>

