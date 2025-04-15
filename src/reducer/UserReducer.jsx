import { CREATE_NEW_USER, SIGN_OUT_USER } from "../actions";

const reducer = (state, { type, payload }) => {
  // console.log(payload.type);
  if (type === CREATE_NEW_USER) {
    return {
      ...state,
      current_user: payload.user,
      userLogged: true,
      current_user_id: payload.uid,
    };
  }
  if (type == SIGN_OUT_USER) {
    return {
      ...state,
      current_user: "",
      userLogged: false,
      current_user_id: null,
    };
  }
  if (type === "CREATE_EXISTING_CART") {
    // console.log(payload);
    return { ...state, user_cart: payload };
  }
  // return state;
  throw new Error(`no ${payload.type} defined `);
};

export default reducer;
