const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-cont')
const questController = require('../controllers/question-cont')

// ================= users 
router.post('/users', userController.createUser)

router.get('/users/:id', userController.findById)

router.put('/users/:id', userController.findByIdAndUpdate)

router.get('/users', userController.getAllUsers)

router.delete('/users/:id', userController.findByIdAndRemove)

// ================= questions 
router.post('/questions', questController.createQuest)

router.get('/questions', questController.getAllQuest)

router.get('/questions/:id', questController.findById)

router.put('/questions/:id', questController.findByIdAndUpdate)

router.delete('/questions/:id', questController.findByIdAndRemove)


module.exports = router
