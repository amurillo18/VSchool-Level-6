const express = require("express")
const issueRouter = express.Router()
const Issue = require("../models/Issue")

// get all
issueRouter.get('/',(req, res, next) => {
    Issue.find((err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

//get by user
issueRouter.get('/user', (req, res, next) => {
    Issue.find({user: req.auth._id}, (err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

// add new
issueRouter.post('/',(req, res, next) => {
    req.body.user = req.auth._id
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        } 
        return res.status(201).send(savedIssue)
    })
})

// delete
issueRouter.delete('/:issueId',(req, res, next) => {
    Issue.findOneAndDelete(
        {_id: req.params.issueId, user: req.auth._id},
        (err, deletedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            } 
            return res.status(200).send(`${deletedIssue.title} has been deleted`)
        }
    )
})

// update
issueRouter.put('/:issueId',(req, res, next) => {
    Issue.findOneAndUpdate(
        {_id: req.params.issueId, user: req.auth._id},
        req.body,
        {new: true},
        (err, updatedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            } 
            return res.status(201).send(updatedIssue)
        }
    )
})

// like
issueRouter.put(`/like/:issueId`, (req, res, next) => {
    Issue.findOneAndUpdate(
        {_id: req.params.issueId},
        {$addToSet: {likedUsers: req.auth._id},
        $pull: {dislikedUsers: req.auth._id}}, 
        {new: true},
        (err, updatedIssue) =>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201). send(updatedIssue)
        }
    )
})
// dislike
issueRouter.put(`/dislike/:issueId`, (req, res, next) => {
    Issue.findOneAndUpdate(
        {_id: req.params.issueId},
        {$addToSet: {dislikedUsers: req.auth._id},
        $pull: {likedUsers: req.auth._id}}, 
        {new: true},
        (err, updatedIssue) =>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201). send(updatedIssue)
        }
    )
})


module.exports = issueRouter