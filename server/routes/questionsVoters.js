const router = require('express').Router()
const questionVoterController = require('../controllers/questionVoterController')
const checkAuth = require('../middleware/checkAuth')

// create
router.post('/', checkAuth.isLogin, questionVoterController.create)

// read
router.get('/', questionVoterController.getAll)
router.post('/detail', questionVoterController.getByQuestionId)

// delete
router.post('/remove', questionVoterController.remove) //checkAuth.isLogin,

module.exports = router
