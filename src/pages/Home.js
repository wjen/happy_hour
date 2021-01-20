import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import CocktailsList from '../components/CocktailsList';
import { useGlobalContext } from '../context';
function Home() {
  return (
    <main>
      <SearchForm />
      <CocktailsList />
    </main>
  );
}

export default Home;
