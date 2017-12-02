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
		answer: []
	},
	mutations: {
		getAllQuestion (state, payload) {
			console.log(payload.questions.data)
			state.questions = payload.questions.data
		},

		getQuestion (state, payload) {
			state.question = payload.question .data
		},

		addQuestion (state, payload) {
			console.log("masuk sini ga")
			console.log(payload)
			state.questions.push(payload.newQuestion.data)
		},
		deleteQuestion (state, payload) {
			console.log(payload)
			console.log("masuk delete mutations")
			state.questions.forEach((question,index) => {
				console.log(question)
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
			console.log(payload.comment.data)
			state.answer.push(payload.comment.data)
		},
		addComment (state, payload) {
			console.log(payload)
			state.answer = payload.newComment.data.comment
		}
	},
	actions: {
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
			ax.post('questions/5a21183d332c5e732fd16a53', {
				title: payload.title,
				desc: payload.desc
			})
			.then(result => {
				console.log(result)
				context.commit('addQuestion', {
					newQuestion : result
				})
			})
			.catch(err => {
				console.log(err)
			})
		},
		deleteQuestion (context, payload) {
			ax.delete(`questions/${payload}`, {
				_id : payload.questionId
			})
			.then(result => {
				context.commit('deleteQuestion', {
					deleteQuestion : payload
				})
			})
			.catch(err => {
				console.log(err)
			})
		},
		voteQuestion (context, payload) {
			ax.put(`questions/${payload}/vote/5a21183d332c5e732fd16a53`)
			.then(result => {
				context.commit('voteQuestion', {
					voteUpdate : "5a21183d332c5e732fd16a53",
					questionId : payload
				})
			})
			.catch(err => {
				console.log(err)
			})
		},
		getComment (context, payload) {
			console.log(payload)
			ax.get(`questions/comment/${payload}`)
			.then(result => {
				context.commit('getComment', {
					comment : result
				})
			})
			.catch(err => {
				console.log(err);
			})
		},
		addComment (context, payload) {
			console.log(payload)
			ax.post(`questions/${payload.questionId}/answer/5a21183d332c5e732fd16a53`, {
				desc : payload.desc
			})
			.then(result => {
				context.commit('addComment', {
					newComment : result
				})
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
}) 