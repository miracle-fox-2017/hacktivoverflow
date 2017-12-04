const router = require('express').Router()
const questionController = require('../controllers/questionController')
const checkLogin = require('../middlewares/checkLogin')

router.get('/', questionController.allQuestions)
router.get('/:id', questionController.getQuestion)
router.post('/', checkLogin.isLogin, questionController.createQuestion)
router.put('/:id', questionController.editQuestion)
router.delete('/:id', questionController.deleteQuestion)

module.exports = router
