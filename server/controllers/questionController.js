const Question = require('../models/question')
const Answer = require('../models/answer');

class QuestionController {


  static create(req, res) {

    Question
            .create({
              title: req.body.title,
              content: req.body.content,
              author: req.header.decoded._id,
            })
            .then((question) => {
              Question
              .findOne({_id: question._id})
              .populate('author')
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

    Question
            .find()
            .populate('author')
            .populate('voters')
            .exec((err, hasil) => {
              res.status(200).send(hasil)
            })
            .catch((err) => {
              res.status(400).send(err)
            })
  }

  static delete(req, res) {

    Question
            .findOne({_id: req.params.id})
            .then((hasilquestion) => {
              if(!hasilquestion) {
                res.status(404).send({})
              }
              else {
                Question
                        .deleteOne({_id: req.params.id})
                        .then((response) => {

                          Answer
                                .remove({question: hasilquestion._id})
                                .then((answerresponse) => {
                                  res.status(200).send(hasilquestion)
                                })
                                .catch((err) => {
                                  res.status(200).send(err)
                                })
                        })
                        .catch((err) => {
                          console.log(err);
                        })
              }
            })
            .catch((err) => {
              res.status(400).send(err)
            })

  }

  static update(req, res) {

    Question
            .findOne({_id: req.params.id})
            .then((hasilquestion) => {
              if(!hasilquestion) {
                res.status(404).send({})
              }
              else {
                Question
                        .updateOne({
                          _id: req.params.id
                        }, {
                          title: req.body.title,
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

  static vote(req, res) {

    Question
            .findOne({_id: req.params.id})
            .then((hasilquestion) => {
              if(!hasilquestion) {
                res.status(404).send({})
              }
              else {

                if(hasilquestion.voters.indexOf(req.header.decoded._id) == -1) {
                  hasilquestion.voters.push(req.header.decoded._id)
                  hasilquestion.save(function(err) {
                    if(err) {
                      res.status(400).send(err)
                    }
                    else {
                      Question.findOne({_id: req.params.id}).populate('author').populate('voters').exec((err, hasilpopulate) => {
                        res.status(200).send(hasilpopulate)
                      }).catch((err) => {
                        res.status(404).send(err)
                      })
                    }
                  })
                }
                else {
                  hasilquestion.voters.forEach((hasil, index) => {
                    if(hasil == req.header.decoded._id) {
                      hasilquestion.voters.splice(index, 1)
                      return
                    }
                  })
                  hasilquestion.save(function(err) {
                    if(err) {
                      res.status(400).send(err)
                    }
                    else {
                      Question.findOne({_id: req.params.id}).populate('author').populate('voters').exec((err, hasilpopulate) => {
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

    Question
            .findOne({_id: req.params.id})
            .then((hasilquestion) => {
              if(!hasilquestion) {
                res.status(404).send({})
              }
              else {

                console.log(hasilquestion);

                if(hasilquestion.voters.indexOf(req.header.decoded._id) != -1) {
                  Question
                  .updateOne({_id: req.params.id}, {$pull: {voters: req.header.decoded._id}})
                  .then((response) => {
                    res.status(200).send(response)
                  })
                  .catch((err) => {
                    res.status(404).send(err)
                  })
                }
                else {
                  res.status(400).send({
                    error: "This user never vote on this question"
                  })
                }

              }
            })
            .catch((err) => {
              res.status(404).send(err)
            })
  }

  static readOne(req, res) {

    Question
    .findOne({_id: req.params.id})
    .populate('author')
    .exec((err, user) => {
      res.send(user)
    })
  }

}

module.exports = QuestionController;
