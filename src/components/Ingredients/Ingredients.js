import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([])

  const addIngredientHandler = ingredient => {
    setUserIngredients(prevIngredeients => [...prevIngredeients, { id: Math.random().toString(), ...ingredient }])
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
