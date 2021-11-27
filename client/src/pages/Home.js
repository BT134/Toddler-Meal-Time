import React from 'react';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Box } from "@chakra-ui/react"
import SearchBar from '../components/SearchBar';
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
      <br></br>
      <br></br>

    </main>
  );
};

export default Home;