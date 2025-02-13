const {DataTypes} = require("sequelize")
const sequelize = require("../Config/database")


const Flight = sequelize.define("Flight", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    flightNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    airlineImage: {
        type:DataTypes.STRING,
        allowNull: false
    },
    origin: {
        type:DataTypes.STRING,
        allowNull:false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    arrivalTime: {
        type:DataTypes.DATE,
        allowNull: false
    },
    status: {
        type:DataTypes.ENUM("PREVISTO","ATRASADO","CANCELADO","EMBARQUE ENCERRADO","DESEMBARQUE INICIADO")
    },
    seatsAvaliable: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "flights",
    timestamps: true
})

module.exports = Flight