module.exports = {
  development: {
    migrations: { tableName: 'knex_migrations' },
    seeds: { tableName: './seeds' },

    client: 'pg',
    version: '7.2',
    connection: {
      host : 'localhost',
      port: 32770,
      user : 'postgres',
      password : 'mysecretpassword',
      database : 'postgres'
    }
  }
};