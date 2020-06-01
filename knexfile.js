// Update with your config settings.
const password = process.env.PASSWORD;
const connectionString = process.env.DATABASE_URL;
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'side_effect_tracker',
      user: 'postgres',
      password: 'marctapp'
    },
    pool:{
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds:{
      directory: './data/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: connectionString,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }

};
