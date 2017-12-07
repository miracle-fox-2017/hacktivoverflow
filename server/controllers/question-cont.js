const Question = require('../models/question-schema')
let message = ''

const createQuest = (req, res) => {
  Question.create({
    question: req.body.question,
    userId: req.body.userId,
    tag: req.body.tag,
    title: req.body.title
  })
  .then(question => {
    res.status(200).send(question)
  })
  .catch(err => {
    console.log(err)
  })
}

const getAllQuest = (req, res) => {
  Question.find()
  .populate('userId', 'username')
  .then(questions => {
    res.status(200).send(questions)
  })
  .catch(err => {
    console.log(err)
  })
}

const findById = (req, res) => {
  Question.findById({_id: req.params.id})
  .populate('userId')
  .then(question => {
    res.status(200).send(question)
  })
  .catch(err => {
    console.log(err)
  })
}

const findByIdAndUpdate = (req, res) => {
  Question.findByIdAndUpdate({ _id: req.params.id }, {
    question: req.body.question,
    tag: req.body.tag,
    title: req.body.title
  })
    .then(question => {
      res.status(200).send(question)
    })
    .catch(err => {
      console.log(err)
    })
}

const like = (req, res) => {
  Question.findByIdAndUpdate({_id: req.params.id}, {
    $push: {like: req.body.like}
  })
  .then(question => {
    res.status(200).send(question)
  })
  .catch(err => {
    console.log(err)
  })
}

const dislike = (req, res) => {
  console.log(req.params.id,'ini req')
  Question.findByIdAndUpdate({_id: req.params.id},
  { $pull: { like: req.body.like }
  })
  .then(req => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
}

const findByIdAndRemove = (req, res) => {
  Question.findByIdAndRemove({ _id: req.params.id })
  .then(question => {
    res.status(200).send(question)
  })
  .catch(err => {
    console.log(err)
  })
}


module.exports = {
  createQuest,
  getAllQuest,
  findById,
  findByIdAndUpdate,
  findByIdAndRemove,
  like,
  dislike
}

