const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Note = require('../models/noteModel')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

const getNotes = asyncHandler( async(req, res) => {
    
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const notes = await Note.find({ticket: req.params.ticketId})

    res.status(200).json(notes)
})


const createNote = asyncHandler( async(req, res) => {
    
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const {text} = req.body

    noteData = {
        ticket: ticket._id,
        user: user._id,
        text,
        isStaff: false,
    }
    
    const note = await Note.create(noteData)

    res.status(201).json(note)

})


module.exports = {
    getNotes,
    createNote,
}