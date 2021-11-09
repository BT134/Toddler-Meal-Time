import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client';
import { LinkBox, Box, Container, Image, FormControl,
    FormLabel,
    Input,
    Button } from "@chakra-ui/react"
import './index.css';
import { QUERY_SEARCH_RECIPES } from '../../utils/queries';
import { Link as ReactLink} from 'react-router-dom';

const SearchBar = () => {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const [executeSearch, { data, error }] = useLazyQuery(QUERY_SEARCH_RECIPES);


    const handleFormSubmit = async (event) => {
        event.preventDefault();

       
        if (!searchInput) {
          return false;
        }

        try {
            console.log('searchInput-->', searchInput)
       
        const data = await executeSearch({
            variables: { filter: searchInput }
            }
        );
        if(error) {
            console.log(error)
        }
        console.log('data',data)

/*         if (!response.ok) {
            throw new Error("something went wrong!");
        } */

        //const { items } = await response.json();


      /*   const recipeData = items.map((recipe) => ({
            recipeId: recipe._id,
            title: recipe.title,
            image: recipe.image,
            ingredients: recipe.ingredients,
            method: recipe.method,
            preptime: recipe.preptime,
            cooktime: recipe.cooktime,
        })); */

        //setSearchedRecipes(data);
        setSearchInput("");
        } catch (err) {
        console.error(err);
        }
  };
 

    return (
        <Container maxW="100%" centerContent >
        
            <Image src="../images/food-background.png" alt="healthy food background" objectFit="cover"/>
        
            <Box width="600px" textAlign="center" id="search-bar">
                <form onSubmit={handleFormSubmit}>
                <FormControl id="recipe">
                    <FormLabel mb={6} id="find-recipe" >Find a Recipe</FormLabel>
                    <Input backgroundColor="white" type="text" placeholder="Search..."
                    value={searchInput}
                    autoComplete='off'
                    onChange={(e) => setSearchInput(e.target.value)} />
                </FormControl>
                    <Button mt={4} colorScheme='teal' type='submit'>Search</Button>
                </form>

            </Box>
                <h2>
                {searchedRecipes.length
                    ? `Viewing ${searchedRecipes.length} results:`
                    : "Search for a Recipe to begin"}
                </h2>
                {searchedRecipes.map((recipe) => {
                return (
                <LinkBox as={ReactLink} to={`/recipe/${recipe.recipeId}`} w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden"> 
                    <Image src={recipe.image} />
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
      </Container>

    )
}

export default SearchBar;