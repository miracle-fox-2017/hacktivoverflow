const router = require('express').Router()
const questionController = require('../controllers/questionController')
const checkAuth = require('../middleware/checkAuth')

// create
router.post('/', questionController.create)

// read
router.get('/', questionController.getAll)
router.get('/:id', questionController.getById)

// update
router.put('/:id', questionController.update)

// delete
router.delete('/:id', questionController.remove)

module.exports = router
