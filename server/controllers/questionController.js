//require helper
const hashPassword = require('../helpers/hashPassword')
const fbHelper = require('../helpers/fb')
const jsonToken = require('../helpers/jsonToken')

//require model
const User = require('../models/user')
const Question = require('../models/question')
const Answer = require('../models/answer')

let welcomePage = (req, res) => {
  res.send({msg: 'welcomePage'})
}

let signfb = (req, res) => {
  fbHelper.unwrapToken(req.headers.fb_token, (err, resp) => {
    if (err) res.status(500).send({err: err})
    else {
      let newUser = {
        username: resp.email,
        name: resp.name
      }
      let user = new User (newUser)
      user.save()
      .then(result => {
        let tokenizer = {
          _id: result._id,
          name: result.name,
          isAdmin: result.isAdmin
        }
        jsonToken.signToken(tokenizer, (err, token) => {
          if (err) {
            res.status(500).send({err: err})
          }
          else {
            res.status(200).send({
              msg: "success",
              token: token,
              userId: tokenizer._id
            })
          }
        })
      })
      .catch(err => {
        res.status(500).send({
          err: err
        })
      })
    }
  })
}

let postQuestion = (req, res) => {
  if(req.body.title && req.body.question) {
    let question = new Question({
      name: req.decoded.name,
      userId: req.decoded._id,
      title: req.body.title,
      image: req.body.image || '',
      question: req.body.question,
      upVote: [],
      downVote: [],
      createdAt: new Date()
    })
    question.save()
    .then(result=>{
      res.status(200).send({
        msg:"success",
        author: req.decoded.name,
        newQuestion: result
      })
    })
    .catch(err=>{
      res.status(500).send({msg:"unsuccessfull post"})
    })
  } else {
    res.status(400).send({msg: "empty title & question"})
  }
}

let getQuestion = (req, res) => {
  Question.findOne({ _id: req.params.id })
  .then(result=>{
    res.status(200).send({
      msg: "success",
      question: result
    })
  })
  .catch(err=>{
    res.status(500).send({msg:"cannot get question"})
  })
}

let getQuestions = (req, res) => {
  Question.find()
  .sort({createdAt: -1})
  .then(result=>{
    res.status(200).send({
      msg: "success",
      questions: result
    })
  })
  .catch(err=>{
    res.status(500).send({msg:"canot get questions"})
  })
}

let editQuestion = (req, res) => {
  Question.update({ _id: req.params.id }, {
    name: req.decoded.name,
    userId: req.decoded._id,
    title: req.body.title,
    image: req.body.image || '',
    question: req.body.question
  })
  .then(result=>{
    Question.findOne({ _id: req.params.id })
    .then(newEdit=>{
      res.status(200).send({
        msg: "success",
        question: newEdit
      })
    })
    .catch(err=>{
      res.status(500).send({msg:"cannot edit post"})
    })
  })
  .catch(err=>{
    res.status(400).send({msg: err})
  })
}

let delQuestion = (req, res) => {
  Question.findOne({ _id: req.params.id })
  .then(before=>{
    Question.remove({ _id: req.params.id })
    .then(result=>{
      Answer.remove({ questionId: req.params.id })
      .then(result=>{
        res.status(200).send({
          msg: "success",
          deleted: before
        })
      })
      .catch(err=>{
        res.status(400).send({msg: err})
      })
    })
    .catch(err=>{
      res.status(400).send({msg: err})
    })
  })
  .catch(err=>{
    res.status(400).send({msg: err})
  })
}

//=================answer

let postAnswer = (req, res) => {
  if(req.body.answer || req.body.image) {
    let answer = new Answer({
      name: req.decoded.name,
      questionId: req.params.id,
      userId: req.decoded._id,
      image: req.body.image || '',
      answer: req.body.answer,
      upVote: [],
      downVote: [],
      createdAt: new Date()
    })
    answer.save()
    .then(result=>{
      res.status(200).send({
        msg:"success",
        author: req.decoded.name,
        answer: result
      })
    })
    .catch(err=>{
      res.status(500).send({msg:"unsuccessfull post"})
    })
  } else {
    res.status(400).send({msg: "empty answer"})
  }
}

let getAnswers = (req, res) => {
  Answer.find({ questionId: req.params.id })
  //disini ada exec username
  .then(result=>{
    res.status(200).send({
      msg: "success",
      answers: result
    })
  })
  .catch(err=>{
    res.status(500).send({msg:"canot get questions"})
  })
}

