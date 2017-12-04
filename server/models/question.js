const mongoose = require('mongoose').connect('mongodb://localhost/hacktiv');

let questionSchema = mongoose.Schema({
    title: String
});

var Questions = mongoose.model('Questions', questionSchema);

module.exports = Questions