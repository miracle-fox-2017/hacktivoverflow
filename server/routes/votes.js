const express = require('express');
const router = express.Router();
const voteControllers = require('../controllers/voteControllers')

router.post('/', voteControllers.create);
router.delete('/:id', voteControllers.remove);

module.exports = router;