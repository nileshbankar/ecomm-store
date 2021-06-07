import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          company: "All",
          colors: "All",
          category: "All",
          min_price: state.filters.min_price,
          max_price: state.filters.max_price,
          price: state.filters.max_price,
          shipping: false,
        },
      };

      break;

    case FILTER_PRODUCTS:
      const { all_products } = state;

      const { text, category, company, colors, price, shipping } =
        state.filters;
      let tempProducts = all_products;

      if (text) {
        tempProducts = tempProducts.filter((product) =>
          product.name.toLowerCase().startsWith(text)
        );
      }
      if (category.toLowerCase() !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        );
      }
      if (company.toLowerCase() !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.company === company
        );
      }
      if (colors.toLowerCase() !== "all") {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((c) => c === colors);
        });
      }
      // filter by price
      tempProducts = tempProducts.filter((product) => product.price <= price);
      // filter by shipping
      if (shipping) {
        tempProducts = tempProducts.filter(
          (product) => product.shipping === true
        );
      }
      return { ...state, filter_products: tempProducts };
      break;
    case UPDATE_FILTERS:
      return {
        ...state,

        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.value,
        },
      };
      break;

    case LOAD_PRODUCTS:
      const maxPrice = action.payload
        .map((product) => product.price)
        .sort((a, b) => b - a)
        .slice(0, 1);

      return {
        ...state,
        all_products: [...action.payload],
        filter_products: [...action.payload],
        filters: {
          ...state.filters,
          max_price: maxPrice[0],
          price: maxPrice[0],
        },
      };
      break;

    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      };
      break;

    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      };
      break;
    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      };
      break;

    case SORT_PRODUCTS:
      const { sort, filter_products } = state;
      let tempProduct = [];
      console.log(sort);
      switch (sort) {
        case "price-lowest":
          tempProduct = filter_products.sort((a, b) => a.price - b.price);
          break;
        case "price-highest":
          tempProduct = filter_products.sort((a, b) => b.price - a.price);
          break;
        case "name-a":
          tempProduct = filter_products.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
        case "name-z":
          tempProduct = filter_products.sort((a, b) =>
            b.name.localeCompare(a.name)
          );
          break;

        default:
          break;
      }
      return {
        ...state,
        filter_products: tempProduct,
      };
      break;

    default:
      return { ...state };
      break;
  }
};

export default filter_reducer;
