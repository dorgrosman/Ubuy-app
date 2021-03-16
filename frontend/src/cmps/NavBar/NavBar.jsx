import React, { useState } from 'react'
import SearchBox from '../SearchBox/SearchBox';
import { Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../../actions/UserActions';
import BurgerMenu from './../BurgerMenu/BurgerMenu';




export default function NavBar() {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    };
    const [navMobile, toggleNavMobile] = useState(false)

    return (
        <div>
            <header className="flex align-center space-between justify-start">

                <div>
                    <Link className="logo" to="/home">U-buy</Link>
                </div>
                <div>
                    <Route render={({ history }) => <SearchBox history={history}></SearchBox>} />
                </div>

                <span className="navBtn "  onClick={()=> toggleNavMobile(!navMobile)}><i className={`fa fa-${navMobile?'times':'bars'}`}></i></span>

                <div>
                    <div className="navBar align-center" style={{display: navMobile && 'flex'}}>
                        <Link to="/home">Home</Link>
                        <Link to="/cart">Cart
                         {cartItems.length > 0 && (<span className="badge">{cartItems.length}</span>)}
                        </Link>
                        {
                            userInfo ?
                                <div className="dropdown">
                                    <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i>{' '}</Link>
                                    <ul className="dropdown-content">
                                        <Link to="/home" onClick={signoutHandler}>Sign Out</Link>
                                        <li>
                                            <Link to="/orderhistory">Order History</Link>
                                        </li>
                                        <li>
                                            <Link to="/profile">User Profile</Link>
                                        </li>
                                    </ul>
                                </div>
                                : <Link to="/SignIn">Sign In</Link>
                        }
                        {userInfo && userInfo.isSeller && (
                            <div className="dropdown">
                                <Link to="#admin">
                                    Seller <i className="fa fa-caret-down"></i>
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/productlist/seller">Products</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderlist/seller">Orders</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <div className="dropdown">
                                <Link to="#admin">
                                    Admin <i className="fa fa-caret-down"></i>
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/productlist">Products</Link>
                                    </li>
                                    <li>
                                        <Link to="/userlist">Users</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderlist">Order</Link>
                                    </li>
                                </ul>
                            </div>


                        )}
                    </div>
                </div>

            </header>
        </div>
    )
}

