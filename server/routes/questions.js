const router = require('express').Router()
const questionController = require('../controllers/questionController')

router.get('/', questionController.allQuestions)
router.post('/', questionController.createQuestion)
router.put('/:id', questionController.editQuestion)
router.delete('/:id', questionController.deleteQuestion)

module.exports = router
