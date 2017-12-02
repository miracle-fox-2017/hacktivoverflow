const ObjectId = require('mongodb').ObjectId
const Questions = require('../models/questionModel')

const createQuestion = function(req,res){
  let newQuestion = Questions({
    title: req.body.title,
    question_content: req.body.question_content,
    author: req.header.decoded.id
  })
  newQuestion.save().then(function(){
    res.status(201).send('1 Question Created')
  }).catch(function(err){
    res.status(500).send(err.errors.title.message)
    console.log(err, '[-] create task')
  })
}

const findAllQuestion = function(req,res){
  Questions.find().populate('author').then(function(data_Questions){
    res.status(200).send(data_Questions)
  }).catch(function(err){
    console.log(err, '[-] findAll data Questions')
    res.status(500).send(err)
  })
}

const questionsByid = function(req,res){
  let id = {
    _id : ObjectId(req.params.id)
  }
  Questions.findById(id).then(function(data_Questions){
    res.status(200).send(data_Questions)
  }).catch(function(err){
    res.status(500).send(`[-] err find by id Questions`)
  })
}

const updateQuestion = function(req,res){
  // console.log('masuk')
  let id = {
    _id : ObjectId(req.params.id)
  }
  Questions.findById(id).then(function(data_Question){
    // console.log(data_Article)
    data_Question.title = req.body.title,
    data_Question.question_content = req.body.question_content,
    data_Question.author = req.header.decoded.id
    // save
    data_Question.save().then(function(data_Question){
      res.status(201).send({
        message : `[+] 1 Question created`,
        data_Question : data_Question
      })
    }).catch(function(err){
      res.status(500).send(`[-] err update Question`)
    })
  }).catch(function(err){
    res.status(500).send(`[-] err find by id Question`)
  })
}

const destroyQuestions = function(req,res){
  let id = {
    _id : ObjectId(req.params.id)
  }
  Questions.findByIdAndRemove(id).then(function(){
    res.status(200).send(`[-] deleted 1 Questions`)
  }).catch(function(err){
    res.status(500).send(`[-] err delete by id Questions`)
  })
}

module.exports = {
  createQuestion,
  findAllQuestion,
  questionsByid,
  updateQuestion,
  destroyQuestions
}