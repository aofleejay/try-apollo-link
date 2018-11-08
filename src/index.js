import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

// FIXME: Create new page with apollo-link middleware afterware example.
// const logLink = new ApolloLink((operation , forward) => {
//   console.log(`Starting request for ${operation.operationName}.`)
//   return forward(operation).map((data) => {
//     console.log(`Ending request for ${operation.operationName}.`)
//     return data
//   })
// })

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
