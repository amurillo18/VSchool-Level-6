const express = require("express")
const issueRouter = express.Router()
const post = require("../models/Issue")

// get all
issueRouter.get('/',(req, res, next) => {
    post.find((err, posts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(posts)
    })
})

//get by user
issueRouter.get('/userId',(req, res, next) => {
    post.find({userId: req.auth._id},(err, posts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(posts)
    })
})

// add new
issueRouter.post('/',(req, res, next) => {
    req.body.user = req.auth._id
    const newPost = new post(req.body)
    newPost.save((err, savedPost) => {
        if(err){
            res.status(500)
            return next(err)
        } 
        return res.status(201).send(savedPost)
    })
})

// delete
issueRouter.delete('/:issueId',(req, res, next) => {
    post.findOneAndDelete(
        {_id: req.params.issueId, user: req.auth._id},
        (err, deletedPost) => {
            if(err){
                res.status(500)
                return next(err)
            } 
            return res.status(200).send(`${deletedPost.title} has been deleted`)
        }
    )
})

// update
issueRouter.put('/:issueId',(req, res, next) => {
    post.findOneAndUpdate(
        {_id: req.params.issueId, user: req.auth._id},
        req.body,
        {new: true},
        (err, updatedPost) => {
            if(err){
                res.status(500)
                return next(err)
            } 
            return res.status(201).send(updatedPost)
        }
    )
})

// like
// dislike

module.exports = issueRouter