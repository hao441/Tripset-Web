import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

//Redux
import { store } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthentication, selectSessionToken, selectMessage, selectSessionTokenExpiry } from '../features/auth/authSlice';
import { signinAsync } from '../features/auth/authThunk';

//Other
import { sessionData, sessionJWT } from '../sessionData';

import '../App.css'
import './css/welcome.css'

export default function Welcome() {
    //redux
    const dispatch = useDispatch();
    const token = useSelector(selectSessionToken);
    const tokenExpiry = useSelector(selectSessionTokenExpiry);
    const auth = useSelector(selectAuthentication);
    const message = useSelector(selectMessage);

    //react-router-dom
    const navigate = useNavigate();

    //useStates
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    //useEffects
    useEffect(() => {
        //navigate
        // if (auth) navigate('/home');
    });

    const handleSignIn = (e) => {
        e.preventDefault();
        setTimeout(() => {
        dispatch(signinAsync({email, password}))
        }, 1000);
    }

    const handleSignUp = () => {
        setTimeout(() => {
            navigate('/signup')
        }, 1000)
    }

    // if (auth) return (
    //     <Navigate replace to='/home' />
    // )

    return (
        <div className='background'>
            <div className="container">
                <div><h1 className='title'>Tripset</h1></div>
                <div><h2 className='former subtitle'>Welcome to the new world of travel.</h2></div>
                <div><h3 className='former minortitle'>Login</h3></div>
                {/* Content */}
                <div className='former'>
                    <div><form action='' onSubmit={handleSignIn}>
                    <div><input className='form-item text-input' type='email' value={email} onChange={e => setEmail(e.target.value)} formTarget="email" placeholder='email address' required /></div>
                    <div><input className='form-item text-input' type='password' value={password}  onChange={e => setPassword(e.target.value)} formTarget="password" placeholder='password' required /></div>
                    <div><button className='form-item form-button' type='submit' value='Submit'>Log in</button></div>
                    </form></div>
                    <div className='hor'></div>
                    <div><button className='former signup form-button' onClick={handleSignUp}>Sign up</button></div>
                </div>
            </div>
        </div>
    )
}
