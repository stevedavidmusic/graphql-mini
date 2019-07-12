import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './index.css'
import ApolloClient from 'apollo-boost'
// import gql from 'graphql-tag'
import { ApolloProvider } from 'react-apollo'


const client = new ApolloClient({
    uri: 'http://localhost:3050/graphql'
})

// client.query({
//     query: gql`
//         {
//             people{
//                 name
//             }
//         }
//     `
// }).then(res => console.log(res.data))

ReactDOM.render( 
    <ApolloProvider client={ client }> 
        <App />
    </ApolloProvider>, document.getElementById('root')
)