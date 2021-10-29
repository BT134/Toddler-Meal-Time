const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    recipes: [Recipe]
  }  
  type Recipe {
    _id: ID
    title: String
    image: String
    ingredients: String
    method: String
    preptime: Number
    cooktime: Number
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    user: [User]
    recipe: [Recipe]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;


module.exports = typeDefs;