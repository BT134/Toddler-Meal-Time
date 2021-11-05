import React from 'react'; 
import Cards from '../Cards'
import recipeData from '../../recipeData.json'
import { Container } from "@chakra-ui/react"


function Wrapper(props) {
    return <div>{props.children}</div>;
}

function RecipeCards () {  

    return (
        <Container>
          <Wrapper id="card-data">
            {recipeData.map((recipe) => (
              <Cards key={recipe.id} image={recipe.image} name={recipe.title} />
            ))}
          </Wrapper>
        </Container>
    
    );
  }

  export default RecipeCards;