const Questions = require('../models/question')
const bcrypt = require('../helpers/bcrypt');

const create = (req, res) => {
  bcrypt.verify(req.body.token)
  .then(result => {
    let obj = {
      users: result.id,
      title: req.body.title,
      content: req.body.content
    }
    Questions.create(obj)
    .then( response => {
      Questions.find({_id: response._id})
      .populate('users')
      .then(hasil => res.status(200).json(hasil))
    })
    .catch( err => { res.status(500).json(err) })
  })
  .catch( err => { res.status(500).json(err) })
  
}

const list = (req, res) => {
    Questions.find()
    .populate('users')
    .then( response => res.status(200).json(response) )
    .catch( err => { res.status(500).json(err) })
}

const getById = (req, res) => {
    Questions.find({_id: req.params.id})
    .populate('users')
    .then( response => res.status(200).json(response) )
    .catch( err => { res.status(500).json(err) })
}

const destroy = (req, res) => {
  Questions.find({_id: req.params.id})
  .then(response => {
    if(String(response[0].users) === req.headers.id){
      Questions.deleteOne({_id: req.params.id})
      .then(res_delete => { res.status(200).send(res_delete)})
      .catch( err => { res.status(500).json(err) })
    }
    else {
      res.status(500).json('tidak bisa menghapus komentar orang lain')
    }
  })
  .catch( err => { res.status(500).json(err) })
}

const like = (req, res) => {
  console.log(req.body)
  Questions.findByIdAndUpdate({_id: req.body.id})
  .then(updateQuestion => {
    if(updateQuestion.likes.length == 0) {
      updateQuestion.likes.push(req.body.idUser)
    }
    else {
      if (!updateQuestion.likes.includes(req.body.idUser)) {
        updateQuestion.likes.push(req.body.idUser)
      }
      else {
       let index = updateQuestion.likes.indexOf(req.body.idUser)
       updateQuestion.likes.splice(index, 1)
      }
    }
    updateQuestion.save()
    .then( result => { res.status(200).json(result) })
    .catch( err => { res.status(500).json(err) })
  })
}

const getByUser = (req, res) => {
  Questions.find({users: req.params.id})
  .then( result => { res.status(200).json(result) })
  .catch( err => { res.status(500).json(err) })
}

const edit = (req, res) => {
  // console.log(req.body._id)
  Questions.findOneAndUpdate({_id: req.body._id}, {$set: req.body})
  .then( result => { console.log(result) })
  .catch( err => { res.status(500).json(err) })
}

module.exports = {
    create,
    list,
    getById,
    destroy,
    like,
    getByUser,
    edit
}