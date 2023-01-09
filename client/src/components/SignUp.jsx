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
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    //useEffects
    useEffect(() => {
        //navigate
        if (auth) navigate('/trip');
    });

    const handleSignUp = (e) => {
        e.preventDefault();
        setTimeout(() => {
            dispatch(signupAsync({firstname: firstName, email: email, password: password, passwordConfirm: passwordConfirm}))
        }, 1000);
    };

    // if (auth) return (
    //     <Navigate replace to='/home' />
    // )

    return (
        <div className='background-cover'>
            <div className="container">
                <div><h1 className='title top-margin'>Sign up</h1></div>
                {/* Content */}
                <div className='former'>
                    <form onSubmit={handleSignUp}>
                        <div><input className='form-item text-input' id='firstName' type='firstName' value={firstName} onChange={e => setFirstName(e.target.value)} placeholder='first name' required /></div>
                        <div><input className='form-item text-input' id='email' type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='email address' required /></div>
                        <div><input className='form-item text-input' type='password' value={password} onChange={e => setPassword(e.target.value)} minLength='8' placeholder='password' required /></div>
                        <div><input className='form-item text-input' id='passwordConfirm' type='password' value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} placeholder='confirm password' required /></div>
                        <div><button className='form-item form-button-no-shadow'>Sign up</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
};