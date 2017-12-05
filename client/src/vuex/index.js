import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let ax = Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000'
})

// 5a21183d332c5e732fd16a53 dummy user Ahmad
// 5a217620c988a94cedbc1ecf dummy Shahab

export default new Vuex.Store({
	state: {
		questions: '',
		question: '',
		answer: '',
		token: localStorage.getItem('token'),
		name:localStorage.getItem('name'),
		userId: localStorage.getItem('userId'),
		checkIn: false
	},
	mutations: {
		getAllQuestion (state, payload) {
			state.questions = payload.questions.data
		},

		getQuestion (state, payload) {
			state.question = payload.question .data
		},

		addQuestion (state, payload) {
			state.questions.unshift(payload.newQuestion.data)
		},
		deleteQuestion (state, payload) {
			state.questions.forEach((question,index) => {
				if(payload.deleteQuestion == question._id){
					state.questions.splice(index,1)
				}
			})
		},
		voteQuestion (state, payload) {
			state.questions.forEach((question,i) => {
				if(question._id == payload.questionId){
					let searchLike = question.like.indexOf(payload.voteUpdate);
					if(searchLike == -1 ){
						state.questions[i].like.push(payload.voteUpdate)
					}else{
						state.questions[i].like.splice(searchLike,1)
					}
				}
			})
		},
		getComment (state, payload) {
			state.answer = payload.comment
		},
		addComment (state, payload) {
			state.answer = payload.newComment.data.comment
		},
		commentRemove (state, payload) {
			state.answer.data.forEach((com, index) => {
				if(com._id == payload.deleteComment){
					state.answer.data.splice(index,1)
				}
			})
		},
		commentVote (state, payload) {
			state.answer.data.forEach((comment,i) => {
				if(comment._id == payload.commentId){
					let searchLike = comment.commentLike.indexOf(payload.voteUpdate);
					if(searchLike == -1 ){
						state.answer.data[i].commentLike.push(payload.voteUpdate)
					}else{
						state.answer.data[i].commentLike.splice(searchLike,1)
					}
				}
			})			
		},
		signIn (state, payload) {
			state.token = payload.userData.data.token,
			state.name = payload.userData.data.user.name,
			state.userId = payload.userData.data.user._id
			state.checkIn = true
		},
		signOut (state, payload) {
			state.checkIn = false
			localStorage.clear()
      		alert(' logout Success ')
		},
		editQuestion (state, payload) {
			state.questions.forEach((question,index) => {
				if(question._id == payload.questionId){
					state.questions.splice(index,1,payload.updatedQuestion)
				}
			})
			alert(' update success ')
		},
		isCheckIn (state, payload) {
			if(localStorage.getItem('token') != undefined){
				state.checkIn = true
			}else{
				state.checkIn = false
			}
		}
	},
	actions: {
		signIn (context,payload) {
	      ax.post('users/signin', {
	        username : payload.username,
	        password : payload.password
	      })
	      .then(result => {
	        localStorage.setItem("name", result.data.user.name);
	        localStorage.setItem("token", result.data.token);
	        localStorage.setItem("userId", result.data.user._id);
	        alert(' Login Success ')
	     	context.commit('signIn', {
	     		userData : result
	     	})
	      })
	      .catch(err => {
	      	alert(' try again or register ')
	        console.log(err);
	      })
		},

		signUp (context, payload) {
	      ax.post('users/signup', {
	        name : payload.name,
	        username : payload.username,
	        email : payload.email,
	        password : payload.password
	      })
	      .then(result => {
	        alert(' Register Success ')
	      })
	      .catch(err => {
	        alert(' Register Failed ')
	      })
		},

		signOut (context) {
			context.commit('signOut')
		},

		getAllQuestion (context)  {
			ax.get('questions')
			.then(result => {
				context.commit('getAllQuestion', {
					questions : result
				})
			})
			.catch(err => {
				console.log(err)
			})
		}, 

		getQuestion (context, questionId) {
			ax.get(`questions/${questionId}`)
			.then(result => {
				context.commit('getQuestion', {
					question : result
				})
			})
		},

		addQuestion (context, payload) {
			ax.post(`questions/${context.rootState.userId}`, {
				title: payload.title,
				desc: payload.desc,
				userName: context.rootState.name

			}, {
				headers : {
					token : context.rootState.token,
					userId: context.rootState.userId,
				}
			})
			.then(result => {
				context.commit('addQuestion', {
					newQuestion : result
				})
			})
			.catch(err => {
				alert(' Login First ')
				console.log(err)
			})
		},
		deleteQuestion (context, payload) {
			ax.delete(`questions/${payload}`,{
				headers : {
					token  : context.rootState.token,
					userId : context.rootState.userId
				}
			})
			.then(result => {
				context.commit('deleteQuestion', {
					deleteQuestion : payload
				})
			})
			.catch(err => {
				alert(' Cannot Delete this Post ')				
				console.log(err)
			})
		},
		voteQuestion (context, payload) {
			ax.put(`questions/${payload}/vote/${context.rootState.userId}`,{},{
				headers : {
					token : context.rootState.token,
					userId: context.rootState.userId
				}
			})
			.then(result => {
				context.commit('voteQuestion', {
					voteUpdate : context.rootState.userId,
					questionId : payload
				})
			})
			.catch(err => {
				alert(' you cant like this post LOGIN first ')
				console.log(err)
			})
		},
		getComment (context, payload) {
				ax.get(`questions/comment/${payload}`)
				.then((result) => {
					context.commit('getComment', {
						comment : result
					})
				})
				.catch(err => {
					alert(' you cant comment this post LOGIN first ')
					console.log(err);
				})				
		},
		addComment (context, payload) {
			ax.post(`questions/${payload.questionId}/answer/${context.rootState.userId}`, {
				desc : payload.desc
			}, {
				headers : {
					token : context.rootState.token,
					userId: context.rootState.userId
				}
			})
			.then(result => {	
				ax.get(`questions/comment/${payload.questionId}`)
				.then((res) => {
					context.commit('getComment', {
						comment : res
					})
				})
				.catch(err => {
					alert('login first before comment')
					console.log(err);
				})				
			})
			.catch(err => {
				alert('login first')
				console.log(err)
			})
		},
		commentRemove (context,payload) {
			ax.delete(`questions/comment/${payload}`, {
				headers : {
					token : context.rootState.token,
					userId: context.rootState.userId
				}
			})
			.then(result => {
				context.commit('commentRemove', {
					deleteComment : payload
				})
			})
			.catch(err => {
				alert(' Cannot Delete this Comment ')				
				console.log(err)
			})
		},
		commentVote (context,payload) {
			ax.put(`questions/comment/${payload}/${context.rootState.userId}`, {}, {
				headers : {
					token : context.rootState.token,
					userId: context.rootState.userId
				}
			})
			.then(result => {
				context.commit('commentVote', {
					voteUpdate : context.rootState.userId,
					commentId : payload
				})
			})
			.catch(err => {
				console.log(err)
			})			
		},
		editQuestion (context, payload) {
			ax.put(`questions/${payload.questionId}`, {
				title : payload.title,
				desc : payload.desc
			}, {
				headers : {
					token : context.rootState.token,
					userId : context.rootState.userId
				}
			})
			.then (result => {
				context.commit('editQuestion', {
					questionId : payload.questionId,
					updatedQuestion : result.data
				})
			})
			.catch(err => {
				alert(' cannot edit this questions ')
				console.log(err)
			})
		},
		isCheckIn (context){
			context.commit('isCheckIn')
		}
	}
}) 