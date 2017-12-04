const Questions = require('../models/question')

const create = (req, res) => {
    Questions.create(req.body)
    .then( response => res.status(200).json(response) )
    .catch( err => { res.status(500).json(err) })
}

const list = (req, res) => {
    Questions.find()
    .then( response => res.status(200).json(response) )
    .catch( err => { res.status(500).json(err) })
}

module.exports = {
    create,
    list
}