import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [
        ...state,
        {
          id: action.destination.id,      // Access ID directly from the object
          name: action.destination.name,  // Access name directly from the object
          url: action.destination.url,    // Access URL directly from the object
          price: action.destination.price, // Access price directly from the object
          days: action.destination.days,  // Access days directly from the object
        
        }
      ];

    case "REMOVE_FROM_CART":
      // Filter out the item with the matching id
      let newArr = [...state]
      newArr.splice(action.index, 1)
      return newArr;
    case "DROP":
      let empArray = []
      return empArray
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
