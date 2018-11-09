import React from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { GRAPHQL_ENDPOINT } from './configs'
import { APOLLO_LINK_SETUP, APOLLO_LINK_COMPONENT } from './constants'

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
      <h1>apollo-link</h1>
      <p>Use apollo-link modify request and response link middleware and afterware.</p>
      <h2>Example usage</h2>
      <p>Log before and after request by setup apollo client like so.</p>
      <SyntaxHighlighter language='javascript'>
        {APOLLO_LINK_SETUP}
      </SyntaxHighlighter>
      <p>Component code.</p>
      <SyntaxHighlighter language='javascript'>
        {APOLLO_LINK_COMPONENT}
      </SyntaxHighlighter>
      <h2>Result</h2>
      <p>Open browser console to see apollo-link log.</p>
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
    </div>
  )
}

export default ApolloLinkComponent
