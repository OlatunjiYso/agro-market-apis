
exports.up = function(knex) {
  return knex.schema
  .createTable('categories', function(table) {
      table.increments('category_id');
      table.string('category_name', 225);
      table.datetime('category_created_at').defaultTo(knex.fn.now());
      table.datetime('category_updated_at');
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable('categories')
};
