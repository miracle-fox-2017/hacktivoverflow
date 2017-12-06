<template>
  <div>
  <header class="clearfix">
			
  </header>

		<div class="chat">		
			<div class="chat-history">
				<div class="chat-message clearfix">
					<div class="chat-message-content clearfix" v-for="item in answers" :key="item._id">	
						<span class="chat-time">13:35</span>
						<h5 v-if="item.userId">{{ item.userId.username }}</h5>
            <br>
						<p>{{ item.answer }}</p>
						
							<div id="button">
								<span>
								<div>
									<a @click="likes(item.userId, item._id)"><i class="fa fa-thumbs-up" aria-hidden="true"></i></a>
								</div>
								<div>
									<a @click="disLikes(item.userId, item._id)">
									<i class="fa fa-thumbs-down" aria-hidden="true"></i></a>
								</div>
								<div>
									{{ item.votes.length }} Likes
								</div>
								<a class="button is-danger is-hovered" @click="remove(item._id)" style="margin-left:200px;">Delete</a>							
								</span>
							</div>
						<br>
            <hr>
					</div> <!-- end chat-message-content -->
				</div> <!-- end chat-message -->
			 </div> <!-- end chat-history -->
       <hr>
			<form @submit.prevent="post()">
					<textarea class="textarea" v-model="comment" placeholder="Type your answer"/>
					<input type="submit" value="submit">
			</form>
      </div> <!-- end chat -->
    </div> <!-- end live-chat -->

</template>


<script>
/* eslint-disable */
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'Answer',
  data () {
    return {
			comment: '',
    }
	},
  computed: {
		...mapState([
		'question',
		'answers',
		'arrVotes'
		])
  },
  methods: {
		...mapActions([
			'getAnswerByQuestionId',
			'postComment',
			'removeOne',
			'findByIdAndUpdate',
			'removeElVotesById'
		]),
    post () {
      console.log(this.question)
      let obj = {
    		answer: this.comment,
        questionId: this.question._id
			}
			console.log(obj)
			this.postComment(obj)
			this.comment = ''
		},
		remove (id) {
			this.removeOne(id)
		},
		likes (userId, id) {
			console.log(userId)
			console.log('this', this.answers)
			let obj = {
				userId: localStorage.getItem('id'),
				id: id
			}
			this.liked = false
			console.log(this.liked,'0-0-0-0-')
			this.findByIdAndUpdate(obj)
		},
		disLikes (userId, id) {
			let obj = {
				userId: localStorage.getItem('id'),
				id: id
			}
			this.liked = true
			console.log(this.liked,'0-0-00-9-09-09-0-0-')
			this.removeElVotesById(obj)
		},
		votesLen : function (value) {
			return value.length
		}
	}
}
</script>

<style scoped>
  @charset "utf-8";
/* ---------- GENERAL ---------- */

body {
	background: #e9e9e9;
	color: #9a9a9a;
	font: 100%/1.5em "Droid Sans", sans-serif;
	margin: 0;
}

a { text-decoration: none; }

fieldset {
	border: 0;
	margin: 0;
	padding: 0;
}

h4, h5 {
	line-height: 1.5em;
	margin: 0;
}

hr {
	background: #e9e9e9;
    border: 0;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    height: 1px;
    margin: 0;
    min-height: 1px;
}

img {
    border: 0;
    display: block;
    height: auto;
    max-width: 100%;
}

input {
	border: 0;
	color: inherit;
    font-family: inherit;
    font-size: 100%;
    line-height: normal;
    margin: 0;
}

p { margin: 0; }

.clearfix { *zoom: 1; } /* For IE 6/7 */
.clearfix:before, .clearfix:after {
    content: "";
    display: table;
}
.clearfix:after { clear: both; }

/* ---------- LIVE-CHAT ---------- */

#live-chat {
	bottom: 0;
	font-size: 12px;
	right: 24px;
	position: fixed;
	width: 300px;
}

#live-chat header {
	background: #293239;
	border-radius: 5px 5px 0 0;
	color: #fff;
	cursor: pointer;
	padding: 16px 24px;
}

#live-chat h4:before {
	background: #1a8a34;
	border-radius: 50%;
	content: "";
	display: inline-block;
	height: 8px;
	margin: 0 8px 0 0;
	width: 8px;
}

#live-chat h4 {
	font-size: 12px;
}

#live-chat h5 {
	font-size: 10px;
}

#live-chat form {
	padding: 24px;
}

#live-chat input[type="text"] {
	border: 1px solid #ccc;
	border-radius: 3px;
	padding: 8px;
	outline: none;
	width: 234px;
}

.chat-message-counter {
	background: #e62727;
	border: 1px solid #fff;
	border-radius: 50%;
	display: none;
	font-size: 12px;
	font-weight: bold;
	height: 28px;
	left: 0;
	line-height: 28px;
	margin: -15px 0 0 -15px;
	position: absolute;
	text-align: center;
	top: 0;
	width: 28px;
}

.chat-close {
	background: #1b2126;
	border-radius: 50%;
	color: #fff;
	display: block;
	float: right;
	font-size: 10px;
	height: 16px;
	line-height: 16px;
	margin: 2px 0 0 0;
	text-align: center;
	width: 16px;
}

#button {
	margin-top: 20%;
}


.chat {
	background: #fff;
}

.chat-history {
	height: 252px;
	padding: 8px 24px;
	overflow-y: scroll;
}

.chat-message {
	margin: 16px 0;
  text-align: left;
}

.chat-message img {
	border-radius: 50%;
	float: left;
}

.chat-message-content {
	margin-left: 56px;
}

.chat-time {
	float: right;
	font-size: 10px;
}

.chat-feedback {
	font-style: italic;	
	margin: 0 0 0 80px;
}

.fa-thumbs-up:before , .fa-thumbs-down:before  {
	padding-right: 118px;
	font-size: 2.2rem;
}
</style>
