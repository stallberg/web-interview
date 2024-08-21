import express from 'express'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'

import { config } from '../config.js'
import { createDatabasePool } from './db/createDatabasePool.js'
import { schema } from './graphql/schema.js'
import { resolvers } from './graphql/resolvers.js'

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
})

await apolloServer.start({})

const app = express()
app.use(cors())
app.use(express.json())

const db = await createDatabasePool()

app.use(
  '/graphql',
  expressMiddleware(apolloServer, {
    // Pass DB connection to GraphQL resolvers
    context: () => {
      return { db }
    },
  })
)

app.listen(config.server.port, () =>
  console.log(`GraphQL API server running on port ${config.server.port}!`)
)
