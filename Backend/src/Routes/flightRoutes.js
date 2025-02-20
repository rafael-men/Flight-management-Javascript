const express = require('express')
const { getFlights, getFlightById,createFlight, updateFlight, deleteFlight, patchFlight} = require('../Controllers/flightController')
const authMiddleware = require('../Security/authMiddleware')

const router = express.Router()

router.use(authMiddleware)

router.get('/flights',authMiddleware,getFlights)
router.get('/flights/:id',authMiddleware,getFlightById)
router.post('/flights/new',authMiddleware,createFlight)
router.put('/flights/:id',authMiddleware,updateFlight)
router.delete('/flights/deletar/:id',authMiddleware,deleteFlight)
router.patch('/flights/atualizarParcialmente/:id',authMiddleware,patchFlight)

module.exports = router