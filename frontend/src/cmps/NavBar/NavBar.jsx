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

                {/* <button className="menu" onClick="this.classList.toggle('opened');this.setAttribute('aria-expanded', this.classList.contains('opened'))" aria-label="Main Menu"> */}
                {/* <div className="menu"> */}

                <a className={`${navMobile ? 'opened':'menu'}`} onClick={() => toggleNavMobile(!navMobile)} aria-label="Main Menu">
                    <svg width="50" height="50" viewBox="0 0 100 100" >
                        <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                        <path className="line line2" d="M 20,50 H 80" />
                        <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                    </svg>
                </a>
                {/* </div> */}
                    {console.log('navMobile:', navMobile)}
                {/* <span className="navBtn " onClick={() => toggleNavMobile(!navMobile)}><i className={`fa fa-${navMobile ? 'times' : 'bars'}`}></i></span> */}



                {/* <div className="centerr"> */}



                <div>
                    <div className="navBar align-center" style={{ display: navMobile && 'flex' }}>
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

