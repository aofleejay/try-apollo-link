import React from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { Query, Mutation, ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'

const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  defaults: {
    language: 'th',
  },
  resolvers: {
    Mutation: {
      setLanguage: (_, { language }, { cache }) => {
        cache.writeData({ data: { language } })
        return null
      }
    }
  },
})

const client = new ApolloClient({
  link: stateLink,
  cache,
})

const GET_LANGUAGE = gql`
  query getLanguage {
    language @client
  }
`

const SET_LANGUAGE = gql`
  mutation setLanguage($language: String!) {
    setLanguage(language: $language) @client
  }
`

const ApolloLinkState = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>apollo-link-state</h2>
        <Query query={GET_LANGUAGE} >
          {({ data: { language }, loading, error }) => {
            if (loading) return 'Loading...'
            if (error) return 'Error...'

            return (
              <Mutation mutation={SET_LANGUAGE}>
                {(setLanguage) => {
                  return (
                    <>
                      <p>Current language: {language}</p>
                      <button onClick={() => setLanguage({ variables: { language: language === 'en' ? 'th' : 'en' } })}>
                        Change to {language === 'en' ? 'th' : 'en'}
                      </button>
                    </>
                  )
                }}
              </Mutation>
            )
          }}
        </Query>
      </div>
    </ApolloProvider>
  )
}

export default ApolloLinkState
