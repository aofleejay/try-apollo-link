const SETUP_APOLLO_LINK = `import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'

const logLink = new ApolloLink((operation , forward) => {
  console.log(\`Starting request for \${operation.operationName}.\`)
  return forward(operation).map((data) => {
    console.log(\`Ending request for \${operation.operationName}.\`)
    return data
  })
})

const httpLink = new HttpLink({ uri: '/graphql' })

const client = new ApolloClient({
  link: ApolloLink.from([logLink, httpLink]),
  cache: new InMemoryCache(),
})`

const APOLLO_LINK_COMPONENT = `import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_POSTS = gql\`
  query getPosts {
    allPosts {
      id
      description
      imageUrl
    }
  }
\`

const App = () => (
  <Query query={GET_POSTS} client={client}>
    {({ data: { allPosts }, loading, error }) => {
      if (loading) return 'Loading...'
      if (error) return 'Error...'

      return (
        <div>
          {allPosts.map(({ id, imageUrl, description }) => <img key={id} src={imageUrl} alt={description} /> )}
        </div>
      )
    }}
  </Query>
)`

export {
  SETUP_APOLLO_LINK,
  APOLLO_LINK_COMPONENT,
}