const express = require('express')
const { getFlights, getFlightById,createFlight} = require('../Controllers/flightController')

const router = express.Router()

router.get('/flights',getFlights)
router.get('/flights/:id',getFlightById)
router.post('/flights/new',createFlight)

module.exports = router