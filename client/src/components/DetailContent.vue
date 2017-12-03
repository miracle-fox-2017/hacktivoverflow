<template>

	<div class="content-wrapper">
		<div class="content-item">
			<h2 class="content-tile">
				<router-link :to="`/${question._id}`">{{ question.title }}</router-link>
			</h2><!-- /.content-tile -->

			<div class="question-content">
				<div v-html="question.content"></div>
			</div><!-- /.question-content -->

			<h5 class="author">
				<i class="fa fa-user small-mr"></i> {{ questionOwner.username }} <i class="fa fa-calendar small-ml small-mr"></i> {{ getHumanDate(question.createdAt) }}
			</h5>

			<footer class="vote-area">
				<ul class="flat-list list-inline vote-list">
					<li>
						<a href="#" class="vote-button" @click.prevent="doVoteQuestion(question)">
							<i class="fa fa-thumbs-o-up"></i>
							<span>{{ qusetionVoteLength }}</span>
						</a>
					</li>
					<li v-if="loggedinUser.token !== '' && loggedinUser.token !== null">
						<a href="#"><i class="fa fa-pencil" data-toggle="modal" data-target="#questionEditModal"></i></a>
					</li>
					<li v-if="loggedinUser.token !== '' && loggedinUser.token !== null">
						<a href="#" @click.prevent="destroyQuestion(question._id)"><i class="fa fa-trash"></i></a>
					</li>
				</ul>
			</footer>
		</div>
		<!-- /.content-item -->

		<div class="answer-area">
			<h3 class="widget-title answer-title" id="answer-title">Jawaban untuk <em>"{{ question.title }}"</em></h3>
			<div v-if="loggedinUser.token !== '' && loggedinUser.token !== null">
				<button class="btn btn-primary small-mb" data-toggle="modal" data-target="#answerModal"><i class="fa fa-plus small-mr"></i> Jawaban Baru</button>
				<br /><br />
			</div>

			<div class="answer-wrap">
				<div class="answer-item" v-for="(answer, index) in answers" :key="index">
					<div class="answer-content">
						<div v-html="answer.content"></div>
					</div><!-- /.answer-content -->

					<h5 class="author">
						<i class="fa fa-user small-mr"></i> {{ answer.username }} <i class="fa fa-calendar small-ml small-mr"></i> {{ getHumanDate(answer.createdAt) }}
					</h5>

					<footer class="vote-area">
						<ul class="flat-list list-inline vote-list">
							<li>
								<a href="#" class="vote-button" @click.prevent="doVoteAnswer(index, answer)">
									<i class="fa fa-thumbs-o-up"></i>
									<span>{{ answer.uservoteList.length }}</span>
								</a>
							</li>
							<li v-if="loggedinUser.token !== '' && loggedinUser.token !== null">
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
				question: {
					createdAt: new Date()
				},
				answers: [],
				qusetionVoteLength: 0,
				answerCount: 0,
				questionOwner : {}
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
					answerList: [],
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
		    			this.questionOwner = data.owner
		    			this.answers = data.answerList;
		    			this.answerCount = data.answerList.length;
		    			this.qusetionVoteLength = data.uservoteList.length
		    		}

		    	}).catch(err => console.log({message:'Something Wrong getting single question', error: err.message}));
		  },

		  doVoteQuestion(question) {
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

		 doVoteAnswer(index, answer) {
		 	if (this.loggedinUser.accountId !== null && this.loggedinUser.accountId !== '') {
		 		this.$http.put(`/api/answers/update/${answer._id}/vote/${this.loggedinUser.accountId}`, {}, { headers: { token: this.loggedinUser.token } })
					.then(data => {
						console.log('Vote updated');

						let answervoteList = this.question.answerList[index].uservoteList;
						let checkVoteExist = answervoteList.indexOf(this.loggedinUser.accountId)

						if (checkVoteExist < 0) {
							answervoteList.push(this.loggedinUser.accountId)

						} else {
							answervoteList.splice(checkVoteExist, 1);
						}

					}).catch(err => {
						console.log({message:'Something Wrong on vote answer', error: err.message})
						alert("Vote answer Fail")
					});
		 	} else {
				alert("Login dahulu sebelum vote");
			}
		 },

		 getHumanDate(date) {
		 	return new Date(date).toString()
		 }
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

	.answer-title {
		font-weight: 500;
		margin: 1rem 0 2rem 0;
	}
</style>