const router = require('express').Router()
const questionController = require('../controllers/questionController')
const checkAuth = require('../middleware/checkAuth')

// create
router.post('/', checkAuth.isLogin, questionController.create)

// read
router.get('/', questionController.getAll)
router.get('/:id', questionController.getById)

// update
router.put('/:id', checkAuth.isLogin, questionController.update)

// delete
router.delete('/:id', checkAuth.isLogin, questionController.remove)

module.exports = router
