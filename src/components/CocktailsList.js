import React from 'react';
import Cocktail from '../components/Cocktail';
import { useGlobalContext } from '../context';

function CocktailsList() {
  const { drinksList, isLoading } = useGlobalContext();
  console.log(drinksList);
  if (isLoading) {
    return (
      <div class="text-center">
        <div class="spinner-border text-info" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <section className="container">
      <h1 className="text-center mb-3 display-4">
        {drinksList.length < 1 ? 'No matches...' : 'Cocktail List'}
      </h1>
      <div className="card-deck ">
        {drinksList.map((drink) => {
          return <Cocktail key={drink.id} {...drink} />;
        })}
      </div>
    </section>
  );
}

export default CocktailsList;
