import { config as conf } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const envPath = resolve(__dirname, '../.env')

conf({ path: envPath })

export const config = {
  db: {
    connectionString: process.env.DB_CONNECTION_STRING,
  },
  server: {
    port: 3001,
  },
}
