const express = require("express")
const ticketRouter = express.Router()
const { getTickets, getTicket, createTicket, deleteTicket,updateTicket} = require("../controllers/ticketController")
const {protect} = require( '../middleware/authMiddleware.js')

// Re-route into note router
const noteRouter = require('./noteRouter')
ticketRouter.use('/:ticketId/notes', noteRouter)

ticketRouter.route('/').get(protect, getTickets).post(protect, createTicket)

ticketRouter.route('/:id').get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket)


module.exports = ticketRouter