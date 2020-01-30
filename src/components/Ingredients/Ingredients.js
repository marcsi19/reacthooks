import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([])

  // useEffect(() => {
  //   fetch('https://reacthookspractice.firebaseio.com/ingredients.json', {
  //   }).then(response => {
  //     return response.json()
  //   }).then(responseData => {
  //     const loadedIngredients = [];
  //     for (const key in responseData) {
  //       loadedIngredients.push({
  //         id: key,
  //         title: responseData[key].title,
  //         amount: responseData[key].amount
  //       })
  //     }
  //     setUserIngredients(loadedIngredients)
  //   });
  // }, []) // search component fetches the data as well, no need to do it twice

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients);
  }, [userIngredients]);

  const filteredIngredientHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients)
  }, [])

  const addIngredientHandler = ingredient => {
    fetch('https://reacthookspractice.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json()
    }).then(responseData => {
      setUserIngredients(prevIngredeients => [
        ...prevIngredeients,
        { id: responseData.name, ...ingredient }])
    });
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadedIngredients={filteredIngredientHandler} />
        <IngredientList ingredients={userIngredients} onRemovItem={() => { }} />
      </section>
    </div>
  );
}

export default Ingredients;
