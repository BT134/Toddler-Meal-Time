const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedRecipes: [Recipe]!
  }  
  type Recipe {
    recipeId: ID
    title: String
    image: String
    ingredients: [String]
    method: [String]
    preptime: Number
    cooktime: Number
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    user(id: String!): User
    users: [User]
    recipes: [Recipe]
    recipe: Recipe
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeRecipe(recipeId: ID!) User
    saveRecipe(recipeId: ID!, title: String!, image: String!, ingredients: [String], method: [String], preptime: Number!, cooktime: Number!) User
  }
`;


module.exports = typeDefs;