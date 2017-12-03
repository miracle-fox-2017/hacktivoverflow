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
						<input type="hidden" class="form-control" id="answer_id" name="answer_id" ref="answer_id" :value="editedAnswer.answerId" />

						<div class="input-group u-full-width">
							<label>Content</label>
							<textarea class="form-control" name="content" id="content" ref="answer_content" rows="10">{{ editedAnswer.content }}</textarea>
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
		props: ['questionId'],
		data () {
			return {

			}
		},

		methods: {
		  ...mapActions([
		  	'createAnswer'
		  ]),

		  doNewAnswer() {
		  	let content = this.$refs.answer_content.value;

		  	if (content.length > 0) {

		  		/*this.createAnswer({
		  			questionId: this.questionId,
		  			content: content,
		  			owner: this.loggedinUser.accountId,
		  			username: this.loggedinUser.username
		  		})*/
		  	}
		  },
		},

		computed: {
		  ...mapState([
		  	'editedAnswer',
		  	'loggedinUser'
		  ])
		}
	}
</script>

<style scoped>

</style>