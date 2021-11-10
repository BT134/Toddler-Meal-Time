import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_RECIPES = gql`
  query getRecipe {
    recipes {
      _id
      title
      image
      ingredients
      method
      preptime
      cooktime
    }
  }
`;

export const QUERY_SEARCH_RECIPES = gql`
  query getRecipes($filter: String!) {
    getRecipes(filter: $filter) {
      _id
      title
      image
      ingredients
      method
      preptime
      cooktime
    }
  }
`;

export const QUERY_SEARCH_INGREDIENTS= gql`
  query getRecipes($filter: String!) {
    getRecipes(filter: $filter) {
      _id
      title
      image
      ingredients
      method
      preptime
      cooktime
    }
  }
`;

export const QUERY_SINGLE_RECIPE = gql`
  query getSingleRecipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
      _id
      title
      image
      ingredients
      method
      preptime
      cooktime
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedRecipes {
        _id
        title
        image
      }
    }
  }
`;
