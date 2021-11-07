import React from 'react'; 
import { Box, LinkBox, LinkOverlay, Image, Heading, Grid } from "@chakra-ui/react"


function RecipeCards ( {recipes} ) {  

    return (
        <Box>
            <Heading as="h4" size="md">Recently Added:</Heading>
            <Grid templateColumns="repeat(4, 1fr)" gap={6} mt={8} w="100%" >
            {recipes.slice(0, 8).map((recipes) => (
            <LinkBox w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden"> 
                <Image src={recipes.image} />
                    <LinkOverlay href={recipes.recipeId}>
                    <Box p="6">
                    <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                    >   
                    {recipes.title}
                    </Box>
                    </Box>
                    </LinkOverlay>
            </LinkBox> 
            ))}
            </Grid>
        </Box>
    );
  }

  export default RecipeCards;