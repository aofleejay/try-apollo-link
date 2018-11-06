import React from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'

const FETCH_POSTS = gql`
  query fetchPosts {
    allPosts {
      id
      description
      imageUrl
    }
  }
`

const GET_LANGUAGE = gql`
  query getLanguage {
    language @client
  }
`

const SET_LANGUAGE = gql`
  mutation getLanguage($language: String!) {
    setLanguage(language: $language) @client
  }
`

const Home = () => {
  return (
    <Query query={GET_LANGUAGE}>
      {({ data: { language }, loading, error }) => {
        if (loading) return 'Loading...'
        if (error) return 'Error...'

        return (
          <Query query={FETCH_POSTS}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...'
              if (error) return 'Error...'
            
              return (
                <div className="App">
                  {data.allPosts.map(post => (
                    <div key={post.id}>{post.description}</div>
                  ))}
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
                </div>
              )
            }}
          </Query>
        )
      }}
    </Query>
  )
}

const Foo = () => 'Foo'

const App = () => {
  return (
    <Router>
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/foo">Foo</Link>
            </li>
          </ul>
        </nav>
        <Route path="/" exact component={Home} />
        <Route path="/foo" component={Foo} />
      </>
    </Router>
  )
}

export default App
