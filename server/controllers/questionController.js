// const mongoose = require('mongoose').connect('mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/todo?ssl=true&replicaSet=smartshop-shard-0&authSource=admin');
const mongoose = require('mongoose').connect('mongodb://localhost/hacktivoverflow');
const Question = require('../models/questionModel')
const ObjectId = require('mongodb').ObjectId

const allQuestions = (req, res) => {
  Question.find()
  .populate('user_id')
  .then(users => res.send(users))
  .catch(err => res.status(500).send(err))
}

const createQuestion = (req, res) => {
  let input = req.body
  // console.log('INI APA', req.decoded.id)
  let obj = {
    title : input.title,
    body : input.body,
    user_id: req.decoded.id
  }
  Question.create(obj)
  .then( question => {
    res.send(
    {
      msg: 'Success created QUestion',
      data: question
    })
  })
  .catch(err => {
    res.status(400)
    console.log(err)
  })
}

const deleteQuestion = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}
  Question.deleteOne(id)
  .then(question => res.send(
  {
    msg : 'Data question removed',
    data : question
  })
  )
  .catch(err => res.status(500).send(err))
}

const editQuestion = (req , res) =>{
  let id = ObjectId(req.params.id)
  let input = req.body
  const saltRounds = 10;
  Question.findOne({
    _id: id,
    user_id: input.user_id
  })
  .then(dataQuestion => {
    dataQuestion.title = input.title,
    dataQuestion.body = input.body,
    dataQuestion.save(function(err, data) {
      if (err) throw err;
      res.send(
      {
        email : data,
        msg: 'Question successfully updated!'
      });
    });
  })
  .catch(err => res.status(500).send(err))
}

module.exports = {
  allQuestions,
  createQuestion,
  editQuestion,
  deleteQuestion
};