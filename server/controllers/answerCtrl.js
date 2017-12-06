const jwt      = require('jsonwebtoken');
const Answer  = require('../models/answerModel')

class AnswerCtrl {

  static getAnswerByQuestionId (req, res) {
    jwt.verify(req.headers.token, 'shhhhh', function(err, decoded) {
      if (err) {
        res.status(500).send(err)
      } else {
        if (!decoded.isLogin) {
          res.status(403).send('Invalid User')
        } else {
          Answer.find({
            question_id: req.params.id
          })
          .populate('user_id')
          .then(commentData => res.status(200).send(commentData))
          .catch(err => res.status(500).send(err))
        }
      }
    })
  }

  static addAnswer (req, res) {
    jwt.verify(req.headers.token, 'shhhhh', function(err, decoded) {
      if (err) {
        res.status(500).send(err)
      } else {
        if (!decoded.isLogin) {
          res.status(403).send('Invalid User')
        } else {
         Answer.create({
           text: req.body.text,
           user_id: decoded.userID,
           question_id: req.body.questionID,
           createdAt: new Date(),
           updatedAt: new Date(),
           voter_id: []
         })
         .then(newAnswer => {
          newAnswer.populate('user_id', function(error, newComment) {
            res.status(200).send(newComment)
          })
         })
         .catch(err => res.status(500).send(err)) 
        }
      }
    })
  }

  static deleteAnswerById (req, res) {
    jwt.verify(req.headers.token, 'shhhhh', function(err, decoded) {
      if (err) {
        res.status(500).send(err)
      } else {
        if (!decoded.isLogin) {
          res.status(403).send('Invalid User')
        } else {
         Answer.findByIdAndRemove(req.params.id)
         .then(deletedData => res.status(200).send(deletedData))
         .catch(err => res.status(500).send(err)) 
        }
      }
    })
  }

  static updateAnswerById (req, res) {
    jwt.verify(req.headers.token, 'shhhhh', function(err, decoded) {
      if (err) {
        res.status(500).send(err)
      } else {
        if (!decoded.isLogin) {
          res.status(403).send('Invalid User')
        } else {
         Answer.findByIdAndUpdate(req.params.id)
         .then(updatedData => {
           
            if (req.body.statusLike) {
              updatedData.voter_id.push(req.body.voter_id)
            } else {
              let deletedIdx = updatedData.voter_id.findIndex(element => {
                return element === req.body.voter_id
              })
              updatedData.voter_id.splice(deletedIdx, 1)
            }
           
           updatedData.save()
           .then(newAnswer => res.status(200).send(newAnswer))
           .catch(err => res.status(500).send(err))
         })
         .catch(err => res.status(500).send(err)) 
        }
      }
    })
  }
}

module.exports = AnswerCtrl