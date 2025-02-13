// knexfile.js

require("dotenv").config()

module.exports = {
  client: 'pg', 
  connection: {
    host: process.env.DB_HOST,
    user: 'postgres',
    password: 'senha',
    database: process.env.DB_NAME,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};