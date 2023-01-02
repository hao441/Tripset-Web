import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { login, selectSessionToken } from '../features/auth/authSlice';

import '../App.css'

export default function Welcome() {
    //redux
    const dispatch = useDispatch();
    const sessionToken = useSelector(selectSessionToken);

    //useStates
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const [navigate, setNavigate] = useState(false);
    const [message, setMessage] = useState('')

    //useEffects
    useEffect(() => {
        console.log('hi')
        //test API
        callAPI()
        //check login
        setTimeout((checkUserSignIn()), '300')
    });

    //Functions
    function callAPI() {
        fetch('http://localhost:9000/testAPI')
        .then(res => res.text())
        .then(res => setMsg(res))
    }

    function checkUserSignIn() {

        if (sessionToken == '') return

        fetch('http://localhost:9000/verifyuser', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"token": sessionToken})
            })
            .then(res => res.json())
            .then (res => {
                if (res.result) {
                    console.log('User logged in.')
                    return <Navigate to='/home' />
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
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"email": email, "password": password})
            })
            .then(res => res.json())
            .then(res => {
                if (res.result && res.token) {
                    document.cookie = `token=${res.token};expires=${Date(res.tokenExpiry)}`
                    setMessage(res.token.toString())
                    console.log(`Token added to cookies: ${res.token}`);
                    setNavigate(true);
                } else {
                    setMessage(res.message)
                }
            })
            .catch(err => console.log(err));
        }

    return (
        <div className="page">
            {checkUserSignIn()}
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
