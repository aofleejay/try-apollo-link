import React from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { GRAPHQL_ENDPOINT } from './configs'

const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT })

const client = new ApolloClient({
  link: httpLink,
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

const ApolloLinkHTTP = () => {
  return (
    <div>
      <h2>apollo-link-http</h2>
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

export default ApolloLinkHTTP
