import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_USERS = gql`
  query getUsers {
    users @rest(type: "User", path: "users") {
      id
      name
    }
  }
`

const ApolloLinkREST = () => (
  <div>
    <h2>apollo-link-rest</h2>
    <Query query={GET_USERS}>
      {({ data: { users }, loading, error }) => {
        if (loading) return 'Loading...'
        if (error) return 'Error...'

        return (
          <div>
            {users.map((user) => {
              return (
                <p key={user.id}>{user.name}</p>
              )
            })}
          </div>
        )
      }}
    </Query>
  </div>
)

export default ApolloLinkREST
