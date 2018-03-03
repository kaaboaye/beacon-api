var moment = require('moment');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tokens').del()
    .then(function () {
      // Inserts seed entries
      return knex('tokens').insert([
        {user_id: 1, token: 121212, expire_at: moment().add(10, 'days').calendar(), created_at: new Date()},
      ]);
    });
};
