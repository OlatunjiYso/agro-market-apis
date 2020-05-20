
exports.up = function(knex) {
  return knex.schema
  .createTable('roles', function(table) {
      table.increments('role_id');
      table.string('role_name', 225);
      table.datetime('role_created_at').defaultTo(knex.fn.now());
      table.datetime('role_updated_at');
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable('roles');
};


