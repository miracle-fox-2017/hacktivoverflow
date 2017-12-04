var router = require('express').Router()
const controller = require('../controllers/questions')

/* GET users listing. */
router.post('/create', controller.create)
router.get('/list', controller.list)

module.exports = router;
