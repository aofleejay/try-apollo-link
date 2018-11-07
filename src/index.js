import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { RestLink } from 'apollo-link-rest'
import { withClientState } from 'apollo-link-state'
import { onError } from 'apollo-link-error'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {
  GITHUB_API,
  GRAPHQL_ENDPOINT,
  JSON_PLACEHOLDER_API,
} from './configs'

const cache = new InMemoryCache()

const logLink = new ApolloLink((operation , forward) => {
  console.log(`Starting request for ${operation.operationName}.`)
  return forward(operation).map((data) => {
    console.log(`Ending request for ${operation.operationName}.`)
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
        cache.writeData({ data: { language } })
        return null
      }
    }
  },
})

const RESTLink = new RestLink({
  endpoints: {
    jsonPlaceholder: JSON_PLACEHOLDER_API,
    github: GITHUB_API,
  },
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT })

const client = new ApolloClient({
  link: ApolloLink.from([logLink, stateLink, RESTLink, errorLink, httpLink]),
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
