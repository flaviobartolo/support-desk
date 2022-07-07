const express = require('express')
const router = express.Router()

const {protect} = require('../middleware/authMiddleware')
const {getTickets, createTicket} = require('../controllers/ticketController')

// .route allows you to chain multiple different types of requests - ex: .get().post()
router.route('/').get(protect, getTickets).post(protect, createTicket)

module.exports = router