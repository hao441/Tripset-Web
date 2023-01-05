import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Home from './Home.jsx';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { login, selectAuthentication, selectMessage, selectSessionToken, selectSessionTokenExpiry, selectUserName } from '../features/auth/authSlice';

import '../App.css'
import { signupAsync } from '../features/auth/authThunk.js';

export default function SignUp() {

    //redux
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const auth = useSelector(selectAuthentication);
    const message = useSelector(selectMessage);

    //login variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    //useEffects
    useEffect(() => {
        //navigate
        if (auth) navigate('/home');
    });

    const handleSignUp = (e) => {
        e.preventDefault();
        setTimeout(() => {
            dispatch(signupAsync({email: email, password: password, passwordConfirm: passwordConfirm}))
        }, 1000);
    };

    if (auth) return (
        <Navigate replace to='/home' />
    )

    return (
        <div className="page">
            <h1>Sign up</h1>
            <form onSubmit={handleSignUp}>
                <label>Email: </label>
                <input id='email' type='email' value={email} onChange={e => setEmail(e.target.value)} required />
                <br />
                <br />
                <label>Password: </label>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} minLength='8' required />
                <br />
                <br />
                <label>Confirm Password: </label>
                <input id='passwordConfirm' type='password' value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} required />
                <br />
                <br />
                <input type='submit' value='Submit' />
            </form>
            <br />
            <b>{`auth is: ${auth}`}</b>
            <br />
            <b>{`message is: ${message}`}</b>
            <br />
            <br />
            <Link to='/'>Login</Link>
        </div>
    )
};