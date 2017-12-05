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
  bcrypt.verify(req.headers.token)
  .then(verify => {
    console.log(verify)
    Comments.find({_id: req.params.id})
    .then(response => {
      console.log(response)
      if(response[0].users == verify.id){
        console.log('masuk sini')
        Comments.remove({_id: req.params.id})
        .then(res_delete => { res.status(200).send(res_delete)})
        .catch( err => { res.status(500).json(err) })
      }
      else {
        res.json('tidak bisa menghapus komentar orang lain')
      }
    })
    .catch( err => { res.status(500).json(err) })
  })
  // Comments.find({_id: req.params.id})
  // .then(result => console.log(result))
  // Comments.destroy({_id: req.params.id})
  // .then(response => res.status(200).json(response))
  // .catch( err => { res.status(500).json(err) })
}

module.exports = {
    add,
    list,
    destroy
}