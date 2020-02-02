// import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

// import IngredientForm from './IngredientForm';
// import IngredientList from './IngredientList';
// import ErrorModal from '../UI/ErrorModal';
// import Search from './Search';

// const ingredientReducer = (currentIngredients, action) => {
//   switch (action.type) {
//     case 'SET':
//       return action.ingredients;
//     case 'ADD':
//       return [...currentIngredients, action.ingredient];
//     case 'DELETE':
//       return currentIngredients.filter(ing => ing.id !== action.id);
//     default:
//       throw new Error('Should not get there!');
//   }
// };

// const httpReducer = (curHttpState, action) => {
//   switch (action.type) {
//     case 'SEND':
//       return { loading: true, error: null };
//     case 'RESPONSE':
//       return { ...curHttpState, loading: false };
//     case 'ERROR':
//       return { loading: false, error: action.errorMessage };
//     case 'CLEAR':
//       return { ...curHttpState, error: null };
//     default:
//       throw new Error('Should not be reached!');
//   }
// };

// const Ingredients = () => {
//   const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
//   const [httpState, dispatchHttp] = useReducer(httpReducer, {
//     loading: false,
//     error: null
//   });
//   // const [userIngredients, setUserIngredients] = useState([]);
//   // const [isLoading, setIsLoading] = useState(false);
//   // const [error, setError] = useState();

//   useEffect(() => {
//     console.log('RENDERING INGREDIENTS', userIngredients);
//   }, [userIngredients]);

//   const filteredIngredientsHandler = useCallback(filteredIngredients => {
//     // setUserIngredients(filteredIngredients);
//     dispatch({ type: 'SET', ingredients: filteredIngredients });
//   }, []);

//   const addIngredientHandler = useCallback(ingredient => {
//     dispatchHttp({ type: 'SEND' });
//     fetch('https://react-hooks-update.firebaseio.com/ingredients.json', {
//       method: 'POST',
//       body: JSON.stringify(ingredient),
//       headers: { 'Content-Type': 'application/json' }
//     })
//       .then(response => {
//         dispatchHttp({ type: 'RESPONSE' });
//         return response.json();
//       })
//       .then(responseData => {
//         // setUserIngredients(prevIngredients => [
//         //   ...prevIngredients,
//         //   { id: responseData.name, ...ingredient }
//         // ]);
//         dispatch({
//           type: 'ADD',
//           ingredient: { id: responseData.name, ...ingredient }
//         });
//       });
//   }, []);

//   const removeIngredientHandler = useCallback(ingredientId => {
//     dispatchHttp({ type: 'SEND' });
//     fetch(
//       `https://react-hooks-update.firebaseio.com/ingredients/${ingredientId}.json`,
//       {
//         method: 'DELETE'
//       }
//     )
//       .then(response => {
//         dispatchHttp({ type: 'RESPONSE' });
//         // setUserIngredients(prevIngredients =>
//         //   prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
//         // );
//         dispatch({ type: 'DELETE', id: ingredientId });
//       })
//       .catch(error => {
//         dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
//       });
//   }, []);

//   const clearError = useCallback(() => {
//     dispatchHttp({ type: 'CLEAR' });
//   }, []);

//   const ingredientList = useMemo(() => {
//     return (
//       <IngredientList
//         ingredients={userIngredients}
//         onRemoveItem={removeIngredientHandler}
//       />
//     );
//   }, [userIngredients, removeIngredientHandler]);

//   return (
//     <div className="App">
//       {httpState.error && (
//         <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
//       )}

//       <IngredientForm
//         onAddIngredient={addIngredientHandler}
//         loading={httpState.loading}
//       />

//       <section>
//         <Search onLoadedIngredients={filteredIngredientsHandler} />
//         {ingredientList}
//       </section>
//     </div>
//   );
// };

// export default Ingredients;

import React, { useReducer, useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id)
    default:
      throw new Error('Should not get there!')
  }
}

const httpReducer = (currHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null }
    case 'RESPONSE':
      return { ...currHttpState, loading: false }
    case 'ERROR':
      return { loading: false, error: action.errorMessage }
    case 'CLEAR':
      return { ...currHttpState, error: null }
    default:
      throw new Error('Should not get here!')
  }
}

function Ingredients() {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  // const [userIngredients, setUserIngredients] = useState([])

  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null
  });

  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState()

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
    // setUserIngredients(filteredIngredients)
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])

  const addIngredientHandler = ingredient => {
    dispatchHttp({ type: 'SEND' })
    // setIsLoading(true)
    fetch('https://reacthookspractice.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      dispatchHttp({ type: 'RESPONSE' })
      // setIsLoading(false)
      return response.json()
    }).then(responseData => {
      // setUserIngredients(prevIngredeients => [
      //   ...prevIngredeients,
      //   { id: responseData.name, ...ingredient }])
      dispatch({ type: 'ADD', ingredient: { id: responseData.name, ...ingredient } })
    })
    // .catch(error => {
    //   httpReducer({ type: 'ERROR', errorMessage: 'Something went wrong!' })
    // })
    // .catch(error => {
    //   setError(error.message)
    //   setIsLoading(false);
    //   // or setError('Something went wrong')
    // });
  }

  const removeIngredientHandler = ingredientId => {
    dispatchHttp({ type: 'SEND' })
    // setIsLoading(true)
    fetch(`https://reacthookspractice.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response => {
      dispatchHttp({ type: 'RESPONSE' })
      // setIsLoading(false)
      // setUserIngredients(prevIngredients =>
      //   prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      // )
      dispatch({ type: 'DELETE', id: ingredientId })
    }).catch(error => {
      dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' })
      // setError(error.message)
      // setIsLoading(false);
      // or setError('Something went wrong')
    })
  }

  const clearError = () => {
    dispatchHttp({ type: 'CLEAR' })
    // setError(null);
  }

  return (
    <div className="App">
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading} />
      {/* <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} /> */}

      <section>
        <Search onLoadedIngredients={filteredIngredientHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
