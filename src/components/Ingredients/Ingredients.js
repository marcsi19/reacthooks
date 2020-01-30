import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([])

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
        <Search />
        <IngredientList ingredients={userIngredients} onRemovItem={() => { }} />
      </section>
    </div>
  );
}

export default Ingredients;
