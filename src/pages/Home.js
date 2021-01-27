import React from 'react';
import SearchForm from '../components/SearchForm';
import CocktailsList from '../components/CocktailsList';
function Home() {
  return (
    <main>
      <SearchForm />
      <CocktailsList />
    </main>
  );
}

export default Home;
