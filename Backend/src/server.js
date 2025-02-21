const express = require("express")
const app = express()
const { syncDBflights, syncDBusers } = require("./Models")
const flightRoutes = require('./Routes/flightRoutes')
const authRoutes = require('./Routes/authRoutes')
const requestLogger = require("./Middlewares/requestLogger")
const errorHandler = require("./Middlewares/errorTreatmentMiddleware")
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const cors = require('cors')


const port = 3008


// Middlewares
app.use(express.json())


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Voos',
      version: '1.0.0',
      description: 'API para gerenciamento de voos.',
    },
    components: {
      schemas: {
        flights: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID do voo' },
            flightNumber: { type: 'string', description: 'Número do voo' },
            airlineImage: { type: 'string', description: 'Companhia aérea' },
            origin: { type: 'string', description: 'Origem do voo' },
            destination: { type: 'string', description: 'Destino do voo' },
            arrivalTime: { type: 'string', format: 'date-time', description: 'Horário de chegada' },
            status: {
              type: 'string',
              enum: ["PREVISTO","ATRASADO","CANCELADO","EMBARQUE INICIADO","ÚLTIMA CHAMADA","DESEMBARQUE INICIADO"],
              description: 'Status do voo',
            },
            seatsAvailable: { type: 'integer', description: 'Número de assentos disponíveis' },
          },
          required: ['flightNumber', 'airlineImage', 'origin', 'destination', 'arrivalTime', 'status', 'seatsAvailable'],
        },
      },
    },
  },
  apis: ['./Routes/*.js'], // Caminho para os arquivos de rotas
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(cors())
app.use(requestLogger)
app.use(errorHandler)
app.use("/flightManager", flightRoutes)
app.use('/auth',authRoutes)


async function startServer() {
    try {
        await syncDBflights()
        await syncDBusers()
        console.log("Banco de dados conectado :)")
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`)
        })
    } catch (err) {
        console.error("Erro ao se conectar com o banco de dados..", err)
    }
}

startServer()
