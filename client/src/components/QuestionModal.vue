<template>
	<div class="modal" id="questionModal" tabindex="-1" role="dialog" aria-labelledby="questionModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="questionModalLabel">Tambah Pertanyaan</h4>
				</div>
				<div class="modal-body">
					<form action="#" method="post">
						<input type="hidden" class="form-control" id="title" name="question_id" ref="question_id" :value="editedQuestion.questionId" />

						<div class="input-group u-full-width">
							<label>Judul</label>
							<input type="text" class="form-control" id="title" name="question_title" ref="question_title" :value="editedQuestion.title" />
						</div>

						<div class="input-group u-full-width">
							<label>Content</label>
							<textarea class="form-control" name="content" id="content" ref="question_content" rows="10">{{ editedQuestion.content }}</textarea>
						</div>

						<div class="input-group u-full-width">
							<label>Tag</label>
							<input type="text" class="form-control" id="question_taglist" name="question_taglist" ref="question_taglist" :value="editedQuestion.tagList"/>
						</div>
					</form>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-primary" @click.prevent="doNewQuestion" data-dismiss="modal">Tambah Pertanyaan</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions,  mapState } from 'vuex'

	export default {
		name: 'QuestionModal',
		data () {
			return {

			}
		},

		methods: {
		  doNewQuestion () {
		  	let question_id = this.$refs.question_id.value;
		  	let question_title = this.$refs.question_title.value;
		  	let question_content = this.$refs.question_content.value;
		  	let question_taglist = this.$refs.question_taglist.value.length > 0 ?
		  		this.$refs.question_taglist.value.split(',') : [];

		  	let questionData = {
		  		title: question_title,
		  		content: question_content,
		  		tagList: question_taglist,
		  		owner: this.loggedinUser.accountId
		  	}

		   if (question_title.length > 0 && question_content.length > 0) {

		   	if (this.editedQuestion.questionId !== null && this.editedQuestion.questionId !== '' && typeof this.editedQuestion.questionId !== 'undefined') {
		   		questionData.questionId = question_id;

		   		this.updateQuestion(questionData);

		   	} else {
	   			this.createQuestion(questionData);
		   	}


		   } else {
		   	alert("Data pertanyaan harus lengkap");
		   }
		  },

		  ...mapActions([
		  	'createQuestion',
		  	'updateQuestion'
		  ]),
		},

		computed: {
		  ...mapState([
		  	'loggedinUser',
		  	'editedQuestion'
		  ])
		}
	}
</script>

<style scoped>

</style>