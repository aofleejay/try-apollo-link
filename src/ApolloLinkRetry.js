import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const NOT_WORKING_QUERY = gql`
  query notWorkingQuery {
    notWorkingQuery {
      nonExistField
    }
  }
`

const ApolloLinkRetry = () => {
  return (
    <Query query={NOT_WORKING_QUERY}>
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
