import React from 'react';
import { Link as ReactLink} from 'react-router-dom';
import { Link } from "@chakra-ui/react"
import { Box, Container, Heading } from "@chakra-ui/react"
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="header">
      <Container maxW="container.xlg" mb={6}>
        <Box textAlign="center" pb={4} >
          <ReactLink to="/">
            <Heading as="h1" size="3xl">TMT</Heading>
          </ReactLink>
          <p>Toddler Meal Times</p>
        </Box>
        
        <Box textAlign="center" p={2} >
          {Auth.loggedIn() ? (
            <>
              <Link pr={6} as={ReactLink} to="/" >
                Home
              </Link>
              <Link pr={6} as={ReactLink} to="/me">
                {Auth.getProfile().data.username}'s Recipes
              </Link>

              <Link pr={6} as={ReactLink} to="/search-ingredients">
                Search by Ingredients
              </Link>
              <Link pr={6} as={ReactLink} to="/discover">
                Discover
              </Link>
              <button onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link pr={6} as={ReactLink} to="/">
                Home
              </Link>
              <Link pr={6} as={ReactLink} to="/search-ingredients">
                Search by Ingredients
              </Link>
              <Link pr={6} as={ReactLink} to="/discover">
                Discover
              </Link>
              <Link pr={6} as={ReactLink} to="/login">
                Login
              </Link>
              <Link pr={6} as={ReactLink} to="/signup">
                Signup
              </Link>
            </>
          )}
        </Box>
      </Container>
    </header>
  );
};

export default Header;