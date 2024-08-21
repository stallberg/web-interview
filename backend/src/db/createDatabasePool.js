import { config } from '../../config.js'
import knex from 'knex'

export const createDatabasePool = async () => {
  return knex({
    client: 'pg',
    connection: config.db.connectionString,
  })
}
