import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import './App.css'

const fetchPosts = gql`
  query fetchPosts {
    allPosts {
      id
      description
      imageUrl
    }
  }
`

class App extends Component {
  render() {
    return (
      <Query query={fetchPosts}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'
          if (error) return 'Error...'
        
          return (
            <div className="App">
              {data.allPosts.map(post => (
                <div key={post.id}>{post.description}</div>
              ))}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default App
