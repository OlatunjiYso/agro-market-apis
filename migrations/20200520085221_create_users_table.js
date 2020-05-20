
exports.up = function(knex) {
  return knex.schema
  .createTable('users', function(table) {
      table.increments('user_id');
      table.string('username', 225);
      table.string('email', 225);
      table.string('password', 225);
      table.integer('role_id').unsigned().notNullable();;
      table.datetime('user_created_at').defaultTo(knex.fn.now());
      table.datetime('user_updated_at');
      table.foreign('role_id').references('role_id').inTable('roles')
      
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable('users');
};
