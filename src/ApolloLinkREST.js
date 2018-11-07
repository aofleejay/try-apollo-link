import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_USERS = gql`
  query getUsers {
    users @rest(type: "[User]", path: "/users", endpoint: "jsonPlaceholder") {
      id
      name
    }
  }
`

const GET_MY_REPOSITORIES = gql`
  query getMyRepositories {
    repositories @rest(type: "[Repository]", path: "/users/aofleejay/repos", endpoint: "github") {
      id
      fullName: full_name
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
            <h3>Users</h3>
            {users.map((user) => {
              return (
                <p key={user.id}>{user.name}</p>
              )
            })}
          </div>
        )
      }}
    </Query>
    <Query query={GET_MY_REPOSITORIES}>
      {({ data: { repositories }, loading, error }) => {
        if (loading) return 'Loading...'
        if (error) return 'Error...'

        return (
          <div>
            <h3>My repositories</h3>
            {repositories.map((repository) => {
              return (
                <p key={repository.id}>{repository.fullName}</p>
              )
            })}
          </div>
        )
      }}
    </Query>
  </div>
)

export default ApolloLinkREST
