import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'
import Search from './Search';
import useHttp from '../../hooks/http'

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

// const httpReducer = (currHttpState, action) => {
//   switch (action.type) {
//     case 'SEND':
//       return { loading: true, error: null }
//     case 'RESPONSE':
//       return { ...currHttpState, loading: false }
//     case 'ERROR':
//       return { loading: false, error: action.errorMessage }
//     case 'CLEAR':
//       return { ...currHttpState, error: null }
//     default:
//       throw new Error('Should not get here!')
//   }
// }

function Ingredients() {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  const { isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifer,
    clear } = useHttp()
  // const [userIngredients, setUserIngredients] = useState([])

  // const [httpState, dispatchHttp] = useReducer(httpReducer, {
  //   loading: false,
  //   error: null
  // });

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
    if (!isLoading && !error && reqIdentifer === 'REMOVE_INGREDIENT') {
      dispatch({ type: 'DELETE', id: reqExtra });
    } else if (!isLoading && !error && reqIdentifer === 'ADD_INGREDIENT') {
      dispatch({
        type: 'ADD',
        ingredient: { id: data.name, ...reqExtra }
      });
    }
  }, [data, reqExtra, reqIdentifer, isLoading, error]);

  const filteredIngredientHandler = useCallback(filteredIngredients => {
    // setUserIngredients(filteredIngredients)
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest(
      // setIsLoading(true)
      'https://reacthookspractice.firebaseio.com/ingredients.json',
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    );
  }, [sendRequest]);



  const removeIngredientHandler = useCallback(ingredientId => {
    sendRequest(`https://reacthookspractice.firebaseio.com/ingredients/${ingredientId}.json`, 'DELETE',
      null,
      ingredientId,
      'REMOVE_INGREDIENT'
    );
  },
    [sendRequest]
  );


  // const clearError = useCallback(() => {
  //   // dispatchHttp({ type: 'CLEAR' })
  //   // setError(null);
  // }, []);

  const ingredientList = useMemo(() => {
    return <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
  }, [userIngredients, removeIngredientHandler])

  return (
    <div className="App">
      {error && (
        <ErrorModal onClose={clear}>{error}</ErrorModal>
      )}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadedIngredients={filteredIngredientHandler} />
        {/* <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} /> */}
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
