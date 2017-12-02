const express = require('express');
const router = express.Router();
const questionControllers = require('../controllers/questionControllers')

router.post('/', questionControllers.create);
router.get('/', questionControllers.getAll);
router.put('/:id', questionControllers.update);
router.delete('/:id', questionControllers.remove);

module.exports = router;
