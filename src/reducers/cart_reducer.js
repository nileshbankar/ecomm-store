import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case COUNT_CART_TOTALS:
      const { total_items, total_amount } = state.cart.reduce(
        (total, item) => {
          total.total_items = total.total_items + item.amount;
          total.total_amount = total.total_amount + item.amount * item.price;
          return total;
        },
        { total_items: 0, total_amount: 0 }
      );

      return { ...state, total_items, total_amount };

      break;
    case TOGGLE_CART_ITEM_AMOUNT:
      const { id: idItemRemove, value } = action.payload;
      const newCart = state.cart.map((item) => {
        if (item.id === idItemRemove) {
          let newAmount =
            value === "increase" ? item.amount + 1 : item.amount - 1;

          if (newAmount > item.max) {
            newAmount = item.max;
          }
          if (newAmount < 1) newAmount = 1;

          return { ...item, amount: newAmount };
        } else {
          return item;
        }
      });

      return { ...state, cart: newCart };

      break;
    case REMOVE_CART_ITEM:
      let idItem = action.payload;

      let new_Cart = state.cart.filter((item) => item.id != idItem);

      return { ...state, cart: new_Cart };
      break;

    case CLEAR_CART:
      return { ...state, cart: [] };
      break;
    case ADD_TO_CART:
      const { id, color, amount, product } = action.payload;

      const tempItem = state.cart.find((i) => i.id === id + color);

      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });
        return { ...state, cart: tempCart };
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              id: id + color,
              name: product.name,
              color,
              amount,
              image: product.images[0].url,
              price: product.price,
              max: product.stock,
            },
          ],
        };
      }

      break;

    default:
      return state;
      break;
  }
};

export default cart_reducer;
