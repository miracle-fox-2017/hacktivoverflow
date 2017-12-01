const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const user = require('./routers/user')
const question = require('./routers/question')
const answer = require('./routers/answer');


mongoose.connection.openUri(process.env.MONGO_URL, (err) => {
  if(err) console.log(err);

    console.log('connect');

  })

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/user', user)
app.use('/api/question', question)
app.use('/api/answer', answer)



app.listen(port, () => {
  console.log('Server running on port', port);
});
