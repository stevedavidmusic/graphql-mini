const axios = require('axios')

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
  ///
} = require("graphql");

let characters = require('./model')

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => {
    return {
      id: { type: GraphQLInt },
      name: { type: GraphQLString },
      height: { type: GraphQLInt },
      films: {
        type: new GraphQLList(MovieType),
        resolve: (person) => {
          return !person.films.length 
          ? []
          : person.films.map(film => {
            return axios.get(film).then(res => res.data)
          }) 
        }
      },
      homeWorld: {
        type: HomeWorldType,
        resolve: (person) => {
          console.log('A SINGLE PERSON OBJECT FROM THE DATA', person)
          return axios.get(person.homeworld).then(res => res.data)
        }
      }
    }
  }
})

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => {
    return {
      title: { type: GraphQLString },
      releaseDate: { 
        type: GraphQLString,
        resolve: person => {
          return person.release_date
        } 
      }
    }
  }
})

const HomeWorldType = new GraphQLObjectType({
  name: 'HomeWorld',
  fields: () => {
    return {
      name: { type: GraphQLString },
      climate: { type: GraphQLString },
      population: { type: GraphQLString }
    }
  }
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      people: {
        type: new GraphQLList(PersonType),
        resolve: () => {
          return characters
        }
      },
      person: {
        type: PersonType,
        args: { id: { type: GraphQLNonNull(GraphQLInt) } },
        resolve: (parentVal, args) => {
          return characters.find(person => person.id === args.id)
        }
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => {
    return {
      deletePerson: {
        type: PersonType,
        args: { id: { type: GraphQLNonNull(GraphQLInt) } },
        resolve: (parentVal, args) => {
          let character = characters.find(e => e.id === args.id)
          characters = characters.filter(person => person.id !== args.id)
          return {
            id: character.id,
            name: character.name
          }
        }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})