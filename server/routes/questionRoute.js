const route    = require('express').Router()
const Question = require('../controllers/questionCtrl')

route.get('/userquestion', Question.getQuestionByUserId)
route.get('/', Question.getAllQuestion)
route.get('/:id', Question.getQuestionById)
route.post('/', Question.createQuestion)
route.put('/:id', Question.updateQuestion)
route.delete('/:id', Question.deleteQuestion)

module.exports = route
