const router = require('express').Router()
const answerController = require('../controllers/answerController')
const checkAuth = require('../middleware/checkAuth')

// create
router.post('/', checkAuth.isLogin, answerController.create)

// read
router.get('/', answerController.getAll)
router.post('/detail', answerController.getByQuestionId)

// update
router.put('/:id', answerController.update)

// delete
router.delete('/:id', checkAuth.isLogin, answerController.remove)

module.exports = router
