import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Container, Image, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button } from "@chakra-ui/react"
//import ThoughtList from '../components/ThoughtList';
//import ThoughtForm from '../components/ThoughtForm';

import { QUERY_RECIPES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_RECIPES);
  const recipes = data?.recipes || [];



  return (
    <main>
      <Container maxW="container.xlg" centerContent>
        <Box width="100pv">
            <Image src="../images/food-background.png" alt="healthy food background" fit/>
            <Box width="600px" position="absolute" top="350" left="650" textAlign="center">
                
                <FormControl id="recipe">
                    <FormLabel mb={6} id="find-recipe" >Find a Recipe</FormLabel>
                    <Input backgroundColor="white" type="text" placeholder="Search..."/>
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit">Search</Button>
          
            </Box>
        </Box>
      </Container>
    </main>
  );
};

export default Home;