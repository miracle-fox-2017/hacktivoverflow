const mongoose = require('mongoose').connect('mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/hacktivoverflow?ssl=true&replicaSet=smartshop-shard-0&authSource=admin');
// const mongoose = require('mongoose').connect('mongodb://localhost/hacktivoverflow');
const Question = require('../models/questionModel')
const User = require('../models/userModel')
const ObjectId = require('mongodb').ObjectId

const allQuestions = (req, res) => {
  Question.find()
  .populate('user_id')
  .populate({path: 'answers_id', options: { sort: { 'created_at': 'desc' } } })
  .then(questions => res.send(questions))
  .catch(err => res.status(500).send(err))
}

const createQuestion = (req, res) => {
  let input = req.body
  console.log(input)
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
  console.log('MASUK SINIS GA')
  console.log(id)
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
  // console.log('EDIT DI SERVER ', input, 'dan', id)
  const saltRounds = 10;
  Question.findOne({
    _id: id,
    user_id: req.decoded.id
  })
  .then(dataQuestion => {
    // console.log('PENCARIAN FILE EDIT', dataQuestion)
    dataQuestion.title = input.title,
    dataQuestion.body = input.body,
    dataQuestion.save(function(err, data) {
      if (err) throw err;
      res.send(
      {
        data : data,
        msg: 'Question successfully updated!'
      });
    });
  })
  .catch(err => res.status(500).send(err))
}

const getQuestion = (req, res) => {
  let id = ObjectId(req.params.id)
  // console.log('MASUK')
  Question.findOne({
    _id: id
  })
  .populate('user_id')
  .populate({
    path: 'answers_id', 
    options: { 
      sort: { 
        'created_at': 'desc' 
      } 
    },
    populate: {
      path: 'user_id',
      model: 'User'
    } 
  })
  .then(dataQuestion => {
    // console.log('APA DAPAT', dataQuestion)
  //   .populate({ 
  //     path: 'pages',
  //     populate: {
  //       path: 'components',
  //       model: 'Component'
  //     } 
  //  })
    res.send(dataQuestion)
  })
  .catch(err => {
    res.status(500).send(err) 
    console.log(err)
  })
}

const likeQuestion = (req, res) => {
  let id = ObjectId(req.params.id)
  // console.log('MASUK')
  Question.findOne({
    _id: id
  })
  .then(dataQuestion => {
    console.log(dataQuestion.dislike)
    if(dataQuestion.like.length == 0){
      dataQuestion.like.push(req.decoded.id)
      dataQuestion.dislike.map((unlikeId, idx) => {
        if(unlikeId.toString() == req.decoded.id) {
          dataQuestion.dislike.splice(idx, 1)
        }
      })
      console.log(dataQuestion)
      dataQuestion.save((err, data) => {
        if (err) throw err;
        res.send(
        {
          data : data,
          msg: 'Question successfully liked!'
        });
      })
    } else {
      console.log('MASUK ELSE')
      dataQuestion.like.forEach(likeId => {
        console.log('MAP LIKE',likeId.toString() !== req.decoded.id)
          if(likeId.toString() !== req.decoded.id) {
            console.log('masuk')
            dataQuestion.like.push(req.decoded.id)
            dataQuestion.dislike.map((unlikeId, idx) => {
              if(unlikeId.toString() == req.decoded.id) {
                dataQuestion.dislike.splice(idx, 1)
              }
            })
            dataQuestion.save((err, data) => {
              if (err) throw err;
              res.send(
              {
                data : data,
                msg: 'Question successfully liked!'
              });
            })
          } else {
            console.log('SUDAH LIKE BOS TETAP TENANG')
          }
      })
    }
    // console.log('APA DAPAT', dataQuestion)
    // res.send(dataQuestion)
  })
  .catch(err => {
    res.status(500).send(err) 
    console.log(err)
  })
}

const unlikeQuestion = (req, res) => {
  let id = ObjectId(req.params.id)
  // console.log('MASUK')
  Question.findOne({
    _id: id
  })
  .then(dataQuestion => {
    console.log(dataQuestion.dislike)
    if(dataQuestion.dislike.length == 0){
      dataQuestion.dislike.push(req.decoded.id)
      dataQuestion.like.map((likeId, idx) => {
        if(likeId.toString() == req.decoded.id) {
          dataQuestion.like.splice(idx, 1)
        }
      })
      console.log(dataQuestion)
      dataQuestion.save((err, data) => {
        if (err) throw err;
        res.send(
        {
          data : data,
          msg: 'Question successfully unliked!'
        });
      })
    } else {
      console.log('MASUK ELSE')
      dataQuestion.dislike.map(unlikeId => {
          if(unlikeId.toString() !== req.decoded.id) {
            dataQuestion.dislike.push(req.decoded.id)
            dataQuestion.like.map((likeId, idx) => {
              if(likeId.toString() == req.decoded.id) {
                dataQuestion.like.splice(idx, 1)
              }
            })
            dataQuestion.save((err, data) => {
              if (err) throw err;
              res.send(
              {
                data : data,
                msg: 'Question successfully unliked!'
              });
            })
          } else {
            console.log('SUDAH LIKE BOS TETAP TENANG')
          }
      })
    }
    // console.log('APA DAPAT', dataQuestion)
    // res.send(dataQuestion)
  })
  .catch(err => {
    res.status(500).send(err) 
    console.log(err)
  })
}

module.exports = {
  allQuestions,
  createQuestion,
  editQuestion,
  deleteQuestion,
  getQuestion,
  likeQuestion,
  unlikeQuestion
};