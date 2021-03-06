import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Box, Heading } from "@chakra-ui/react"
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import '../App.css'
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <Container maxW="container.md" mt={20} centerContent id="signup">
        <Box borderWidth="1px" borderRadius="lg" p="8" shadow="xl">
          <Heading as="h4" size="md" mb={4} id="signup">Sign Up</Heading>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit} id="form-signup">
                <input
                  className="form-input"
                  id="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                &nbsp;
                &nbsp;
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
                  color="teal"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
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

    </main>
  );
};

export default Signup;
