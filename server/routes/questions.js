var express = require('express');
var router = express.Router();
var question = require('../controllers/controllerQuestion')

router.get('/', question.getAllDataQuestion)
router.post('/', question.createQuestion)
router.delete('/:id', question.deleteQuestion)
router.put('/:id', question.editQuestion)
router.put('/like/:id', question.likeQuestion)
router.get('/:id', question.findQuestion)

module.exports = router;
