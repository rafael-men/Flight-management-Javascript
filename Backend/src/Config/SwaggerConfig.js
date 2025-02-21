const swaggerJSdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
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
  apis: ['../Routes/**.js'], 
};

const specs = swaggerJSdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1, 
      docExpansion: 'none', 
    },
  }))
}