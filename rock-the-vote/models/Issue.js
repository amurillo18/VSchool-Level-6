const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    likeIssue:{
        type: Array
    },
    dislikeIssue: {
        type: Array
    },
    comment: {
        type: Schema.Types.Array,
        ref: "Comment",
        required: false
      }
})

module.exports = mongoose.model("Issue", issueSchema)