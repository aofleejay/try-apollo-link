import React from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { GRAPHQL_ENDPOINT } from './configs'

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
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache()
})

const NOT_WORKING_QUERY = gql`
  query notWorkingQuery {
    notWorkingQuery {
      nonExistField
    }
  }
`

const ApolloLinkError = () => {
  return (
    <Query query={NOT_WORKING_QUERY} client={client}>
      {({ loading }) => {
        if (loading) return 'Loading...'

        return (
          <div>
            <h2>apollo-link-error</h2>
            <p>Open console to see an error from apollo-link-error.</p>
          </div>
        )
      }}
    </Query>
  )
}

export default ApolloLinkError
