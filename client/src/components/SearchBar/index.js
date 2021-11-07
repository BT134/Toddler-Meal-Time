import React from 'react'
import { Box, Container, Image, FormControl,
    FormLabel,
    Input,
    Button } from "@chakra-ui/react"
import './index.css';

function SearchBar () {
    return (
        <Container maxW="container.xlg" centerContent >
        
            <Image src="../images/food-background.png" alt="healthy food background" fit/>
        
            <Box width="600px" textAlign="center" id="search-bar">
                
                <FormControl id="recipe">
                    <FormLabel mb={6} id="find-recipe" >Find a Recipe</FormLabel>
                    <Input backgroundColor="white" type="text" placeholder="Search..."/>
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit">Search</Button>
          
            </Box>
        
      </Container>
    )
}

export default SearchBar;