//require helper
const hashPassword = require('../helpers/hashPassword')
const fbHelper = require('../helpers/fb')
const jsonToken = require('../helpers/jsonToken')

//require model
const User = require('../models/user')
const Question = require('../models/question')

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
          _id: result.id,
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
              token: token
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
      userId: req.decoded._id,
      title: req.body.title,
      image: req.body.image || '',
      question: req.body.question,
      vote: [],
      answer: []
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
  postQuestion,
  getQuestion,
  getQuestions,
  editQuestion,
  delQuestion,
  signfb
};











