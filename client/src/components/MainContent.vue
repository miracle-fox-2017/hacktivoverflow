<template>
	<div class="content-wrapper">
		<div class="content-item" v-for="(question, index) in questions">
			<h2 class="content-tile">
				<router-link :to="`/${question._id}`">{{ question.title }}</router-link>
			</h2><!-- /.content-tile -->

			<div class="question-content">
				<div v-html="question.content.substring(0, 250)"></div>
			</div><!-- /.question-content -->

		<!-- 	<h5 class="author">
				<i class="fa fa-user small-mr"></i> {{ question.owner.username }} <i class="fa fa-calendar small-ml small-mr"></i> {{ getHumanDate(question.createdAt) }}
			</h5> -->

			<footer class="vote-area">
				<ul class="flat-list list-inline vote-list">
					<li>
						<a href="#" class="vote-button" @click.prevent="doVoteQuestion(question)" title="Vote">
							<i class="fa fa-thumbs-o-up"></i>
							<span>{{ question.uservoteList.length }}</span>
						</a>
					</li>
					<li>

						<router-link :to="question._id" title="Jawaban">
							<i class="fa fa-comments"></i>
							<span>{{ question.answerList.length }}</span>
						</router-link>
					</li>
					<li v-if="loggedinUser.token !== '' && loggedinUser.token !== null">
						<a href="#" title="Ubah"><i class="fa fa-pencil" @click.prevent="editQuestion(question)" data-toggle="modal" data-target="#questionModal"></i></a>
					</li>
					<li v-if="loggedinUser.token !== '' && loggedinUser.token !== null">
						<a title="Hapus" href="#" @click.prevent="removeQuestion(question._id)"><i class="fa fa-trash"></i></a>
					</li>
				</ul>
			</footer>
		</div>
		<!-- /.content-item -->
	</div>
	<!-- /.content-wrapper -->
</template>

<script>
import { mapState, mapActions } from 'vuex'

	export default {
		name: 'MainContent',
		data () {
			return {

			}
		},
		methods: {
			...mapActions([
				'getQuestions',
				'voteQuestion',
				'removeQuestion',
				'initEditQuestion'
			]),

			doVoteQuestion(question) {
				// console.log(question.uservoteList)

				if (this.loggedinUser.accountId !== null && this.loggedinUser.accountId !== '') {
					this.voteQuestion({
						questionId: question._id,
						accountId: this.loggedinUser.accountId,
					})
				} else {
					alert("Login dahulu sebelum vote");
				}
			},

			editQuestion(data) {
				let question = {
					questionId: data._id,
					title: data.title,
					content: data.content,
					tagList: data.tagList
				}

				this.initEditQuestion(question);
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
			this.getQuestions();
		},

		mounted() {
			this.getQuestions();
		}
	}
</script>

<style scoped>

</style>