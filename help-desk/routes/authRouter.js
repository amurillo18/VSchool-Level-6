const express = require("express")
const authRouter = express.Router()
const {registerUser, loginUser, currentUser} = require('../controllers/authController.js')
const {protect} = require( '../middleware/authMiddleware.js')

// Signup
authRouter.post('/register', registerUser)
// Login
authRouter.post('/login', loginUser)
//get current user
authRouter.get('/currentUser', protect, currentUser)

module.exports = authRouter