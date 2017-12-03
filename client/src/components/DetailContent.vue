<template>

	<div class="content-wrapper">
		<div class="content-item">
			<h2 class="content-tile">
				<router-link :to="`/${question._id}`">{{ question.title }}</router-link>
			</h2><!-- /.content-tile -->

			<div class="question-content">
				{{ question.content }}
			</div><!-- /.question-content -->

			<footer class="vote-area">
				<ul class="flat-list list-inline vote-list">
					<li>
						<a href="#" class="vote-button" @click.prevent="doVoteQuestion(question)">
							<i class="fa fa-thumbs-o-up"></i>
							<span>{{ qusetionVoteLength }}</span>
						</a>
					</li>
					<li>
						<a href="#"><i class="fa fa-pencil" data-toggle="modal" data-target="#questionEditModal"></i></a>
					</li>
					<li>
						<a href="#" @click.prevent="destroyQuestion(question._id)"><i class="fa fa-trash"></i></a>
					</li>
				</ul>
			</footer>
		</div>
		<!-- /.content-item -->

		<div class="answer-area">
			<h3 class="widget-title">Jawaban
				<span>
					<button class="btn btn-primary btn-new-answer" data-toggle="modal" data-target="#answerModal">Tambah Jawaban</button>
				</span>
			</h3>

			<div class="answer-wrap">
				<div class="answer-item" v-for="(answer, index) in answers" :key="index">
					<h5 class="author">{{ answer.username }}</h5>
					<div class="answer-content">
						{{ answer.content }}
					</div><!-- /.answer-content -->

					<footer class="vote-area">
						<ul class="flat-list list-inline vote-list">
							<li>
								<a href="#" class="vote-button">
									<i class="fa fa-thumbs-o-up"></i>
									<span>{{ answer.uservoteList.length }}</span>
								</a>
							</li>
							<li>
								<a href="#" @click.prevent="destroyAnswer(index, answer)"><i class="fa fa-trash"></i></a>
							</li>
						</ul>
					</footer>
				</div><!-- /.answer-item -->
			</div>
			<!-- /.answer-wrap -->
		</div><!-- /.answer-area -->

		<AnswerModal :question="question" @do-new-answer="setNewAnswer"></AnswerModal>
		<QuestionEditModal :question="question" @do-update-question="setUpdatedQuestion"></QuestionEditModal>
	</div>
	<!-- /.content-wrapper -->

</template>

<script>
	import AnswerModal from '@/components/AnswerModal'
	import QuestionEditModal from '@/components/QuestionEditModal'
	import { mapState, mapActions } from 'vuex'

	export default {
		name: 'DetailContent',
		props: ['questionId'],
		components: {
			AnswerModal,
			QuestionEditModal
		},
		data () {
			return {
				question: {},
				answers: [],
				qusetionVoteLength: 0,
			}
		},

		methods: {
			...mapActions([
				'voteQuestion',
				'removeQuestion',
			]),

			setUpdatedQuestion(payload){
				this.question = payload;
			},

			setNewAnswer(payload){
				this.question.answerList.push(payload)
			},

			destroyQuestion(payload) {
				this.removeQuestion(payload);
				this.question = {
					_id : '',
					title: '',
					content: '',
					createdAt: '',
					owner: '',
					tagList: [],
					uservoteList: [],
					answerList: []
				}

				this.$router.push('/');
				this.answer = []
			},

			destroyAnswer(index, answer) {
				this.$http.delete(`/api/answers/delete/${answer._id}/question/${this.question._id}`, { headers: { token: this.loggedinUser.token } })
					.then(data => {
						console.log('Answer deleted');
						this.question.answerList.splice(index, 1);

					}).catch(err => {
						console.log({message:'Something Wrong on delete answer', error: err.message})
						alert("Delete answer Fail")
					});
			},

		  getQuestionById (questionId) {
		    this.$http.get('/api/questions/'+questionId)
		    	.then(({data}) => {
		    		if (data) {
		    			// console.log(data);
		    			this.question = data;
		    			this.answers = data.answerList
		    			this.qusetionVoteLength = data.uservoteList.length
		    		}

		    	}).catch(err => console.log({message:'Something Wrong getting single question', error: err.message}));
		  },

		  doVoteQuestion(question) {
				// console.log(question.uservoteList)

				if (this.loggedinUser.accountId !== null && this.loggedinUser.accountId !== '') {
					this.voteQuestion({
						questionId: question._id,
						accountId: this.loggedinUser.accountId,
					})

					let indexVoteQuestion = this.question.uservoteList.indexOf(this.loggedinUser.accountId);

					if (indexVoteQuestion >= 0) {
						this.question.uservoteList.splice(indexVoteQuestion, 1);
						this.qusetionVoteLength -= 1
					} else {
						this.question.uservoteList.push(this.loggedinUser.accountId)
						this.qusetionVoteLength += 1
					}

				} else {
					alert("Login dahulu sebelum vote");
				}
			},

		 /* getAnswers() {
		  	this.answers = this.answers.concat(this.question.answerList);
		  }*/
		},

		computed: {
			...mapState([
				'questions',
				'loggedinUser'
			])
		},

		created() {
			this.getQuestionById(this.questionId);
		},

		mounted() {
			this.getQuestionById(this.questionId)
		},

		watch: {
			questionId(newId) {
				this.getQuestionById(newId)
			}
		}
	}
</script>

<style scoped>
	.btn-new-answer {
		margin-left: 3rem;
	}
</style>