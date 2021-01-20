import React from 'react';
import Cocktail from '../components/Cocktail';

function CocktailsList({ drinks }) {
  const newDrinks = drinks.map((drink) => {
    const {
      idDrink,
      strDrink,
      strDrinkThumb,
      strAlcoholic,
      strGlass,
      strIngredient1,
      strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
      strIngredient6,
    } = drink;
    return {
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
      info: strAlcoholic,
      glass: strGlass,
      ingredients: [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
      ],
    };
  });
  return (
    <section className="container">
      <h1 className="text-center mb-3">Cocktail List</h1>
      <div className="card-deck ">
        {newDrinks.map((drink) => {
          return <Cocktail {...drink} />;
        })}
      </div>
    </section>
  );
}

export default CocktailsList;
