const app 		   = require('express')()
const bodyParser = require('body-parser')
const cors       = require('cors')
const mongoose   = require('mongoose')
const User       = require('./routes/userRoute')
const Question   = require('./routes/questionRoute')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use('/api/users', User)
app.use('/api/questions', Question)

mongoose.connect('mongodb://AhmadNizar:cBnmgEXaknFbpUNN@ahmadnizardb-shard-00-00-scdlc.mongodb.net:27017,ahmadnizardb-shard-00-01-scdlc.mongodb.net:27017,ahmadnizardb-shard-00-02-scdlc.mongodb.net:27017/dbpakhaji?ssl=true&replicaSet=AhmadNizarDB-shard-0&authSource=admin', (err) => {
  if(!err) {
    console.log('DATABASE TERHUBUNG');
  } else {
    console.log('TIDAK TERHUBUNG DATABASE');
  }
})

app.listen(3000, (req, res) =>{
	console.log('jalan di 3000 tong');
})