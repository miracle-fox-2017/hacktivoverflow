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
						<a href="#" class="vote-button" @click.prevent="doVoteQuestion(index, question)">
							<i class="fa fa-thumbs-o-up"></i>
							<span>{{ question.uservoteList.length }}</span>
						</a>
					</li>
					<li>
						<a href="#"><i class="fa fa-pencil"></i></a>
					</li>
					<li>
						<a href="#"><i class="fa fa-trash"></i></a>
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
				'voteQuestion'
			]),

			doVoteQuestion(index, question) {
				console.log('~~~~~~~~CHECK LOGGEDIN');
				console.log(this.loggedinUser);

				if (this.loggedinUser.accountId !== null && this.loggedinUser.accountId !== '') {
					this.voteQuestion({
						questionId: question._id,
						accountId: this.loggedinUser.accountId,
						questionIndex: index
					})
				} else {
					alert("Login dahulu sebelum vote");
				}
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
		}
	}
</script>

<style scoped>

</style>