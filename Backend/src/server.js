const express = require("express")
const app = express()
const { syncDBflights, syncDBusers } = require("./Models")
const flightRoutes = require('./Routes/flightRoutes')
const authRoutes = require('./Routes/authRoutes')
const requestLogger = require("./Middlewares/requestLogger")
const errorHandler = require("./Middlewares/errorTreatmentMiddleware")
const {swaggerUi,swaggerDocs} = require('./Config/SwaggerConfig')

const port = 3008


// Middlewares
app.use(express.json())
app.use(requestLogger)
app.use(errorHandler)
app.use("/flightManager", flightRoutes)
app.use('/auth',authRoutes)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

async function startServer() {
    try {
        await syncDBflights()
        await syncDBusers()
        console.log("Banco de dados conectado :)")
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    } catch (err) {
        console.error("Erro ao se conectar com o banco de dados..", err);
    }
}

startServer()
