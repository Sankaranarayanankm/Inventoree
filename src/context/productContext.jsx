import React, { createContext, useReducer, useEffect } from "react";

export const productContext = createContext({
  products: [],
  filtered: [],
  cartItems: [],
  orderedItems: [],
  addProducts: () => {},
  filterProducts: () => {},
  addToCart: () => {},
  orderItems: () => {},
});

const reducer = (state, action) => {
  if (action.type === "ADD") {
    return {
      ...state,
      products: action.payload,
      filtered: action.payload,
    };
  } else if (action.type === "FILTER") {
    const filteredData = state.products.filter(
      (item) => item.category === action.payload
    );
    return {
      ...state,
      filtered: filteredData,
    };
  } else if (action.type === "CART") {
    const existingCartItemIndex = state.cartItems.findIndex(
      (item) => item.id == action.payload.id
    );

    let updatedCartItems = [...state.cartItems];

    if (existingCartItemIndex >= 0) {
      updatedCartItems[existingCartItemIndex] = {
        ...updatedCartItems[existingCartItemIndex],
        quantity: updatedCartItems[existingCartItemIndex].quantity + 1,
      };
    } else {
      updatedCartItems = [
        ...updatedCartItems,
        { ...action.payload, quantity: 1 },
      ];
    }

    return {
      ...state,
      cartItems: updatedCartItems,
    };
  } else if (action.type === "ORDER") {
    const currentCartItems = state.cartItems;

    return {
      ...state,
      orderedItems: currentCartItems,
      cartItems: [],
    };
  } else {
    return state;
  }
};

const initialState = {
  products: [],
  filtered: [],
  cartItems: [],
  orderedItems: [],
};

export default function ProductContext(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addProducts(data) {
    dispatch({ type: "ADD", payload: data });
  }

  function filterProducts(data) {
    dispatch({ type: "FILTER", payload: data });
  }

  function addToCart(data) {
    dispatch({ type: "CART", payload: data });
  }

  function orderItems() {
    dispatch({ type: "ORDER" });
  }

  const defaultValue = {
    products: state.products,
    cartItems: state.cartItems,
    filtered: state.filtered,
    addProducts,
    addToCart,
    filterProducts,
    orderItems,
  };

  return (
    <productContext.Provider value={defaultValue}>
      {props.children}
    </productContext.Provider>
  );
}
