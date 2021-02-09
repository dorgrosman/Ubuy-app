
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { signin } from '../../actions/UserActions'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../../cmps/LoadingBox/LoadingBox';
import MassageBox from '../../cmps/MassageBox/MassageBox';

import './SigninPage.scss'

const SigninPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/home'
    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();
    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(signin(email, password))
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MassageBox variant="danger">{error}</MassageBox>}
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" plecaeholder="Enter email" required
                        onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" plecaeholder="Enter password" required
                        onChange={event => setPassword(event.target.value)} />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit"> Sign In</button>
                </div>
                <div>
                    <label />
                    <div >New customer? {' '}
                        <Link to={`/register?redirect=${redirect}`}>Create Your Account</Link>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default SigninPage