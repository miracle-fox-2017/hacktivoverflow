const router = require('express').Router()
const userController = require('../controllers/userController')
const checkAuth = require('../middleware/checkAuth')

// create
router.post('/', userController.create)

// read
router.get('/', userController.getAll)
router.get('/:id', userController.getById)
router.post('/', userController.getOne)

// update
router.put('/:id', userController.update)

// delete
router.delete('/:id', userController.remove)

module.exports = router
