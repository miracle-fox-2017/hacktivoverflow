const router = require('express').Router()
const userController = require('../controllers/userController')

router.get('/', userController.allUsers)
router.put('/:id', userController.editUser)
router.delete('/:id', userController.deleteUser)

module.exports = router
