import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthentication, selectMessage } from '../features/auth/authSlice';

import '../App.css'
import { signupAsync } from '../features/auth/authThunk.js';

export default function SignUp() {

    //redux
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const auth = useSelector(selectAuthentication);
    const sessionMessage = useSelector(selectMessage);

    //login variables
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [message, setMessage] = useState(sessionMessage);

    //useEffects
    useEffect(() => {
    });

    const handleSignUp = (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) return setMessage('Passwords do not match.');
        dispatch(signupAsync({name: name, email: email, password: password, passwordConfirm: passwordConfirm}));
    }

    const navLogin = () => {
            navigate('/welcome');
    }

    if (auth) return (
        <Navigate to='/city' />
    )

    return (
        <div className='background-cover'>
            <div className="container">
                <div><h1 className='title top-margin'>Sign up</h1></div>
                {/* Content */}
                <div className='former'>
                    <form onSubmit={handleSignUp}>
                        <div><input className='form-item text-input' id='firstName' type='firstName' value={name} onChange={e => setName(e.target.value)} placeholder='first name' required /></div>
                        <div><input className='form-item text-input' id='email' type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='email address' required /></div>
                        <div><input className='form-item text-input' type='password' value={password} onChange={e => setPassword(e.target.value)} minLength='8' placeholder='password' required /></div>
                        <div><input className='form-item text-input' id='passwordConfirm' type='password' value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} placeholder='confirm password' required /></div>
                        <div><button className='form-item form-button-no-shadow'>Sign up</button></div>
                    </form>
                    <div className='hor-offset'></div>
                    <div><button className='former signup-no-shadow form-button-no-shadow' onClick={navLogin}>Back to Login</button></div>
                </div>
                <br/>
                <div className='message'>{message !== 'User not found' && message}</div>
            </div>
        </div>
    )
};