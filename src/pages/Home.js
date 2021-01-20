import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchForm from '../components/SearchForm';
import CocktailsList from '../components/CocktailsList';

function Home() {
  const [name, setName] = useState('a');
  const [isLoading, setIsLoading] = useState(true);
  const [drinks, setDrinks] = useState([]);
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${url}${name}`);
      const data = await response;
      setDrinks(data.data.drinks);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [name]);

  if (isLoading) {
    return <div className="container">Loading...</div>;
  }
  return (
    <main>
      <SearchForm name={name} setName={setName} />
      <CocktailsList drinks={drinks} />
    </main>
  );
}

export default Home;
