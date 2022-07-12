const express = require('express')
const router = express.Router({mergeParams: true})

const {protect} = require('../middleware/authMiddleware')
const {getNotes, createNote} = require('../controllers/noteController')

// .route allows you to chain multiple different types of requests - ex: .get().post()
router.route('/').get(protect, getNotes).post(protect, createNote)

module.exports = router