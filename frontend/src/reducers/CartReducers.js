import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING_ADDRESS } from '../constants/CartConstants';

export const CartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((itemN) =>  itemN.product === item.product );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((itemN) =>
          itemN.product === existItem.product ? item : itemN
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
      case CART_REMOVE_ITEM :
        return{...state , cartItems: state.cartItems.filter((itemR) => itemR.product !== action.payload )}
      case CART_SAVE_SHIPPING_ADDRESS:
        return{...state,shippingAddress: action.payload }
      case CART_SAVE_PAYMENT:
        return{...state,savePaymenMethod: action.payload }
      case CART_EMPTY:
        return{...state,cartItems: [] }
    default:
      return state;
  }
};

