const express = require('express')
const noteRouter = express.Router({mergeParams: true})
const {protect} = require( '../middleware/authMiddleware.js')
const{  getNotes, addNote} = require("../controllers/noteController")

noteRouter.route('/').get(protect, getNotes).post(protect, addNote)

module.exports = noteRouter