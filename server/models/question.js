const mongoose = require('mongoose').connect('mongodb://localhost/hacktiv');
const Schema = mongoose.Schema

let questionSchema = Schema({
    title: String,
    content: String,
    likes: [],
    users: {type: Schema.Types.ObjectId, ref: 'Users'}
});

var Questions = mongoose.model('Questions', questionSchema);

module.exports = Questions