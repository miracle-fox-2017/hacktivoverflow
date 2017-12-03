import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const rootUrl = "http://localhost:3002";

const http = axios.create({
  baseURL: rootUrl
})

const findIndexByKeyValue = (arraytosearch, key, valuetosearch) => {
	for (var i = 0; i < arraytosearch.length; i++) {

		if (arraytosearch[i][key] == valuetosearch) {
			return i;
		}
	}

	return null;
}

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		questions: [],
		loggedinUser: {
			accountId: localStorage.getItem('accountId'),
			email: localStorage.getItem('email'),
			full_name: localStorage.getItem('full_name'),
			accountId: localStorage.getItem('accountId'),
			token: localStorage.getItem('token'),
			username: localStorage.getItem('username'),
		},

		editedQuestion: {
			questionId: '',
			title: '',
			content : '',
			tags: []
		},
	},

	mutations: {
		setQuestions(state, payload) {
			state.questions = payload
		},

		setNewQuestion(state, payload) {
			state.questions.unshift(payload)
		},

		setNewAnswer(state, payload) {
			// Find voted question index by _id, if found return the question index
			let targetQuestionIndex = findIndexByKeyValue(state.questions, "_id", payload.questionId);

			if (targetQuestionIndex !== null) {
				state.questions[targetQuestionIndex].answerList.unshift(payload.answer)
			}
			// state.questions.answerList.unshift(payload)
		},

		setVoteQuestion(state, payload) {
			// Find voted question index by _id, if found return the question index
			let targetQuestionIndex = findIndexByKeyValue(state.questions, "_id", payload.questionId);

			if (targetQuestionIndex !== null) {
				// Find accountId from the current question, if found return index
				let findUservoteIndex = Array.from(state.questions[targetQuestionIndex].uservoteList).indexOf(payload.accountId);

				if (findUservoteIndex >= 0) {
					state.questions[targetQuestionIndex].uservoteList.splice(findUservoteIndex, 1);
				} else {
					state.questions[targetQuestionIndex].uservoteList.push(payload.accountId)
				}
			}
		},

		setLoggedinUser(state, payload) {
			state.loggedinUser = payload;
		},

		setLogout(state) {
			state.loggedinUser = {
				email: '',
				full_name: '',
				accountId: '',
				token: '',
				username: '',
			}
		},

		destroyQuestion(state, payload){
				// Find voted question index by _id, if found return the question index
			let targetQuestionIndex = findIndexByKeyValue(state.questions, "_id", payload.questionId);

			if (targetQuestionIndex >= 0) {
				state.questions.splice(targetQuestionIndex, 1)
			}
		},

		setEditedQuestion(state, payload) {
			state.editedQuestion = payload;
		},

		questionUpdated(state, payload) {
			let targetQuestionIndex = findIndexByKeyValue(state.questions, "_id", payload.questionId);

			if (targetQuestionIndex >= 0) {
				state.questions.splice(targetQuestionIndex, 1, payload);
			}

			state.editedQuestion = {
				questionId: '',
				title: '',
				content : '',
				tags: []
			}
		}
	},

	actions: {
		getQuestions(context) {
			http.get('/api/questions')
			.then(({data}) => {
				context.commit('setQuestions', data);

			}).catch(err => alert(err.message));
		},

		createQuestion(context, newQuestion) {
			http.post('/api/questions/create', newQuestion, { headers: { token: context.rootState.loggedinUser.token } })
			.then(({data}) => {
				console.log(data.data);

				context.commit('setNewQuestion', data.data);
				alert("Pertanyaan berhasil dibuat");

			}).catch(err => alert('Something Wrong on new Question'));
		},

		createAnswer(context, newAnswer) {
			http.post('/api/answers/question/'+newAnswer.questionId, newAnswer, { headers: { token: context.rootState.loggedinUser.token } })
			.then(({data}) => {

				context.commit('setNewAnswer', { questionId: newAnswer.questionId, answer: data.data });
				alert("Jawaban berhasil dibuat");

			}).catch(err => alert('Something Wrong on new Question'));
		},

		voteQuestion(context, payload) {
			if (payload.questionId !== null) {
				http.put(`/api/questions/update/${payload.questionId}/vote/${context.rootState.loggedinUser.accountId}`, {}, { headers: { token: context.rootState.loggedinUser.token } })
					.then(({data}) => {
						console.log(payload)
						 context.commit('setVoteQuestion', payload);

					}).catch(err => alert('Harap login dahulu sebelum Vote pertanyaan'));
			} else {
				 alert("Harap login dahulu sebelum Vote pertanyaan")
			}
		},

		removeQuestion(context, payload) {
			if (payload) {
				let config = {
					headers: {
						token: context.rootState.loggedinUser.token
					}
				}

				http.delete(`/api/questions/delete/${payload}`,config)
					.then(({data}) => {
						 context.commit('destroyQuestion', payload)

					}).catch(err => alert("Harap login dahulu sebelum hapus pertanyaan"));
			} else {
				 alert("Harap login dahulu sebelum hapus pertanyaan")
			}
		},

		setLogin(context, payload) {
			http.post('/api/signin', { username: payload.username, password: payload.password })
			.then(({data}) => {
				console.log({ message: 'Success Login', data: data});
				alert("Login Success");

				localStorage.setItem("email", data.email);
				localStorage.setItem("full_name", data.full_name);
				localStorage.setItem("accountId", data.id);
				localStorage.setItem("token", data.token);
				localStorage.setItem("username", data.username);

				let loginData = {
					accountId: data.id,
					email: data.email,
					full_name: data.full_name,
					accountId: data.id,
					token: data.token,
					username: data.username,
				};

				context.commit('setLoggedinUser', loginData)


			}).catch(err => {
				alert("Gagal Login. Username / Password salah")
				console.error({message:'Something Wrong on Login', error: err.message})
			});
		},

		updateQuestion(context, payload) {
			let updatedQuestion = payload;

			http.put(`/api/questions/update/${payload.questionId}`, updatedQuestion, { headers: { token: context.rootState.loggedinUser.token } })
				.then(({data}) => {

					context.commit('questionUpdated', data.data);
				}).catch(err => alert('You are unauthorized to update question'));
		},

		doLogout(context) {
			localStorage.removeItem("email");
			localStorage.removeItem("full_name");
			localStorage.removeItem("accountId");
			localStorage.removeItem("token");
			localStorage.removeItem("username");

			alert("Logout berhasil");

			context.commit('setLogout');
		},

		initEditQuestion(context, payload) {
			context.commit('setEditedQuestion', payload)
		}
	}
})