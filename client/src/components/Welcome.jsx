import React, { useState, useEffect } from 'react';
import { Link, Navigate, redirect } from 'react-router-dom';

//Redux
import { store } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { login, selectAuthentication, selectSessionToken } from '../features/auth/authSlice';

//Other
import { loginToken } from '../sessionData';

import '../App.css'

export default function Welcome() {
    //redux
    const dispatch = useDispatch();
    const sessionToken = useSelector(selectSessionToken);
    const sessionAuth = useSelector(selectAuthentication);

    //useStates
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const [navigate, setNavigate] = useState(false);
    const [message, setMessage] = useState('')

    //useEffects
    useEffect(() => {   
        //test API
        callAPI()
        //check login
        checkUserSignIn()
    }, []);

    //Functions
    function callAPI() {
        fetch('http://localhost:9000/testAPI')
        .then(res => res.text())
        .then(res => setMsg(res))
    }

    console.log(store.getState().auth)

    function checkUserSignIn() {

        if (sessionToken == '') return

        fetch('http://localhost:9000/verifyuser', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"token": loginToken})
            })
            .then(res => res.json())
            .then (res => {
                if (res.result) {
                    console.log('User logged in.')
                    window.location.href = '/home'
                } else {
                    return
                }
            })
            .catch(err => console.log(err));
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
                    console.log(`Updated cookie: ${document.cookie}`);
                    setMessage(document.cookie)

                    //redux dispatch
                    console.log(dispatch(login({loggedIn: true, token: res.token, tokenExpiry: expiryString, username: res.username})))
                    dispatch(login({loggedIn: true, token: res.token, tokenExpiry: expiryString, username: res.username}))

                    //navigate
                    window.location = "/home"
                } else {
                    setMessage(res.message)
                }
            })
            .catch(err => console.log(err));
        }

    return (
        <div className="page">
            <h1>{msg}</h1>
            <form onSubmit={handleSignIn}>
                <label>Email: </label>
                <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
                <label>Password: </label>
                <input type='password' value={password}  onChange={e => setPassword(e.target.value)} />
                <input type='submit' value='Submit' />
            </form>
            <br />
            <Link to='/signup'>Sign Up</Link>
        </div>
    )
}
