const jwt      = require('jsonwebtoken');
const Question = require('../models/questionModel')

class QuestionCtrl {

  static createQuestion (req, res) {
    jwt.verify(req.headers.token, 'shhhhh', function(err, decoded) {
      if (err) {
        res.status(500).send(err)
      } else {
        if (!decoded.isLogin) {
          res.status(403).send('Invalid Token')
        } else {
          Question.create({
            title: req.body.title || null,
            text: req.body.text || null, 
            category: req.body.category || null,
            createdAt: new Date(),
            updatedAt: new Date(),
            user_id: decoded.userID,
            voter_id: []
          })
          .then(newQData => res.status(200).send(newQData))
          .catch(err => res.status(500).send(err))
        }
      }
    })
  }

  static getAllQuestion (req, res) {
    Question.find()
    .then(questionsData => res.status(200).send(questionsData))
    .catch(err => res.status(500).send(err))
  }

  static getQuestionById (req, res) {
    jwt.verify(req.headers.token, 'shhhhh', function(err, decoded) {
      if (err) {
        res.status(500).send(err)
      } else {
        if (!decoded.isLogin) {
          res.status(403).send('Invalid User')
        } else {
          Question.findById(req.params.id)
          .then(questionData => {
            let findIdx = questionData.voter_id.findIndex(element => {
              return element == decoded.userID
            })
            
            let userStatus = ''
            if (findIdx === -1) {
              userStatus = false
            } else {
              userStatus = true
            }

            console.log(userStatus)
            res.status(200).send({
              questionData,
              userStatus
            })
          })
          .catch(err => res.status(500).send(err))
        }
      }
    })
  }

  static getQuestionByUserId (req, res) {
    jwt.verify(req.headers.token, 'shhhhh', function(err, decoded) {
      if (err) {
        res.status(500).send(err)
      } else {
        if (!decoded.isLogin) {
          res.status(403).send('Invalid User')
        } else {
          Question.find({
            user_id: decoded.userID
          })
          .then(questionsData => res.status(200).send(questionsData))
          .catch(err => res.status(500).send(err))
        }
      }
    })
  }

  static updateQuestion (req, res) {
    console.log(req.body)
    console.log(req.headers)
    jwt.verify(req.headers.token, 'shhhhh', function(err, decoded) {
      if (err) {
        res.status(500).send(err)
      } else {
        if (!decoded.isLogin) {
          res.status(403).send('Invalid User')
        } else {
         Question.findByIdAndUpdate(req.params.id)
         .then(questionData => {
           console.log(questionData)
            questionData.title = req.body.title || questionData.title,
            questionData.text = req.body.text || questionData.text, 
            questionData.category = req.body.category || questionData.category,
            questionData.updatedAt = new Date()  
            
            if (req.body.statusLike) {
              questionData.voter_id.push(req.body.voter_id)
            } else {
              let deletedIdx = questionData.voter_id.findIndex(element => {
                return element === req.body.voter_id
              })
              questionData.voter_id.splice(deletedIdx, 1)
            }
           
           questionData.save()
           .then(newQuestion => res.status(200).send(newQuestion))
           .catch(err => res.status(500).send(err))
         })
         .catch(err => res.status(500).send(err)) 
        }
      }
    })
  }

  static deleteQuestion (req, res) {
    Question.findByIdAndRemove(req.params.id)
    .then(deletedData => res.status(200).send(deletedData))
    .catch(err => res.status(500).send(err))
  }
  
}

module.exports = QuestionCtrl