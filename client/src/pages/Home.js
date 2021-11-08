import React from 'react';
import { useEffect } from 'react';
import RecipeCards from '../components/RecipeCard';
import { useQuery } from '@apollo/client';
import { Box, Container } from "@chakra-ui/react"
import SearchBar from '../components/SearchBar';
//import ThoughtList from '../components/ThoughtList';
//import ThoughtForm from '../components/ThoughtForm';
import { QUERY_RECIPES } from '../utils/queries';


const Home = () => {
  const { data } = useQuery(QUERY_RECIPES);
    
  useEffect(() => console.log(data), [data]);

  const recipes = data?.recipes || [];
    console.log(recipes)

  return (
    <main>
      <Box>
        <SearchBar />
      </Box>
      <Container maxW="container.xlg" display="flex" mt="10">
          <Box>
            <RecipeCards
            recipes={recipes}/>
          </Box>
      </Container>
    </main>
  );
};

export default Home;