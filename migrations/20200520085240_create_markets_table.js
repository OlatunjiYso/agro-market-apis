
exports.up = function(knex) {
  return knex.schema
  .createTable('markets', function(table) {
      table.increments('market_id');
      table.integer('category_id').unsigned().notNullable();;
      table.string('market_name', 225);
      table.string('geo_location', 225);
      table.string('market_desc');
      table.datetime('market_created_at').defaultTo(knex.fn.now());
      table.datetime('market_updated_at');
      table.foreign('category_id').references('categories.category_id')
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable('markets');
};
