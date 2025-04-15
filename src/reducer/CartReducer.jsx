import {
  ADD_CART_ITEM,
  CLEAR_CART,
  GET_TOTAL,
  REMOVE_FROM_CART,
  TOGGLE_AMT,
} from "../actions";
const reducer = (state, { type, payload, functions }) => {
  // console.log(type);
  if (type === ADD_CART_ITEM) {
    const { productLimited, productAdded } = functions;

    const isProductExist = state.cart.some((item) => item.id === payload.id);

    if (isProductExist) {
      const newProducts = state.cart.map((item) => {
        if (item.id === payload.id) {
          if (item.amount >= item.stock) {
            productLimited();
            return { ...item, amount: item.amount };
          }
          productAdded();
          return { ...item, amount: item.amount + 1 };
        }

        return item;
      });
      return { ...state, cart: newProducts };
    }
    productAdded();
    return { ...state, cart: [...state.cart, payload] };
  }

  if (type === TOGGLE_AMT) {
    const { id, act } = payload;
    const { productLimited } = functions;
    if (act === "DEC") {
      // console.log("dec");
      const newItems = state.cart.map((item) => {
        if (item.id === id) {
          if (item.amount === 1) {
            return { ...item, amount: 1 };
          }
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      });
      return { ...state, cart: newItems };
    }
    if (act === "INC") {
      const newItems = state.cart.map((item) => {
        if (item.id === id) {
          if (item.amount >= item.stock) {
            productLimited();
            return { ...item, amount: item.stock };
          }
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      return { ...state, cart: newItems };
    }
  }
  if (type === REMOVE_FROM_CART) {
    const newCart = state.cart.filter((item) => item.id !== payload);
    return { ...state, cart: newCart };
  }

  if (type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  if (type === GET_TOTAL) {
    const result = state.cart.reduce(
      (prev, curr) => {
        const amount = prev.amount + curr.amount;
        const price = curr.amount * curr.price + prev.price;
        return { amount, price };
      },
      { amount: 0, price: 0 }
    );
    const { amount, price } = result;
    return { ...state, total_Amount: amount, total_Price: price };
  }

  if (type === "CREATE_EXISTING_CART") {
    // console.log(payload);
    return { ...state, cart: payload };
  }
  throw new Error(`no ${type} is specified`);
};

export default reducer;
