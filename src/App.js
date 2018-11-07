import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Home from './Home'
import ApolloLinkHTTP from './ApolloLinkHTTP'
import ApolloLinkState from './ApolloLinkState'

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <nav>
          <ul style={{ paddingLeft: 0, listStyleType: 'none' }}>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
        <Route path="/" exact component={Home} />
        <Route path="/apollo-link-http" component={ApolloLinkHTTP} />
        <Route path="/apollo-link-state" component={ApolloLinkState} />
      </div>
    </BrowserRouter>
  )
}

export default App
