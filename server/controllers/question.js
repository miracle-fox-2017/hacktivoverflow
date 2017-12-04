const Question = require('../models/question')
const Comment = require('../models/comment')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

//find one Question
function findAll(req,res) {
	Question.find().populate('userId').populate('comment').exec()
	 .then(result => {
	 	res.send(result)
	 })
	  .catch(err => {
	  	res.status(500).send(err)
	  })
}

function findOne(req,res) {
	Question.findOne({
		_id : req.params.questionId
	}).populate('userId').populate('comment').exec()
	 .then(result => {
	 	res.send(result)
	 })
	  .catch(err => {
	  	res.status(500).send(err)
	  })
}

function create(req,res) {
	console.log(req.body)
	let question = new Question({
		userId : req.params.userId,
		title : req.body.title,
		desc : req.body.desc,
		userName : req.body.userName
	})
	question.save()
	.then(result => {
		res.send(result)
	})
	.catch(err => {
		res.status(500).send(err)
	})
}

function remove(req,res) {
	Question.remove({
		_id : req.params.questionId
	})
	.then(result => {
		res.send(result)
	})
	.catch(err => {
		res.status(500).send(err)
	})
}

function deleteCommend(req,res) {
	Comment.remove({
		_id : req.params.commentId
	})
	.then(result => {
		console.log("masuk sini coy",result)
		res.send(result)
	})
	.catch(err => {
		res.status(500).send(err)
	})
}

function update(req,res) {
	Question.findOne({
		_id : req.params.questionId
	}).populate('userId').exec()
	.then(question => {
		question.set({
			userId  	: question.userId,
			title   	: req.body.title || question.title,
			desc    	: req.body.desc || question.desc,
			like    	: question.like,
			comment 	: question.comment,
			createdAt 	: Date.now()
		})
		question.save((err, result) => {
			if(err) res.status(500).send(err)
			res.send(result)
		})
	})
	.catch(err => {
		res.status(500).send(err)
	})
}

function answer(req,res) {
	let comment = new Comment({
		userId : req.params.userId,
		questionId : req.params.questionId,
		desc : req.body.desc,
	})
	comment.save()
	.then(result => {
		Question.findOne({
			_id : req.params.questionId
		})
		.then(question => {
			question.comment.push(result._id)
			question.save()
			res.send(question)
		})
		.catch(err => {
			res.status(500).send(err);
		})
	})
	.catch(err => {
		res.status(500).send(result);
	})
}


function vote(req,res) {
	Question.findOne({
		_id : req.params.questionId
	})
	.then(question => {
		if(question.like.indexOf(req.params.userId) != -1){
			let index = question.like.indexOf(req.params.userId)
			question.like.splice(index,1)
			question.save()
			res.send(question)
		}else {
			question.like.push(req.params.userId)
			question.save()
			res.send(question)
		}
	})
	.catch(err => {
		res.status(500).send(err)
	})
}

function voteComment(req,res) {
	Comment.findOne({
		_id : req.params.commentId
	})
	.then(comment => {
		if(comment.commentLike.indexOf(req.params.userId) != -1){
			let index = comment.commentLike.indexOf(req.params.userId)
			comment.commentLike.splice(index,1)
			comment.save()
			res.send(comment)
		}else {
			comment.commentLike.push(req.params.userId)
			comment.save()
			res.send(comment)
		}
	})
	.catch(err => {
		res.status(500).send(err)
	})
}

function findComment(req,res) {
	Comment.find({
		questionId : req.params.questionId
	}).populate('userId').populate('questionId').exec()
	.then(comment => {
		res.send(comment)
	})
	.catch(err => {
		res.status(500).send(err)
	})
}

module.exports = {
	findAll,
	findOne,
	create,
	answer,
	remove,
	update,
	deleteCommend,
	vote,
	findComment,
	voteComment
}