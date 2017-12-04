const express = require('express')
const router = express.Router()
const Login = require('../middleware/isLogin')
const LoginDelete = require('../middleware/isLoginDelete')
const Question = require('../controllers/questionController')

router.post('/', Login.isLogin, Question.createQuestion)
router.get('/', Question.findAllQuestion)
router.get('/:id', Question.questionsByid)
router.get('/author/:id', Question.questionsByAuthorid)
router.put('/:id', Login.isLogin, Question.updateQuestion)
router.delete('/:id', LoginDelete.isLoginDelete, Question.destroyQuestions)

module.exports = router