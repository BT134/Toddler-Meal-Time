import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_RECIPE } from "../utils/mutations";
import { removeRecipeId, saveRecipeIds } from "../utils/localStorage";
import { QUERY_ME } from '../utils/queries';
import { SimpleGrid, Box, Heading, Flex, VStack, Text, LinkBox, Image, Button, HStack } from '@chakra-ui/react';
import { Link as ReactLink} from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons'
import Auth from '../utils/auth';
import '../App.css'

const Profile = () => {
  
  const { loading, data } = useQuery(QUERY_ME, { fetchPolicy: "no-cache" });
  console.log(data)
  const userData = data?.me || [];

  const [removeRecipe, { error }] = useMutation(REMOVE_RECIPE, { refetchQueries: [QUERY_ME] });

  const handleDeleteRecipe = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    
    if(!token) {
        return false;
    }
    try {
        const response = await removeRecipe({
            variables: { recipeId: _id },
        });

        if (!response) {
            throw new Error('Something went wrong!');
        }
        removeRecipeId(_id);
    } catch (err) {
        console.error(error);
    }
};

  if (loading) {
    return <Heading>Loading......</Heading>;
  }
  
  const savedRecipeIds = userData.savedRecipes.map((recipe) => recipe._id);
  console.log(savedRecipeIds)
  saveRecipeIds(savedRecipeIds);

  return (
      <Flex py={10}>
        <VStack w='full' h='full' p={4} spacing={10}>
          <Text align='left' fontSize='xl' fontWeight='bold'>
            {userData.savedRecipes.length
              ? `Viewing ${userData.savedRecipes.length} Saved ${userData.savedRecipes.length === 1 ? 'Recipe' : 'Recipes'}:`
              : "You have no recipe's saved!"}
          </Text>
          <SimpleGrid columns={{sm: 2, md: 2, lg: 3, xl: 4}} spacing={8} mt={8} w="95%">
            {userData.savedRecipes.map((recipe) => (
                <Box key={recipe._id} w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden" justifyContent='center' >
                  <VStack w='full' spacing={4} >
                  <LinkBox as={ReactLink} to={`/recipe/${recipe._id}`}> 
                    <Image boxSize='450px' src={recipe.image} alt={`Photo of ${recipe.title}`} />
                    <Box p="6">
                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                      >   
                        {recipe.title}
                      </Box>
                    </Box>
                  </LinkBox>
                  
                  <HStack w='full' justifyContent='center' pb={4} spacing={4}>
                    <Button
                      colorScheme='red'
                      aria-label='delete recipe'
                      icon={<DeleteIcon/>}
                      onClick={() => handleDeleteRecipe(recipe._id)}
                    >
                      Remove Recipe
                    </Button>
                  </HStack>
                  </VStack>
                </Box>
              ) 
            )}
          </SimpleGrid>      
        </VStack>
      </Flex>
  );
};

export default Profile;
