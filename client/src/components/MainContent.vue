<template>
	<div class="content-wrapper">
		<div class="content-item" v-for="(question, index) in questions">
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
							<span>{{ question.uservoteList.length }}</span>
						</a>
					</li>
					<li>
						<a href="#"><i class="fa fa-pencil" @click.prevent="editQuestion(question)" data-toggle="modal" data-target="#questionModal"></i></a>
					</li>
					<li>
						<a href="#" @click.prevent="removeQuestion(question._id)"><i class="fa fa-trash"></i></a>
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