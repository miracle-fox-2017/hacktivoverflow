<template>
	<div class="modal" id="answerModal" tabindex="-1" role="dialog" aria-labelledby="answerModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="answerModalLabel">Tambah Jawaban</h4>
				</div>
				<div class="modal-body">
					<form action="#" method="post">
						<div class="input-group u-full-width">
							<label>Content</label>
							<textarea class="form-control" name="content" id="content" ref="answer_content" rows="10"></textarea>
						</div>
					</form>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-primary" @click.prevent="doNewAnswer" data-dismiss="modal">Tambah Jawaban</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions,  mapState } from 'vuex'

	export default {
		name: 'AnswerModal',
		props: ['question'],
		data () {
			return {

			}
		},

		methods: {
		 /* ...mapActions([
		  	'createAnswer',
		  	'editedAnswer'
		  ]),*/

		  doNewAnswer() {
		  	let content = this.$refs.answer_content.value;

		  	if (content.length > 0) {
		  		let newAnswer = {
		  			content: content,
		  			owner: this.loggedinUser.accountId,
		  			username: this.loggedinUser.username
		  		}

		  		this.$http.post('/api/answers/question/'+this.question._id, newAnswer, { headers: { token: this.loggedinUser.token } })
						.then(({data}) => {
							alert("Jawaban berhasil dibuat");
							this.$emit('do-new-answer', data.answer);

						}).catch(err => alert(JSON.stringify({message:'Something Wrong on new Question', error: err.message})));
		  	}
		  },
		},

		computed: {
		  ...mapState([
		  	'loggedinUser'
		  ])
		}
	}
</script>

<style scoped>

</style>