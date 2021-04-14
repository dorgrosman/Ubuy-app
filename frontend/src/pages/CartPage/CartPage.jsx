import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from './../../actions/CartActions';
import MassageBox from './../../cmps/MassageBox/MassageBox';
import { Link } from 'react-router-dom';
import './CartPage.scss'


const CartPage = (props) => {
   const productId = props.match.params.id;
   const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
   const cart = useSelector((state) => state.cart)
   const { cartItems } = cart

   const dispatch = useDispatch();

   useEffect(() => {
      if (productId) {
         dispatch(addToCart(productId, qty));
      }
   }, [dispatch, productId, qty]);

   const removeFromCartHandler = (itemId) => {
      dispatch(removeFromCart(itemId))
    
   }

   const checkOutHendler = () => {
      
      props.history.push('/signin?redirect=shipping');
    };
   return (
      <div className="row top">
         <div className="col-2">
            {cartItems.length === 0 ? <MassageBox>
               Cart is empty. <Link to="/home">Go to the home page</Link>
            </MassageBox> : (
                  <ul className="">
                     {  cartItems.map((item) => (
                        <li key={item.product} className="cart-list">
                           <div className="row">
                              <div>
                                 <img src={item.img} alt={item.name} className="small" />
                              </div>

                              <div className="min-30">
                                 <Link to={`/product/${item.product}`}>{item.name}</Link>
                              </div>
                              <div>
                                 <select value={item.qty}
                                    onChange={(el) =>
                                       dispatch(
                                          addToCart(item.product, Number(el.target.value)))}>
                                    {
                                       [...Array(item.countInStock).keys()].map(item => (
                                          <option key={item + 1} value={item + 1}>{item + 1}</option>
                                       ))}
                                 </select>
                              </div>
                              <div>{item.price} $</div>
                              <div>
                                 <button type="button"
                                    onClick={() => removeFromCartHandler(item.product)}
                                    className="delete-item-from-cart">Delete Item</button>

                              </div>
                           </div>
                        </li>
                     ))
                     }
                  </ul>)}
         </div>
         <div className="col-1">
            <div className="card card-body">
               <ul>
                  <li>
                     <h2 style={{width: "40rem"}}>
                        Subtotal ({cartItems.reduce((preItem, currItem) => preItem + currItem.qty, 0)} items) : $
                         {cartItems.reduce((preItem, currItem) => preItem + currItem.price * currItem.qty, 0)}
                     </h2>
                  </li>
                  {/* <strong>{props.price.toFixed(2)}</strong> */}
                  <li>
                     <button type="button"
                        onClick={checkOutHendler}
                        className="primary block"
                        disabled={cartItems.length === 0}
                       
                     >Product to Checkout</button>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default CartPage