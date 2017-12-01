const express = require('express');
const router = express.Router();
const loginmiddle = require('../middleware/login');

const questionController = require('../controllers/questionController');

router.post('/create', loginmiddle.isLogin, questionController.create)
router.get('/getall', questionController.read)
router.delete('/delete/:id', questionController.delete)
router.put('/update/:id', questionController.update)
router.put('/vote/:id', loginmiddle.isLogin, questionController.vote)
router.put('/unvote/:id', loginmiddle.isLogin, questionController.unvote)
router.get('/getOne/:id', questionController.readOne)

module.exports = router;
