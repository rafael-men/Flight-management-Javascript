// migrations/20230214123000_nome_da_migracao.js

exports.up = function(knex) {
    return knex.schema.createTable('flights', function(table) {
      table.increments('id').primary()
      table.string('flightNumber').notNullable().unique()
      table.string('airlineImage').notNullable()
      table.string('origin').notNullable()
      table.string('destination').notNullable()
      table.timestamp('arrivalTime').notNullable()
      table.enu('status', ['PREVISTO', 'ATRASADO', 'CANCELADO', 'EMBARQUE ENCERRADO', 'DESEMBARQUE INICIADO'])
      table.integer('seatsAvaliable').notNullable()
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('flights')
  };
  