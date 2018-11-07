import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const GET_POSTS = gql`
  query getPosts {
    allPosts {
      id
      description
      imageUrl
    }
  }
`

const ApolloLinkHTTP = (props) => {
  return (
    <div>
      <h2>apollo-link-http</h2>
      <Query query={GET_POSTS}>
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
