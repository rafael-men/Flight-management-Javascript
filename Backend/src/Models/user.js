const {DataTypes} = require('sequelize')
const sequelize = require('../Config/database')

const User = sequelize.define('Flight', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    tableName: "users_tb",
    timestamps: false
})


module.exports = User