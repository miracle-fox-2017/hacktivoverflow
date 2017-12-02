const express = require('express')
const router = express.Router()
const Login = require('../middleware/isLogin')
const Question = require('../controllers/questionController')

router.post('/', Login.isLogin, Question.createQuestion)
router.get('/', Question.findAllQuestion)
router.get('/:id', Question.questionsByid)
router.put('/:id', Login.isLogin, Question.updateQuestion)
router.delete('/:id', Login.isLogin, Question.destroyQuestions)

module.exports = router