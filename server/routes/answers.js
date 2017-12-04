const router = require('express').Router()
const answerController = require('../controllers/answerController')
const checkLogin = require('../middlewares/checkLogin')

router.get('/', answerController.allAnswers)
router.post('/', checkLogin.isLogin, answerController.createAnswer)
router.put('/:id', answerController.editAnswer)
router.delete('/:id', answerController.deleteAnswer)

module.exports = router

