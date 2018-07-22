const Answer = require('../models/answer');

class AnswerController {

  static create(req, res) {

    Answer
          .create({
            content: req.body.content,
            by: req.header.decoded._id,
            question: req.body.question_id,
          })
          .then((answer) => {
            Answer
            .findOne({_id: answer._id})
            .populate('by')
            .populate('voters')
            .exec((err, hasil) => {
              res.status(200).send(hasil)
            })
          })
          .catch((err) => {
            res.status(400).send(err)
          })

  }

  static read(req, res) {

    Answer
          .find()
          .then((answer) => {
            res.status(201).send(answer)
          })
          .catch((err) => {
            res.status(400).send(err)
          })

  }

  static update(req, res) {

    Answer
          .findOne({_id: req.params.id})
          .then((hasilanswer) => {
            if(!hasilanswer) {
              res.status(404).send({})
            }
            else {
              Answer
                    .updateOne({
                      _id: req.params.id
                    }, {
                      content: req.body.content
                    })
                    .then((response) => {
                      res.status(200).send(response)
                    })
                    .catch((err) => {
                      res.status(400).send(err)
                    })
            }
          })
          .catch((err) => {
            res.status(400).send(err)
          })

  }

  static delete(req, res) {
    Answer
          .findOne({_id: req.params.id})
          .then((hasilanswer) => {
            if(!hasilanswer) {
              res.status(404).send({})
            }
            else {
              Answer
                    .deleteOne({_id: req.params.id})
                    .then((response) => {
                      res.status(200).send(response)
                    })
                    .catch((err) => {
                      res.status(400).send(err)
                    })
            }
          })
          .catch((err) => {
            res.status(400).send(err)
          })
  }

  static vote(req, res) {

    Answer
            .findOne({_id: req.params.id})
            .then((hasilanswer) => {
              if(!hasilanswer) {
                res.status(404).send({})
              }
              else {

                if(hasilanswer.voters.indexOf(req.header.decoded._id) == -1) {
                  hasilanswer.voters.push(req.header.decoded._id)
                  hasilanswer.save(function(err) {
                    if(err) {
                      res.status(400).send(err)
                    }
                    else {
                      Answer.findOne({_id: req.params.id}).populate('by').populate('voters').exec((err, hasilpopulate) => {
                        res.status(200).send(hasilpopulate)
                      }).catch((err) => {
                        res.status(404).send(err)
                      })
                    }
                  })
                }
                else {
                  hasilanswer.voters.forEach((hasil, index) => {
                    if(hasil == req.header.decoded._id) {
                      hasilanswer.voters.splice(index, 1)
                      return
                    }
                  })
                  hasilanswer.save(function(err) {
                    if(err) {
                      res.status(400).send(err)
                    }
                    else {
                      Answer.findOne({_id: req.params.id}).populate('by').populate('voters').exec((err, hasilpopulate) => {
                        res.status(200).send(hasilpopulate)
                      }).catch((err) => {
                        res.status(404).send(err)
                      })
                    }
                  })
                }
              }
            })
            .catch((err) => {
              res.status(404).send(err)
            })

  }

  static unvote(req, res) {
    Answer
          .findOne({_id: req.params.id})
          .then((hasilanswer) => {
            if(!hasilanswer) {
              res.status(404).send({})
            }
            else {

              if(hasilanswer.voters.indexOf(req.body.user_id) != -1) {
                Answer
                     .updateOne({ _id: req.params.id },{ $pull: { voters: req.body.user_id }})
                     .then((response) => {
                       res.status(200).send(response)
                     })
                     .catch((err) => {
                       res.status(400).send(err)
                     })
              }
              else {
                res.status(400).send({
                  error: "User has vote this question"
                })
              }
            }
          })
          .catch((err) => {
            res.status(404).send(err)
          })
  }

  static answerbyquestion(req, res) {
    Answer
          .find({question: req.params.id}).populate('by').exec((err, hasil) => {
            res.status(200).send(hasil)
          }).catch((err) => {
            res.status(400).send(err)
          })
  }


}

module.exports = AnswerController;
