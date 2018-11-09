import React from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { Query, ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { GRAPHQL_ENDPOINT } from './configs'

const batchLink = new BatchHttpLink({
  uri: GRAPHQL_ENDPOINT,
  batchMax: 5,
  batchInterval: 15,
})

const client = new ApolloClient({
  link: batchLink,
  cache: new InMemoryCache(),
})

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

const BATCH_HTTP_COMPONENT = `import React from 'react'
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
    <ApolloProvider client={client}>
      <div>
        <h1>apollo-link-batch-http</h1>
        <p>Combine multiple requests into single request.</p>
        <h2>Usage</h2>
        <p>Apollo client setup with batch request.</p>
        <SyntaxHighlighter language='javascript'>
          {SETUP_APOLLO_BATCH_HTTP}
        </SyntaxHighlighter>
        <p>We have two request 'getPosts' and 'getComments'.</p>
        <SyntaxHighlighter language='javascript'>
          {BATCH_HTTP_COMPONENT}
        </SyntaxHighlighter>
        <h2>Result</h2>
        <p>Open browser network tab. You'll see only single GraphQL request and it's payload is an array.</p>
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
  )
}

export default ApolloLinkBatchHTTP
