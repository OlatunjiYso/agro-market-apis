
exports.up = function(knex) {
    return knex.schema
    .createTable('locations', function(table) {
        table.increments('location_id');
        table.integer('market_id').unsigned().notNullable();;
        table.float('lat', 10,6);
        table.float('lng', 10,6);
        table.datetime('location_created_at').defaultTo(knex.fn.now());
        table.datetime('location_updated_at');
        table.foreign('market_id').references('markets.market_id').onDelete('CASCADE')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTable('locations');
  };
  