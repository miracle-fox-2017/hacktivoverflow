const router = require('express').Router()
const questionController = require('../controllers/questionController')
const checkLogin = require('../middlewares/checkLogin')

router.get('/', questionController.allQuestions)
router.get('/:id', questionController.getQuestion)
router.post('/', checkLogin.isLogin, questionController.createQuestion)
router.put('/:id', checkLogin.isLogin, questionController.editQuestion)
router.delete('/:id', checkLogin.isLogin, questionController.deleteQuestion)
router.put('/like/:id', checkLogin.isLogin, questionController.likeQuestion)
router.put('/unlike/:id', checkLogin.isLogin, questionController.unlikeQuestion)

module.exports = router
