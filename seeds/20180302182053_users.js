
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email: 'mieszkowaw@gmail.com', name: 'Mieszko', last_name: 'Wawrzyniak', active: true, created_at: new Date()},
        {email: 'jej@sdf.sdf', name: 'Franek', last_name: 'Lewandowski', active: true, created_at: new Date()},
        {email: 'tak@tak.nuie', name: 'Milosz', last_name: 'Tatarski', active: true, created_at: new Date()},
        {email: 'nie@nie.nuie', name: 'Rafal', last_name: 'Wesoly', active: true, created_at: new Date()},
        {email: 'm@m.m', name: 'Przemek', last_name: 'Sikowrski', active: true, created_at: new Date()},
      ]);
    });
};
