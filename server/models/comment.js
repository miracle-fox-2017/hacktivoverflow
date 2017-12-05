const mongoose = require('mongoose')
const Schema = mongoose.Schema

let commentSchema = Schema({
    questions: { type: Schema.Types.ObjectId, ref: 'Questions'},
    users: { type: Schema.Types.ObjectId, ref: 'Users'},
    comment: String
});

var Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments