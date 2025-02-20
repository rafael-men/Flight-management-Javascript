const swaggerJSdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
          title: "Flight Management API",
          description: "API para gerenciamento de voos",
          version: "1.0.0",
        },
        servers: [
          {
            url: "http://localhost:3008", 
          },
        ],
      },
      apis: ["../Routes/**.js"], 
}

const swaggerDocs = swaggerJSdoc(swaggerOptions)

module.exports = {swaggerUi,swaggerDocs}