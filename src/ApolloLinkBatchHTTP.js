import React from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { GRAPHQL_ENDPOINT } from './configs'

const client = new ApolloClient({
  link: new BatchHttpLink({
    uri: GRAPHQL_ENDPOINT,
    batchMax: 5,
    batchInterval: 15,
  }),
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

const GET_COMMENT = gql`
  query getComments {
    allComments {
      id
      text
    }
  }
`

const ApolloLinkBatchHTTP = () => {
  return (
    <div>
      <h2>apollo-link-batch-http</h2>
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
      <Query query={GET_COMMENT} client={client}>
        {({ data: { allComments }, loading, error }) => {
          if (loading) return 'Loading...'
          if (error) return 'Error...'

          return (
            <div>
              {allComments.map((comment) => {
                return (
                  <p key={comment.id}>{comment.text}</p>
                )
              })}
            </div>
          )
        }}
      </Query>
    </div>
  )
}

export default ApolloLinkBatchHTTP
