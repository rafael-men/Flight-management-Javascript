const express = require('express')
const { getFlights, getFlightById, createFlight, updateFlight, deleteFlight, patchFlight } = require('../Controllers/flightController')
const authMiddleware = require('../Security/authMiddleware')
const { param } = require('express-validator')

const router = express.Router()

// Aplica autenticação globalmente
router.use(authMiddleware)

/**
 * @swagger
 * /flightManager/flights:
 *   get:
 *     summary: Retorna a lista de todos os voos
 *     tags: [Voos]
 *     security: []
 */
router.get('/flights', getFlights)

/**
 * @swagger
 * /flightManager/flights/{id}:
 *   get:
 *     summary: Retorna um voo específico pelo ID
 *     tags: [Voos]
 *     security: []
 */
router.get('/flights/:id', [param('id').isUUID().withMessage('ID inválido')], getFlightById)

/**
 * @swagger
 * /flightManager/flights:
 *   post:
 *     summary: Cria um novo voo
 *     tags: [Voos]
 *     security: []
 */
router.post('/flights/novo', createFlight)

/**
 * @swagger
 * /flightManager/flights/{id}:
 *   put:
 *     summary: Atualiza um voo existente pelo ID
 *     tags: [Voos]
 *     security: []
 */
router.put('/flights/:id', updateFlight)

/**
 * @swagger
 * /flightManager/flights/{id}:
 *   delete:
 *     summary: Deleta um voo pelo ID
 *     tags: [Voos]
 *     security: []
 */
router.delete('/flights/deletar/:id', deleteFlight)

/**
 * @swagger
 * /flightManager/flights/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um voo pelo ID
 *     tags: [Voos]
 *     security: []
 */
router.patch('/flights/atualizarParcialmente/:id', patchFlight)

module.exports = router
