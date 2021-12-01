import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client';
import { LinkBox, Box, Grid, Container, Image, FormControl, FormLabel, Input, Button, Heading } from "@chakra-ui/react"
import { QUERY_SEARCH_INGREDIENTS } from '../utils/queries';
import { Link as ReactLink} from 'react-router-dom';
import '../App.css';

const SearchIngredients = () => {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [executeSearch, { data, error }] = useLazyQuery(QUERY_SEARCH_INGREDIENTS);

    useEffect(() => {
        async function getRecipes() {
            await executeSearch({
            variables: { filter: searchInput }
            });
        }

        getRecipes(); 
        }, [searchInput, executeSearch]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
          return false;
        }

        try {
            console.log('searchInput-->', searchInput)
            
        if(error) {
            console.log(error)
        }
            console.log('data',data)

        setSearchedRecipes(data.getRecipes);
       
        setSearchInput("");
        } catch (err) {
        console.error(err);
        }
    };


    return (
        <>
        <Container maxW="100%" centerContent >
        
            <Image src="../images/food-background2.png" alt="healthy food background" objectFit="cover"/>
        
            <Box width="600px" textAlign="center" id="search-bar">
                <form onSubmit={handleFormSubmit}>
                <FormControl id="recipe">
                    <FormLabel mb={6} id="find-recipe" >Search Recipes by an Ingredient</FormLabel>
                    <Input backgroundColor="white" type="text" placeholder="Search..."
                    value={searchInput}
                    autoComplete='off'
                    onChange={(e) => setSearchInput(e.target.value)} />
                </FormControl>
                    <Button mt={4} colorScheme='teal' type='submit'>Search</Button>
                </form>

            </Box>
        </Container>
        <Box >
            <Heading as="h4" size="md" mt="10" ml="4">
                {searchedRecipes.length
                    ? `Found ${searchedRecipes.length} Recipe(s):`
                    : ""}
            </Heading>

            <Grid templateColumns="repeat(4, 1fr)" gap={6} mt={8} w="100%" > 
                {searchedRecipes.map((recipe) => {
            return (     
                <LinkBox key={recipe._id} as={ReactLink} to={`/recipe/${recipe._id}`} w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden"> 
                    <Image boxSize="460px" src={recipe.image} />
                        <Box p="6">
                        <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                        >   
                        {recipe.title}
                        </Box>
                        </Box>
                        
                </LinkBox> 
            )})}
            </Grid>
        </Box>
        <br></br>
        <br></br>
        <br></br>
    </>
    )
}

export default SearchIngredients;