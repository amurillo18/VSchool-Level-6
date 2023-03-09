const asyncHandler = require('express-async-handler')
const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')

// get user tickets
const getTickets = asyncHandler(async(req,res) => {
    // get user using id in jwt
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({user: req.user.id})
    res.status(200).json(tickets)
})

// get user ticket
const getTicket = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)
    
    if(!ticket){
        res.status(404)
        throw new Error('Ticket Not Found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized')
    }
    res.status(200).json(ticket)
})

// create new ticket

const createTicket = asyncHandler(async(req, res) => {
    const {product, description} = req.body
    if(!product || !description){
        res.status(400)
        throw new Error("Please add a product and/or description")
    }

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })
    res.status(201).json(ticket)
})

// delete ticket
const deleteTicket = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(404)
        throw new Error("Ticket not found")
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("You are not authorized to delete this ticket.")
    }
    await ticket.remove()
    res.status(200).json({success : true})
})

//update ticket
const updateTicket = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error("Ticket not found")
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Not authorized")
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    )
    res.status(200).json(updatedTicket)
})

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket
}