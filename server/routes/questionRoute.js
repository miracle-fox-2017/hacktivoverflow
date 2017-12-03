const route    = require('express').Router()
const Question = require('../controllers/questionCtrl')

route.get('/', Question.getAllQuestion)
route.get('/:id', Question.getQuestionById)
route.get('/:id/question', Question.getQuestionByUserId)
route.post('/:id', Question.createQuestion)
route.put('/:id', Question.updateQuestion)
route.delete('/:id', Question.deleteQuestion)

module.exports = route
