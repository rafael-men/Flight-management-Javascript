const express = require("express")
const app = express()
const { syncDB } = require("./Models")
const flightRoutes = require('./Routes/flightRoutes')
const requestLogger = require("./Middlewares/requestLogger")
const errorHandler = require("./Middlewares/errorTreatmentMiddleware")


const port = 3008
app.use(express.json())
app.use(requestLogger)
app.use(errorHandler)
app.use("/flightManager", flightRoutes)

syncDB().then(() => {
    console.log("Banco de dados conectado :)")
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`)
    });
}).catch(err => {
    console.error("Erro ao se conectar com o banco de dados..", err)
})