let delAnswer = (req, res) => {
  Answer.findOne({ _id: req.params.id })
  .then(before=>{
    Answer.remove({ _id: req.params.id })
    .then(result=>{
      res.status(200).send({
        msg: "success",
        deleted: before
      })
    })
    .catch(err=>{
      res.status(400).send({msg: err})
    })
  })
  .catch(err=>{
    res.status(400).send({msg: err})
  })
}

//=================vote

let voteQuestion = (req, res) => {
  Question.findOne({ _id: req.params.id })
  .then(result=>{
    let before = result
    //req.body.value = 1 / -1
    let downVote = result.downVote
    let upVote = result.upVote
    let posDown = downVote.findIndex(function(e){
      return e == req.decoded._id
    })
    let posUp = upVote.findIndex(function(e){
      return e == req.decoded._id
    })
    if(req.body.value < 0){
      if(posDown == -1) {
        downVote.push(req.decoded._id)
        if(posUp != -1) {
          upVote.splice(posUp, 1)
        }
      } else {
        downVote.splice(posDown, 1)
      }
    } else {
      if(posUp == -1) {
        upVote.push(req.decoded._id)
        if(posDown != -1) {
          downVote.splice(posDown, 1)
        }
      } else {
        upVote.splice(posUp, 1)
      }
    }
    Question.update({ _id: req.params.id }, result)
    .then(updated=>{
      res.status(200).send({
        msg: "success",
        before: before,
        updated: result
      })
    })
    .catch(err=>{
      res.status(500).send({err: err})
    })
  })
  .catch(err=>{
    res.status(400).send({msg: err})
  })
}

let voteAnswer = (req, res) => {
  Answer.findOne({ _id: req.params.id })
  .then(result=>{
    let before = result
    //req.body.value = 1 / -1
    let downVote = result.downVote
    let upVote = result.upVote
    let posDown = downVote.findIndex(function(e){
      return e == req.decoded._id
    })
    let posUp = upVote.findIndex(function(e){
      return e == req.decoded._id
    })
    if(req.body.value < 0){
      if(posDown == -1) {
        downVote.push(req.decoded._id)
        if(posUp != -1) {
          upVote.splice(posUp, 1)
        }
      } else {
        downVote.splice(posDown, 1)
      }
    } else {
      if(posUp == -1) {
        upVote.push(req.decoded._id)
        if(posDown != -1) {
          downVote.splice(posDown, 1)
        }
      } else {
        upVote.splice(posUp, 1)
      }
    }
    Answer.update({ _id: req.params.id }, result)
    .then(updated=>{
      res.status(200).send({
        msg: "success",
        before: before,
        updated: result
      })
    })
    .catch(err=>{
      res.status(500).send({err: err})
    })
  })
  .catch(err=>{
    res.status(400).send({msg: err})
  })
  // Answer.findOne({ _id: req.params.id })
  // .then(result=>{
  //   let before = result
  //   let vote = result.vote
  //   let pos = vote.findIndex(function(e){
  //     return e._id == req.decoded._id
  //   })
  //   if(pos<0) {
  //     vote.push({
  //       _id: req.decoded._id,
  //       value: req.body.value
  //     })
  //   } else {
  //     if(req.body.value == vote[pos].value){
  //       vote.splice(pos,1)
  //     } else {
  //       vote.splice(pos,1,{
  //         _id: req.decoded._id,
  //         value: req.body.value
  //       })
  //     }
  //   }
  //   result.vote = vote
  //   Answer.update({ _id: req.params.id }, result)
  //   .then(updated=>{
  //     res.status(200).send({
  //       msg: "success",
  //       before: before,
  //       updated: result
  //     })
  //   })
  //   .catch(err=>{
  //     res.status(500).send({err: err})
  //   })
  // })
  // .catch(err=>{
  //   res.status(400).send({msg: err})
  // })
}

//other routes
let signup = (req, res) => {
  let user = new User({
    username: req.body.username,
    password: req.body.password
  })
  user.save()
  .then(result=>{
    res.status(200).send({ msg: "success" })
  })
  .catch(err=>{
    res.status(500).send({ msg: err })
  })
}
let signin = (req, res) => {
  res.status(200).send({
    msg:"success",
    token: req.token
  })
}

module.exports = {
  welcomePage,
  signfb,
  postQuestion,
  getQuestions,
  getQuestion,
  editQuestion,
  delQuestion,
  postAnswer,
  getAnswers,
  delAnswer,
  voteQuestion,
  voteAnswer
};











