var express = require('express');
var router = express.Router();
var answer = require('../controllers/controllerAnswer')

router.get('/', answer.findAnswer)
router.delete('/:id', answer.removeAnswer)
router.get('/question/:id', answer.findAnswerByIdQuestion)
router.post('/', answer.createAnswer)
router.put('/like/:id', answer.likeAnswer)
router.put('/unlike/:id', answer.unlikeAnswer)


module.exports = router;