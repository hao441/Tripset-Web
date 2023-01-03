import React, { useState, useEffect } from 'react';
import { Link, Navigate, redirect } from 'react-router-dom';

//Redux
import { store } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { login, selectAuthentication, selectSessionToken, selectErrorMessage, selectSessionTokenExpiry } from '../features/auth/authSlice';

//Other
import { sessionData, sessionJWT } from '../sessionData';

import '../App.css'

export default function Welcome() {
    //redux
    const dispatch = useDispatch();
    const sessionToken = useSelector(selectSessionToken);
    const sessionTokenExpiry = useSelector(selectSessionTokenExpiry);
    const sessionAuth = useSelector(selectAuthentication);
    const sessionErrorMessage = useSelector(selectErrorMessage);

    //useStates
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const [logged, setLogged] = useState(false);
    const [message, setMessage] = useState('')


    //useEffects
    useEffect(() => {   
        //test API
        callAPI()

        //check redux state
        if (sessionAuth === '') sessionData()

        //set
        setLogged(sessionAuth)


    }, []);

    //Functions
    function callAPI() {
        fetch('http://localhost:9000/testAPI')
        .then(res => res.text())
        .then(res => setMsg(res))
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        fetch('http://localhost:9000/signin', {
            method: 'POST',
            redirect: 'manual',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"email": email, "password": password}),
            
            })
            .then(res => res.json())
            .then(res => {
                if (res.result && res.token) {
                    //set date
                    // Parse the ISO 8601 timestamp string
                    const expiry = new Date(res.tokenExpiry);
                    const expiryString = expiry.toUTCString();

                    console.log(expiryString)
                    
                    //cookie
                    document.cookie = `path=/;`;
                    document.cookie = `expires=${expiryString};`;
                    document.cookie = `token=${res.token};`;
                    document.cookie = `username=${res.username}`
                    console.log(`Updated cookie: ${document.cookie}`);
                    setMessage(document.cookie)

                    //redux dispatch
                    console.log(dispatch(login({loggedIn: true, token: res.token, tokenExpiry: expiryString, username: res.username, errorMessage: ''})))
                    dispatch(login({loggedIn: true, token: res.token, tokenExpiry: expiryString, username: res.username, errorMessage: ''}))

                    setEmail('')
                    setPassword('')
                } else {
                    dispatch(login({loggedIn: false, token: '', tokenExpiry: '', username: '', errorMessage: res.errorMessage}))
                    setEmail('')
                    setPassword('')
                }
            })
            .catch(err => console.log(err));
        }

    if (logged) return ( <Navigate replace to='/home' />)
    
    return (
        <div className="page">
            <h1>{msg}</h1>
            <form action='' onSubmit={handleSignIn}>
                <label>Email: </label>
                <input type='email' value={email} onChange={e => setEmail(e.target.value)} formTarget="username" required />
                <label>Password: </label>
                <input type='password' value={password}  onChange={e => setPassword(e.target.value)} formTarget="password" required />
                <input type='submit' value='Submit' />
            </form>
            <br />
            <b>{sessionErrorMessage}</b>
            <br />
            <br />
            <Link to='/signup'>Sign Up</Link>
        </div>
    )
}
