import React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

const GET_PEOPLE = gql`
  query {
    people {
      id
      name
      films {
        title
      }
    }
  }
`

export default props => {
  return (
    <Query query={GET_PEOPLE}>
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <div>
              <img className='le-image'          
                src="https://media.giphy.com/media/GIEXgLDfghUSQ/giphy.gif" 
                alt="Loading"
              />
            </div>
          )
        } else if (error) {
          return (
            <div>
              <img className='le-image'
                src="http://www.fico.com/en/blogs/wp-content/uploads/2017/03/Lack-of-Data.gif"
                alt="error"
              />
            </div>
          )
        } else {
          return props.render(data)
        }
      }}
    </Query>
  )
}