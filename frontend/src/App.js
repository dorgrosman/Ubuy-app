import React from 'react'
// import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import { useSelector, useDispatch } from 'react-redux';
import CartPage from './pages/CartPage/CartPage'
import ProductPage from './pages/ProductPage/ProductPage'
import SigninPage from './pages/SigninPage/SigninPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { signout } from './actions/UserActions';
import ShippingAddressPage from './pages/ShippingAddressPage/ShippingAddressPage';
import PaymentMethodPage from './pages/PaymentMethodPage/PaymentMethodPage';
import PleaseOrderPage from './pages/PleaseOrderPage/PleaseOrderPage';
import OrderPage from './pages/OrderPage/OrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage/OrderHistoryPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PrivateRoute from './cmps/PrivetRoute/PrivetRoute';
import AdminRoute from './cmps/AdminRoute/PrivetRoute';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductEditPage from './pages/ProductEditPage/ProductEditPage';
import OrderListPage from './pages/OrderListPage/OrderListPage';
import UserListPage from './pages/UserListPage';
import SearchBox from './cmps/SearchBox/SearchBox';
import SearchPage from './pages/SearchPage/SearchPage';
import UserEditPage from './pages/UserEtitPage/UserEtitPage';
import SellerRoute from './cmps/SellerRouter/SellerRouter';
import SellerPage from './pages/SellerPage/SellerPage';
import NavBar from './cmps/NavBar/NavBar';


function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };


  return (
    <BrowserRouter >
      <div className="grid-container">
        <NavBar ></NavBar> 
        
        <main>
          <Route path="/seller/:id" component={SellerPage}></Route>
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/product/:id" component={ProductPage} exact />
          <Route path="/product/:id/edit" component={ProductEditPage} exact />
          <Route path="/signin" component={SigninPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/shipping" component={ShippingAddressPage} />
          <Route path="/payment" component={PaymentMethodPage} />
          <Route path="/placeorder" component={PleaseOrderPage} />
          <Route path="/order/:id" component={OrderPage} />
          <Route path="/orderhistory" component={OrderHistoryPage} />
          <Route path="/search/name/:name?" component={SearchPage} exact />
          <PrivateRoute path="/profile" component={ProfilePage}></PrivateRoute>
          <AdminRoute path="/productList" component={ProductListPage} exact></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListPage} exact></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditPage} ></AdminRoute>
          <SellerRoute path="/productlist/seller" component={ProductListPage} ></SellerRoute>
          <SellerRoute path="/orderlist/seller" component={OrderListPage} ></SellerRoute>
          <AdminRoute path="/userlist" component={UserListPage}></AdminRoute>
          <Route path="/home" component={HomePage} />
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
