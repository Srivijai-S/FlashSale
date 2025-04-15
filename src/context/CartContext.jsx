import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/CartReducer";
import {
  ADD_CART_ITEM,
  TOGGLE_AMT,
  REMOVE_FROM_CART,
  CLEAR_CART,
  GET_TOTAL,
} from "../actions";
const CartProvider = createContext();
import { setDoc, doc } from "firebase/firestore";
import { db } from "../config/Config";
import { useUserContext } from "./UserContext";

const initialState = {
  cart: [],
  total_Amount: 0,
  total_Price: 0,
};
const CartContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(initialState.cart);

  const { user_cart, current_user_id } = useUserContext();

  const postData = async (object, collection) => {
    if (!current_user_id) {
      return;
    }
    try {
      await setDoc(doc(db, current_user_id, collection), {
        cart: object,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    dispatch({ type: "CREATE_EXISTING_CART", payload: user_cart });
  }, [user_cart]);

  useEffect(() => {
    dispatch({ type: GET_TOTAL });
    postData(state.cart, "cart");
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // add item
  const addItem = (item, productLimited, productAdded) => {
    dispatch({
      type: ADD_CART_ITEM,
      payload: item,
      functions: { productLimited, productAdded },
    });
  };

  //remove item
  const removeItem = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  };

  // count
  const ToggleCount = ({ id, act }, productLimited) => {
    dispatch({
      type: TOGGLE_AMT,
      payload: { id, act },
      functions: { productLimited },
    });
  };

  // clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  return (
    <CartProvider.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        ToggleCount,
        clearCart,
        postData,
      }}
    >
      {children}
    </CartProvider.Provider>
  );
};

// custom hook
export const useCartContext = () => useContext(CartProvider);

export default CartContext;
