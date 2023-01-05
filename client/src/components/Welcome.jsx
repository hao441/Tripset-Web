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
    
    const [msg, setMsg] = useState('');


    //useEffects
    useEffect(() => {   
        //test API
        callAPI();
        
        //navigate
        if (auth) navigate('/home');
    });

    const handleSignIn = (e) => {
        e.preventDefault();
        setTimeout(() => {
        dispatch(signinAsync({email, password}))
        }, 1000);
    }

    //Functions
    function callAPI() {
        fetch('http://localhost:9000/testAPI')
        .then(res => res.text())
        .then(res => setMsg(res))
    }

    

    if (auth) return (
        <Navigate replace to='/home' />
    )

    return (
        <div className="page">
            <h1>{msg}</h1>
            <form action='' onSubmit={handleSignIn}>
                <label>Email: </label>
                <input type='email' value={email} onChange={e => setEmail(e.target.value)} formTarget="email" required />
                <label>Password: </label>
                <input type='password' value={password}  onChange={e => setPassword(e.target.value)} formTarget="password" required />
                <input type='submit' value='Submit' />
            </form>
            <br />
            <b>{`session message is: ${message}`}</b>
            <br />
            <b>{`session auth is: ${auth}`}</b>
            <br />
            <br />
            <Link to='/signup'>Sign Up</Link>
        </div>
    )
}
