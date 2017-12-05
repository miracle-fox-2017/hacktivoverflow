const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp(functions.config().firebase)

var db = admin.firestore().collection('questions')

exports.index = functions.https.onRequest(function (req, res) {
  db.add({
    title: req.body.title,
    body: req.body.body
  })
    .then(success => res.status(200).send(success))
    .catch(err => res.status(500).send(err))
}) 