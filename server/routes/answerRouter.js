const express = require('express')
const router = express.Router()
const answerController = require('../controllers/answerController.js')

// Find all answer
router.get('/', answerController.findAllAnswer)

// Find answer by id
router.get('/:idQuestion', answerController.findAnswerById)

// Add new answer
router.post('/', answerController.postNewAnswer)

// Update answer
router.put('/:idAnswer', answerController.updateAnswer)

// Update voteAnswer
router.put('/addVoteAnswer/:idAnswer', answerController.updateVoteAnswer)

// Delete answer
router.delete('/:idAnswer', answerController.removeAnswer)

module.exports = router
