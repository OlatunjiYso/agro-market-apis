
exports.up = function(knex) {
  return knex.schema
  .createTable('images', function(table) {
      table.increments('image_id');
      table.integer('market_id').unsigned().notNullable();;
      table.string('image_url', 225);
      table.datetime('image_created_at').defaultTo(knex.fn.now());
      table.datetime('image_updated_at');
      table.foreign('market_id').references('markets.market_id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('images');
};
