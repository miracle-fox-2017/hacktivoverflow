const express = require ('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/hacktivOverflow')
.then(() => console.log('db connection succesfull to hacktivoverflow'))
.catch((err) => console.log(err))

app.get('/', function (req, res) {
  res.send('hello world')
})

const api = require('./routes/api')
app.use('/api', api)

app.listen(4000, function () {
  console.log('im alive 4000')
})
