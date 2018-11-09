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

const SETUP_APOLLO_BATCH_HTTP = `import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BatchHttpLink } from 'apollo-link-batch-http'

const batchLink = new BatchHttpLink({
  uri: '/graphql',
  batchMax: 5, // Max request per batch.
  batchInterval: 15, // Time to batch in milliseconds.
})

const client = new ApolloClient({
  link: batchLink,
  cache: new InMemoryCache(),
})`

const APOLLO_BATCH_HTTP_COMPONENT = `import React from 'react'
import { Query, ApolloProvider } from 'react-apollo'
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

const GET_COMMENT = gql\`
  query getComments {
    allComments {
      id
      text
    }
  }
\`

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>apollo-link-batch-http</h2>
      <Query query={GET_POSTS}>
        {({ data: { allPosts }, loading, error }) => {
          if (loading) return 'Loading...'
          if (error) return 'Error...'

          return (
            <div>
              <p>Posts</p>
              {allPosts.map(({ id, imageUrl, description }) => <img key={id} src={imageUrl} alt={description} /> )}
            </div>
          )
        }}
      </Query>
      <Query query={GET_COMMENT}>
        {({ data: { allComments }, loading, error }) => {
          if (loading) return 'Loading...'
          if (error) return 'Error...'

          return (
            <div>
              <p>Comments</p>
              {allComments.map(({ id, text }) => <p key={id}>{text}</p> )}
            </div>
          )
        }}
      </Query>
    </div>
  </ApolloProvider>
)`

export {
  SETUP_APOLLO_LINK,
  APOLLO_LINK_COMPONENT,
  SETUP_APOLLO_BATCH_HTTP,
  APOLLO_BATCH_HTTP_COMPONENT,
}