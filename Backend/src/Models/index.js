const sequelize = require('../Config/database')
const Flight = require('./flight')
const User = require('./user')

const syncDBflights = async () => {
    try {
        await Flight.sync({ alter: true });
        console.log("Tabela 'flights' sincronizada com sucesso!")
    } catch (error) {
        console.error("Erro ao sincronizar a tabela 'flights':", error)
    }
}

const syncDBusers = async () => {
    try {
        await User.sync({ alter: true })
        console.log("Tabela 'users' sincronizada com sucesso!")
    } catch (error) {
        console.error("Erro ao sincronizar a tabela 'users':", error)
    }
};

module.exports = { sequelize, Flight, User, syncDBflights, syncDBusers }
