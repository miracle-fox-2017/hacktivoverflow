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
				<ul class="flat-list list-inline">
					<li><a href="#" class="vote-button">Vote</a></li>
					<!-- <li><p>{{ question.uservoteList.length }} Votes</p></li> -->
				</ul>
			</footer>
		</div>
		<!-- /.content-item -->

		<div class="answer-area">
			<h3 class="widget-title">Jawaban</h3>

			<div class="answer-wrap">
				<div class="answer-item" v-for="(answer, index) in answers" :key="index">
					<h4 class="widget-title answer-title">{{ answer.title }}</h4>
					<span class="author">{{ answer.owner }}</span>
					<div class="answer-content">
						{{ answer.content }}
					</div><!-- /.answer-content -->
				</div><!-- /.answer-item -->
			</div>
			<!-- /.answer-wrap -->
		</div><!-- /.answer-area -->
	</div>
	<!-- /.content-wrapper -->

</template>

<script>
	export default {
		name: 'DetailContent',
		props: ['questionId'],
		data () {
			return {
				question: '',
				answers: []
			}
		},

		methods: {
		  getArticleById () {
		    this.$http.get('/api/questions/'+this.questionId)
		    	.then(({data}) => {
		    		if (data) {
		    			this.question = data;
		    			this.answers = data.answerList
		    			// console.log(data.answerList)
		    		}

		    	}).catch(err => console.log({message:'Something Wrong getting single question', error: err.message}));
		  },

		 /* getAnswers() {
		  	this.answers = this.answers.concat(this.question.answerList);
		  }*/
		},

		created() {
			this.getArticleById();
		}
	}
</script>

<style scoped>

</style>