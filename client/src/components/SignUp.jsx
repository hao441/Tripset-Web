import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Home from './Home.jsx';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { login, selectAuthentication, selectErrorMessage, selectSessionToken, selectSessionTokenExpiry, selectUserName } from '../features/auth/authSlice';

import '../App.css'

export default function SignUp() {

    //redux
    const dispatch = useDispatch()

    const sessionToken = useSelector(selectSessionToken);
    const sessionTokenExpiry = useSelector(selectSessionTokenExpiry);
    const sessionAuth = useSelector(selectAuthentication);
    const sessionErrorMessage = useSelector(selectErrorMessage);
    const sessionUsername = useSelector(selectUserName)

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
        // setTimeout((checkUserSignIn()), /*'300000'*/ '300')
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
        if (sessionToken === '' || sessionTokenExpiry === '') return dispatch(login({loggedIn: false, token: '', tokenExpiry: '', username: '', errorMessage: 'Not logged in.'}))
        
        fetch('http://localhost:9000/verifyuser', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"token": sessionToken})
            })
            .then(res => res.json())
            .then (res => {
                if (res.result) {
                    console.log('User logged in.')
                    return dispatch(login({loggedIn: true, token: res.token, tokenExpiry: sessionTokenExpiry, username: res.username, errorMessage: ''}))
                } else {
                    return dispatch(login({loggedIn: false, token: '', tokenExpiry: '', username: '', errorMessage: 'Not logged in.'}))
                }
            })
            .catch(err => console.log(err));
    }

    const handleSignUp = (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) return dispatch(login({loggedIn: false, token: '', tokenExpiry: '', username: '', errorMessage: 'Passwords don\'t match.'}))

        fetch('http://localhost:9000/signup', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email: email, password: password})
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.result) {
                    // Parse the ISO 8601 timestamp string
                    const expiry = new Date(res.tokenExpiry);
                    const expiryString = expiry.toUTCString();

                    //cookie
                    document.cookie = `path=/;`;
                    document.cookie = `expires=${expiryString};`;
                    document.cookie = `token=${res.token};`;
                    document.cookie = `username=${res.username};`
                    console.log(`Updated cookie: ${document.cookie}`);

                    setNewUser(true);
                    console.log('worked')
                    return dispatch(login({loggedIn: true, token: res.token, tokenExpiry: expiryString, username: res.username, errorMessage: res.errorMessage}))
                } else {
                    console.log('didn\'t work.')
                    return dispatch(login({loggedIn: false, token: '', tokenExpiry: '', username: '', errorMessage: res.errorMessage}))
                }
            })
            .catch(err => console.log(err));
    };

    //checkAuth
    const checkAuth = async () => { let isAuth = await sessionAuth; return isAuth}
     if (checkAuth === true) {dispatch(login({loggedIn: true})) ;return <Navigate replace to={`/`} />}

    return (
        <div className="page">
            {newUser && <Navigate replace to={`/city`} />}
            <h1>{title}</h1>
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
            <b>{sessionErrorMessage}</b>
            <br />
            <br />
            <Link to='/'>Login</Link>
        </div>
    )
};