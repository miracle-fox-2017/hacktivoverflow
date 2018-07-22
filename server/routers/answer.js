const express = require('express');
const router = express.Router();
const loginmiddle = require('../middleware/login');

const answerController = require('../controllers/answerController');

router.get('/getall', answerController.read)
router.get('/getbyquestion/:id', answerController.answerbyquestion)
router.post('/create', loginmiddle.isLogin, answerController.create)
router.put('/update/:id', loginmiddle.isLogin, answerController.update)
router.delete('/delete/:id', answerController.delete)
router.put('/vote/:id', loginmiddle.isLogin, answerController.vote)
router.put('/unvote/:id', loginmiddle.isLogin, answerController.unvote)

module.exports = router;
