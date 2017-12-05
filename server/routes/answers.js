const router = require('express').Router()
const answerController = require('../controllers/answerController')
const checkLogin = require('../middlewares/checkLogin')

router.get('/', answerController.allAnswers)
router.post('/', checkLogin.isLogin, answerController.createAnswer)
router.put('/:id', answerController.editAnswer)
router.delete('/:id', answerController.deleteAnswer)
router.put('/like/:id', checkLogin.isLogin, answerController.likeAnswer)
router.put('/unlike/:id', checkLogin.isLogin, answerController.unlikeAnswer)

module.exports = router

