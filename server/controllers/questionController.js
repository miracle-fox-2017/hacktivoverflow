//require helper
const hashPassword = require('../helpers/hashPassword')

//require model
const User = require('../models/user')
const Question = require('../models/question')

let welcomePage = (req, res) => {
  res.send({msg: 'welcomePage'})
}

let signfb = (req, res) => {
  res.status(200).send({msg:"success"})
}

let postQuestion = (req, res) => {
  if(req.body.title && req.body.article) {
    let blog = new Blog({
      userId: req.decoded.id,
      title: req.body.title,
      article: req.body.article
    })
    blog.save()
    .then(result=>{
      res.status(200).send({
        msg:"success",
        author: req.decoded.username,
        blogPost: result
      })
    })
    .catch(err=>{
      res.status(500).send({msg:"unsuccessfull post"})
    })
  } else {
    res.status(400).send({msg: "empty title & article"})
  }
}

let getQuestion = (req, res) => {
  Blog.findOne({ _id: req.params.id })
  .then(result=>{
    res.status(200).send({
      msg: "success",
      blogPost: result
    })
  })
  .catch(err=>{
    res.status(500).send({msg:"unsuccess get blog post"})
  })
}

let getQuestions = (req, res) => {
  Blog.find()
  .then(result=>{
    res.status(200).send({
      msg: "success",
      blogPost: result
    })
  })
  .catch(err=>{
    res.status(500).send({msg:"unsuccess get blog post"})
  })
}

let editQuestion = (req, res) => {
  Blog.update({ _id: req.params.id }, {
    userId: req.decoded.id,
    title: req.body.title,
    article: req.body.article
  })
  .then(result=>{
    Blog.findOne({ _id: req.params.id })
    .then(newEdit=>{
      res.status(200).send({
        msg: "success",
        newBlogPost: newEdit
      })
    })
    .catch(err=>{
      res.status(500).send({msg:"unsuccess get blog post"})
    })
    
  })
  .catch(err=>{
    res.status(400).send({msg: err})
  })
}

let delQuestion = (req, res) => {
  Blog.findOne({ _id: req.params.id })
  .then(before=>{
    Blog.remove({ _id: req.params.id })
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











