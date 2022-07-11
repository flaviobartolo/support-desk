import axios from 'axios'

const API_URL = '/api/tickets'

// Create a new ticket
const create = async (ticketData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, ticketData, config)

    return response.data
}

// Get all the user tickets
const getTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

// Get a single user ticket
const getTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}/${ticketId}`, config)

    return response.data
}


const ticketService = {
    create,
    getTickets,
    getTicket
}

export default ticketService