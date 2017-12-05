const ObjectId = require('mongodb').ObjectId
const Questions = require('../models/questionModel')

const createQuestion = function(req,res){
  let newQuestion = Questions({
    title: req.body.title,
    question_content: req.body.question_content,
    author: req.header.decoded.id
  })
  // console.log(newQuestion)
  newQuestion.save().then(function(newQuestion){
    console.log('create quest controller', newQuestion)
    res.status(201).send(newQuestion)
  }).catch(function(err){
    res.status(500).send(err.errors.title.message)
    console.log(err, '[-] create task')
  })
}

const findAllQuestion = function(req,res){
  Questions.find().populate('author')
  .then(function(data_Questions){
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
  Questions.findById(id).populate('author')
  .then(function(data_Questions){
    res.status(200).send(data_Questions)
  }).catch(function(err){
    res.status(500).send(`[-] err find by id Questions`)
  })
}

const questionsByAuthorid = function(req,res){
  // console.log(req.params.id)
  let author_id = {
    _id : ObjectId(req.params.id)
  }
  Questions.find({ author : author_id }).then(function(data_Questions){
    // console.log(data_Questions)
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
    // console.log('>>>>', data_Question)
    data_Question.title = req.body.title,
    data_Question.question_content = req.body.question_content
    // save
    data_Question.save().then(function(data_Question){
      console.log('[+] 1 question updated')
      res.status(201).send(data_Question)
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
  // console.log('delete controllers question', id)
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
  questionsByAuthorid,
  updateQuestion,
  destroyQuestions
}