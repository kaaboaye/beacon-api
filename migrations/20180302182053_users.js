exports.up = function(knex, Promise) {
  return knex
    .schema
    .createTable('users', function (users) {
      users.increments();

      users.string('email')
        .notNullable()
        .unique();

      users.string('name')
        .notNullable();

      users.string('last_name')
        .notNullable();

      users.boolean('active');

      users.bigInteger('phone_number');

      users.timestamp('created_at')
        .notNullable();
    })
  
};

exports.down = function(knex, Promise) {
  return knex
    .schema
    .dropTable('users')
};
