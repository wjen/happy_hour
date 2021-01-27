import React from 'react';
import Cocktail from '../components/Cocktail';
import { useGlobalContext } from '../context/context';
import Loading from '../components/Loading';

function CocktailsList() {
  const { drinksList, isLoading } = useGlobalContext();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="container">
      <h1 className="mb-3 h3">
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
