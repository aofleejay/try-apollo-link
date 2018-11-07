import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <div>
    <h1>Apollo Link</h1>
    <p>Repository for practicing apollo-link.</p>
    <ul>
      <li>
        <Link to="/apollo-link-http">apollo-link-http</Link>
      </li>
      <li>
        <Link to="/apollo-link-state">apollo-link-state</Link>
      </li>
    </ul>
  </div>
)

export default Home
