const Question = require('../models/questionModel')

class QuestionCtrl {

  static createQuestion (req, res) {
    Question.create({
      title: req.body.title || null,
      text: req.body.text || null, 
      category: req.body.category || null,
      complete_status: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null,
      user_id: req.params.id,
      voter_id: [],
      user_comment: []
    })
    .then(newQData => res.status(200).send(newQData))
    .catch(err => res.status(500).send(err))
  }

  static getAllQuestion (req, res) {
    Question.find()
    .then(questionsData => res.status(200).send(questionsData))
    .catch(err => res.status(500).send(err))
  }

  static getQuestionById (req, res) {
    Question.findById(req.params.id)
    .then(questionData => res.status(200).send(questionData))
    .catch(err => res.status(500).send(err))
  }

  static getQuestionByUserId (req, res) {
    Question.find({
      user_id: req.params.id
    })
    .then(questionsData => res.status(200).send(questionsData))
    .catch(err => res.status(500).send(err))
  }

  static updateQuestion (req, res) {
    Question.findById(req.params.id)
    .then(questionData => {
      questionData.title = req.body.title || questionData.title,
      questionData.text = req.body.text || questionData.text, 
      questionData.category = req.body.category || questionData.category,
      questionData.complete_status = req.body.complete_status || questionData.complete_status,
      questionData.updatedAt = new Date(),
      questionData.completedAt = req.body.completedAt || questionData.complete_status,
      questionData.voter_id =  questionData.voter_id.push(req.body.voter_id) || questionData.voter_id
      questionData.user_comment = questionData.user_comment.push(req.body.user_comment) || questionData.user_comment 

      questionData.save()
      .then(newQData => res.status(200).send(newQData))
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  }

  static deleteQuestion (req, res) {
    Question.findByIdAndRemove(req.params.id)
    .then(deletedData => res.status(200).send(deletedData))
    .catch(err => res.status(500).send(err))
  }
  
}

module.exports = QuestionCtrl