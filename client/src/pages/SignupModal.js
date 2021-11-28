import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Center, Input, FormControl, FormLabel } from "@chakra-ui/react"
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import '../App.css'
import Auth from '../utils/auth';
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

function Signup () {
  const { isOpen, onOpen, onClose } = useDisclosure()  
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
        <button onClick={onOpen}>
        Signup
        </button>  

        <Modal isOpen={isOpen} size='lg' onClose={onClose} >
            <ModalOverlay />
            <div className="card-body"> 
            <ModalContent>
                <ModalHeader as="h4" size="md" id="signup">Sign Up</ModalHeader>
                <ModalCloseButton />
                {data ? (
                    <Center m={4}>
                      Success! You are now heading{' '}
                      <Link to="/">back to the homepage.</Link>
                    </Center>
                ) : (
                <form onSubmit={handleFormSubmit} id="form-signup">
                    <ModalBody pb={8}>
                    <FormControl isRequired my={2}>
                      <FormLabel>Username</FormLabel>
                        <Input
                          className="form-input"
                          id="form-input"
                          placeholder="Your Name"
                          name="username"
                          type="text"
                          value={formState.name}
                          onChange={handleChange}
                        />
                    </FormControl>
                        &nbsp;
                        &nbsp;
                    <FormControl>
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
                    <FormControl>
                      <FormLabel>Password</FormLabel>
                        <Input
                          className="form-input"
                          id="form-input"
                          placeholder="********"
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
                          color="teal"
                          style={{ cursor: 'pointer' }}
                          type="submit"
                          mb={3}
                          mr={2}
                        >
                          Submit
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

export default Signup;
