const APOLLO_LINK_SETUP = `import { ApolloClient } from 'apollo-client'
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

const APOLLO_BATCH_HTTP_SETUP = `import { ApolloClient } from 'apollo-client'
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

const APOLLO_LINK_ERROR_SETUP = `import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => 
      console.log(\`[GraphQL error]: Message: \${message}, Location: \${locations}, Path: \${path}\`)
    )
  if (networkError) console.log(\`[Network error]: \${networkError}\`)
})

const httpLink = new HttpLink({ uri: '/graphql })

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache()
})`

const APOLLO_LINK_ERROR_COMPONENT = `import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const NOT_WORKING_QUERY = gql\`
  query notWorkingQuery {
    notWorkingQuery {
      nonExistField
    }
  }
\`

const App = () => (
  <Query query={NOT_WORKING_QUERY} client={client}>
    {({ loading }) => {
      if (loading) return 'Loading...'

      return (
        <div>
          <h2>apollo-link-error</h2>
          <p>Open browser console to see an error from apollo-link-error.</p>
        </div>
      )
    }}
  </Query>
)`

export {
  APOLLO_LINK_SETUP,
  APOLLO_LINK_COMPONENT,
  APOLLO_BATCH_HTTP_SETUP,
  APOLLO_BATCH_HTTP_COMPONENT,
  APOLLO_LINK_ERROR_SETUP,
  APOLLO_LINK_ERROR_COMPONENT,
}