import React from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'

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
    <div>
      <h2>apollo-link-state</h2>
      <Query query={GET_LANGUAGE}>
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
  )
}

export default ApolloLinkState
