const {Sequelize} = require("sequelize")
require("dotenv").config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        port: process.env.DB_PORT,
        logging: true
    }
)

sequelize.authenticate()
.then(()=>console.log("Conectado ao PostgreSql com sucesso :)"))
.catch(err => console.error("Não foi possível conectar-se ao banco de dados..",err))

module.exports = sequelize