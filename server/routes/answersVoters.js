const router = require('express').Router()
const answerVoterController = require('../controllers/answerVoterController')
const checkAuth = require('../middleware/checkAuth')

// create
router.post('/', checkAuth.isLogin, answerVoterController.create)

// read
router.get('/', answerVoterController.getAll)
router.post('/detail', answerVoterController.getByQuestionId)

// update
// router.put('/:id', answerVoterController.update)

// delete
router.delete('/:id', checkAuth.isLogin, answerVoterController.remove)

module.exports = router
