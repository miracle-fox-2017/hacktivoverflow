const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')

// Find all user
router.get('/', userController.findAllUsers)

// Find user by id
router.get('/:idUser', userController.findUserById)

// Add new user
router.post('/', userController.addNewUser)

// Update user
router.put('/:idUser', userController.updateUser)

// Delete user
router.delete('/:idUser', userController.removeUser)

module.exports = router
