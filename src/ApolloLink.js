import React from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { GRAPHQL_ENDPOINT } from './configs'

const logLink = new ApolloLink((operation , forward) => {
  console.log(`Starting request for ${operation.operationName}.`)
  return forward(operation).map((data) => {
    console.log(`Ending request for ${operation.operationName}.`)
    return data
  })
})

const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT })

const client = new ApolloClient({
  link: ApolloLink.from([logLink, httpLink]),
  cache: new InMemoryCache(),
})

const GET_POSTS = gql`
  query getPosts {
    allPosts {
      id
      description
      imageUrl
    }
  }
`

const ApolloLinkComponent = () => {
  return (
    <div>
      <h2>apollo-link</h2>
      <Query query={GET_POSTS} client={client}>
        {({ data: { allPosts }, loading, error }) => {
          if (loading) return 'Loading...'
          if (error) return 'Error...'

          return (
            <div>
              {allPosts.map((post) => {
                return (
                  <p key={post.id}>{post.description}</p>
                )
              })}
            </div>
          )
        }}
      </Query>
    </div>
  )
}

export default ApolloLinkComponent
