import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { productDetailsReducer, productListReducer, productUpdateReducer } from '../reducers/productReducers'
import { CartReducer } from './../reducers/CartReducers';
import { UserRegisterReducers, UserSigninReducers, UserUpdateProfileReducer } from '../reducers/UserSigninReducers';
import { orderDetailsReducer, OrderReducer, orderPayReducer, orderMineListReducer, orderListReducer, orderDeleteReducer, orderDeliverReducer } from './../reducers/OrderReducers';
import { UserDetailsReducer } from './../reducers/UserSigninReducers';
import { productCreateReducer, productDeleteReducer } from './../reducers/productReducers';



const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],

    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: 'PayPal',
  },
};


const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: CartReducer,
  userSignin: UserSigninReducers,
  userRegister: UserRegisterReducers,
  orderCreate: OrderReducer,
  orderDetaile: orderDetailsReducer,
  orderPay :orderPayReducer,
  mineList :orderMineListReducer,
  userDetails:UserDetailsReducer,
  userUpdateProfile: UserUpdateProfileReducer,
  productCreate:productCreateReducer,
  updateProduct:productUpdateReducer,
  productDelete:productDeleteReducer,
  orderList:orderListReducer,
  orderDelete:orderDeleteReducer,
  orderDeliver:orderDeliverReducer,

});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk)))

export default store;

