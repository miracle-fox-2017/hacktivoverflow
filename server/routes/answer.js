const express = require('express')
const router = express.Router()
const Login = require('../middleware/isLogin')
const LoginDelete = require('../middleware/isLoginDelete')
const Answer = require('../controllers/answerController')

router.post('/', Login.isLogin, Answer.createAnswer)
router.get('/', Answer.findAllAnswer)
router.get('/:id', Answer.answerByid)
router.delete('/:id', LoginDelete.isLoginDelete, Answer.destroyAnswer)
router.get('/questions/:id', Answer.answersByQuestion)

module.exports = router