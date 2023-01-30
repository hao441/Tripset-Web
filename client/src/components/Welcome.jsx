import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthentication, selectMessage, selectHomeCity } from '../features/auth/authSlice';
import { signinAsync } from '../features/auth/authThunk';

import '../App.css'
import './css/welcome.css'

export default function Welcome() {
    //redux
    const dispatch = useDispatch();
    const auth = useSelector(selectAuthentication);
    const message = useSelector(selectMessage);
    const homeCity = useSelector(selectHomeCity);

    //react-router-dom
    const navigate = useNavigate();

    //useStates
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSignIn = (e) => {
        e.preventDefault();
        dispatch(signinAsync({email, password}))
    }

    const handleSignUp = () => {
            navigate('/signup')
    }

    if (auth) return (
        homeCity === '' ? <Navigate to='/city' /> : <Navigate to='/trip' />
    )

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
                <br />
                {message}
            </div>
        </div>
    )
}
