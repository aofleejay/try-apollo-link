import React from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { RetryLink } from 'apollo-link-retry'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const retryLink = new RetryLink()

const httpLink = new HttpLink({ uri: 'non exist endpoint' })

const client = new ApolloClient({
  link: ApolloLink.from([retryLink, httpLink]),
  cache: new InMemoryCache(),
})

const NOT_WORKING_QUERY = gql`
  query notWorkingQuery {
    notWorkingQuery {
      nonExistField
    }
  }
`

const ApolloLinkRetry = () => {
  return (
    <Query query={NOT_WORKING_QUERY} client={client}>
      {({ loading }) => {
        if (loading) return 'Loading...'

        return (
          <div>
            <h2>apollo-link-retry</h2>
            <p>Open console to see a retry message.</p>
          </div>
        )
      }}
    </Query>
  )
}

export default ApolloLinkRetry
