const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
require('dotenv').config()
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')

//why i used mvc:  https://www.freecodecamp.org/news/the-model-view-controller-pattern-mvc-architecture-and-frameworks-explained/

const port = process.env.PORT || 4000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))//method inbuilt in express to recognize the incoming Request Object as strings or arrays.
app.use(morgan('dev'))

mongoose.set('strictQuery', true)
connectDB()

app.use('/auth', require('./routes/authRouter'))
app.use('/api/tickets', require('./routes/ticketRouter'))

app.use(errorHandler)

app.listen(port, () => {
    console.log(`the server is listening on port ${port}`)
})