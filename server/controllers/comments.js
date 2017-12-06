const Comments = require('../models/comment')
const bcrypt = require('../helpers/bcrypt');

const add = (req, res) => {
  bcrypt.verify(req.body.token)
  .then(result => {
    let obj = {
      users: result.id,
      comment: req.body.comment,
      questions: req.body.questions
    }
    Comments.create(obj)
    .then(response => {
      Comments.find({_id: response._id})
      .populate('users')
      .populate('questions')
      .then(hasil => res.status(200).json(hasil))
      .catch( err => { res.status(500).json(err) })
    })
    .catch( err => { res.status(500).json(err) })
  })
  .catch( err => { res.status(500).json(err) })
}

const list = (req, res) => {
  Comments.find({questions: req.params.id})
  .populate('users')
  .populate('questions')
  .then(response => res.status(200).json(response))
  .catch( err => { res.status(500).json(err) })
}

const destroy = (req, res) => {
  Comments.find({_id: req.params.id})
  .then(response => {
    if(String(response[0].users) === req.headers.id){
      Comments.deleteOne({_id: req.params.id})
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
  if(req.body.idUser){
    Comments.findByIdAndUpdate({_id: req.body.id})
    .then(updateComment => {
      if(updateComment.likes.length == 0) {
        updateComment.likes.push(req.body.idUser)
      }
      else {
        if (!updateComment.likes.includes(req.body.idUser)) {
          updateComment.likes.push(req.body.idUser)
        }
        else {
         let index = updateComment.likes.indexOf(req.body.idUser)
         updateComment.likes.splice(index, 1)
        }
      }
      updateComment.save()
      .then( result => { res.status(200).json(result) })
      .catch( err => { res.status(500).json(err) })
    })
  }
}

module.exports = {
    add,
    list,
    destroy,
    like
}