var router = require('express').Router()
const controller = require('../controllers/questions')

/* GET users listing. */
router.post('/create', controller.create)
router.get('/list', controller.list)
router.get('/getBy/:id', controller.getById)
router.delete('/destroy/:id', controller.destroy)
router.put('/like', controller.like)
router.get('/byuser/:id', controller.getByUser)
router.put('/edit', controller.edit)

module.exports = router;
