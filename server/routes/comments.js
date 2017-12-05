const router = require('express').Router()
const controller = require('../controllers/comments') 

router.post('/add', controller.add)
router.get('/list', controller.list)
router.delete('/destroy/:id', controller.destroy)

module.exports = router