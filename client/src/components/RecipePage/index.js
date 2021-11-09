import React from 'react'; 
import { Container, Box, Image, Heading, ListItem, UnorderedList, OrderedList, Link } from "@chakra-ui/react"
import { QUERY_SINGLE_RECIPE } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';


const RecipePage = () => {
    const { recipeId } = useParams();
    
    const {loading, data } = useQuery(QUERY_SINGLE_RECIPE, {
        variables: {recipeId: recipeId }
    }); 
            
    const recipe = data?.recipe || {};

    console.log(recipe)

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <>
        <Container>
            <Box>
                <Image src={recipe.image} />
            </Box>
            <Box>
                <Heading as="h2" size="md">{recipe.title}</Heading>
                <Box p="6">
                    Preptime: {recipe.preptime} Minutes
                    <br></br>
                    Cooktime: {recipe.cooktime} Minutes
                    <br></br>
                    <br></br>
                    <Link>Save to My Recipe's</Link>
                </Box>
                
            </Box>
        </Container>
        <Container>
            <Box>
            <Heading as="h3" size="md">Ingredients:</Heading>
                <UnorderedList>
                    {recipe.ingredients.map((recipe) => (
                    <ListItem>{recipe}</ListItem>
                    ))}
              </UnorderedList>
            
            </Box>
            <Box>
            <Heading as="h3" size="md">Method:</Heading>
            
                <OrderedList>
                {recipe.method.map((recipe) => (
                    <ListItem>{recipe}</ListItem>
                    ))}
                </OrderedList>
            
            </Box>
        </Container>
        </>
    )
};
  export default RecipePage;