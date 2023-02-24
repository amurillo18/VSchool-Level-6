const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const {expressjwt} = require('express-jwt')

const port = process.env.PORT || 4000;

app.use(express.json())
app.use(morgan('dev'))

mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://Amurillo:Alex2015@cluster0.uvmcw4x.mongodb.net/RockTheVotedb?retryWrites=true&w=majority", () => console.log('connected to database'))

app.use("/auth", require('./routes/authRouter'))
app.use('/api', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })) // req.user
app.use("/api/issue", require('./routes/issueRouter'))

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

app.listen(port, () => {
    console.log(`the server is listening on port ${port}`)
})