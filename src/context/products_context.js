import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url, single_product_url } from "../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const initialState = {
  isSidebarOpen: false,
  product_loading: false,
  products_error: false,
  products: [],
  feature_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSiderbar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };
  const closeSiderbar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const fetchProduct = async (url) => {
    try {
      const response = await axios.get(url);

      const products = response.data;

      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
    // dispatch();
  };

  const fetchSingleProduct = async (productId) => {
    try {
      dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
      const response = await axios.get(single_product_url + productId);

      const singelProduct = response.data;

      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singelProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  useEffect(() => {
    fetchProduct(url);
  }, []);

  return (
    <ProductsContext.Provider
      value={{ ...state, closeSiderbar, openSiderbar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
