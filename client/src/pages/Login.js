import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Button, Container, Box, Heading } from "@chakra-ui/react"
import '../App.css'
import Auth from '../utils/auth';

const Login = (props) => {
  
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main>
      <Container maxW="container.md" mt={20} centerContent id="login">
        <Box borderWidth="1px" borderRadius="lg" p="8" shadow="xl">
          <Heading as="h4" size="md" pb={2} id="login">Login</Heading>
          <div className="card-body">
            {data ? (
              <p>
                Success! Taking you {' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit} id="form-login">
                <input
                  className="form-input"
                  id="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  
                />
                &nbsp;
                &nbsp;
                <input
                  className="form-input"
                  id="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                &nbsp;
                &nbsp;
                <Button 
                  ml={4}
                  colorScheme="teal"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Login
                </Button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </Box>
      </Container>
      <br></br><br></br>
      <br></br><br></br>
      <br></br><br></br>
      <br></br><br></br>
      <br></br><br></br>
      <br></br><br></br>
      <br></br><br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

    </main>
  );
};

export default Login;