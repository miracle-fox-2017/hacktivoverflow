const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/question')

/* GET question*/
router.get('/', Controllers.findAll)
router.get('/:questionId', Controllers.findOne);

/* Post Question*/
router.post('/:userId', Controllers.create)

/* Put Question / Edit Question*/
router.put('/:questionId', Controllers.update)

/* Delete Question*/
router.delete('/:questionId', Controllers.remove)

/* Post Comment/answer*/
router.post('/:questionId/answer/:userId', Controllers.answer)

/* Delete Comment/answer*/
router.delete('/comment/:commentId', Controllers.deleteCommend)

/* Vote question*/
router.put('/:questionId/vote/:userId', Controllers.vote)

/* GET Comment*/
router.get('/comment/:commentId', Controllers.findComment)

module.exports = router;
