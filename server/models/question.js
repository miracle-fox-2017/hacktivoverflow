const mongoose = require('mongoose').connect('mongodb://localhost/hacktiv');

let questionSchema = mongoose.Schema({
    title: String,
    content: String,
    answer: String
});

var Questions = mongoose.model('Questions', questionSchema);

module.exports = Questions