const sequelize = require('../Config/database')
const Flight = require('./flight') 

const syncDB = async () => {
    try {
        await sequelize.sync({ force: false })
        console.log("Banco de dados sincronizado com sucesso!")
    } catch (error) {
        console.error("Erro ao sincronizar banco de dados:", error)
    }
};

module.exports = { sequelize, Flight, syncDB }
