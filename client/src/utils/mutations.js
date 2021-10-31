import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_RECIPE = gql`
  mutation saveRecipe($recipeId: ID!, $title: String!, $image: String!, $ingredients: [String], $method: [String], $preptime: Int!, $cooktime: Int!) {
    saveRecipe(recipeID: $recipeID, title: $title, image: $image, ingredients: $ingredients, method: $method, preptime: $preptime, cooktime: $cooktime) {
      user {
        _id
        username
      }
    }
  }
`;

export const REMOVE_RECIPE = gql`
  mutation removeRecipe($recipeId: ID!) {
    removeRecipe(recipeId: $recipeId) {
      user {
        _id
        username
      }
    }
  }
`;
