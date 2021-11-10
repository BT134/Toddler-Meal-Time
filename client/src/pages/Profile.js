import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_RECIPE } from "../utils/mutations";
import { removeRecipeId, saveRecipeIds } from "../utils/localStorage";
import { QUERY_ME } from '../utils/queries';
import { Grid, Box, Heading, Flex, VStack, Text, LinkBox, Image, IconButton } from '@chakra-ui/react';
import { Link as ReactLink} from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons'
import Auth from '../utils/auth';

const Profile = () => {
  
  const { loading, data } = useQuery(QUERY_ME);

  const userData = data?.me || [];

  const [removeRecipe, { error }] = useMutation(REMOVE_RECIPE);

  const handleDeleteRecipe = async (recipeId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    
    if(!token) {
        return false;
    }
    try {
        const response = await removeRecipe({
            variables: { recipeId: recipeId },
        });

        if (!response) {
            throw new Error('Something went wrong!');
        }
        removeRecipeId(recipeId);
    } catch (err) {
        console.error(error);
    }
};

  if (loading) {
    return <Heading>Loading......</Heading>;
  }
  
  const savedRecipeIds = userData.savedRecipes.map((recipe) => recipe.recipeId);
  saveRecipeIds(savedRecipeIds);

  return (
    <Box>
      <Flex py={10}>
        <VStack w='full' h='full' p={4} spacing={10}>
          <Text align='left' fontSize='xl' fontWeight='bold'>
            {userData.savedRecipes.length
              ? `Viewing ${userData.savedRecipes.length} saved ${userData.savedRecipes.length === 1 ? 'Recipe' : 'Recipes'}:`
              : "You have no recipe's saved!"}
          </Text>
          <Grid templateColumns="repeat(4, 1fr)" gap={6} mt={8} w="100%" >
            {userData.savedRecipes.map((recipes) => {
              return (
            <LinkBox key={recipes.recipeId} as={ReactLink} to={`/recipe/${recipes._id}`} w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden"> 
                <Image src={recipes.image} />
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
                    <IconButton
                      colorScheme='red'
                      aria-label='delete recipe'
                      icon={<DeleteIcon/>}
                      onClick={() => handleDeleteRecipe(recipes.recipeId)}
                      />
                    </Box>
                    
            </LinkBox>
              ) 
            })}
            </Grid>      
        </VStack>
      </Flex>
    </Box>
  );
};

export default Profile;
