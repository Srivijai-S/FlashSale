import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCTS_BEGIN,
  GET_SINGLE_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCTS_ERROR,
  LIKE,
  UNLIKE,
  CLEAR_WISHLIST,
} from "../actions";

const reducer = (state, { type, payload }) => {
  // products
  if (type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true };
  }
  if (type === GET_PRODUCTS_SUCCESS) {
    const featuredProducts = payload.filter((item) => item.featured === true);
    return {
      ...state,
      products_loading: false,
      products: payload,
      featured_Products: payload,
    };
  }
  if (type === GET_PRODUCTS_ERROR) {
    return { ...state, products_loading: false, products_error: true };
  }

  // single product
  if (type === GET_SINGLE_PRODUCTS_BEGIN) {
    // console.log("reducer" + true);
    return {
      ...state,
      single_product_loading: true,
      single_product_error: false,
    };
  }
  if (type === GET_SINGLE_PRODUCTS_SUCCESS) {
    // console.log("reducer" + "success");

    return {
      ...state,
      single_product: payload,
      single_product_loading: false,
    };
  }
  if (type === GET_SINGLE_PRODUCTS_ERROR) {
    // console.log("reducer" + "error");

    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
    };
  }

  // wishlist

  if (type === LIKE) {
    const newLikedProducts = state.products.map((item) => {
      if (item.id === payload) {
        return { ...item, wishlisted: !item.wishlisted };
      }
      return item;
    });

    const TotalLikedProducts = newLikedProducts.filter(
      (item) => item.wishlisted === true
    );
    console.log(TotalLikedProducts);
    return {
      ...state,
      products: newLikedProducts,
      wishlisted: TotalLikedProducts,
    };
  }

  // unlike

  if (type === UNLIKE) {
    const newProducts = state.wishlisted.filter((item) => item.id !== payload);
    return { ...state, wishlisted: newProducts };
  }

  if (type === CLEAR_WISHLIST) {
    return { ...state, wishlisted: [] };
  }
  throw new Error(`no ${type} is specified`);
};
export default reducer;
