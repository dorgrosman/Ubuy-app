
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../../actions/UserActions'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../../cmps/LoadingBox/LoadingBox';
import MassageBox from '../../cmps/MassageBox/MassageBox';

import './RegisterPage.scss'

const RegisterPage = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/home'

    const userRegister = useSelector((state) => state.userRegister)
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Password in confirem is wrong')
            return
        }
        dispatch(register(name, email, password))
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
                    <h1>Create Account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MassageBox variant="danger">{error}</MassageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter name" required
                        onChange={event => setName(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder="Enter email" required
                        onChange={event => setEmail(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password" required
                        onChange={event => setPassword(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder="Confirm password" required
                        onChange={event => setConfirmPassword(event.target.value)} />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit"> Register</button>
                </div>
                <div>
                    <label />
                    <div >New customer? {' '}
                        Already have an account?<Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                    </div>
                    
                </div>
            </form>
        </div>
    )

}

export default RegisterPage

