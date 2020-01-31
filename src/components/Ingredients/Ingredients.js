import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'
import Search from './Search';


function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

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
    setIsLoading(true)
    fetch('https://reacthookspractice.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      setIsLoading(false)
      return response.json()
    }).then(responseData => {
      setUserIngredients(prevIngredeients => [
        ...prevIngredeients,
        { id: responseData.name, ...ingredient }])
    }).catch(error => {
      setError(error.message)
      // or setError('Something went wrong')
    });
  }

  const removeIngredientHandler = ingredientId => {
    setIsLoading(true)
    fetch(`https://reacthookspractice.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response => {
      setIsLoading(false)
      setUserIngredients(prevIngredients =>
        prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      )
    }).catch(error => {
      setError(error.message)
      // or setError('Something went wrong')
    })
  }

  const clearError = () => {
    setError(null);
    setIsLoading(false);
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadedIngredients={filteredIngredientHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
