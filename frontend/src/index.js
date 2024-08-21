import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
  devtools: {
    enabled: true,
  },
})

const root = createRoot(document.getElementById('root'))
root.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
)
