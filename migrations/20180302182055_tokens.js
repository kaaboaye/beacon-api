
exports.up = function(knex, Promise) {
  return knex
    .schema
    .createTable('tokens', function (tokens) {
      tokens.increments();

      tokens.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users');

      tokens.integer('token')
        .notNullable();

      tokens.dateTime('expire_at')
        .notNullable();

      tokens.timestamp('created_at')
        .notNullable();
    })
};

exports.down = function(knex, Promise) {
  return knex
    .schema
    .dropTable('tokens')
};
