import React from 'react'; 
import { Container, Box, Image, Heading, ListItem, UnorderedList, OrderedList, Button } from "@chakra-ui/react"
import { QUERY_SINGLE_RECIPE } from '../../utils/queries';
import { useQuery } from '@apollo/client';


const RecipePage = ({ _id }) => {
    const { recipe } = useQuery({ 
        query: QUERY_SINGLE_RECIPE,
        variables: { _id } });
        console.log( {recipe} )


    return (
        <>
        <Container>
            <Box>
                <Image src={recipe.image} />
            </Box>
            <Box>
                <Heading as="h2" size="md">{recipe.title}</Heading>
                <Box p="6">
                    {recipe.preptime} Minutes
                    <br></br>
                    {recipe.cooktime} Minutes
                    <br></br>
                    <Button colorScheme="teal" type="submit">Save to My Recipe's</Button>
                </Box>
            </Box>
        </Container>
        <Container>
            <Box>
            <Heading as="h3" size="md">Ingredients:</Heading>
            {recipe.map((recipe) => (
                <UnorderedList>
                    <ListItem>{recipe.ingredients}</ListItem>
              </UnorderedList>
            ))}
            </Box>
            <Box>
            <Heading as="h3" size="md">Method:</Heading>
            {recipe.map((recipe) => (
                <OrderedList>
                    <ListItem>{recipe.method}</ListItem>
              </OrderedList>
            ))}
            </Box>
        </Container>
        </>
    )
};
  export default RecipePage;