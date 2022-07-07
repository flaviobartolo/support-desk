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


// @desc get a ticket by its ID
// route GET /api/tickets/:id
// @access Private 
const getTicket = asyncHandler( async (req, res) => {

    const ticket = await Ticket.findOne({_id: req.params.id, user: req.user.id})

    if (!ticket){
        res.status(404)
        throw new Error('Ticket doesnt exist or doesnt belong to the logged user')
    }

    res.status(200).json(ticket)

})


// @desc delete a ticket by its ID
// route DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler( async (req, res) => {
    const ticket = await Ticket.findOneAndDelete({_id: req.params.id, user: req.user.id})
    
    if (!ticket){
        res.status(404)
        throw new Error('Ticket doesnt exist or doesnt belong to the logged user')
    }

    res.status(200).json({message: 'Ticket deleted successfully', success: true})

})


// @desc update a ticket by its ID
// route PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler( async (req, res) => {
    const ticket = await Ticket.findOneAndUpdate({_id: req.params.id, user: req.user.id, }, req.body, {new: true})

    if (!ticket){
        res.status(404)
        throw new Error('Ticket doesnt exist or doesnt belong to the logged user')
    }

    res.status(200).json(ticket)

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
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket
}