import React, {useState, useEffect } from 'react'; 
import { Container, Grid, GridItem, Box, Image, Heading, ListItem, UnorderedList, OrderedList, Button } from "@chakra-ui/react"
import { QUERY_SINGLE_RECIPE } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { SAVE_RECIPE } from "../../utils/mutations";
import Auth from '../../utils/auth';
import { saveRecipeIds, getSavedRecipeIds } from "../../utils/localStorage";
import { useMutation } from '@apollo/client';
import { FaHeart } from "react-icons/fa"
import './index.css'


const RecipePage = () => {
    const { recipeId } = useParams();
    const [savedRecipeIds, setSavedRecipeIds] = useState(getSavedRecipeIds());
    //const [recipes, setRecipes] = useState([]);
    const {loading, data } = useQuery(QUERY_SINGLE_RECIPE, {
        variables: {recipeId: recipeId }
    }); 
            
    useEffect(() => {
        return () => {
            saveRecipeIds(savedRecipeIds);
        };
    });

    const [saveRecipe, { error }] = useMutation(SAVE_RECIPE);

    const recipe = data?.recipe || [];

    console.log(recipe)

    //setRecipes(recipe.data);
   

    const handleSaveRecipe = async(_id) => {
        const recipeToSave = recipe;
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
            return false;
        }
        try {
            const response = await saveRecipe({
                variables: {
                    input: recipeToSave,
                },
            });
            if (!response) {
                throw new Error('Something went wrong!')
            }
            setSavedRecipeIds([...savedRecipeIds, recipeToSave._id]);

        } catch (err) {
            console.error(error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        
        <Container key={recipe._id} maxW='70%' centerContent mt="18" boxShadow="md" p="6" rounded="md" bg="white" p="8" id="recipe-page">
        <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(6, 1fr)"
            gap={4}
            
        >
             <GridItem rowSpan={1} colSpan={2}>
                <Image src={recipe.image} />
            </GridItem>
            <GridItem colSpan={3}>
                <Heading as="h1" size="lg" color="teal" id="recipe-header">{recipe.title}</Heading>
                <Box mt="24" >
                    Preptime: {recipe.preptime} Minutes
                    <br></br>
                    Cooktime: {recipe.cooktime} Minutes
                    <br></br>
                    <br></br>
                    {Auth.loggedIn() && (
                        <Button
                        leftIcon={<FaHeart />}
                        colorScheme='pink'
                        aria-label='save recipe'
                        variant="outline"
                        disabled={savedRecipeIds?.some(
                        (savedRecipeId) => savedRecipeId === recipe._id
                        )}
                        onClick={() => handleSaveRecipe(recipe._id)}
                        >
                        Save to My Recipe's    
                        {savedRecipeIds?.some(
                        (savedRecipeId) => savedRecipeId === recipe._id)
                        }
                         
                        </Button>
                        
                    )}
                
                </Box>
                
            </GridItem>
        
        
            <GridItem colSpan={2} >
            <Heading as="h3" size="md" mt="" mb="3" id="ingredients">Ingredients:</Heading>
                <UnorderedList>
                    {recipe.ingredients.map((recipe) => (
                    <ListItem p="1">{recipe}</ListItem>
                    ))}
              </UnorderedList>
            
            </GridItem>
            <GridItem colSpan={4} >
            <Heading as="h3" size="md" mt="" mb="4" id="method">Method:</Heading>
            
                <OrderedList>
                {recipe.method.map((recipe) => (
                    <ListItem p="1" >{recipe}</ListItem>
                    ))}
                </OrderedList>
            
            </GridItem>
        </Grid>
        </Container>
        
    )
};
  export default RecipePage;