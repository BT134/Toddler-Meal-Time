import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Button, Box, Center, Link, FormControl, Input, FormLabel } from "@chakra-ui/react"
import '../App.css'
import Auth from '../utils/auth';
import Signup from './SignupModal';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
  } from "@chakra-ui/react";

function Login (props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
      <button onClick={onOpen}>
      Login
      </button>  

      <Modal isOpen={isOpen} size='lg' onClose={onClose} >
        <ModalOverlay />
        <div className="card-body"> 
        <ModalContent>
          <ModalHeader as="h4" size="md" pb={2} id="login">Login</ModalHeader>
          <ModalCloseButton />
            {data ? (
                <Center m={4}>
                    Success! You are now heading{' '}
                    <Link to="/">back to the homepage.</Link>
                </Center>
            ) : (
            <form onSubmit={handleFormSubmit} id="form-login">
              <ModalBody pb={8}>
                <FormControl isRequired my={2}>
                  <FormLabel>Email</FormLabel>    
                  <Input
                    className="form-input"
                    id="form-input"
                    placeholder="Your Email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </FormControl>
                  &nbsp;
                  &nbsp;
                <FormControl isRequired my={2}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    className="form-input"
                    id="form-input"
                    placeholder="**********"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                </FormControl>
                  &nbsp;
                  &nbsp;
                </ModalBody>
                <ModalFooter >
                  <Button
                    colorScheme="teal"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                    mb={3}
                    mr={2}
                  >
                    Login
                  </Button>
                  <Button 
                    mb={3}
                    mr={2}
                  >
                    <Signup/>
                  </Button>
                </ModalFooter>
            </form>
            )}
            {error && (
              <Box pl={6} mb={2}>
                {error.message}
              </Box>
            )}
        </ModalContent>
        </div>
      </Modal>
    </main>
  );
};

export default Login;