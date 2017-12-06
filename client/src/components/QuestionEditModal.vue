<template>
	<div class="modal" id="questionEditModal" tabindex="-1" role="dialog" aria-labelledby="questionEditModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="questionEditModalLabel">Tambah Pertanyaan</h4>
				</div>
				<div class="modal-body">
					<form action="#" method="post">
						<input type="hidden" class="form-control" id="title" name="question_id" ref="question_id" :value="question._id" />

						<div class="input-group u-full-width">
							<label>Judul</label>
							<input type="text" class="form-control" id="title" name="question_title" ref="question_title" :value="question.title" />
						</div>

						<div class="input-group u-full-width">
							<label>Content</label>
							<textarea class="form-control" name="content" id="content" ref="question_content" rows="10">{{ question.content }}</textarea>
						</div>

						<div class="input-group u-full-width">
							<label>Tag</label>
							<input type="text" class="form-control" id="question_taglist" name="question_taglist" ref="question_taglist" :value="question.tagList"/>
						</div>
					</form>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-primary" @click.prevent="doUpdateQuestion" data-dismiss="modal">Tambah Pertanyaan</button>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import { mapActions,  mapState } from 'vuex'

	export default {
		name: 'QuestionEditModal',
		props: ['question'],
		data () {
			return {

			}
		},

		computed: {
			...mapState([
				'questions',
				'loggedinUser'
			])
		},

		methods: {
		  doUpdateQuestion () {
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
		  		this.$http.put(`/api/questions/update/${question_id}`, questionData, { headers: { token: this.loggedinUser.token } })
		  		.then(({data}) => {
		  			this.$emit('do-update-question', data.data)

		  		}).catch(err => console.log({message:'Something Wrong on update question', error: err.message}));

		  	} else {
		  		alert("Data pertanyaan harus lengkap");
		  	}
		  },

		},
	}
</script>

<style scoped>

</style>