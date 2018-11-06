import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider
 } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const cache = new InMemoryCache()

const logLink = new ApolloLink((operation , forward) => {
  console.log(`starting request for ${operation.operationName}`)
  return forward(operation).map((data) => {
    console.log(`ending request for ${operation.operationName}`)
    return data
  })
})

const stateLink = withClientState({
  cache,
  defaults: {
    language: 'th',
  },
  resolvers: {
    Mutation: {
      setLanguage: (_, { language }, { cache }) => {
        console.log('l', language)
        cache.writeData({ data: { language } })
        return null
      }
    }
  },
})

const httpLink = new HttpLink({ uri: process.env.REACT_APP_SERVICE_ENDPOINT })

const client = new ApolloClient({
  link: ApolloLink.from([logLink, stateLink, httpLink]),
  cache,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
