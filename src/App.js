import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Home from './Home'
import ApolloLinkHTTP from './ApolloLinkHTTP'
import ApolloLinkREST from './ApolloLinkREST'
import ApolloLinkState from './ApolloLinkState'
import ApolloLinkError from './ApolloLinkError'
import ApolloLinkRetry from './ApolloLinkRetry'
import ApolloLinkBatchHTTP from './ApolloLinkBatchHTTP'

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
        <Route path="/apollo-link-rest" component={ApolloLinkREST} />
        <Route path="/apollo-link-state" component={ApolloLinkState} />
        <Route path="/apollo-link-error" component={ApolloLinkError} />
        <Route path="/apollo-link-retry" component={ApolloLinkRetry} />
        <Route path="/apollo-link-batch-http" component={ApolloLinkBatchHTTP} />
      </div>
    </BrowserRouter>
  )
}

export default App
