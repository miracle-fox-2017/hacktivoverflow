// const mongoose = require('mongoose').connect('mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/todo?ssl=true&replicaSet=smartshop-shard-0&authSource=admin');
const mongoose = require('mongoose').connect('mongodb://localhost/hacktivoverflow');
const Answer = require('../models/answerModel')
const Question = require('../models/questionModel')
const ObjectId = require('mongodb').ObjectId

const allAnswers = (req, res) => {
  Answer.find()
  .populate('user_id')
  .then(users => res.send(users))
  .catch(err => res.status(500).send(err))
}

const createAnswer = (req, res) => {
  let input = req.body
  // console.log('INI DI SERVER ANSWER', input)
  // console.log('INI APA', req.decoded.id)
  let obj = {
    body : input.answer,
    user_id: req.decoded.id,
    question_id: input.question_id
  }
  Answer.create(obj)
  .then( answer => {
    Question.findOne({
      _id: ObjectId(input.question_id)
    })
    .then(question => {
      // console.log('INI QUESTION DI ANSWER', question)
      question.answers_id.push(answer._id)
      question.save(function(err, data) {
        // console.log('INI QUESTION DI ANSWER2', data)
        if (err) console.log(err);
        res.send(
        {
          msg: 'Success created answer',
          data: answer
        })
      });
    })
  })
  .catch(err => {
    res.status(400)
    console.log(err)
  })
}

const deleteAnswer = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}
  Answer.deleteOne(id)
  .then(answer => res.send(
  {
    msg : 'Data answer removed',
    data : answer
  })
  )
  .catch(err => res.status(500).send(err))
}

const editAnswer = (req , res) =>{
  let id = ObjectId(req.params.id)
  let input = req.body
  const saltRounds = 10;
  Answer.findOne({
    _id: id,
    user_id: input.user_id
  })
  .then(dataAnswer => {
    dataAnswer.body = input.body,
    dataAnswer.save(function(err, data) {
      if (err) throw err;
      res.send(
      {
        email : data,
        msg: 'Answer successfully updated!'
      });
    });
  })
  .catch(err => res.status(500).send(err))
}

const getAnswer = (req, res) => {
  let id = ObjectId(req.params.id)
  // console.log('MASUK')
  Answer.findOne({
    _id: id
  })
  .populate('user_id')
  .then(dataAnswer => {
    // console.log('APA DAPAT', dataAnswer)
    res.send(dataAnswer)
  })
  .catch(err => {
    res.status(500).send(err) 
    console.log(err)})
}

module.exports = {
  allAnswers,
  createAnswer,
  editAnswer,
  deleteAnswer,
  getAnswer
};