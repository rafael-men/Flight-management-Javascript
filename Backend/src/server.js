const express = require("express")
const sequelize = require("./Config/database")
const e = require("express")

const app = express()
const port = 8080

app.use(express.json())

sequelize.sync({force:true}).then(()=> {
    console.log("Banco de dados conectado :)")
    app.listen(port, () => {
        console.log(`Servidor Rodando na porta ${port}`)
    })
})
.catch(err => {
    console.error("Erro ao se conectar com o banco de dados..",err)
})
