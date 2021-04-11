import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING_ADDRESS } from '../constants/CartConstants';

export const CartReducer = (state = { cartItems: [] }, action) => {
  // console.log('state.cartItems:', state.cartItems)
  switch (action.type) {
    case CART_ADD_ITEM:
      // console.log('action:', action)
      const item = action.payload;
      // console.log('item:', item)
      // console.log('state:',state.cartItems)
      // console.log('item:', item)
      console.log('item.product:', item.product)
      const existItem = state.cartItems.find((itemN) =>  itemN.product === item.product );
      console.log('existItem:', existItem)
      
      if (existItem) {
        // console.log('existItem:', existItem)
        // console.log('item:', item)
        return {
          ...state,
          cartItems: state.cartItems.map((itemN) =>
          itemN.product === existItem.product ? item : itemN
          ),
          // console.log('state:', state),
        };
      } else {
        console.log('stateEnd:', state.cartItems)
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

