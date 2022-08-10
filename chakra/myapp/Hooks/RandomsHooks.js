import httpiepower from "axios";

// @ makes http Req
// @ params: url , method = 'GET' | 'POST' | 'DELETE' | 'PUT' , data ?
// returns promise 🦄
export async function useHttpie(
  url,
  method = "GET" | "POST" | "DELETE" | "PUT",
  data = {}
) {
  return httpiepower({
    url,
    method,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    withCredentials: true,
    data,
  });
}

/*
   Use cart hook
   * USAGE
   -> Wrap Components by `cartContext.Provider`
   -> use `useCart` => const cart = useCart ()
   -> set Provider value to `cart`
   
   # DOCS
    @ cart.products => all products in cart
    @ cart.dispatch 
      @params _ { type : enum , payload? : any } 
      @returns newState
*/

import { createContext, useEffect, useReducer } from "react";
import { io } from "socket.io-client"; // web sockets

export const cartContext = createContext([]);
export const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);

export const EVENT_NAME = "onProductChange";
const LOCAL_STORAGE_NAME =
  "MXZUCCYFNRMLOEFMDCOOERIUUKEQ5eA7uB7fXZ6aA6qG1hN1yUzxZN5yE3eO5kD2xZO3qN3tF5xZWzdT4bZ3yO7mK5vCART_STORAGE";

export function useCart() {
  function saveToLocalStorage(state) {
    let ids = [];
    state.forEach((pro) => ids.push(pro.id));
    window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(ids));
  }

  function reducer(state, action) {
    switch (action.type) {
      case "Init":
        return action.payload.map((val) => {
          for (let product of state)
            if (
              parseInt(val.id) === parseInt(product.id) &&
              val.countInStock > 0
            )
              return { ...val, qt: product.qt, totalBill: product.totalBill };
          return val;
        });

      case "Add":
        if (state.filter((val) => val.id === action.payload.id).length > 0)
          return state;
        saveToLocalStorage([...state, action.payload]);
        return [...state, action.payload];

      case "Update":
        let newState = state.map((val) => {
          if (val.id === action.payload.id)
            return {
              ...val,
              qt: action.payload.qt,
              totalBill: action.payload.totalBill,
            };
          return val;
        });
        saveToLocalStorage(newState);
        return newState;

      case "Delete":
        saveToLocalStorage(state.filter((val) => val.id !== action.payload.id));
        return state.filter((val) => val.id !== action.payload.id);
    }
  }

  const [products, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    //@Cart hook init load from local storage
    async function fetchProducts() {
      try {
        var ids = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_NAME));
      } catch (err) {
        return saveToLocalStorage([]);
      }
      if (!Array.isArray(ids)) return;

      const res = await httpiepower.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/product/ids`,
        { params: { ids } }
      );
      dispatch({ type: "Init", payload: res.data });
      saveToLocalStorage(res.data);
    }

    // listening for onProductChange Event
    socket.on(EVENT_NAME, (message) => {
      fetchProducts();
    });

    fetchProducts();
  }, []);

  return { products, dispatch };
}
