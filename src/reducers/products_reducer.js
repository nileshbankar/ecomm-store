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

const products_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
      break;
    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
      break;
    case GET_PRODUCTS_BEGIN:
      return { ...state, product_loading: true };
    case GET_PRODUCTS_ERROR:
      return { ...state, products_error: true, product_loading: false };

    case GET_SINGLE_PRODUCT_BEGIN:
      return {
        ...state,
        single_product_loading: true,
        single_product_error: false,
      };
      break;

    case GET_PRODUCTS_SUCCESS:
      const featured_product = action.payload.filter(
        (prd) => prd.featured === true
      );
      return {
        ...state,
        products: action.payload,
        product_loading: false,
        feature_products: featured_product,
      };

    case GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        single_product_error: false,
        single_product_loading: true,
      };

    case GET_SINGLE_PRODUCT_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        single_product: action.payload,
        single_product_error: false,
        single_product_loading: false,
      };
    default:
      break;
      console.log("state", state);
  }
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
