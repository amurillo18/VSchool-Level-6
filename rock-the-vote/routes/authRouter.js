const express = require("express")
const authRouter = express.Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")

// Signup

authRouter.post('/signup', (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err,user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(403)
            return next(new Error('Username is already taken, please try again'))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(201).send({token, user: savedUser.withoutPassword()})
        })
    })
})

// Login

authRouter.post('/login', (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err,user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){
            res.status(403)
            return next(new Error('Incorrect Username or Password'))
        }
        user.checkPassword(req.body.password,(err, isMatch) => {
            if(err){
                res.status(403)
                return next(new Error('Incorrect Username or Password'))
            }
            if(!isMatch){
                res.status(403)
                return next(new Error('Incorrect Username or Password'))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(200).send({token, user: user.withoutPassword()})
        })
    })
})

module.exports = authRouter