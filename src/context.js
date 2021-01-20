import React, { useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AppContext = React.createContext('');

const AppProvider = ({ children }) => {
  const [name, setName] = useState('a');
  const [isLoading, setIsLoading] = useState(true);
  const [drinksList, setDrinksList] = useState([]);
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${url}${name}`);
      const data = await response;
      const drinks = data.data.drinks;
      if (drinks) {
        let newCocktails = drinks.map((drink) => {
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
        setDrinksList(newCocktails);
      } else {
        setDrinksList([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [name]);

  useEffect(() => {
    fetchData();
  }, [name, fetchData]);

  return (
    <AppContext.Provider
      value={{ name, setName, isLoading, setIsLoading, drinksList }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
