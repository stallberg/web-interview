// Update with your config settings.

import { config } from './config.js'

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  client: 'pg',
  connection: config.db.connectionString,
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/db/migrations'
  },
  seeds: {
    directory: './src/db/seeds'
  }
}
