import React from 'react'; 
import { Box, Image } from "@chakra-ui/react"
import { LinkBox, LinkOverlay } from "@chakra-ui/react"


// Individual Cards 
function Cards(props) {
    return (
      <LinkBox maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden"> 
        <Image src={props.image} />
        <LinkOverlay href={props.recipeId}>
        <Box p="6">
            <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            >   
            {props.title}
            </Box>
        </Box>
        </LinkOverlay>
      </LinkBox>
    );
}

export default Cards;