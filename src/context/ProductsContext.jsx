import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/ProductReducer";
import axios from "axios";
const ProductsProvider = createContext();
import { productsURL, singleProductURL } from "../helpers/helper";

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
import { airTable } from "../utils/airtableConfig";
import { ThemeContext } from "../context/ThemeContext";
const ProductsContext = ({ children }) => {
  const themeContext = useContext(ThemeContext);
  const productType = themeContext.isGiftShop ? "product" : "product2";
  const initialState = {
    products_error: false,
    products_loading: false,
    featured_Products: [],
    products: [],
    single_product_loading: false,
    single_product_error: false,
    single_product: {},
    wishlisted: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchProducts = () => {
    dispatch({ type: GET_PRODUCTS_BEGIN });

    airTable(productType)
      .select({
        view: "Grid view",
      })
      .eachPage(
        (records, fetchNextPage) => {
          const products = records.map((record) => {
            return {
              ...record.fields,
              image: record.fields.product_image[0].url,
              id: record.fields.id,
              wishlisted: false,
              name: record.fields.product_name,
              price: record.fields.product_price,
            };
          });
          console.log(products);
          dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            dispatch({ type: GET_PRODUCTS_ERROR });
            return;
          }
        }
      );
  };

  useEffect(() => {
    fetchProducts();
  }, [themeContext.isFoodApp]);

  const fetchSingleProduct = (id) => {
    dispatch({ type: GET_SINGLE_PRODUCTS_BEGIN });
    airTable("product")
      .select({
        filterByFormula: `{id} = "${id}"`,
      })
      .firstPage((err, records) => {
        if (err) {
          console.error("Airtable error:", err);
          dispatch({ type: GET_SINGLE_PRODUCTS_ERROR });
          return;
        }

        if (records.length === 0) {
          console.error("No matching record found");
          dispatch({ type: GET_SINGLE_PRODUCTS_ERROR });
          return;
        }

        console.log("Fetched record:", records[0]);
        dispatch({
          type: GET_SINGLE_PRODUCTS_SUCCESS,
          payload: { ...records[0].fields, id: records[0].id },
        });
      });
  };
  //
  const likeProduct = (id) => {
    dispatch({ type: LIKE, payload: id });
  };

  //
  const removeLike = (id) => {
    dispatch({ type: UNLIKE, payload: id });
  };

  // clear Wishlist

  const clearWishlist = () => {
    dispatch({ type: CLEAR_WISHLIST });
  };
  return (
    <ProductsProvider.Provider
      value={{
        ...state,
        fetchSingleProduct,
        likeProduct,
        removeLike,
        clearWishlist,
      }}
    >
      {children}
    </ProductsProvider.Provider>
  );
};

// custom hook
export const useProductsProvider = () => useContext(ProductsProvider);

export default ProductsContext;
