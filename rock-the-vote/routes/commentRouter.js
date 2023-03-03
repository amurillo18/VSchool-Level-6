const express = require('express')
const commentRouter = express.Router()
const Comment = require("../models/Comment")
//const User = require("../models/User")
const Issue = require('../models/Issue')

// add a comment
// commentRouter.post("/:issueId/", (req,res,next) => {
//     const newComment = new Comment(req.body)
//     Issue.findByIdAndUpdate(
//         {_id: req.params.issueId, user: req.auth._id},
//         { $addToSet: {comments: {comment: newComment, user: req.auth._id}}},
//         {new: true}
//     ).populate("comments").exec((err, populatedIssues)=> {
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         return res.status(201).send(populatedIssues)
//     })
    
    // get all comments
    commentRouter.get("/", (req, res, next) => {
        Comment.find((err, comments) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.send(comments)
        })
    })

module.exports = commentRouter