import React from 'react'; 
import { Container, Grid, GridItem, Box, Image, Heading, ListItem, UnorderedList, OrderedList, Link } from "@chakra-ui/react"
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
        <Container maxW='70%' centerContent mt="18" boxShadow="md" p="6" rounded="md" bg="white" p="8">
        <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(6, 1fr)"
            gap={4}
            
        >
             <GridItem rowSpan={1} colSpan={2}>
                <Image src={recipe.image} />
            </GridItem>
            <GridItem colSpan={3}>
                <Heading as="h1" size="lg" color="teal">{recipe.title}</Heading>
                <Box mt="24" >
                    Preptime: {recipe.preptime} Minutes
                    <br></br>
                    Cooktime: {recipe.cooktime} Minutes
                    <br></br>
                    <br></br>
                    <Link>Save to My Recipe's</Link>
                </Box>
                
            </GridItem>
        
        
            <GridItem colSpan={2} >
            <Heading as="h3" size="md" mt="" mb="3">Ingredients:</Heading>
                <UnorderedList>
                    {recipe.ingredients.map((recipe) => (
                    <ListItem p="1">{recipe}</ListItem>
                    ))}
              </UnorderedList>
            
            </GridItem>
            <GridItem colSpan={4} >
            <Heading as="h3" size="md" mt="" mb="4">Method:</Heading>
            
                <OrderedList>
                {recipe.method.map((recipe) => (
                    <ListItem p="1" >{recipe}</ListItem>
                    ))}
                </OrderedList>
            
            </GridItem>
        </Grid>
        </Container>
        </>
    )
};
  export default RecipePage;