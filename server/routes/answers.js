const express = require('express');
const router = express.Router();
const answerControllers = require('../controllers/answerControllers')

router.post('/', answerControllers.create);
router.get('/:id', answerControllers.getAll);
router.delete('/:id', answerControllers.remove);

module.exports = router;
