const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc get all the tickets from currently logged user
// route GET /api/tickets
// @access Private 
const getTickets = asyncHandler( async (req, res) => {

    // get the tickets for the current user
    const tickets = await Ticket.find({user: req.user.id})

    res.status(200).json(tickets)
})

// @desc create a ticket for the currently logged user
// route POST /api/tickets
// @access Private
const createTicket = asyncHandler( async (req, res) => {

    const {product, description} = req.body
    
    if (!product || !description){
        res.status(400)
        throw new Error('Please add a product and description')
    }

    const ticket = await Ticket.create({
        description,
        product,
        user: req.user.id,
        status: 'new'
    })

    res.status(201).json(ticket)
})

module.exports = {
    getTickets,
    createTicket
}