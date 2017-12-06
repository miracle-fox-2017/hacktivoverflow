const route    = require('express').Router()
const Answer   = require('../controllers/answerCtrl')

route.get('/:id', Answer.getAnswerByQuestionId)
route.post('/', Answer.addAnswer )
route.delete('/:id', Answer.deleteAnswerById)
route.put('/:id', Answer.updateAnswerById)

module.exports = route
