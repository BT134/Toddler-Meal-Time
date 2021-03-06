import React from 'react';
import { Box } from "@chakra-ui/react"
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Discover from './pages/Discover';
import SearchIngredients from './pages/Ingredients';
import Profile from './pages/Profile';
import RecipePage from './components/RecipePage';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Box w="100%">
          <Header />
          <div className="container">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/me">
              <Profile />
            </Route>
            <Route exact path="/recipe/:recipeId">
              <RecipePage />
            </Route>
            <Route exact path="/discover">
              <Discover />
            </Route>
            <Route exact path="/search-ingredients">
              <SearchIngredients />
            </Route>
          </div>
          <Footer />
        </Box>
      </Router>
    </ApolloProvider>
  );
}

export default App;