import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <div>
    <h1>Try-apollo-link</h1>
    <p>Repository for practice about apollo link.</p>
    <ul>
      <li>
        <Link to="/apollo-link-http">apollo-link-http</Link>
      </li>
      <li>
        <Link to="/apollo-link-rest">apollo-link-rest</Link>
      </li>
      <li>
        <Link to="/apollo-link-state">apollo-link-state</Link>
      </li>
      <li>
        <Link to="/apollo-link-error">apollo-link-error</Link>
      </li>
    </ul>
  </div>
)

export default Home
