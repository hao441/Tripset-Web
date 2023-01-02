import React, { useState, useEffect } from 'react';
import { Link, redirect, BrowserRouter, Navigate } from 'react-router-dom';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Home from './Home.jsx';

//Redux
import { useSelector } from 'react-redux';
import { selectSessionToken } from '../features/auth/authSlice';

import '../App.css'

export default function SignUp() {

    //redux selector
    const sessionToken = useSelector(selectSessionToken);

    //useStates

        //login
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [passwordConfirm, setPasswordConfirm] = useState('');

        //messages
        const [title, setTitle] = useState('');

        //API logs
        const [result, setResult] = useState([]);
        const [navigate, setNavigate] = useState(false);
        const [newUser, setNewUser] = useState(false);
        const [message, setMessage] = useState('');

    //useEffects
    useEffect(() => {
        //test API
        callSignUp()

        //check login
        console.log()
        setTimeout((checkUserSignIn()), /*'300000'*/ '300')

        //Password Validation
        let pci = document.getElementById('passwordConfirm');
        password !== passwordConfirm ? pci.setCustomValidity('Passwords do not match.') : pci.setCustomValidity('')
    });

    //API calls
    function callSignUp() {
        fetch('http://localhost:9000/testSignUp')
        .then(res => res.text())
        .then(res => setTitle(res))
        .catch(err => console.log(err))
    }

    //check login
    function checkUserSignIn() {
        <BrowserRouter>
        <Routes>
            <Route path="/home" element={<Home />} />
        </Routes>
        </BrowserRouter>
        fetch('http://localhost:9000/verifyuser', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"token": sessionToken})
            })
            .then(res => res.json())
            .then (res => {
                if (res.result) {
                    console.log('User logged in.')
                    setNavigate(true);
                } else {
                    console.log('User not logged in.')
                }
            })
            .catch(err => console.log(err));
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        fetch('http://localhost:9000/signup', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email: email, password: password})
            })
            .then(res => res.json())
            .then(res => {
                if (res.token) {
                    document.cookie = `token=${res.token}`
                    document.cookie =  `tokenExpiry=${res.tokenExpiry}`
                    setMessage(res.token.toString())
                    console.log(res.token)
                    setNavigate(true);
                } else {
                    setMessage(res.message.toString())
                }
            })
            .then()
            .catch(err => console.log(err));
    };

        let tokenCookie = ('; '+document.cookie).split(`; token=`).pop().split(';')[0]

    return (
        <div className="page">
            {newUser && <Navigate replace to="/city" />}
            {navigate && <Navigate replace to="/home" />}
            <h1>{title}</h1>
            <form onSubmit={handleSignUp} action='home'>
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
            <Link to='/'>Login</Link>
        </div>
    )
};