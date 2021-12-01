import React from 'react'; 
import { Box, LinkBox, Image, Heading, SimpleGrid } from "@chakra-ui/react"
import { Link as ReactLink} from 'react-router-dom';
import './index.css'

function RecipeCards ( {recipes} ) {  

    return (
        <Box id="recipe-card">
            <Heading as="h4" size="md" id="recipe-title">Recently Added Recipes:</Heading>
            <SimpleGrid columns={{sm: 2, md: 2, lg: 3, xl: 4}} spacing={8} mt={8} w="100%">
            {recipes.map((recipe) => (
            <LinkBox key={recipe._id} as={ReactLink} to={`/recipe/${recipe._id}`} w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden"> 
                <Image boxSize='450px' src={recipe.image} />
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
            ))}
            </SimpleGrid>
        </Box>
    );
  }

  export default RecipeCards;